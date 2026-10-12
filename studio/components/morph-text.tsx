"use client";

import { useEffect, useRef } from "react";
import styles from "./morph-text.module.css";

const fallbackGlyphs = Array.from("abcdefghijklmnopqrstuvwxyz");

/**
 * Text that settles into its next value letter by letter after a change.
 * The server renders the final text; the animation only runs on updates,
 * writes to the DOM inside animation frames, and is skipped for reduced
 * motion. Assistive technology reads the final text only.
 */
export function MorphText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const glyphs = useRef<HTMLSpanElement>(null);
  const previous = useRef(text);

  useEffect(() => {
    const from = previous.current;
    const element = glyphs.current;
    if (from === text || !element) return;
    previous.current = text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Array.from(text);
    const pool = Array.from(
      new Set(Array.from(from + text).filter((char) => !/\s/.test(char))),
    );
    const letters = pool.length > 1 ? pool : fallbackGlyphs;
    const duration = Math.min(460, 220 + target.length * 9);
    let start = 0;
    let frame = requestAnimationFrame(function tick(now) {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      if (progress >= 1) {
        element.textContent = text;
        return;
      }
      const eased = 1 - (1 - progress) ** 3;
      const settled = Math.round(eased * target.length);
      element.textContent = target
        .map((char, index) =>
          index < settled || /\s/.test(char)
            ? char
            : letters[Math.floor(Math.random() * letters.length)],
        )
        .join("");
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      element.textContent = text;
    };
  }, [text]);

  return (
    <span className={className}>
      <span ref={glyphs} aria-hidden="true">
        {text}
      </span>
      <span className={`visually-hidden ${styles.reader}`}>{text}</span>
    </span>
  );
}
