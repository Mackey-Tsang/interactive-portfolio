// src/components/scenes/CyberPhysicalScene.tsx
"use client";

import React from "react";
import Waves from "@/components/Waves";
import MathSwimmersPlus from "@/components/MathSwimmersPlus";
import MathSwimmers from "@/components/MathSwimmers";
import ScrambledText from "@/components/ScrambledText";

export default function CyberPhysicalScene() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* BACKGROUND WAVES */}
      <Waves
        lineColor="rgba(255,255,255,0.35)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={42}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        className="z-0"
      />

      {/* MAIN DIGITAL CREATURE */}
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
          lissaAx: 1.2, lissaAy: 0.9, lissaFx: 1.1, lissaFy: 1.6,
        }}
        fit="contain"
        domainWidth={400}
        domainHeight={400}
        scaleX={2}
        scaleY={1.5}
        offsetX={-400}
        offsetY={100}
        color="rgba(100,255,255,0.1)"
        pointSize={1.4}
        pointsPerFrame={9000}
        speed={1.1}
        composite="lighter"
        trailFade={0.04}
        jitter={0.25}
        halo={{
          enabled: true,
          color: "rgba(255,0,0,0.5)",
          alpha: 0.5,
          radius: 200,
          thickness: 50,
          feather: 0.9,
          composite: "lighter",
        }}
        sparks={{
          enabled: true,
          count: 200,
          size: 1.25,
          color: "rgba(255,0,0,0.5)",
          composite: "lighter",
          wander: 0.9,
          follow: 0.38,
          speed: 1.25,
        }}
        swirls={{
          enabled: true,
          count: 70,
          size: 1.6,
          color: "rgba(255,0,0,0.6)",
          composite: "lighter",
          orbitRadius: 18,
          orbitSpeed: 1.7,
          drift: 7,
        }}
      />

      {/* SECONDARY SWIMMER */}
      <MathSwimmers
        className="z-10"
        color="rgba(190,255,255,0.5)"
        pointSize={1.5}
        pointsPerFrame={7000}
        speed={1.5}
        opacity={0.5}
        composite="lighter"
        fit="contain"
        domainWidth={400}
        domainHeight={400}
        scaleX={2}
        scaleY={2}
        offsetX={-400}
        offsetY={-450}
        trailFade={0}
        jitter={0.25}
      />


      <div className="pointer-events-auto absolute left-8 md:left-12 top-80 flex flex-col gap-8 items-end z-20 opacity-80">
<ScrambledText
  duration={1.2}
  speed={0.5}
  scrambleChars="01<>[]"
  className="text-white"
>
  Architecture doesn’t have to stay still. My cyber-physical explorations treat
  space as something that listens, responds, and behaves. Through sensors,
  motion, and digital systems, these projects reveal how structure can become
  an active participant—shifting with the user, shaping experience, and
  expressing a new kind of architectural intelligence.
</ScrambledText>
      </div>

      <div className="pointer-events-auto absolute left-8 md:left-12 top-150 flex flex-col gap-8 items-end z-20 opacity-80">
        <ScrambledText
          duration={1.2}
          speed={0.5}
          scrambleChars="01<>[]"
          className="text-white"
        >
          This body of work experiments with the tension between physical mechanisms and digital logic. 
          Each project investigates how movement, data, and interaction can become spatial 
          tools—transforming simple components into living systems. The aim is to push beyond static form, 
          discovering how architecture can communicate through motion, behaviour, and real-time responsiveness.
        </ScrambledText>
      </div>

      {/* Right side */}
      <div className="pointer-events-auto absolute right-8 md:right-12 top-1/4 flex flex-col gap-8 items-end z-20 opacity-80">
        <ScrambledText
          duration={1.2}
          speed={0.5}
          scrambleChars="01<>[]"
          className="text-white text-right"
        >
          In these studies, I explore how technology can extend architecture's ability to speak and react. 
          By merging code, fabrication, and mechanical design, I create prototypes that visualize invisible 
          forces—rotation, pressure, proximity, and flow. These installations challenge how we think about structure, 
          offering an experience where the digital and the material evolve together.
        </ScrambledText>
      </div>

      <div className="pointer-events-auto absolute right-8 md:right-12 top-130 flex flex-col gap-8 items-end z-20 opacity-80">
        <ScrambledText
          duration={1.2}
          speed={0.5}
          scrambleChars="01<>[]"
          className="text-white text-right"
        >
          Cyber-physical design offers a pathway to rethink the relationship between humans and environment. 
          These works translate interaction into form, letting users influence motion, geometry, and spatial atmosphere. 
          The goal is to build systems that feel alive—where architecture becomes collaborative, expressive, 
          and continuously unfolding with every touch or movement.
        </ScrambledText>
      </div>

    </div>
  );
}
