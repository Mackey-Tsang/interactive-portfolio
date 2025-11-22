// src/components/CategoryUI.tsx
"use client";
import { useEffect } from "react";
import { useCategory, Category } from "@/store/useCategory";
import { motion } from "framer-motion";

const cats: Category[] = ["Photography", "Architecture", "Cyber-Physical"];

export default function CategoryUI() {
  const { category, setCategory, next, prev, showHome, setHome } = useCategory();

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
    <div className="pointer-events-auto fixed inset-x-0 top-4 flex items-center justify-center">
      <div className="rounded-full border border-neutral-700/40 bg-black/30 backdrop-blur px-2 py-1 flex gap-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setHome(true)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            showHome ? "bg-white text-black" : "text-white/80 hover:text-white"
          }`}
          aria-pressed={showHome}
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
              aria-pressed={active}
            >
              {c}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
