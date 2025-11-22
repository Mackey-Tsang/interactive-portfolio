"use client";

import React, { useEffect, useRef, useState } from "react";
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

  // Start preloading when section enters view
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

  // Once both inView + loaded, mark as appeared (one-time)
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

export default function OverlappingIntersectionPage() {
  return (
    <main className="min-h-dvh w-full bg-neutral-100 text-black">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-4">
        {/* -------------------------------------------------- */}
        {/* HEADER / META  (no images, fade when in view)      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4 border-b border-neutral-400/40 pb-8 md:pb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-600">
            Architecture / Temporary Installation
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            The Overlapping Intersection
          </h1>

          <div className="space-y-1 text-xs md:text-sm text-neutral-700">
            <p className="font-medium">
              The Young Designers Open Call (reSITE) 2025
            </p>
          </div>

          <div className="mt-3 space-y-1 text-xs md:text-sm text-neutral-600">
            <p>
              <span className="font-medium text-black">Team 18925:</span> Mackey
              Tsang, Bob Chen, Henry Qiu - University of Auckland
            </p>
            <p>
              <span className="font-medium text-black">Site:&nbsp;</span>
              Manifesto Market Andel, Prague, Czechia
            </p>
            <p>
              <span className="font-medium text-black">Task:&nbsp;</span>
              To design a temporary installation that provides shade, enables
              smooth circulation, responds to the site's atmosphere, and
              fosters community interaction during summer—within a limited
              budget of CZK 500,000.
            </p>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* HERO IMAGE + TEXT                                  */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          className="space-y-6"
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p3.jpg?raw=true",
          ]}
        >
          <figure className="w-full">
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p3.jpg?raw=true"
              alt="The Overlapping Intersection - overall view"
              className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
            />
          </figure>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-neutral-900">
            <p>
              This project aims to produce a temporary Summer installation while
              rethinking the purpose of a public installation and its potential
              on shaping the urban spaces.
            </p>
            <p>
              Spatial association between the users comes from a common sharing
              point that they are all being present within the same spaces.
              Essentially, individuals are like strings of traces and have their
              points all meet up at this public space where social and communal
              gatherings happen. Manifesto market transforms into a source of
              connection, creating bonding between different people across
              different traces of background.
            </p>
            <p>
              This urban installation aims to empathize the complicated
              intersecting moments individuals who have different lives, strings
              of traces, and all meet up together in the Manifesto Market,
              creating this moment of overlapping connections. The installation
              is located on the scaffoldings above the ground level and allows
              an unconscious interaction between the crowds; it acts as a
              reflected image of the intersecting moments above their heads
              while not making a physical direct contact to force them into this
              urban interaction.
            </p>
            <p>
              Architectural fabric and steel tension ropes are used to create
              this lightweight structure, making it easy to install and remove,
              while being able to be recycled and used for future projects.
            </p>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* BIG IMAGE #2                                      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p7.jpg?raw=true",
          ]}
        >
          <figure className="w-full">
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p7.jpg?raw=true"
              alt="Axonometric view"
              className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
            />
          </figure>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* BIG IMAGE #3                                      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p8.jpg?raw=true",
          ]}
        >
          <figure className="w-full">
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p8.jpg?raw=true"
              alt="Night view"
              className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
            />
          </figure>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO LANDSCAPE IMAGES                               */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          className="space-y-4"
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p4.jpg?raw=true",
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p6.jpg?raw=true",
          ]}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p4.jpg?raw=true"
                alt=""
                className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
              />
            </figure>

            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p6.jpg?raw=true"
                alt=""
                className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
              />
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO PORTRAIT IMAGES                                */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          className="space-y-4"
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p5.jpg?raw=true",
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p9.jpg?raw=true",
          ]}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p5.jpg?raw=true"
                alt=""
                className="aspect-2/3 object-[20%_50%] object-cover border border-neutral-400 bg-neutral-300"
              />
            </figure>

            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p9.jpg?raw=true"
                alt=""
                className="aspect-2/3 w-full h-auto border border-neutral-400 bg-neutral-300 object-cover"
              />
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* ONE WIDE IMAGE                                     */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          className="space-y-4"
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p10.jpg?raw=true",
          ]}
        >
          <figure>
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p10.jpg?raw=true"
              alt=""
              className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
            />
          </figure>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* YOUTUBE SHORT                                      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4">
          <div
            id="overlapping-video"
            className="w-full max-w-6xl mx-auto aspect-video overflow-hidden border border-neutral-400 bg-black"
          >
            <iframe
              src="https://www.youtube.com/embed/rivV61dtmAA?si=_1CU1P4shhowcQJr"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </SectionFadeOnScroll>

        {/* Divider */}
        <SectionFadeOnScroll>
          <div className="h-px bg-neutral-400/50" />
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO A3 RATIO IMAGES                                */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll
          className="space-y-4"
          imageUrls={[
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p1.jpg?raw=true",
            "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p2.jpg?raw=true",
          ]}
        >
          <h2 className="text-base md:text-lg font-medium tracking-wide">
            Competition Boards
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p1.jpg?raw=true"
                alt=""
                className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
              />
            </figure>

            <figure>
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Overlapping%20Intersection/p2.jpg?raw=true"
                alt=""
                className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
              />
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* REFLECTION                                          */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4 pb-16">
          <h2 className="text-base md:text-lg font-semibold tracking-wide">
            Reflection – Young Designers Open Call: Manifesto Market Installation
          </h2>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-neutral-900">
            {/* ... your existing reflection paragraphs ... */}
            <p>
              This project was part of the Young Designers Open Call for the
              reSITE Festival 2025, a practical competition that called for a
              built installation at Manifesto Market in Prague. The installation
              had to respond to the theme “In/Visible” and work within
              real-world constraints such as budget, materials, and public use.
            </p>
            <p>
              At the beginning, my teammates proposed several interactive art
              installation ideas. However, many of these concepts either
              exceeded the budget or relied too heavily on active engagement
              from visitors, which posed challenges in a dynamic space like
              Manifesto Market—home to restaurants, bars, and open public areas.
              Observing that the market lacked a clear circulation path and that
              most people tended to gather only in the center, I suggested that
              our installation should subtly guide movement rather than
              interrupt it.
            </p>
            <p>
              I proposed designing a pavilion-like shader that would influence
              how people circulate through the space, encouraging exploration of
              the market's periphery while maintaining its open, social
              atmosphere. It was important to me that the shading didn’t cover
              the entire area, as I wanted to preserve the light, breathable
              quality of the outdoor market experience.
            </p>
            <p>
              This led to our final concept: a spatial structure formed by
              intersecting strings that create subtle, subconscious circulation
              paths. At points where the strings intersect, we used mesh
              material to partially fill the space, creating both visual rhythm
              and moments of shade without enclosing the space completely.
            </p>
            <p>
              After we solidified the idea together, I focused on refining the
              circulation logic and exploring how the strings and mesh could be
              joined in a way that enhanced the overall effect—both visually and
              experientially. Meanwhile, my teammates took on responsibilities
              such as 3D modeling, budgeting, and developing joinery details.
              Once the model was complete, I took the lead on refining the final
              form and producing renders that communicated our intent clearly.
            </p>
            <p>
              This project taught me how important it is to balance design
              intention with real-world functionality, and that sometimes, the
              most powerful installations are the ones that guide behavior
              subtly rather than demanding attention. It was a great experience
              in collaborative problem-solving, working within constraints, and
              translating conceptual ideas into something that could truly exist
              in the public realm.
            </p>
          </div>
        </SectionFadeOnScroll>
      </div>
    </main>
  );
}
