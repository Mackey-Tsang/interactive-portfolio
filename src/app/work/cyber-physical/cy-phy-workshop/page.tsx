"use client";

import React, { useState } from "react";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";
import Lightbox from "@/components/Lightbox";
import LightboxVideo from "@/components/LightboxVideo";

const UNITY_SCREENRECORDINGS = [
  {
    key: "fsae",
    label: "UoA Formula SAE Team (F:SAE:47) — Unity Screen Recording",
    src: "/media/cy-phy/unity-fsae-screenrecord.mp4",
  },
  {
    key: "uarc",
    label: "UoA Rocketry Club (UARC) — Unity Screen Recording",
    src: "/media/cy-phy/unity-uarc-screenrecord.mp4",
  },
  {
    key: "cdam-prosthetics",
    label: "CDAM + Prosthetics — Unity Screen Recording",
    src: "/media/cy-phy/unity-cdam-prosthetics-screenrecord.mp4",
  },
  {
    key: "cammd",
    label: "CAMMD — Unity Screen Recording",
    src: "/media/cy-phy/unity-cammd-screenrecord.mp4",
  },
  {
    key: "dtrg",
    label: "Drone Technology Research Group (DTRG) — Unity Screen Recording",
    src: "/media/cy-phy/unity-dtrg-screenrecord.mp4",
  },
];

