// src/components/ParticleImage.tsx
"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Renderer, Geometry, Program, Mesh, Texture } from "ogl";
import { gsap } from "gsap";

export interface ParticleImageItem {
  image: string;
}

/** Imperative handle so a parent (e.g. a drag/scroll/dot-driven pager) can
 *  step through images externally, the same shape MorphSlider used to expose. */
export interface ParticleImageHandle {
  next: () => void;
  prev: () => void;
  /** Jump directly by any signed offset, not just ±1 (e.g. a dot indicator
   *  jumping straight from image 1 to image 5 in one dissolve). */
  goTo: (dir: number) => void;
}

export interface ParticleImageProps {
  items?: ParticleImageItem[];
  startIndex?: number;
  className?: string;
  /** Roughly how many particles make up the image — the actual grid is
   *  rounded to match the box's aspect ratio (cols × rows ≈ particleCount). */
  particleCount?: number;
  /** Point-sprite diameter range, in CSS px (before devicePixelRatio scaling). */
  minSize?: number;
  maxSize?: number;
  /** How far apart particles fly at the peak of the dissolve (0 = no
   *  movement, 1 ≈ half the box's width/height of travel). */
  swirlStrength?: number;
  /** How fast particles orbit/spin while dissolved. */
  swirlSpeed?: number;
  /** Seconds for one full dissolve-apart + reassemble transition. */
  duration?: number;
  ease?: string;
  /** Additive glow tint applied to particles while they're dissolved. */
  glowColor?: string;
  glowIntensity?: number;
  onIndexChange?: (index: number) => void;
  [key: string]: unknown;
}

interface EngineOptions {
  particleCount: number;
  minSize: number;
  maxSize: number;
  swirlStrength: number;
  swirlSpeed: number;
  duration: number;
  ease: string;
  glowColor: string;
  glowIntensity: number;
}

type GL = Renderer["gl"];

const DEFAULT_ITEMS: ParticleImageItem[] = [
  { image: "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop" },
  { image: "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop" }
];

const vertexShader = `
attribute vec2 position;
attribute float aRand;
uniform float uProgress;
uniform float uTime;
uniform float uSwirlStrength;
uniform float uSwirlSpeed;
uniform float uMinSize;
uniform float uMaxSize;
uniform float uDpr;
uniform float uReduce;
varying vec2 vUv;
varying float vRand;
varying float vEnv;
const float PI = 3.14159265359;

void main() {
  vUv = position;
  vRand = aRand;
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);
  vEnv = env;

  vec2 base = position * 2.0 - 1.0;
  vec2 pos = base;

  if (uReduce < 0.5) {
    float spin = mix(-1.0, 1.0, step(0.5, aRand));
    float angle = aRand * 6.2831853 + uTime * uSwirlSpeed * spin;
    float orbitR = uSwirlStrength * env * (0.35 + aRand * 0.65);
    vec2 orbit = vec2(cos(angle), sin(angle)) * orbitR;

    float centerDist = max(length(base), 0.0001);
    vec2 outward = (base / centerDist) * env * uSwirlStrength * 0.5 * aRand;

    pos = base + orbit + outward;
  } else {
    // Reduced motion: fade instead of fly apart.
    pos = base;
  }

  gl_Position = vec4(pos, 0.0, 1.0);

  float size = mix(uMinSize, uMaxSize, aRand);
  gl_PointSize = size * uDpr;
}
`;

const fragmentShader = `
precision highp float;
uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;
uniform float uReduce;
varying vec2 vUv;
varying float vRand;
varying float vEnv;

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;
  float mask = smoothstep(0.5, 0.08, d);

  vec2 sC = coverUV(vUv, uResolution, uCurrentSize);
  vec2 sN = coverUV(vUv, uResolution, uNextSize);
  vec3 colC = texture2D(tCurrent, sC).rgb;
  vec3 colN = texture2D(tNext, sN).rgb;
  float texMix = smoothstep(0.42, 0.58, uProgress);
  vec3 col = mix(colC, colN, texMix);

  col += uGlowColor * uGlowIntensity * vEnv;

  float alpha = mask * (uReduce < 0.5 ? mix(1.0, 0.8, vEnv) : mix(1.0, 0.15, vEnv));
  gl_FragColor = vec4(col, alpha);
}
`;

function makeFallbackTexture(gl: GL): Texture {
  const size = 4;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    data[i * 4] = 24;
    data[i * 4 + 1] = 24;
    data[i * 4 + 2] = 28;
    data[i * 4 + 3] = 255;
  }
  return new Texture(gl, { image: data, width: size, height: size, generateMipmaps: false });
}

function hexToRgb(hex: string): [number, number, number] {
  let h = (hex || "#000000").replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map(c => c + c)
      .join("");
  }
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

