"use client";

import React, { useState } from "react";
import SectionFadeOnScroll from "@/components/SectionFadeOnScroll";
import Lightbox from "@/components/Lightbox";

/* ──────────────────────────────────────────────────────────────
   IMAGE LINKS: paste each GitHub link over the img("...") call.
   ────────────────────────────────────────────────────────────── */
const BASE =
  "https://github.com/Mackey-Tsang/photo-host/blob/main/Creative/Boardgame_FromForestToHome/";
const img = (name: string) => `${BASE}${name}?raw=true`;

// Box + unboxing
const GAMEBOX              = img("p2.jpg");  // Gamebox (hero)
const GAMEBOX_CLOSEUP      = img("p1.jpg");  // Gamebox close-up
const GAMEBOX_SLIGHT_OPEN  = img("p3.jpg");  // Gamebox slightly open
const GAMEBOX_OPEN         = img("p4.jpg");  // Gamebox open with game rule board (components showcase)

// How to play
const SETUP_HAND_PANEL     = img("p5.jpg");  // Hand placing inner game panel
const SETUP_OVERVIEW       = img("p6.jpg"); // Overview of all components, pre-game set up
const MIDGAME_MAP          = img("p7.jpg");  // Map with trees and roads, mid-game
const SPINNER              = img("p8.jpg"); // Spinner close-up
const PLAYER_SET_TIMBER    = img("p9.jpg");  // Player set with timber
const TIMBER_HOUSE         = img("p10.jpg");  // Timber combined into a house
const HOUSE_ON_BOARD       = img("p11.jpg");  // House placed on board

// Village block
const RESIN_FACTORY        = img("p12.jpg"); // Resin factory model close-up

// Design development
const SKETCH               = img("p13.jpg"); // Early sketch of game components
const RHINO_ISO            = img("p14.jpg"); // Isometric view of Rhino model
const RULE_BOARD           = img("p15.png"); // Game rule board

const MINI_CARDS = [
  img("p16.png"),
  img("p17.png"),
  img("p18.png"),
  img("p19.png"),
  img("p20.png"),
  img("p21.png"),
];

// Making process
const PROCESS = [
  {
    src: img("p22.jpg"),
    title: "Cutting Timber",
    desc: "Bevelling the plywood edges and cutting 81 timber blocks in the wood workshop.",
  },
  {
    src: img("p23.jpg"),
    title: "Painting",
    desc: "Gluing the plywood panels into the gamebox shell, then spraying a black matte finish.",
  },
  {
    src: img("p24.jpg"),
    title: "Charring Wood",
    desc: "Burning all 81 (9x9) timber blocks by hand to create the charred texture.",
  },
  {
    src: img("p25.jpg"),
    title: "Oiling",
    desc: "Cleaning ash from the burnt surface and applying teak oil before gluing on board.",
  },
];

// Game day
const GAMEDAY = [img("p26.jpg"), img("p27.jpg")];

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "81",   label: "Timber blocks" },
  { value: "9x9",  label: "Grid" },
  { value: "4",    label: "Players" },
  { value: "6",    label: "Question themes" },
  { value: "3",    label: "Points to win" },
  { value: "400",  label: "mm square box" },
];

/* ──────────────────────────────────────────────────────────────
   TILE: clickable image that fills a fixed-ratio box
   ────────────────────────────────────────────────────────────── */
type TileProps = {
  src: string;
  alt: string;
  onOpen: (src: string, alt: string) => void;
  aspect?: string; // Tailwind aspect class, e.g. "aspect-[4/3]". Omit for natural height.
  // Which part of a cropped image stays in view: "x% y%".
  // "50% 50%" = centre (default). Lower x shows more of the left, higher x more of the right.
  // Lower y shows more of the top, higher y more of the bottom.
  position?: string;
  className?: string;
};

function Divider() {
  return <div className="w-full border-t border-white/15" />;
}

