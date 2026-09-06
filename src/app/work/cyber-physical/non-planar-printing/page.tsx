"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

// react-pdf touches window/canvas, so it must be client-only
const PdfViewer = dynamic(() => import("@/components/PdfViewer"), { ssr: false });

/* ---------------------------------------------
   IMAGE URLs
   Folder: photo-host/CyberPhysical Project/Digital Fabrication/Non-Planar FDM Printing/
   Upload the extracted figures there as 1.jpg – 7.jpg (see chat for the downloads).
---------------------------------------------- */
const IMG_COVER_HERO = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/0.jpg?raw=true";
const IMG_RESULT_HERO = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/1.jpg?raw=true";
const IMG_RHINO_POLYSURFACE = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/2.jpg?raw=true";
const IMG_RHINO_HEIGHT = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/3.jpg?raw=true";
const IMG_GRASSHOPPER_CANVAS = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/4.jpg?raw=true";
const IMG_CONTROL_PRINTED = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/5.jpg?raw=true";
const IMG_CONTROL_SLICING = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/6.jpg?raw=true";
const IMG_NONPLANAR_SLICING = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/7.jpg?raw=true";

// PDF served from /public — fastest, same-origin, no external hosting needed
const PDF_URL = "/documents/non-planar-fdm-printing.pdf";

// YouTube: watch?v=wBQrmMZXqcQ
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/wBQrmMZXqcQ";

