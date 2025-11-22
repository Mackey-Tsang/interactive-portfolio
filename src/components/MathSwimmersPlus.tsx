"use client";

import React, { useEffect, useRef, CSSProperties } from "react";

/**
 * MathSwimmersPlus
 * - Morphable curve (shapeVariant + shapeParams)
 * - Keeps original "swim" timing feel
 * - Adds halo ring, spark particles, and swirl particles around the swimmer
 * - High-perf canvas with DPR cap and optional trails
 */

type Variant = "classic" | "vortex" | "lissajous" | "ribbon";

type ShapeParams = {
  // global
  freqK?: number;           // base frequency for k
  wobbleK?: number;         // wobble amplitude on k
  wobbleKSpeed?: number;    // wobble speed on k
  scaleQ?: number;          // scales q (main radius-ish)
  swirlQ?: number;          // extra swirl feed into q
  noiseQ?: number;          // small noise into q
  shiftX?: number;          // base x offset in math space
  shiftY?: number;          // base y offset in math space
  multX?: number;           // stretch X in math space
  multY?: number;           // stretch Y in math space
  // variant-specific
  lissaAx?: number;         // lissajous: Ax
  lissaAy?: number;         // lissajous: Ay
  lissaFx?: number;         // lissajous: fx
  lissaFy?: number;         // lissajous: fy
};

type HaloOpts = {
  enabled?: boolean;
  color?: string;
  alpha?: number;   // 0..1
  radius?: number;  // px in canvas space
  thickness?: number; // px
  feather?: number; // 0..1 soft edge
  composite?: GlobalCompositeOperation;
};

type SparkOpts = {
  enabled?: boolean;
  count?: number;
  size?: number;    // px
  color?: string;   // rgba
  composite?: GlobalCompositeOperation;
  wander?: number;  // noise amplitude
  follow?: number;  // follow strength to nearest path sample
  speed?: number;   // time multiplier
};

type SwirlOpts = {
  enabled?: boolean;
  count?: number;
  size?: number;
  color?: string;
  composite?: GlobalCompositeOperation;
  orbitRadius?: number;  // px around local path point
  orbitSpeed?: number;   // base angular speed
  drift?: number;        // random drift amplitude
};

type MathSwimmersPlusProps = {
  className?: string;
  style?: CSSProperties;

  // base painter for main swimmer dots
  color?: string;                 // rgba
  pointSize?: number;             // px
  composite?: GlobalCompositeOperation;
  opacity?: number;

  // animation
  speed?: number;                 // swim time multiplier
  pointsPerFrame?: number;        // density
  maxDpr?: number;

  // mapping math-space (default 400x400) to canvas
  domainWidth?: number;
  domainHeight?: number;
  fit?: "contain" | "cover" | "stretch";
  align?: "center" | "left" | "right" | "top" | "bottom";
  scaleX?: number;
  scaleY?: number;
  offsetX?: number;
  offsetY?: number;

  // trails
  trailFade?: number;             // 0 = hard clear, 0.02..0.2 = lingering trails

  // jitter on main points
  jitter?: number;

  // shape
  shapeVariant?: Variant;
  shapeParams?: ShapeParams;

  // effects
  halo?: HaloOpts;
  sparks?: SparkOpts;
  swirls?: SwirlOpts;

  // perf
  clampToCanvas?: boolean;
};

