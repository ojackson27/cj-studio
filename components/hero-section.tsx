"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    // Small delay ensures initial off-screen paint before transition fires
    const id = setTimeout(() => setDropped(true), 80);
    return () => clearTimeout(id);
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

      {/* Layer 2 — Typography, z-index: 2.
          Initial: off-screen above + invisible.
          On load: drops to center via premium cubic-bezier. */}
      <div
        aria-label="CJ Creative Studio"
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          zIndex: 2,
          transform: dropped
            ? "translate(-50%, -50%)"
            : "translate(-50%, calc(-50% - 100vh))",
          opacity: dropped ? 1 : 0,
          transition:
            "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
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
            color: "#000000",
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
            color: "#000000",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          Studio.
        </p>
      </div>

      {/* Layer 3 — Foreground mask (blocks), z-index: 3.
          mix-blend-mode:multiply drops white bg, dark blocks remain as mask.
          pointer-events:none so the text below stays interactive. */}
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
