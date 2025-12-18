"use client";

import React, { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { motion, useInView } from "framer-motion";


const HERO_RENDER =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p1.jpg?raw=true"; // TODO: replace with your real path

const INTRO_RENDER =
  "/architecture/awa/intro-render.jpg"; // optional extra render if you want

const MASTERPLAN_IMAGE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p2.jpg?raw=true";
const SECTION_IMAGE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p4.jpg?raw=true";
const LEGEND_IMAGE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p3.jpg?raw=true";

const FARMERS_MARKET_IMAGES = [
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p5.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p6.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p7.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p8.jpg?raw=true",
];


const PROGRESS_IMAGES = [
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p10.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p11.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p12.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p13.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p14.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p15.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p16.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p17.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p18.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p19.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p20.jpg?raw=true",
];

const SECOND_RENDER =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p21.jpg?raw=true";
const FLOORPLAN_IMAGE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p22.jpg?raw=true";

const TRIPLE_16_9_IMAGES = [
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p24.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p25.jpg?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p26.jpg?raw=true",
];

const SECTION_RENDER =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p23.jpg?raw=true";

const GRID_IMAGES1 = [
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p28.JPG?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p27.JPG?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p29.JPG?raw=true",
];

const GRID_IMAGES2 = [
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p30.JPG?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p35.JPG?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p32.JPG?raw=true",
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p33.JPG?raw=true",
"https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p34.JPG?raw=true",
"https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p31.JPG?raw=true",
];

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

export default function AwaMarketHallPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | undefined>();
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(undefined);
    setLightboxAlt("");
  };

  

  return (
    <>
      <main className="min-h-dvh w-full bg-neutral-100 text-neutral-900">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-6">
          {/* 01 — Title + Brief + Hero Image */}
          <SectionFadeOnScroll>
            <div className="space-y-8">
              <div className="space-y-4 w-full">
                <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-600">
            Architecture / Farmers' Market
          </p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Awa Market Hall — Grey Lynn Waterfront
                </h1>
                <p className="text-sm sm:text-base leading-relaxed">
                  Awa Market Hall sits at the threshold between the post-tsunami
                  Grey Lynn waterfront and the elevated new masterplan. The
                  project reclaims the viaduct edge as a climate-resilient
                  public market hall, where food production, small businesses,
                  and everyday social life unfold directly alongside the water.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  The building weaves together a covered farmers market, a
                  flexible events platform, and sheltered circulation terraces
                  that stitch into the new coastal edge. The roof operates as a
                  continuous tidal canopy, stepping to manage views, light, and
                  storm surges.
                </p>
              </div>

              {/* Big landscape hero render */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    HERO_RENDER,
                    "Hero render of Awa Market Hall along the new Grey Lynn waterfront."
                  )
                }
                className="block w-full"
              >
                <img
                  src={HERO_RENDER}
                  alt="Hero render of Awa Market Hall along the new Grey Lynn waterfront."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* 02 — Intro section */}
          <SectionFadeOnScroll>
            <div className="space-y-6 w-full">
              <h2 className="text-xl font-semibold tracking-tight">
                Re-Stitching Awa and Market
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Awa Market Hall responds to the studio scenario where everything
                under 20 m above sea level has been reshaped by a tsunami
                event. The design positions the market as a piece of resilient
                civic infrastructure: a place that can host daily trading,
                weekend events, and emergency distribution, all within a
                climate-conscious structural and material system.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                The roof works as a mediating surface between the viaduct,
                water, and elevated ground. Underneath, the hall is organised as
                a series of slender structural bays that frame views towards the
                re-opened awa, while the ground plane remains porous and
                adaptable for different vendors and temporary installations.
              </p>
            </div>
          </SectionFadeOnScroll>

          {/* Full divider */}
          <SectionFadeOnScroll>
            <div className="w-full border-t border-neutral-500 my-6" />
          </SectionFadeOnScroll>

          {/* 03 — Masterplan + Section + Legend layout */}
          <SectionFadeOnScroll>
            <div className="space-y-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] items-start">
                {/* Left: text + masterplan + section */}
                <div className="space-y-6">
                  <div className="space-y-3 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                      Site Position — Awa Edge in the Grey Lynn Masterplan
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                      Within the broader Grey Lynn masterplan, Awa Market Hall
                      occupies a key seam where the new urban grain meets the
                      water. The site sits below the viaduct structure and
                      extends towards the re-established stream corridor,
                      forming a linear civic room along the awa.
                    </p>
                  </div>

                  {/* Masterplan */}
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        MASTERPLAN_IMAGE,
                        "Grey Lynn masterplan with Awa Market Hall highlighted along the new waterfront."
                      )
                    }
                    className="block w-full"
                  >
                    <img
                      src={MASTERPLAN_IMAGE}
                      alt="Grey Lynn masterplan with Awa Market Hall highlighted along the new waterfront."
                      className="block w-full h-auto object-cover"
                    />
                  </button>

                  {/* Section */}
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        SECTION_IMAGE,
                        "Long section showing the relationship between viaduct, market hall and water."
                      )
                    }
                    className="block w-full"
                  >
                    <img
                      src={SECTION_IMAGE}
                      alt="Long section showing the relationship between viaduct, market hall and water."
                      className="block w-full h-auto object-cover"
                    />
                  </button>
                </div>

                {/* Right: legend portrait */}
                <div className="flex flex-col gap-6 lg:h-full lg:justify-start">
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        LEGEND_IMAGE,
                        "Legend and diagram explaining the Awa Market Hall site and program."
                      )
                    }
                    className="block w-full max-w-sm lg:ml-auto"
                  >
                    <img
                      src={LEGEND_IMAGE}
                      alt="Legend and diagram explaining the Awa Market Hall site and program."
                      className="block w-full h-auto object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
           <div className="w-[60%] mx-auto my-8 border-t border-neutral-700"></div>
          </SectionFadeOnScroll>

          {/* 04 — NZ Farmers Market context: 2x image on left, text on right */}
          <SectionFadeOnScroll>
  <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">

    {/* LEFT: 4 images (2 per row), each with caption */}
    <div className="space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        {[FARMERS_MARKET_IMAGES[0], FARMERS_MARKET_IMAGES[1]].map((src, i) => (
          <div key={src} className="space-y-2">
            <button
              type="button"
              onClick={() =>
                openLightbox(
                  src,
                  "Farmers market context reference."
                )
              }
              className="block w-full"
            >
              <img
                src={src}
                alt="Farmers market context reference."
                className="block w-full aspect-6/4 object-cover"
              />
            </button>
            <p className="text-xs text-neutral-700 text-center">
              Farmers market reference {i + 1}
            </p>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {[FARMERS_MARKET_IMAGES[2], FARMERS_MARKET_IMAGES[3]].map((src, i) => (
          <div key={src} className="space-y-2">
            <button
              type="button"
              onClick={() =>
                openLightbox(
                  src,
                  "Farmers market context reference."
                )
              }
              className="block w-full"
            >
              <img
                src={src}
                alt="Farmers market context reference."
                className="block w-full aspect-6/4 object-cover"
              />
            </button>
            <p className="text-xs text-neutral-700 text-center">
              Farmers market reference {i + 3}
            </p>
          </div>
        ))}
      </div>

    </div>

    {/* RIGHT: Description text */}
    <div className="space-y-4 max-w-lg">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
        Farmers Markets in Aotearoa
      </h2>
      <p className="text-sm sm:text-base leading-relaxed">
        Awa Market Hall draws from the informality and atmosphere of existing
        farmers markets across Aotearoa. Many rely on temporary marquees,
        parking lots, or edges of public space, which bring strong community
        life but little protection or long-term resilience.
      </p>
      <p className="text-sm sm:text-base leading-relaxed">
        This project explores how a permanent market hall can preserve that
        looseness — keeping the energy of local producers and weekend crowds —
        while elevating resilience, comfort, and climatic performance along a
        changing waterfront edge.
      </p>
    </div>

  </div>
