// src/app/work/cyber-physical/page.tsx
"use client";

import CreativeProjectCards from "@/components/CreativeProjectCards";

const PROJECTS = [
  {
    slug: "cy-phy-workshop-ii",
    title: "Cy-Phy Workshop II",
    type: "XR Installation",
    year: "2026",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Cy-Phy%20Workshop/p1.jpg?raw=true",
    variant: "blue" as const,
  },
  {
    slug: "non-planar-printing",
    title: "Non-Planar FDM Printing Research",
    type: "Digital Fabrication",
    year: "2026",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Non-Planar%20FDM%20Printing/8.jpg?raw=true",
    variant: "green" as const,
  },
  // {
  //   slug: "from-forest-to-home",
  //   title: "From Forest to Home",
  //   type: "Board Game Design",
  //   year: "2026",
  //   cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/From%20Forest%20to%20Home/1.jpg?raw=true",
  //   variant: "yellow" as const,
  // },
  {
    slug: "sediment-ring",
    title: "Sediment Ring",
    type: "Digital Fabrication",
    year: "2026",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Sediment%20Ring/1.jpg?raw=true",
    variant: "green" as const,
  },
  // {
  //   slug: "pla_treatment",
  //   title: "3D Printed Surface Treatment",
  //   type: "Digital Fabrication",
  //   year: "2026",
  //   cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Digital%20Fabrication/Surface%20Treatment/p7.jpg?raw=true",
  //   variant: "green" as const,
  // },
  {
    slug: "lumibloom",
    title: "LumiBloom",
    type: "Cyber-Physical Device",
    year: "2026",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/4.jpg?raw=true",
    variant: "pink" as const,
  },
  {
    slug: "cy-phy-workshop-i",
    title: "Cy-Phy Workshop I",
    type: "XR Installation",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Cy-Phy%20Workshop/p1.jpg?raw=true",
    variant: "blue" as const,
  },
  {
    slug: "soft-thresholds-veilspace",
    title: "Soft Thresholds - Veilspace",
    type: "Interactive Installation",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Soft%20Thresholds%20%E2%80%93%20Veilspace/p11.jpg?raw=true",
    variant: "pink" as const,
  },
  {
    slug: "reactive-material-pavilion",
    title: "Reactive Material Pavilion",
    type: "Digital Twins",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Reactive%20Material%20Pavilion/0.jpg?raw=true",
    variant: "pink" as const,
  },
];

export default function CreativePage() {
  return (
    <main className="min-h-dvh w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-12 md:pt-14">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-wide py-10">
          Creative Design Projects
        </h1>
      </div>

      <CreativeProjectCards projects={PROJECTS} />
    </main>
  );
}
