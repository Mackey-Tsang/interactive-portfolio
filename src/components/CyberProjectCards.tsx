"use client";

import React, { useState } from "react";
import Link from "next/link";
import PixelCard from "./PixelCard";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/work/cyber-physical/${project.slug}`} className="block">
      <PixelCard
        variant={project.variant ?? "default"}
        className="group h-[260px] sm:h-80 md:h-[400px] lg:h-[600px] w-full"
      >
        <div className="relative w-full h-full flex flex-col justify-end">
          {/* Thumbnail + loader overlay */}
          <div className="absolute inset-0">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                {/* Simple ring loader */}
                <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              </div>
            )}

            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:opacity-70"
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Text overlay */}
          <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-1 bg-linear-to-t from-black/70 via-black/40 to-transparent">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">
              Cyber-Physical
            </p>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide">
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
