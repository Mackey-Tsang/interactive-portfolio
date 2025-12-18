import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingSticker3DProps {
  logo: string;
  label: string;
  description: string;
  position: [number, number, number];
  scale?: number;
  onHoverChange: (hovered: boolean, data?: { label: string; description: string; x: number; y: number }) => void;
}

export default function FloatingSticker({
  logo,
  label,
  description,
  position,
  scale = 1,
  onHoverChange,
}: FloatingSticker3DProps) {
  // Load texture
  const texture = useTexture(`/logos/${logo}`);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [aspectRatio, setAspectRatio] = useState(1);

  // 1. Calculate image aspect ratio
  useEffect(() => {
    if (texture.image) {
      const img = texture.image as HTMLImageElement;
      if (img.width && img.height) {
        setAspectRatio(img.width / img.height);
      }
    }
  }, [texture]);

  // 2. Calculate dimensions
  const [width, height] = useMemo(() => {
    let w = 1;
    let h = 1;
    if (aspectRatio >= 1) {
        w = aspectRatio;
        h = 1;
    } else {
        w = 1;
        h = 1 / aspectRatio;
    }
    return [w, h];
  }, [aspectRatio]);

  const THICKNESS = 0.05; 

  // 3. Controlled Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Coin spin
      meshRef.current.rotation.y += delta * 0.2;
      // Slight wobble
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.x = 0;
    }
  });

  // Helper to get the STATIC screen position (ignores the float wobble)
  const getStaticScreenPosition = () => {
    // We use the 'position' prop which is the anchor point, 
    // instead of meshRef.getWorldPosition() which includes the float offset.
    const anchor = new THREE.Vector3(...position);
    anchor.project(camera);
    
    // Convert to CSS %
    const x = (anchor.x + 1) / 2 * 100;
    const y = -(anchor.y - 1) / 2 * 100;
    return { x, y };
  };

  // 4. Hover Logic
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    const { x, y } = getStaticScreenPosition();
    
    onHoverChange(true, { label, description, x, y });
    document.body.style.cursor = "help";
  };

  const handlePointerOut = (e: any) => {
    onHoverChange(false);
    document.body.style.cursor = "auto";
  };

  // Update position while hovering in case of scroll/resize
  // (Optional: can be removed if performance is a concern, but keeps lines attached during scroll)
  useFrame(() => {
    // We can't easily access 'hovered' state here without context, 
    // but the parent handles the position updates mostly via the static prop logic.
    // If you need the line to update *during* scroll while hovering, 
    // we would need to continuously fire onHoverChange, but that might be expensive.
    // For now, calculating on Enter is usually enough for static scenes.
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0} 
      floatIntensity={1}    
      floatingRange={[-0.1, 0.1]}
      position={position}
    >
      <group 
        ref={meshRef} 
        scale={scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Dark Plastic Body */}
        <RoundedBox args={[width, height, THICKNESS]} radius={0.02} smoothness={4}>
           <meshPhysicalMaterial 
             color="#222222" 
             roughness={0.2} 
             metalness={0.5} 
             envMapIntensity={1}
           />
        </RoundedBox>

        {/* Front Image */}
        <mesh position={[0, 0, THICKNESS / 2 + 0.001]}>
          <planeGeometry args={[width, height]} />
          <meshPhysicalMaterial 
            map={texture}
            transparent={true}
            roughness={0.3}
            metalness={0.0}
            envMapIntensity={1}
            side={THREE.FrontSide}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        {/* Back Image (Rotated) */}
        <mesh 
            position={[0, 0, -THICKNESS / 2 - 0.001]} 
            rotation={[0, Math.PI, 0]} 
        >
          <planeGeometry args={[width, height]} />
          <meshPhysicalMaterial 
            map={texture}
            transparent={true}
            roughness={0.3}
            metalness={0.0}
            envMapIntensity={1}
            side={THREE.FrontSide}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      </group>
    </Float>
  );
}

useTexture.preload("/logos/arcsec.png");
useTexture.preload("/logos/uoa.png");
useTexture.preload("/logos/photosoc.png");
useTexture.preload("/logos/huacanjiang.png");