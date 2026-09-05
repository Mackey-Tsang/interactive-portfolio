// src/components/CategoryPillNav.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  stagger,
  useAnimate,
  type AnimationOptions,
} from "framer-motion";
import { useCategory, type Category } from "@/store/useCategory";

type PillNavItem = {
  label: string;
  ariaLabel?: string;
  category?: Category; // for scene switching
  isHome?: boolean; // special: home pill
};

type PillNavProps = {
  className?: string;
  textColor?: string; // resting text color
  activeColor?: string; // color for the active item
  fromWeight?: number; // resting font-weight (variable font "wght")
  toWeight?: number; // hovered / active font-weight
  staggerDuration?: number; // ms between each letter's animation start
  initialLoadAnimation?: boolean;
};

// Bundled variable font so the weight morph works without extra setup.
// Inter exposes `wght` 100–900. Unique family name avoids colliding with
// any other "Inter" already loaded on the page.
const INTER_VARIABLE_FONT_FACE = `
@font-face {
  font-family: "InterVariableNav";
  src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
`;
const VARIABLE_FONT_STACK =
  '"InterVariableNav", "Inter Variable", "Inter", system-ui, sans-serif';

const srOnlyStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

/**
 * Renders `label` as individual letters whose `wght` (font-variation-settings)
 * morphs on hover, staggered letter-by-letter — Weight Hover, adapted from
 * Originkit's VariableFontHoverByLetter. `isActive` keeps the label parked
 * at `toWeight` (bold) instead of resting at `fromWeight` (thin).
 */
function LetterWeightLabel({
  label,
  fromWeight,
  toWeight,
  isActive,
  staggerDuration = 30,
  staggerFrom = "random",
}: {
  label: string;
  fromWeight: number;
  toWeight: number;
  isActive?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random";
}) {
  const [scope, animate] = useAnimate();
  const fromSettings = `'wght' ${fromWeight}`;
  const toSettings = `'wght' ${toWeight}`;
  const staggerSec = Math.max(0, staggerDuration) / 1000;

  // Shuffled per-letter order for the "random" stagger variant — stable
  // per label, re-shuffled only if the label itself changes.
  const shuffledIndices = useMemo(() => {
    if (staggerFrom !== "random") return null;
    const indices = Array.from({ length: label.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [label, staggerFrom]);

  const transition: AnimationOptions = useMemo(
    () => ({ type: "spring", duration: 0.5, bounce: 0.2 }),
    []
  );

  const mergeStagger = (base: AnimationOptions): AnimationOptions => {
    if (staggerFrom === "random" && shuffledIndices) {
      const indices = shuffledIndices;
      return {
        ...base,
        delay: (i: number) => staggerSec * (indices[i] ?? 0),
      } as AnimationOptions;
    }
    return {
      ...base,
      delay: stagger(staggerSec, { from: staggerFrom as "first" | "last" | "center" }),
    } as AnimationOptions;
  };

  const runTo = (target: string) =>
    animate(".letter", { fontVariationSettings: target }, mergeStagger(transition));

  // The active page is indicated by the underline alone, so letters always
  // rest at fromWeight — no bold lock, no hover morph while active. This
  // re-runs on every isActive flip (not just mount) so a pill that was
  // mid-hover when clicked (mouse never actually left it) gets forced back
  // to resting weight instead of staying stuck bold once it's no longer
  // the current page.
  useEffect(() => {
    runTo(fromSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, fromSettings]);

  return (
    <span
      ref={scope}
      className="inline-flex"
      onMouseEnter={() => !isActive && runTo(toSettings)}
      onMouseLeave={() => !isActive && runTo(fromSettings)}
    >
      <span style={srOnlyStyle}>{label}</span>
      {label.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="letter"
          aria-hidden
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            fontVariationSettings: fromSettings,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const CategoryPillNav: React.FC<PillNavProps> = ({
  className = "",
  textColor = "#ffffff",
  activeColor = "#ffffff",
  fromWeight = 300,
  toWeight = 650,
  staggerDuration = 30,
  initialLoadAnimation = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { category, setCategory, setHome, showHome } = useCategory();

  const [mounted, setMounted] = useState(!initialLoadAnimation);
  useEffect(() => {
    if (!initialLoadAnimation) return;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [initialLoadAnimation]);

  // Our four items (Home + 3 categories)
  const items: PillNavItem[] = [
    { label: "About", isHome: true, ariaLabel: "About" },
    { label: "Cyber-Physical", category: "Cyber-Physical", ariaLabel: "Cyber-Physical" },
    { label: "Architecture", category: "Architecture", ariaLabel: "Architecture" },
    { label: "Photography", category: "Photography", ariaLabel: "Photography" },
  ];

  const activeIndex = showHome
    ? 0
    : 1 + ["Cyber-Physical", "Architecture", "Photography"].indexOf(category);

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

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-6 z-1000 flex items-center justify-center ${className}`}
    >
      <style>{INTER_VARIABLE_FONT_FACE}</style>
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center gap-8 transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <ul role="menubar" className="m-0 flex list-none items-center gap-8 p-0">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={`${item.label}-${i}`} role="none">
                <button
                  role="menuitem"
                  aria-label={item.ariaLabel || item.label}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onClickItem(item)}
                  className="relative cursor-pointer bg-transparent px-0.5 py-1 text-[13px] tracking-[0.3px] whitespace-nowrap outline-none"
                  style={{
                    color: isActive ? activeColor : textColor,
                    fontFamily: VARIABLE_FONT_STACK,
                  }}
                >
                  <LetterWeightLabel
                    label={item.label}
                    fromWeight={fromWeight}
                    toWeight={toWeight}
                    isActive={isActive}
                    staggerDuration={staggerDuration}
                  />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full bg-current"
                    />
                  )}
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
