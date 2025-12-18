"use client";

import React, { useMemo, useState } from "react";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";
import Lightbox from "@/components/Lightbox";
import ImageViewer, { ViewerImage } from "@/components/ImageViewer";

export default function InceptionArchitectureMediaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | undefined>(undefined);
  const [lightboxAlt, setLightboxAlt] = useState<string | undefined>(undefined);

  const openLightbox = (src: string, alt?: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  // ---------- IMAGE SETS ----------
  const DRAWING_IN_SCALE: ViewerImage[] = useMemo(
    () => [
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p29.jpg?raw=true", caption: "Elevation 1:20 @A3" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p32.png?raw=true", caption: "Floor Plan 1:100 @A3" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p30.png?raw=true", caption: "Plan 1:1 @A4" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p33.png?raw=true", caption: "Cross Section 1:2 @A4" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p31.png?raw=true", caption: "Section 1:100 @A3" },
    ],
    []
  );

  const MODELS_VIEWER: ViewerImage[] = useMemo(
    () => [
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p12.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p13.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p14.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p15.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p16.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p17.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p18.jpg?raw=true"},
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p19.jpg?raw=true"},
    ],
    []
  );

  const ARTIFACTS_VIEWER: ViewerImage[] = useMemo(
    () => [
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p20.jpg?raw=true" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p7.JPG?raw=true" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p10.JPG?raw=true" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p11.JPG?raw=true" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p8.JPG?raw=true" },
      { src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p9.JPG?raw=true" },
    ],
    []
  );

  // grids
  const TRANSFORMED_FLOORPLAN = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p35.png?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p36.png?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p37.png?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p38.png?raw=true",
    ],
    []
  );

  const MODELS_GRID = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p4.JPG?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p5.JPG?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p1.JPG?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p6.JPG?raw=true",
    ],
    []
  );

  const ARTIFACTS_ROW_3 = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p23.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p24.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p25.jpg?raw=true",
    ],
    []
  );

  const ARTIFACTS_ROW_2 = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p21.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p22.jpg?raw=true",
    ],
    []
  );

  const TRANSFORMED_SECTION = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p39.jpg?raw=true",
    ],
    []
  );

  const INTERIOR_PERSPECTIVE = useMemo(
    () => ({
      src: "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p34.jpeg?raw=true",
      caption: "1:50 interior perspective drawing of the transformed section",
    }),
    []
  );

  const ONE_TO_ONE_ELEVATION_PORTRAITS = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p26.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p27.jpg?raw=true",
    ],
    []
  );

  const ONE_TO_ONE_ELEVATION_SQUARES = useMemo(
    () => [
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p28.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p2.jpg?raw=true",
      "https://github.com/Mackey-Tsang/photo-host/blob/main/Inception/p3.jpg?raw=true",
    ],
    []
  );

  // ---------- UI helpers ----------
  const DividerWithTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
      <div className="h-px flex-1 bg-neutral-800" />
      <span className="text-2xl sm:text-2xl font-semibold tracking-tight">
        {title}
        </span>
      <div className="h-px flex-1 bg-neutral-800" />
    </div>
  );

  return (
    <main className="min-h-dvh bg-neutral-100 text-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* 01 — Title */}
        <SectionFadeOnScroll>
          <section className="space-y-8">
            <header className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-black">
              Drawing System / Model Making / Speculative Design
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Inception - Architecture Media
            </h1>

            <p className="text-sm leading-relaxed text-neutral-800">
              "Inception" is an architectural exploration that delves into the boundaries of scale, gravity, 
              and spatial relationships. Inspired by the movie "Inception", this project reimagines the 
              University of Auckland's Clocktower through a transformative lens. The design begins with freehand drawings, 
              capturing elevation, section, and plan at various scales through real-life observation. The original 
              Clocktower plan is then deconstructed and reconfigured into a four-grid floor plan. This new plan serves 
              as the foundation for a series of speculative 3D models where gravity is reinterpreted, allowing human figures, 
              walls, and columns to adhere to different surfaces—ceiling, walls, and floor—defying conventional orientation. 
              Light permeates the space from all directions, further challenging traditional architectural norms. The project 
              culminates in a 1:1 elevation that envisions a column extending toward the sky and a ladder juxtaposed with an 
              upside-down floor plan, questioning how a building can function when turned on its head. This work pushes the 
              boundaries of architectural design, offering a speculative vision of spaces that exist beyond the constraints of ordinary perception.  
            </p>
            </header>
                    </section>
        </SectionFadeOnScroll>

        {/* Divider — Drawing in Scale */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Drawing in Scale" />
          </section>
        </SectionFadeOnScroll>

        {/* 03 — Image Viewer (set of 5) */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <ImageViewer
              images={DRAWING_IN_SCALE}
              
              aspectClassName="aspect-6/4"
            />
          </section>
        </SectionFadeOnScroll>

        {/* Divider — Transformed Floor Plan */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Transformed Floor Plan" />
          </section>
        </SectionFadeOnScroll>

        {/* 04 — 2 rows of images, 2 per row */}
        <SectionFadeOnScroll>
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRANSFORMED_FLOORPLAN.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "Transformed Floor Plan")}
                  className="block w-full"
                >
                  <div className="aspect-square w-full overflow-hidden bg-neutral-200">
                    <img
                      src={src}
                      alt="Transformed Floor Plan"
                      className="block w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* Divider — Models Making */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Models Making" />
          </section>
        </SectionFadeOnScroll>

        {/* 05 — two rows, 2 per row */}
        <SectionFadeOnScroll>
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODELS_GRID.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "Models Making")}
                  className="block w-full"
                >
                  <div className="aspect-6/4 w-full overflow-hidden bg-neutral-200">
                    <img
                      src={src}
                      alt="Models Making"
                      className="block w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 06 — Image Viewer (set of 8) */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <ImageViewer
              images={MODELS_VIEWER}
              
              aspectClassName="aspect-[16/9]"
            />
          </section>
        </SectionFadeOnScroll>

        {/* Divider — Artifacts */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Artifacts" />
          </section>
        </SectionFadeOnScroll>

        {/* 07 — 3 images in one row */}
        <SectionFadeOnScroll>
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARTIFACTS_ROW_3.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "Artifacts")}
                  className="block w-full"
                >
                  <div className="aspect-6/4 w-full overflow-hidden bg-neutral-200">
                    <img src={src} alt="Artifacts" className="block w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>

            {/* 2 images in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARTIFACTS_ROW_2.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "Artifacts")}
                  className="block w-full"
                >
                  <div className="aspect-6/4 w-full overflow-hidden bg-neutral-200">
                    <img src={src} alt="Artifacts" className="block w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 08 — Image Viewer (set of 6) */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <ImageViewer
              images={ARTIFACTS_VIEWER}
              
              aspectClassName="aspect-[16/9]"
            />
          </section>
        </SectionFadeOnScroll>

        {/* Divider — Transformed Section */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Transformed Section" />
          </section>
        </SectionFadeOnScroll>

{/* 09 — two portrait images in a row */}
<SectionFadeOnScroll>
  <section className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TRANSFORMED_SECTION.map((src, i) => (
          <button
    key={`${src}-${i}`}
    type="button"
    onClick={() => openLightbox(src, "Transformed Section")}
    className="block w-full"
  >
          <div className="w-full overflow-hidden bg-neutral-200">
            <img
              src={src}
              alt="Transformed Section"
              className={`block w-full h-full object-cover rotate-180`}
            />
          </div>
        </button>
      ))}
    </div>
  </section>
</SectionFadeOnScroll>


        {/* Divider — Interior Perspective Drawing */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="Interior Perspective Drawing" />
          </section>
        </SectionFadeOnScroll>

        {/* 10 — one big landscape image + centered caption */}
        <SectionFadeOnScroll>
          <section className="space-y-3">
            <button
              type="button"
              onClick={() => openLightbox(INTERIOR_PERSPECTIVE.src, "Interior Perspective Drawing")}
              className="block w-full"
            >
              <div className="mx-auto max-w-4xl overflow-hidden bg-neutral-200">
                <img
                  src={INTERIOR_PERSPECTIVE.src}
                  alt="Interior Perspective Drawing"
                  className="block w-full h-auto"
                />
              </div>
            </button>
            <p className="text-xs text-neutral-700 text-center">
              {INTERIOR_PERSPECTIVE.caption}
            </p>
          </section>
        </SectionFadeOnScroll>

        {/* Divider — 1:1 Elevation */}
        <SectionFadeOnScroll>
          <section>
            <DividerWithTitle title="1:1 Elevation" />
          </section>
        </SectionFadeOnScroll>

        {/* 11 — two portrait in one row */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ONE_TO_ONE_ELEVATION_PORTRAITS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "1:1 Elevation")}
                  className="block w-full"
                >
                  <div className="aspect-4/6 w-full overflow-hidden bg-neutral-200">
                    <img
                      src={src}
                      alt="1:1 Elevation"
                      className="block w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* three square images below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ONE_TO_ONE_ELEVATION_SQUARES.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(src, "1:1 Elevation (detail)")}
                  className="block w-full"
                >
                  <div className="aspect-square w-full overflow-hidden bg-neutral-200">
                    <img
                      src={src}
                      alt="1:1 Elevation (detail)"
                      className="block w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>
      </div>

      {/* Lightbox (your provided component) */}
      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt ?? ""}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
