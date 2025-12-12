"use client";

import React, { useEffect, useRef } from "react";

type SciFiGlitchBackgroundProps = {
  /** 0–1, higher = more glitch rectangles */
  intensity?: number;
  className?: string;
};

const SciFiGlitchBackground: React.FC<SciFiGlitchBackgroundProps> = ({
  intensity = 0.65,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpi = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpi;
      canvas.height = rect.height * dpi;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resizeObserverRef.current = ro;

    const gridSize = 40;
    let lastTime = 0;

    const drawFrame = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const w = canvas.width / dpi;
      const h = canvas.height / dpi;

      // Fade previous frame slightly to leave ghost trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, w, h);

      // Static HUD grid
      ctx.save();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // Horizontal scan-lines
      ctx.save();
      ctx.fillStyle = "rgba(0, 255, 255, 0.06)";
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }
      ctx.restore();

      // Occasionally add bright glitch bars
      const glitchCount = Math.floor(3 + 15 * intensity);
      for (let i = 0; i < glitchCount; i++) {
        if (Math.random() < 0.4) continue;

        const gx = Math.random() * w;
        const gy = Math.random() * h;
        const gw = (gridSize * (0.8 + Math.random() * 2.5));
        const gh = 2 + Math.random() * 10;

        const colorChoice = Math.random();
        if (colorChoice < 0.5) {
          ctx.fillStyle = "rgba(0, 255, 255, 0.35)";
        } else if (colorChoice < 0.8) {
          ctx.fillStyle = "rgba(255, 0, 150, 0.35)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        }

        ctx.fillRect(gx, gy, gw, gh);
      }

      // Small UI blocks that jitter in place (feels like sci-fi panels)
      const panelCount = 6;
      for (let i = 0; i < panelCount; i++) {
        const baseX = (w / panelCount) * i + 40;
        const baseY = h * 0.15 + (i % 2) * 50;

        const jitterX = (Math.random() - 0.5) * 4;
        const jitterY = (Math.random() - 0.5) * 3;

        ctx.save();
        ctx.translate(baseX + jitterX, baseY + jitterY);

        ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, 80, 20);

        ctx.fillStyle = "rgba(0, 255, 255, 0.3)";
        const barCount = 4;
        for (let j = 0; j < barCount; j++) {
          const wBar = 8 + Math.random() * 12;
          const xBar = 4 + j * 18;
          const yBar = 6 + Math.random() * 4;
          ctx.fillRect(xBar, yBar, wBar, 4);
        }

        ctx.restore();
      }

      // Occasional big global glitch (screen tear)
      if (Math.random() < 0.035 * intensity) {
        const sliceHeight = h * (0.1 + Math.random() * 0.2);
        const sliceY = Math.random() * (h - sliceHeight);
        const offsetX = (Math.random() - 0.5) * 30;

        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.drawImage(
          canvas,
          0,
          sliceY,
          w,
          sliceHeight,
          offsetX,
          sliceY,
          w,
          sliceHeight
        );
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(drawFrame);
    };

    animationRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [intensity]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SciFiGlitchBackground;
