"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  currentIndex?: number;
  onChange?: (index: number, word: string) => void;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "Portrait Landscape Event",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#18ffa8",
  glowColor = "rgba(24,255,168,0.6)",
  animationDuration = 0.4,
  pauseBetweenAnimations = 1,
  currentIndex,
  onChange,
}) => {
  const words = sentence.split(" ").filter(Boolean);
  const isControlled = typeof currentIndex === "number";
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = isControlled ? (currentIndex as number) : internalIndex;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // auto cycle (disabled if manual)
  useEffect(() => {
    if (manualMode || isControlled) return;
    const timer = setInterval(() => {
      const next = ((isControlled ? currentIndex! : internalIndex) + 1) % words.length;
      if (isControlled) onChange?.(next, words[next]);
      else setInternalIndex(next);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(timer);
  }, [manualMode, isControlled, animationDuration, pauseBetweenAnimations, words.length, currentIndex, internalIndex, onChange]);

  // update border rect
  useEffect(() => {
    const idx = activeIndex;
    if (idx == null || !wordRefs.current[idx] || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[idx]!.getBoundingClientRect();
    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [activeIndex, words.length]);

  const activate = (index: number) => {
    if (isControlled) onChange?.(index, words[index]);
    else {
      setInternalIndex(index);
      onChange?.(index, words[index]);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-nowrap gap-3 justify-center items-center select-none whitespace-nowrap"
    >
      {words.map((word, index) => {
        const isActive = index === activeIndex;
        return (
          <span
            key={index}
            ref={(el) => { wordRefs.current[index] = el; }}
            className="text-[1.1rem] md:text-[1.3rem] font-semibold uppercase tracking-wide cursor-pointer"
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
            }}
            onClick={() => activate(index)}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: activeIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{
          ["--border-color" as any]: borderColor,
          ["--glow-color" as any]: glowColor,
        }}
      >
        {["tl", "tr", "bl", "br"].map((pos) => (
          <span
            key={pos}
            className={`absolute w-2.5 h-2.5 border-[2px] rounded-[2px] ${
              pos === "tl"
                ? "top-[-6px] left-[-6px] border-r-0 border-b-0"
                : pos === "tr"
                ? "top-[-6px] right-[-6px] border-l-0 border-b-0"
                : pos === "bl"
                ? "bottom-[-6px] left-[-6px] border-r-0 border-t-0"
                : "bottom-[-6px] right-[-6px] border-l-0 border-t-0"
            }`}
            style={{
              borderColor: "var(--border-color)",
              filter: "drop-shadow(0 0 4px var(--border-color))",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TrueFocus;
