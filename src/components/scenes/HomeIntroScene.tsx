"use client";

import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";

import FuzzyText from "../FuzzyText";
import ThreeVortex from "../ThreeVortex";
import FloatingSticker from "../FloatingSticker"; 

interface HoverData {
  label: string;
  description: string;
  x: number;
  y: number;
}

export default function HomeIntroScene() {
  const [hoveredSticker, setHoveredSticker] = useState<HoverData | null>(null);
  const lastPosRef = useRef({ x: 50, y: 50 });

  const handleStickerHover = (isHovered: boolean, data?: HoverData) => {
    if (isHovered && data) {
      setHoveredSticker(data);
      lastPosRef.current = { x: data.x, y: data.y };
    } else {
      setHoveredSticker(null);
    }
  };

  const activePos = hoveredSticker ? { x: hoveredSticker.x, y: hoveredSticker.y } : lastPosRef.current;

  return (
    <div className="relative w-full h-full bg-black cursor-none overflow-y-auto scroll-smooth">
      <style jsx global>{`
        @keyframes float-wild {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          20% { transform: translate(30px, -20px) rotate(15deg); }
          40% { transform: translate(-15px, -40px) rotate(-10deg); }
          60% { transform: translate(-40px, 10px) rotate(5deg); }
          80% { transform: translate(20px, 30px) rotate(-15deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .animate-float-wild {
          animation: float-wild 12s ease-in-out infinite;
        }
      `}</style>

      {/* ===== SECTION 1 & 2 (Unchanged) ===== */}
      <div className="relative w-full h-screen border-b border-white/10 overflow-hidden">
        <ThreeVortex />
        <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-30">
          <div className="px-6 flex flex-col items-center">
            <div className="pointer-events-auto mb-1 transform scale-90 md:scale-100">
              <FuzzyText fontSize="clamp(2.5rem, 6vw, 3.5rem)" fontWeight={800} color="#ffffff" baseIntensity={0.1} hoverIntensity={0.6} enableHover style={{ filter: "drop-shadow(0 0 15px rgba(0,255,255,0.3))", letterSpacing: "-0.02em", }}>Mackey Tsang</FuzzyText>
            </div>
            <FuzzyText fontSize="clamp(0.8rem, 2vw, 1rem)" fontWeight={500} color="rgba(255,255,255,0.9)" baseIntensity={0.1} hoverIntensity={0.4} enableHover>Photography • Architecture • Cyber-Physical Design</FuzzyText>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cyan-50 animate-pulse">Double Click to Warp Reality</p>
          </div>
        </div>
      </div>

      <section className="relative w-full bg-neutral-900/30 px-6 md:px-10 lg:px-14 py-24 border-b border-white/10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl mb-2">The Archive</h2>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Digital Portfolio v2.0</p>
          </div>
          <div className="md:col-span-8 text-neutral-400 text-xs leading-relaxed max-w-2xl font-light">
            <p>This portfolio is designed as an interactive archive of my work across photography, architecture, and cyber-physical design. It brings projects together through a consistent visual language, with real-time and motion-driven scenes that reflect how I think and build—through systems, material logic, and experience.</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: ABOUT (Bottom) ===== */}
      <section className="relative w-full min-h-screen bg-black overflow-hidden relative">
        
        {/* --- 3D CANVAS LAYER --- */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Canvas className="pointer-events-none">
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
              
              <ambientLight intensity={0.4} color="#ffffff" />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
              <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
              
              <Environment preset="warehouse" />

              {/* 3D STICKERS - Scale set to 0.6 as requested */}
              <FloatingSticker 
                logo="arcsec.png"
                label="arc/sec Lab"
                description="Cyber-Physical Architecture"
                position={[-2.5, 1.5, -1]} 
                scale={0.6} 
                onHoverChange={handleStickerHover}
              />

              <FloatingSticker 
                logo="photosoc.png"
                label="Photo Soc"
                description="Visual Identity & Marketing"
                position={[1, 0.5, 0.5]} 
                scale={0.6}
                onHoverChange={handleStickerHover}
              />

              <FloatingSticker 
                logo="huacanjiang.png"
                label="Media Corp"
                description="UI/UX & Brand Development"
                position={[3, -1.5, -0.5]} 
                scale={0.6}
                onHoverChange={handleStickerHover}
              />

              <FloatingSticker 
                logo="uoa.png"
                label="NCEA Scholarship"
                description="National Design Award"
                position={[-1.5, -2, 0]} 
                scale={0.6}
                onHoverChange={handleStickerHover}
              />

            </Suspense>
          </Canvas>
        </div>

        {/* --- ENGINEERING ANNOTATION LAYER (Z-40) --- */}
        {/* Fixed position based on anchor, clean lines */}
        <div 
            className={`absolute z-40 pointer-events-none transition-all duration-300 ease-out origin-bottom ${
                hoveredSticker ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            }`}
            style={{
                left: `${activePos.x}%`,
                // Positioned so the bottom of the line touches the center of the sticker
                // Adjust '-120px' to control how high the text floats
                top: `${activePos.y}%`, 
                transform: 'translate(-50%, -100%)' // Move up so bottom touches x,y
            }}
        >
             <div className="flex flex-col items-center">
                {/* Text Block */}
                <div className="bg-black/90 border border-white/40 px-3 py-2 mb-0 backdrop-blur-sm">
                    <h4 className="font-mono text-[10px] text-white tracking-[0.2em] uppercase whitespace-nowrap border-b border-white/30 pb-1 mb-1">
                        {hoveredSticker?.label}
                    </h4>
                    <p className="font-mono text-[9px] text-white/70 tracking-wide whitespace-nowrap">
                        {hoveredSticker?.description}
                    </p>
                </div>
                
                {/* Vertical Leader Line */}
                {/* A thin white line connecting text to the plate */}
                <div className="w-[1px] h-16 bg-white/60"></div>
                
                {/* Optional: A small dot at the contact point */}
                <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
        </div>

        {/* CONTENT GRID - Unchanged */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-12 gap-12 pointer-events-none">
          <div className="md:col-span-2 flex flex-col items-start justify-start pointer-events-auto">
            <h2 className="text-white font-bold tracking-tighter text-5xl mb-6">About</h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 space-y-6 text-left pointer-events-auto pt-2">
             <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Experience</h3>
              <div className="space-y-3 text-xs font-light text-white/80 leading-tight">
                <div className="group"><p className="font-medium text-white mb-0.5">arc/sec Lab / DRH</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Teaching Assistant — 2025</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Photography Society</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Head of Marketing — 2024</p></div>
                <div className="group"><p className="font-medium text-white mb-0.5">Marketing Company</p><p className="text-white/50 text-[10px] uppercase tracking-wider">Design / Media — 2023</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Awards</h3>
              <div className="space-y-3 text-xs font-light text-white/80 leading-tight">
                <div><p className="font-medium text-white mb-0.5">NCEA Design Scholarship</p><p className="text-white/50 text-[10px] uppercase tracking-wider">2022</p></div>
                <div><p className="font-medium text-white mb-0.5">1st Place Design Comp</p><p className="text-white/50 text-[10px] uppercase tracking-wider">2022</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">Connect</h3>
              <div className="flex flex-col gap-1 text-xs text-white/60 leading-tight">
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-current rounded-full"></span>mackeytsang04@email.com</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-current rounded-full"></span>@mac_ms62 (Instagram)</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-current rounded-full"></span>LinkedIn /mackey-tsang</a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 w-full text-center z-20 pointer-events-none">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-light">© 2025 Mackey Tsang. All Rights Reserved.</p>
        </div>

      </section>
    </div>
  );
}