function Tile({ src, alt, onOpen, aspect, position = "50% 50%", className = "" }: TileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src, alt)}
      className={`group relative block w-full overflow-hidden bg-neutral-900 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${aspect ?? ""} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition: position }}
        className={
          aspect
            ? "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            : "block w-full h-auto object-cover transition duration-500 group-hover:scale-[1.02]"
        }
      />
    </button>
  );
}

function StepLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-neutral-500">{n}</span>
      <h3 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

export default function FromForestToHomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | undefined>();
  const [lightboxAlt, setLightboxAlt] = useState("");

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
    <main className="min-h-dvh bg-black text-neutral-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">

        {/* 01 / Hero */}
        <SectionFadeOnScroll imageUrls={[GAMEBOX]}>
          <section className="space-y-10">
            <div className="relative grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
              <div className="relative">
                <Tile
                  src={GAMEBOX}
                  alt="Ngahere ki te Kainga gamebox with the charred timber gameboard."
                  onOpen={openLightbox}
                />
              </div>

              <div className="relative lg:-ml-16 lg:z-10">
                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
                    Boardgame / ARCHDES 701: Advanced Design 2
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                    Ngahere ki te K&#x101;inga
                  </h1>
                  <p className="text-lg text-neutral-300 ">From Forest to Home</p>
                  <p className="text-[11px] text-neutral-400 space-y-1 mb-10">In collaboration with Bob Chen</p>
                  <p className="text-sm text-neutral-300 mb-1">
                    Four travellers arrive at the edge of the Kaingaroa forest. To
                    build a home in the village, they must first earn their place in it:
                  </p>
                  <p className="text-sm italic text-neutral-400 mb-5">
                    one road, one harvest, one answer at a time.
                  </p>

                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 sm:grid-cols-6 border-y border-white/15">
              {STATS.map(({ value, label }) => (
                <div key={label} className="py-5 text-center">
                  <p className="text-2xl font-semibold tracking-tight">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* 02 / Concept */}
        <SectionFadeOnScroll>
          <section className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">
                Concept: The Forest Has to Be Earned
              </h2>
              <p className="text-sm text-neutral-300">
                Kaingaroa is a forestry village before it is a housing site, so wood
                comes first and home second. The board is a plain grid: an outer ring
                to arrive on, a forest interior to earn resources and knowledge, and a
                single centre point for the village. Four players start at four corners
                and build inward.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                Precedent: Catan
              </h3>
              <p className="text-sm text-neutral-300">
                Catan gave us the starting logic: gather a resource, spend it to
                build, and hold a bonus point for as long as you can defend it. We
                kept resource-funded roads, settlements at a road&apos;s end, and the
                longest-road bonus.
              </p>
              <p className="text-sm text-neutral-300">
                On top of that we added our own forest, where timber is physically
                removed once harvested, and swapped dice-driven production for a
                knowledge trigger: answering a question to move through the forest
                instead of rolling for it.
              </p>
            </div>
          </section>
        </SectionFadeOnScroll>

  <Divider />

        {/* 03 / Unboxing */}
        <SectionFadeOnScroll imageUrls={[GAMEBOX_CLOSEUP, GAMEBOX_SLIGHT_OPEN, GAMEBOX_OPEN]}>
          <section className="space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight">Inside the Box</h2>
              <p className="text-sm text-neutral-300">
                Opening the 400 x 400 x 60mm gamebox reveals a 3D printed container
                system that sits beneath the 81-block gameboard. Each container is
                shaped with a finger gap so pieces lift out without disturbing the
                rest. Four identical containers hold each player&apos;s roads and
                rooftops, colour matched per player, with separate containers for the
                tree blocks and timber currency, the question cards, the bonus winning
                points, and the spinner fitted underneath.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Tile
                src={GAMEBOX_CLOSEUP}
                alt="Close-up of the charred timber gameboard surface."
                onOpen={openLightbox}
                aspect="aspect-[4/3]"
              />
              <Tile
                src={GAMEBOX_SLIGHT_OPEN}
                alt="Gamebox slightly open, revealing the containers below."
                onOpen={openLightbox}
                aspect="aspect-[4/3]"
              />
              <Tile
                src={GAMEBOX_OPEN}
                alt="Gamebox open with the game rule board and all components."
                onOpen={openLightbox}
                aspect="aspect-[4/3]"
              />
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 text-center">
              Closed / Opening / Components Showcase
            </p>
          </section>
        </SectionFadeOnScroll>
<Divider />
        {/* 04 / How to Play */}
        <SectionFadeOnScroll
          imageUrls={[
            SETUP_HAND_PANEL,
            SETUP_OVERVIEW,
            MIDGAME_MAP,
            SPINNER,
            PLAYER_SET_TIMBER,
            TIMBER_HOUSE,
            HOUSE_ON_BOARD,
          ]}
        >
          <section className="space-y-16">
            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold tracking-tight">How to Play</h2>
              <p className="text-sm text-neutral-300">
                Build roads into the forest, harvest timber, answer questions to move
                forward, and turn timber into houses. The first player to hold three
                winning points at once wins.
              </p>
            </div>

            {/* Step 1: Set up */}
            <div className="space-y-6">
              <StepLabel n="01" title="Set Up the Forest" />
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,3fr)]">
                <Tile
                  src={SETUP_HAND_PANEL}
                  alt="Placing the inner game panel during pre-game set up."
                  onOpen={openLightbox}
                  aspect="aspect-[4/3]"
                />
                <Tile
                  src={SETUP_OVERVIEW}
                  alt="Overview of all components on the table after pre-game set up."
                  onOpen={openLightbox}
                  aspect="aspect-[5/3]"
                  position="50% 100%"
                />
              </div>
              <p className="text-sm text-neutral-300 max-w-3xl">
                The inner 7x7 grid is made of laser cut and engraved basswood blocks:
                trees, empty sites, and the six chance categories. They are placed
                randomly across the 49 interior cells at the start of each game, so
                no two forests are the same.
              </p>
            </div>
<div className="w-1/4 mx-auto border-t border-white/15" />
            {/* Step 2: Roads + harvest */}
            <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
              <div className="space-y-4">
                <StepLabel n="02" title="Build Roads, Harvest Trees" />
                <p className="text-sm text-neutral-300">
                  Players spend timber to lay roads inward from their corner. Every
                  Forest tile starts with three tree pieces stacked pyramid style,
                  representing a fully grown tree. When a road reaches it, the stack
                  is harvested in one go, clearing the tile and rewarding the player
                  with 3 timber.
                </p>
                <p className="text-sm text-neutral-300">
                  A tweezer is included for anyone who finds the small road pieces
                  hard to place by hand, keeping the game accessible without changing
                  how it is played.
                </p>
              </div>
              <Tile
                src={MIDGAME_MAP}
                alt="Game map mid-way through play, with trees and roads on the board."
                onOpen={openLightbox}
                aspect="aspect-[4/3]"
              />
            </div>
<div className="w-1/4 mx-auto border-t border-white/15" />
            {/* Step 3: Spinner */}
            <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
              <Tile
                src={SPINNER}
                alt="Close-up of the spinner."
                onOpen={openLightbox}
                aspect="aspect-[4/3]"
                className="order-2 md:order-1"
              />
              <div className="space-y-4 order-1 md:order-2">
                <StepLabel n="03" title="Answer to Move Forward" />
                <p className="text-sm text-neutral-300">
                  Chance blocks stop a road until the player answers a question from
                  one of six themes about Kaingaroa. A correct answer clears the way,
                  and the spinner decides the reward.
                </p>
                <p className="text-sm text-neutral-300">
                  At the four trade ports on the outer ring, players spin first to
                  find which theme their question comes from, then answer to trigger
                  the port&apos;s reward or penalty.
                </p>
              </div>
            </div>
<div className="w-1/4 mx-auto border-t border-white/15" />
            {/* Step 4: Build a house */}
            <div className="space-y-6">
              <StepLabel n="04" title="Build a House" />
              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
                <div className="space-y-2">
                  <Tile
                    src={PLAYER_SET_TIMBER}
                    alt="A player set with timber pieces."
                    onOpen={openLightbox}
                    aspect="aspect-[4/3]"
                  />
                  <p className="text-xs text-neutral-400 text-center">Collect timber</p>
                </div>
                <span className="hidden md:block text-2xl text-neutral-600 text-center">+</span>
                <div className="space-y-2">
                  <Tile
                    src={TIMBER_HOUSE}
                    alt="Eight timber pieces and a rooftop assembled into a house."
                    onOpen={openLightbox}
                    aspect="aspect-[4/3]"
                  />
                  <p className="text-xs text-neutral-400 text-center">8 timber + rooftop</p>
                </div>
                <span className="hidden md:block text-2xl text-neutral-600 text-center">=</span>
                <div className="space-y-2">
                  <Tile
                    src={HOUSE_ON_BOARD}
                    alt="House placed on an Empty Site block, earning one point."
                    onOpen={openLightbox}
                    aspect="aspect-[4/3]"
                  />
                  <p className="text-xs text-neutral-400 text-center">House on an Empty Site = 1 point</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 max-w-3xl">
                Timber pieces stack together with a slot. Eight timber assembled with
                a rooftop piece become a tiny house, and placing it on any Empty Site
                block earns one winning point.
              </p>
            </div>

            {/* Step 5: Win */}
            <div className="space-y-4 max-w-3xl">
              <StepLabel n="05" title="Hold Three Points to Win" />
              <p className="text-sm text-neutral-300">
                Two bonus points sit alongside houses: one for the longest road and
                one for planting the most seeds. Only the current leader holds them,
                and they can be taken by anyone who overtakes. The moment a player
                holds three winning points at once, from houses or bonuses, the game
                ends.
              </p>
            </div>
          </section>
        </SectionFadeOnScroll>
<Divider />
        {/* 05 / Village block */}
        <SectionFadeOnScroll imageUrls={[RESIN_FACTORY]}>
          <section className="space-y-6">
   
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <h2 className="text-xl font-semibold tracking-tight">
                The Village at the Centre
              </h2>
              <p className="text-sm text-neutral-300">
                The centre block carries Kaingaroa Village itself. A wood panel with a
                rich wood eye grain represents the heart of the forest, and a
                transparent resin print of the KLC factory sits on top of it, setting
                the mark of the community&apos;s own industry directly into the heart
                of the board.
              </p>
            </div>
                     <Tile
              src={RESIN_FACTORY}
              alt="The resin KLC factory model set into the centre block of the gameboard."
              onOpen={openLightbox}
              aspect="aspect-[16/5]"
            />
          </section>
        </SectionFadeOnScroll>
<Divider />
        {/* 06 / Design development */}
        <SectionFadeOnScroll imageUrls={[SKETCH, RHINO_ISO, RULE_BOARD, ...MINI_CARDS]}>
          <section className="space-y-10">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight">Design Development</h2>
              <p className="text-sm text-neutral-300">
                The concept started from one question: what if the forest had to be
                earned, not just crossed? Early sketches set out the grid, the outer
                ring and the village centre. Before making anything physical, we built
                a 1:1 digital model in Rhino to test materials, measure dimensions, and
                export directly to laser cutting and 3D printing.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Tile
                  src={SKETCH}
                  alt="Early sketch of the gameboard and game components."
                  onOpen={openLightbox}
                  aspect="aspect-[3/3.5]"
                  position="50% 30%"
                />
                <p className="text-xs text-neutral-400 text-center">Initial sketch</p>
              </div>
              <div className="space-y-2">
                <Tile
                  src={RHINO_ISO}
                  alt="Isometric view of the Rhino model."
                  onOpen={openLightbox}
                  aspect="aspect-[3/3.5]"
                />
                <p className="text-xs text-neutral-400 text-center">Isometric view, Rhino model</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                Game Rule Board
              </h3>
              <Tile
                src={RULE_BOARD}
                alt="Game rule board for players."
                onOpen={openLightbox}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                Player&apos;s Mini Cards
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {MINI_CARDS.map((src, i) => (
                  <Tile
                    key={src}
                    src={src}
                    alt={`Player's mini card ${i + 1}.`}
                    onOpen={openLightbox}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-500">
                Graphics made in Rhino, Illustrator and InDesign.
              </p>
            </div>
          </section>
        </SectionFadeOnScroll>
<Divider />
        {/* 07 / Making */}
        <SectionFadeOnScroll imageUrls={PROCESS.map((p) => p.src)}>
          <section className="space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight">Idea to Object</h2>
              <p className="text-sm text-neutral-300">
                Each of the 81 timber blocks, one for every cell of the 9x9 grid, was
                burnt by hand to bring the ahi k&#x101; concept into the material
                itself, not just the graphics.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROCESS.map((step, i) => (
                <div key={step.title} className="space-y-3">
                  <Tile
                    src={step.src}
                    alt={step.title}
                    onOpen={openLightbox}
                    aspect="aspect-[4/5]"
                  />
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                      <span className="font-mono mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {step.title}
                    </p>
                    <p className="text-xs text-neutral-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-neutral-300 max-w-3xl">
              Every block was chosen and placed by its grain. Heavier walnut plywood
              grain sits around the outer ring, marking the boundary of the forest,
              while smoother basswood fills the inner 7x7 where the game is played.
              The four ports and the village are marked by wood eyes, and every block
              alternates grain direction so the board reads as a woven texture rather
              than a flat surface.
            </p>
          </section>
        </SectionFadeOnScroll>
<Divider />
        {/* 08 / Game day + reflection */}
        <SectionFadeOnScroll imageUrls={GAMEDAY}>
          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Game Day</h2>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                14 August 2026
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {GAMEDAY.map((src, i) => (
                <Tile
                  key={src}
                  src={src}
                  alt={`Game day, 14 August 2026, photo ${i + 1}.`}
                  onOpen={openLightbox}
                  aspect="aspect-[4/3]"
                  position="100% 30%"
                />
              ))}
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Reflection
                </h3>
                <p className="text-sm text-neutral-300">
                  The game moved from a set of trivia cards into a complete object.
                  Borrowing Catan&apos;s resource and road economy gave it a clear
                  structure, and our forest and chance layer let the six kupu matua
                  themes sit naturally inside the play rather than feeling like a quiz
                  bolted onto a board.
                </p>
                <p className="text-sm text-neutral-300">
                  The physical design carried as much meaning as the rules. Burning,
                  cleaning and oiling all 81 blocks by hand, placing grain with intent,
                  and setting the KLC factory into the village block turned ahi k&#x101;
                  into something players actually hold.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  Next Iteration
                </h3>
                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="border-t border-white/15 pt-3">
                    <span className="font-medium text-neutral-100">Resource balance.</span>{" "}
                    Road cost, harvest yield and port penalties need more playtesting so
                    no single path becomes the obvious best choice.
                  </li>
                  <li className="border-t border-white/15 pt-3">
                    <span className="font-medium text-neutral-100">Fair seeding.</span>{" "}
                    Fully random placement can leave one corner closer to good
                    resources than another.
                  </li>
                  <li className="border-t border-white/15 pt-3">
                    <span className="font-medium text-neutral-100">Weight of knowledge.</span>{" "}
                    A correct answer should reward timber or count toward a winning
                    point, giving the research behind the six themes a real stake in
                    who wins.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </SectionFadeOnScroll>

        {/* Back to top */}
        <SectionFadeOnScroll>
          <div className="flex justify-center pb-12">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full border border-white/15 px-5 py-2 text-xs font-medium text-neutral-100 hover:bg-white/10 transition"
            >
              &#8593; Back to top
            </button>
          </div>
        </SectionFadeOnScroll>
      </div>

      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
      />
    </main>
  );
}