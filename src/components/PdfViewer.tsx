"use client";

import { useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Text/annotation layers are disabled below (renderTextLayer / renderAnnotationLayer
// are both false), so their CSS isn't needed. If you turn those on later — e.g. to make
// the PDF's text selectable — re-add:
//   import "react-pdf/dist/Page/AnnotationLayer.css";
//   import "react-pdf/dist/Page/TextLayer.css";

// pdf.js needs an explicit worker. Serving it from /public with a plain string path
// sidesteps bundler asset-resolution quirks entirely. Using a .js extension (not .mjs)
// avoids MIME-type mismatches — some static file servers don't map .mjs to a JS
// content-type, and browsers refuse to run a dynamically-imported module whose
// response isn't served as text/javascript. Copy the file once:
//   cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PdfViewerProps {
  /** Direct URL to the PDF file (public/ path, or a raw.githubusercontent.com link) */
  fileUrl: string;
  /** Matches the light/dark convention used across the site's project pages */
  theme?: "light" | "dark";
  /** Max render width in px for each page canvas */
  maxWidth?: number;
}

// How far (px) a drag needs to travel before it counts as a page flip.
const DRAG_THRESHOLD = 60;
// How much the page visually follows the finger/cursor while dragging (0–1).
// Damped below 1 so it feels like resistance rather than 1:1 tracking.
const DRAG_FOLLOW = 0.5;

export default function PdfViewer({
  fileUrl,
  theme = "light",
  maxWidth = 900,
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const isDark = theme === "dark";

  // "Next" wraps back to page 1 once you're at the end; "previous" stops at 1.
  const goNext = () => setPageNumber((p) => (numPages && p >= numPages ? 1 : p + 1));
  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!numPages) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - dragStartXRef.current);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX <= -DRAG_THRESHOLD) goNext();
    else if (dragX >= DRAG_THRESHOLD) goPrev();
    setDragX(0);
  };

  // Keep the current page plus its immediate neighbours mounted at all times.
  // Flipping only ever toggles opacity between already-rendered canvases, so
  // there's nothing left to pop in, flash, or glitch — the crossfade is the
  // only thing that moves. Includes page 1 as a neighbour of the last page
  // so the wrap-around flip is just as smooth as a normal one.
  const windowPages = useMemo(() => {
    if (!numPages) return [];
    const next = pageNumber >= numPages ? 1 : pageNumber + 1;
    return Array.from(new Set([Math.max(1, pageNumber - 1), pageNumber, next]));
  }, [pageNumber, numPages]);

  const progress = numPages ? (pageNumber / numPages) * 100 : 0;

  return (
    <div
      className={`flex flex-col items-center gap-6 py-10 ${
        isDark ? "bg-black text-white" : "bg-neutral-100 text-neutral-900"
      }`}
    >
      <div
        className={`w-full overflow-hidden rounded-sm shadow-sm select-none ${
          isDark ? "shadow-white/5" : "shadow-black/10"
        } ${numPages ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ maxWidth, touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onLoadSuccess}
          loading={<p className="py-24 text-sm opacity-60 text-center">Loading document…</p>}
          error={
            <p className="py-24 text-sm opacity-60 text-center">
              Couldn't load the PDF. Check the file URL.
            </p>
          }
        >
          {/* All stacked pages share one grid cell; the tallest defines the
              track height, so nothing shifts or resizes as pages crossfade.
              The whole stack translates with the drag, then snaps back to 0
              as the crossfade hands off to the new page. */}
          <div
            className="grid transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateX(${dragX * DRAG_FOLLOW}px)`,
              transitionDuration: isDragging ? "0ms" : undefined,
            }}
          >
            {windowPages.map((n) => (
              <div
                key={n}
                className="[grid-area:1/1] transition-opacity duration-300 ease-out motion-reduce:transition-none"
                style={{ opacity: n === pageNumber ? 1 : 0 }}
                aria-hidden={n !== pageNumber}
              >
                <Page
                  pageNumber={n}
                  width={maxWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </div>
        </Document>
      </div>

      {/* Minimal nav: arrows, a small zero-padded counter, hairline progress */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-6 text-sm tracking-tight">
          <button
            onClick={goPrev}
            disabled={pageNumber <= 1}
            className="disabled:opacity-20 transition-opacity"
            aria-label="Previous page"
          >
            ←
          </button>

          <span className={`text-xs tabular-nums tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            {String(pageNumber).padStart(2, "0")} / {String(numPages || 0).padStart(2, "0")}
          </span>

          <button
            onClick={goNext}
            disabled={!numPages}
            className="disabled:opacity-20 transition-opacity"
            aria-label="Next page"
          >
            →
          </button>
        </div>

        <div className={`h-px w-16 overflow-hidden ${isDark ? "bg-white/15" : "bg-neutral-900/15"}`}>
          <div
            className={`h-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${
              isDark ? "bg-white" : "bg-neutral-900"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
