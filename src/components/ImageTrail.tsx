"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/* ---------------- helpers ---------------- */
function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}
function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0,
    clientY = 0;
  if ("touches" in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ("clientX" in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}
function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/* ---------------- image item ---------------- */
class ImageItem {
  public DOM: { el: HTMLDivElement; inner: HTMLDivElement | null } = {
    el: null as unknown as HTMLDivElement,
    inner: null,
  };
  public defaultStyle: gsap.TweenVars = { scale: 1, x: 0, y: 0, opacity: 0 };
  public rect: DOMRect | null = null;
  private resize!: () => void;

  constructor(DOM_el: HTMLDivElement) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector(".content__img-inner");
    this.getRect();
    this.initEvents();
  }

  private initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener("resize", this.resize);
  }

  private getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  public destroy() {
    if (this.resize) window.removeEventListener("resize", this.resize);
  }
}

/* ---------------- base trail class ---------------- */
abstract class TrailBase {
  protected container: HTMLDivElement;
  protected images: ImageItem[];
  protected imagesTotal: number;
  protected imgPosition = 0;
  protected zIndexVal = 1;
  protected activeImagesCount = 0;
  protected isIdle = true;
  protected threshold = 80;
  protected mousePos = { x: 0, y: 0 };
  protected lastMousePos = { x: 0, y: 0 };
  protected cacheMousePos = { x: 0, y: 0 };
  protected raf = 0;

  private handlePointerMoveBound!: (e: MouseEvent | TouchEvent) => void;
  private initRenderBound!: (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.images = [...container.querySelectorAll(".content__img")].map(
      (img) => new ImageItem(img as HTMLDivElement)
    );
    this.imagesTotal = this.images.length;

    this.handlePointerMoveBound = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener("mousemove", this.handlePointerMoveBound);
    container.addEventListener("touchmove", this.handlePointerMoveBound, { passive: true });

    this.initRenderBound = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.raf = requestAnimationFrame(() => this.render());
      container.removeEventListener("mousemove", this.initRenderBound as EventListener);
      container.removeEventListener("touchmove", this.initRenderBound as EventListener);
    };
    container.addEventListener("mousemove", this.initRenderBound as EventListener);
    container.addEventListener("touchmove", this.initRenderBound as EventListener, { passive: true });
  }

  protected render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    this.raf = requestAnimationFrame(() => this.render());
  }

  protected onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  protected onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  public destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.container.removeEventListener("mousemove", this.handlePointerMoveBound);
    this.container.removeEventListener("touchmove", this.handlePointerMoveBound);
    this.container.removeEventListener("mousemove", this.initRenderBound as EventListener);
    this.container.removeEventListener("touchmove", this.initRenderBound as EventListener);
    this.images.forEach((img) => img.destroy());
  }

  protected abstract showNextImage(): void;
}

/* ---------------- variants ---------------- */
class ImageTrailVariant1 extends TrailBase {
  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
        },
        0
      )
      .to(
        img.DOM.el,
        { duration: 0.4, ease: "power3", opacity: 0, scale: 0.2 },
        0.4
      );
  }
}

class ImageTrailVariant2 extends TrailBase {
  protected showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          scale: 1,
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        { scale: 2.8, filter: "brightness(250%)" },
        { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%)" },
        0
      )
      .to(
        img.DOM.el,
        { duration: 0.4, ease: "power2", opacity: 0, scale: 0.2 },
        0.45
      );
  }
}

/* You can keep adding the other variants (3–8) same as your example…
   For brevity, we’ll map only 1 & 2 here. Add others if you want. */

type ImageTrailConstructor = typeof ImageTrailVariant1 | typeof ImageTrailVariant2;

const variantMap: Record<number, ImageTrailConstructor> = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
};

export interface ImageTrailProps {
  items: string[];
  variant?: number; // 1 or 2 unless you paste the rest
  className?: string;
}

export default function ImageTrail({ items, variant = 1, className = "" }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailBase | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // init trail
    const Cls = variantMap[variant] || variantMap[1];
    trailRef.current = new Cls(containerRef.current);

    return () => {
      // cleanup listeners & raf
      trailRef.current?.destroy();
      trailRef.current = null;
    };
  }, [variant, items]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-visible ${className}`}
      style={{ touchAction: "none" }}
    >
      {items.map((url, i) => (
        <div
          key={i}
           className="content__img w-[280px] aspect-[1.1] rounded-[20px] absolute top-0 left-0 opacity-0 overflow-hidden will-change-[transform,filter]"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute -top-2.5 -left-2.5"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}
