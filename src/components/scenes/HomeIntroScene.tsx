"use client";

import Prism from "@/components/Prism";
import FuzzyText from "@/components/FuzzyText";

export default function HomeIntroScene() {
  return (
    <div className="relative w-full h-full bg-black">
      {/* Prism background */}
      <Prism
        animationType="hover"
        timeScale={0.5}
        height={1.3}
        baseWidth={10}
        scale={1.7}
        hueShift={0}
        colorFrequency={2.6}
        noise={0.05}
        glow={2}
        className="absolute inset-0"
        suspendWhenOffscreen
      />
 {/* Centered intro text overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="px-6">
          {/* Fuzzy main title with soft shadow */}
          <div className="pointer-events-auto inline-block">
            <FuzzyText
              fontSize="clamp(2.25rem, 7.5vw, 4rem)"
              fontWeight={800}
              color="#ffffff"
              baseIntensity={0.03}
              hoverIntensity={0.5}
              enableHover
              style={{
                filter:
                  "drop-shadow(0 2px 6px rgba(0,0,0,0.8)) drop-shadow(0 6px 18px rgba(0,0,0,0.55))",
              }}
            >
              Mackey Tsang
            </FuzzyText>
          </div>

                   {/* Tagline */}
                   {/* Tagline */}
          <FuzzyText
            fontSize="clamp(1rem, 3vw, 1.25rem)"
            fontWeight={600}
            color="rgba(255,255,255,0.85)"
            baseIntensity={0.03}
            hoverIntensity={0.35}
            enableHover
            style={{
              filter:
                "drop-shadow(0 2px 5px rgba(0,0,0,0.7)) drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
            }}
          >
            Photography • Architecture • Cyber-Physical Design
          </FuzzyText>
      </div>
    </div>
  </div>
  );
}