</SectionFadeOnScroll>

<div className="w-[60%] mx-auto my-8 border-t border-neutral-700"></div>

          {/* 05 — Design development: text + full-width image + staggered progress drawings */}
<SectionFadeOnScroll>
  <div className="space-y-10">
    {/* Text ABOVE the full-width image */}
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
        Design Development — Awa Market Hall
      </h2>
      <p className="mt-3 text-sm sm:text-base leading-relaxed">
        The market hall evolved through a sequence of roof, structural grid, and
        flood–edge studies. Early schemes tested how the wave roof can bridge
        across the viaduct while keeping sightlines and access for Grey Lynn’s
        new waterfront edge.
      </p>
      <p className="mt-3 text-sm sm:text-base leading-relaxed">
        The drawings below trace the project&apos;s refinement—from initial roof
        morphologies and undercroft public space, into a more resolved
        structural system that balances timber, concrete, and water–management
        strategies.
      </p>
    </div>

    {/* Full-width landscape key render (05) */}
    <div className="relative">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p9.jpg?raw=true",
            "Awa Market Hall — key interior/exterior render."
          )
        }
      >
        <img
          src="https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p9.jpg?raw=true"
          alt="Awa Market Hall — key interior/exterior render."
          className="block w-full aspect-video object-cover"
        />
      </button>

      {/* First progress image on the RIGHT, partially overlapping (desktop and up) */}
      {PROGRESS_IMAGES[0] && (
        <button
          type="button"
          onClick={() =>
            openLightbox(
              PROGRESS_IMAGES[0],
              "Early roof + structure study drawing."
            )
          }
          className="
            hidden md:block
            absolute
            right-6
            bottom-[-18%]
            w-[78%] sm:w-[62%] md:w-[48%] 
            shadow-[0_18px_45px_rgba(0,0,0,0.35)]
          "
        >
          <img
            src={PROGRESS_IMAGES[0]}
            alt="Early roof + structure study drawing."
            className="block w-full h-auto object-cover"
          />
        </button>
      )}
    </div>

