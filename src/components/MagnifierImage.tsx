"use client";

import React, { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   MagnifierImage — hover anywhere on the image to see a zoomed
   rectangular lens following the cursor.

   Performance design:
   - The lens is a clipping window (overflow:hidden) containing a
     nested <img> rendered ONCE at natural × zoom dimensions.
   - Mouse movement only mutates transform:translate3d on the lens
     + nested img via refs. Both are GPU-composited — no layout,
     no paint of the source image, no background-image scaling.
   - No setState on mousemove → no React reconciliation.

   Zoom is relative to the image's NATURAL resolution:
     zoom=1   → 1:1 native res in the lens (sharp, no upscaling)
     zoom=1.5 → 1.5× native (deeper magnification; may pixelate
                past the source resolution)
     zoom=0.2 → 20% of native (wide preview / navigator window)
   ────────────────────────────────────────────────────────────── */

export type MagnifierImageProps = {
  src: string;
  alt: string;
  /** Magnification relative to NATURAL image size. Default 1.0 */
  zoom?: number;
  /** Lens width in px. Default 360 */
  lensWidth?: number;
  /** Lens height in px. Default 280 */
  lensHeight?: number;
  /** Extra classes applied to the outer container */
  className?: string;
};

export default function MagnifierImage({
  src,
  alt,
  zoom = 1.0,
  lensWidth = 360,
  lensHeight = 280,
  className = "",
}: MagnifierImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensImgRef = useRef<HTMLImageElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [natural, setNatural] = useState({ w: 0, h: 0 });

  // Capture natural dimensions once — handles both cached and fresh loads.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const capture = () => {
      if (img.naturalWidth) {
        setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      }
    };
    if (img.complete) {
      capture();
    } else {
      img.addEventListener("load", capture);
      return () => img.removeEventListener("load", capture);
    }
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const lens = lensRef.current;
    const lensImg = lensImgRef.current;
    if (!container || !lens || !lensImg || !natural.w) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const halfW = lensWidth / 2;
    const halfH = lensHeight / 2;

    // Cursor mapped into the magnified image's coordinate space
    const magX = (x / rect.width) * natural.w * zoom;
    const magY = (y / rect.height) * natural.h * zoom;

    // Two GPU-composited transforms. No layout, no paint of the source.
    lens.style.transform = `translate3d(${x - halfW}px, ${y - halfH}px, 0)`;
    lensImg.style.transform = `translate3d(${-magX + halfW}px, ${-magY + halfH}px, 0)`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative block select-none ${className}`}
      style={{ cursor: ready ? "none" : "crosshair" }}
      onMouseEnter={() => setReady(true)}
      onMouseLeave={() => setReady(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="block w-full h-auto object-cover pointer-events-none"
      />
      <div
        ref={lensRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] overflow-hidden bg-neutral-200"
        style={{
          width: lensWidth,
          height: lensHeight,
          opacity: ready ? 1 : 0,
          transition: "opacity 120ms ease",
          willChange: "transform",
        }}
      >
        {natural.w > 0 && (
          <img
            ref={lensImgRef}
            src={src}
            alt=""
            draggable={false}
            className="absolute top-0 left-0 max-w-none pointer-events-none"
            style={{
              width: natural.w * zoom,
              height: natural.h * zoom,
              willChange: "transform",
            }}
          />
        )}
      </div>
    </div>
  );
}
