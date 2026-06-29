"use client";

import React, { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

/* ──────────────────────────────────────────────────────────────
   IMAGE LINKS — one per line, edit .jpg ↔ .png as needed
   ────────────────────────────────────────────────────────────── */
const SITUATIONIST_MAP =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/1.jpg?raw=true";
const SITE_MAP =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/2.jpg?raw=true";
const OVERVIEW_RENDER =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/3.jpg?raw=true";
const FACADE_RENDER =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/4.jpg?raw=true";
const LONG_SECTION =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/5.jpg?raw=true";
const ISOMETRIC_DIAGRAM =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/6.jpg?raw=true";
const SECTION_DETAIL =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/7.png?raw=true";
const FLOOR_PLAN =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/8.jpg?raw=true";

// Interior perspective renders
const PERSPECTIVE_OPEN_SPACE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/9.jpg?raw=true";
const PERSPECTIVE_DIVIDED_SPACE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/10.jpg?raw=true";
const PERSPECTIVE_WATER_FEATURE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/11.jpg?raw=true";
const PERSPECTIVE_ATRIUM =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/12.jpg?raw=true";

// Physical models — 13 is the group shot showing all four side by side
const MODELS_GROUP =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/13.jpg?raw=true";

// Program Model 1:200 — two photos
const PROGRAM_MODEL_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/14.jpg?raw=true";
const PROGRAM_MODEL_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/15.jpg?raw=true";

// Structural Model 1:200 — two photos
const STRUCTURAL_MODEL_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/16.jpg?raw=true";
const STRUCTURAL_MODEL_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/17.jpg?raw=true";

// Circulation Model 1:200 — two photos
const CIRCULATION_MODEL_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/18.jpg?raw=true";
const CIRCULATION_MODEL_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/19.jpg?raw=true";

// Physical Model 1:100 — four photos
const FINAL_MODEL_1 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/20.jpg?raw=true";
const FINAL_MODEL_2 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/21.jpg?raw=true";
const FINAL_MODEL_3 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/22.jpg?raw=true";
const FINAL_MODEL_4 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/23.jpg?raw=true";

/* ──────────────────────────────────────────────────────────────
   LEGENDS
   ────────────────────────────────────────────────────────────── */
const EMOTION_LEGEND = [
  { color: "#F4E27A", label: "Positive / Joyful" },
  { color: "#A9D5A0", label: "Relaxing / Peaceful" },
  { color: "#E8A26A", label: "Enthusiasm" },
  { color: "#A8C5DC", label: "Fear / Loneliness" },
  { color: "#D89BB6", label: "Disgust" },
];

const PROGRAM_MODEL_LEGEND = [
  { color: "#D6B98C", label: "Light Wood (Middle) — Circulation" },
  { color: "#FFFFFF", label: "White — Outdoor Space", border: true },
  { color: "#A8C5DC", label: "Transparent Blue (Bottom) — Water Feature" },
  { color: "#B5B5B5", label: "Grey — Service / Bathroom" },
  { color: "#9BC49B", label: "Green (East) — Flexible Zone with movable furniture" },
  { color: "#4A6E9E", label: "Blue (West) — Fixed Zone with permanent space layout" },
];

/* ──────────────────────────────────────────────────────────────
   MAGNIFIER IMAGE — hover anywhere on the image to see a zoomed
   rectangular lens following the cursor.

   Performance design:
   - The lens is a clipping window (overflow:hidden) containing a
     nested <img> rendered ONCE at natural × zoom dimensions.
   - Mouse movement only mutates transform:translate3d on the lens
     + nested img via refs. Both are GPU-composited — no layout,
     no paint of the source image, no background-image scaling.
   - No setState on mousemove → no React reconciliation.

   Zoom is relative to the image's NATURAL resolution:
     zoom=1   → 1:1 native res in the lens
     zoom=1.5 → 1.5× native (deep magnification)
     zoom=0.2 → 20% of native (wide preview window)
   ────────────────────────────────────────────────────────────── */
type MagnifierImageProps = {
  src: string;
  alt: string;
  zoom?: number;
  lensWidth?: number;
  lensHeight?: number;
  className?: string;
};

function MagnifierImage({
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

export default function ThirdGroundPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | undefined>();
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(undefined);
    setLightboxAlt("");
  };

  return (
    <>
      <main className="min-h-dvh w-full bg-neutral-100 text-neutral-900">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-6">
          {/* 01 — Title + Intro */}
          <SectionFadeOnScroll>
            <div className="space-y-4 w-full">
              <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-600">
                Architecture / Vertical Play Laboratory
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                The Third Ground — 33 High Street
              </h1>
              <p className="text-sm sm:text-base leading-relaxed">
                The Third Ground is a seven-storey Vertical Play Laboratory
                located at 33 High Street, Tāmaki Makaurau Auckland, occupying
                a 388sqm site between High Street and Queen Street, adjacent to
                Freyberg Square and Vulcan Lane. The project proposes a
                1,500sqm non-commercial youth hub for rangatahi aged 13 to 24,
                addressing the absence of dedicated, flexible indoor space for
                young people within Auckland&apos;s central city.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Originating from Italo Calvino&apos;s invisible city of Andria
                — a city whose plan mirrors the fixed orbits of the stars — the
                building is structured around a Timber-Steel Composite diagrid
                frame as the &ldquo;fixed orbit,&rdquo; within which programme,
                furniture, and spatial configuration remain perpetually open to
                change.
              </p>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full border-t border-neutral-500 my-6" />
          </SectionFadeOnScroll>

          {/* 02 — Situationist Mapping + Emotion Legend */}
          <SectionFadeOnScroll imageUrls={[SITUATIONIST_MAP]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Situationist Mapping — A Psychogeographic Drift
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  A psychogeographic exploration of the Auckland CBD that
                  rejects the rigid, &ldquo;God-like&rdquo; perspective of
                  traditional 2D cartography in favour of a multi-dimensional
                  recording of moments and places. Documenting the transition
                  from the architectural studio to the site, this map functions
                  as a <em>dérive</em> — capturing the city as a labyrinth of
                  experiences filled with hidden meanings rather than just
                  utilitarian transit paths. It weaves together a 4D narrative
                  of time and movement, layering spontaneous observations of a
                  photowalk with personal life memories to subvert conventional
                  urban planning.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    SITUATIONIST_MAP,
                    "Situationist psychogeographic map of the Auckland CBD."
                  )
                }
                className="block w-full"
              >
                <img
                  src={SITUATIONIST_MAP}
                  alt="Situationist psychogeographic map of the Auckland CBD."
                  className="block w-full h-auto object-cover"
                />
              </button>

              {/* Emotion legend */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-600 mb-3">
                  Emotion Legend
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {EMOTION_LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 border border-neutral-400"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs sm:text-sm text-neutral-700 italic">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 03 — Site Map */}
          <SectionFadeOnScroll imageUrls={[SITE_MAP]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Site — 33 High Street, Auckland CBD
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The 388sqm site sits within Auckland&apos;s Business City
                  Centre Zone, framed by tall buildings to the west and south
                  and a three-storey solid wall to the north. These constraints
                  directly shaped the building form: a U-shaped atrium opens
                  north to admit daylight, while perimeter setbacks preserve
                  sunlight access to neighbours. A ground-level water feature
                  acknowledges the buried Waihorotiu stream, recognising the
                  cultural significance of the site to Mana Whenua.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(SITE_MAP, "1:500 site map of 33 High Street.")
                }
                className="block w-full"
              >
                <img
                  src={SITE_MAP}
                  alt="1:500 site map of 33 High Street."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 04 — Two Renders: Overview + Main Facade */}
          <SectionFadeOnScroll imageUrls={[OVERVIEW_RENDER, FACADE_RENDER]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Building Renders
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The exposed Timber-Steel Composite diagrid frame unifies the
                  transition from the public ground-level arcade to the upper
                  programme floors, with a rooftop garden and screened terrace
                  capping the seven-storey volume.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(OVERVIEW_RENDER, "Aerial overview render.")
                }
                className="block w-full"
              >
                <img
                  src={OVERVIEW_RENDER}
                  alt="Aerial overview render of The Third Ground."
                  className="block w-full h-auto object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  openLightbox(FACADE_RENDER, "Main facade render.")
                }
                className="block w-full"
              >
                <img
                  src={FACADE_RENDER}
                  alt="Main facade render of The Third Ground."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 05 — Long Section */}
          <SectionFadeOnScroll imageUrls={[LONG_SECTION]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Long Section
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  A full-width ramp resolves the three-metre topographic drop
                  between High Street and the arcade. From Level 1 upward, the
                  central circulation core consolidates the main internal
                  staircase and lift, while a dedicated outdoor fire stair on
                  the south elevation provides a separated egress route
                  penetrating the full building height.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(LONG_SECTION, "1:100 long section.")
                }
                className="block w-full"
              >
                <img
                  src={LONG_SECTION}
                  alt="1:100 long section through The Third Ground."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 06 — Isometric Exploded Diagram */}
          <SectionFadeOnScroll imageUrls={[ISOMETRIC_DIAGRAM]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Isometric Exploded Diagram &amp; Structure Detail
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The primary structure is a Timber-Steel Composite (TSC)
                  diagrid frame: 310UC118 steel columns and 460UB67 steel beams
                  with timber boards nailed to the steel flanges at 150mm
                  centres. The diagrid transfers vertical loads diagonally to
                  foundation piles, eliminating internal columns and producing
                  column-free flexible floor plates across both the East and
                  West zones.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    ISOMETRIC_DIAGRAM,
                    "Isometric exploded diagram with structure detail."
                  )
                }
                className="block w-full"
              >
                <img
                  src={ISOMETRIC_DIAGRAM}
                  alt="Isometric exploded diagram with structure detail."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 07 — Section Detail 01 */}
          <SectionFadeOnScroll imageUrls={[SECTION_DETAIL]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  1:10 Section Detail 01
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  A typical floor-edge condition showing the TSC diagrid
                  junction with 175mm five-ply CLT panels, GL17 glulam
                  secondary beams, and the double-skin curtain wall facade with
                  modified timber spandrel panel in Accoya or Kebony at each
                  floor gap zone.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openLightbox(SECTION_DETAIL, "1:10 section detail 01.")
                }
                className="block w-full"
              >
                <img
                  src={SECTION_DETAIL}
                  alt="1:10 section detail 01."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 08 — Floor Plans (narrow, centred, no legend) */}
          <SectionFadeOnScroll imageUrls={[FLOOR_PLAN]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Floor Plans — Ground Level to Level 7
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The plan is organised across a fixed West zone, a flexible
                  East zone, and a central circulation core. The ground floor
                  operates as a permeable public arcade, while upper floors
                  house digital fabrication, music, visual arts, enterprise,
                  and community gathering spaces.
                </p>
              </div>

              <div className="flex justify-center">
                <MagnifierImage
                  src={FLOOR_PLAN}
                  alt="Floor plans Ground Level to Level 7."
                  zoom={0.2}
                  lensWidth={650}
                  lensHeight={550}
                  className="w-full max-w-sm"
                />
              </div>
              <p className="text-xs text-neutral-500 italic text-center">
                Hover over the plan to magnify.
              </p>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 09 — Interior Perspective Renders */}
          <SectionFadeOnScroll
            imageUrls={[
              PERSPECTIVE_OPEN_SPACE,
              PERSPECTIVE_DIVIDED_SPACE,
              PERSPECTIVE_WATER_FEATURE,
              PERSPECTIVE_ATRIUM,
            ]}
          >
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Interior Perspectives
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The fixed diagrid framework hosts a programme that
                  reconfigures over time — from open studio modes to divided
                  workshop spaces — anchored by the ground-level water feature
                  and the daylit U-shaped atrium.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { src: PERSPECTIVE_OPEN_SPACE, label: "Open Space Mode" },
                  { src: PERSPECTIVE_DIVIDED_SPACE, label: "Divided Space Mode" },
                  { src: PERSPECTIVE_WATER_FEATURE, label: "Water Feature" },
                  { src: PERSPECTIVE_ATRIUM, label: "Atrium" },
                ].map(({ src, label }) => (
                  <div key={src} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => openLightbox(src, label)}
                      className="block w-full"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={src}
                          alt={label}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                    <p className="text-xs text-neutral-700 text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-[60%] mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 10 — Physical Models Section */}
          <SectionFadeOnScroll
            imageUrls={[
              MODELS_GROUP,
              PROGRAM_MODEL_1,
              PROGRAM_MODEL_2,
              STRUCTURAL_MODEL_1,
              STRUCTURAL_MODEL_2,
              CIRCULATION_MODEL_1,
              CIRCULATION_MODEL_2,
              FINAL_MODEL_1,
              FINAL_MODEL_2,
              FINAL_MODEL_3,
              FINAL_MODEL_4,
            ]}
          >
            <div className="space-y-10">
              {/* Section heading */}
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Physical Models
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Four physical models test the project across its primary
                  systems: programme distribution, diagrid structure,
                  circulation logic, and the resolved building at a finer
                  scale.
                </p>
              </div>

              {/* Group shot — all four models together */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      MODELS_GROUP,
                      "Group shot of all four physical models."
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={MODELS_GROUP}
                    alt="Group shot of all four physical models, left to right: Program 1:200, Structural 1:200, Circulation 1:200, Final 1:100."
                    className="block w-full h-auto object-cover"
                  />
                </button>
                <p className="text-xs text-neutral-700 text-center italic">
                  Left to right: Program Model 1:200, Structural Model 1:200,
                  Circulation Model 1:200, Physical Model 1:100
                </p>
              </div>

              {/* Program Model 1:200 — 2 photos + legend */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Program Model — 1:200
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Block massing model expressing the zoning logic: a fixed West
                  zone, a flexible East zone, the central circulation core,
                  and the public ground-floor water feature.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[PROGRAM_MODEL_1, PROGRAM_MODEL_2].map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        openLightbox(src, "Program Model 1:200.")
                      }
                      className="block w-full"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={src}
                          alt="Program Model 1:200."
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Program model colour legend */}
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600 mb-3">
                    Program Model Legend
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {PROGRAM_MODEL_LEGEND.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`inline-block w-4 h-4 ${item.border ? "border border-neutral-400" : ""}`}
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs sm:text-sm text-neutral-700">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Structural Model 1:200 — 2 photos */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Structural Model — 1:200
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Studying the Timber-Steel Composite diagrid frame at full
                  building scale, with the triangulated geometry resolving
                  lateral loads alongside the central core.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[STRUCTURAL_MODEL_1, STRUCTURAL_MODEL_2].map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        openLightbox(src, "Structural Model 1:200.")
                      }
                      className="block w-full"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={src}
                          alt="Structural Model 1:200."
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Circulation Model 1:200 — 2 photos */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Circulation Model — 1:200
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Tracing vertical and horizontal movement through the
                  building: the ground-level ramp, the main curved stair, the
                  central lift core, and the separated outdoor fire stair on
                  the south elevation.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[CIRCULATION_MODEL_1, CIRCULATION_MODEL_2].map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        openLightbox(src, "Circulation Model 1:200.")
                      }
                      className="block w-full"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={src}
                          alt="Circulation Model 1:200."
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Model 1:100 — 4 photos */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Physical Model — 1:100
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  The resolved building at a finer scale, used to test the
                  diagrid geometry, facade rhythm, and the way daylight enters
                  the U-shaped atrium across summer and winter sun angles.
                </p>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {[
                    FINAL_MODEL_1,
                    FINAL_MODEL_2,
                    FINAL_MODEL_3,
                    FINAL_MODEL_4,
                  ].map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        openLightbox(src, "Physical Model 1:100.")
                      }
                      className="block w-full"
                    >
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={src}
                          alt="Physical Model 1:100."
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* 11 — Back to top */}
          <SectionFadeOnScroll>
            <div className="flex justify-center pt-6 pb-24">
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-2 text-sm font-medium hover:bg-neutral-800 hover:text-neutral-100"
              >
                ↑ Back to top
              </button>
            </div>
          </SectionFadeOnScroll>
        </div>
      </main>

      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
      />
    </>
  );
}
