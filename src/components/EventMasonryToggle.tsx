"use client";

import Masonry from "@/components/Masonry";
import React from "react";

type Item = {
  id: string;
  img: string;
  url: string;
  height: number;
};

type MasonrySubsetProps = React.ComponentProps<typeof Masonry>;

export type EventMasonryToggleProps = {
  EVENT_A: Item[];
  EVENT_B: Item[];
  selectedIndex: 0 | 1;
  onSelectedIndexChange: (i: 0 | 1) => void;
  masonryProps?: Omit<MasonrySubsetProps, "items">;
  /** Change the display names */
  labels?: [string, string];
  /** Control alignment of the toggle row */
  align?: "left" | "center" | "right";
  /** Optional wrapper class */
  className?: string;
};

export default function EventMasonryToggle({
  EVENT_A,
  EVENT_B,
  selectedIndex,
  onSelectedIndexChange,
  masonryProps = {},
  labels = ["Event A", "Event B"],
  align = "left",
  className = "",
}: EventMasonryToggleProps) {
  const activeItems = selectedIndex === 0 ? EVENT_A : EVENT_B;

  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <div className={`w-full ${className}`}>
      {/* Toggle pills */}
      <div className={`mb-6 flex gap-2 ${justify}`}>
        {[labels[0], labels[1]].map((label, i) => {
          const idx = i as 0 | 1;
          const active = selectedIndex === idx;
          return (
            <button
              key={label}
              onClick={() => onSelectedIndexChange(idx)}
              className={`rounded-full border px-3 py-1 text-sm transition 
                ${active
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/40 hover:border-white"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active event grid */}
      <Masonry items={activeItems} {...masonryProps} />
    </div>
  );
}
