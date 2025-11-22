// src/app/work/architecture/forge-hub/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForgeHubPage() {
  return (
    <main className="min-h-dvh bg-neutral-200 text-black">
      {/* Top bar: breadcrumb + back */}
      <div className="max-w-6xl mx-auto px-4 pt-8 flex items-center justify-between">
        <nav className="text-sm text-black/60">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/work/architecture" className="hover:underline">Architecture</Link>
          <span className="mx-2">/</span>
          <span className="text-black">The Forge Hub</span>
        </nav>

      </div>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 mt-8">
        <h1 className="text-3xl md:text-5xl font-semibold">The Forge Hub</h1>
        <p className="mt-3 text-base md:text-lg text-black/70">
          Community centre proposal on Alten Street, Auckland — a transparent lobby and industrial hall
          inspired by the site’s hardware factory past, with a curved roof and timber–steel tectonics.
        </p>

        <div className="relative w-full mt-6 aspect-video rounded-xl overflow-hidden border border-black/10">
          <Image
            src="/architecture/forge-hub/hero.jpg" // place this image in public/architecture/forge-hub/hero.jpg
            alt="The Forge Hub — Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
      </header>

      {/* Quick meta */}
      <section className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="text-xs tracking-wide text-black/50">YEAR</div>
          <div className="text-base">2024</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-black/50">LOCATION</div>
          <div className="text-base">Alten Street, Auckland, NZ</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-black/50">ROLE</div>
          <div className="text-base">Concept, architecture, visuals</div>
        </div>
      </section>

      {/* Content stub (keep simple for now) */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-20 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium">Overview</h2>
          <p className="mt-3 text-black/80 leading-relaxed">
            The design revives industrial memory through a large curved roof, reflective glass lobby,
            and a truss system referencing historic factories. Material expression emphasises timber columns,
            bracing, and a stone base with moments of charred timber for <em>ahi kā</em>.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-black/10">
              <Image src="/architecture/forge-hub/board-01.jpg" alt="Concept board"
                fill className="object-cover" />
            </div>
            <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-black/10">
              <Image src="/architecture/forge-hub/board-02.jpg" alt="Roof/structure"
                fill className="object-cover" />
            </div>
          </div>
        </div>

        <aside className="md:col-span-1">
          <h3 className="text-sm font-semibold">Credits</h3>
          <ul className="mt-3 text-sm space-y-1 text-black/80">
            <li>Studio: University of Auckland</li>
            <li>Tutors: —</li>
            <li>Tools: Revit, Rhino, D5, Photoshop</li>
          </ul>

          <h3 className="text-sm font-semibold mt-8">Links</h3>
          <ul className="mt-3 text-sm space-y-1">
            <li>
              <a href="/work/architecture" className="underline hover:no-underline">
                More architecture projects
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
