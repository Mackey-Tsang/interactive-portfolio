"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import FloatingLines from "../FloatingLines";
import FuzzyText from "../FuzzyText";
import ThreeVortex from "../ThreeVortex";
import SoftwareShowcase, { type SoftwareEntry } from "../SoftwareShowcase";
import type { ShowcaseProject } from "../ProjectShowcaseGrid";

// Fill in real project images under your Next.js "public" folder, e.g.
// public/showcase/sediment-ring.jpg → image: "/showcase/sediment-ring.jpg".
// A project can be reused under more than one software (it's just the same
// object referenced from multiple entries below) if it was built with
// several tools. "href" is where "View Project" links to — the ones below
// are my best guess from the image folder names (e.g. "The Third Ground",
// "Sediment Ring"); double-check they match your actual app/work/... routes.
const PROJECT_POOL: Record<string, ShowcaseProject> = {
  "rhino-one": {
    id: "rhino-one",
    name: "The Third Ground 2026",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/3.jpg?raw=true",
    href: "./work/architecture/third-place",
  },
  "rhino-two": {
    id: "rhino-two",
    name: "Architecture Structure Detail",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/6.jpg?raw=true",
    href: "./work/architecture/third-place",
  },
  "rhino-three": {
    id: "rhino-three",
    name: "Digtal Fabrication Model",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/3.jpg?raw=true",
    href: "./work/cyber-physical/sediment-ring",
  },
  "revit-one": {
    id: "revit-one",
    name: "Awa Market Hall 2025",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Awa%20Market%20Hall/p1.jpg?raw=true",
    href: "./work/architecture/awa-market-hall",
  },
    "revit-two": {
    id: "revit-two",
    name: "Dynamic Roof Design",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Awa%20Market%20Hall/p23.jpg?raw=true",
    href: "./work/architecture/awa-market-hall",
  },
    "revit-three": {
    id: "revit-three",
    name: "Forge Hub 2024",
    image: "/architecture/forgehub.jpg",
    href: "./work/architecture/forge-hub",
  },
    "unity-one": {
    id: "unity-one",
    name: "Award-Winning Project",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Soft%20Thresholds%20%E2%80%93%20Veilspace/p11.jpg?raw=true",
    href: "./work/cyber-physical/soft-thresholds-veilspace",
  },
    "unity-two": {
    id: "unity-two",
    name: "Cy-Phy Workshop",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Cy-Phy%20Workshop/p1.jpg?raw=true",
    href: "./work/cyber-physical/cy-phy-workshop",
  },
    "unity-three": {
    id: "unity-three",
    name: "Reactive Material Pavilion",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Reactive%20Material%20Pavilion/0.jpg?raw=true",
    href: "./work/cyber-physical/reactive-material-pavilion",
  },
  "arduino-one": {
    id: "arduino-one",
    name: "Award-Winning Project",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Soft%20Thresholds%20%E2%80%93%20Veilspace/p11.jpg?raw=true",
    href: "./work/cyber-physical/soft-thresholds-veilspace",
  },
    "arduino-two": {
    id: "arduino-two",
    name: "LumiBloom",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/4.jpg?raw=true",
    href: "./work/cyber-physical/lumibloom",
  },
    "arduino-three": {
    id: "arduino-three",
    name: "Reactive Material Pavilion",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Reactive%20Material%20Pavilion/0.jpg?raw=true",
    href: "./work/cyber-physical/reactive-material-pavilion",
  },
    "3d-print-one": {
    id: "3d-print-one",
    name: "Non-Planar Printing Research",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/0.jpg?raw=true",
    href: "./work/cyber-physical/non-planar-printing",
  },
    "3d-print-two": {
    id: "3d-print-two",
    name: "LumiBloom",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/4.jpg?raw=true",
    href: "./work/cyber-physical/lumibloom",
  },
    "3d-print-three": {
    id: "3d-print-three",
    name: "Sediment Ring",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/1.jpg?raw=true",
    href: "./work/cyber-physical/sediment-ring",
  },
    "d5-render-one": {
    id: "d5-render-one",
    name: "Awa Market Hall 2025",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Awa%20Market%20Hall/p21.jpg?raw=true",
    href: "./work/architecture/awa-market-hall",
  },
    "d5-render-two": {
    id: "d5-render-two",
    name: "Puzzle Block 2026 #Shortlisted",
    image: "/architecture/p5.jpg",
    href: "./work/architecture/kinderspace",
  },
    "d5-render-three": {
    id: "d5-render-three",
    name: "The Overlapping Intersection",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Overlapping%20Intersection/p3.jpg?raw=true",
    href: "./work/architecture/the-overlapping-intersection",
  },
    "model-making-one": {
    id: "model-making-one",
    name: "The Third Ground 2026",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/13.jpg?raw=true",
    href: "./work/architecture/third-place",
  },
    "model-making-two": {
    id: "model-making-two",
    name: "Forge Hub 2024",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Forge%20Hub%20Forum%20of%20Voices/p22.jpg?raw=true",
    href: "./work/architecture/forge-hub",
  },
    "model-making-three": {
    id: "model-making-three",
    name: "Sediment Ring",
    image: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/1.jpg?raw=true",
    href: "./work/architecture/sediment-ring",
  },
};

