"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export default function PhotographyScene() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (mat.current) {
      mat.current.roughness = 0.25 + Math.sin(Date.now() / 1000) * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={["#0b0b0b"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 2]} intensity={1.2} />
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1, 0.35, 256, 32]} />
          <meshStandardMaterial ref={mat} metalness={0.7} roughness={0.3} color="#cfcfcf" />
        </mesh>
      </Float>
      <Environment preset="studio" />
      <OrbitControls enablePan={false} />
    </>
  );
}