interface EngineConfig {
  items: ParticleImageItem[];
  startIndex: number;
  reducedMotion: boolean;
  getOptions: () => EngineOptions;
  onIndexChange: (index: number) => void;
  dprCap: number;
}

class ParticleEngine {
  private container: HTMLElement;
  private items: ParticleImageItem[];
  private getOptions: () => EngineOptions;
  private onIndexChange: (index: number) => void;
  private reducedMotion: boolean;
  private current: number;
  private animating = false;
  private shownIndex: number;
  private tween: gsap.core.Tween | null = null;
  private renderer: Renderer;
  private gl: GL;
  private canvas: HTMLCanvasElement;
  private geometry!: Geometry;
  private program!: Program;
  private mesh!: Mesh;
  private textures: Texture[];
  private sizes: [number, number][];
  private resizeObserver: ResizeObserver;
  private raf = 0;
  private boundLoop: (t: number) => void;
  private boundContextLost: (e: Event) => void;

  constructor(container: HTMLElement, config: EngineConfig) {
    this.container = container;
    this.items = config.items;
    this.getOptions = config.getOptions;
    this.onIndexChange = config.onIndexChange;
    this.reducedMotion = config.reducedMotion;
    this.current = config.startIndex;
    this.shownIndex = config.startIndex;
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, config.dprCap)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.canvas = this.gl.canvas as HTMLCanvasElement;
    this.canvas.className = "block w-full h-full";
    container.appendChild(this.canvas);

    this.textures = this.items.map(() => makeFallbackTexture(this.gl));
    this.sizes = this.items.map(() => [1, 1] as [number, number]);

    this.buildGeometry();

