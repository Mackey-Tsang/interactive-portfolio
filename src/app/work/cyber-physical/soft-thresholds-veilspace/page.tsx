"use client";

import React, { useRef } from "react";

export default function SoftThresholdsVeilspacePage() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-dvh w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-14 space-y-16 md:space-y-20">
        {/* ---------------- INTRO ---------------- */}
        <section className="space-y-4 md:space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
            A responsive installation exploring spatial intimacy and digital-material interplay
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Soft Thresholds - Veilspace
          </h1>
          <p className="max-w-1xl text-sm md:text-base text-neutral-200 leading-relaxed">
            Soft Thresholds - Veilspace is a 1:1 interactive architectural installation that 
            explores how space can emotionally respond to the presence of a user. It blends 
            physical materials, sensors, and digital visuals to create a quiet retreat. 
            This is a protective threshold between self and the public realm. The project 
            invites the user to pause, enter, and be embraced.
          </p>
        </section>

        {/* ---------------- YOUTUBE VIDEO ---------------- */}
        <section id="video-section" className="space-y-4">
 <div className="relative mx-auto w-1/2 aspect-9/14 overflow-hidden border border-white/20 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
        <iframe
          src="https://www.youtube.com/embed/4ozxaxrWmuc"
          title="Soft Thresholds - Veilspace"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      
          </div>
        </section>

        {/* ---------------- DIVIDER ---------------- */}
        <hr className="border-neutral-800" />

        {/* ---------------- CONCEPT SECTION ---------------- */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* 3 stacked images */}
          <div className="space-y-4">
           <div className="relative w-full h-[700px]">
  <img
    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p6.JPG?raw=true"
    className="absolute top-0 left-[10%] w-[400px] rounded-2xl shadow-xl"
  />

  <img
    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p5.jpeg?raw=true"
    className="absolute top-[400px] w-[300px] rounded-2xl shadow-xl z-20"
  />

  <img
    src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p7.png?raw=true"
    className="absolute top-[450px] left-[60%] w-[200px] rounded-2xl shadow-lg z-30"
  />
