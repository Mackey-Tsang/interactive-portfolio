"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TiltedCard from "@/components/TiltedCard";

type Project = {
  title: string;
  slug: string;     // e.g. "/work/architecture/the-forge-hub"
  cover: string;    // image url
  caption?: string;
  year?: string;
};

interface ArchProjectCardsProps {
  projects: Project[];
  className?: string;
}

export default function ArchProjectCards({
  projects,
  className = "",
}: ArchProjectCardsProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-10">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);

    const start = performance.now();
    const img = new Image();
    img.src = project.cover;

    img.onload = img.onerror = () => {
      if (cancelled) return;

      // optional: enforce a minimum loader time (e.g. 500ms)
      const elapsed = performance.now() - start;
      const minDelay = 500;
      const remaining = Math.max(0, minDelay - elapsed);

      setTimeout(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      }, remaining);
    };

    return () => {
      cancelled = true;
    };
  }, [project.cover]);

  return (
    <Link href={project.slug} className="block group relative">
      <div className="relative">
        {/* LOADER OVERLAY */}
        {!loaded && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-[15px]">
            <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        )}

        {/* TILTED CARD */}
        <TiltedCard
          imageSrc={project.cover}
          altText={project.title}
          captionText={project.caption || project.title}
          containerWidth="100%"
          containerHeight="clamp(180px, 28vw, 420px)"
          imageWidth="100%"
          imageHeight="100%"
          rotateAmplitude={10}
          scaleOnHover={1.04}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="pointer-events-none flex items-end h-full w-full">
              <div className="w-full bg-neutral-200 backdrop-blur text-black px-5 py-3 rounded-b-[15px]">
                <div className="text-lg font-semibold leading-tight">
                  {project.title}
                </div>
                {project.year && (
                  <div className="text-sm tracking-wide opacity-70 mt-1">
                    {project.year}
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>
    </Link>
  );
}
