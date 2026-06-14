"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import CinematicScroll from "@/components/cinematic-scroll";
import CinematicTypography from "@/components/cinematic-typography";

export default function HomeClient() {
  const [cinematicProgress, setCinematicProgress] = useState(0);

  // Cinematic section is always dark — nav stays white
  const heroOpacity = Math.max(0, 1 - cinematicProgress * 25);

  return (
    <>
      <Nav onLight={false} />
      <CinematicScroll onScrollProgress={setCinematicProgress}>
        {/* Static above-fold hero — visible on load, fades on first scroll */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "1.25rem",
            }}
          >
            UK Web Design Studio
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Websites that<br />win clients.
          </h1>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            scroll ↓
          </p>
        </div>

        {/* Kinetic typography stages across the scroll */}
        <CinematicTypography scrollProgress={cinematicProgress} />
      </CinematicScroll>
    </>
  );
}
