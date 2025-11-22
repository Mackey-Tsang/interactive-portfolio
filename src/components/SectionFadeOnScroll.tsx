"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ---------------------------------------------
   Helper: Preload all images in a section
---------------------------------------------- */
function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.complete) return resolve();
          img.onload = img.onerror = () => resolve();
        })
    )
  ).then(() => undefined);
}

/* ---------------------------------------------
   Props
---------------------------------------------- */
export interface SectionFadeOnScrollProps {
  imageUrls?: string[];       // Images to preload before fade-in
  className?: string;         // Style wrapper
  children: React.ReactNode;  // Content
}

/* ---------------------------------------------
   Component
---------------------------------------------- */
export default function SectionFadeOnScroll({
  imageUrls = [],
  className = "",
  children,
}: SectionFadeOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);

  // Detect section entering viewport
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  const [loaded, setLoaded] = useState(imageUrls.length === 0);
  const [hasAppeared, setHasAppeared] = useState(false);

  /* ---------------------------------------------
     Start preloading when section enters view
  ---------------------------------------------- */
  useEffect(() => {
    if (!inView || loaded || imageUrls.length === 0) return;

    let cancelled = false;

    (async () => {
      await preloadImages(imageUrls);
      if (!cancelled) {
        setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, loaded, imageUrls]);

  /* ---------------------------------------------
     Mark as visible once both inView + loaded
  ---------------------------------------------- */
  useEffect(() => {
    if (inView && loaded) setHasAppeared(true);
  }, [inView, loaded]);

  const visible = hasAppeared;

  /* ---------------------------------------------
     Animation: fade up, smooth, one-time
  ---------------------------------------------- */
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
