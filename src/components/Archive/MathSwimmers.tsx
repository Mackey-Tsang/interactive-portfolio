"use client";

import React, { useEffect, useRef, CSSProperties } from "react";

type MathSwimmersProps = {
  className?: string;
  style?: CSSProperties;

  /** Paint */
  color?: string;                  // rgba ok (default "rgba(255,255,255,0.9)")
  pointSize?: number;              // dot radius in CSS px (default 1.2)
  composite?: GlobalCompositeOperation; // blend mode (e.g. 'lighter','screen') default 'source-over'
  opacity?: number;                // global alpha multiplier 0..1 (default 1)

  /** Animation */
  speed?: number;                  // time multiplier (default 1)
  pointsPerFrame?: number;         // density per frame (default 6000)
  maxDpr?: number;                 // cap devicePixelRatio (default 2)

  /** Coordinate mapping (original equation expects 400x400) */
  domainWidth?: number;            // logical width of math space (default 400)
  domainHeight?: number;           // logical height of math space (default 400)

  /** Scale & offset from math space -> pixels */
  scaleX?: number;                 // multiplies computed sx (default 1)
  scaleY?: number;                 // multiplies computed sy (default 1)
  offsetX?: number;                // px offset after scaling (default 0)
  offsetY?: number;                // px offset after scaling (default 0)

  /** Fit math space into canvas */
  fit?: "contain" | "cover" | "stretch"; // controls base sx/sy (default "contain")
  align?: "center" | "left" | "right" | "top" | "bottom"; // for contain/cover (default "center")

  /** Trails: set >0 to fade previous frame instead of full clear (e.g., 0.05) */
  trailFade?: number;              // 0 = hard clear; 0.01..0.2 = soft fading trails (default 0)

  /** Jitter: small random offset for organic look */
  jitter?: number;                 // px randomization per dot (default 0)

  /** Skip off-canvas points for perf */
  clampToCanvas?: boolean;         // default true
};

export default function MathSwimmers({
  className = "",
  style,
  color = "rgba(255,255,255,0.9)",
  pointSize = 1.2,
  composite = "source-over",
  opacity = 1,
  speed = 1,
  pointsPerFrame = 6000,
  maxDpr = 2,
  domainWidth = 400,
  domainHeight = 400,
  scaleX = 1,
  scaleY = 1,
  offsetX = 0,
  offsetY = 0,
  fit = "contain",
  align = "center",
  trailFade = 0,
  jitter = 0,
  clampToCanvas = true,
}: MathSwimmersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef<number>(0); // time

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---------- sizing ----------
    let baseSX = 1, baseSY = 1, baseOX = 0, baseOY = 0;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fit logic from domain -> canvas
      const cw = rect.width;
      const ch = rect.height;
      const sx = cw / domainWidth;
      const sy = ch / domainHeight;

      if (fit === "stretch") {
        baseSX = sx;
        baseSY = sy;
        baseOX = 0;
        baseOY = 0;
      } else {
        const s = fit === "contain" ? Math.min(sx, sy) : Math.max(sx, sy);
        const fittedW = domainWidth * s;
        const fittedH = domainHeight * s;

        // alignment
        let ox = 0, oy = 0;
        switch (align) {
          case "left":   ox = 0; break;
          case "right":  ox = cw - fittedW; break;
          default:       ox = (cw - fittedW) / 2; // center
        }
        switch (align) {
          case "top":    oy = 0; break;
          case "bottom": oy = ch - fittedH; break;
          default:       oy = (ch - fittedH) / 2; // center
        }
        baseSX = baseSY = s;
        baseOX = ox;
        baseOY = oy;
      }
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    // ---------- math helpers ----------
    const mag = (a: number, b: number) => Math.hypot(a, b);
    const safeInv = (v: number, eps = 1e-3) => (Math.abs(v) < eps ? (v < 0 ? -eps : eps) : v);

    // ---------- draw ----------
    const drawFrame = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (trailFade > 0) {
        // fade old frame instead of full clear (keeps trails)
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = trailFade;
        ctx.fillStyle = "black";     // transparent canvas -> “fade” by drawing with low alpha black
        ctx.clearRect(0, 0, width, height); // ensure alpha stays clean
        // NOTE: If you want additive trails, comment clearRect and draw a translucent rect instead:
        // ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = composite;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      const sx = baseSX * scaleX;
      const sy = baseSY * scaleY;

      // Step time
      const dt = (Math.PI / 240) * speed;
      tRef.current += dt;
      const t = tRef.current;

      // Density
      const N = pointsPerFrame;

      for (let i = 0; i < N; i++) {
        const x = i;          // original mapping: a(i, i/235)
        const y = i / 235;

        const k = (4 + Math.sin(y * 2 - t) * 3) * Math.cos(x / 29);
        const e = y / 8 - 13;
        const d = mag(k, e);
        const kk = safeInv(k);

        const q =
          3 * Math.sin(k * 2) +
          0.3 / kk +
          Math.sin(y / 25) * k * (9 + 4 * Math.sin(e * 9 - d * 3 + t * 2));
        const c = d - t;

        // math space (≈400x400), then map -> canvas
        const mx = q + 30 * Math.cos(c) + 200;
        const my = q * Math.sin(c) + d * 39 - 220;

        let px = baseOX + mx * sx + offsetX;
        let py = baseOY + my * sy + offsetY;

        if (jitter > 0) {
          px += (Math.random() - 0.5) * jitter;
          py += (Math.random() - 0.5) * jitter;
        }

        if (!clampToCanvas || (px >= -2 && px <= width + 2 && py >= -2 && py <= height + 2)) {
          ctx.beginPath();
          ctx.arc(px, py, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    color,
    pointSize,
    composite,
    opacity,
    speed,
    pointsPerFrame,
    maxDpr,
    domainWidth,
    domainHeight,
    scaleX,
    scaleY,
    offsetX,
    offsetY,
    fit,
    align,
    trailFade,
    jitter,
    clampToCanvas,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
