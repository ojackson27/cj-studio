"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { getLenis } from "@/lib/lenis-instance";

const FRAME_COUNT = 120;
const BASE_PATH = "/range-shipping/frames/";

// Text blocks that appear and disappear in sequence as you scroll.
// scrollIn / scrollOut are 0–1 scroll progress values.
// Adjust copy and timings to match the actual brand messaging.
const TEXT_SEQUENCE = [
  {
    lines: ["Connecting", "continents"],
    sub: "End-to-end maritime freight solutions",
    scrollIn: 0.08,
    scrollPeak: 0.15,
    scrollFade: 0.26,
    scrollOut: 0.32,
  },
  {
    lines: ["Precision", "at scale"],
    sub: "1,200 voyages a year. 60 countries served.",
    scrollIn: 0.37,
    scrollPeak: 0.44,
    scrollFade: 0.55,
    scrollOut: 0.61,
  },
  {
    lines: ["Built for what", "moves the world"],
    sub: "Bulk carriers, specialised freight, and everything between",
    scrollIn: 0.65,
    scrollPeak: 0.70,
    scrollFade: 0.76,
    scrollOut: 0.80,
  },
] as const;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
): void {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = w / h;
  let dw: number, dh: number, dx: number, dy: number;
  if (imgAspect > canvasAspect) {
    dh = h; dw = h * imgAspect; dx = (w - dw) / 2; dy = 0;
  } else {
    dw = w; dh = w / imgAspect; dx = 0; dy = (h - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

// Smooth crossfade between two frames using canvas globalAlpha
function drawBlendedFrame(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  exactIndex: number,
  w: number,
  h: number
): void {
  const lower = Math.floor(exactIndex);
  const upper = Math.min(FRAME_COUNT - 1, lower + 1);
  const blend = exactIndex - lower;

  const imgA = images[lower];
  const imgB = images[upper];

  if (!imgA?.complete || imgA.naturalWidth === 0) return;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.globalAlpha = 1;
  drawCover(ctx, imgA, w, h);

  if (blend > 0 && imgB?.complete && imgB.naturalWidth > 0) {
    ctx.globalAlpha = blend;
    drawCover(ctx, imgB, w, h);
  }

  ctx.globalAlpha = 1;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// Map scrollProgress through a 4-point fade: in → peak → fade → out
function textOpacity(p: number, block: typeof TEXT_SEQUENCE[number]): number {
  if (p < block.scrollIn || p > block.scrollOut) return 0;
  if (p <= block.scrollPeak) {
    return clamp01((p - block.scrollIn) / (block.scrollPeak - block.scrollIn));
  }
  if (p <= block.scrollFade) return 1;
  return clamp01(1 - (p - block.scrollFade) / (block.scrollOut - block.scrollFade));
}

export default function RangeShippingHero() {
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT, BASE_PATH);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const exactIndexRef = useRef<number>(0);
  const lastExactRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const exact = exactIndexRef.current;
    if (Math.abs(exact - lastExactRef.current) < 0.001) return;
    lastExactRef.current = exact;

    drawBlendedFrame(ctx, images, exact, canvas.width, canvas.height);
  }, [images, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const loop = () => {
      drawFrame();
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [loaded, drawFrame]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const raw = (window.scrollY - sectionTop) / (sectionHeight - windowHeight);
      const p = clamp01(raw);
      exactIndexRef.current = p * (FRAME_COUNT - 1);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const lenis = getLenis();
    let lenisCleanup: (() => void) | null = null;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      lenisCleanup = () => lenis.off("scroll", handleScroll);
    }

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenisCleanup?.();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const syncSize = () => {
      // Use physical pixels so the canvas is sharp on HiDPI/retina displays.
      // Cap at 2x — beyond that the source frames (1280×720) offer no extra detail.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      lastExactRef.current = -1;
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Logo: visible from start, exits upward at 80–100% scroll
  const logoExitT = clamp01((scrollProgress - 0.80) / 0.20);
  const logoOpacity = 1 - logoExitT;
  const logoTranslateY = -logoExitT * 40;
  const logoScale = 1 - logoExitT * 0.2;

  // Scroll indicator fades out in the first 8%
  const indicatorOpacity = clamp01(1 - scrollProgress / 0.08);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Video frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Loading bar */}
        {!loaded && (
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-white/30 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        )}

        {/* Sequential text overlays */}
        {TEXT_SEQUENCE.map((block, i) => {
          const opacity = textOpacity(scrollProgress, block);
          const translateY = (1 - Math.min(opacity * 2, 1)) * 16;
          return (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none z-10"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                transition: "none",
              }}
            >
              <div className="text-center px-6">
                <p className="text-base md:text-lg font-light tracking-[0.25em] text-white/90 uppercase leading-tight mb-3">
                  {block.lines.join(" ")}
                </p>
                <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                  {block.sub}
                </p>
              </div>
            </div>
          );
        })}

        {/* Company logo — centered, exits upward at end */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}%) scale(${logoScale})`,
            transition: "none",
          }}
        >
          {/* Swap this for <Image> once the logo asset is ready */}
          <div className="text-center select-none">
            <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.45em] text-white/40 uppercase mb-4">
              Global Maritime Logistics
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.12em] text-white uppercase leading-none">
              Range
              <br />
              Shipping
            </h1>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[0.55rem] tracking-[0.4em] text-white/35 uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-white/15 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 animate-[slideDown_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
