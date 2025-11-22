"use client";
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO } from "@react-three/drei";
import { easing } from "maath";

type Props = {
  /** Z-plane in front of the camera to place the lens */
  planeZ?: number;          // default 15 (assumes camera at z=20 & fov=15)
  damping?: number;         // pointer follow smoothness
  scale?: number;           // lens size in world units
  clearColor?: THREE.ColorRepresentation; // FBO clear (white avoids black)
  childrenForBuffer?: React.ReactNode;    // GL content to refract
};

export default function FluidGlassCursor({
  planeZ = 15,
  damping = 0.2,
  scale = 0.25,
  clearColor = "#ffffff",
  childrenForBuffer
}: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  const fbo = useFBO();
  const { camera, gl, viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    // Compute the viewport WH at the lens Z plane (in front of the camera)
    const v = state.viewport.getCurrentViewport(state.camera, [0, 0, planeZ]);
    // Follow pointer in that plane
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * v.width) / 2, (state.pointer.y * v.height) / 2, planeZ],
      damping,
      delta
    );

    // Render the buffer scene (what the lens will refract)
    gl.setRenderTarget(fbo);
    gl.setClearColor(clearColor);
    gl.clear(true, true, true);
    gl.render(scene, state.camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {childrenForBuffer && createPortal(childrenForBuffer, scene)}

      {/* Fullscreen buffer plane (behind the lens) */}
      <mesh scale={[viewport.width, viewport.height, 1]} renderOrder={1}>
        <planeGeometry />
        <meshBasicMaterial map={fbo.texture} />
      </mesh>

      {/* The lens (always rendered on top, no depth test) */}
      <mesh ref={ref} scale={scale} rotation-x={Math.PI / 2} renderOrder={999}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshTransmissionMaterial
          buffer={fbo.texture}
          ior={1.2}
          thickness={1.6}
          anisotropy={0.1}
          chromaticAberration={0.04}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
