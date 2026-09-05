// HomeCanvas.tsx
"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useCategory } from "@/store/useCategory";
import CategoryPillNav from "@/components/CategoryPillNav";
import ImageTrail from "@/components/ImageTrail";
import ColorBends from "@/components/ColorBends";
import PixelTransitionOverlay from "@/components/PixelTransitionOverlay";
import StarfieldButton from "@/components/StarfieldButton";

// scenes
const HomeIntroScene = dynamic(() => import("@/components/scenes/HomeIntroScene"), { ssr: false });
const PhotographyScene = dynamic(() => import("@/components/scenes/PhotographyScene"), { ssr: false });
const ArchitectureScene = dynamic(() => import("@/components/scenes/ArchitectureScene"), { ssr: false });
const CyberPhysicalScene = dynamic(() => import("@/components/scenes/CyberPhysicalScene"), { ssr: false });

export default function HomeCanvas() {
  const { category, showHome } = useCategory();

  // What the store *wants* shown right now.
  const targetKey = showHome ? "home" : category;

  // What's actually rendered — only updates once the pixel overlay has
  // fully covered the screen, so the swap happens while hidden.
  const [displayedKey, setDisplayedKey] = useState(targetKey);

  const showHomeDisplayed = displayedKey === "home";
  const isPhoto = !showHomeDisplayed && displayedKey === "Photography";
  const isCyber = !showHomeDisplayed && displayedKey === "Cyber-Physical";

  const Scene = useMemo(() => {
    switch (displayedKey) {
      case "Architecture":
        return ArchitectureScene;
      case "Cyber-Physical":
        return CyberPhysicalScene; // still useful for dynamic import
      default:
        return PhotographyScene;
    }
  }, [displayedKey]);

  const cta = useMemo(() => {
    if (showHomeDisplayed) return null;
    if (displayedKey === "Photography") return { href: "/work/photography", label: "All Photos" };
    if (displayedKey === "Architecture") return { href: "/work/architecture", label: "All Projects" };
    return { href: "/work/cyber-physical", label: "All Projects" };
  }, [showHomeDisplayed, displayedKey]);

  return (
    <div className="relative h-dvh w-full overflow-hidden ">
      {/* --- PIXEL TRANSITION OVERLAY --- */}
      <PixelTransitionOverlay
        transitionKey={targetKey}
        onCovered={() => setDisplayedKey(targetKey)}
      />

      {/* --- SCENE LAYER (renders `displayedKey`, one step behind the store) --- */}
      {showHomeDisplayed ? (
        <HomeIntroScene />
      ) : isPhoto ? (
        // PHOTOGRAPHY: DOM layer
        <div className="absolute inset-0 bg-black">
          <ColorBends
            className="absolute inset-0 z-0 pointer-events-none"
            colors={["#1B262C", "#2C3E50", "#455D7A", "#748CA3"]}
            rotation={30}
            speed={0.28}
            scale={1}
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
              variant={3}
              items={[
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p1.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p2.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Portrait/p25.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p18.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p5.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p6.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Portrait/p20.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p8.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p15.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p23.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p20.jpg?raw=true",
                "https://github.com/Mackey-Tsang/photo-host/blob/main/Photography/Landscape/p19.jpg?raw=true",

              ]}
              imageSize={400}
              imageRatio={1.5}
            />
          </div>
        </div>
      ) : isCyber ? (
        // CYBER-PHYSICAL: DOM layer (no R3F Canvas here)
        <CyberPhysicalScene />
      ) : (
        // OTHER CATEGORIES (e.g., Architecture): R3F Canvas
        <Canvas className="absolute inset-0" camera={{ position: [0, 1.5, 4] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}

      {/* --- GLOBAL NAV (top) --- */}
      <CategoryPillNav />

      {/* --- CTA --- */}
      {/* Sized to ~1/4 of StarfieldButton's own defaults (which are hero-scale:
          40px font, 40/64px padding, ~128px tall) so it reads as a normal
          floating CTA pill instead of a giant hero button. */}
      {cta && (
        <div className="pointer-events-auto absolute bottom-6 inset-x-0 flex items-center justify-center z-50 ">
          <StarfieldButton
            label={cta.label}
            link={cta.href}
            style={{ minWidth: 20, minHeight: 10 }}
            padding="10px 16px 10px 16px"
            colors={{ fill: "#000000", textColor: "#FFFFFF", fillOpacity: 60 }}
            font={{
              fontSize: 15,
              fontFamily: "Inter",
              fontWeight: 200,
              lineHeight: "1.5em",
              letterSpacing: "0em",
              textAlign: "left",
            }}
            pixel={{ size: 0.1, color: "#FFFFFF", density: 10, brightness: 30 }}
            glow={{ size: 10, color: "#FFFFFF", opacity: 100 }}
            TRANSITION={{ ease: [0.44, 0, 0.56, 1], type: "tween", delay: 0, duration: 0.3 }}
            stroke={{
              size: 100,
              color: "#FFFFFF",
              count: 1,
              speed:100,
              movement: "step",
              direction: "ccw",
              thickness: 2,
            }}
          />
        </div>
      )}
    </div>
  );
}
