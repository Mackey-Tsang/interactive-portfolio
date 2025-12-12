"use client";

import React, { useEffect, useRef } from "react";

export default function SciFiCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    // lag factor
    const outerSpeed = 0.13;
    const innerSpeed = 0.25;

    const updatePos = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      outerX += (mouseX - outerX) * outerSpeed;
      outerY += (mouseY - outerY) * outerSpeed;
      innerX += (mouseX - innerX) * innerSpeed;
      innerY += (mouseY - innerY) * innerSpeed;

      outer.style.transform = `translate3d(${outerX - 20}px, ${outerY - 20}px, 0)`;
      inner.style.transform = `translate3d(${innerX - 4}px, ${innerY - 4}px, 0)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updatePos);
    animate();

    // Click pulse
    const clickPulse = () => {
      outer.animate(
        [
          { transform: `translate3d(${outerX - 20}px, ${outerY - 20}px, 0) scale(1)` },
          { transform: `translate3d(${outerX - 20}px, ${outerY - 20}px, 0) scale(1.6)` },
          { transform: `translate3d(${outerX - 20}px, ${outerY - 20}px, 0) scale(1)` },
        ],
        { duration: 200, easing: "ease-out" }
      );
    };

    window.addEventListener("click", clickPulse);

    return () => {
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("click", clickPulse);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-9999"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "2px solid rgba(0,255,255,0.6)",
          boxShadow: "0 0 8px rgba(0,255,255,0.6)",
          filter: "drop-shadow(0 0 12px rgba(0,255,255,0.4))",
          transition: "background 0.2s",
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-9999"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(0,255,255,1)",
          boxShadow: "0 0 6px rgba(0,255,255,1)",
        }}
      />
    </>
  );
}
