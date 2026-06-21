"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 480;
const frameSrc = (n: number) =>
  `/assets/sequence/${String(n).padStart(4, "0")}.jpg`;

export default function HeroMediaPlane() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = framesRef.current[index];
    if (!ctx || !img?.complete) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    // Preload sequence frames
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => { if (i === 1) drawFrame(0); };
      frames.push(img);
    }
    framesRef.current = frames;

    const ctx = gsap.context(() => {
      // Text reveal on load: white → black + bold
      if (h1Ref.current) {
        gsap.fromTo(
          h1Ref.current,
          { color: "#FBFBFB", fontWeight: 200 },
          { color: "#171717", fontWeight: 800, duration: 1.4, ease: "power3.out", delay: 0.2 }
        );
      }
      if (pRef.current) {
        gsap.fromTo(
          pRef.current,
          { color: "rgba(251,251,251,0.1)" },
          { color: "rgba(0,0,0,0.55)", duration: 1.4, ease: "power3.out", delay: 0.45 }
        );
      }

      // Wordmark parallax on scroll
      if (wordmarkRef.current && sectionRef.current) {
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
      }

      // Canvas sequence: scrub through 480 frames on scroll
      if (canvasRef.current && sectionRef.current) {
        const obj = { frame: 0 };
        gsap.to(obj, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
          onUpdate() {
            drawFrame(Math.round(obj.frame));
          },
        });
      }
    });

    return () => ctx.revert();
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FBFBFB] flex flex-col justify-between overflow-hidden"
      aria-label="Hero"
    >
      {/* Top row labels */}
      <div className="w-full p-8 flex justify-between items-start z-40 select-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          Boutique Digital Design Agency
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
          United Kingdom
        </span>
      </div>

      {/* Headline + CTA row */}
      <div className="absolute top-[22%] left-0 right-0 px-8 z-40 flex justify-between items-start">
        {/* Left: headline + sub */}
        <div className="max-w-[60%]">
          <h1
            ref={h1Ref}
            className="text-7xl md:text-8xl tracking-tight leading-[0.95]"
            style={{ color: "#FBFBFB", fontWeight: 200 }}
          >
            Quiet systems<br />for exacting<br />digital brands.
          </h1>
          <div className="flex items-start gap-4 mt-8 max-w-md">
            <span className="w-8 h-[1px] bg-neutral-900 mt-3 flex-shrink-0 opacity-0 [animation:fadeIn_0.6s_ease_0.8s_forwards]" />
            <p
              ref={pRef}
              className="text-sm leading-relaxed font-light"
              style={{ color: "rgba(251,251,251,0.1)" }}
            >
              CJ Studio builds refined identities, product interfaces, and web
              systems for founders and teams who value restraint, clarity, and craft.
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="hidden md:flex flex-col items-end justify-start pt-2">
          <a
            href="/contact"
            className={[
              "group inline-flex items-center gap-3",
              "rounded-full border border-neutral-900 px-6 py-3",
              "text-[11px] tracking-[0.2em] uppercase text-neutral-900",
              "transition-all duration-250 ease-out",
              "hover:bg-neutral-900 hover:text-white active:scale-[0.97]",
            ].join(" ")}
          >
            Start a project
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <p className="mt-3 text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
            No commitment required
          </p>
        </div>
      </div>

      {/* Media plane: canvas sequence + wordmark + foreground mask */}
      <div className="relative w-full h-[55vh] mt-auto overflow-hidden border-t border-neutral-100">

        {/* Canvas — sequence frames drawn here */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 z-10 w-full h-full"
          style={{ objectFit: "cover", filter: "grayscale(1) contrast(1.15) brightness(0.95)" }}
        />

        {/* Wordmark — parallax layer */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <h2
            ref={wordmarkRef}
            className="text-[14vw] font-black tracking-tighter text-neutral-900 uppercase opacity-90 select-none"
            aria-hidden="true"
          >
            CJ STUDIO
          </h2>
        </div>

        {/* Foreground mask — transparent property cutout */}
        <div className="absolute inset-0 z-30 w-full h-full pointer-events-none">
          <img
            src="/assets/higgsfield-foreground-mask%20new.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