{/* ---- TIGHT VERTICAL STAGGER WITH LEFT/RIGHT GAP ---- */}
<div className="mt-20 space-y-0 relative">
  {PROGRESS_IMAGES.slice(1).map((src, idx) => {
    const isEven = idx % 2 === 0;

    return (
      <div
        key={src}
        className={`
          flex w-full relative
          ${isEven ? "justify-start" : "justify-end"}
          ${idx === 0 ? "mt-0" : "-mt-20 sm:-mt-24"} 
        `}
      >
        <button
          onClick={() => openLightbox(src, "Awa Market Hall progress drawing.")}
          className={`
            w-[78%] sm:w-[62%] md:w-[48%] 
            shadow-[0_14px_35px_rgba(0,0,0,0.35)]
            ${isEven ? "ml-4 sm:ml-6 md:ml-8" : "mr-4 sm:mr-6 md:mr-8"}
            /* ^ small side gutter */
          `}
        >
          <img
            src={src}
            alt="Awa Market Hall progress drawing."
            className="block w-full h-auto object-cover"
          />
        </button>
      </div>
    );
  })}
</div>


  </div>
</SectionFadeOnScroll>


          {/* 07 — divider */}
<SectionFadeOnScroll>
            <section className="mt-10">
              <div className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="text-2xl sm:text-2xl font-semibold tracking-tight">Final Design</span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 08 — Render + Floorplan + 3x16:9 + Section */}
          <SectionFadeOnScroll>
            <div className="space-y-10">
              {/* Render */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    SECOND_RENDER,
                    "Exterior render of Awa Market Hall facing the waterfront."
                  )
                }
                className="block w-full"
              >
                <img
                  src={SECOND_RENDER}
                  alt="Exterior render of Awa Market Hall facing the waterfront."
                  className="block w-full h-auto object-cover"
                />
              </button>

              {/* Floorplan */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    FLOORPLAN_IMAGE,
                    "Ground floor plan of Awa Market Hall."
                  )
                }
                className="block w-full"
              >
                <img
                  src={FLOORPLAN_IMAGE}
                  alt="Ground floor plan of Awa Market Hall."
                  className="block w-full h-auto object-cover"
                />
              </button>

              {/* Three 16:9 images in a row */}
              <div className="grid gap-4 md:grid-cols-3">
                {TRIPLE_16_9_IMAGES.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() =>
                      openLightbox(
                        src,
                        "Perspective vignette of interior or exterior market spaces."
                      )
                    }
                    className="block w-full"
                  >
                    <div className="aspect-video w-full">
                      <img
                        src={src}
                        alt="Perspective vignette of interior or exterior market spaces."
                        className="block w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Section image */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    SECTION_RENDER,
                    "Section drawing through the Awa Market Hall."
                  )
                }
                className="block w-full"
              >
                <img
                  src={SECTION_RENDER}
                  alt="Section drawing through the Awa Market Hall."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

{/* 0Y — Detail grid (GRID_IMAGES1: 1 full-width + 2 landscape below) */}
<SectionFadeOnScroll>
  <section className="space-y-6">
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {/* Top full-width landscape (first image) */}
      {GRID_IMAGES1[0] && (
        <button
          type="button"
          onClick={() =>
            openLightbox(
              GRID_IMAGES1[0],
              "Detail study for Awa Market Hall – full-width drawing or render."
            )
          }
          className="block w-full"
        >
          <div className="relative w-full overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={GRID_IMAGES1[0]}
                alt="Detail study for Awa Market Hall – full-width drawing or render."
                className="block w-full h-full object-cover"
              />
            </div>
          </div>
        </button>
      )}

      {/* Bottom row: 2 landscape in one row (remaining images) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GRID_IMAGES1.slice(1).map((src) => (
          <button
            key={src}
            type="button"
            onClick={() =>
              openLightbox(
                src,
                "Detail study for Awa Market Hall – structure, façade or interior."
              )
            }
            className="block w-full"
          >
            <div className="relative w-full overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={src}
                  alt="Detail study for Awa Market Hall – structure, façade or interior."
                  className="block w-full h-full object-cover"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
</SectionFadeOnScroll>

<SectionFadeOnScroll>
  <section className="space-y-6">
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GRID_IMAGES2.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() =>
              openLightbox(
                src,
                "Detail study for Awa Market Hall – structure, façade or interior."
              )
            }
            className="block w-full"
          >
            <div className="relative w-full overflow-hidden">
              <div
                className={
                  i < 4
                    ? "aspect-6/4 w-full overflow-hidden"      // first 4 → landscape (2 rows of 2)
                    : "aspect-4/6-full overflow-hidden"        // last 2 → portrait row
                }
              >
                <img
                  src={src}
                  alt="Detail study for Awa Market Hall – structure, façade or interior."
                  className="block w-full h-full object-cover"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
</SectionFadeOnScroll>



          {/* 10 — Back to top button */}
{/* 10 — Back to top button */}
<SectionFadeOnScroll>
  <div className="flex justify-center pt-6 pb-24">
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2  border border-neutral-700 px-5 py-2 text-sm font-medium hover:bg-neutral-800 hover:text-neutral-100"
    >
      ↑ Back to top
    </button>
  </div>
</SectionFadeOnScroll>


        </div>
      </main>

      {/* Global Lightbox */}
      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
      />
    </>
  );
}
