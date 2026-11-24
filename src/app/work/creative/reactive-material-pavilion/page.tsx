"use client";

import React, { useState } from "react";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

/* ---------------------------------------------
   IMAGE URLs
   1  = Section A
   2  = Section B
   3  = Iso drawing – state change
   4  = Shelter Close (top)
   5  = Shelter Open (top)
   6  = Shelter Close (iso)
   7  = Shelter Open (iso)
   8  = Side view
   9  = Wood object
   10 = Wood object on shelter
   11 = Industrial object
   12 = Industrial object on shelter
   13 = Arduino setup diagram
---------------------------------------------- */
const img = (n: number) =>
  `https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Reactive%20Material%20Pavilion/${n}.jpg?raw=true`;

const IMG_SECTION_A = img(1);
const IMG_SECTION_B = img(2);
const IMG_ISO_STATE = img(3);
const IMG_CLOSE_TOP = img(4);
const IMG_OPEN_TOP = img(5);
const IMG_CLOSE_ISO = img(6);
const IMG_OPEN_ISO = img(7);
const IMG_SIDE = img(8);
const IMG_WOOD_OBJ = img(9);
const IMG_WOOD_ON = img(10);
const IMG_INDUSTRIAL_OBJ = img(11);
const IMG_INDUSTRIAL_ON = img(12);
const IMG_ARDUINO = img(13);

/* YouTube */
const YOUTUBE_EMBED = "https://www.youtube.com/embed/xeEzHZxaudU";