export default function NonPlanarFdmPrintingPage() {
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
      <main className="min-h-dvh w-full bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-16 md:space-y-20">

          {/* 1. INTRO */}
          <SectionFadeOnScroll>
            <section className="space-y-4 md:space-y-6 w-full">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Digital Fabrication Research | Spring 2026
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Non-Planar FDM Printing
              </h1>
              <p className="w-full text-sm md:text-base text-neutral-300 leading-relaxed">
                Non-planar slicing has been studied for over a decade, but real-world FDM application has stayed limited,
                 toolhead geometry differs from machine to machine, so each setup needs its own characterization. This project tests 
                 non-planar methods across the Digital Research Hub's hardware: lightweight Z anti-aliasing on a Bambu Lab A1 mini, 
                 Bricklayers post-processing and true non-planar slicing on a five-toolhead Prusa XL, and two applied case studies, 
                 an ergonomic insole and a parametric surface generated in Grasshopper. This page focuses on that last case study: 
                 a custom Grasshopper script generated sine-wave geometry, sliced with true non-planar toolpaths, to trade the usual 
                 staircase artifacts for a single continuous surface.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* 2. LARGE RESULT IMAGE */}
          <SectionFadeOnScroll imageUrls={[IMG_COVER_HERO]}>
            <section className="space-y-3 w-full">
              <button
                type="button"
                onClick={() => openLightbox(IMG_COVER_HERO, "Non-planar printed result, Grasshopper-generated surface")}
                className="block w-full"
              >
                <img
                  src={IMG_COVER_HERO}
                  alt="Non-planar printed result, Grasshopper-generated surface"
                  className="w-full aspect-video object-cover bg-neutral-900"
                />
              </button>
              <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                Grasshopper Non-Planar Surface Generation Result - printed on a Prusa XL with metallic black filament, compared against a planar control
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* 3. Two Rhino views side by side */}

              
                    <SectionFadeOnScroll imageUrls={[IMG_RHINO_POLYSURFACE, IMG_RHINO_HEIGHT]}>
                      <section className="space-y-6 w-full">
                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                          Application - Grasshopper Parametic Non-Planar Surface Generator
                        </h2>
                        <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                          One of the aspect looks at the Grasshopper application from a wider non-planar
                slicing study on the Prusa XL. A parametric script generated sine-wave
                surfaces with a controllable maximum height and slope angle, which were then
                sliced with true non-planar toolpaths and printed in metallic black filament.
                Compared against a standard planar control, the non-planar version resolved
                the staircase artifacts into a single continuous, reflective surface.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          <div className="space-y-2">
                            <img
                              src={IMG_RHINO_POLYSURFACE}
                              alt="Section A - Mechanical assembly"
                              className="aspect-5/2"
                            />
                            <p className="text-[11px] md:text-xs text-neutral-400">
                              Rhino View - Grasshopper Generated Surface to Polysurface
                            </p>
                          </div>
                          <div className="space-y-2">
                            <img
                              src={IMG_RHINO_HEIGHT}
                              alt="Section B - Electronics and trigger platform"
                              className="aspect-5/2"
                            />
                            <p className="text-[11px] md:text-xs text-neutral-400">
                              Rhino view — Grasshopper controlling maximum non-planar height
                            </p>
                          </div>
                        </div>
                      </section>
                    </SectionFadeOnScroll>

          {/* 4. Large Grasshopper canvas image */}
          <SectionFadeOnScroll imageUrls={[IMG_GRASSHOPPER_CANVAS]}>
            <section className="space-y-3 w-full">
              <button
                type="button"
                onClick={() => openLightbox(IMG_GRASSHOPPER_CANVAS, "Grasshopper definition for the parametric non-planar surface")}
                className="block w-full"
              >
                <img
                  src={IMG_GRASSHOPPER_CANVAS}
                  alt="Grasshopper definition for the parametric non-planar surface"
                  className="w-full h-auto object-cover bg-neutral-900"
                />
              </button>
              <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                Grasshopper definition with custom components for adjusting the non-planar
                parameters — inspired by Daoru Wang&apos;s parametric vase tutorial
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* 5. Comparison grid: Control vs Non-Planar, each with print + slicing preview */}
          <SectionFadeOnScroll imageUrls={[IMG_CONTROL_PRINTED, IMG_CONTROL_SLICING, IMG_RESULT_HERO, IMG_NONPLANAR_SLICING]}>
            <section className="space-y-6 w-full">
              {/* Row 1: Control */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <button type="button" onClick={() => openLightbox(IMG_CONTROL_PRINTED, "Control set printed object, planar slicing")} className="block w-full">
                    <img src={IMG_CONTROL_PRINTED} alt="Control set printed object, planar slicing" className="w-full aspect-4/3 object-cover bg-neutral-900" />
                  </button>
                  <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                    Control set — printed object (planar)
                  </p>
                </div>
                <div className="space-y-2">
                  <button type="button" onClick={() => openLightbox(IMG_CONTROL_SLICING, "Control set slicing preview, planar")} className="block w-full">
                    <img src={IMG_CONTROL_SLICING} alt="Control set slicing preview, planar" className="w-full aspect-4/3 object-cover bg-neutral-900" />
                  </button>
                  <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                    Control set — slicing preview (planar)
                  </p>
                </div>
              </div>

              {/* Row 2: Non-Planar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <button type="button" onClick={() => openLightbox(IMG_RESULT_HERO, "Non-planar printed object")} className="block w-full">
                    <img src={IMG_RESULT_HERO} alt="Non-planar printed object" className="w-full aspect-4/3 object-cover bg-neutral-900" />
                  </button>
                  <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                    Non-planar — printed object
                  </p>
                </div>
                <div className="space-y-2">
                  <button type="button" onClick={() => openLightbox(IMG_NONPLANAR_SLICING, "Non-planar slicing preview")} className="block w-full">
                    <img src={IMG_NONPLANAR_SLICING} alt="Non-planar slicing preview" className="w-full aspect-4/3 object-cover bg-neutral-900" />
                  </button>
                  <p className="text-[11px] leading-tight text-neutral-400 md:text-xs">
                    Non-planar — slicing preview
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 6. YouTube embed */}
          <SectionFadeOnScroll>
            <section className="space-y-3 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Printing Footage
              </h2>
              <div className="w-full aspect-video bg-neutral-900">
                <iframe
                  className="w-full h-full"
                  src={YOUTUBE_EMBED_URL}
                  title="Grasshopper Generated Non-Planar Surface | Printing Footage | Prusa XL"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 7. Full research PDF */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Full Research Document
              </h2>
              <PdfViewer fileUrl={PDF_URL} theme="dark" />
            </section>
          </SectionFadeOnScroll>

          {/* Footer / Back to top */}
          <SectionFadeOnScroll>
            <div className="flex justify-center pt-10 pb-20 w-full">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-white"
              >
                ↑ Back to top
              </button>
            </div>
          </SectionFadeOnScroll>

        </div>
      </main>

      <Lightbox open={lightboxOpen} src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
    </>
  );
}
