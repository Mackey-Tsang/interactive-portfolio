// src/app/work/architecture/forge-hub-forum-of-voices/page.tsx
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

export default function ForgeHubForumPage() {
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

  // TODO: replace all src placeholders with your real image URLs
  const threeOverviewImages = [
    {
      src: "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p27.webp?raw=true",
      alt: "Street view of The Forge Hub and its stone base / timber column language.",
      caption: "John Burns & Company factory. Photographs taken by Whites Aviation, in Jun 1949",
    },
    {
      src: "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p2.webp?raw=true",
      alt: "Internal lobby space with light-filled volume and structural expression.",
      caption: "Stanley Street, Pernell. Photographs taken by Whites Aviation, 18 July 1949",
    },
    {
      src: "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p32.webp?raw=true",
      alt: "Forum of Voices circular lobby with timber structure and glass roof.",
      caption: "Window display in John Burns hardware store in Custom Street",
    },
  ];

  const forgeHubGridImages = [
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p3.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p4.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p8.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p9.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p10.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p1.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p11.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p12.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p15.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p16.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p22.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p23.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p24.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p25.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p13.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p14.jpg?raw=true",
  ];

  const forumGridImages = [
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p5.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p6.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p7.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p17.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p19.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p20.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p18.jpg?raw=true",
    "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p21.jpg?raw=true",
  ];

  const forgePortrait1 = "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p28.jpg?raw=true";
  const forgePortrait2 = "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p29.jpg?raw=true";

  const forumPortrait1 = "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p30.jpg?raw=true";
  const forumPortrait2 = "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p31.jpg?raw=true";

  const tectonicImage = "https://github.com/Mackey-Tsang/photo-host/blob/main/The%20Forge%20Hub%20Forum%20of%20Voices/p26.png?raw=true";

  return (
    <main className="min-h-dvh w-full bg-neutral-100 text-black">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-4">
        <div className="mx-auto w-full max-w-6xl py-16 space-y-20">
          {/* ------------------------------------------------------ */}
          {/* 01 — Brief + Title */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              <header className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-black">
                  Tectonic / Community Centre / Auckland
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Breif: The Constructed
                </h1>
                <p className="text-sm text-black">
                  The Constructed focuses on material assembly, design detailing, and fabrication. I was encouraged to explore materiality, compliance issues, and architectonics, developing skills to create innovative and context-sensitive architectural solutions.
                </p>
              </header>


              <div className="text-sm text-black space-y-2">
                <p className="font-medium text-black">
                  Projects were required designs across three scales:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Detail</span> - elements that engage directly with the body.
                  </li>
                  <li>
                    <span className="font-medium">Activity Space</span> - defined functional areas.
                  </li>
                  <li>
                    <span className="font-medium">Building</span> - holistic architectural compositions.
                  </li>
                </ul>
              </div>

              <p className="text-sm text-black">
                I designed two interconnected projects on separate sites in central Auckland, responding to historical, cultural, and ecological contexts. These projects emphasize tectonics, materiality, and collaboration, building toward a comprehensive understanding of how architecture interacts with its environment and community.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 02 — Divider: The Forge Hub */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section>
              <div className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="text-2xl sm:text-2xl font-semibold tracking-tight">The Forge Hub — Alten Street</span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 03 — Intro text + 3 images in a row */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              <p className="text-sm text-black">
                Located at 21 Alten Street, Auckland, The Forge Hub is a community center that reimagines the industrial heritage of the site, originally home to the John Burns Co. hardware factory. This project brings back the essence of the demolished factory through a design featuring a transparent, light-filled lobby and a factory-inspired multipurpose hall. The reflective glass lobby, with its curved roof, creates a boundary-blurring transition between modernity and the industrial past, while the hall’s structural elements pay homage to Auckland’s rich factory history.
              </p>

              {/* Three images in a row */}
              <div className="grid gap-4 md:grid-cols-3">
                {threeOverviewImages.map((img) => (
                  <figure key={img.src} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => openLightbox(img.src, img.alt)}
                      className="block w-full"
                    >
                      <div className="relative w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                    <figcaption className="text-[11px] text-black">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="space-y-4 text-sm text-black">
                <p>
                  The site around Stanley Street in Auckland holds significant historical value, embodying a rich industrial and commercial legacy. During the mid-20th century, the area was home to various factories and businesses, including Hollywood Shoes, Reevely, Ellis & Collingwood Limited, Donaghy’s Rope & Twine, and panel beaters, creating a vibrant industrial atmosphere. Nearby, the iconic Carlaw Park Stadium added to the locale’s bustling character, serving as a central hub for sports and events.
                </p>
                <p>
                  A notable presence on this site was John Burns & Company, a prominent hardware, iron, and machinery merchant active during the 1930s and 1940s. Located at 21 Alten Road, the company’s head office in Auckland was pivotal in supplying industries across the country. Their extensive catalog featured products ranging from anchors and barometers to outboard motors and ropes, showcasing their significance in supporting industrial and maritime activities. This company also operated a store on Customs Street in Auckland Central, reinforcing its influence in the city’s commercial network.
                </p>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 04 — Short divider + text + 2 big portraits */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              {/* Short divider */}
              <div className="w-[60%] mx-auto my-8 border-t border-neutral-700"></div>


              <p className="text-sm text-black">
                The Forge Hub project centers on revitalizing industrial heritage while fostering a modern community-focused space. The design merges functionality with symbolism, featuring a transparent, light-filled lobby that acts as a welcoming veil to the robust, factory-inspired multipurpose hall. This interplay between transparency and industrial solidity reflects the dialogue between past and present, creating a dynamic environment that blurs the boundaries between modern architecture and historical inspiration. The spatial layout emphasizes connectivity and practicality, ensuring seamless integration of key functions like the lobby, hall, kitchen, and outdoor spaces. By incorporating structural elements such as timber columns and a curved roof with metal bracing, the project celebrates craftsmanship and durability, embodying the spirit of gathering, collaboration, and continuity in a contemporary architectural form.
              </p>

              {/* Large portrait 1 */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    forgePortrait1,
                    "Interior view of The Forge Hub lobby with stone base and timber structure."
                  )
                }
                className="block w-full"
              >
                <div className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={forgePortrait1}
                    alt="Interior view of The Forge Hub lobby with stone base and timber structure."
                    className="block w-full h-auto object-cover"
                  />
                </div>
              </button>

              {/* Large portrait 2 */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    forgePortrait2,
                    "Multipurpose hall with curved roof truss and industrial lighting."
                  )
                }
                className="block w-full"
              >
                <div className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={forgePortrait2}
                    alt="Multipurpose hall with curved roof truss and industrial lighting."
                    className="block w-full h-auto object-cover"
                  />
                </div>
              </button>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 05 — 8 rows / 16 images (wider section) */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{forgeHubGridImages.map((src, i) => (
  <button
    key={src}
    type="button"
    onClick={() =>
      openLightbox(src, "Detail study for The Forge Hub – structure, façade or interior.")
    }
    className="block w-full"
  >
    <div className="relative w-full overflow-hidden">
      <div
        className={
          i >= forgeHubGridImages.length - 2
            ? "aspect-4/6-full overflow-hidden"   // portrait for last two
            : "aspect-6/4 w-full overflow-hidden"   // landscape for the rest
        }
      >
        <img
          src={src}
          alt="Detail study for The Forge Hub – structure, façade or interior."
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

          {/* ------------------------------------------------------ */}
          {/* 06 — Divider: Forum of Voices */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section>
              <div className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="text-2xl sm:text-2xl font-semibold tracking-tight">Forum of Voices — Parliament Reserve</span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 07 — Text + left image / right text */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              <p className="text-sm text-black">
                Situated at Parliament Reserve, the original site of New Zealand’s first parliament house, The Forum of Voices is a community center designed to celebrate dialogue and connection. The circular lobby, supported by timber structures and a glass roof, symbolizes the gathering of diverse voices. Flanked by a display area and functional spaces, the design integrates a waharoa (gateway) with a stone base referencing New Zealand’s parliamentary heritage. This project bridges the historical significance of the site with a modern vision for community engagement.
              </p>

              <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] items-start">
                {/* Image left */}
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      tectonicImage,
                      "Axonometric diagram of the Forum of Voices timber structure and circular lobby."
                    )
                  }
                  className="block w-full"
                >
                  <div className="w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tectonicImage}
                      alt="Axonometric diagram of the Forum of Voices timber structure and circular lobby."
                      className="block w-full h-auto object-cover"
                    />
                  </div>
                </button>

                {/* Text right */}
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                    Parliament Reserve, Auckland CBD
                  </h2>
                  <p className="text-sm text-black">
                    The General Assembly House, established in Auckland in 1854, was New Zealand's first Parliament House, marking the start of representative government. Created under the New Zealand Constitution Act of 1852, it housed the General Assembly, including the Governor, Legislative Council, and House of Representatives. Known as the "Shedifice" for its simple design, it served as the seat of government until the capital moved to Wellington in 1865. Later repurposed by Auckland's provincial government and the University of Auckland, the building was demolished in 1917 to make way for Anzac Avenue.
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 08 — Short divider + 2 portraits + smaller grid */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              {/* Short divider */}
              <div className="w-[60%] mx-auto my-8 border-t border-neutral-700"></div>


              <p className="text-sm text-black">
                The Forum of Voices is a community center designed to embody the principles of dialogue, inclusivity, and connection. At its heart is a circular lobby, symbolizing unity and gathering, with timber structures supporting a transparent glass roof that invites light while creating an open yet grounded atmosphere. The design emphasizes a seamless flow between functional spaces, including display areas, kitchen, and bathrooms, ensuring practicality alongside symbolic intent. The façade reflects the dynamic push and pull of diverse perspectives, while the waharoa, with its stone and timber elements, serves as a gateway that bridges tradition and contemporary architecture. This project creates a space where history, community, and modern needs converge, fostering engagement and interaction.
              </p>

              {/* Large portrait 1 */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    forumPortrait1,
                    "Interior view of the Forum of Voices circular lobby and timber roof rings."
                  )
                }
                className="block w-full"
              >
                <div className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={forumPortrait1}
                    alt="Interior view of the Forum of Voices circular lobby and timber roof rings."
                    className="block w-full h-auto object-cover"
                  />
                </div>
              </button>

              {/* Large portrait 2 */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    forumPortrait2,
                    "View from the forecourt toward the façade and waharoa."
                  )
                }
                className="block w-full"
              >
                <div className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={forumPortrait2}
                    alt="View from the forecourt toward the façade and waharoa."
                    className="block w-full h-auto object-cover"
                  />
                </div>
              </button>
            </section>
          </SectionFadeOnScroll>

          {/* ------------------------------------------------------ */}
          {/* 09 — 4 rows / 8 images (wider section) */}
          {/* ------------------------------------------------------ */}
          <SectionFadeOnScroll>
            <section className="space-y-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {forumGridImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        openLightbox(
                          src,
                          "Detail study for the Forum of Voices – structure, façade or interior."
                        )
                      }
                      className="block w-full"
                    >
                      <div className="relative w-full overflow-hidden">
                        <div className={
          i >= forumGridImages.length - 2
            ? "aspect-4/6 w-full overflow-hidden"   // portrait for last two
            : "aspect-6/4 w-full overflow-hidden"   // landscape for the rest
        }>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt="Detail study for the Forum of Voices – structure, façade or interior."
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
        </div>
      </div>

      {/* Shared Lightbox for all images on this page */}
      <Lightbox open={lightboxOpen} src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
    </main>
  );
}
