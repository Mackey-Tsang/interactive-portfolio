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
          // If already cached/complete, resolve immediately
          if (img.complete) return resolve();
          // Otherwise wait for load or error
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

  // 1. Detect when the section enters the viewport
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px", // Trigger slightly earlier (10% from bottom) so it's ready sooner
  });

  // If no images, we are 'loaded' instantly. Otherwise wait.
  const [loaded, setLoaded] = useState(imageUrls.length === 0);
  const [hasAppeared, setHasAppeared] = useState(false);

  /* ---------------------------------------------
     2. Start preloading when section enters view
  ---------------------------------------------- */
  useEffect(() => {
    // If not in view yet, or already loaded, or no images to load, skip.
    if (!inView || loaded || imageUrls.length === 0) return;

    let cancelled = false;

    (async () => {
      // Wait for network download
      await preloadImages(imageUrls);

      // 3. CRITICAL FIX: Add a small delay (buffer) to allow the browser 
      // to decode/paint the images before we fade in.
      if (!cancelled) {
        setTimeout(() => {
          if (!cancelled) setLoaded(true);
        }, 200); // 200ms buffer for image decoding
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, loaded, imageUrls]);

  /* ---------------------------------------------
     3. Mark as visible once both inView + loaded
  ---------------------------------------------- */
  useEffect(() => {
    if (inView && loaded) {
      setHasAppeared(true);
    }
  }, [inView, loaded]);

  const visible = hasAppeared;

  /* ---------------------------------------------
     Animation: fade up, smooth, one-time
  ---------------------------------------------- */
  return (
    <motion.section
      ref={ref}
      className={className}
      // Start slightly lower (y: 20) for a more deliberate rise
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      // Slower duration (0.7s) to mask any remaining loading jitters
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}