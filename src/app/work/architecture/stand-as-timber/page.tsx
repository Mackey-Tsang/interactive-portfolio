"use client";

import React, { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

/* ──────────────────────────────────────────────────────────────
   IMAGE LINKS - one per line, edit .jpg / .png as needed
   Image numbering in Tu Rakau folder:
      1  Hero Exterior Perspective
      2  Masterplan 1:250
      3  Isometric Masterplan
      4  Render - Bike Track
      5  Render - Deck View
      6  Render - Greenhouse
      7  Apartment A-E Unit Type Plan 1:100
      8  Apartment Plan 1:250 (magnifier)
      9  Section 1:250
     10  Detail 1:20 (Section A-A left, Section B-B right)
     11  Render - Interior Level 6 Unit D
     12  Design Development Diagram (PNG)
     13  Render - South Corridor
     14-17  Physical Model Photos (portrait)
     18-21  Physical Model Photos (landscape)
   ────────────────────────────────────────────────────────────── */
const HERO_EXTERIOR =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p1.jpg?raw=true";
const MASTERPLAN =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p2.jpg?raw=true";
const ISOMETRIC_MASTERPLAN =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p3.jpg?raw=true";
const RENDER_BIKE_TRACK =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p4.jpg?raw=true";
const RENDER_DECK =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p5.jpg?raw=true";
const RENDER_GREENHOUSE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p6.jpg?raw=true";
const UNIT_TYPE_PLAN =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p7.jpg?raw=true";
const APARTMENT_PLAN =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p8.jpg?raw=true";
const SECTION =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p9.jpg?raw=true";
const DETAIL_SECTION =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p10.jpg?raw=true";
const RENDER_INTERIOR_L6 =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p11.jpg?raw=true";
const DESIGN_DEVELOPMENT =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p12.png?raw=true";
const RENDER_SOUTH_CORRIDOR =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p13.jpg?raw=true";

const BASE_TR =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Stand%20as%20Timber/p";
const tr = (n: number, ext = "jpg") => `${BASE_TR}${n}.${ext}?raw=true`;

// Physical model — 4 portrait (p14–17) in one row, 4 landscape (p18–21) in two rows
const PORTRAIT_MODEL_PHOTOS = [
  { src: tr(14), alt: "1:100 physical model, portrait view 1" },
  { src: tr(15), alt: "1:100 physical model, portrait view 2" },
  { src: tr(16), alt: "1:100 physical model, portrait view 3" },
  { src: tr(17), alt: "1:100 physical model, portrait view 4" },
];

const LANDSCAPE_MODEL_PHOTOS = [
  { src: tr(18), alt: "1:100 physical model, landscape view 1" },
  { src: tr(19), alt: "1:100 physical model, landscape view 2" },
  { src: tr(20), alt: "1:100 physical model, landscape view 3" },
  { src: tr(21), alt: "1:100 physical model, landscape view 4" },
];

/* ──────────────────────────────────────────────────────────────
   LEGENDS
   ────────────────────────────────────────────────────────────── */
const SITE_LEGEND = [
  { color: "#6B8F5E", label: "Building Footprint" },
  { color: "#8DB87C", label: "Farming Land" },
  { color: "#B8D4A8", label: "Green Space" },
  { color: "#B5B5B5", label: "Vehicle" },
  { color: "#D4D4D4", label: "Pathway" },
  { color: "#A8D5E8", label: "Water" },
];

const MASTERPLAN_LEGEND = [
  { num: 1, label: "Bicycle Room" },
  { num: 2, label: "Plant Room" },
  { num: 3, label: "Storage" },
  { num: 4, label: "Accessible Toilet" },
  { num: 5, label: "Office" },
  { num: 6, label: "Reception" },
  { num: 7, label: "Service Core" },
  { num: 8, label: "Elevator" },
  { num: 9, label: "Interior Stair" },
  { num: 10, label: "Interior Stair" },
  { num: 11, label: "Electrical &amp; Data Room" },
  { num: 12, label: "Plant Room" },
  { num: 13, label: "Trash Room 1" },
  { num: 14, label: "Trash Room 2" },
  { num: 15, label: "Storage" },
  { num: 16, label: "Toilet" },
  { num: 17, label: "Communal Dining" },
  { num: 18, label: "Butchery" },
  { num: 19, label: "Freezer" },
  { num: 20, label: "Farm Produce" },
  { num: 21, label: "Communal Kitchen" },
  { num: 22, label: "Accessible Toilet" },
  { num: 23, label: "Exterior Dining" },
  { num: 24, label: "Exterior Stair" },
  { num: 25, label: "Loading Zone" },
];

/* ──────────────────────────────────────────────────────────────
   ACCOMMODATION DATA
   ────────────────────────────────────────────────────────────── */
const HOUSING_UNITS = [
  { type: "1 Bedroom", amount: 12, gia: "46" },
  { type: "2 Bedroom", amount: 14, gia: "93.6" },
  { type: "3 Bedroom", amount: 0, gia: "N/A" },
  { type: "4 Bedroom", amount: 4, gia: "362" },
];

const GROUND_LEVEL_SCHEDULE = [
  { programme: "Lift Lobby x7", gia: "488.6" },
  { programme: "Roof Terrace", gia: "76.1" },
  { programme: "Shared Laundry", gia: "24.3" },
  { programme: "Lounge Space", gia: "111.1" },
  { programme: "Bike Storage", gia: "47.7" },
  { programme: "Plant Room", gia: "28.5" },
  { programme: "Electrical &amp; Data", gia: "7.4" },
  { programme: "Bin", gia: "35" },
  { programme: "Groundkeeper Office", gia: "14.7" },
  { programme: "Reception", gia: "98.6" },
];

const COMMUNAL_DINING_SCHEDULE = [
  { programme: "Dining Hall", gia: "107.6" },
  { programme: "Food Treatment", gia: "61.6" },
  { programme: "Shared Kitchen", gia: "39.5" },
  { programme: "Freezer x2", gia: "9.2" },
  { programme: "Toilet / Bathroom", gia: "26.8" },
  { programme: "Kitchen Storage", gia: "8.5" },
  { programme: "Bin", gia: "37.4" },
  { programme: "Outdoor Dining Space", gia: "88" },
];

const EXTERNAL_WORKS = [
  { programme: "Carparking", area: "1,165.1", rate: "$120", total: "$139,814" },
  { programme: "Road", area: "1,133.2", rate: "$80", total: "$90,656" },
  { programme: "Loading Zone", area: "35", rate: "$150", total: "$5,250" },
  { programme: "Farming Land", area: "637.2", rate: "$50", total: "$31,862" },
  { programme: "Water Pond", area: "518", rate: "$250", total: "$129,505" },
  { programme: "Pathway", area: "1,222.3", rate: "$100", total: "$122,232" },
  { programme: "Bike Track", area: "331", rate: "$60", total: "$19,858" },
  { programme: "Green Area", area: "4,695.9", rate: "$15", total: "$70,438" },
  { programme: "Basketball Court", area: "144.1", rate: "$200", total: "$28,828" },
  { programme: "Playground", area: "118.2", rate: "$500", total: "$59,075" },
];

const IMPERVIOUS_SURFACE = [
  { element: "Communal Center Footprint", area: "332.9", total: "$220,700" },
  { element: "Apartment Footprint + Level 1-8", area: "3,631.8", total: "$21,790,800" },
  { element: "Greenhouse Footprint", area: "88.3", total: "$220,700" },
  { element: "Decks / Corridor (open x 50%)", area: "1,392.4", total: "$696,185" },
  { element: "Roof Panel", area: "1,063", total: "$446,460" },
];

const MASS_TIMBER = [
  { element: "Deck (Elevator Lobby)", area: "69.8", thickness: "210", panels: "7", volume: "102.61" },
  { element: "Deck (Units)", area: "41", thickness: "210", panels: "56", volume: "182.16" },
  { element: "Roof Panel", area: "1,063", thickness: "200", panels: "1", volume: "212.6" },
  { element: "External Wall", area: "285.2", thickness: "126", panels: "28", volume: "251.6" },
  { element: "Party Wall", area: "48.6", thickness: "126", panels: "24", volume: "147" },
  { element: "Lift Core Wall", area: "43.2", thickness: "150", panels: "8", volume: "51.8" },
];

/* ──────────────────────────────────────────────────────────────
   MAGNIFIER IMAGE - hover anywhere on the image to see a zoomed
   rectangular lens following the cursor.

   Performance design:
   - The lens is a clipping window (overflow:hidden) containing a
     nested <img> rendered ONCE at natural x zoom dimensions.
   - Mouse movement only mutates transform:translate3d on the lens
     + nested img via refs. Both are GPU-composited - no layout,
     no paint of the source image, no background-image scaling.
   - No setState on mousemove, no React reconciliation.

   Zoom is relative to the image NATURAL resolution:
     zoom=1   -> 1:1 native res in the lens
     zoom=1.5 -> 1.5x native (deep magnification)
     zoom=0.2 -> 20% of native (wide preview window)
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

    const magX = (x / rect.width) * natural.w * zoom;
    const magY = (y / rect.height) * natural.h * zoom;

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

export default function TuRakauPage() {
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
                COURSE: ARCHDES 701 / Master of Architecture Year 1 Semester 2
              </p>
              <p className="text-xs md:text-sm text-neutral-500">
                In collaboration with Bob Chen / Tutor: Mark Sayegh
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                T&#x16B; R&#x101;kau: Stand as Timber
              </h1>
              <p className="text-sm sm:text-base leading-relaxed">
                Kaingaroa is a forestry settlement managed by KLC (Kaingaroa Tipu). The village lacks housing density to support new workers and families, so this project proposes a mass timber apartment tower designed, built, and occupied by KLC itself.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                The building provides 30 units across seven storeys above a communal ground floor. Beyond housing, it is a demonstration product. A completed tower in the village is the most direct argument KLC can make to future clients about what mass timber can achieve at residential height.
              </p>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full border-t border-neutral-500 my-6" />
          </SectionFadeOnScroll>

          {/* 02 — Hero Exterior Perspective */}
          <SectionFadeOnScroll imageUrls={[HERO_EXTERIOR]}>
            <div className="space-y-6">
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    HERO_EXTERIOR,
                    "Exterior perspective render of Tu Rakau."
                  )
                }
                className="block w-full"
              >
                <img
                  src={HERO_EXTERIOR}
                  alt="Exterior perspective render of Tu Rakau."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 03 — Masterplan */}
          <SectionFadeOnScroll
            imageUrls={[
              MASTERPLAN,
              ISOMETRIC_MASTERPLAN,
              RENDER_BIKE_TRACK,
              RENDER_DECK,
              RENDER_GREENHOUSE,
              RENDER_SOUTH_CORRIDOR,
            ]}
          >
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Masterplan 1:250
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The site is organised around one idea: landscape and tower
                  together. More than half the site is outdoor space, with each
                  element placed to respond to sunlight, farming, and the
                  village&apos;s culture of communal living. The building sits
                  south, casting its shadow away from the northern half of the
                  site. A water pond north of the building provides evaporative
                  cooling to the glazed facade and an open landscape view. At
                  400mm deep, it needs no fence or railing.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Farming land sits north-east for maximum sunlight, with a
                  short route east to the communal food hall where residents
                  process, cook, and share hunted game and farmed produce. A
                  bike path connects the whole precinct, and car parking is
                  separated from pedestrian movement to the south.
                </p>
              </div>

              {/* Masterplan plan 1:250 */}
              <button
                type="button"
                onClick={() =>
                  openLightbox(MASTERPLAN, "1:250 masterplan of the Tu Rakau precinct.")
                }
                className="block w-full"
              >
                <img
                  src={MASTERPLAN}
                  alt="1:250 masterplan of the Tu Rakau precinct."
                  className="block w-full h-auto object-cover"
                />
              </button>

              {/* Site legend */}
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-3">
                  Site Legend
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {SITE_LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 border border-neutral-400 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] text-neutral-700 italic">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Masterplan room legend */}
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-3">
                  Masterplan Legend
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-0.5">
                  {MASTERPLAN_LEGEND.map((item) => (
                    <li key={item.num} className="flex items-baseline gap-1.5">
                      <span className="text-[10px] font-medium text-neutral-500 w-4 shrink-0 text-right">
                        {item.num}
                      </span>
                      <span className="text-[11px] text-neutral-700">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Isometric Masterplan */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Isometric Masterplan
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      ISOMETRIC_MASTERPLAN,
                      "Isometric masterplan of the Tu Rakau precinct."
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={ISOMETRIC_MASTERPLAN}
                    alt="Isometric masterplan of the Tu Rakau precinct."
                    className="block w-full h-auto object-cover"
                  />
                </button>
              </div>

              {/* Four renders — Bike Track / Deck View / Greenhouse / South Corridor */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { src: RENDER_BIKE_TRACK,       label: "Bike Track" },
                  { src: RENDER_DECK,             label: "Deck View" },
                  { src: RENDER_GREENHOUSE,        label: "Greenhouse" },
                  { src: RENDER_SOUTH_CORRIDOR,    label: "South Corridor" },
                ].map(({ src, label }) => (
                  <div key={src} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => openLightbox(src, label)}
                      className="block w-full"
                    >
                      <div className="aspect-3/2 w-full overflow-hidden">
                        <img
                          src={src}
                          alt={label}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </button>
                    <p className="text-xs text-neutral-700 text-center">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 04 — Accommodation Schedule */}
          <SectionFadeOnScroll>
            <div className="space-y-8">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Accommodation Schedule
                </h2>
              </div>

              {/* Key stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { value: "30", label: "DU / HA" },
                  { value: "112", label: "PAX" },
                  { value: "133%", label: "Parking vs DU" },
                  { value: "0.54", label: "FAR" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center rounded-full border-2 border-neutral-700 w-24 h-24 shrink-0"
                  >
                    <span className="text-xl font-bold leading-none">{value}</span>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-600 text-center leading-tight mt-1 px-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Housing Units + Ground Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Housing Units */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                    Accommodation Schedule (Housing Units)
                  </p>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-400">
                        <th className="text-left font-medium text-neutral-500 py-1 pr-4">
                          Unit Type
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-4">
                          Amount
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1">
                          GIA per unit (m&#178;)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {HOUSING_UNITS.map((row) => (
                        <tr key={row.type} className="border-b border-neutral-200">
                          <td className="text-neutral-700 py-1 pr-4">{row.type}</td>
                          <td className="text-right text-neutral-700 py-1 pr-4">
                            {row.amount}
                          </td>
                          <td className="text-right text-neutral-700 py-1">{row.gia}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="font-medium text-neutral-900 pt-2 pr-4">Total</td>
                        <td className="text-right font-medium text-neutral-900 pt-2 pr-4">
                          30
                        </td>
                        <td className="text-right font-medium text-neutral-900 pt-2">
                          3,310.4
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Ground Level */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                    Accommodation Schedule (Ground Level)
                  </p>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-400">
                        <th className="text-left font-medium text-neutral-500 py-1 pr-4">
                          Programme
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1">
                          GIA (m&#178;)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {GROUND_LEVEL_SCHEDULE.map((row) => (
                        <tr key={row.programme} className="border-b border-neutral-200">
                          <td className="text-neutral-700 py-1 pr-4"
                            dangerouslySetInnerHTML={{ __html: row.programme }}
                          />
                          <td className="text-right text-neutral-700 py-1">{row.gia}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="font-medium text-neutral-900 pt-2 pr-4">Total</td>
                        <td className="text-right font-medium text-neutral-900 pt-2">
                          932.0 m&#178;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Communal Dining + External Works */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Communal Dining */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                    Accommodation Schedule (Communal Dining Space)
                  </p>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-400">
                        <th className="text-left font-medium text-neutral-500 py-1 pr-4">
                          Programme
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1">
                          GIA (m&#178;)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMMUNAL_DINING_SCHEDULE.map((row) => (
                        <tr key={row.programme} className="border-b border-neutral-200">
                          <td className="text-neutral-700 py-1 pr-4">{row.programme}</td>
                          <td className="text-right text-neutral-700 py-1">{row.gia}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="font-medium text-neutral-900 pt-2 pr-4">Total</td>
                        <td className="text-right font-medium text-neutral-900 pt-2">
                          1,381.7
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* External Works */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                    Masterplan Schedule (External Works)
                  </p>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-400">
                        <th className="text-left font-medium text-neutral-500 py-1 pr-2">
                          Programme
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-2">
                          Area (m&#178;)
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-2">
                          Rate ($/m&#178;)
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1">
                          Total ($NZD)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXTERNAL_WORKS.map((row) => (
                        <tr key={row.programme} className="border-b border-neutral-200">
                          <td className="text-neutral-700 py-1 pr-2">{row.programme}</td>
                          <td className="text-right text-neutral-700 py-1 pr-2">
                            {row.area}
                          </td>
                          <td className="text-right text-neutral-700 py-1 pr-2">
                            {row.rate}
                          </td>
                          <td className="text-right text-neutral-700 py-1">{row.total}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="font-medium text-neutral-900 pt-2 pr-2">Total</td>
                        <td className="text-right font-medium text-neutral-900 pt-2 pr-2">
                          7,701.7
                        </td>
                        <td className="text-right text-neutral-500 pt-2 pr-2 italic">
                          Subtotal A
                        </td>
                        <td className="text-right font-medium text-neutral-900 pt-2">
                          $697,518
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Impervious Surface */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                  Accommodation Schedule (Total Impervious Surface)
                </p>
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-400">
                      <th className="text-left font-medium text-neutral-500 py-1 pr-4">
                        Element
                      </th>
                      <th className="text-right font-medium text-neutral-500 py-1 pr-4">
                        Area (m&#178;)
                      </th>
                      <th className="text-right font-medium text-neutral-500 py-1">
                        Total ($NZD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {IMPERVIOUS_SURFACE.map((row) => (
                      <tr key={row.element} className="border-b border-neutral-200">
                        <td className="text-neutral-700 py-1 pr-4">{row.element}</td>
                        <td className="text-right text-neutral-700 py-1 pr-4">{row.area}</td>
                        <td className="text-right text-neutral-700 py-1">{row.total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="font-medium text-neutral-900 pt-2 pr-4">
                        Total Building Footprint (excl. Roof)
                      </td>
                      <td className="text-right font-medium text-neutral-900 pt-2 pr-4">
                        5,445.4
                      </td>
                      <td className="text-right pt-2">
                        <span className="italic text-neutral-500">Subtotal B</span>{" "}
                        <span className="font-medium text-neutral-900">$28,450,024</span>
                        <span className="text-neutral-500"> (with 15% Building Service)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mass Timber Volume & Carbon */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 mb-2">
                  Mass Timber Volume &amp; Carbon Calculator
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] border-collapse min-w-[520px]">
                    <thead>
                      <tr className="border-b border-neutral-400">
                        <th className="text-left font-medium text-neutral-500 py-1 pr-4">
                          Element
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-4">
                          Area (m&#178;)
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-4">
                          Thickness (mm)
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1 pr-4">
                          No. of Panels
                        </th>
                        <th className="text-right font-medium text-neutral-500 py-1">
                          Volume (m&#179;)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {MASS_TIMBER.map((row) => (
                        <tr key={row.element} className="border-b border-neutral-200">
                          <td className="text-neutral-700 py-1 pr-4">{row.element}</td>
                          <td className="text-right text-neutral-700 py-1 pr-4">{row.area}</td>
                          <td className="text-right text-neutral-700 py-1 pr-4">
                            {row.thickness}
                          </td>
                          <td className="text-right text-neutral-700 py-1 pr-4">
                            {row.panels}
                          </td>
                          <td className="text-right text-neutral-700 py-1">{row.volume}</td>
                        </tr>
                      ))}
                      <tr className="border-b border-neutral-300">
                        <td className="font-medium text-neutral-900 pt-2 pr-4">
                          Total CLT (m&#179;)
                        </td>
                        <td colSpan={3} />
                        <td className="text-right font-medium text-neutral-900 pt-2">
                          3,528.5
                        </td>
                      </tr>
                      <tr>
                        <td className="text-neutral-700 pt-1 pr-4">
                          Est. Embodied Carbon (@ 300 kg CO&#x2082;e/m&#179;)
                        </td>
                        <td colSpan={3} />
                        <td className="text-right text-neutral-700 pt-1">
                          1,058,547 kg CO&#x2082;e
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Construction cost */}
              <div className="border border-neutral-700 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-600 mb-1">
                  Construction Cost Subtotal (A + B)
                </p>
                <p className="text-xs text-neutral-500 mb-4">with 10% Professional Fee</p>
                <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
                  $32,062,296
                </p>
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 05 — Design Development Diagram */}
          <SectionFadeOnScroll imageUrls={[DESIGN_DEVELOPMENT]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Design Development
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLightbox(DESIGN_DEVELOPMENT, "Design development diagram.")
                }
                className="block w-full"
              >
                <img
                  src={DESIGN_DEVELOPMENT}
                  alt="Design development diagram."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 06 — Apartment Typologies */}
          <SectionFadeOnScroll imageUrls={[UNIT_TYPE_PLAN, APARTMENT_PLAN]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Apartment Typologies
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  All units follow the same logic: living rooms and decks face north
                  for daylight and outlook, bedrooms face south for privacy, and
                  bathrooms and kitchens sit close to the central service core to
                  stack wet services efficiently.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Unit A is a compact one-bedroom with ground-level storage to
                  compensate for its small footprint. Units B and C are two-bedroom
                  layouts with south-facing bedrooms and direct entry to the living
                  room. Units D and E on levels 6 and 7 are the four-bedroom family
                  units, each with a 40m&sup2; deck, in-unit laundry, storage, and a
                  working space. The floor plate is offset in one direction at each
                  level, turning the cantilevers into balconies. Balcony angles vary
                  by unit type to break the flat facade, and shared-type adjacent
                  units have their balconies merged into one connected deck.
                </p>
              </div>

              {/* Unit type plan 1:100 */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Apartment A&ndash;E: Unit Type Plan 1:100
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(
                      UNIT_TYPE_PLAN,
                      "Apartment A-E unit type plans 1:100."
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={UNIT_TYPE_PLAN}
                    alt="Apartment A-E unit type plans 1:100."
                    className="block w-full h-auto object-cover"
                  />
                </button>
              </div>

              {/* Apartment plan 1:250 with magnifier */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Apartment Plan 1:250
                </h3>
                <div className="flex justify-center">
                  <MagnifierImage
                    src={APARTMENT_PLAN}
                    alt="Apartment plan 1:250."
                    zoom={0.6}
                    lensWidth={650}
                    lensHeight={550}
                    className="w-full max-w-sm"
                  />
                </div>
                <p className="text-xs text-neutral-500 italic text-center">
                  Hover over the plan to magnify.
                </p>
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 07 — Section 1:250 */}
          <SectionFadeOnScroll imageUrls={[SECTION]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Section 1:250
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The section shows the full structural logic: a concrete foundation
                  and podium carry columns, beams, and walls that support the CLT
                  floors above. The water pond to the north demonstrates how
                  evaporative cooling works in relation to the glazed facade. Steel
                  wire mesh screens with climbing greenery divide each balcony,
                  providing privacy while keeping the facade open.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLightbox(SECTION, "1:250 section through Tu Rakau.")
                }
                className="block w-full"
              >
                <img
                  src={SECTION}
                  alt="1:250 section through Tu Rakau."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 08 — Detail Sections 1:20 */}
          <SectionFadeOnScroll imageUrls={[DETAIL_SECTION]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Detail Sections 1:20
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  The balcony detail shows CLT panels connected by self-tapping
                  screws, with a 3mm waterproof membrane and rigid insulation to a
                  1:4 drainage slope. LVL rafters are specified H3.2 and left
                  exposed to the exterior, expressing the timber honestly as part of
                  the building&apos;s character. The concrete-to-timber junction
                  includes a suspended ceiling concealing HVAC and pipe services,
                  with a parapet flashing draining to 3 degrees and a planter box
                  along the parapet supplying the climbing plants on the screens
                  below.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    DETAIL_SECTION,
                    "1:20 detail sections, Section A-A and Section B-B."
                  )
                }
                className="block w-full"
              >
                <img
                  src={DETAIL_SECTION}
                  alt="1:20 detail sections, Section A-A (left) and Section B-B (right)."
                  className="block w-full h-auto object-cover"
                />
              </button>
              <p className="text-xs text-neutral-500 italic text-center">
                Left: Section A&ndash;A &nbsp;/&nbsp; Right: Section B&ndash;B
              </p>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 09 — Interior Perspective */}
          <SectionFadeOnScroll imageUrls={[RENDER_INTERIOR_L6]}>
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Interior Perspective, Level 6 Unit D
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  D5 Render was used to simulate light, material, and atmosphere
                  across the project. The renders focus on what apartments rarely
                  deliver well: genuine light and shadow interaction and a strong
                  connection to landscape.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    RENDER_INTERIOR_L6,
                    "Interior perspective of Level 6 Unit D living room."
                  )
                }
                className="block w-full"
              >
                <img
                  src={RENDER_INTERIOR_L6}
                  alt="Interior perspective of Level 6 Unit D living room."
                  className="block w-full h-auto object-cover"
                />
              </button>
            </div>
          </SectionFadeOnScroll>

          {/* Divider */}
          <SectionFadeOnScroll>
            <div className="w-full mx-auto my-8 border-t border-neutral-700" />
          </SectionFadeOnScroll>

          {/* 10 — Physical Model 1:100 */}
          <SectionFadeOnScroll
            imageUrls={[
              ...PORTRAIT_MODEL_PHOTOS.map((p) => p.src),
              ...LANDSCAPE_MODEL_PHOTOS.map((p) => p.src),
            ]}
          >
            <div className="space-y-6">
              <div className="space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Physical Model 1:100
                </h2>
              </div>

              {/* 4 portrait photos — one row */}
              <div className="grid grid-cols-4 gap-3 ">
                {PORTRAIT_MODEL_PHOTOS.map((photo) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => openLightbox(photo.src, photo.alt)}
                    className="block w-full "
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="block w-full h-auto object-cover aspect-3/4"
                    />
                  </button>
                ))}
              </div>

              {/* 4 landscape photos — 2 columns, 2 rows */}
              <div className="grid grid-cols-2 gap-3">
                {LANDSCAPE_MODEL_PHOTOS.map((photo) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => openLightbox(photo.src, photo.alt)}
                    className="block w-full"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="block w-full h-auto object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </SectionFadeOnScroll>

          {/* Back to top */}
          <SectionFadeOnScroll>
            <div className="flex justify-center pt-6 pb-24">
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-2 text-sm font-medium hover:bg-neutral-800 hover:text-neutral-100"
              >
                &#8593; Back to top
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