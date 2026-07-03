"use client";

import React, { useEffect, useRef, CSSProperties } from "react";

type SwimmerHaloProps = {
  className?: string;
  style?: CSSProperties;
  
  // Visuals
  color?: string;       // Default: "rgba(255,0,0,0.5)"
  radius?: number;      // Default: 200
  thickness?: number;   // Default: 50
  alpha?: number;       // Default: 0.5
  feather?: number;     // 0.0 - 1.0 (Softness)
  composite?: GlobalCompositeOperation;
};

export default function SwimmerHalo({
  className = "",
  style,
  color = "rgba(255, 0, 0, 0.5)",
  radius = 200,
  thickness = 50,
  alpha = 0.5,
  feather = 0.9,
  composite = "lighter",
}: SwimmerHaloProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      
      // Handle resize logic directly here
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center of the canvas
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw the Static Glow
      const inner = Math.max(0, radius - thickness / 2) * dpr; // Scale by DPR for sharpness
      const outer = (radius + thickness / 2) * dpr;
      
      const grad = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
      
      // Parse color or just use it. 
      // Note: Gradient steps create the "ring" look.
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1 - Math.max(0, Math.min(1, feather)), color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      
      ctx.globalCompositeOperation = composite;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = grad;
      
      ctx.beginPath();
      ctx.arc(cx, cy, outer, 0, Math.PI * 2);
      ctx.fill();
    };

    // Initial Draw
    draw();

    // Redraw on resize
    const ro = new ResizeObserver(() => requestAnimationFrame(draw));
    ro.observe(container);

    return () => ro.disconnect();
  }, [color, radius, thickness, alpha, feather, composite]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`} 
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}