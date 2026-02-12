"use client";

import React, { useEffect, useRef } from "react";

type DotCursorProps = {
  opacity?: number;   // 👈 NEW
};

export default function DotCursor({ opacity = 1 }: DotCursorProps) {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let scale = 1;

    const speed = 0.25;
    const scaleEase = 0.2;
    const baseSize = 10;
    const activeScale = 2;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest?.(
        "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
      );

      (dot.dataset as any).active = interactive ? "true" : "false";
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      const wantsActive = dot.dataset.active === "true";
      const targetScale = wantsActive ? activeScale : 1;
      scale += (targetScale - scale) * scaleEase;

      dot.style.transform = `translate3d(${currentX - baseSize / 2}px, ${
        currentY - baseSize / 2
      }px, 0) scale(${scale})`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
<div
  ref={dotRef}
  className="dot-cursor pointer-events-none fixed top-0 left-0 z-9999"
  style={{
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: `rgba(255,255,255,${opacity})`,
    opacity,
    boxShadow: `
      0 0 18px rgba(0,0,0,${0.7 * opacity}),
      0 0 10px rgba(255,255,255,${0.9 * opacity})
    `,
    transition:
      "background 0.2s ease-out, opacity 0.2s ease-out, box-shadow 0.2s ease-out",
  }}
/>

  );
}
