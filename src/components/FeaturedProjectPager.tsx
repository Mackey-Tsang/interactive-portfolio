// src/components/FeaturedProjectPager.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MorphSlider, { type MorphSliderHandle, type MorphTransition } from "@/components/MorphSlider";
import ScrambledText from "@/components/ScrambledText";

export interface FeaturedProject {
  name: string;
  type: string;
  year: string | number;
  description: string;
  software: string[];
  href: string;
  /** Source image — also what the morph shader transitions between. */
  image: string;
}

interface FeaturedProjectPagerProps {
  projects: FeaturedProject[];
  className?: string;
  transition?: MorphTransition;
  morphDuration?: number;
  /** Height (px) of the image box. */
  imageHeight?: number;
  /** Opacity of the image/slider itself (0–1). */
  imageOpacity?: number;
  /** Corner radius (px) of the image box. */
  imageRadius?: number;
  /** Blur (px) applied only near the image's edges — a soft vignette-style
   *  feather. 0 disables the effect entirely (crisp edges, default). */
  imageEdgeBlur?: number;
  /** How far in from the edge the blur reaches, in percent (0–50) of the
   *  image's radius — bigger = the blurred ring eats further into the
   *  image. Only matters when imageEdgeBlur > 0. */
  imageEdgeBlurSpread?: number;
  /** Opacity of the text box itself — the panel that sits behind the
   *  name/description/type text (0–1). 0 = no fill at all (default). */
  textBoxOpacity?: number;
  /** Backdrop blur (px) applied behind the text box. Note: even at
   *  textBoxOpacity 0, a nonzero blur still smudges whatever's behind it
   *  into a visible box — so 0 (default) is the only way to make the box
   *  truly invisible. Raise it only if you want a frosted-glass look. */
  textBoxBlur?: number;
  /** Corner radius (px) of the text box. */
  textRadius?: number;
  /** Overall width (px) of the pager — applies to both the image box and
   *  the text box below it (the image's height still comes from
   *  imageHeight separately). */
  width?: number;
}

const SWIPE_STEP_PX = 70; // vertical drag distance per project step
const WHEEL_STEP = 60; // accumulated wheel delta per project step
const NUDGE_PX = 14; // how far the whole card dips in the travel direction
const TEXT_SWAP_MS = 260; // how long the info panel takes to crossfade

