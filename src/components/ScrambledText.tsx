// src/components/ScrambledText.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  textSize?: string;
  lang?: string;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 20,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  textSize = "clamp(6px,1vw,12px)",
  lang = "en",
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const p = rootRef.current.querySelector("p");
    if (!p) return;

    // ✅ split by WORDS, not chars
    const split = new SplitText(p, {
      type: "words",
      wordsClass: "inline-block will-change-transform",
    });

    split.words.forEach((el) => {
      const w = el as HTMLElement;
      w.dataset.content = w.textContent || "";
    });

    const handleMove = (e: PointerEvent) => {
      split.words.forEach((el) => {
        const w = el as HTMLElement;
        const rect = w.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(w, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: w.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`font-mono text-cyan-100 select-none ${className}`}
      style={{
        maxWidth: 280, // keep your narrow info text block
        ...style,
      }}
    >
      <p
        lang={lang}
        style={{
          fontSize: textSize,
          lineHeight: 1.35,
          margin: 0,
          textAlign: "left",
          // Let the browser break only between words
          wordBreak: "normal",
          overflowWrap: "normal",
          hyphens: "auto",
          WebkitHyphens: "auto",
          msHyphens: "auto",
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default ScrambledText;
