"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LightboxProps = {
  open: boolean;
  src?: string;
  alt?: string;
  onClose: () => void;
};

export default function Lightbox({ open, src, alt = "", onClose }: LightboxProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-10000 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with blur + dim, click to close */}
          <motion.button
            aria-label="Close"
            className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-md cursor-default"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Image card */}
          <motion.div
            className="relative max-w-[92vw] max-h-[86vh] rounded-lg overflow-hidden shadow-[0_25px_120px_-20px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {src && (
              <img
                src={src}
                alt={alt}
                className="block max-h-[86vh] max-w-[92vw] object-contain select-none"
                draggable={false}
              />
            )}
            {/* Close hint (optional) */}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
