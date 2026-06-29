// src/components/ReturnButton.tsx
"use client";

import { useCategory } from "@/store/useCategory";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ReturnButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { setCategory, setHome } = useCategory();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(pathname.startsWith("/work"));
  }, [pathname]);

  const { basePath, categoryName, isCategoryRoot, isProjectPage, color } = useMemo(() => {
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

    const isRoot =
      pathname === "/work/architecture" ||
      pathname === "/work/cyber-physical" ||
      pathname === "/work/photography";

    const isProjectPage =
      categoryName != null && pathname.startsWith(basePath + "/");

    // Architecture = light theme → black button; everything else = dark theme → white
    const color = isArch ? "#000000" : "#ffffff";

    return {
      basePath,
      categoryName,
      isCategoryRoot: isRoot,
      isProjectPage,
      color,
    };
  }, [pathname]);

  if (!visible) return null;

  const handleReturn = () => {
    if (isProjectPage) {
      router.push(basePath);
      return;
    }

    if (isCategoryRoot && categoryName) {
      setCategory(categoryName as "Photography" | "Architecture" | "Cyber-Physical");
      setHome(false);
      router.push("/");
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <style>{`
        .return-cta {
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .return-cta svg {
          transform: translateX(6px);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .return-cta:hover svg {
          transform: translateX(0);
        }
        .return-cta:active svg {
          transform: scale(0.9);
        }
        .return-cta-label {
          letter-spacing: 4px;
          font-size: 14px;
          padding-left: 15px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 3px;
        }
        .return-cta-label:after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: var(--return-color);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        .return-cta:hover .return-cta-label:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      <button
        className="return-cta fixed right-4 top-4 z-50"
        style={{ "--return-color": color } as React.CSSProperties}
        onClick={handleReturn}
        aria-label="Return"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46 16"
          width="46"
          height="16"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="42" y1="8" x2="2" y2="8" />
          <polyline points="8 14 2 8 8 2" />
        </svg>

        <span className="return-cta-label" style={{ color }}>Return</span>
      </button>
    </>
  );
}
