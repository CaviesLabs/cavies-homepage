"use client";

import { useEffect, useId, useRef } from "react";
import type { ReflectiveScene } from "./reflective-scene";
import styles from "./reflective-mark.module.css";

/** A decorative, progressively enhanced Cavies monogram. */
export function ReflectiveMark({ className }: { className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  const gradientId = useId().replaceAll(":", "");

  useEffect(() => {
    const host = element.current;
    if (!host) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let scene: ReflectiveScene | undefined;
    let disposed = false;
    let loading = false;
    let failed = false;
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let pointerX = 0;
    let pointerY = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const canRender = () =>
      !disposed && !failed && visible && !document.hidden && !motion.matches;

    const draw = (time: number) => {
      frame = 0;
      if (!scene || !canRender()) return;
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 1 / 60;
      previousTime = time;
      const moving = scene.render(delta);
      host.dataset.ready = "true";
      if (moving) frame = requestAnimationFrame(draw);
      else previousTime = 0;
    };

    const requestRender = () => {
      if (!frame && scene && canRender()) frame = requestAnimationFrame(draw);
    };

    const updateTarget = () => {
      if (!scene || !canRender()) return;
      const bounds = host.getBoundingClientRect();
      const scroll = coarse.matches
        ? 0
        : Math.max(
            -1,
            Math.min(
              1,
              (window.innerHeight * 0.5 - bounds.top - bounds.height * 0.5) /
                window.innerHeight,
            ),
          );
      scene.setTarget(pointerX, pointerY, scroll);
      requestRender();
    };

    const destroyScene = () => {
      stop();
      delete host.dataset.ready;
      scene?.dispose();
      scene = undefined;
    };

    const contextLost = () => {
      failed = true;
      destroyScene();
    };

    const start = async () => {
      if (!canRender() || scene || loading) return;
      loading = true;
      try {
        // Keep Three.js, its shaders, and the scene outside the initial page bundle.
        const { createReflectiveScene } = await import("./reflective-scene");
        if (!canRender()) return;
        scene = createReflectiveScene(host, contextLost);
        updateTarget();
      } catch {
        // The server-rendered metallic SVG remains visible if WebGL is unavailable.
        failed = true;
        destroyScene();
      } finally {
        loading = false;
      }
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          void start();
          updateTarget();
        } else stop();
      },
      { threshold: 0.01 },
    );
    intersection.observe(host);

    const resize = new ResizeObserver(() => {
      scene?.resize();
      updateTarget();
    });
    resize.observe(host);

    const pointerMove = (event: PointerEvent) => {
      if (!canRender() || coarse.matches || event.pointerType === "touch")
        return;
      pointerX = Math.max(
        -1,
        Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2),
      );
      pointerY = Math.max(
        -1,
        Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2),
      );
      updateTarget();
    };
    const pointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      updateTarget();
    };
    const scrollChange = () => {
      if (!coarse.matches) updateTarget();
    };
    const visibilityChange = () => {
      if (document.hidden) stop();
      else {
        void start();
        updateTarget();
      }
    };
    const preferenceChange = () => {
      pointerX = 0;
      pointerY = 0;
      if (motion.matches) destroyScene();
      else {
        void start();
        updateTarget();
      }
    };

    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    window.addEventListener("scroll", scrollChange, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    motion.addEventListener("change", preferenceChange);
    coarse.addEventListener("change", preferenceChange);

    return () => {
      disposed = true;
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", pointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        pointerLeave,
      );
      window.removeEventListener("scroll", scrollChange);
      document.removeEventListener("visibilitychange", visibilityChange);
      motion.removeEventListener("change", preferenceChange);
      coarse.removeEventListener("change", preferenceChange);
      destroyScene();
    };
  }, []);

  return (
    <div
      ref={element}
      className={`${styles.mark}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div className={styles.halo} />
      <div className={styles.shadow} />
      <svg
        className={styles.fallback}
        viewBox="0 0 420 400"
        fill="none"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={`${gradientId}-silver`}
            x1="88"
            y1="74"
            x2="300"
            y2="336"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset=".15" stopColor="#d5d9db" />
            <stop offset=".32" stopColor="#5d6269" />
            <stop offset=".43" stopColor="#fdfdf7" />
            <stop offset=".53" stopColor="#f8f8f4" />
            <stop offset=".6" stopColor="#717078" />
            <stop offset=".7" stopColor="#bfa9b0" />
            <stop offset=".81" stopColor="#e3e9cc" />
            <stop offset="1" stopColor="#d0d3d0" />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-edge`}
            x1="85"
            y1="60"
            x2="293"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#626a76" />
            <stop offset=".28" stopColor="#fff" />
            <stop offset=".66" stopColor="#50545b" />
            <stop offset="1" stopColor="#bac299" />
          </linearGradient>
        </defs>
        <g transform="rotate(-13 210 195)">
          <path
            d="M 287 117 A 108 108 0 1 0 287 273"
            stroke={`url(#${gradientId}-edge)`}
            strokeWidth="72"
            strokeLinecap="round"
          />
          <path
            d="M 283 111 A 108 108 0 1 0 283 267"
            stroke={`url(#${gradientId}-silver)`}
            strokeWidth="64"
            strokeLinecap="round"
          />
          <path
            d="M 130 105 A 114 114 0 0 0 99 218"
            stroke="#fff"
            strokeOpacity=".65"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