</div>
          </div>

          {/* Text on right */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-medium tracking-wide">
              Concept & Theory
            </h2>
             <ul className="list-disc list-outside pl-5 space-y-2">
        <li>This project focuses on emotional protection, not physical defense.</li>
        <li>It responds to subtle human gestures like sitting or leaning back.</li>
        <li>Inspired by Gaston Bachelard’s idea that “the house shelters daydreaming.”</li>
        <li>Architecture becomes a soft layer, like clothing, not just enclosure (William Mitchell).</li>
        <li>The goal is to offer gentle, respectful feedback, not command attention.</li>
        <li>Influences include: Hylozoic Ground, Lotus Dome, Refuge Wear, and The Rain Room.</li>
        <li>The installation respects stillness and offers privacy without isolation.</li>
      </ul>
          </div>
        </section>

        {/* ---------------- DIVIDER ---------------- */}
        <hr className="border-neutral-800" />

        {/* ---------------- 5 INTERACTIVE STATES ---------------- */}
<section className="space-y-8 md:space-y-10">
  <div className="flex items-baseline justify-between gap-4">
    <h2 className="mx-auto text-xl md:text-2xl lg:text-3xl font-semibold ">
      Five Interactive States
    </h2>
  </div>

  <div className="space-y-8 md:space-y-10">

    {/* ---------------------- STATE 1 ---------------------- */}
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-neutral-800/70 rounded-xl p-4 md:p-5">
      
      {/* Left Image */}
      <div className="basis-1/4">
        <div className="aspect-4/5-full overflow-hidden rounded-lg bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p17.JPG?raw=true"
            alt="Interactive State 1 — Left"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <div className="basis-1/2 flex flex-col gap-3 md:gap-4">
        <div>
          <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase text-neutral-200 underline">
            Stage 1 - Approach
          </h3>
        </div>

        <div className="grid gap-10 md:grid-cols-2 text-xs md:text-sm text-neutral-300">
          <div>
            <p className="font-medium text-neutral-200">User Approach Detected</p>
            <p className="mt-1 leading-relaxed">
              An ultrasonic or PIR sensor detects a person nearby and activates the Tapo smart plug, turning on the motors.
            </p>
          </div>

          <div>
            <p className="mt-1 leading-relaxed pr-5">
              Screen shows a clear, real-time view of the space behind the monitor. It acts as a transparent digital surface
            </p>
            <p className="mt-10 leading-relaxed pr-5">
              screen begins to reveal the live feed slightly. As the fabric slowly goes upward on the side
            </p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="basis-1/4">
        <div className="aspect-4/5-full overflow-hidden rounded-lg bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p3.png?raw=true"
            alt="Interactive State 1 — Right"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* ---------------------- STATE 2 ---------------------- */}
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-neutral-800/70 rounded-xl p-4 md:p-5">
      
      <div className="basis-1/4">
        <div className="aspect-4/5-full overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p1.JPG?raw=true" 
          alt="State 2 — Left" 
          className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="basis-1/2 flex flex-col gap-3 md:gap-4">
        <div>
          <h3 className="text-sm md:text-base font-semibold tracking-wide uppercase text-neutral-200 underline">
            Stage 2 - Arrival
          </h3>
        </div>

        <div className="grid gap-10 md:grid-cols-2 text-xs md:text-sm text-neutral-300">
          <div>
            <p className="font-medium text-neutral-200">User sits </p>
            <p className="font-medium mt-3 text-neutral-200">Seat sensor activates </p>
            <p className="font-medium mt-3 text-neutral-200">Fabric begins to drop </p>
            <p className="mt-3 leading-relaxed">Sitting on the chair triggers the seat sensor, starting the fabric system that lowers the veil and blurs the screen.</p>
          </div>
          <div>
            <p className="mt-1 leading-relaxed pr-5">As the translucent fabric reaches the bottom, the blurred feed slowly fades into a pre-recorded video of a working space creating the illusion that the user has entered a focused personal zone.</p>
          </div>
        </div>
      </div>

      <div className="basis-1/4">
        <div className="aspect-4/5 w-full overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p18.png?raw=true" 
          alt="State 2 — Right" 
          className="h-full w-full object-cover" />
        </div>
      </div>
    </div>

    {/* ---------------------- STATE 3 ---------------------- */}
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-neutral-800/70 rounded-xl p-4 md:p-5">
      <div className="basis-1/4">
        <div className="aspect-4/5-full overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p16.JPG?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="basis-1/2 flex flex-col gap-3 md:gap-4">
        <h3 className="text-sm md:text-base font-semibold uppercase text-neutral-200 underline">Stage 3 - Retreat</h3>

        <div className="grid gap-10 md:grid-cols-2 text-xs md:text-sm text-neutral-300">
          <div>
            <p className="font-medium">User leans back</p>
            <p className="font-medium mt-3">Back sensor activates</p>
            <p className="mt-3">Sitting on the chair triggers the seat sensor, starting the change the screen to relaxing scene.</p>
            </div>
          <div><p className="mt-1 pr-5">Working space fades out. A new scene fades in, an outdoor relaxation setting viewed from just beyond the window of the working space</p></div>
        </div>
      </div>

      <div className="basis-1/4">
        <div className="aspect-4/5 overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p19.png?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>

    {/* ---------------------- STATE 4 ---------------------- */}
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-neutral-800/70 rounded-xl p-4 md:p-5">
      <div className="basis-1/4">
        <div className="aspect-4/5 w-full overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p15.JPG?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="basis-1/2 flex flex-col gap-3 md:gap-4">
        <h3 className="text-sm md:text-base font-semibold uppercase text-neutral-200 underline">Stage 4 - Re-engagement</h3>

        <div className="grid gap-10 md:grid-cols-2 text-xs md:text-sm text-neutral-300">
          <div><p className="font-medium">User sits upright</p><p className="font-medium mt-3">Back sensor disengages</p><p className="mt-3">Returning to an upright posture and changes the screen back to the working scene.</p></div>
          <div><p className="mt-1 pr-5">Relaxing outdoor scene begins to fade out. The working space video fades back in, indicating renewed presence and partial focus</p></div>
        </div>
      </div>

      <div className="basis-1/4">
        <div className="aspect-4/5 overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p18.png?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>

    {/* ---------------------- STATE 5 ---------------------- */}
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-neutral-800/70 rounded-xl p-4 md:p-5">
      <div className="basis-1/4">
        <div className="aspect-4/5 w-full overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p17.JPG?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="basis-1/2 flex flex-col gap-3 md:gap-4">
        <h3 className="text-sm md:text-base font-semibold uppercase text-neutral-200 underline">Stage 5 - Departure</h3>

        <div className="grid gap-10 md:grid-cols-2 text-xs md:text-sm text-neutral-300">
          <div><p className="font-medium">Both sensors disengaged</p><p className="font-medium mt-3">Fabric returns to top</p><p className="mt-3">When no presence is detected for 15 minutes, the system powers off automatically to protect the motors.</p></div>
          <div><p className="mt-1 pr-5">Video fades out and the screen returns to a sharp, live video of the actual space behind it. Fabric rolls back up to its original position. The digital system resets to an idle state, ready for the next interaction</p></div>
        </div>
      </div>

      <div className="basis-1/4">
        <div className="aspect-4/5 overflow-hidden rounded-lg bg-neutral-900">
          <img src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p2.png?raw=true" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>

  </div>
