// src/app/work/cyber-physical/page.tsx
"use client";

import CyberProjectCards from "@/components/CyberProjectCards";

const PROJECTS = [
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
    type: "Cyber-Physical Fabrication",
    year: "2026",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/LumiBloom/4.jpg?raw=true",
    variant: "pink" as const,
  },
  {
    slug: "cy-phy-workshop",
    title: "Cy-Phy Workshop",
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
    type: "Interactive Device",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/CyberPhysical%20Project/Reactive%20Material%20Pavilion/0.jpg?raw=true",
    variant: "pink" as const,
  },
];

export default function CyberPhysicalPage() {
  return (
    <main className="min-h-dvh w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-12 md:pt-14">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-wide py-10">
          Cyber-Physical Projects
        </h1>
      </div>

      <CyberProjectCards projects={PROJECTS} />
    </main>
  );
}
