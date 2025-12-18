"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ViewerImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type ImageViewerProps = {
  images: ViewerImage[];
  initialIndex?: number;
  className?: string;
  onOpenLightbox?: (src: string, alt?: string) => void;
  aspectClassName?: string; // e.g. "aspect-[16/9]"
};

export default function ImageViewer({
  images,
  initialIndex = 0,
  className = "",
  onOpenLightbox,
  aspectClassName = "aspect-[16/9]",
}: ImageViewerProps) {
  const [index, setIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0))
  );

  const canNavigate = images.length > 1;
  const current = images[index];

  const goPrev = () => {
    if (!canNavigate) return;
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goNext = () => {
    if (!canNavigate) return;
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className={`w-full ${className}`}>
      {/* ======= 3-column layout: arrow | frame (image+caption) | arrow ======= */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
        {/* LEFT ARROW (outside the frame column) */}
        {canNavigate ? (
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="
              hidden sm:grid
              h-10 w-10 place-items-center
              border border-neutral-400
              text-neutral-800
              hover:bg-neutral-200 transition
            "
          >
            ←
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* FRAME COLUMN: image + caption aligned together */}
        <div className="min-w-0">
          {/* IMAGE FRAME (transparent background) */}
          <div className={`relative w-full ${aspectClassName} overflow-hidden bg-transparent`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.src}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                drag={canNavigate ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 60) goPrev();
                  if (info.offset.x < -60) goNext();
                }}
              >
                <button
                  type="button"
                  className="block w-full h-full"
                  onClick={() => current && onOpenLightbox?.(current.src, current.alt)}
                >
                  <img
                    src={current?.src}
                    alt={current?.alt ?? ""}
                    className="block w-full h-full object-contain"
                    draggable={false}
                  />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CAPTION aligned to the frame (not arrows) */}
          {current?.caption && (
            <p className="mt-3 text-xs text-neutral-700 text-left">
              {current.caption}
            </p>
          )}
        </div>

        {/* RIGHT ARROW (outside the frame column) */}
        {canNavigate ? (
          <button
            onClick={goNext}
            aria-label="Next image"
            className="
              hidden sm:grid
              h-10 w-10 place-items-center
              border border-neutral-400
              text-neutral-800
              hover:bg-neutral-200 transition
            "
          >
            →
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="mt-5 w-full flex justify-center">
          <div className="flex gap-3 overflow-x-auto px-2">
            {images.map((img, i) => {
              const active = i === index;
              return (
                <button
                  key={img.src}
                  onClick={() => setIndex(i)}
                  className="block"
                  aria-label={`View image ${i + 1}`}
                >
                  <div className="w-28 h-20 overflow-hidden border border-neutral-300 bg-transparent">
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      className={`w-full h-full object-cover transition ${
                        active ? "opacity-100" : "opacity-35"
                      }`}
                      draggable={false}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
