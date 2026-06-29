"use client";

import React, { useEffect, useRef, useState } from "react";
import MagnifierImage from "@/components/MagnifierImage";
import { motion, useInView } from "framer-motion";

function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.complete) return resolve();
          img.onload = img.onerror = () => resolve();
        })
    )
  ).then(() => undefined);
}

interface SectionFadeOnScrollProps {
  imageUrls?: string[];
  className?: string;
  children: React.ReactNode;
}

/**
 * SectionFadeOnScroll
 * - Starts loading its imageUrls ONLY when the section comes into view
 * - Fades the whole section in after images are done loading
 * - Animates once (stays visible after)
 */
function SectionFadeOnScroll({
  imageUrls = [],
  className = "",
  children,
}: SectionFadeOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  const [loaded, setLoaded] = useState(imageUrls.length === 0);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (!inView || loaded || imageUrls.length === 0) return;
    let cancelled = false;
    (async () => {
      await preloadImages(imageUrls);
      if (!cancelled) {
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, loaded, imageUrls]);

  useEffect(() => {
    if (inView && loaded) {
      setHasAppeared(true);
    }
  }, [inView, loaded]);

  const visible = hasAppeared;

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────────
   IMAGE LINKS — edit .jpg ↔ .png per file as needed
   ────────────────────────────────────────────────────────────── */
const BOARD_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Kinderspace/1.jpg?raw=true";
const BOARD_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Kinderspace/2.jpg?raw=true";
const BOARD_3 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Kinderspace/3.jpg?raw=true";
const BOARD_4 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Kinderspace/4.jpg?raw=true";

export default function PuzzleBlockPage() {
  const boards: { src: string; alt: string }[] = [
    { src: BOARD_1, alt: "Puzzle Block — Board 1" },
    { src: BOARD_2, alt: "Puzzle Block — Board 2" },
    { src: BOARD_3, alt: "Puzzle Block — Board 3" },
    { src: BOARD_4, alt: "Puzzle Block — Board 4" },
  ];

  return (
    <main className="min-h-dvh w-full bg-neutral-100 text-black">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-6">

        {/* -------------------------------------------------- */}
        {/* HEADER / META                                      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4 border-b border-neutral-400/40 pb-8 md:pb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-600">
            Architecture / Competition / Kindergarten
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Puzzle Block
          </h1>

          <div className="space-y-1 text-xs md:text-sm text-neutral-700">
            <p className="font-medium">
              Kinderspace #3 — Architecture for Children&apos;s Development
            </p>
            <p>
              <a
                href="https://architecturecompetitions.com/kinderspace3/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-700"
              >
                Shortlisted
              </a>
              {" "}— International Architecture Competition, Buildner
            </p>
          </div>

          <div className="mt-3 space-y-1 text-xs md:text-sm text-neutral-600">
            <p>
              <span className="font-medium text-black">Team:&nbsp;</span>

                Vicky Huang, Junbo (Bob) Chen, Chun Yu (Jacky) Liu
            </p>
            <p>
              <span className="font-medium text-black">Task:&nbsp;</span>
              Design a kindergarten supporting early childhood development through
              scale, materiality, sensory experience, and the relationship between
              indoor and outdoor environments.
            </p>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* COMPETITION BOARDS — hover any board to magnify    */}
        {/* -------------------------------------------------- */}
        {boards.map((board, i) => (
          <SectionFadeOnScroll
            key={board.src}
            imageUrls={[board.src]}
            className="space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              Board {i + 1} of 4
            </p>
            <figure className="w-full border border-neutral-400 bg-neutral-300">
              <MagnifierImage
                src={board.src}
                alt={board.alt}
                zoom={0.2}
                lensWidth={500}
                lensHeight={380}
              />
            </figure>
          </SectionFadeOnScroll>
        ))}

      </div>
    </main>
  );
}
