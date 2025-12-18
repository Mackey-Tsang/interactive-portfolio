"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCategory } from "@/store/useCategory";
import CircularText from "@/components/CircularText";
import { useEffect, useState } from "react";

export default function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { setHome } = useCategory();

  const [isClient, setIsClient] = useState(false);
  const [isWorkPage, setIsWorkPage] = useState(false);

  // Decide page type only after hydration
  useEffect(() => {
    setIsClient(true);
    setIsWorkPage(pathname.startsWith("/work"));
  }, [pathname]);

  const goHome = () => {
    setHome(true);
    router.push("/");
  };

  // Default scale (SSR-safe)
  let scaleClass =
    "scale-[0.8] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.8] xl:scale-[0.8]";

  // After hydration, adjust for /work pages
  if (isClient && isWorkPage) {
    scaleClass =
      "scale-[0.45] sm:scale-[0.6] md:scale-[0.65] lg:scale-[0.6] xl:scale-[0.6]";
  }

  return (
    <button
      onClick={goHome}
      aria-label="Go to Home"
      className="fixed left-1 top-1 z-50 touch-manipulation active:opacity-70 "
      style={{ transformOrigin: "top left" }}
    >
      <div className={`${scaleClass} transition-transform duration-300 `}>
        <CircularText
          text="MACKEY*TSANG*PORTFOLIO*"
          onHover="goBonkers"
          spinDuration={20}
          className="select-none "
        />
      </div>
    </button>
  );
}
