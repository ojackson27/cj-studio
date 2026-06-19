"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const typographyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = typographyRef.current;
    if (!el) return;
    // Double rAF: guarantees browser paints initial off-screen state before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = "translate(-50%, -50%)";
        el.style.opacity = "1";
      });
    });
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#8ec8e8",
      }}
    >
      {/* Layer 1 — Background sky, z-index: 1 */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Image
          src="/assets/hero-sky.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          aria-hidden="true"
        />
      </div>

      {/* Layer 2 — Typography, z-index: 2. Starts off-screen above, drops to center. */}
      <div
        ref={typographyRef}
        aria-label="CJ Creative Studio"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 2,
          /* Initial state: off-screen above + invisible */
          transform: "translate(-50%, calc(-50% - 100vh))",
          opacity: 0,
          /* Premium heavy drop: fast in, silky deceleration */
          transition:
            "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
          textAlign: "center",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(3rem, 9vw, 8.5rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          CJ Creative
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(3rem, 9vw, 8.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          Studio.
        </p>
      </div>

      {/* Layer 3 — Foreground mask (blocks), z-index: 3. mix-blend-mode drops white bg. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/assets/hero-blocks.png"
          alt=""
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </section>
  );
}
