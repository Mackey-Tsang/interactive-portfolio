"use client";

import React, { useState } from "react";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

/* ---------------------------------------------
   IMAGE URLs
---------------------------------------------- */
const IMG_STEP_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/1.jpg?raw=true";
const IMG_STEP_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/2.jpg?raw=true";
const IMG_STEP_3 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/3.jpg?raw=true";
const IMG_STEP_4 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/4.jpg?raw=true";

/* YouTube */
const YOUTUBE_EMBED = "https://www.youtube.com/embed/ZbGYLuy7pvY";

/* Reference CAD Model links */
const REF_FLOWER_GEAR =
  "https://makerworld.com/en/models/1718872-flower-gear-work-in-progress-prototype?from=search#profileId-1824387";
const REF_ARDUINO_CASE =
  "https://makerworld.com/en/models/16287-arduino-case?from=search#profileId-15208";
const REF_STEPPER_MOUNT =
  "https://www.printables.com/model/201405-28byj-48-stepper-motor-mount";

export default function LumiBloomPage() {
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
          {/* ───────────────────── 1. INTRO ───────────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 md:space-y-6 w-full">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Cyber Physical Fabrication | Autumn 2026
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                LumiBloom
              </h1>
              <p className="text-sm text-neutral-300">
                Collaborator: Lukas Milicic
              </p>
              <p className="w-full text-sm md:text-base text-neutral-300 leading-relaxed">
                LumiBloom is a light-reactive kinetic sculpture that merges
                digital fabrication with embedded electronics. A 28BYJ-48
                stepper motor drives an intricate flower-gear mechanism housed
                inside a 3D-printed shell, while an Arduino reads ambient light
                intensity through an onboard sensor. Below a threshold of 300 lx
                the sculpture rests motionless; as light grows stronger—or its
                source draws nearer—the gears accelerate, translating photons
                into mechanical bloom.
              </p>
              
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────────── 2. YOUTUBE VIDEO ───────────────────── */}
          <SectionFadeOnScroll>
            <section className="w-full">
              <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
                <iframe
                  src={YOUTUBE_EMBED}
                  title="LumiBloom – Light-Reactive Kinetic Sculpture"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────────── 3. STEPS 1 & 2 ───────────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_STEP_1, IMG_STEP_2]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              {/* Step 1 */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(IMG_STEP_1, "Step 1 – Initialize Power")
                  }
                  className="block w-full"
                >
                  <img
                    src={IMG_STEP_1}
                    alt="Step 1 – Initialize Power"
                    className="w-full aspect-4/3 object-cover bg-neutral-900"
                  />
                </button>
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Step 1 · Initialize Power
                  </h2>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    Connect the Arduino&rsquo;s USB port to a reliable power
                    source, such as your computer, a USB power bank, or a wall
                    adapter.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      IMG_STEP_2,
                      "Step 2 – Activate the Light Source"
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={IMG_STEP_2}
                    alt="Step 2 – Activate the Light Source"
                    className="w-full aspect-4/3 object-cover bg-neutral-900"
                  />
                </button>
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Step 2 · Activate the Light Source
                  </h2>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    Turn on a light source (light cube). Increase the brightness
                    of the light cube by pressing its control button.
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────────── 4. STEPS 3 & 4 ───────────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_STEP_3, IMG_STEP_4]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              {/* Step 3 */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      IMG_STEP_3,
                      "Step 3 – Test Intensity-Driven Movement"
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={IMG_STEP_3}
                    alt="Step 3 – Test Intensity-Driven Movement"
                    className="w-full aspect-4/3 object-cover bg-neutral-900"
                  />
                </button>
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Step 3 · Test Intensity-Driven Movement
                  </h2>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    Point the light to the sensor. The prototype remains
                    stationary if the ambient light hitting the sensor is below
                    the minimum threshold (300&nbsp;lx). As the emitted light
                    intensifies, it will increase the motion of the prototype.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      IMG_STEP_4,
                      "Step 4 – Test Proximity-Driven Movement"
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={IMG_STEP_4}
                    alt="Step 4 – Test Proximity-Driven Movement"
                    className="w-full aspect-4/3 object-cover bg-neutral-900"
                  />
                </button>
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Step 4 · Test Proximity-Driven Movement
                  </h2>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    While keeping the light cube at a steady brightness,
                    physically move the light source closer to the sensor.
                    Because light intensity increases exponentially as the
                    distance decreases, it will also increase the motion of the
                    prototype.
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────────── 6. REFERENCE CAD MODELS ───────────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-5 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Reference CAD Models
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The physical assembly draws on three open-source CAD references,
                each selected for a specific role in the mechanism.
              </p>

              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex flex-col gap-0.5">
                  <a
                    href={REF_FLOWER_GEAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-100 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
                  >
                    Flower Gear – Work in Progress – PROTOTYPE
                  </a>
                  <span className="text-xs text-neutral-500">
                    by DTM247 · Makerworld
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <a
                    href={REF_ARDUINO_CASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-100 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
                  >
                    Arduino Case
                  </a>
                  <span className="text-xs text-neutral-500">
                    by Kazikk · Makerworld
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <a
                    href={REF_STEPPER_MOUNT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-100 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
                  >
                    28BYJ-48 Stepper Motor Mount
                  </a>
                  <span className="text-xs text-neutral-500">
                    by mikeneron · Printables
                  </span>
                </li>
              </ul>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────────── FOOTER / BACK TO TOP ───────────────────── */}
          <SectionFadeOnScroll>
            <div className="flex justify-center pt-10 pb-20 w-full">
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-white"
              >
                ↑ Back to top
              </button>
            </div>
          </SectionFadeOnScroll>
        </div>
      </main>

      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
      />
    </>
  );
}
