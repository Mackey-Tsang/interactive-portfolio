"use client";

import React, { useEffect, useRef } from "react";

type SciFiPlexusBackgroundProps = {
  /** 0–1, controls density of the particle network */
  intensity?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const SciFiPlexusBackground: React.FC<SciFiPlexusBackgroundProps> = ({
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
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    // Configuration
    const particleColor = "rgba(0, 255, 255, 0.8)";
    const lineColor = "0, 255, 255"; // RGB values for template string injection
    const connectionDistance = 120; // Max distance to draw a line
    
    // Scale particle count based on screen area and intensity prop
    const initParticles = () => {
      particles = [];
      const area = w * h;
      // Base calculation: roughly 1 particle per 9000px, scaled by intensity
      const baseCount = Math.floor(area / 9000); 
      const count = Math.max(20, Math.floor(baseCount * (0.5 + intensity)));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8, // Velocity X
          vy: (Math.random() - 0.5) * 0.8, // Velocity Y
        });
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      
      canvas.width = w * dpi;
      canvas.height = h * dpi;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      // Normalize coordinate system so we can use logical pixels
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);

      initParticles();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resizeObserverRef.current = ro;

    const drawFrame = () => {
      // Clear screen (transparent background)
      ctx.clearRect(0, 0, w, h);
      
      // Optional: Very faint dark fill if you want trails, 
      // but standard Plexus looks best clean.
      // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      // ctx.fillRect(0, 0, w, h);

      // Update and Draw Particles
      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Draw Dot
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw Connections (Plexus)
        // We loop from i+1 to avoid drawing lines twice or checking self
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Opacity based on distance (closer = brighter)
            const alpha = 1 - dist / connectionDistance;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha * 0.6})`; // 0.6 is max opacity
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

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
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SciFiPlexusBackground;