"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxImageProps {
  src: string;
  alt: string;
  children: React.ReactNode; // Thumbnail element
}

export default function LightboxImage({ src, alt, children }: LightboxImageProps) {
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
      <div
        className="cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        {children}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full pb-[66%] sm:pb-[60%] md:pb-[56%] lg:pb-[50%] rounded-2xl overflow-hidden bg-neutral-900">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white p-1.5 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
