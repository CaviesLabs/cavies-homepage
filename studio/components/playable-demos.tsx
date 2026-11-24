"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import {
  ctaMessageType,
  demoSrc,
  playableDemoCaption,
  quoteSectionId,
  type PlayableDemo,
} from "@/lib/playable-ads";
import styles from "./playable-demos.module.css";

type Run = { started: boolean; round: number };

/**
 * Three demo ads, each in a CSS phone frame. Nothing loads or plays until the
 * visitor presses "Tap to play": the frame has no src before that. Replay
 * remounts the frame, which reloads the file. A demo's end button posts a
 * message; the page checks the sender is one of its own frames, ignores what
 * the message carries (the store link is never followed), and scrolls to the
 * quote section.
 */
export function PlayableDemos({ demos }: { demos: readonly PlayableDemo[] }) {
  const [runs, setRuns] = useState<Record<string, Run>>({});
  const frames = useRef(new Map<string, HTMLIFrameElement>());
  const focusAfterStart = useRef<string | null>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const fromOurFrame = [...frames.current.values()].some(
        (frame) => frame.contentWindow === event.source,
      );
      if (!fromOurFrame) return;
      const data: unknown = event.data;
      if (
        typeof data !== "object" ||
        data === null ||
        !("type" in data) ||
        data.type !== ctaMessageType
      ) {
        return;
      }
      const quote = document.getElementById(quoteSectionId);
      if (!quote) return;
      // Smooth unless the visitor asked for less motion (globals.css).
      quote.scrollIntoView();
      quote
        .querySelector<HTMLElement>("[data-quote-heading]")
        ?.focus({ preventScroll: true });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const id = focusAfterStart.current;
    if (!id) return;
    focusAfterStart.current = null;
    frames.current.get(id)?.focus();
  }, [runs]);

  function start(id: string) {
    focusAfterStart.current = id;
    setRuns((previous) => ({
      ...previous,
      [id]: { started: true, round: previous[id]?.round ?? 0 },
    }));
  }

  function replay(id: string) {
    focusAfterStart.current = id;
    setRuns((previous) => ({
      ...previous,
      [id]: { started: true, round: (previous[id]?.round ?? 0) + 1 },
    }));
  }

  return (
    <>
      <noscript>
        <p className={styles.noscript}>The demos need JavaScript to play.</p>
      </noscript>
      <ul className={styles.grid}>
        {demos.map((demo) => {
          const run = runs[demo.id] ?? { started: false, round: 0 };
          return (
            <li className={styles.demo} key={demo.id}>
              <div className={styles.phone}>
                <div className={styles.screen}>
                  <iframe
                    // A new key is a new frame: Replay reloads the file.
                    key={run.round}
                    ref={(node) => {
                      if (node) frames.current.set(demo.id, node);
                      else frames.current.delete(demo.id);
                    }}
                    className={styles.frame}
                    title={`${demo.name}: playable ad demo`}
                    sandbox="allow-scripts"
                    loading="lazy"
                    src={run.started ? demoSrc(demo.id) : undefined}
                    hidden={!run.started}
                  />
                  {run.started ? null : (
                    <button
                      type="button"
                      className={styles.poster}
                      style={
                        {
                          "--tone-from": demo.tone.from,
                          "--tone-to": demo.tone.to,
                          "--tone-ink": demo.tone.ink,
                          "--tone-button": demo.tone.button,
                          "--tone-button-ink": demo.tone.buttonInk,
                          ...(demo.poster
                            ? { backgroundImage: `url(${demo.poster})` }
                            : {}),
                        } as React.CSSProperties
                      }
                      aria-label={`Tap to play ${demo.name}`}
                      onClick={() => start(demo.id)}
                    >
                      <span className={styles.posterGenre}>{demo.genre}</span>
                      <span className={styles.posterName}>{demo.name}</span>
                      <span className={styles.posterPlay}>
                        <Play size={18} aria-hidden="true" />
                        Tap to play
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.caption}>
                <h3>{demo.name}</h3>
                <span className={styles.genre}>{demo.genre}</span>
                <p>{playableDemoCaption}</p>
                <button
                  type="button"
                  className={styles.replay}
                  disabled={!run.started}
                  onClick={() => replay(demo.id)}
                  aria-label={`Replay ${demo.name}`}
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  Replay
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
