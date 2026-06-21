"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroMediaPlane() {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wordmarkRef.current || !sectionRef.current) return;
      gsap.fromTo(
        wordmarkRef.current,
        { y: "20%" },
        {
          y: "-25%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FBFBFB] flex flex-col justify-between overflow-hidden"
      aria-label="Hero"
    >
      {/* 1. Header Typography */}
      <div className="w-full p-8 flex justify-between items-start z-40 select-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          Boutique Digital Design Agency
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          United Kingdom
        </span>
      </div>

      {/* 2. Main Title Section */}
      <div className="absolute top-[25%] left-8 max-w-[70%] z-40 mix-blend-difference">
        <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-neutral-900 leading-[0.95]">
          Quiet systems<br />for exacting<br />digital brands.
        </h1>
        <div className="flex items-start gap-4 mt-8 max-w-md">
          <span className="w-8 h-[1px] bg-neutral-900 mt-3 flex-shrink-0" />
          <p className="text-sm text-neutral-500 leading-relaxed font-light">
            CJ Studio builds refined identities, product interfaces, and web
            systems for founders and teams who value restraint, clarity, and
            craft.
          </p>
        </div>
      </div>

      {/* 3. Stacking Sandwich Container ("Reserved Media Plane") */}
      <div className="relative w-full h-[55vh] mt-auto overflow-hidden border-t border-neutral-100">

        {/* LAYER 1: Higgsfield Base Video (bottom of sandwich) */}
        <div className="absolute inset-0 z-10 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale contrast-[1.15] brightness-95"
          >
            <source src="/assets/higgsfield-render.mp4" type="video/mp4" />
          </video>
        </div>

        {/* LAYER 2: Sliding Typography (middle of sandwich — GSAP target) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <h2
            ref={wordmarkRef}
            className="text-[14vw] font-black tracking-tighter text-neutral-900 uppercase opacity-90 select-none"
            aria-hidden="true"
          >
            CJ STUDIO
          </h2>
        </div>

        {/* LAYER 3: Foreground Mask (top of sandwich) */}
        <div className="absolute inset-0 z-30 w-full h-full pointer-events-none">
          <img
            src="/assets/higgsfield-foreground-mask.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover grayscale contrast-[1.15] brightness-95"
          />
        </div>

      </div>
    </section>
  );
}
