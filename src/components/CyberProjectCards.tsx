"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PixelCard from "./PixelCard";
import CyberLoader from "./CyberLoader";

type CyberProject = {
  slug: string;
  title: string;
  year: string;
  cover: string;
  variant?: "default" | "blue" | "yellow" | "pink";
};

interface CyberProjectCardsProps {
  projects: CyberProject[];
}

export default function CyberProjectCards({ projects }: CyberProjectCardsProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-10 pb-16">
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: CyberProject }) {
  const [isReady, setIsReady] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Enforce minimum loader duration of 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Only show content when both image is loaded AND min time has passed
  useEffect(() => {
    if (imgLoaded && minTimePassed) {
      setIsReady(true);
    }
  }, [imgLoaded, minTimePassed]);

  return (
    <Link href={`/work/cyber-physical/${project.slug}`} className="block">
      <PixelCard
        variant={project.variant ?? "default"}
        className="group h-[260px] sm:h-80 md:h-[400px] lg:h-[600px] w-full"
      >
        <div className="relative w-full h-full flex flex-col justify-end">
          {/* Thumbnail + loader overlay */}
          <div className="absolute inset-0 bg-neutral-900">
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
                {/* Removed the scale transformation here. 
                   The new CSS bar loader is sized correctly by default.
                */}
                <div>
                  <CyberLoader />
                </div>
              </div>
            )}

            <img
              src={project.cover}
              alt={project.title}
              className={`h-full w-full object-cover transition duration-700 ${
                isReady ? "opacity-100 group-hover:opacity-70" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Text overlay */}
          <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-1 bg-linear-to-t from-black/90 via-black/50 to-transparent">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">
              Cyber-Physical
            </p>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300/80">
              {project.year}
            </p>
          </div>
        </div>
      </PixelCard>
    </Link>
  );
}