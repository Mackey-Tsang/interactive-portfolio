// src/components/SoftwareShowcase.tsx
"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import ProjectShowcaseGrid, { type ShowcaseProject } from "@/components/ProjectShowcaseGrid";

export interface SoftwareEntry {
  id: string;
  name: string;
  /** Path to a logo vector — e.g. "/logos/rhino.svg" under your Next.js
   *  "public" folder (public/logos/rhino.svg → logo="/logos/rhino.svg"). */
  logo: string;
  /** Set true if this logo's artwork is black (or dark) on a transparent
   *  background — it gets CSS-inverted to white so it's actually visible
   *  against the black loop/backdrop. Leave false/omit for a logo that's
   *  already white, light, or full-color (inverting those would wreck
   *  their colors). */
  invertLogo?: boolean;
  /** Projects built with this software — shown as an image grid (with a
   *  "+" to enlarge, caption below) when its logo is clicked. Can be
   *  empty, and the same project can appear under more than one software. */
  projects: ShowcaseProject[];
}

interface SoftwareShowcaseProps {
  software: SoftwareEntry[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  className?: string;
}

export default function SoftwareShowcase({
  software,
  speed = 40,
  logoHeight = 36,
  gap = 56,
  className = "",
}: SoftwareShowcaseProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = software.find((s) => s.id === selectedId) ?? null;

  // Each logo is a "node" item (a plain button, not a link) so clicking it
  // toggles the project grid below instead of navigating anywhere. LogoLoop
  // itself is untouched — this just uses the extension point it exposes.
  const logos: LogoItem[] = useMemo(
    () =>
      software.map((s) => ({
        title: s.name,
        ariaLabel: s.name,
        node: (
          <button
            type="button"
            onClick={() => setSelectedId((cur) => (cur === s.id ? null : s.id))}
            aria-pressed={selectedId === s.id}
            className={`flex items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 focus-visible:outline-none ${
              selectedId === s.id ? "opacity-100 grayscale-0" : ""
            }`}
          >
            <img
              src={s.logo}
              alt={s.name}
              draggable={false}
              className="h-[var(--logoloop-logoHeight)] w-auto object-contain pointer-events-none"
              style={s.invertLogo ? { filter: "invert(1)" } : undefined}
              onError={() =>
                // eslint-disable-next-line no-console
                console.error(
                  `[SoftwareShowcase] Failed to load logo "${s.name}" at "${s.logo}". ` +
                    `Check the file exists under your Next.js "public" folder at that exact path.`
                )
              }
            />
          </button>
        ),
      })),
    [software, selectedId]
  );

  return (
    <div className={className}>
      <LogoLoop
        logos={logos}
        speed={speed}
        logoHeight={logoHeight}
        gap={gap}
        pauseOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Software and tools"
      />

      {/* PROJECT GRID — swaps in below the loop for whichever software was
          clicked: the projects built with it, as an image grid (name
          bottom-left, "+" bottom-right to enlarge with a caption below),
          instead of a plain text description. */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="mt-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="h-6 w-auto object-contain"
                  style={selected.invertLogo ? { filter: "invert(1)" } : undefined}
                />
                <h3 className="text-base font-semibold text-white">{selected.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="text-white/50 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {selected.projects.length > 0 ? (
              <ProjectShowcaseGrid projects={selected.projects} />
            ) : (
              <p className="font-mono text-sm text-white/50">No projects tagged with this tool yet.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
