"use client";

import * as THREE from "three";
import { Suspense, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Preload,
  ScrollControls,
  Scroll,
  useScroll,
  Image as DreiImage,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import FluidGlassCursor from "@/components/FluidGlassCursor";


// Clamp helper for scroll ranges
const rr = (d: ReturnType<typeof useScroll>, s: number, l: number) =>
  Math.max(0, Math.min(1, d.range(s, l)));

function ImageTile({ c = new THREE.Color(), ...props }: any) {
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false);
  useFrame(() => {
    const m = ref.current?.material;
    if (m?.color) m.color.lerp(c.set(hovered ? "white" : "#ccc"), hovered ? 0.4 : 0.05);
  });
  return (
    <DreiImage
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      toneMapped={false}
      {...props}
    />
  );
}

function ImagesForBuffer() {
  const { width, height } = useThree((s) => s.viewport);
  const data = useScroll();
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    const ch = group.current?.children as any[];
    if (!ch || ch.length < 7) return;
    ch[0].material.zoom = 1 + rr(data, 0, 1 / 3) / 3;
    ch[1].material.zoom = 1 + rr(data, 0, 1 / 3) / 3;
    ch[2].material.zoom = 1 + rr(data, 1.15 / 3, 1 / 3) / 3;
    ch[3].material.zoom = 1 + rr(data, 1.15 / 3, 1 / 3) / 2;
    ch[4].material.zoom = 1 + rr(data, 1.25 / 3, 1 / 3) / 1;
    ch[5].material.zoom = 1 + rr(data, 1.8 / 3, 1 / 3) / 3;
    ch[5].material.grayscale = 1 - rr(data, 1.6 / 3, 1 / 3);
    ch[6].material.zoom = 1 + (1 - rr(data, 2 / 3, 1 / 3)) / 3;
  });

  const items = useMemo(
    () => [
      { pos: [-2, 0, 0],                 scale: [4,  height,      1], url: "/architecture/p1.jpg" },
      { pos: [ 2, 0, 3],                 scale: 3,                     url: "/architecture/p2.jpg" },
      { pos: [-2.05, -height, 6],        scale: [2, 3, 1],             url: "/architecture/p3.jpg" },
      { pos: [-0.4, -height, 9],         scale: [1, 2, 1],             url: "/architecture/p4.jpg" },
      { pos: [1.3, -height, 10.5],      scale: [1.5, 4, 1],              url: "/architecture/p5.jpg" },
      { pos: [0, -height * 1.5, 7.5],    scale: [1.5, 3, 1],           url: "/architecture/p6.jpg" },
      { pos: [0, -height * 2 - height/4, 0], scale: [width, height/1.1, 1], url: "/architecture/img7.jpg" },
    ],
    [height, width]
  );

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <ImageTile key={i} position={it.pos} scale={it.scale as any} url={it.url} />
      ))}
    </group>
  );
}

/**
 * Refractable 3D titles (ONLY these will show in the glass).
 * Tweak positions/font sizes/weights to match your layout.
 * drei/Text supports CSS-like `fontWeight`: "normal" | "bold" | 100..900
 */
function TitlesForBuffer() {
  // --- ADJUST HERE ---
  const toPos: [number, number, number] = [-1.8, -0.9, 12];
  const bePos: [number, number, number] = [1, -2.5, 12];
  const homePos: [number, number, number] = [-1.9, -10, 12];

  const toSize = 0.7;
  const beSize = 0.7;
  const homeSize = 0.9;

  const weight: number | "normal" | "bold" = 800; // <— change this as you like
  // -------------------

  return (
    <>
      <Text
        position={toPos}
        fontSize={toSize}
        color="black"
        anchorX="left"
        anchorY="middle"
        fontWeight={weight}
      >
        Intersect
      </Text>

      <Text
        position={bePos}
        fontSize={beSize}
        color="black"
        anchorX="center"
        anchorY="middle"
        fontWeight={weight}
      >
        Inception
      </Text>

      <Text
        position={homePos}
        fontSize={homeSize}
        color="black"
        anchorX="left"
        anchorY="middle"
        fontWeight={weight}
      >
        Tectonic
      </Text>
    </>
  );
}

export default function ArchitectureScene() {
  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={15} />

      <ScrollControls damping={0.12} pages={3} distance={0.5}>
        {/* Nothing in the main GL layer – everything visual is in the glass buffer */}
        <Scroll>{/* empty */}</Scroll>

        {/* Fluid glass + its buffer content (images + refractable titles) */}
        <FluidGlassCursor
          planeZ={15}
          scale={0.25}
          clearColor="#ffffff"
          childrenForBuffer={
            <>
              <Scroll>
                <ImagesForBuffer />
                <TitlesForBuffer />
              </Scroll>
              <Preload all />
            </>
          }
        />

        {/* No HTML titles now, so there isn't a second text layer */}
        <Scroll html>{/* keep for other UI if needed (buttons, etc.) */}</Scroll>
      </ScrollControls>
    </Suspense>
  );
}