export default function ReactiveMaterialPavilionPage() {
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

  /* Clickable image helper */
  const Img = ({
    src,
    alt,
    className = "",
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={() => openLightbox(src, alt)}
      className="block w-full text-left"
    >
      <img
        src={src}
        alt={alt}
        className={`w-full bg-neutral-900 object-cover ${className}`}
      />
    </button>
  );

  return (
    <>
      <main className="min-h-dvh w-full bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-16 md:space-y-20">
          {/* ───────────────── 1. INTRO ───────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 md:space-y-6 w-full">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Cyber Physical Architecture | Spring 2025
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Reactive Material Pavilion
              </h1>
              <p className="text-sm text-neutral-500">
                Team: Mackey Tsang &amp; Henry Qiu
              </p>
              <p className="w-full text-sm md:text-base text-neutral-300 leading-relaxed">
                This project explores the fusion of mechanical design, spatial
                transformation, and interactive technology through a dynamic
                shelter system that responds to both physical movement and
                digital input. A circular kinetic structure, driven by a
                potentiometer-controlled central axis, initiates a synchronized
                opening and closing motion across 12 interconnected triangular
                plates, while a voltage-divider circuit detects the material
                properties of objects placed on an interactive trigger platform,
                translating physical gestures into real-time architectural
                transformations inside a Unity digital twin.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 2. YOUTUBE VIDEO ───────────────── */}
          <SectionFadeOnScroll>
            <section className="w-full">
              <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
                <iframe
                  src={YOUTUBE_EMBED}
                  title="Reactive Material Pavilion - Full Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 3. SECTION DRAWINGS ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_SECTION_A, IMG_SECTION_B]}>
            <section className="space-y-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Design and Mechanism
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The shelter is driven by a circular mechanical structure where
                the rotation of a central axis—controlled by a
                potentiometer—initiates a synchronized blooming motion across the
                triangular plate system. Section&nbsp;A illustrates the
                bolt-and-joint assembly that connects the plates to the
                platform, while Section&nbsp;B reveals the hidden interactive
                layer beneath: an Arduino, potentiometer, force-sensitivity
                pointer, and a container of magnetic fluid positioned under the
                trigger zone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <Img
                    src={IMG_SECTION_A}
                    alt="Section A - Mechanical assembly"
                    className="aspect-5/2"
                  />
                  <p className="text-[11px] md:text-xs text-neutral-400">
                    Section A - Structural assembly: stick, triangle plate,
                    washer, platform, nut, base, bolt
                  </p>
                </div>
                <div className="space-y-2">
                  <Img
                    src={IMG_SECTION_B}
                    alt="Section B - Electronics and trigger platform"
                    className="aspect-5/2"
                  />
                  <p className="text-[11px] md:text-xs text-neutral-400">
                    Section B - Electronics layer: Arduino, potentiometer,
                    force-sensitivity pointer, magnetic fluid container
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 3b. ARDUINO SETUP ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_ARDUINO]}>
            <section className="space-y-6 w-full">
              
              <div className="space-y-3 w-full">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Arduino Setup
                </h2>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  The Arduino-based system reads two types of input: a
                  potentiometer for rotation control (analog pin A1, mapped to
                  &minus;20 to 20 degrees in Unity) and a voltage-divider circuit
                  for material detection (analog pin A0). The voltage divider
                  uses a fixed 10&thinsp;&Omega; resistor paired with a
                  material-dependent conductor—graphite outputs a mid-range
                  voltage, metal outputs close to 5V, and non-conductive
                  materials output near 0V. Both values are sent through serial
                  communication to drive the digital twin in real time.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Img
                  src={IMG_ARDUINO}
                  alt="Arduino setup diagram - Potentiometer and voltage divider wiring"
                  className="aspect-21/9"
                />
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 4. STATE CHANGE ISO ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_ISO_STATE]}>
            <section className="space-y-6 w-full">

              <div className="space-y-3 w-full">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Spatial Transformation
                </h2>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  In its open state, users place physical objects onto
                  designated interactive trigger zones. These zones act as
                  physical interfaces to trigger digital transformations in a
                  Unity-based simulation. For example, placing a wooden object
                  prompts the digital twin to morph into a wooden residential
                  space; placing a metallic industrial object transforms it into
                  an industrial facility—adapting materials, layout, and spatial
                  character to suit functional needs.
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <Img
                  src={IMG_ISO_STATE}
                  alt="Isometric drawing - State transformation from blank to residential and industrial"
                  className="aspect-4/3"
                />
              </div>
            </section>
          </SectionFadeOnScroll>
          <hr className="border-neutral-800" />

          {/* ───────────────── 5. PHYSICAL MODEL ───────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Physical Model
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The physical model is a circular kinetic shelter composed of 12
                transparent acrylic triangular plates, arranged radially around a
                central rotating core and connected through a system of 20
                bolt-and-nut joints. The choice of transparent acrylic reflects
                the idea of purity, simplicity, and neutrality—allowing the
                shelter to act as a blank canvas that can transform into
                different materials, styles, and functions based on user
                interaction.
              </p>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                Movement originates from the center, where a potentiometer
                allows users to manually rotate the central plate. A second
                stick was added on the opposite side to create a balanced pulling
                force that overcomes friction and ensures smoother motion. Bolts
                were left with a small gap to reduce friction at each joint, and
                super glue was applied to secure the nuts while maintaining
                necessary flexibility.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 6. SHELTER CLOSE / OPEN – TOP ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_CLOSE_TOP, IMG_OPEN_TOP]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <div className="space-y-2">
                <Img
                  src={IMG_CLOSE_TOP}
                  alt="Shelter Close - Top view"
                  className="aspect-square"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Shelter Close - Top view
                </p>
              </div>
              <div className="space-y-2">
                <Img
                  src={IMG_OPEN_TOP}
                  alt="Shelter Open - Top view"
                  className="aspect-square"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Shelter Open - Top view
                </p>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 7. SHELTER CLOSE / OPEN – ISO ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_CLOSE_ISO, IMG_OPEN_ISO]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <div className="space-y-2">
                <Img
                  src={IMG_CLOSE_ISO}
                  alt="Shelter Close - Isometric view"
                  className="aspect-4/4"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Shelter Close - Isometric view
                </p>
              </div>
              <div className="space-y-2">
                <Img
                  src={IMG_OPEN_ISO}
                  alt="Shelter Open - Isometric view"
                  className="aspect-4/4"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Shelter Open - Isometric view
                </p>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 8. SIDE VIEW ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_SIDE]}>
            <section className="space-y-2 w-full">
              <Img
                src={IMG_SIDE}
                alt="Shelter - Side elevation"
                className="aspect-video"
              />
              <p className="text-[11px] md:text-xs text-neutral-400">
                Side elevation - Showing the bolt-and-joint structure and
                platform height
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 9. INTERACTIVE TRIGGER OBJECTS ───────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Interactive Trigger Objects
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                On the circular base, a small black platform embedded with two
                wires acts as an interactive trigger zone. Different objects
                complete the Arduino voltage-divider circuit with varying
                resistance values, allowing the system to recognise materials
                and trigger specific architectural transformations in Unity.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 10. WOOD OBJECT ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_WOOD_OBJ, IMG_WOOD_ON]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <div className="space-y-2">
                <Img
                  src={IMG_WOOD_OBJ}
                  alt="Wood trigger object"
                  className="aspect-4/5"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Wood object - Residential trigger
                </p>
              </div>
              <div className="space-y-2">
                <Img
                  src={IMG_WOOD_ON}
                  alt="Wood object placed on shelter platform"
                  className="aspect-4/5"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Placed on platform - Triggers residential transformation
                </p>
              </div>
            </section>
          </SectionFadeOnScroll>

          <SectionFadeOnScroll>
            <section className="space-y-3 w-full">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                Residential Trigger · Wood
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                A solid metal core is embedded at the centre of the wood object
                to increase its weight, ensuring the graphite plate attached to
                the bottom makes stable contact with the platform&rsquo;s wires.
                The metal core also allows the object to be attracted to a
                hidden magnet positioned below the platform, helping to
                precisely locate and stabilise the object. The graphite acts as a
                semi-conductor, producing a mid-range voltage that is neither 0V
                nor 5V—this unique value differentiates and triggers the
                residential animation in Unity.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── 11. INDUSTRIAL OBJECT ───────────────── */}
          <SectionFadeOnScroll imageUrls={[IMG_INDUSTRIAL_OBJ, IMG_INDUSTRIAL_ON]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <div className="space-y-2">
                <Img
                  src={IMG_INDUSTRIAL_OBJ}
                  alt="Industrial trigger object"
                  className="aspect-video"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Industrial object - Energy-flow trigger
                </p>
              </div>
              <div className="space-y-2">
                <Img
                  src={IMG_INDUSTRIAL_ON}
                  alt="Industrial object placed on shelter platform"
                  className="aspect-video"
                />
                <p className="text-[11px] md:text-xs text-neutral-400">
                  Placed on platform - Triggers industrial transformation
                </p>
              </div>
            </section>
          </SectionFadeOnScroll>

          <SectionFadeOnScroll>
            <section className="space-y-3 w-full">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                Industrial Trigger · Metal
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The industrial object uses a combination of metallic materials to
                symbolise energy flow in industrial architecture. Steel washers
                are attached around the sides for weight, and an aluminium plate
                is fixed at the bottom as a conductor, completing the circuit at
                a full 5V output—signalling a different animation from the
                semi-conductive wood object. Copper tape wraps the container cap
                for visual continuity, while inside, a mixture of iron oxide and
                water reacts to a hidden magnet beneath the platform,
                symbolising the dynamic flow of energy typically found in
                industrial settings.
              </p>
            </section>
          </SectionFadeOnScroll>

                    <hr className="border-neutral-800" />
          {/* ───────────────── 12. DIGITAL TWIN ───────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Unity Digital Twin
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The digital twin mirrors the physical shelter&rsquo;s kinetic
                behaviour inside Unity. Real-time serial data from the Arduino
                drives the Y-axis rotation of the central structure, while the
                voltage-divider value triggers an Animator Controller that
                transitions between standby, residential, and industrial
                animation states. A secondary script maps the same potentiometer
                input to the directional light&rsquo;s X-axis rotation,
               shifting the time of day as the shelter opens and
                closes, creating a tightly linked system where a single physical
                motion controls both the shelter&rsquo;s form and the atmosphere
                around it.
              </p>
            </section>
          </SectionFadeOnScroll>
                    <hr className="border-neutral-800" />
          {/* ───────────────── 13. FURTHER DEVELOPMENT ───────────────── */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Further Development
              </h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                A key opportunity lies in expanding the system&rsquo;s material
                interaction and spatial complexity. By introducing a wider range
                of architectural materials—copper, aluminium, graphite, carbon
                fibre, or conductive fabric—more unique voltage values can
                represent specific architectural typologies, allowing the
                pavilion to shift into forms like a timber cabin, glass pavilion,
                or sacred space. Additionally, introducing multiple sensor
                platforms around the shelter would allow for spatial coordination
                and overlap, creating opportunities for hybrid architecture
                where multiple typologies blend, overlap, or react to one
                another based on the placement and combination of materials.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* ───────────────── FOOTER / BACK TO TOP ───────────────── */}
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
