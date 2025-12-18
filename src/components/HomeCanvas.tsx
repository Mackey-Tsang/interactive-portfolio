// HomeCanvas.tsx
"use client";

import React, { Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useCategory } from "@/store/useCategory";
import CategoryPillNav from "@/components/CategoryPillNav";
import ImageTrail from "@/components/ImageTrail";
import ColorBends from "@/components/ColorBends";

// scenes
const HomeIntroScene = dynamic(() => import("@/components/scenes/HomeIntroScene"), { ssr: false });
const PhotographyScene = dynamic(() => import("@/components/scenes/PhotographyScene"), { ssr: false });
const ArchitectureScene = dynamic(() => import("@/components/scenes/ArchitectureScene"), { ssr: false });
const CyberPhysicalScene = dynamic(() => import("@/components/scenes/CyberPhysicalScene"), { ssr: false });

export default function HomeCanvas() {
  const { category, showHome } = useCategory();
  const isPhoto = !showHome && category === "Photography";
  const isCyber = !showHome && category === "Cyber-Physical";

  const Scene = useMemo(() => {
    switch (category) {
      case "Architecture":
        return ArchitectureScene;
      case "Cyber-Physical":
        return CyberPhysicalScene; // still useful for dynamic import
      default:
        return PhotographyScene;
    }
  }, [category]);

  const cta = useMemo(() => {
    if (showHome) return null;
    if (category === "Photography") return { href: "/work/photography", label: "View all photos" };
    if (category === "Architecture") return { href: "/work/architecture", label: "View all projects" };
    return { href: "/work/cyber-physical", label: "View all projects" };
  }, [showHome, category]);

  return (
    <div className="relative h-dvh w-full overflow-hidden ">
      {/* --- SCENE LAYER --- */}
      {showHome ? (
        <HomeIntroScene />
      ) : isPhoto ? (
        // PHOTOGRAPHY: DOM layer
        <div className="absolute inset-0 bg-black cursor-none!">
          <ColorBends
            className="absolute inset-0 z-0 pointer-events-none"
            colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
            rotation={30}
            speed={0.28}
            scale={1.15}
            frequency={1.35}
            warpStrength={1.15}
            mouseInfluence={0.8}
            parallax={0.6}
            noise={0.06}
            transparent
            listenWindow
          />
          <div className="absolute inset-0 z-10 pointer-events-auto">
            <ImageTrail
              variant={2}
              items={[
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p1.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p2.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p3.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p4.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p5.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p6.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p7.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p8.jpg?raw=true",
              ]}
            />
          </div>
        </div>
      ) : isCyber ? (
        // CYBER-PHYSICAL: DOM layer (no R3F Canvas here)
        <CyberPhysicalScene />
      ) : (
        // OTHER CATEGORIES (e.g., Architecture): R3F Canvas
        <Canvas className="absolute inset-0 cursor-none!" camera={{ position: [0, 1.5, 4] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}

      {/* --- GLOBAL NAV (top) --- */}
      <CategoryPillNav />

      {/* --- CTA --- */}
      {cta && (
  <div className="pointer-events-auto absolute bottom-6 inset-x-0 flex items-center justify-center z-50 cursor-none!">
    <a
      href={cta.href}
      className={
        category === "Architecture"
          ? "rounded-full px-4 py-2 border bg-white border-black text-black hover:bg-black hover:text-white transition cursor-none!"
          : // Photography + Cyber-Physical → transparent bg, solid white border/text
            "rounded-full px-4 py-2 border border-white text-white bg-transparent hover:border-white/80 transition"
      }
    >
      {cta.label}
    </a>
  </div>
)}
    </div>
  );
}
