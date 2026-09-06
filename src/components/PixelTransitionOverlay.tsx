// src/components/PixelTransitionOverlay.tsx
"use client";

import React, { useEffect, useRef } from "react";

export type ParticleDirection =
  | "left-to-right"
  | "right-to-left"
  | "top-to-bottom"
  | "bottom-to-top"
  | "toward-screen"
  | "away-from-screen";

type PixelTransitionOverlayProps = {
  /** Anything identifying the current scene — changing this value plays the transition. */
  transitionKey: string;
  /** Fires the moment the black cover has fully faded in. Swap your content here. */
  onCovered: () => void;

  /** How many drifting dot particles to spawn per run. */
  particleCount?: number;
  /** Particle diameter range, in px. */
  minSize?: number;
  maxSize?: number;
  /** Particle drift speed range, in px/second (also the radial speed for the
   *  toward/away-from-screen directions). */
  minSpeed?: number;
  maxSpeed?: number;
  /** Particle opacity range (0–1) — each particle picks a random ceiling in this range. */
  minOpacity?: number;
  maxOpacity?: number;
  /** Glow halo size range, as a multiple of the particle's own size (1 = no
   *  visible halo beyond the dot itself). Each particle picks a random value
   *  in this range, so some flecks glow more than others. */
  minGlow?: number;
  maxGlow?: number;

  /** Which way the particles travel. The four lateral options drift across
   *  the screen in that direction; the two "screen" options simulate depth —
   *  particles radiate outward from center and grow (toward-screen), or
   *  shrink inward toward center (away-from-screen). */
  direction?: ParticleDirection;

  /** Color of the drifting particles (and their glow). */
  particleColor?: string;
  /** Color of the full-screen cover that fades in/out. */
  wipeColor?: string;

  /** Duration (s) of the "break apart + cover fades in" phase. */
  coverDuration?: number;
  /** Duration (s) of the "cover fades out + particles settle" phase. */
  revealDuration?: number;

  /** Backdrop blur (px) applied while the cover is visible — softens the boundary
   *  between whatever's still showing through and the black, instead of a hard cut. */
  blurAmount?: number;

  /** Radius (px) around the mouse cursor where particle opacity gets boosted. */
  hoverRadius?: number;
  /** Falloff sharpness of the hover boost — higher = tighter hotspot around the
   *  cursor that drops off quickly, lower = a broader, more gradual glow. */
  hoverBlend?: number;
  /** How much extra opacity (0–1) is added at the exact cursor position, fading
   *  to 0 at hoverRadius away. */
  hoverOpacityBoost?: number;

  /** When true at the moment `transitionKey` changes, that change is applied
   *  immediately (onCovered fires right away) with NO cover/particle
   *  animation. For programmatic syncs that shouldn't visually transition —
   *  e.g. a parent re-aligning its displayed scene with the store right
   *  after mounting/navigating here, which isn't a real user-driven scene
   *  swap even though the key technically changed. */
  instant?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  targetOpacity: number;
  glow: number;
  driftFreq: number;
  driftPhase: number;
  driftAmp: number;
  // Only set for the "toward-screen" / "away-from-screen" directions —
  // particles travel along a radius from screen center instead of vx/vy.
  angle?: number;
  r?: number;
  radialSpeed?: number;
};

// easeOutCubic — fast start, slows down.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// easeInCubic — slow start, speeds up. Used for the cover fading away on reveal,
// so the new page seems to "slowly appear" before the last of the black lifts fast.
const easeInCubic = (t: number) => t * t * t;

const isRadialDirection = (d: ParticleDirection) =>
  d === "toward-screen" || d === "away-from-screen";

// Pre-renders a soft radial-gradient dot once per run and reuses it via
// drawImage for every particle's glow — much cheaper than canvas shadowBlur
// at particle counts in the thousands.
function createGlowSprite(color: string, res = 64): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = res;
  sprite.height = res;
  const ctx = sprite.getContext("2d")!;
  const gradient = ctx.createRadialGradient(res / 2, res / 2, 0, res / 2, res / 2, res / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, res, res);
  return sprite;
}

