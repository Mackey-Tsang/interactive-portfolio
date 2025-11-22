// src/components/CategoryPillNav.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useCategory, type Category } from "@/store/useCategory";

type PillNavItem = {
  label: string;
  href?: string;        // optional (we use router programmatically)
  ariaLabel?: string;
  category?: Category;  // for scene switching
  isHome?: boolean;     // special: home pill
};

type PillNavProps = {
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
};

const CategoryPillNav: React.FC<PillNavProps> = ({
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  initialLoadAnimation = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { category, setCategory, setHome, showHome } = useCategory();

  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  // `navItemsRef` should reference the <ul> element, so use HTMLUListElement
  const navItemsRef = useRef<HTMLUListElement | null>(null);

  // Our four pills (Home + 3 categories)
  const items: PillNavItem[] = [
    { label: "Home", isHome: true, ariaLabel: "Home" },
    { label: "Photography", category: "Photography", ariaLabel: "Photography" },
    { label: "Architecture", category: "Architecture", ariaLabel: "Architecture" },
    { label: "Cyber-Physical", category: "Cyber-Physical", ariaLabel: "Cyber-Physical" },
  ];

  // GSAP layout + timelines
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 0.6, ease, overwrite: "auto" },
          0
        );
        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.6, ease, overwrite: "auto" }, 0);
        }
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.6, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(layout).catch(() => {});
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease }
      );
    }

    return () => window.removeEventListener("resize", onResize);
  }, [ease, initialLoadAnimation, items.length]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  // Clicking behavior:
  // - Home: setHome(true) and route to "/"
  // - Category: setCategory + setHome(false); if not at "/", push("/")
  const onClickItem = (item: PillNavItem) => {
    if (item.isHome) {
      setHome(true);
      if (pathname !== "/") router.push("/");
      return;
    }
    if (item.category) {
      setCategory(item.category);
      setHome(false);
      if (pathname !== "/") router.push("/");
    }
  };

  const cssVars = {
    ["--base" as any]: baseColor,
    ["--pill-bg" as any]: pillColor,
    ["--hover-text" as any]: hoveredPillTextColor,
    ["--pill-text" as any]: resolvedPillTextColor,
    ["--nav-h" as any]: "42px",
    ["--pill-pad-x" as any]: "18px",
    ["--pill-gap" as any]: "3px",
  } as React.CSSProperties;

  const activeIndex = showHome
    ? 0
    : 1 + ["Photography", "Architecture", "Cyber-Physical"].indexOf(category);

  return (
    <div className="pointer-events-auto fixed inset-x-0 top-4 z-1000 flex items-center justify-center">
      <nav
        aria-label="Primary"
        className={`rounded-full px-2 py-1`}
        style={{ ...cssVars, background: "var(--base, #000)" }}
      >
        <ul
          ref={navItemsRef}
          role="menubar"
          className="list-none flex items-stretch m-0 p-[3px] h-(--nav-h)"
          style={{ gap: "var(--pill-gap)" }}
        >
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            const pillStyle: React.CSSProperties = {
              background: "var(--pill-bg, #fff)",
              color: "var(--pill-text, var(--base, #000))",
              paddingLeft: "var(--pill-pad-x)",
              paddingRight: "var(--pill-pad-x)",
              height: "100%",
            };

            const PillContent = (
              <>
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-1 block pointer-events-none"
                  style={{ background: "var(--base, #000)", willChange: "transform" }}
                  aria-hidden="true"
                  ref={(el) => {
                    circleRefs.current[i] = el;
                  }}
                />
                <span className="label-stack relative inline-block leading-none z-2">
                  <span
                    className="pill-label relative z-2 inline-block leading-none"
                    style={{ willChange: "transform" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="pill-label-hover absolute left-0 top-0 z-3 inline-block"
                    style={{ color: "var(--hover-text, #fff)", willChange: "transform, opacity" }}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rounded-full z-4"
                    style={{ background: "var(--base, #000)" }}
                    aria-hidden="true"
                  />
                )}
              </>
            );

            const basePillClasses =
              "relative overflow-hidden inline-flex items-center justify-center no-underline rounded-full box-border font-semibold text-[14px] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

            return (
              <li key={`${item.label}-${i}`} role="none" className="flex h-full">
                {/* Button (no <Link>) so we control router + state together */}
                <button
                  role="menuitem"
                  aria-label={item.ariaLabel || item.label}
                  className={basePillClasses}
                  style={pillStyle}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={() => onClickItem(item)}
                >
                  {PillContent}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryPillNav;
