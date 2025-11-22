"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCategory } from "@/store/useCategory";
import CircularText from "@/components/CircularText";

export default function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { setHome } = useCategory();

  const goHome = () => {
    setHome(true);
    router.push("/");
  };

  // Detect if we’re on a /work page
  const isWorkPage = pathname.startsWith("/work");

  // Scale factor: normal (1) in scenes, smaller (0.55) in pages
  const scaleClass = isWorkPage ? "scale-40 origin-top-left" : "scale-75 origin-top-left";

  return (
    <button
      onClick={goHome}
      aria-label="Go to Home"
      className="fixed left-4 top-4 z-50"
    >
      <div className={scaleClass}>
        <CircularText
          text="MACKEY*TSANG*PORTFOLIO*"
          onHover="goBonkers"
          spinDuration={20}
          className="select-none"
        />
      </div>
    </button>
  );
}
