"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import FloatingLines from "../FloatingLines";
import FuzzyText from "../FuzzyText";
import ThreeVortex from "../ThreeVortex";

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
            <div className="pointer-events-auto mb-1 transform scale-90 md:scale-100">
              <FuzzyText fontSize="clamp(2.5rem, 6vw, 3.5rem)" fontWeight={800} color="#ffffff" baseIntensity={0.1} hoverIntensity={0.6} enableHover style={{ filter: "drop-shadow(0 0 15px rgba(0,255,255,0.3))", letterSpacing: "-0.02em", }}>Mackey Tsang</FuzzyText>
            </div>
            <FuzzyText fontSize="clamp(0.8rem, 2vw, 1rem)" fontWeight={500} color="rgba(255,255,255,0.9)" baseIntensity={0.1} hoverIntensity={0.4} enableHover>Photography • Architecture • Cyber-Physical Design</FuzzyText>
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
          <div className="md:col-span-8 text-neutral-400 text-xs leading-relaxed max-w-2xl font-light">
            <p>This interactive archive, built with TypeScript and Tailwind,  is a unified gateway to my work in photography, architecture, and cyber-physical design. Each section is custom-engineered with its own visual logic, reflecting a different chapter of my design journey, from raw material to digital interaction. By merging real-time motion with a systems-driven approach, this platform mirrors how I think and build: through material logic, technical precision, and immersive experience.</p>
          </div>
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
                
                <div className="group"><p className="font-medium text-white mb-0.5">Digital Research Hub - UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Teaching Assistant — 2025-26</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Mechanical & Mechatronics Engineering - UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Research Assistant — 2025</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">PhotoSoc UoA</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Head of Marketing — 2024</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Pictureworks (Hong Kong)</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Photography & Sales Service Associate — 2023</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Awards</h3>
              <div className="space-y-3 text-xs font-light text-white/80 leading-tight">
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