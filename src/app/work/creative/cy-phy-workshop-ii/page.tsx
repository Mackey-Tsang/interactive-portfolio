"use client";

import React, { useState } from "react";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";
import LightboxVideo from "@/components/LightboxVideo";

/* ──────────────────────────────────────────────────────────────
   IMAGE LINKS
   GitHub folder: CyberPhysical Project / The Next Lap /
   Numbering:
     p1.jpg   Hero portrait
     p2–p7    6 portrait photos (installation / showcase)
     p8–p13   6 landscape photos (installation / showcase)
     p14.jpg  Outcome landscape
   ────────────────────────────────────────────────────────────── */
const BASE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/The%20Next%20Lap/";
const img = (name: string) => `${BASE}${name}?raw=true`;

/* ──────────────────────────────────────────────────────────────
   VIDEO PATHS — update filenames to match your /public/media/ files
   ────────────────────────────────────────────────────────────── */
const SHOWCASE_VIDEOS = [
  {
    src: "/media/cy-phy-workshop-II/showcase-team.mp4",
    label: "Scene 01: Team, UoA Advanced Foiling Team",
  },
  {
    src: "/media/cy-phy-workshop-II/showcase-race.mp4",
    label: "Scene 02: Race, SuMoth Challenge 2027, Lake Garda",
  },
  {
    src: "/media/cy-phy-workshop-II/showcase-material.mp4",
    label: "Scene 04: Material, Advanced Composite Materials",
  },
];

const UNITY_SCREENRECORDINGS = [
  {
    key: "team",
    label: "Scene 01: Team, UoA Advanced Foiling Team (Unity Screen Recording)",
    src: "/media/cy-phy-workshop-II/unity-team-screenrecord.mp4",
  },
  {
    key: "race",
    label: "Scene 02: Race, SuMoth Challenge 2027, Lake Garda (Unity Screen Recording)",
    src: "/media/cy-phy-workshop-II/unity-race-screenrecord.mp4",
  },
  {
    key: "material",
    label: "Scene 04: Material, Advanced Composite Materials (Unity Screen Recording)",
    src: "/media/cy-phy-workshop-II/unity-material-screenrecord.mp4",
  },
];

/* ──────────────────────────────────────────────────────────────
   PHOTO ARRAYS — update alt text to describe each shot
   ────────────────────────────────────────────────────────────── */
const PORTRAIT_PHOTOS = [
  { src: img("p2.jpg"), alt: "The Next Lap installation, portrait view 1." },
  { src: img("p3.jpg"), alt: "The Next Lap installation, portrait view 2." },
  { src: img("p4.jpg"), alt: "The Next Lap installation, portrait view 3." },
  { src: img("p5.jpg"), alt: "The Next Lap installation, portrait view 4." },
  { src: img("p6.jpg"), alt: "The Next Lap installation, portrait view 5." },
  { src: img("p7.jpg"), alt: "The Next Lap installation, portrait view 6." },
];

const LANDSCAPE_PHOTOS = [
  { src: img("p8.jpg"), alt: "The Next Lap installation, landscape view 1." },
  { src: img("p9.jpg"), alt: "The Next Lap installation, landscape view 2." },
  { src: img("p10.jpg"), alt: "The Next Lap installation, landscape view 3." },
  { src: img("p11.jpg"), alt: "The Next Lap installation, landscape view 4." },
  { src: img("p12.jpg"), alt: "The Next Lap installation, landscape view 5." },
  { src: img("p13.jpg"), alt: "The Next Lap installation, landscape view 6." },
];

const SCENES = [
  { n: "01", label: "Team", desc: "UoA Advanced Foiling Team" },
  { n: "02", label: "Race", desc: "SuMoth Challenge 2027, Lake Garda" },
  { n: "03", label: "Fabrication", desc: "Carbon-fibre build process" },
  { n: "04", label: "Material", desc: "Advanced Composite Materials" },
  { n: "05", label: "Mechanics", desc: "Foil hydrodynamics" },
];

