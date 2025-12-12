"use client";

import React, { useState, useMemo, useEffect } from "react";
import Masonry from "@/components/Masonry";
import Lightbox from "@/components/Lightbox";
import TrueFocus from "@/components/TrueFocus";
import { AnimatePresence, motion } from "framer-motion";
import EventMasonryToggle from "@/components/EventMasonryToggle";
import dynamic from "next/dynamic";

// Dynamically import PhotoLoader with SSR disabled to avoid hydration mismatch
const PhotoLoader = dynamic(() => import("@/components/PhotoLoader"), {
  ssr: false,
});

// --- hook: preload URLs with a minimum delay ---
function usePreloadWithMinDelay(
  urls: string[],
  deps: any[],
  minMs = 500,        // shorter minimum delay
  preloadCount = 10,  // only preload the first N images
  maxWaitMs = 4000    // hard cap so loader never blocks too long
) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const start = performance.now();

    // Only preload the first N images – enough to fill the top of the masonry
    const toPreload = urls.slice(0, preloadCount);

    // If nothing to preload, just do a tiny delay and finish
    if (toPreload.length === 0) {
      const id = window.setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, minMs);
      return () => window.clearTimeout(id);
    }

    const preloadPromise = Promise.all(
      toPreload.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            if (img.complete) return resolve();
            img.onload = img.onerror = () => resolve();
          })
      )
    );

    // Hard timeout to avoid being stuck if network is slow
    const hardTimeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, maxWaitMs);

    preloadPromise.then(() => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minMs - elapsed);

      const softTimeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setLoading(false);
        }
      }, remaining);

      return () => {
        window.clearTimeout(softTimeoutId);
      };
    });

    return () => {
      cancelled = true;
      window.clearTimeout(hardTimeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return loading;
}

export default function PhotographyWorkPage() {
  const portrait = useMemo(
    () => [
      { id: "pp36", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p36.jpg?raw=true", url: "#", height: 750 },
      { id: "pp35", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p35.jpg?raw=true", url: "#", height: 680 },
      { id: "pp34", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p34.jpg?raw=true", url: "#", height: 700 },
      { id: "pp33", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p33.jpg?raw=true", url: "#", height: 800 },
      { id: "pp32", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p32.jpg?raw=true", url: "#", height: 680 },
      { id: "pp31", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p31.jpg?raw=true", url: "#", height: 500 },
      { id: "pp30", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p30.jpg?raw=true", url: "#", height: 800 },
      { id: "pp29", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p29.jpg?raw=true", url: "#", height: 680 },
      { id: "pp28", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p28.JPG?raw=true", url: "#", height: 680 },
      { id: "pp27", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p27.jpg?raw=true", url: "#", height: 680 },
      { id: "pp26", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p26.jpg?raw=true", url: "#", height: 680 },
      { id: "pp25", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p25.jpg?raw=true", url: "#", height: 680 },
      { id: "pp24", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p24.jpg?raw=true", url: "#", height: 680 },
      { id: "pp23", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p23.jpg?raw=true", url: "#", height: 680 },
      { id: "pp22", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p22.jpg?raw=true", url: "#", height: 680 },
      { id: "pp21", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p21.jpg?raw=true", url: "#", height: 680 },
      { id: "pp20", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p20.JPG?raw=true", url: "#", height: 680 },
      { id: "pp19", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p19.JPG?raw=true", url: "#", height: 680 },
      { id: "pp18", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p18.jpg?raw=true", url: "#", height: 680 },
      { id: "pp17", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p17.jpg?raw=true", url: "#", height: 680 },
      { id: "pp16", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p16.jpg?raw=true", url: "#", height: 700 },
      { id: "pp15", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p15.jpg?raw=true", url: "#", height: 680 },
      { id: "pp14", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p14.jpg?raw=true", url: "#", height: 680 },
      { id: "pp13", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p13.jpg?raw=true", url: "#", height: 700 },
      { id: "pp12", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p12.jpg?raw=true", url: "#", height: 700 },
      { id: "pp11", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p11.jpg?raw=true", url: "#", height: 680 },
      { id: "pp10", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p10.jpg?raw=true", url: "#", height: 700 },
      { id: "pp9", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p9.jpg?raw=true", url: "#", height: 700 },
      { id: "pp8", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p8.jpg?raw=true", url: "#", height: 680 },
      { id: "pp7", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p7.jpg?raw=true", url: "#", height: 680 },
      { id: "pp6", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p6.jpg?raw=true", url: "#", height: 560 },
      { id: "pp5", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p5.jpg?raw=true", url: "#", height: 680 },
      { id: "pp4", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p4.jpg?raw=true", url: "#", height: 780 },
      { id: "pp3", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p3.jpg?raw=true", url: "#", height: 680 },
      { id: "pp2", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p2.jpg?raw=true", url: "#", height: 600 },
      { id: "pp1", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Portrait/p1.jpg?raw=true", url: "#", height: 600 },
    ],
    []
  );

  const landscape = useMemo(
    () => [
      { id: "ls26", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p26.jpg?raw=true", url: "#", height: 460 },
      { id: "ls25", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p25.jpg?raw=true", url: "#", height: 600 },
      { id: "ls24", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p24.jpg?raw=true", url: "#", height: 460 },
      { id: "ls23", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p23.JPG?raw=true", url: "#", height: 600 },
      { id: "ls22", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p22.JPG?raw=true", url: "#", height: 460 },
      { id: "ls21", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p21.JPG?raw=true", url: "#", height: 600 },
      { id: "ls20", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p20.JPG?raw=true", url: "#", height: 460 },
      { id: "ls19", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p19.JPG?raw=true", url: "#", height: 600 },
      { id: "ls18", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p18.JPG?raw=true", url: "#", height: 460 },
      { id: "ls17", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p17.JPG?raw=true", url: "#", height: 600 },
      { id: "ls16", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p16.JPG?raw=true", url: "#", height: 460 },
      { id: "ls15", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p15.JPG?raw=true", url: "#", height: 600 },
      { id: "ls14", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p14.JPG?raw=true", url: "#", height: 460 },
      { id: "ls13", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p13.JPG?raw=true", url: "#", height: 600 },
      { id: "ls1", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p1.jpg?raw=true", url: "#", height: 600 },
      { id: "ls2", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p2.JPG?raw=true", url: "#", height: 460 },
      { id: "ls3", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p3.JPG?raw=true", url: "#", height: 600 },
      { id: "ls4", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p4.jpg?raw=true", url: "#", height: 460 },
      { id: "ls5", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p5.jpg?raw=true", url: "#", height: 600 },
      { id: "ls6", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p6.jpg?raw=true", url: "#", height: 460 },
      { id: "ls7", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p7.jpg?raw=true", url: "#", height: 600 },
      { id: "ls8", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p8.jpg?raw=true", url: "#", height: 460 },
      { id: "ls9", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p9.jpg?raw=true", url: "#", height: 600 },
      { id: "ls10", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p10.jpg?raw=true", url: "#", height: 460 },
      { id: "ls11", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p11.jpg?raw=true", url: "#", height: 600 },
      { id: "ls12", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Landscape/p12.jpg?raw=true", url: "#", height: 460 },
    ],
    []
  );

  const EVENT_A = useMemo(
    () => [
      { id: "ea33", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p33.jpg?raw=true", url: "#", height: 520 },
      { id: "ea32", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p32.jpg?raw=true", url: "#", height: 640 },
      { id: "ea31", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p31.jpg?raw=true", url: "#", height: 420 },
      { id: "ea30", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p30.jpg?raw=true", url: "#", height: 520 },
      { id: "ea29", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p29.jpg?raw=true", url: "#", height: 520 },
      { id: "ea28", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p28.jpg?raw=true", url: "#", height: 640 },
      { id: "ea27", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p27.jpg?raw=true", url: "#", height: 420 },
      { id: "ea26", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p26.jpg?raw=true", url: "#", height: 520 },
      { id: "ea25", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p25.jpg?raw=true", url: "#", height: 640 },
      { id: "ea24", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p24.jpg?raw=true", url: "#", height: 420 },
      { id: "ea23", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p23.jpg?raw=true", url: "#", height: 520 },
      { id: "ea22", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p22.jpg?raw=true", url: "#", height: 640 },
      { id: "ea21", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p21.jpg?raw=true", url: "#", height: 420 },
      { id: "ea20", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p20.jpg?raw=true", url: "#", height: 520 },
      { id: "ea19", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p19.jpg?raw=true", url: "#", height: 520 },
      { id: "ea18", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p18.jpg?raw=true", url: "#", height: 640 },
      { id: "ea17", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p17.jpg?raw=true", url: "#", height: 420 },
      { id: "ea16", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p16.jpg?raw=true", url: "#", height: 520 },
      { id: "ea15", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p15.jpg?raw=true", url: "#", height: 640 },
      { id: "ea14", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p14.jpg?raw=true", url: "#", height: 420 },
      { id: "ea13", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p13.jpg?raw=true", url: "#", height: 520 },
      { id: "ea12", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p12.jpg?raw=true", url: "#", height: 640 },
      { id: "ea11", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p11.jpg?raw=true", url: "#", height: 420 },
      { id: "ea10", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p10.jpg?raw=true", url: "#", height: 520 },
      { id: "ea1", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p1.jpg?raw=true", url: "#", height: 520 },
      { id: "ea2", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p2.jpg?raw=true", url: "#", height: 420 },
      { id: "ea3", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p3.jpg?raw=true", url: "#", height: 640 },
      { id: "ea4", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p4.jpg?raw=true", url: "#", height: 520 },
      { id: "ea5", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p5.jpg?raw=true", url: "#", height: 420 },
      { id: "ea6", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p6.jpg?raw=true", url: "#", height: 640 },
      { id: "ea7", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p7.jpg?raw=true", url: "#", height: 520 },
      { id: "ea8", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p8.jpg?raw=true", url: "#", height: 420 },
      { id: "ea9", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/HKNZBA/p9.jpg?raw=true", url: "#", height: 640 },
    ],
    []
  );

  const EVENT_B = useMemo(
    () => [
      { id: "eb21", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p21.jpg?raw=true", url: "#", height: 700 },
      { id: "eb19", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p19.jpg?raw=true", url: "#", height: 700 },
      { id: "eb18", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p18.jpg?raw=true", url: "#", height: 600 },
      { id: "eb17", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p17.jpg?raw=true", url: "#", height: 500 },
      { id: "eb14", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p14.jpg?raw=true", url: "#", height: 500 },
      { id: "eb13", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p13.jpg?raw=true", url: "#", height: 700 },
      { id: "eb12", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p12.jpg?raw=true", url: "#", height: 600 },
      { id: "eb11", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p11.jpg?raw=true", url: "#", height: 500 },
      { id: "eb10", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p10.jpg?raw=true", url: "#", height: 500 },
      { id: "eb9", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p9.jpg?raw=true", url: "#", height: 700 },
      { id: "eb8", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p8.jpg?raw=true", url: "#", height: 900 },
      { id: "eb7", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p7.jpg?raw=true", url: "#", height: 800 },
      { id: "eb6", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p6.jpg?raw=true", url: "#", height: 700 },
      { id: "eb4", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p4.jpg?raw=true", url: "#", height: 800 },
      { id: "eb2", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p2.jpg?raw=true", url: "#", height: 600 },
      { id: "eb1", img: "https://github.com/Mackey-Tsang/photo-host/blob/main/Hong%20Kong%20Ocean%20Park/p1.jpg?raw=true", url: "#", height: 500 },
    ],
    []
  );

  const [tabIndex, setTabIndex] = useState<0 | 1 | 2>(0); // 0=Portrait, 1=Landscape, 2=Event
  const [eventIndex, setEventIndex] = useState<0 | 1>(0); // 0=EVENT_A, 1=EVENT_B

  // pick current visible group
  const currentItems = useMemo(() => {
    if (tabIndex === 0) return portrait;
    if (tabIndex === 1) return landscape;
    return eventIndex === 0 ? EVENT_A : EVENT_B;
  }, [tabIndex, eventIndex, portrait, landscape, EVENT_A, EVENT_B]);

  // loader that retriggers whenever currentItems group changes
const loading = usePreloadWithMinDelay(
  currentItems.map((i) => i.img),
  [tabIndex, eventIndex],
  500,   // min delay in ms
  10,    // preload first 10 images only
  4000   // max wait in ms
);


  // lightbox state
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  const isEventTab = tabIndex === 2;

  return (
    <main className="min-h-dvh w-full bg-black text-white overflow-x-hidden relative">
      {/* ---- FULLSCREEN LOADER OVERLAY ---- */}
<AnimatePresence>
  {loading && (
    <motion.div
      key={`loader-overlay-${tabIndex}-${eventIndex}`}
      className="fixed inset-0 z-70 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <PhotoLoader />
    </motion.div>
  )}
</AnimatePresence>

      {/* ---- True Focus tabs at top ---- */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-80">
  <TrueFocus
    sentence="Portrait Landscape Event"
    manualMode
    blurAmount={2}
    borderColor="#d4faf4"
    glowColor="rgba(255,255,255,0.5)"
    animationDuration={0.35}
    pauseBetweenAnimations={1}
    currentIndex={tabIndex}
    onChange={(i: number) => setTabIndex(i as 0 | 1 | 2)}
  />
</div>

      {/* ---- Main content ---- */}
      <div className="mx-auto max-w-[1600px] px-4 md:px-6 pt-24 pb-24 relative z-10">
        {/* Event toggle only when Event tab is active */}
        {isEventTab && (
          <EventMasonryToggle
            EVENT_A={EVENT_A}
            EVENT_B={EVENT_B}
            labels={["HKNZBA", "Hong Kong Ocean Park"]}
            align="right"
            selectedIndex={eventIndex}
            onSelectedIndexChange={(i: number) => setEventIndex(i as 0 | 1)}
            masonryProps={{
              gap: 18,
              animated: false,
              onItemClick: (it: any) => {
                setActiveSrc(it.img);
                setOpen(true);
              },
            }}
            className="mb-6"
          />
        )}

        {/* Portrait / Landscape masonry (Event handled inside EventMasonryToggle) */}
        {!isEventTab && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${tabIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: loading ? 0 : 1, y: loading ? 8 : 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Masonry
                items={currentItems}
                gap={18}
                animated={false}
                onItemClick={(it) => {
                  setActiveSrc(it.img);
                  setOpen(true);
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ---- Lightbox ---- */}
      <Lightbox
        open={open}
        src={activeSrc}
        alt="Photo"
        onClose={() => setOpen(false)}
      />
    </main>
  );
}
