// src/components/ReturnButton.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useCategory } from "@/store/useCategory";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function ReturnButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { setCategory, setHome } = useCategory();
  const [visible, setVisible] = useState(false);

  // Show only on /work and below
  useEffect(() => {
    setVisible(pathname.startsWith("/work"));
  }, [pathname]);

  const { basePath, categoryName, isCategoryRoot, isProjectPage } = useMemo(() => {
    // Identify which category we’re in (if any)
    const isPhoto = pathname.startsWith("/work/photography");
    const isArch = pathname.startsWith("/work/architecture");
    const isCyber = pathname.startsWith("/work/cyber-physical");

    const categoryName = isPhoto
      ? "Photography"
      : isArch
      ? "Architecture"
      : isCyber
      ? "Cyber-Physical"
      : null;

    const basePath = isPhoto
      ? "/work/photography"
      : isArch
      ? "/work/architecture"
      : isCyber
      ? "/work/cyber-physical"
      : "/work";

    // Depth: /work/<category> = 3 segments
    const segments = pathname.split("/").filter(Boolean); // e.g. ["work","architecture","forge-hub"]
    const isCategoryRoot =
      segments.length === 2 && segments[0] === "work" && !!categoryName?.length
        ? false // (rare case) /work only
        : segments.length === 2 && segments[0] === "work" && !categoryName
        ? true
        : segments.length === 2; // keep generic
    // Better: explicit checks for our categories
    const isRoot =
      pathname === "/work/architecture" ||
      pathname === "/work/cyber-physical" ||
      pathname === "/work/photography";

    const isProjectPage =
      categoryName != null && pathname.startsWith(basePath + "/");

    return {
      basePath,
      categoryName,
      isCategoryRoot: isRoot,
      isProjectPage,
    };
  }, [pathname]);

  if (!visible) return null;

  const handleReturn = () => {
    // If we’re inside a project detail page, go back to the category listing
    if (isProjectPage) {
      router.push(basePath);
      return;
    }

    // If we’re at a category index, jump back to Home scene with that category selected
    if (isCategoryRoot && categoryName) {
      setCategory(categoryName as "Photography" | "Architecture" | "Cyber-Physical");
      setHome(false); // show scene, not HomeIntro
      router.push("/");
      return;
    }

    // Fallback: browser back if we’re somewhere else under /work
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/"); // safe fallback
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleReturn}
      aria-label="Return"
      className="fixed right-4 top-4 z-50 rounded-full border border-white/30 bg-black/40 
                 backdrop-blur p-2 text-white/90 hover:text-white transition "
    >
      <ArrowLeft size={18} strokeWidth={1.8} />
    </motion.button>
  );
}
