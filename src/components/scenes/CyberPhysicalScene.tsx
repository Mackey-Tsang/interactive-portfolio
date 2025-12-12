// src/components/scenes/CyberPhysicalScene.tsx
"use client";

import React, { useEffect, useState } from "react";
import Waves from "@/components/Waves";
import MathSwimmersPlus from "@/components/MathSwimmersPlus";
import MathSwimmers from "@/components/MathSwimmers";
import ScrambledText from "@/components/ScrambledText";
import SciFiGlitchBackground from "@/components/SciFiGlitchBackground";

const DESIGN_WIDTH = 1440;  // reference: your MacBook viewport width
const DESIGN_HEIGHT = 900;  // reference: your MacBook viewport height

export default function CyberPhysicalScene() {
  const [viewport, setViewport] = useState({
    vw: DESIGN_WIDTH,
    vh: DESIGN_HEIGHT,
  });

  // Measure viewport on client only
  useEffect(() => {
    const update = () => {
      setViewport({
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { vw, vh } = viewport;

  // Scale factors relative to your MacBook "design" size
  const scaleXFactor = vw / DESIGN_WIDTH;
  const scaleYFactor = vh / DESIGN_HEIGHT;
  const uniformScale = Math.min(scaleXFactor, scaleYFactor);

  // Helper to scale a design-space pixel value
  const sx = (value: number) => value * scaleXFactor;
  const sy = (value: number) => value * scaleYFactor;
  const su = (value: number) => value * uniformScale;

  // 🔧 Slight upward shift compared to original:
  // original main swimmer: offsetY = 100 → now 60 (a bit higher)
  const MAIN_OFFSET_X = -400;
  const MAIN_OFFSET_Y = 60; // slightly upwards from original 100

  // original secondary swimmer: offsetY = -450 → now -500 (a bit higher)
  const SECONDARY_OFFSET_X = -400;
  const SECONDARY_OFFSET_Y = -500; // slightly upwards from original -450

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* BACKGROUND WAVES */}
      <Waves
        lineColor="rgba(255,255,255,0.35)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={su(42)}
        waveAmpY={su(20)}
        friction={0.9}
        tension={0.01}
        maxCursorMove={su(120)}
        xGap={su(12)}
        yGap={su(36)}
        className="z-0"
      />

      {/* SCI-FI GLITCHING HUD OVERLAY (behind swimmers, above waves) */}
      <SciFiGlitchBackground
        intensity={0.7}
        className="z-5 mix-blend-screen opacity-80"
      />

      {/* MAIN DIGITAL CREATURE — MathSwimmersPlus */}
      <MathSwimmersPlus
        className="z-10"
        shapeVariant="vortex"
        shapeParams={{
          freqK: 0.1,
          wobbleK: 5,
          wobbleKSpeed: 1.5,
          scaleQ: 1,
          swirlQ: 1.1,
          noiseQ: 0.15,
          multX: 1.1,
          multY: 1.05,
          lissaAx: 1.2,
          lissaAy: 0.9,
          lissaFx: 1.1,
          lissaFy: 1.6,
        }}
        fit="contain"
        domainWidth={su(400)}
        domainHeight={su(400)}
        // original: 2 × 1.5 on MacBook; now scaled but identical at 1440×900
        scaleX={2 * uniformScale}
        scaleY={1.5 * uniformScale}
        // original: offsetX = -400, offsetY = 100 (now 60, slightly up)
        offsetX={sx(MAIN_OFFSET_X)}
        offsetY={sy(MAIN_OFFSET_Y)}
        color="rgba(100,255,255,0.1)"
        pointSize={1.4 * uniformScale}
        pointsPerFrame={9000}
        speed={1.1}
        composite="lighter"
        trailFade={0.04}
        jitter={0.25}
        halo={{
          enabled: true,
          color: "rgba(255,0,0,0.5)",
          alpha: 0.5,
          radius: su(200),
          thickness: su(50),
          feather: 0.9,
          composite: "lighter",
        }}
        sparks={{
          enabled: true,
          count: 200,
          size: 1.25 * uniformScale,
          color: "rgba(255,0,0,0.5)",
          composite: "lighter",
          wander: 0.9,
          follow: 0.38,
          speed: 1.25,
        }}
        swirls={{
          enabled: true,
          count: 70,
          size: 1.6 * uniformScale,
          color: "rgba(255,0,0,0.6)",
          composite: "lighter",
          orbitRadius: su(18),
          orbitSpeed: 1.7,
          drift: 7,
        }}
      />

      {/* SECONDARY SWIMMER — MathSwimmers */}
      <MathSwimmers
        className="z-10"
        color="rgba(190,255,255,0.5)"
        pointSize={1.5 * uniformScale}
        pointsPerFrame={7000}
        speed={1.5}
        opacity={0.5}
        composite="lighter"
        fit="contain"
        domainWidth={su(400)}
        domainHeight={su(400)}
        scaleX={2 * uniformScale}
        scaleY={2 * uniformScale}
        offsetX={sx(SECONDARY_OFFSET_X)}
        offsetY={sy(SECONDARY_OFFSET_Y)}
        trailFade={0}
        jitter={0.25}
      />

      {/* LEFT TEXT BLOCK 1 */}
      <div className="pointer-events-auto absolute left-6 md:left-12 top-64 md:top-72 z-20 opacity-90">
        <div className="max-w-md md:max-w-lg backdrop-blur-sm bg-cyan-500/5 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.25)] rounded-xl px-4 md:px-5 py-3 md:py-4">
          <div className="flex items-center justify-between mb-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300/70">
            <span>CHANNEL L-01</span>
            <span>ARCH / CY-PHY</span>
          </div>
          <ScrambledText
            duration={1.3}
            speed={0.5}
            scrambleChars="01<>[]#_%"
            className="font-mono text-xs md:text-sm leading-relaxed text-cyan-50"
          >
            Architecture doesn’t have to stay still. My cyber-physical
            explorations treat space as something that listens, responds,
            and behaves. Through sensors, motion, and digital systems,
            these projects reveal how structure can become an active
            participant—shifting with the user, shaping experience, and
            expressing a new kind of architectural intelligence.
          </ScrambledText>
        </div>
      </div>

      {/* LEFT TEXT BLOCK 2 */}
      <div className="pointer-events-auto absolute left-6 md:left-12 top-[72vh] md:top-[68vh] z-20 opacity-90">
        <div className="max-w-md md:max-w-lg backdrop-blur-sm bg-cyan-500/5 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.25)] rounded-xl px-4 md:px-5 py-3 md:py-4">
          <div className="flex items-center justify-between mb-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300/70">
            <span>CHANNEL L-02</span>
            <span>SYSTEM LOG</span>
          </div>
          <ScrambledText
            duration={1.3}
            speed={0.5}
            scrambleChars="01<>[]#_%"
            className="font-mono text-xs md:text-sm leading-relaxed text-cyan-50"
          >
            This body of work experiments with the tension between physical
            mechanisms and digital logic. Each project investigates how
            movement, data, and interaction can become spatial tools—
            transforming simple components into living systems. The aim
            is to push beyond static form, discovering how architecture
            can communicate through motion, behaviour, and real-time
            responsiveness.
          </ScrambledText>
        </div>
      </div>

      {/* RIGHT TEXT BLOCK 1 */}
      <div className="pointer-events-auto absolute right-6 md:right-12 top-1/4 z-20 opacity-90">
        <div className="max-w-md md:max-w-lg backdrop-blur-sm bg-cyan-500/5 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.25)] rounded-xl px-4 md:px-5 py-3 md:py-4">
          <div className="flex items-center justify-between mb-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300/70">
            <span>NODE R-01</span>
            <span>INTERFACE / REACTIVITY</span>
          </div>
          <ScrambledText
            duration={1.3}
            speed={0.5}
            scrambleChars="01<>[]#_%"
            className="font-mono text-xs md:text-sm leading-relaxed text-right text-cyan-50"
          >
            In these studies, I explore how technology can extend
            architecture&apos;s ability to speak and react. By merging
            code, fabrication, and mechanical design, I create prototypes
            that visualize invisible forces—rotation, pressure,
            proximity, and flow. These installations challenge how we
            think about structure, offering an experience where the
            digital and the material evolve together.
          </ScrambledText>
        </div>
      </div>

      {/* RIGHT TEXT BLOCK 2 */}
      <div className="pointer-events-auto absolute right-6 md:right-12 top-[68vh] md:top-[63vh] z-20 opacity-90">
        <div className="max-w-md md:max-w-lg backdrop-blur-sm bg-cyan-500/5 border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.25)] rounded-xl px-4 md:px-5 py-3 md:py-4">
          <div className="flex items-center justify-between mb-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300/70">
            <span>NODE R-02</span>
            <span>HUMAN / ENV</span>
          </div>
          <ScrambledText
            duration={1.3}
            speed={0.5}
            scrambleChars="01<>[]#_%"
            className="font-mono text-xs md:text-sm leading-relaxed text-right text-cyan-50"
          >
            Cyber-physical design offers a pathway to rethink the
            relationship between humans and environment. These works
            translate interaction into form, letting users influence
            motion, geometry, and spatial atmosphere. The goal is to
            build systems that feel alive—where architecture becomes
            collaborative, expressive, and continuously unfolding with
            every touch or movement.
          </ScrambledText>
        </div>
      </div>
    </div>
  );
}
