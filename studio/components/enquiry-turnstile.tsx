"use client";

import Script from "next/script";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import styles from "./enquiry-form.module.css";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      size: "flexible";
      "response-field": false;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      "timeout-callback": () => void;
    },
  ) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type EnquiryTurnstileHandle = { reset: () => void };

export function EnquiryTurnstile({
  siteKey,
  onTokenChange,
  ref,
}: {
  siteKey: string;
  onTokenChange: (token: string) => void;
  ref: Ref<EnquiryTurnstileHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | undefined>(undefined);
  const [scriptReady, setScriptReady] = useState(false);
  const [message, setMessage] = useState("Loading spam check…");

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        onTokenChange("");
        if (widgetRef.current !== undefined && window.turnstile) {
          setMessage("Checking…");
          window.turnstile.reset(widgetRef.current);
        }
      },
    }),
    [onTokenChange],
  );

  useEffect(() => {
    const api = window.turnstile;
    if (!scriptReady || !containerRef.current || !api) return;
    let active = true;

    function invalid(message: string) {
      if (!active) return;
      onTokenChange("");
      setMessage(message);
    }

    try {
      widgetRef.current = api.render(containerRef.current, {
        sitekey: siteKey,
        action: "enquiry",
        theme: "light",
        size: "flexible",
        "response-field": false,
        callback(token) {
          if (!active) return;
          onTokenChange(token);
          setMessage("");
        },
        "expired-callback": () =>
          invalid("The spam check expired. Please complete it again."),
        "error-callback": () =>
          invalid("The spam check is unavailable. You can use email instead."),
        "timeout-callback": () =>
          invalid("The spam check timed out. Please complete it again."),
      });
    } catch {
      invalid("The spam check is unavailable. You can use email instead.");
    }

    return () => {
      active = false;
      if (widgetRef.current !== undefined) api.remove(widgetRef.current);
      widgetRef.current = undefined;
    };
  }, [scriptReady, siteKey, onTokenChange]);

  return (
    <div className={styles.spamCheck} aria-label="Spam protection">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => {
          onTokenChange("");
          setMessage(
            "The spam check couldn’t load. You can use email instead.",
          );
        }}
      />
      <div ref={containerRef} />
      <p className={styles.hint} role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