// Fill in real logo vectors under your Next.js "public" folder, e.g.
// public/logos/rhino.svg → logo: "/logos/rhino.svg". "projects" lists which
// of the projects above used that software — add/remove/reorder freely,
// and leave "projects" as [] for a tool with nothing tagged yet.
// "invertLogo: true" assumes these ship as black artwork on a transparent
// background (the usual case for these vendors' icons) — flip any specific
// one to false if its actual file turns out to already be white/colored.
const SOFTWARE_LIST: SoftwareEntry[] = [
  {
    id: "rhino",
    name: "Rhino 3D",
    logo: "/logos/rhino.svg",
    invertLogo: true,
    projects: [PROJECT_POOL["rhino-one"], PROJECT_POOL["rhino-two"], PROJECT_POOL["rhino-three"]],
  },

  {
    id: "revit",
    name: "Revit",
    logo: "/logos/revit.svg",
    invertLogo: false,
    projects: [PROJECT_POOL["revit-one"], PROJECT_POOL["revit-two"], PROJECT_POOL["revit-three"]],
  },
  {
    id: "unity",
    name: "Unity",
    logo: "/logos/unity.svg",
    invertLogo: true,
    projects: [PROJECT_POOL["unity-one"], PROJECT_POOL["unity-two"], PROJECT_POOL["unity-three"]],
  },
  {
    id: "arduino",
    name: "Arduino",
    logo: "/logos/arduino.svg",
    invertLogo: true,
    projects: [PROJECT_POOL["arduino-one"], PROJECT_POOL["arduino-two"], PROJECT_POOL["arduino-three"]],
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    logo: "/logos/bambu-lab.svg",
    invertLogo: true,
    projects: [PROJECT_POOL["3d-print-one"], PROJECT_POOL["3d-print-two"], PROJECT_POOL["3d-print-three"]],
  },
  {
    id: "d5-render",
    name: "D5 Render",
    logo: "/logos/d5-render.svg",
    invertLogo: false,
    projects: [PROJECT_POOL["d5-render-one"], PROJECT_POOL["d5-render-two"], PROJECT_POOL["d5-render-three"]],
  },
    {
    id: "model-making",
    name: "Model Making",
    logo: "/logos/model.svg",
    invertLogo: true,
    projects: [PROJECT_POOL["model-making-one"], PROJECT_POOL["model-making-two"], PROJECT_POOL["model-making-three"]],
  },
];

