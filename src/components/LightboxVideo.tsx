"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxVideoProps {
  src: string;
  label?: string;
  children: React.ReactNode; // Thumbnail element
}

export default function LightboxVideo({ src, label, children }: LightboxVideoProps) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Thumbnail Wrapper */}
      <div className="cursor-zoom-in" onClick={() => setOpen(true)}>
        {children}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* RESPONSIVE VIDEO WRAP — THIS FIXES OVERSIZE */}
              <div className="relative w-full max-h-[85vh] overflow-hidden flex items-center justify-center rounded-2xl">
                <video
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>

              {/* Optional Caption */}
              {label && (
                <p className="text-center text-neutral-300 text-xs mt-3">
                  {label}
                </p>
              )}

              {/* Close button */}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
