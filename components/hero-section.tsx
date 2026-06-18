"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, TorusKnot, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useReducedMotion } from "motion/react";
import AnimatedButton from "./animated-button";
import * as THREE from "three";

// ── Camera: starts close, pulls back as user scrolls ──
function CameraRig({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current = [(e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2];
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  useFrame(() => {
    const p = scroll.current;
    const [mx, my] = mouse.current;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 - p * 2.5, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.8, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -p * 1.2 + my * 0.5, 0.04);
  });
  return null;
}

// ── Hero sphere: large, distorted, emissive ───────────
function HeroSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.08;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.6, 6]} />
      <MeshDistortMaterial
        color="#7a5fff"
        distort={0.45}
        speed={2}
        roughness={0.0}
        metalness={0.8}
        emissive="#4020cc"
        emissiveIntensity={0.9}
        wireframe={false}
      />
    </mesh>
  );
}

// ── Teal orbit ────────────────────────────────────────
function TealOrbit() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.22;
    ref.current.rotation.z = t * 0.14;
  });
  return (
    <TorusKnot ref={ref} args={[3.6, 0.055, 300, 16, 2, 3]}>
      <meshStandardMaterial color="#27d7c4" emissive="#27d7c4" emissiveIntensity={1.2} roughness={0.0} metalness={1} />
    </TorusKnot>
  );
}

// ── Blue ring ─────────────────────────────────────────
function BlueRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
    ref.current.rotation.x = t * -0.08;
  });
  return (
    <TorusKnot ref={ref} args={[4.8, 0.028, 220, 10, 3, 5]}>
      <meshStandardMaterial color="#4d7cff" emissive="#4d7cff" emissiveIntensity={0.8} roughness={0} metalness={1} transparent opacity={0.7} />
    </TorusKnot>
  );
}

// ── 3000-star field ───────────────────────────────────
function Stars() {
  const pos = useMemo(() => {
    const a = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      a[i * 3] = (Math.random() - 0.5) * 60;
      a[i * 3 + 1] = (Math.random() - 0.5) * 60;
      a[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    return a;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.008;
  });
  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a090ff" size={0.05} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

// ── Scene ─────────────────────────────────────────────
function Scene({ scroll }: { scroll: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[6, 6, 8]} intensity={4} color="#8a6cff" />
      <pointLight position={[-8, -4, 4]} intensity={3} color="#27d7c4" />
      <pointLight position={[4, -6, 10]} intensity={1.5} color="#4d7cff" />
      <CameraRig scroll={scroll} />
      <Stars />
      <HeroSphere />
      <TealOrbit />
      <BlueRing />
      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.15} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>
    </>
  );
}

// ── Text overlay ──────────────────────────────────────
function HeroText({ ready }: { ready: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "1.5rem",
        }}
      >
        Web design studio
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          margin: "0 0 1.5rem",
          background: "linear-gradient(135deg, #ffffff 0%, #c4b5ff 45%, #27d7c4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        We build<br />extraordinary<br />websites.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontSize: "clamp(1rem, 2.2vw, 1.125rem)",
          color: "rgba(255,255,255,0.55)",
          maxWidth: "40ch",
          lineHeight: 1.65,
          marginBottom: "2.5rem",
        }}
      >
        Flat-fee builds. Monthly retainer. Real results for real businesses.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex gap-4 pointer-events-auto"
      >
        <AnimatedButton href="/contact" variant="primary">Get a free quote</AnimatedButton>
        <AnimatedButton href="/work" variant="outline">See our work</AnimatedButton>
      </motion.div>
    </div>
  );
}

// ── Exported hero ─────────────────────────────────────
export default function HeroSection() {
  const reduce = useReducedMotion();
  const scroll = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    const fn = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 2));
      scroll.current = p;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); clearTimeout(timer); };
  }, []);

  return (
    <section
      className="relative h-[300vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {!reduce && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 65 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
            dpr={[1, 2]}
            style={{ position: "absolute", inset: 0 }}
            aria-hidden="true"
          >
            <Scene scroll={scroll} />
          </Canvas>
        )}
        <HeroText ready={ready} />

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s 1s" }}
          aria-hidden="true"
        >
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
