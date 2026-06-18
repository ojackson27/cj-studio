"use client";

import { useState, useRef, lazy, Suspense } from "react";
import CinematicScroll from "./cinematic-scroll";
import CinematicTypography from "./cinematic-typography";

const Hero3D = lazy(() => import("./hero-3d"));

export default function CinematicSection() {
  const [progress, setProgress] = useState(0);
  const scrollProgressRef = useRef(0);

  const handleProgress = (p: number) => {
    scrollProgressRef.current = p;
    setProgress(p);
  };

  return (
    <CinematicScroll onScrollProgress={handleProgress}>
      <Suspense fallback={null}>
        <Hero3D scrollProgress={scrollProgressRef} />
      </Suspense>
      <CinematicTypography scrollProgress={progress} />
    </CinematicScroll>
  );
}