    const opts = this.getOptions();
    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tCurrent: { value: this.textures[this.current] },
        tNext: { value: this.textures[this.current] },
        uResolution: { value: [1, 1] },
        uCurrentSize: { value: this.sizes[this.current] },
        uNextSize: { value: this.sizes[this.current] },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uSwirlStrength: { value: opts.swirlStrength },
        uSwirlSpeed: { value: opts.swirlSpeed },
        uMinSize: { value: opts.minSize },
        uMaxSize: { value: opts.maxSize },
        uDpr: { value: this.renderer.dpr },
        uGlowColor: { value: hexToRgb(opts.glowColor) },
        uGlowIntensity: { value: opts.glowIntensity },
        uReduce: { value: this.reducedMotion ? 1 : 0 }
      }
    });
    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program, mode: this.gl.POINTS });

    this.boundContextLost = this.onContextLost.bind(this);
    this.canvas.addEventListener("webglcontextlost", this.boundContextLost, false);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
    this.loadTextures();
    this.boundLoop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.boundLoop);
  }

  private buildGeometry(): void {
    const opts = this.getOptions();
    const targetCount = Math.max(opts.particleCount, 4);
    const rect = this.container.getBoundingClientRect();
    const aspect = (rect.width || 1) / (rect.height || 1);
    const cols = Math.max(2, Math.round(Math.sqrt(targetCount * aspect)));
    const rows = Math.max(2, Math.round(targetCount / cols));
    const count = cols * rows;

    const position = new Float32Array(count * 2);
    const aRand = new Float32Array(count);
    let idx = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        position[idx * 2] = (x + 0.5) / cols;
        position[idx * 2 + 1] = (y + 0.5) / rows;
        aRand[idx] = Math.random();
        idx++;
      }
    }

    this.geometry = new Geometry(this.gl, {
      position: { size: 2, data: position },
      aRand: { size: 1, data: aRand }
    });
  }

  private loadTextures(): void {
    this.items.forEach((item, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.image;
      img.onload = () => {
        const texture = new Texture(this.gl, { generateMipmaps: false });
        texture.image = img;
        this.textures[index] = texture;
        this.sizes[index] = [img.naturalWidth || 1, img.naturalHeight || 1];
        if (index === this.current) {
          this.program.uniforms.tCurrent.value = texture;
          this.program.uniforms.uCurrentSize.value = this.sizes[index];
        }
      };
      img.onerror = () => {
        // eslint-disable-next-line no-console
        console.error(
          `[ParticleImage] Failed to load image at index ${index}: "${item.image}". ` +
            `Check that the path is correct and the file exists under your Next.js "public" folder ` +
            `(e.g. "public/cyber-physical/project-1.jpg" for image="/cyber-physical/project-1.jpg"), ` +
            `and that the filename case matches exactly.`
        );
      };
    });
  }

  private resize(): void {
    const rect = this.container.getBoundingClientRect();
    const w = Math.max(rect.width, 1);
    const h = Math.max(rect.height, 1);
    this.renderer.setSize(w, h);
    this.program.uniforms.uResolution.value = [this.gl.canvas.width, this.gl.canvas.height];
  }

  private syncOptions(): void {
    const opts = this.getOptions();
    this.program.uniforms.uSwirlStrength.value = opts.swirlStrength;
    this.program.uniforms.uSwirlSpeed.value = opts.swirlSpeed;
    this.program.uniforms.uMinSize.value = opts.minSize;
    this.program.uniforms.uMaxSize.value = opts.maxSize;
    this.program.uniforms.uGlowColor.value = hexToRgb(opts.glowColor);
    this.program.uniforms.uGlowIntensity.value = opts.glowIntensity;
  }

  private loop(t: number): void {
    this.program.uniforms.uTime.value = t * 0.001;
    if (!this.animating) this.syncOptions();
    this.renderer.render({ scene: this.mesh });
    this.raf = requestAnimationFrame(this.boundLoop);
  }

  private wrap(i: number): number {
    const n = this.items.length;
    return ((i % n) + n) % n;
  }

  private prepareNext(dir: number): number {
    const target = this.wrap(this.current + dir);
    this.program.uniforms.tCurrent.value = this.textures[this.current];
    this.program.uniforms.uCurrentSize.value = this.sizes[this.current];
    this.program.uniforms.tNext.value = this.textures[target];
    this.program.uniforms.uNextSize.value = this.sizes[target];
    return target;
  }

  private announce(index: number): void {
    if (index === this.shownIndex) return;
    this.shownIndex = index;
    this.onIndexChange(index);
  }

  private commit(target: number): void {
    this.current = target;
    this.program.uniforms.tCurrent.value = this.textures[target];
    this.program.uniforms.uCurrentSize.value = this.sizes[target];
    this.program.uniforms.uProgress.value = 0;
    this.animating = false;
    this.tween = null;
    this.announce(target);
  }

  goTo(dir: number): void {
    if (this.animating || this.items.length < 2 || dir === 0) return;
    this.syncOptions();
    const target = this.prepareNext(dir);
    this.animating = true;
    const opts = this.getOptions();
    const duration = this.reducedMotion ? Math.min(opts.duration, 0.4) : opts.duration;
    this.tween = gsap.fromTo(
      this.program.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration,
        ease: opts.ease,
        onUpdate: () => {
          const p = this.program.uniforms.uProgress.value as number;
          if (p >= 0.5) this.announce(target);
        },
        onComplete: () => this.commit(target)
      }
    );
  }

  next(): void {
    this.goTo(1);
  }

  prev(): void {
    this.goTo(-1);
  }

  private onContextLost(e: Event): void {
    e.preventDefault();
    cancelAnimationFrame(this.raf);
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    if (this.tween) this.tween.kill();
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener("webglcontextlost", this.boundContextLost);
    this.textures.forEach(tex => {
      if (tex && tex.texture) this.gl.deleteTexture(tex.texture);
    });
    if (this.program && this.program.program) this.gl.deleteProgram(this.program.program);
    const ext = this.gl.getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

function ParticleImageInner(
  {
    items = DEFAULT_ITEMS,
    startIndex = 0,
    className = "",
    particleCount = 6000,
    minSize = 2,
    maxSize = 5,
    swirlStrength = 0.55,
    swirlSpeed = 1.6,
    duration = 1.1,
    ease = "power2.inOut",
    glowColor = "#67e8f9",
    glowIntensity = 0.35,
    onIndexChange,
    ...props
  }: ParticleImageProps,
  ref: React.Ref<ParticleImageHandle>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const optsRef = useRef<EngineOptions>({
    particleCount,
    minSize,
    maxSize,
    swirlStrength,
    swirlSpeed,
    duration,
    ease,
    glowColor,
    glowIntensity
  });
  optsRef.current = {
    particleCount,
    minSize,
    maxSize,
    swirlStrength,
    swirlSpeed,
    duration,
    ease,
    glowColor,
    glowIntensity
  };

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new ParticleEngine(containerRef.current, {
      items,
      startIndex,
      reducedMotion,
      dprCap: 2,
      getOptions: () => optsRef.current,
      onIndexChange: (i: number) => {
        onIndexChange?.(i);
      }
    });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // Rebuilt whenever the image set, start index, or particle grid density
    // changes — the grid geometry is baked once at construction time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, startIndex, particleCount]);

  // External control — lets a parent drive the effect (e.g. from its own
  // drag/scroll gesture, or a dot indicator) via a ref.
  useImperativeHandle(
    ref,
    () => ({
      next: () => engineRef.current?.next(),
      prev: () => engineRef.current?.prev(),
      goTo: (dir: number) => engineRef.current?.goTo(dir)
    }),
    []
  );

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-[#0c0c0e] ${className}`.trim()} {...props}>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}

const ParticleImage = forwardRef(ParticleImageInner);
export default ParticleImage;
