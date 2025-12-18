"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

// --- UTILS ---
const spread = (scale = 0.5) => (Math.random() - 0.5) * scale;

// --- SHAPE GENERATORS ---

// 1. Cosmic Vortex
const getCosmicVortex = (t: number) => {
  const r = (1 - t) * 4;
  const theta = t * Math.PI * 16;
  const x = r * Math.cos(theta) + spread(r * 0.2);
  const y = r * Math.sin(theta) + spread(r * 0.2);
  const z = (t - 0.5) * 6 + spread(0.5);
  return new THREE.Vector3(x, y, z);
};

// 2. Rose Curve (Enlarged)
const getRoseCurve = (t: number) => {
  const k = 4;
  const theta = t * Math.PI * 2 * 3;
  const r = Math.cos(k * theta) * 4.5; // Enlarged from 3 to 4.5
  const x = r * Math.cos(theta) + spread(0.5);
  const y = r * Math.sin(theta) + spread(0.5);
  const z = (t - 0.5) * 2 + spread(0.5);
  return new THREE.Vector3(x, y, z);
};

// 3. Bernoulli Lemniscate
const getBernoulliLemniscate = (t: number) => {
  const theta = t * Math.PI * 2;
  const scale = 3.5;
  const den = 1 + Math.sin(theta) ** 2;
  const x = (scale * Math.cos(theta)) / den + spread(0.5);
  const y = (scale * Math.sin(theta) * Math.cos(theta)) / den + spread(0.5);
  const z = (Math.random() - 0.5) * 1.5 + spread(0.5);
  return new THREE.Vector3(x, y, z);
};

// 4. Butterfly Curve
const getButterflyCurve = (t: number) => {
  const theta = t * Math.PI * 12;
  const r =
    Math.exp(Math.cos(theta)) -
    2 * Math.cos(4 * theta) -
    Math.pow(Math.sin(theta / 12), 5);
  const scale = 1.5;
  const x = Math.sin(theta) * r * scale + spread(0.3);
  const y = Math.cos(theta) * r * scale + spread(0.3);
  const z = Math.cos(theta * 2) * 1 + spread(0.5);
  return new THREE.Vector3(x, y, z);
};

// 5. Lissajous Knot (3D)
const getLissajousKnot = (t: number) => {
  const theta = t * Math.PI * 20; // Multiple loops
  const A = 3.5, B = 3.5, C = 3.5;
  const a = 3, b = 4, c = 7; // Frequency ratios
  const x = A * Math.sin(a * theta + Math.PI / 2) + spread(0.4);
  const y = B * Math.sin(b * theta) + spread(0.4);
  const z = C * Math.sin(c * theta) + spread(0.4);
  return new THREE.Vector3(x, y, z);
};

// 6. Torus Knot (Enlarged)
const getTorusKnot = (t: number) => {
  const theta = t * Math.PI * 2 * 10; // winding
  const p = 2, q = 3;
  const r = 0.8 * (2 + Math.cos(q * theta)); // Enlarged multiplier
  const x = (3 * r * Math.cos(p * theta)) / 2 + spread(0.2);
  const y = (3 * r * Math.sin(p * theta)) / 2 + spread(0.2);
  const z = (2.0 * Math.sin(q * theta)) + spread(0.2); // Enlarged Z depth
  return new THREE.Vector3(x, y, z);
};

// 7. Möbius Strip (Enlarged)
const getMobiusStrip = (t: number) => {
  // t -> u, v
  const u = t * Math.PI * 2;
  const v = (Math.random() - 0.5) * 1.5; // Width
  const R = 4.0; // Enlarged Radius from 2.5 to 4.0
  const x = (R + v * Math.cos(u / 2)) * Math.cos(u) + spread(0.1);
  const y = (R + v * Math.cos(u / 2)) * Math.sin(u) + spread(0.1);
  const z = v * Math.sin(u / 2) + spread(0.1);
  return new THREE.Vector3(x, y, z);
};

// 8. Klein Bottle (Enlarged)
const getKleinBottle = (t: number) => {
  const u = t * Math.PI * 2; 
  const v = Math.random() * Math.PI * 2;
  const r = 4 - 2 * Math.cos(u);
  
  // Parametric equations for 'Figure 8' Klein Bottle
  let x, y, z;
  if (u < Math.PI) {
      x = 6 * Math.cos(u) * (1 + Math.sin(u)) + 4 * r * Math.cos(u) * Math.cos(v);
      y = 16 * Math.sin(u) + 4 * r * Math.sin(u) * Math.cos(v);
  } else {
      x = 6 * Math.cos(u) * (1 + Math.sin(u)) - 4 * r * Math.cos(v);
      y = 16 * Math.sin(u);
  }
  z = 4 * r * Math.sin(v);
  
  const scale = 0.25; // Enlarged from 0.15 to 0.25
  return new THREE.Vector3(x * scale + spread(0.2), y * scale + spread(0.2), z * scale + spread(0.2));
};