export default function CyPhyWorkshopPage() {
  const [currentUnityIndex, setCurrentUnityIndex] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | undefined>();
  const [lightboxAlt, setLightboxAlt] = useState("");

  const currentUnityClip = UNITY_SCREENRECORDINGS[currentUnityIndex];

  const handleNextUnity = () => {
    setCurrentUnityIndex((prev) => (prev + 1) % UNITY_SCREENRECORDINGS.length);
  };

  const handlePrevUnity = () => {
    setCurrentUnityIndex((prev) =>
      prev === 0 ? UNITY_SCREENRECORDINGS.length - 1 : prev - 1
    );
  };

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <>
      <main className="min-h-dvh bg-black text-neutral-100">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {/* 01 — Hero: portrait image + overlapping title block */}
          <SectionFadeOnScroll>
            <section className="relative grid lg:grid-cols-[minmax(0,3fr)_minmax(0,3fr)] items-center">
              {/* Portrait hero image (exhibition) */}
              <div className="relative">
                <div className="relative h-auto overflow-hidden bg-neutral-900 ring-1 ring-white/5">
                  <img
                    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p1.jpg?raw=true"
                    alt="Engineering Tomorrow XR installation — portrait view of the 4.5 m fabric tower."
                    className="object-cover w-full"
                  />
                </div>
              </div>

              {/* Title block, slightly overlapping on large screens */}
              <div className="relative lg:-ml-16 lg:z-10">
                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
                    Cyber-Physical / XR Installation
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                    Engineering Tomorrow — XR Installation
                  </h1>
                  <p className="text-sm text-neutral-300 mb-4">
                    A 4.5 m-tall Extended Reality installation developed in the
                    Cy-Phy Workshop at arc/sec, translating engineering research
                    into spatial 3D animation for the{" "}
                    <span className="font-medium">
                      Engineering Tomorrow Showcase 2025
                    </span>{" "}
                    at the Faculty of Engineering &amp; Design, University of
                    Auckland.
                  </p>
                  <div className="text-[11px] text-neutral-400 space-y-1">
                    <p>Role — Research Assistant, Engineering &amp; Design</p>
                    <p>Location — University of Auckland, Newmarket Campus</p>
                    <p>Tools — Unity, Rhino, Blender, Projection Mapping, Shutter-Glass XR</p>
                  </div>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 02 — Project Context & Participating Labs */}
          <SectionFadeOnScroll>
            <section className="space-y-10">
              <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Project Context — Engineering Tomorrow Showcase 2025
                  </h2>
                  <p className="text-sm text-neutral-300">
                    <span className="font-medium">Engineering Tomorrow</span> is a
                    private-funded showcase hosted by the Faculty of Engineering
                    &amp; Design. The event gathers research groups across the
                    University of Auckland to demonstrate future-focused
                    engineering and design innovations. Each group provided
                    models, prototypes, and datasets that were reinterpreted into
                    a unified XR installation.
                  </p>
                  <p className="text-sm text-neutral-300">
                    The Cy-Phy Workshop within{" "}
                    <span className="font-medium">
                      arc/sec — Lab for Cyber-Physical Architecture &amp;
                      Interactive Systems
                    </span>{" "}
                    developed a shared projection environment where these
                    disciplines could be read through motion, light, and spatial
                    depth.
                  </p>
                </div>

                {/* 4 portrait videos (looping) with LightboxVideo to enlarge */}
                <div className="grid grid-cols-2 gap-3">
                  <LightboxVideo
                    src="/media/cy-phy/showcase-fsae-portrait.mp4"
                    label="F:SAE:47 — XR projection on tower"
                  >
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                      <video
                        className="h-full w-full object-cover"
                        src="/media/cy-phy/showcase-fsae-portrait.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </LightboxVideo>

                  <LightboxVideo
                    src="/media/cy-phy/showcase-uarc-portrait.mp4"
                    label="Rocketry Club — launch and smoke sequence"
                  >
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                      <video
                        className="h-full w-full object-cover"
                        src="/media/cy-phy/showcase-uarc-portrait.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </LightboxVideo>

                  <LightboxVideo
                    src="/media/cy-phy/showcase-cdam-prosthetics-portrait.mp4"
                    label="CDAM + Prosthetics — assembly and lattice patterns"
                  >
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                      <video
                        className="h-full w-full object-cover"
                        src="/media/cy-phy/showcase-cdam-prosthetics-portrait.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </LightboxVideo>

                  <LightboxVideo
                    src="/media/cy-phy/showcase-dtrg-portrait.mp4"
                    label="DTRG — drone paths and swarm behaviour"
                  >
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
                      <video
                        className="h-full w-full object-cover"
                        src="/media/cy-phy/showcase-dtrg-portrait.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </LightboxVideo>
                </div>
              </div>

              {/* Participating labs list */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-neutral-300">
                <div className="space-y-1">
                  <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                    Participating Labs
                  </h3>
                  <ul className="space-y-1">
                    <li>UoA Formula SAE Team (F:SAE:47)</li>
                    <li>UoA Rocketry Club (UARC)</li>
                    <li>arc/sec — Cyber-Physical Architecture</li>
                    <li>CDAM — Creative Design &amp; Additive Manufacturing Lab</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500 invisible">
                    &nbsp;
                  </h3>
                  <ul className="space-y-1">
                    <li>3D Printed Orthotics &amp; Prosthetics Group</li>
                    <li>CAMMD — Centre of Advanced Materials, Manufacturing &amp; Design</li>
                    <li>Drone Technology Research Group (DTRG)</li>
                  </ul>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 03 — The XR Installation: 2x2 portrait images */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              <h2 className="text-xl font-semibold tracking-tight">
                The XR Installation — Concept &amp; Structure
              </h2>
              <div className="space-y-4 text-sm text-neutral-300">
                <p>
                  The Cy-Phy Workshop developed a{" "}
                  <span className="font-medium">4.5 m-tall projection tower</span>{" "}
                  combining fabric and steel scaffolding with real-time 3D
                  animation inside Unity. Shutter glasses introduced stereoscopic
                  depth, turning the tower into a floating volumetric canvas where
                  motion, parallax, and light revealed each lab&apos;s engineering
                  focus.
                </p>
                <p>
                  Instead of literal diagrams, the installation translates{" "}
                  <span className="font-medium">
                    data, forces, and fabrication processes
                  </span>{" "}
                  into abstract spatial behaviour. Viewers read differences between
                  labs through changes in motion language—accelerations,
                  turbulence, aggregation, and dissolution across the height of
                  the tower.
                </p>
              </div>

              {/* 2 rows of 2 portrait images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <img
                    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p2.jpg?raw=true"
                    alt="F:SAE 47 aerodynamic animation on tower."
                    className="object-cover w-full"
                  />
                </div>
                <div className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <img
                    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p3.jpg?raw=true"
                    alt="Side view of FSAE sequence projected onto fabric."
                    className="object-cover w-full"
                  />
                </div>
                <div className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <img
                    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p4.jpg?raw=true"
                    alt="CDAM + Prosthetics animation from below the tower."
                    className="object-cover w-full"
                  />
                </div>
                <div className="relative h-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <img
                    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p5.jpg?raw=true"
                    alt="Close-up of lattice and particle assembly on the tower surface."
                    className="object-cover w-full"
                  />
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 04 — My Role (text only now) */}
          <SectionFadeOnScroll>
            <section className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight">
                My Role — Research Assistant, Engineering &amp; Design
              </h2>
              <p className="text-sm text-neutral-300">
                The role sits under the Department of Mechanical &amp; Mechatronics
                Engineering, working closely with{" "}
                <span className="font-medium">Assoc. Prof. Uwe Rieger</span> and{" "}
                <span className="font-medium">Technologist Yinan Liu</span> in
                arc/sec. The focus was to bridge engineering research content with
                an XR installation that is legible to a wider audience.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 text-sm text-neutral-300">
                <div className="space-y-2">
                  <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                    Content Collection &amp; Analysis
                  </h3>
                  <p>
                    Synthesised technical information, prototypes, and aerodynamic
                    data from each lab into clear visual references, mapping
                    mechanical behaviours into animation ideas.
                  </p>
                  <p>
                    Translated material tests, fabrication workflows, and
                    performance graphs into patterns of motion, layering, and
                    particle behaviour in Unity.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                    3D Modelling &amp; XR Production
                  </h3>
                  <p>
                    Built 3D geometry for spatial prototyping inside Unity,
                    designing depth layers tailored for shutter-glass stereoscopic
                    viewing.
                  </p>
                  <p>
                    Structured the projection layout to lock animations to the 4.5
                    m fabric tower, ensuring alignment with its steel and textile
                    frame.
                  </p>
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 05 — Unity Screen Recordings: landscape player with Next/Prev */}
          <SectionFadeOnScroll>
            <section className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Unity Production — Screen Recordings
              </h2>
              <p className="text-sm text-neutral-300">
                Each lab&apos;s animation was developed as a dedicated Unity scene
                within a shared spatial framework. The clips below show real-time
                rendering for each sequence before projection mapping to the 4.5 m
                tower.
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
                    {currentUnityIndex + 1} / {UNITY_SCREENRECORDINGS.length} —{" "}
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

          {/* 06 — VFX Screenshots row (with Lightbox + captions) */}
          <SectionFadeOnScroll>
            <section className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight">
                VFX Systems — Visual Language by Lab
              </h2>
              <p className="text-sm text-neutral-300">
                A set of custom VFX graphs and particle systems were developed to
                articulate each engineering focus—racing aerodynamics, rocket
                exhaust, material tests, and swarm behaviour.
              </p>

             <div className="overflow-x-auto">
  <div className="grid grid-cols-6 gap-3 w-full">
    {/* FSAE aerodynamic */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20aerodynamic.png?raw=true",
            "VFX graph — aerodynamic flow field for FSAE."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20aerodynamic.png?raw=true"
            alt="VFX graph — aerodynamic flow field for FSAE."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        F:SAE:47 — aerodynamic flow field
      </figcaption>
    </figure>

    {/* CDAM particles gather */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20particles%20gather.png?raw=true",
            "Particles gather VFX for CDAM + prosthetics."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20particles%20gather.png?raw=true"
            alt="Particles gather VFX for CDAM + prosthetics."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        CDAM + Prosthetics — particles gather
      </figcaption>
    </figure>

    {/* Rocketry smoke */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20smoke.png?raw=true",
            "Rocket exhaust smoke VFX for UARC."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20smoke.png?raw=true"
            alt="Rocket exhaust smoke VFX for UARC."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        UARC — exhaust + smoke
      </figcaption>
    </figure>

    {/* CAMMD surfboard */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20aero.png?raw=true",
            "Surfboard aerodynamic VFX for CAMMD."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20aero.png?raw=true"
            alt="Surfboard aerodynamic VFX for CAMMD."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        CAMMD — surfboard aerodynamic test
      </figcaption>
    </figure>

    {/* CAMMD bubbles */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20bubble.png?raw=true",
            "Bubble simulation VFX for CAMMD."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20bubble.png?raw=true"
            alt="Bubble simulation VFX for CAMMD."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        CAMMD — bubble flow simulation
      </figcaption>
    </figure>

    {/* CAMMD trails */}
    <figure className="w-full">
      <button
        type="button"
        className="block w-full"
        onClick={() =>
          openLightbox(
            "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20trails.png?raw=true",
            "Trail-based material test VFX for CAMMD."
          )
        }
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/vfx/%20surf%20trails.png?raw=true"
            alt="Trail-based material test VFX for CAMMD."
            className="object-cover w-full h-full"
          />
        </div>
      </button>
      <figcaption className="mt-2 text-[11px] text-neutral-400">
        CAMMD — material trail tests
      </figcaption>
    </figure>
  </div>
</div>

            </section>
          </SectionFadeOnScroll>

          {/* 07 — Outcome & Reflection */}
          <SectionFadeOnScroll>
            <section className="space-y-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Outcome — Spatialised 3D Animation
              </h2>
              <p className="text-sm text-neutral-300">
                The installation resulted in a{" "}
                <span className="font-medium">
                  multi-layered XR animation set
                </span>{" "}
                that connects engineering research with spatial storytelling. Each
                lab is recognised through a distinctive motion language, yet all
                share one continuous vertical structure.
              </p>
              <p className="text-sm text-neutral-300">
                This project consolidates skills in Unity XR animation,
                projection-mapping workflows, and cross-faculty collaboration,
                demonstrating how architectural thinking can organise complex
                technical content into a clear, immersive experience.
              </p>
            </section>
          </SectionFadeOnScroll>
        </div>
      </main>

      {/* Global Lightbox for images */}
      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