export default function FeaturedProjectPager({
  projects,
  className = "",
  transition = "melt",
  morphDuration = 0.9,
  imageHeight = 480,
  imageOpacity = .6,
  imageRadius = 5,
  imageEdgeBlur = 0,
  imageEdgeBlurSpread = 20,
  textBoxOpacity = 0.1,
  textRadius = 12,
  textBoxBlur = 0,
  width = 400,
}: FeaturedProjectPagerProps) {
  const router = useRouter();
  const count = projects.length;

  // activeIndex drives the morph slider (kept in lockstep via goTo()).
  // displayedIndex lags it by TEXT_SWAP_MS so the info panel fades out on the
  // OLD project, swaps content while invisible, then fades in on the new one
  // — instead of the text snapping instantly while still fading.
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const [cardOffset, setCardOffset] = useState(0);

  // Hover/press state for the image box's "Uiverse card" style feedback —
  // scales up slightly on hover, dips down + tilts on press, border
  // brightens on hover. Kept as plain state (not CSS :hover) so it composes
  // cleanly with the existing cardOffset paging transform below.
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardPressed, setIsCardPressed] = useState(false);

  // Position (relative to the image box) of the custom "Scroll" cursor
  // indicator — null while the pointer isn't over the image at all.
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const morphRef = useRef<MorphSliderHandle>(null);
  const gestureRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const displayedProject = projects[displayedIndex];

  // Generalized advance — accepts any signed offset, not just ±1, so a dot
  // indicator can jump straight from project 1 to project 5 in a single
  // morph transition (MorphSlider's engine.goTo(dir) wraps by however many
  // slots "dir" is, it doesn't have to step one at a time).
  const advanceBy = useCallback(
    (dir: number) => {
      if (busyRef.current || count < 2 || dir === 0) return;
      busyRef.current = true;
      window.setTimeout(() => {
        busyRef.current = false;
      }, morphDuration * 1000 + 80);

      const target = ((activeIndex + dir) % count + count) % count;
      setActiveIndex(target);
      morphRef.current?.goTo(dir);

      // Paging cue: dip the whole card in the travel direction, then ease
      // back to rest (the wrapper always has a transition class, so both
      // the dip and the return animate).
      const nudgeDir = dir > 0 ? 1 : -1;
      setCardOffset(nudgeDir * NUDGE_PX);
      setInfoVisible(false);
      window.setTimeout(() => {
        setCardOffset(0);
        setDisplayedIndex(target);
        setInfoVisible(true);
      }, TEXT_SWAP_MS);
    },
    [activeIndex, count, morphDuration]
  );

  // Jump directly to a specific project (dot indicator clicks).
  const goToIndex = useCallback(
    (target: number) => {
      if (target === activeIndex) return;
      advanceBy(target - activeIndex);
    },
    [activeIndex, advanceBy]
  );

  // Vertical drag — scoped to the image box only (via gestureRef), so the
  // info panel below stays completely normal (selectable text, a plain
  // clickable button) with no z-index tricks needed.
  useEffect(() => {
    const el = gestureRef.current;
    if (!el) return;
    let dragging = false;
    let baselineY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      baselineY = e.clientY;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientY - baselineY;
      if (Math.abs(delta) >= SWIPE_STEP_PX) {
        advanceBy(delta < 0 ? 1 : -1); // dragged up -> next, dragged down -> prev
        baselineY = e.clientY;
      }
    };
    const onUp = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [advanceBy]);

  // Scroll wheel — works anywhere over the whole pager (card + dots), so
  // it's attached to the outer wrapper.
  useEffect(() => {
    const el = gestureRef.current?.closest("[data-pager-root]") as HTMLElement | null;
    if (!el) return;
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accum += e.deltaY;
      if (Math.abs(accum) >= WHEEL_STEP) {
        advanceBy(accum > 0 ? 1 : -1);
        accum = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advanceBy]);

  const items = useMemo(() => projects.map((p) => ({ image: p.image })), [projects]);

  return (
    <div
      data-pager-root
      className={`absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 select-none ${className}`}
    >
      <div className="flex items-center gap-4 md:gap-5">
        {/* IMAGE BOX — the morph shader lives here, driven externally via goTo().
            Hover/press feedback adapted from a Uiverse.io card style: scales up
            on hover, dips + tilts on press, border brightens on hover — all
            composed with the existing paging dip (cardOffset) in one transform. */}
        <div
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => {
            setIsCardHovered(false);
            setIsCardPressed(false);
          }}
          onMouseDown={() => setIsCardPressed(true)}
          onMouseUp={() => setIsCardPressed(false)}
          className="overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 ease-out"
          style={{
            width,
            transform: `translateY(${cardOffset}px) scale(${isCardPressed ? 0.95 : isCardHovered ? 1.05 : 1}) rotateZ(${isCardPressed ? 1.7 : 0}deg)`,
            borderRadius: `${imageRadius}px`,
            opacity: imageOpacity,
            backgroundColor: "#0c0c0e",
            border: `1px solid ${isCardHovered ? "#000000" : "rgba(255, 255, 255, 0.25)"}`,
          }}
        >
          <div className="relative w-full" style={{ height: imageHeight }}>
            <MorphSlider
              ref={morphRef}
              items={items}
              transition={transition}
              duration={morphDuration}
              showCaptions={false}
              showControls={false}
              showIndicators={false}
              className="h-full w-full"
              radius={0}
            />
            {/* Edge blur — a vignette-style feather that only blurs a ring near
                the image's border, via a masked backdrop-filter overlay.
                Disabled (no overlay at all) when imageEdgeBlur is 0. */}
            {imageEdgeBlur > 0 && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backdropFilter: `blur(${imageEdgeBlur}px)`,
                  WebkitBackdropFilter: `blur(${imageEdgeBlur}px)`,
                  maskImage: `radial-gradient(ellipse at center, transparent ${100 - imageEdgeBlurSpread}%, black 100%)`,
                  WebkitMaskImage: `radial-gradient(ellipse at center, transparent ${100 - imageEdgeBlurSpread}%, black 100%)`,
                }}
              />
            )}
            {/* Gesture layer for vertical drag — image only, not the info panel below.
                Native cursor is hidden (cursor-none); a custom "Scroll" + double-chevron
                indicator follows the pointer instead (rendered below), since no built-in
                CSS cursor can carry both an icon and a text label. */}
            <div
              ref={gestureRef}
              className="absolute inset-0 z-10 cursor-none touch-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => setCursorPos(null)}
            />
            {/* Custom hover cursor — "Scroll" label above a two-line downward chevron,
                offset from the real pointer position so it doesn't sit under the cursor. */}
            {cursorPos && (
              <div
                className="pointer-events-none absolute z-20 flex flex-col items-center gap-1"
                style={{ left: cursorPos.x, top: cursorPos.y, transform: "translate(14px, 10px)" }}
              >
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Scroll
                </span>
                <svg width="12" height="17" viewBox="0 0 12 17" fill="none" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <path d="M2 1.5 L6 5.5 L10 1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 9.5 L6 13.5 L10 9.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* SCROLL INDICATOR DOTS — one per project, to the right of the slider */}
        <div className="flex flex-col items-center gap-2.5 md:gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${projects[i].name}`}
              aria-current={i === activeIndex}
              onClick={() => goToIndex(i)}
              className={`shrink-0 rounded-full bg-white transition-all duration-300 ease-out ${
                i === activeIndex
                  ? "h-2.5 w-2.5 opacity-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  : "h-1.5 w-1.5 opacity-35 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TEXT BOX — a real block below the image, styled like the commented
          LEFT TEXT BLOCK 1. Fully invisible by default: no fill
          (textBoxOpacity 0) AND no blur (textBoxBlur 0) — a nonzero blur
          alone still reads as a visible box even with zero fill, since it
          smudges whatever's behind it, so both have to be 0 to truly
          disappear. ScrambledText handles the body copy; the text itself
          stays fully legible — only this box fades in/out while paging. */}
      <div
        className="px-4 md:px-5 py-3 md:py-4 transition-opacity ease-out"
        style={{
          width,
          opacity: infoVisible ? 1 : 0,
          transitionDuration: `${TEXT_SWAP_MS}ms`,
          borderRadius: `${textRadius}px`,
          backgroundColor: `rgba(10, 10, 14, ${textBoxOpacity})`,
          ...(textBoxBlur > 0
            ? {
                backdropFilter: `blur(${textBoxBlur}px)`,
                WebkitBackdropFilter: `blur(${textBoxBlur}px)`,
              }
            : {}),
        }}
      >
        <div className="flex items-center justify-between mb-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-cyan-200/90">
          <span>{displayedProject.type}</span>
          <span>{displayedProject.year}</span>
        </div>
        <h3 className="font-mono text-sm md:text-base font-semibold leading-tight text-white">
          {displayedProject.name}
        </h3>
        {displayedProject.software.length > 0 && (
          <p className="mt-0.5 mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-cyan-200/60">
            {displayedProject.software.join(" · ")}
          </p>
        )}
        <ScrambledText
          key={displayedIndex}
          duration={1.3}
          speed={0.5}
          scrambleChars="01<>[]#_%"
          className="font-mono text-xs md:text-sm leading-relaxed text-cyan-50"
          style={{ maxWidth: width - 32 }}
        >
          {displayedProject.description}
        </ScrambledText>
        <button
          type="button"
          onClick={() => router.push(displayedProject.href)}
          className="pointer-events-auto relative mt-3 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-cyan-200/90 underline decoration-cyan-200/40 underline-offset-4 hover:decoration-cyan-200"
        >
          View Full Project →
        </button>
      </div>
    </div>
  );
}