export default function TheNextLapPage() {
  const [currentUnityIndex, setCurrentUnityIndex] = useState(0);
  const currentUnityClip = UNITY_SCREENRECORDINGS[currentUnityIndex];

  const handleNextUnity = () =>
    setCurrentUnityIndex((prev) => (prev + 1) % UNITY_SCREENRECORDINGS.length);
  const handlePrevUnity = () =>
    setCurrentUnityIndex((prev) =>
      prev === 0 ? UNITY_SCREENRECORDINGS.length - 1 : prev - 1
    );

  return (
    <main className="min-h-dvh bg-black text-neutral-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* 01 — Hero: portrait image + overlapping title block */}
        <SectionFadeOnScroll>
          <section className="relative grid lg:grid-cols-[minmax(0,3fr)_minmax(0,3fr)] items-center">
            <div className="relative">
              <div className="relative h-auto overflow-hidden bg-neutral-900 ring-1 ring-white/5">
                <img
                  src={img("p1.jpg")}
                  alt="The Next Lap XR installation at Shed 10, Auckland."
                  className="object-cover w-full"
                />
              </div>
            </div>

            <div className="relative lg:-ml-16 lg:z-10">
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
                  Cyber-Physical / XR Installation
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  The Next Lap 2026
                </h1>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                  Cy-Phy Workshop II
                </h1>
                <p className="text-sm text-neutral-300 mb-4">
                  An Extended Reality installation developed by arc/sec Lab for the
                  launch of the{" "}
                  <span className="font-medium">
                    Bruce McLaren Centre for High Performance Engineering
                  </span>{" "}
                  campaign, translating K&#x14D;tare, the University of
                  Auckland&apos;s foiling International Moth sailboat, into a
                  multi-scene spatial animation across a large stereoscopic mesh
                  screen.
                </p>
                <div className="text-[11px] text-neutral-400 space-y-1">
                  <p>Role: Research Assistant, arc/sec Lab</p>
                  <p>Location: Shed 10, Auckland, October 2026</p>
                  <p>Tools: Unity, Rhino, Blender, Projection Mapping, 3D Shutter-Glass</p>
                </div>
              </div>
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 02 — Project Context */}
        <SectionFadeOnScroll>
          <section className="space-y-10">
            <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">
                  Project Context: Bruce McLaren Centre Campaign Launch
                </h2>
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">The Next Lap</span> is the
                  campaign launch for the Bruce McLaren Centre for High Performance
                  Engineering, a facility dedicated to advancing New Zealand&apos;s
                  engineering capability in motorsport, aeronautics, and advanced
                  composites. The event was held at Shed 10, Viaduct Harbour,
                  Auckland, in October 2026.
                </p>
                <p className="text-sm text-neutral-300">
                  arc/sec Lab was invited to develop an XR installation for the
                  launch. At the centre of the work is{" "}
                  <span className="font-medium">K&#x14D;tare</span>, a
                  carbon-fibre foiling International Moth sailboat designed and
                  built by the{" "}
                  <span className="font-medium">
                    UoA Advanced Foiling Team (AFT)
                  </span>
                  , a student-led group competing at the SuMoth Challenge 2027 in
                  Lake Garda, Italy. Three stereoscopic projectors and a large mesh
                  screen created a volumetric canvas; active-shutter glasses gave
                  audiences spatial depth in every scene.
                </p>
              </div>

              {/* 3 landscape looping showcase clips with LightboxVideo */}
              <div className="flex flex-col gap-3">
                {SHOWCASE_VIDEOS.map((v) => (
                  <LightboxVideo key={v.src} src={v.src} label={v.label}>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                      <video
                        className="h-full w-full object-cover"
                        src={v.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </LightboxVideo>
                ))}
              </div>
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 03 — Kōtare & The Five Scenes + photo grids */}
        <SectionFadeOnScroll>
          <section className="space-y-8">
            <h2 className="text-xl font-semibold tracking-tight">
              K&#x14D;tare: Five Scenes, One Vessel
            </h2>
            <p className="text-sm text-neutral-300">
              The installation uses the boat as an anchor, radiating outward into
              five scenes that each address a different dimension of its
              engineering, competition, and fabrication story. Viewers move between
              the structural and the kinetic, from composite material behaviour to
              the speed of a foil-borne hull above the water.
            </p>

            {/* Scene index */}
            <div className="grid grid-cols-5 gap-3 text-[11px]">
              {SCENES.map(({ n, label, desc }) => (
                <div
                  key={n}
                  className="space-y-1 border-t border-white/15 pt-3"
                >
                  <p className="font-mono text-neutral-500">{n}</p>
                  <p className="font-medium text-neutral-100">{label}</p>
                  <p className="text-neutral-400">{desc}</p>
                </div>
              ))}
            </div>

            {/* 6 portrait photos */}
            <div className="grid grid-cols-3 gap-4">
              {PORTRAIT_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full"
                  />
                </div>
              ))}
            </div>

            {/* 6 landscape photos */}
            <div className="grid grid-cols-3 gap-4">
              {LANDSCAPE_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 04 — My Role */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              My Role: Animation &amp; Production
            </h2>
            <p className="text-sm text-neutral-300">
              Working with Assoc. Prof. Uwe Rieger and Technologist Yinan Liu in
              arc/sec Lab, the focus was on translating each scene&apos;s subject
              matter into spatial Unity animation, alongside installation setup and
              running the showcase at Shed 10.
            </p>

            <div className="grid gap-6 sm:grid-cols-3 text-sm text-neutral-300">
              <div className="space-y-2">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Scene 01: Team
                </h3>
                <p>
                  Developed spatial compositions that communicate the collective
                  effort of the Advanced Foiling Team, the people behind
                  K&#x14D;tare&apos;s design, testing, and build.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Scene 02: Race
                </h3>
                <p>
                  Animated the racing context: foil-borne motion on Lake Garda,
                  capturing speed, hydrodynamic lift, and the competitive
                  environment of the SuMoth Challenge 2027.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Scene 04: Material
                </h3>
                <p>
                  Translated advanced composite material behaviour: fibre
                  orientation, layering, and structural performance into particle
                  and surface animation sequences.
                </p>
              </div>
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 05 — Unity Screen Recordings */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Unity Production: Screen Recordings
            </h2>
            <p className="text-sm text-neutral-300">
              Each scene was developed as a dedicated Unity sequence, with geometry
              and depth layers aligned to the mesh screen and projection mapping
              setup. The clips show real-time rendering before the installation at
              Shed 10.
            </p>

            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                <video
                  key={currentUnityClip.key}
                  className="h-full w-full object-cover"
                  src={currentUnityClip.src}
                  controls
                  playsInline
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-neutral-400">
                  {currentUnityIndex + 1} / {UNITY_SCREENRECORDINGS.length}:{" "}
                  {currentUnityClip.label}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrevUnity}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-neutral-100 hover:bg-white/10 transition"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextUnity}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-neutral-100 hover:bg-white/10 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 06 — Outcome */}
        <SectionFadeOnScroll>
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Outcome
            </h2>
            <p className="text-sm text-neutral-300">
              The installation introduced the Bruce McLaren Centre campaign through
              spatial animation rather than conventional presentation, placing
              high-performance engineering research in an immersive, volumetric
              context legible to a wide audience across engineering, design, and
              industry.
            </p>
            <p className="text-sm text-neutral-300">
              For K&#x14D;tare, the work extends the story of a physical artefact
              into the full breadth of its research, fabrication, and competitive
              ambition, demonstrating how architectural thinking can organise
              complex technical content into a clear, immersive experience.
            </p>
            <div className="relative overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
              <img
                src={img("p14.jpg")}
                alt="The Next Lap XR installation, Shed 10 Auckland."
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        </SectionFadeOnScroll>

      </div>
    </main>
  );
}