</section>


        {/* ---------------- DIVIDER ---------------- */}
        <hr className="border-neutral-800" />

        {/* ---------------- DIGITAL TWIN ---------------- */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Text left */}
          <div className="space-y-4 md:space-y-6 pr-20">
            <h2 className="text-lg md:text-xl font-medium tracking-wide">
              Digital Twin (Unity)
            </h2>
            <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
              A live video feed from a mounted GoPro, positioned behind the monitor, acts as a digital backdrop. As the fabric moves, the Unity system dynamically alters this display.
            </p>
            <ul className="text-sm md:text-base text-neutral-300 leading-relaxed list-disc list-inside">
              <li><strong>Sit</strong> → fabric descends, screen blurs and transitions to a "working" space video</li>
              <li><strong>Lean back</strong> → screen fades to an "outdoor relaxing" space</li>
              <li><strong>Leave</strong> → fabric rolls up and digital view returns to live feed</li>
            </ul>
          </div>

          {/* Image right */}
          <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-900">
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p20.JPG?raw=true"
              alt="Digital twin / control interface"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* ---------------- DIVIDER ---------------- */}
        <hr className="border-neutral-800" />

        {/* ---------------- 6 SHOWCASE IMAGES + TEXT ---------------- */}
        {/* 6 SHOWCASE IMAGES + TEXT */}
<section className="space-y-8 md:space-y-10">
  <div className="flex items-baseline justify-between gap-4">
    <h2 className="text-lg md:text-xl font-medium tracking-wide">
      Final Showcase
    </h2>
    <p className="text-xs md:text-sm text-neutral-400">
      A selection of frames captured from the live interactive installation.
    </p>
  </div>

  <div className="mx-auto w-full space-y-4 md:space-y-6">
    {/* Row 1 – Landscape */}
    <div className="w-full">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
        <img
          src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p11.JPG?raw=true"
          alt="Showcase 1"
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    {/* Row 2 – Two Portraits */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="w-full">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p10.JPG?raw=true"
            alt="Showcase 2"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p9.jpg?raw=true"
            alt="Showcase 3"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Row 3 – Landscape */}
    <div className="w-full">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
        <img
          src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p14.JPG?raw=true"
          alt="Showcase 4"
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    {/* Row 4 – Two Portraits */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="w-full">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p12.jpg?raw=true"
            alt="Showcase 5"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-neutral-900">
          <img
            src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p13.jpg?raw=true"
            alt="Showcase 6"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Text under the 6 images */}
  <div className="mx-auto w-full space-y-2">
    <h3 className="text-lg md:text-xl font-medium tracking-wide">
      Physical Setup
    </h3>
    <div className="text-xs md:text-sm text-neutral-300 leading-relaxed">
      <p>The physical setup of Soft Thresholds - Veilspace centers around a full-scale interactive 
        structure designed for sensitivity, comfort, and architectural clarity. A Charles Ray 
        Eames-style RAR rocking chair forms the anchor of the experience. It was chosen not only for 
        its elegant, modernist form and white neutral tone but also for its functional relevance: unlike 
        regular chairs, it encourages two distinct postures, upright and reclined, which are crucial for 
        triggering the different spatial states. Two force-sensitive resistors (FSRs) are affixed with duct 
        tape to the seat and backrest, slightly offset from the center to better align with natural human 
        weight distribution. These are cushioned with soft insulation foam for both comfort and durability, 
        then wrapped in a stretchable fabric cover to blend seamlessly with the chair’s surface.</p>
        
      <p className="mt-3"> Above the user, a 4.5-meter-long U-shaped steel tube (20mm diameter) is suspended to carry the 
          weight of a wide fabric curtain. This tube connects at both ends to a TV wall-mount via L-shaped 
          aluminum brackets, ensuring that the structural load is directed to the floor instead of stressing 
          the screen. A centrally positioned C-stand further supports the middle of the steel tube, distributing 
          the weight evenly across the system. However, due to the fabric needing to attach to a thinner 3mm steel 
          rod for movement, a vertical steel handle was fixed onto a wooden platform to allow the C-stand clamp to 
          support this section without obstruction.</p>
          
        <p className="mt-3"> The fabric is secured at two points: whipstitched to the upper steel tube where it 
          remains stationary, and backstitched to a thinner steel rod at the bottom which moves vertically via stepper 
          motors. Initially, the sagging fabric made entry difficult, so a secondary 1mm U-shaped rod was sewn midway 
          across the fabric. Rings were added to redirect tension via pulley lines, helping maintain balance and alignment 
          during movement. Adjustments to pulley height at the central point further redistributed weight to ensure 
          smoother lifting. Altogether, this structure balances rigidity and lightness, using accessible components 
          to enable dynamic transformation while protecting the integrity of the surrounding digital hardware.</p>
    </div>
  </div>
</section>


        {/* ---------------- DIVIDER ---------------- */}
        <hr className="border-neutral-800" />

        {/* ---------------- BIG IMAGE + WATCH BUTTON ---------------- */}
        <section className="space-y-6 md:space-y-8 pb-8 md:pb-12">
      
            <img
              src="https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p4.jpg?raw=true"
              alt="Soft Thresholds hero image"
              className="h-full w-full object-cover"
            />

          <div className="flex justify-center">
<button
  onClick={() => {
    const el = document.getElementById("video-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }}
  className="mt-10 px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
>
  Watch in Action
</button>

          </div>
        </section>
      </div>
    </main>
  );
}
