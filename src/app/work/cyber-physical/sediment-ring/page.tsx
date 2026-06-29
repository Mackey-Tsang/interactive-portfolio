"use client";

import React, { useState } from "react";
import Lightbox from "@/components/Lightbox";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";

/* ---------------------------------------------
   IMAGE URLs
---------------------------------------------- */
const IMG_LANDSCAPE_1 = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/1.jpg?raw=true";
const IMG_LANDSCAPE_2 = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/2.JPG?raw=true";

const IMG_ROW_1 = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/4.jpg?raw=true";
const IMG_ROW_2 = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/13.png?raw=true";

const IMG_PRECISION = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/3.jpg?raw=true";

// Grid Images (from your screenshot)
const GRID_TOP = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/5.JPG?raw=true";
const GRID_C1_TOP = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/6.JPG?raw=true";
const GRID_C1_BOT = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/7.JPG?raw=true";
const GRID_C2_TOP = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/8.JPG?raw=true";
const GRID_C2_BOT = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/9.JPG?raw=true";
const GRID_C3_TOP = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/10.JPG?raw=true";
const GRID_C3_BOT = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/11.JPG?raw=true";
const GRID_C4_PORTRAIT = "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/12.JPG?raw=true";


export default function SedimentRingsPage() {
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

  // Helper component to keep the assembly grid code clean
  const AssemblyImage = ({ src, caption, isPortrait = false }: { src: string, caption: string, isPortrait?: boolean }) => (
    <div className={`flex flex-col w-full ${isPortrait ? "h-full" : ""}`}>
      <button
        type="button"
        onClick={() => openLightbox(src, caption)}
        className={`block w-full text-left overflow-hidden ${isPortrait ? "flex-1" : ""}`}
      >
        <img
          src={src}
          alt={caption}
          className={`block w-full bg-neutral-900 object-cover ${isPortrait ? "h-full" : "aspect-square sm:aspect-4/3"}`}
        />
      </button>
      <p className="mt-2 text-[11px] leading-tight text-neutral-300 md:text-xs">
        {caption}
      </p>
    </div>
  );

  return (
    <>
      <main className="min-h-dvh w-full bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-16 md:space-y-20">
          
          {/* 1. INTRO */}
          <SectionFadeOnScroll>
            <section className="space-y-4 md:space-y-6 w-full">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Digital Fabrication Report | Spring 2026
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Sediment Rings
              </h1>
              <p className="w-full text-sm md:text-base text-neutral-300 leading-relaxed">
                This fabrication report outlines the development of a hybrid mechanical object inspired by the biological geometry of the Nautilus and the sleek aesthetic of a spacecraft grounded on the tides of an unknown planet. The project explores the intersection of three digital fabrication workflows—3D printing (FDM and Resin), laser cutting, and CNC milling—to create a high-precision, “no-wobble” interlocking system.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* 2. Two landscape each w-full */}
          <SectionFadeOnScroll imageUrls={[IMG_LANDSCAPE_1, IMG_LANDSCAPE_2]}>
            <section className="space-y-6 w-full">
              <button type="button" onClick={() => openLightbox(IMG_LANDSCAPE_1, "Sediment Rings landscape view 1")} className="block w-full">
                <img src={IMG_LANDSCAPE_1} alt="Sediment Rings view 1" className="w-full aspect-video object-cover bg-neutral-900" />
              </button>
              <button type="button" onClick={() => openLightbox(IMG_LANDSCAPE_2, "Sediment Rings landscape view 2")} className="block w-full">
                <img src={IMG_LANDSCAPE_2} alt="Sediment Rings view 2" className="w-full aspect-video object-cover bg-neutral-900" />
              </button>
            </section>
          </SectionFadeOnScroll>

          {/* 3. Design and Material Strategy */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Design and Material Strategy</h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The model utilizes a puzzle-lock mechanism to ensure structural stability without the need for mechanical fasteners. Material selection was dictated by the specific functional requirements of each component. PLA served as the primary structural body, oriented in the slicer to minimize support structures, thereby preserving surface integrity and reducing production time.
              </p>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                Resin was substituted for high-detail interlocking nodes; the fine resolution of resin was necessary where standard PLA layering would have compromised the precision of the joints. For the aesthetic surface, laser-cut black acrylic was integrated to add visual depth and layering that 3D printing alone could not achieve. Finally, the “wavy” ocean base was CNC-milled from recycled plywood, chosen for its rapid fabrication time (under 10 minutes) and the organic contrast it provides against the mechanical shell.
              </p>
            </section>
          </SectionFadeOnScroll>

          {/* 4. Two landscape in one row */}
          <SectionFadeOnScroll imageUrls={[IMG_ROW_1, IMG_ROW_2]}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              <button type="button" onClick={() => openLightbox(IMG_ROW_1, "Design process 1")} className="block w-full">
                <img src={IMG_ROW_1} alt="Design process 1" className="w-full aspect-video object-cover bg-neutral-900" />
              </button>
              <button type="button" onClick={() => openLightbox(IMG_ROW_2, "Design process 2")} className="block w-full">
                <img src={IMG_ROW_2} alt="Design process 2" className="w-full aspect-video object-cover bg-neutral-900" />
              </button>
            </section>
          </SectionFadeOnScroll>

          {/* 5. One landscape with description below: Precision and Tolerances */}
          <SectionFadeOnScroll imageUrls={[IMG_PRECISION]}>
            <section className="space-y-6 w-full">
              <button type="button" onClick={() => openLightbox(IMG_PRECISION, "Precision and tolerances detail")} className="block w-full">
                <img src={IMG_PRECISION} alt="Precision detailing" className="w-full aspect-video object-cover bg-neutral-900" />
              </button>
              
              <div className="space-y-4 max-w-4xl">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Precision and Tolerances</h2>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  Success in this task relied on the meticulous management of tolerances across disparate materials:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-neutral-300 leading-relaxed marker:text-neutral-500">
                  <li><strong>General Tolerance:</strong> A gap of 0.07-0.1mm was maintained between PLA, CNC, and laser-cut parts.</li>
                  <li><strong>Resin-to-PLA Interface:</strong> This required an increased tolerance of 0.4mm. The extreme smoothness of resin increased surface friction, which would have caused the parts to seize at tighter tolerances.</li>
                  <li><strong>Material Calibration:</strong> While the acrylic was marketed as 3.0mm, manual measurements revealed a true thickness of 3.1mm. CAD files were adjusted accordingly to ensure the interlocking slots remained flush.</li>
                </ul>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 6. Layout matching the attached image */}
          <SectionFadeOnScroll imageUrls={[GRID_TOP, GRID_C1_TOP, GRID_C1_BOT, GRID_C2_TOP, GRID_C2_BOT, GRID_C3_TOP, GRID_C3_BOT, GRID_C4_PORTRAIT]}>
            <section className="space-y-6 md:space-y-6 w-full text-black p-4 md:p-8 rounded-sm">
              {/* Top Full Landscape */}
              <div className="w-full">
                <button type="button" onClick={() => openLightbox(GRID_TOP, "All fabricated parts")} className="block w-full text-left">
                  <img src={GRID_TOP} alt="All fabricated parts" className="w-full h-auto object-cover bg-neutral-200" />
                </button>
                <p className="mt-2 text-xs md:text-xs text-neutral-300">
                  All fabricated parts: 3D prints (white PLA, clear Resin), Laser-cut (3mm Black acrylic), CNC (plywood)
                </p>
              </div>

              {/* 4-Column Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                  <AssemblyImage src={GRID_C1_TOP} caption="Assemble test after grey primer" />
                  <AssemblyImage src={GRID_C1_BOT} caption="Rotary jigsaw slot to join pieces" />
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                  <AssemblyImage src={GRID_C2_TOP} caption="Interlocking with friction" />
                  <AssemblyImage src={GRID_C2_BOT} caption="Slide through when slots align" />
                </div>
                {/* Column 3 */}
                <div className="flex flex-col gap-6">
                  <AssemblyImage src={GRID_C3_TOP} caption="Pieces snap/penetrate to prevent twisting" />
                  <AssemblyImage src={GRID_C3_BOT} caption="Join laser cut and stand on the side" />
                </div>
                {/* Column 4 - Portrait */}
                <div className="flex flex-col gap-6 h-full mt-4 lg:mt-0">
                  <AssemblyImage 
                    src={GRID_C4_PORTRAIT} 
                    caption="Assemble the model on the CNC platform and Apply clear glossy spray for protection of the surface" 
                    isPortrait={true} 
                  />
                </div>
              </div>
            </section>
          </SectionFadeOnScroll>

          {/* 7. Post-Processing and Finishing */}
          <SectionFadeOnScroll>
            <section className="space-y-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Post-Processing and Finishing</h2>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The finishing phase followed a rigorous iterative sanding and priming schedule. To achieve a “high-standard” finish, the PLA components were sanded starting at 120-grit to level layer lines, followed by a coat of flat grey sandable primer. The sequence progressed through 240, 400, 600, 800, and finally 1000-grit for a glass-like surface.
              </p>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                Crucially, fit-testing was performed after every individual coat of primer and pigment. This ensured that the cumulative thickness of the glossy white and black paint did not interfere with the interlocking logic. The final assembly was completed before the application of the clear glossy coat, ensuring the protection of the finish without adding internal thickness to the joints. The result is a stable, aesthetically cohesive object that successfully translates complex digital logic into physical form.
              </p>
            </section>
          </SectionFadeOnScroll>


          {/* Footer / Back to top */}
          <SectionFadeOnScroll>
            <div className="flex justify-center pt-10 pb-20 w-full">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-white"
              >
                ↑ Back to top
              </button>
            </div>
          </SectionFadeOnScroll>

        </div>
      </main>

      <Lightbox open={lightboxOpen} src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
    </>
  );
}