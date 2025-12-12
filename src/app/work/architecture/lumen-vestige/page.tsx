"use client";

import React, { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
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

export default function LumenVestigePage() {
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);
  const [activeAlt, setActiveAlt] = useState<string>("");

  const handleOpen = (src: string, alt: string) => {
    setActiveSrc(src);
    setActiveAlt(alt);
    setOpen(true);
  };

  return (
    <main className="min-h-dvh w-full bg-neutral-100 text-black">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-4">

        {/* -------------------------------------------------- */}
        {/* HEADER / META                                      */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4 border-b border-neutral-400/40 pb-8 md:pb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-600">
            Architecture / Pavilion Installation
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Lumen Vestige
          </h1>

          <div className="space-y-1 text-xs md:text-sm text-neutral-700">
            <p className="font-medium">
              120 Hours 2025: The Art of Losing
            </p>
          </div>

          <div className="mt-3 space-y-1 text-xs md:text-sm text-neutral-600">
            <p>
              <span className="font-medium text-black">Team 1485:</span> Mackey Tsang (Ho Yin), Ricky Zhou,
              John Xie (Cheng Yi) — University of Auckland
            </p>
            <p>
              <span className="font-medium text-black">Date:&nbsp;</span>
              March 3rd to March 8th 2025 (120 hours)
            </p>
            <p>
              <span className="font-medium text-black">Task:&nbsp;</span>
              To design a pavilion that highlights something forgotten or lost.
            </p>
            <p>
              <span className="font-medium text-black">Site:&nbsp;</span>
              Tullinløkka, Oslo, Norway
            </p>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* BIG IMAGE (hero)                                   */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-6">
          <figure className="w-full">
            <button
              type="button"
              onClick={() =>
                handleOpen(
                  "https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p1.jpg?raw=true",
                  "Lumen Vestige – overall view"
                )
              }
              className="block w-full cursor-zoom-in"
            >
              <img
                src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p1.jpg?raw=true"
                alt="Lumen Vestige – overall view"
                className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
              />
            </button>
          </figure>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-neutral-900">
            <p>
              Lumen Vestige explores the fading essence of childhood through shadow. Vintage toys, placed behind diffuser glass, cast enlarged silhouettes — adult-sized echoes of a distant past. Visitors step into this f leeting moment, briefly transported back to their childhood. Yet, the shadows remain untouchable, intangible — symbols of innocence slipping away. As daylight fades, the lightbox softly glows, revealing the toys in quiet presence, only for their forms to vanish again. This interplay of light and loss evokes nostalgia and longing, inviting reflection on time's passage, the fragility of memory, and the irreplaceable moments that drift beyond reach, forever lost in time.   
            </p>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO LANDSCAPE IMAGES                               */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p2.jpg?raw=true", "Landscape 1")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p2.jpg?raw=true"
                  alt="Landscape 1"
                  className="w-full h-auto border border-neutral-400 bg-neutral-300 object-cover aspect-5/3"
                />
              </button>
            </figure>

            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p3.jpg?raw=true", "Landscape 2")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p3.jpg?raw=true"
                  alt="Landscape 2"
                  className="w-full h-auto border border-neutral-400 bg-neutral-300 object-cover aspect-5/3"
                />
              </button>
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO PORTRAIT IMAGES                                */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p4.jpg?raw=true", "Portrait 1")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p4.jpg?raw=true"
                  alt="Portrait 1"
                  className="aspect-2/3 object-cover border border-neutral-400 bg-neutral-300"
                />
              </button>
            </figure>

            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p5.jpg?raw=true", "Portrait 2")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p5.jpg?raw=true"
                  alt="Portrait 2"
                  className="aspect-2/3 object-cover border border-neutral-400 bg-neutral-300"
                />
              </button>
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* TWO PORTRAIT IMAGES (2nd pair)                     */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p6.jpg?raw=true", "Portrait 3")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p6.jpg?raw=true"
                  alt="Portrait 3"
                  className="aspect-2/3 object-cover border border-neutral-400 bg-neutral-300"
                />
              </button>
            </figure>

            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p7.jpg?raw=true", "Portrait 4")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p7.jpg?raw=true"
                  alt="Portrait 4"
                  className="aspect-2/3 object-cover border border-neutral-400 bg-neutral-300"
                />
              </button>
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* DIVIDER                                            */}
        {/* -------------------------------------------------- */}
        <div className="h-px bg-neutral-400/50" />

        {/* -------------------------------------------------- */}
        {/* COMPETITION BOARDS                                 */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4">
          <h2 className="text-base md:text-lg font-medium tracking-wide">
            Competition Boards
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p8.jpg?raw=true", "Competition Board 1")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p8.jpg?raw=true"
                  alt="Competition Board 1"
                  className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
                />
              </button>
            </figure>

            <figure>
              <button
                type="button"
                onClick={() => handleOpen("https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p9.jpg?raw=true", "Competition Board 2")}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src="https://github.com/Mackey-Tsang/photo-host/blob/main/Lumen%20Vestige/p9.jpg?raw=true"
                  alt="Competition Board 2"
                  className="w-full h-auto border border-neutral-400 bg-neutral-300 object-contain"
                />
              </button>
            </figure>
          </div>
        </SectionFadeOnScroll>

        {/* -------------------------------------------------- */}
        {/* SIX PARAGRAPHS                                     */}
        {/* -------------------------------------------------- */}
        <SectionFadeOnScroll className="space-y-4 pb-16">
          <h2 className="text-base md:text-lg font-semibold tracking-wide">
            Reflection — Lumen Vestige
          </h2>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-neutral-900">
            <p>This group project was created for a 120-hour design competition centered around the theme of something “forgotten or lost.” Knowing how crucial narrative would be, we spent the first two days developing a clear and meaningful story that would guide our entire design process.</p>
            <p>At first, I explored the theme through the lens of personal memory loss and the collective fading of history. However, as we studied the site more closely, we realized it didn't have a strong historical identity—it had mainly served temporary functions over time, lacking a clear “soul” of its own. This insight led us to shift our focus. Rather than trying to reflect a lost past, we asked: What if this pavilion could help people rediscover something within themselves and create new memories here?</p>
            <p>We designed a space where sunlight interacts with oversized childhood toy forms, casting long shadows that invite visitors to reconnect with their early memories. These objects are deliberately universal—regardless of age, background, or culture, everyone has a memory tied to a childhood toy. At specific times of day, shadows on the ground encourage playful interaction. Then, at night, the pavilion becomes an exhibition of glowing retro toys, continuing the experience in a more reflective atmosphere.</p>
            <p>This project taught me a valuable lesson: sometimes, focusing deeply on one strong aspect—like narrative—can make the entire project more powerful. Instead of trying to address every possible angle, we committed to a single, meaningful idea and let that guide our decisions. That focus allowed the design to resonate more deeply, both visually and emotionally.</p>
            <p>After refining our concept, I took the lead in organizing our team's tasks. I delegated the technical drawings—plans, sections, and detailing—to my teammates while I worked on visual communication. I created atmospheric renderings that showcased how light and shadow change throughout the day, and I produced an abstract yet clear top view that captured the movement and placement of the toy shadows.</p>
            <p>Looking back, this was one of the most meaningful group projects I've worked on. It reminded me of the power of story in design—and how architecture can bring forgotten feelings back into focus.</p>
          </div>
        </SectionFadeOnScroll>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        src={activeSrc}
        alt={activeAlt || "Image"}
        onClose={() => setOpen(false)}
      />
    </main>
  );
}