// 9. Helicoid (Enlarged)
const getHelicoid = (t: number) => {
  // u range 0..2pi, v range -1..1
  const u = t * Math.PI * 6; // 3 turns
  const v = (Math.random() - 0.5) * 6; // Widened from 4 to 6
  const x = v * Math.cos(u) + spread(0.2);
  const y = v * Math.sin(u) + spread(0.2);
  const z = u * 0.8 - 4 + spread(0.2);
  const scale = 1.3; // Global scale up
  return new THREE.Vector3(x * scale, y * scale, z * scale);
};

// 10. Enneper Surface (Enlarged)
const getEnneperSurface = (t: number) => {
  // u, v approx -2 to 2
  const range = 2;
  const u = (t - 0.5) * 2 * range; // Map 0..1 to -2..2
  const v = (Math.random() - 0.5) * 2 * range;

  const x = u - (u ** 3) / 3 + u * (v ** 2);
  const y = v - (v ** 3) / 3 + v * (u ** 2);
  const z = u ** 2 - v ** 2;
  const scale = 2.2; // Enlarged from 1.5 to 2.2
  return new THREE.Vector3(x * scale, y * scale, z * scale);
};

// 11. Phyllotaxis (Golden Angle Sphere)
const getPhyllotaxis = (t: number) => {
  const theta = Math.PI * t * Math.sqrt(PARTICLE_COUNT); // Approximate golden angle dist
  const phi = Math.acos(1 - 2 * t); 
  const r = 4;
  
  const x = r * Math.sin(phi) * Math.cos(theta) + spread(0.2);
  const y = r * Math.sin(phi) * Math.sin(theta) + spread(0.2);
  const z = r * Math.cos(phi) + spread(0.2);
  return new THREE.Vector3(x, y, z);
};

// 12. Superquadric (Enlarged)
const getSuperquadric = (t: number) => {
  // Map t to u, v spherical
  const u = (Math.random() - 0.5) * Math.PI; // -pi/2 to pi/2
  const v = Math.random() * Math.PI * 2 - Math.PI; // -pi to pi
  const r = 5.0; // Enlarged from 3.5 to 5.0
  const e = 0.5; // Sharpness
  
  const sign = (val: number) => (val >= 0 ? 1 : -1);
  const abs = Math.abs;
  const cos = Math.cos;
  const sin = Math.sin;

  const x = r * sign(cos(u)) * abs(cos(u)) ** e * sign(cos(v)) * abs(cos(v)) ** e;
  const y = r * sign(cos(u)) * abs(cos(u)) ** e * sign(sin(v)) * abs(sin(v)) ** e;
  const z = r * sign(sin(u)) * abs(sin(u)) ** e;

  return new THREE.Vector3(x + spread(0.2), y + spread(0.2), z + spread(0.2));
};

// 13. Fermat's Spiral
const getFermatSpiral = (t: number) => {
  const theta = t * Math.PI * 20; 
  const r = 0.8 * Math.sqrt(theta);
  const x = r * Math.cos(theta) + spread(0.2);
  const y = r * Math.sin(theta) + spread(0.2);
  const z = (Math.random() - 0.5) * 1 + spread(0.2); // Flat-ish
  return new THREE.Vector3(x, y, z);
};

// --- CONFIG ---

const SHAPES = [
  { name: "Cosmic Vortex", fn: getCosmicVortex },
  { name: "Lissajous Knot", fn: getLissajousKnot },
  { name: "Phyllotaxis Sphere", fn: getPhyllotaxis },
  { name: "Torus Knot", fn: getTorusKnot },
  { name: "Rose Curve", fn: getRoseCurve },
  { name: "Möbius Strip", fn: getMobiusStrip },
  { name: "Superquadric Star", fn: getSuperquadric },
  { name: "Enneper Surface", fn: getEnneperSurface },
  { name: "Klein Bottle", fn: getKleinBottle },
  { name: "Helicoid", fn: getHelicoid },
  // Removed Logarithmic Spiral
  { name: "Fermat's Spiral", fn: getFermatSpiral },
  { name: "Butterfly Curve", fn: getButterflyCurve },
  { name: "Bernoulli Lemniscate", fn: getBernoulliLemniscate },
];

const PARTICLE_COUNT = 30000;

