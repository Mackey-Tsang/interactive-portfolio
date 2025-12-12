// src/components/CategoryUI.tsx
"use client";

import { useEffect, useState } from "react";
import { useCategory, Category } from "@/store/useCategory";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const cats: Category[] = ["Photography", "Architecture", "Cyber-Physical"];

export default function CategoryUI() {
  const { category, setCategory, next, prev, showHome, setHome } = useCategory();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Keyboard shortcuts (unchanged)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d") next();
      if (e.key === "ArrowLeft"  || e.key === "a") prev();
      if (e.key === "1") setCategory("Photography");
      if (e.key === "2") setCategory("Architecture");
      if (e.key === "3") setCategory("Cyber-Physical");
      if (e.key.toLowerCase() === "h" || e.key === "0") setHome(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, setCategory, setHome]);

  return (
    <>
      {/* -------- DESKTOP/TABLET CATEGORY STRIP -------- */}
      <div className="pointer-events-auto fixed inset-x-0 top-4 hidden sm:flex items-center justify-center z-40">
        <div className="rounded-full border border-neutral-700/40 bg-black/30 backdrop-blur px-2 py-1 flex gap-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setHome(true)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              showHome ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Home
          </motion.button>

          {cats.map((c) => {
            const active = !showHome && c === category;
            return (
              <motion.button
                key={c}
                onClick={() => setCategory(c)}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  active ? "bg-white text-black" : "text-white/80 hover:text-white"
                }`}
              >
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* -------- MOBILE MENU BUTTON -------- */}
      <button
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-black/40 backdrop-blur border border-white/10"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <HiOutlineX className="w-6 h-6 text-white" />
        ) : (
          <HiOutlineMenu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* -------- MOBILE DROPDOWN MENU -------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden fixed top-16 inset-x-0 z-40 px-4"
          >
            <div className="rounded-xl bg-black/70 backdrop-blur-md border border-white/10 p-4 space-y-2">

              {/* HOME */}
              <button
                onClick={() => {
                  setHome(true);
                  setMobileOpen(false);
                }}
                className={`w-full py-2 rounded-lg text-base ${
                  showHome ? "bg-white text-black" : "text-white/80 hover:bg-white/10"
                }`}
              >
                Home
              </button>

              {/* CATEGORIES */}
              {cats.map((c) => {
                const active = !showHome && c === category;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setMobileOpen(false);
                    }}
                    className={`w-full py-2 rounded-lg text-base ${
                      active ? "bg-white text-black" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
