"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      aria-label="Hero"
      style={{ background: "#8ec8e8" }}
    >
      {/* Layer 1: Sky */}
      <Image
        src="/assets/hero-sky.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Layer 2: Text — falls from above, sits between sky and blocks */}
      <div
        className="absolute inset-0 flex items-start justify-center"
        style={{ zIndex: 1, paddingTop: "18vh" }}
        aria-label="CJ Creative Studio"
      >
        <motion.div
          initial={{ y: "-90vh", opacity: 1 }}
          animate={ready ? { y: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 55,
            damping: 16,
            delay: 0.1,
          }}
          className="text-center select-none"
        >
          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              margin: 0,
              textShadow: "0 2px 40px rgba(0,0,0,0.15)",
            }}
          >
            CJ Creative
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              margin: 0,
              textShadow: "0 2px 40px rgba(0,0,0,0.15)",
            }}
          >
            Studio.
          </p>
        </motion.div>
      </div>

      {/* Layer 3: Blocks foreground — white bg drops out via multiply, blocks mask the text */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <Image
          src="/assets/hero-blocks.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
    </section>
  );
}