export default function PixelTransitionOverlay({
  transitionKey,
  onCovered,
  particleCount = 7000,
  minSize = 0.5,
  maxSize = 2,
  minSpeed = 70,
  maxSpeed = 90,
  minOpacity = 0.1,
  maxOpacity = 0.2,
  minGlow = 1.5,
  maxGlow = 4,
  direction = "toward-screen",
  particleColor = "#ffffff",
  wipeColor = "#000000",
  coverDuration = 1,
  revealDuration = 2,
  blurAmount = 1,
  hoverRadius = 1000,
  hoverBlend = 5,
  hoverOpacityBoost = .8,
  instant = false,
}: PixelTransitionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const coveredFiredRef = useRef(false);
  const isFirstRun = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });
  const depthRef = useRef({ centerX: 0, centerY: 0, maxR: 0 });
  const spriteRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // Mirrors the `instant` prop into a ref, read inside the transition effect
  // below — kept in sync every render (not via a useEffect) so its value at
  // the moment `transitionKey` changes is always current, not one render stale.
  const instantRef = useRef(instant);
  instantRef.current = instant;

  // Track viewport size for particle spawning + canvas resolution.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      depthRef.current = {
        centerX: w / 2,
        centerY: h / 2,
        maxR: Math.hypot(w, h) / 2,
      };
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Track the cursor globally — the overlay itself is pointer-events:none, so
  // this has to listen on window to see the mouse over whatever's underneath.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const spawnParticles = () => {
    const { w, h } = sizeRef.current;
    const { centerX, centerY, maxR } = depthRef.current;
    const radial = isRadialDirection(direction);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const size = minSize + Math.random() * (maxSize - minSize);
      const targetOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
      const glow = minGlow + Math.random() * (maxGlow - minGlow);
      const driftFreq = 0.5 + Math.random() * 1.5;
      const driftPhase = Math.random() * Math.PI * 2;
      const driftAmp = 6 + Math.random() * 14;

      if (radial) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * maxR; // spread across the field so it isn't empty on frame 1
        particles.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
          vx: 0,
          vy: 0,
          size,
          targetOpacity,
          glow,
          driftFreq,
          driftPhase,
          driftAmp,
          angle,
          r,
          radialSpeed: direction === "toward-screen" ? speed : -speed,
        });
        continue;
      }

      let vx = 0;
      let vy = 0;
      const jitter = (Math.random() - 0.5) * speed * 0.3;
      switch (direction) {
        case "right-to-left":
          vx = -speed;
          vy = jitter;
          break;
        case "top-to-bottom":
          vx = jitter;
          vy = speed;
          break;
        case "bottom-to-top":
          vx = jitter;
          vy = -speed;
          break;
        case "left-to-right":
        default:
          vx = speed;
          vy = jitter;
          break;
      }

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx,
        vy,
        size,
        targetOpacity,
        glow,
        driftFreq,
        driftPhase,
        driftAmp,
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const canvas = canvasRef.current;
    const wipe = wipeRef.current;
    if (!canvas || !wipe) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (instantRef.current) {
      // Silent sync — apply immediately, no cover/particle animation.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      wipe.style.opacity = "0";
      coveredFiredRef.current = true;
      onCovered();
      return;
    }

    coveredFiredRef.current = false;
    startRef.current = null;
    spriteRef.current = createGlowSprite(particleColor);
    spawnParticles();

    // Reset the cover to fully transparent before fading it in.
    wipe.style.opacity = "0";

    const totalDuration = coverDuration + revealDuration;
    const dpr = window.devicePixelRatio || 1;
    const radial = isRadialDirection(direction);
    const isVertical = direction === "top-to-bottom" || direction === "bottom-to-top";
    const { maxR } = depthRef.current;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      const { w, h } = sizeRef.current;
      const { centerX, centerY } = depthRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "lighter";

      const inCoverPhase = elapsed < coverDuration;
      const dt = 1 / 60; // fixed step is fine for a short-lived decorative effect

      let envelope: number; // 0→1 opacity multiplier for particles this frame
      if (inCoverPhase) {
        const t = Math.min(elapsed / coverDuration, 1);
        envelope = t; // fade in as they break apart
        wipe.style.opacity = `${easeOutCubic(t)}`; // cover fades in in place, no motion
      } else {
        const t = Math.min((elapsed - coverDuration) / revealDuration, 1);
        envelope = 1 - t; // fade out as they settle into the revealed page
        wipe.style.opacity = `${1 - easeInCubic(t)}`;

        if (!coveredFiredRef.current) {
          coveredFiredRef.current = true;
          onCovered();
        }
      }

      const sprite = spriteRef.current;

      for (const p of particlesRef.current) {
        let effectiveSize = p.size;

        if (radial && p.r !== undefined && p.angle !== undefined && p.radialSpeed !== undefined) {
          // Slight angular wander keeps the radial flow from looking too mechanical.
          p.angle += Math.sin(elapsed * p.driftFreq + p.driftPhase) * 0.002;
          p.r += p.radialSpeed * dt;
          if (p.r > maxR) p.r = 0;
          if (p.r < 0) p.r = maxR;
          p.x = centerX + Math.cos(p.angle) * p.r;
          p.y = centerY + Math.sin(p.angle) * p.r;
          // Perspective-style scaling: bigger the farther out from center it is.
          effectiveSize = p.size * (0.3 + (p.r / maxR) * 1.7);
        } else {
          const wobble = Math.sin(elapsed * p.driftFreq + p.driftPhase) * p.driftAmp;
          if (isVertical) {
            p.x += (p.vx + wobble) * dt;
            p.y += p.vy * dt;
          } else {
            p.x += p.vx * dt;
            p.y += (p.vy + wobble) * dt;
          }
          // Wrap around edges so the flow never visibly runs out.
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        // Higher opacity around the cursor — falls off from hoverOpacityBoost
        // at the pointer itself to 0 at hoverRadius away, curved by hoverBlend.
        let hoverBoost = 0;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hoverRadius) {
          const proximity = 1 - dist / hoverRadius;
          hoverBoost = hoverOpacityBoost * Math.pow(proximity, hoverBlend);
        }

        // hoverBoost is scaled by the same envelope as the base opacity, so the
        // cursor highlight fades in/out together with the rest of the field
        // instead of staying at full strength through the reveal phase.
        const alpha = Math.max(0, Math.min(1, envelope * (p.targetOpacity + hoverBoost)));
        if (alpha <= 0.01) continue;

        // Glow halo (reused sprite, cheap to draw at particle-count scale).
        if (sprite && p.glow > 1.02) {
          const glowSize = effectiveSize * p.glow;
          ctx.globalAlpha = alpha * 0.85;
          ctx.drawImage(sprite, p.x - glowSize / 2, p.y - glowSize / 2, glowSize, glowSize);
        }

        // Solid center dot.
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, effectiveSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (elapsed < totalDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wipe.style.opacity = "0";
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionKey]);

  return (
    <div className="pointer-events-none fixed inset-0 z-2000" aria-hidden="true">
      {/* Full-screen cover — stays put, only its opacity animates in/out. The
          backdrop blur softens whatever's still showing through mid-fade,
          instead of a hard binary cut to black. */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background: wipeColor,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
        }}
      />
      {/* Drifting particles, drawn each frame on top of the cover. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