export default function MathSwimmersPlus({
  className = "",
  style,

  color = "rgba(0,255,209,0.95)",
  pointSize = 1.35,
  composite = "lighter",
  opacity = 1,

  speed = 1,
  pointsPerFrame = 8000,
  maxDpr = 2,

  domainWidth = 400,
  domainHeight = 400,
  fit = "contain",
  align = "center",
  scaleX = 1,
  scaleY = 1,
  offsetX = 0,
  offsetY = 0,

  trailFade = 0,
  jitter = 0.2,

  shapeVariant = "classic",
  shapeParams = {},

  halo = { enabled: true, color: "rgba(0,255,209,1)", alpha: 0.15, radius: 80, thickness: 28, feather: 0.8, composite: "lighter" },
  sparks = { enabled: true, count: 120, size: 1.2, color: "rgba(0,255,209,0.7)", composite: "lighter", wander: 0.8, follow: 0.35, speed: 1.2 },
  swirls = { enabled: true, count: 60, size: 1.5, color: "rgba(0,255,150,0.6)", composite: "lighter", orbitRadius: 16, orbitSpeed: 1.6, drift: 6 },

  clampToCanvas = true,
}: MathSwimmersPlusProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef<number>(0);

  // effect particles state (screen-space particles)
  const sparksRef = useRef<{ x: number; y: number; vx: number; vy: number; seed: number }[]>([]);
  const swirlsRef = useRef<{ x: number; y: number; a: number; seed: number }[]>([]);
  const pathSamplesRef = useRef<{ x: number; y: number }[]>([]); // down-sampled path points each frame

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---------- sizing / DPR ----------
    let baseSX = 1, baseSY = 1, baseOX = 0, baseOY = 0;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fit mapping
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

        let ox = 0, oy = 0;
        // horizontal align
        if (align === "left") ox = 0;
        else if (align === "right") ox = cw - fittedW;
        else ox = (cw - fittedW) / 2;
        // vertical align
        if (align === "top") oy = 0;
        else if (align === "bottom") oy = ch - fittedH;
        else oy = (ch - fittedH) / 2;

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
    const RND = (seed: number) => {
      // quick hash-based PRNG (deterministic per seed)
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // ---------- particles init ----------
    const ensureParticles = () => {
      const sCount = sparks?.enabled ? (sparks.count ?? 0) : 0;
      const wCount = swirls?.enabled ? (swirls.count ?? 0) : 0;

      if (sparksRef.current.length !== sCount) {
        sparksRef.current = new Array(sCount).fill(0).map((_, i) => ({
          x: (container.clientWidth || 1) * Math.random(),
          y: (container.clientHeight || 1) * Math.random(),
          vx: 0,
          vy: 0,
          seed: i + 1,
        }));
      }
      if (swirlsRef.current.length !== wCount) {
        swirlsRef.current = new Array(wCount).fill(0).map((_, i) => ({
          x: (container.clientWidth || 1) * Math.random(),
          y: (container.clientHeight || 1) * Math.random(),
          a: Math.random() * Math.PI * 2,
          seed: 1000 + i,
        }));
      }
    };
    ensureParticles();

    // ---------- main equation variants ----------
    const p = {
      freqK: shapeParams.freqK ?? 1,
      wobbleK: shapeParams.wobbleK ?? 3,
      wobbleKSpeed: shapeParams.wobbleKSpeed ?? 1,
      scaleQ: shapeParams.scaleQ ?? 1,
      swirlQ: shapeParams.swirlQ ?? 1,
      noiseQ: shapeParams.noiseQ ?? 0,
      shiftX: shapeParams.shiftX ?? 0,
      shiftY: shapeParams.shiftY ?? 0,
      multX: shapeParams.multX ?? 1,
      multY: shapeParams.multY ?? 1,
      lissaAx: shapeParams.lissaAx ?? 1.0,
      lissaAy: shapeParams.lissaAy ?? 0.8,
      lissaFx: shapeParams.lissaFx ?? 1.0,
      lissaFy: shapeParams.lissaFy ?? 1.5,
    };

    const evalClassic = (x: number, y: number, t: number) => {
      const k = (4 + Math.sin(y * 2 - t * p.wobbleKSpeed) * p.wobbleK) * Math.cos((x / 29) * p.freqK);
      const e = y / 8 - 13;
      const d = mag(k, e);
      const kk = safeInv(k);
      const q =
        p.scaleQ *
        (3 * Math.sin(k * 2) +
          0.3 / kk +
          Math.sin(y / 25) * k * (9 + 4 * Math.sin(e * 9 - d * 3 + t * 2)) +
          p.swirlQ * 0.15 * Math.sin(d * 2 + t * 1.3) +
          p.noiseQ * 0.2 * Math.sin(x * 0.03 + y * 0.017 + t * 1.7));
      const c = d - t;
      const mx = q + 30 * Math.cos(c) + 200 + p.shiftX + (x * (p.multX - 1)) / 20;
      const my = q * Math.sin(c) + d * 39 - 220 + p.shiftY + (y * (p.multY - 1)) / 20;
      return { mx, my };
    };

    const evalVortex = (x: number, y: number, t: number) => {
      const k = (3 + Math.sin(y * 1.3 + t) * (p.wobbleK * 0.7)) * Math.cos((x / 25) * p.freqK);
      const e = y / 10 - 10;
      const d = mag(k, e);
      const mxBase = 180 + 22 * Math.cos(d * 1.2 - t * 1.4) + p.shiftX;
      const myBase = -210 + 35 * d + p.shiftY;
      const swirl = 26 * Math.sin((x * 0.05 + t * 1.8) * (1 + 0.2 * Math.sin(y * 0.2)));
      const mx = mxBase + p.scaleQ * (swirl + 0.2 * y) + (x * (p.multX - 1)) / 24;
      const my = myBase + p.scaleQ * (swirl * Math.sin(d - t)) + (y * (p.multY - 1)) / 24;
      return { mx, my };
    };

    const evalLissajous = (x: number, y: number, t: number) => {
      // embeds a slow-moving lissajous motion into the original field
      const lx = 60 * p.lissaAx * Math.sin(p.lissaFx * 0.6 * t + 0.3);
      const ly = 60 * p.lissaAy * Math.sin(p.lissaFy * 0.55 * t + 0.7);
      const base = evalClassic(x, y, t);
      return { mx: base.mx + lx, my: base.my + ly };
    };

    const evalRibbon = (x: number, y: number, t: number) => {
      // wider band, flowing “ribbon”
      const k = (4 + Math.sin(y * 1.7 - t) * (p.wobbleK * 0.6)) * Math.cos((x / 31) * p.freqK);
      const e = y / 7 - 12.5;
      const d = mag(k, e);
      const kk = safeInv(k);
      const q =
        p.scaleQ *
        (2.5 * Math.sin(k * 1.7) +
          0.25 / kk +
          Math.sin(y / 28) * k * (8 + 3.2 * Math.sin(e * 8.5 - d * 2.7 + t * 1.8)));
      const c = d - t * 0.9;
      const mx = q + 44 * Math.cos(c) + 200 + p.shiftX + (x * (p.multX - 1)) / 22;
      const my = q * Math.sin(c) + d * 36 - 215 + p.shiftY + (y * (p.multY - 1)) / 22;
      return { mx, my };
    };

    const evalVariant = (x: number, y: number, t: number) => {
      switch (shapeVariant) {
        case "vortex": return evalVortex(x, y, t);
        case "lissajous": return evalLissajous(x, y, t);
        case "ribbon": return evalRibbon(x, y, t);
        default: return evalClassic(x, y, t);
      }
    };

    // ---------- frame loop ----------
    const drawFrame = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // fade / clear
      if (trailFade > 0) {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = trailFade;
        ctx.clearRect(0, 0, width, height); // keep alpha healthy
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // build path samples (downsampled main curve) for effects to follow
      pathSamplesRef.current.length = 0;

      const sx = baseSX * scaleX;
      const sy = baseSY * scaleY;

      // time step
      const dt = (Math.PI / 240) * speed;
      tRef.current += dt;
      const t = tRef.current;

      // draw main swimmer
      ctx.globalCompositeOperation = composite;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      const N = pointsPerFrame;
      const step = Math.max(1, Math.floor(N / 800)); // thin sampling for effect following

      for (let i = 0; i < N; i++) {
        const x = i;
        const y = i / 235;

        const { mx, my } = evalVariant(x, y, t);
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

        if (i % step === 0) pathSamplesRef.current.push({ x: px, y: py });
      }

      // draw halo (radial soft ring) around centroid of path samples
      if (halo?.enabled && pathSamplesRef.current.length > 0) {
        ctx.save();
        const cx =
          pathSamplesRef.current.reduce((s, p) => s + p.x, 0) / pathSamplesRef.current.length;
        const cy =
          pathSamplesRef.current.reduce((s, p) => s + p.y, 0) / pathSamplesRef.current.length;
        const radius = halo.radius ?? 80;
        const thickness = halo.thickness ?? 28;
        const feather = Math.max(0, Math.min(1, halo.feather ?? 0.8));
        const inner = Math.max(1, radius - thickness / 2);
        const outer = radius + thickness / 2;
        const grad = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
        const col = halo.color ?? "rgba(0,255,209,1)";
        grad.addColorStop(0, `rgba(0,0,0,0)`);
        grad.addColorStop(1 - feather * 0.95, `${col}`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.globalCompositeOperation = halo.composite ?? "lighter";
        ctx.globalAlpha = (halo.alpha ?? 0.15);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, outer, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // update and draw sparks (wander + attracted to nearest sample)
      if (sparks?.enabled && sparksRef.current.length && pathSamplesRef.current.length) {
        ctx.save();
        ctx.globalCompositeOperation = sparks.composite ?? "lighter";
        ctx.fillStyle = sparks.color ?? "rgba(0,255,209,0.7)";
        const s = sparks;
        const follow = s.follow ?? 0.35;
        const wander = s.wander ?? 0.8;
        const spd = (s.speed ?? 1) * 0.8;

        // nearest sample (simple O(n), fine for small sample set)
        const nearest = (x: number, y: number) => {
          let best = 0;
          let bd = Infinity;
          const arr = pathSamplesRef.current;
          for (let i = 0; i < arr.length; i++) {
            const dx = arr[i].x - x, dy = arr[i].y - y;
            const d = dx * dx + dy * dy;
            if (d < bd) { bd = d; best = i; }
          }
          return arr[best];
        };

        for (const ptk of sparksRef.current) {
          const n = (Math.sin((ptk.seed + t * spd) * 2.1) + 1) * 0.5;
          ptk.vx += (Math.random() - 0.5) * wander * (0.6 + n);
          ptk.vy += (Math.random() - 0.5) * wander * (0.6 + n);

          const target = nearest(ptk.x, ptk.y);
          ptk.vx += (target.x - ptk.x) * follow * 0.015;
          ptk.vy += (target.y - ptk.y) * follow * 0.015;

          ptk.vx *= 0.96;
          ptk.vy *= 0.96;

          ptk.x += ptk.vx;
          ptk.y += ptk.vy;

          ctx.beginPath();
          ctx.arc(ptk.x, ptk.y, sparks.size ?? 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // update and draw swirls (little orbiters around local path)
      if (swirls?.enabled && swirlsRef.current.length && pathSamplesRef.current.length) {
        ctx.save();
        ctx.globalCompositeOperation = swirls.composite ?? "lighter";
        ctx.fillStyle = swirls.color ?? "rgba(0,255,150,0.6)";
        const orbitR = swirls.orbitRadius ?? 16;
        const orbitSpeed = swirls.orbitSpeed ?? 1.6;
        const drift = swirls.drift ?? 6;
        const samples = pathSamplesRef.current;

        for (let i = 0; i < swirlsRef.current.length; i++) {
          const s = swirlsRef.current[i];
          s.a += 0.02 * orbitSpeed;
          // follow along a moving index
          const idx = Math.floor(((i * 13.37) + t * 40) % samples.length);
          const base = samples[idx];
          const ox = Math.cos(s.a) * orbitR + (Math.sin(s.seed + t * 0.7) * drift);
          const oy = Math.sin(s.a) * orbitR + (Math.cos(s.seed + t * 0.9) * drift);
          s.x = base.x + ox;
          s.y = base.y + oy;

          ctx.beginPath();
          ctx.arc(s.x, s.y, swirls.size ?? 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    // painter
    color, pointSize, composite, opacity,
    // anim
    speed, pointsPerFrame, maxDpr,
    // mapping
    domainWidth, domainHeight, fit, align, scaleX, scaleY, offsetX, offsetY,
    // trails
    trailFade,
    // jitter
    jitter,
    // shape
    shapeVariant, shapeParams,
    // effects
    halo?.enabled, halo?.color, halo?.alpha, halo?.radius, halo?.thickness, halo?.feather, halo?.composite,
    sparks?.enabled, sparks?.count, sparks?.size, sparks?.color, sparks?.composite, sparks?.wander, sparks?.follow, sparks?.speed,
    swirls?.enabled, swirls?.count, swirls?.size, swirls?.color, swirls?.composite, swirls?.orbitRadius, swirls?.orbitSpeed, swirls?.drift,
    // perf
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