export default function HomeIntroScene() {
  return (
    <div className="relative w-full h-full bg-black  overflow-y-auto scroll-smooth">

      {/* ===== SECTION 1 & 2 (Unchanged) ===== */}
      <div className="relative w-full h-screen border-b border-white/10 overflow-hidden">
        {/* <ThreeVortex /> */}
        <FloatingLines
    enabledWaves={["middle"]}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={10}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={13.5}
    bendRadius={30}
    bendStrength={-5}
    interactive={true}
    parallax={true}
    globalOpacity ={1}
  />
        <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-30">
          <div className="px-6 flex flex-col items-center">
            <div className="pointer-events-auto mb-1">
              {/* Mobile floor raised from 2.5rem -> 3.4rem (the old wrapper
                  also shrank this to 90% on mobile via scale-90, so the two
                  changes compound into a much bigger name on phones; see
                  clamp() note below for how to tune this further). */}
              <FuzzyText fontSize="clamp(3.4rem, 11vw, 3.5rem)" fontWeight={800} color="#ffffff" baseIntensity={0.1} hoverIntensity={0.6} enableHover style={{ filter: "drop-shadow(0 0 15px rgba(0,255,255,0.3))", letterSpacing: "-0.02em", }}>Mackey Tsang</FuzzyText>
            </div>
            <FuzzyText fontSize="clamp(0.8rem, 2vw, 1rem)" fontWeight={500} color="rgba(255,255,255,0.9)" baseIntensity={0.1} hoverIntensity={0.4} enableHover>Cyber-Physical Design • Architecture • Photography</FuzzyText>
            {/* <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cyan-50 animate-pulse">Double Click to Warp Reality</p> */}
          </div>
        </div>
      </div>

      <section className="relative w-full bg-neutral-900/30 px-6 md:px-10 lg:px-14 py-24 border-b border-white/10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl mb-2">The Archive</h2>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Digital Portfolio 2026</p>
          </div>
          <div className="md:col-span-8 text-neutral-400 text-s leading-relaxed max-w-3xl font-light">
            <p>This interactive archive, built with TypeScript and Tailwind,  is a unified gateway to my work in photography, architecture, and cyber-physical design. Each section is custom-engineered with its own visual logic, reflecting a different chapter of my design journey, from raw material to digital interaction. By merging real-time motion with a systems-driven approach, this platform mirrors how I think and build: through material logic, technical precision, and immersive experience.</p>
          </div>
        </div>
      </section>

      {/* ===== SOFTWARE — logo loop; click a logo to reveal the projects that used it ===== */}
      <section className="relative w-full bg-black px-6 md:px-10 lg:px-14 py-14 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-1 text-2xl md:text-3xl  text-white font-bold">
            Software &amp; Skills
          </p>
          <p className="mb-16 text-xs text-neutral-500 uppercase tracking-widest">
            Click logo to explore the projects that used it
          </p>
          {/* speed={0} -> no auto-drift at all; the strip only moves when
              dragged/swiped (see LogoLoop's new pointer handling). */}
          <SoftwareShowcase software={SOFTWARE_LIST} speed={50} logoHeight={64} gap={80} />
        </div>
      </section>

      {/* ===== SECTION 3: ABOUT (Bottom) ===== */}
      <section className="relative w-full min-h-screen bg-black overflow-hidden">

        {/* --- 3D CANVAS LAYER (Kept the setup, but removed stickers) --- */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Canvas className="pointer-events-none">
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

              <ambientLight intensity={0.4} color="#ffffff" />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
              <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />

              <Environment preset="warehouse" />

              {/* Stickers removed here */}

            </Suspense>
          </Canvas>
        </div>

        {/* CONTENT GRID - Unchanged */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 py-42 grid grid-cols-1 md:grid-cols-12 gap-12 pointer-events-none">
          <div className="md:col-span-2 flex flex-col items-start justify-start pointer-events-auto">
            <h2 className="text-white font-bold tracking-tighter text-5xl mb-6">About</h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 space-y-6 text-left pointer-events-auto pt-2">
             <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Experience</h3>
              <div className="space-y-3 text-xs font-light text-white/80 leading-tight">

                <div className="group"><p className="font-medium text-white mb-0.5">Digital Research Hub - UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Research & Teaching Assistant — 2025-Now</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Mechanical & Mechatronics Engineering - UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Research Assistant — 2025</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">PhotoSoc UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Head of Marketing — 2024</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Pictureworks (Hong Kong)</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Photography & Sales Service Associate — 2023</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Achievements</h3>
              <div className="space-y-3 text-xs font-light text-white/80 leading-tight">
              <div><p className="font-medium text-white mb-0.5">Shortlisted - Architecture Competition</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Buildner Kinderspace #3</p></div>
              <div><p className="font-medium text-white mb-0.5">Summer Research Scholarship</p><p className="text-white/50 text-[10px] uppercase tracking-wider">University of Auckland 2025</p></div>
              <div><p className="font-medium text-white mb-0.5">Second Prize - National Finals</p><p className="text-white/50 text-[10px] uppercase tracking-wider">10th Cross-Strait Design Competition • Huacan Award 2025</p></div>
                <div><p className="font-medium text-white mb-0.5">NCEA Design Scholarship</p><p className="text-white/50 text-[10px] uppercase tracking-wider">New Zealand 2022</p></div>
                <div><p className="font-medium text-white mb-0.5">First Place in Art Design</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Sacred Heart College 2022</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Connect</h3>
              <div className="flex flex-col gap-1 text-xs text-white/60 leading-tight">
  {/* Email: mailto: */}
  <a
    href="mailto:mackeytsang04@gmail.com"
    className="hover:text-white transition-colors flex items-center gap-2"
  >
    <span className="w-1 h-1 bg-current rounded-full"></span>
    mackeytsang04@gmail.com
  </a>

  {/* Instagram: https://instagram.com/username */}
  <a
    href="https://www.instagram.com/mac_ms62/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white transition-colors flex items-center gap-2"
  >
    <span className="w-1 h-1 bg-current rounded-full"></span>
    @mac_ms62 (Instagram - Photography)
  </a>

  {/* LinkedIn: https://linkedin.com/in/username */}
  <a
    href="https://nz.linkedin.com/in/mackey-tsang-521188281"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white transition-colors flex items-center gap-2"
  >
    <span className="w-1 h-1 bg-current rounded-full"></span>
    LinkedIn /mackey-tsang
  </a>
</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 w-full text-center z-20 pointer-events-none">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-light">© 2026 Mackey Tsang. All Rights Reserved.</p>
        </div>

      </section>
    </div>
  );
}