export default function ThreeVortex() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // State
  const [shapeIndex, setShapeIndex] = useState(0);
  const shapeIndexRef = useRef(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Sync Ref
  useEffect(() => {
    shapeIndexRef.current = shapeIndex;
  }, [shapeIndex]);

  // Timer Logic
  const resetSwapTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isDragging.current) {
        setShapeIndex((prev) => (prev + 1) % SHAPES.length);
      }
    }, 8000);
  }, []);

  // Init Timer
  useEffect(() => {
    resetSwapTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetSwapTimer]);

  // --- THREE.JS INIT ---
  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear Container
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLES
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.2, "rgba(200, 240, 255, 0.8)");
        grad.addColorStop(0.5, "rgba(64, 150, 255, 0.2)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);
    const randomArray = new Float32Array(PARTICLE_COUNT);
    const mixArray = new Float32Array(PARTICLE_COUNT);

    const color1 = new THREE.Color(0x00ffff);
    const color2 = new THREE.Color(0xff00ff);
    const color3 = new THREE.Color(0xffffff);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const mix = Math.random();
      mixArray[i] = mix;
      randomArray[i] = Math.random();

      // Init colors
      const mixedColor = mix > 0.8 ? color3 : color1.clone().lerp(color2, mix);
      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomArray, 1));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      map: createParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- ANIMATION ---
    let frameId = 0;
    let time = 0;
    const scratchColor1 = new THREE.Color();
    const scratchColor2 = new THREE.Color();
    const scratchColor3 = new THREE.Color(0xffffff);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.005;

      // Current shape logic
      const currentShape = SHAPES[shapeIndexRef.current];
      const positions = geometry.attributes.position.array as Float32Array;
      const colors = geometry.attributes.color.array as Float32Array;
      const randomness = geometry.attributes.aRandom.array as Float32Array;

      // Drag dampening
      rotation.current.x += (targetRotation.current.x - rotation.current.x) * 0.05;
      rotation.current.y += (targetRotation.current.y - rotation.current.y) * 0.05;

      // FASTER SELF ROTATION (0.2 -> 0.4)
      particles.rotation.x = rotation.current.x + Math.sin(time * 0.2) * 0.1;
      particles.rotation.y = rotation.current.y + time * 0.4; 

      // COLOR CYCLE
      const hue1 = (0.5 + time * 0.2) % 1; 
      const hue2 = (0.8 + time * 0.2) % 1; 
      scratchColor1.setHSL(hue1, 0.9, 0.6);
      scratchColor2.setHSL(hue2, 0.9, 0.5);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Position Morph
        const t = i / PARTICLE_COUNT;
        const target = currentShape.fn(t);

        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];

        const lerpFactor = 0.04;
        positions[i * 3] += (target.x - px) * lerpFactor;
        positions[i * 3 + 1] += (target.y - py) * lerpFactor;
        positions[i * 3 + 2] += (target.z - pz) * lerpFactor;

        // Noise
        const r = randomness[i];
        positions[i * 3] += Math.sin(time * 5 + r * 10) * 0.003;
        positions[i * 3 + 1] += Math.cos(time * 3 + r * 10) * 0.003;
        positions[i * 3 + 2] += Math.sin(time * 4 + r * 10) * 0.003;

        // Colors
        const mix = mixArray[i];
        if (mix > 0.8) {
           colors[i*3] = scratchColor3.r;
           colors[i*3+1] = scratchColor3.g;
           colors[i*3+2] = scratchColor3.b;
        } else {
           colors[i*3] = scratchColor1.r + (scratchColor2.r - scratchColor1.r) * mix;
           colors[i*3+1] = scratchColor1.g + (scratchColor2.g - scratchColor1.g) * mix;
           colors[i*3+2] = scratchColor1.b + (scratchColor2.b - scratchColor1.b) * mix;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      
      // Update rotation based on drag
      // Drag Left (-x) -> deltaX < 0. To Rotate Left (Usually +Y or -Y depending on definition),
      // we match user request: Left Drag -> Left Rotation.
      targetRotation.current.y += deltaX * 0.005;
      
      // Drag Up (-y) -> deltaY < 0. To Rotate Up, we add the delta.
      targetRotation.current.x += deltaY * 0.005;
      
      previousMouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => { isDragging.current = false; };
  
  const handleDoubleClick = () => {
    if (!isDragging.current) {
      setShapeIndex((prev) => (prev + 1) % SHAPES.length);
      resetSwapTimer(); // Reset the timer on manual interaction
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        title="Drag to rotate, Double click to warp"
      />
    </div>
  );
}