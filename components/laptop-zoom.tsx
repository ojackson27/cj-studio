"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from "motion/react";

/* ------------------------------------------------------------------ */
/*  Sub-components: Header + Card (Aceternity-inspired ContainerScroll) */
/* ------------------------------------------------------------------ */

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white md:rounded-2xl md:p-4 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main LaptopZoom component                                          */
/* ------------------------------------------------------------------ */

interface Props {
  onLightChange: (isLight: boolean) => void;
}

export default function LaptopZoom({ onLightChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* 3D animation transforms */
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  /* Nav text flips to dark when past midpoint of scroll */
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.46);
  });

  useEffect(() => {
    onLightChange(scrollYProgress.get() < 0.46);
  }, [onLightChange, scrollYProgress]);

  return (
    <section className="relative">
      {/* Aurora background — animated gradient behind everything */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary aurora layer */}
        <div className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-50 [will-change:background-position]" />
        {/* Secondary layer — reversed direction for depth */}
        <div
          className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-30 [will-change:background-position]"
          style={{ animationDirection: "reverse", animationDuration: "40s" }}
        />
      </div>

      {/* 3D Container Scroll */}
      <div
        ref={containerRef}
        className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      >
        <div
          className="py-10 md:py-40 w-full relative"
          style={{ perspective: "1000px" }}
        >
          {/* Header — logo + tagline above the laptop */}
          <Header translate={translate}>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CJ Creative Studio.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              We build fast, modern websites for UK businesses.
            </p>
          </Header>

          {/* 3D Laptop Card — stacked logo centered inside */}
          <Card rotate={rotate} scale={scale}>
            <Image
              src="/assets/cj-logo-stacked.png"
              alt="CJ Creative Studio"
              width={400}
              height={400}
              className="object-contain max-w-[60%] max-h-[60%]"
              priority
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
