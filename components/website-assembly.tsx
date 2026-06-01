"use client";

import { useId } from "react";
import Image from "next/image";
import {
  MotionValue,
  motion,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { projects } from "@/lib/projects";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function WebsiteAssembly({ scrollYProgress }: Props) {
  const reduce = useReducedMotion();
  const uid = useId();

  // Photo canvas — visible at scroll=0, subtle parallax scale as you scroll
  const frameScale  = useTransform(scrollYProgress, [0, 0.40], [0.96, 1.04]);
  const frameShadow = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["0 8px 32px rgba(0,0,0,0.06)", "0 32px 80px rgba(251,113,133,0.18)"]
  );

  // Glass prism objects
  const triY       = useTransform(scrollYProgress, [0.18, 0.46], [-280, 0]);
  const triRotate  = useTransform(scrollYProgress, [0.18, 0.46], [-8, 0]);
  const triOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);

  const rectY       = useTransform(scrollYProgress, [0.28, 0.54], [-320, 0]);
  const rectRotate  = useTransform(scrollYProgress, [0.28, 0.54], [5, 0]);
  const rectOpacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);

  const cubeY       = useTransform(scrollYProgress, [0.34, 0.58], [-240, 0]);
  const cubeRotate  = useTransform(scrollYProgress, [0.34, 0.58], [-3, 0]);
  const cubeOpacity = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  const sphereY       = useTransform(scrollYProgress, [0.40, 0.64], [-260, 0]);
  const sphereOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);

  const rainbowOpacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1]);
  const sceneScale     = useTransform(scrollYProgress, [0.60, 0.90], [1, 1.06]);

  const rainbowBg = [
    "radial-gradient(ellipse at 30% 100%, rgba(253,164,175,0.22) 0%, transparent 50%)",
    "radial-gradient(ellipse at 52% 100%, rgba(196,181,253,0.18) 0%, transparent 45%)",
    "radial-gradient(ellipse at 74% 100%, rgba(147,197,253,0.15) 0%, transparent 40%)",
  ].join(", ");

  return (
    <div
      className="sticky top-0 h-screen w-full z-0 overflow-hidden sm:bg-white"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={reduce ? {} : { scale: sceneScale }}
        className="relative w-full h-full flex items-center justify-center"
        aria-label="Website assembly animation"
      >

        {/* Photo canvas — desktop/tablet only; aurora bg looks great on mobile */}
        <motion.div
          style={
            reduce
              ? { width: "min(900px, 90vw)", aspectRatio: "900 / 560" }
              : {
                  scale: frameScale,
                  boxShadow: frameShadow,
                  width: "min(900px, 90vw)",
                  aspectRatio: "900 / 560",
                }
          }
          className="relative rounded-2xl overflow-hidden border border-gray-200/80 hidden sm:block"
        >
          <Image
            src={projects[0].img}
            alt={projects[0].name}
            fill
            className="object-cover"
            priority
            sizes="min(900px, 90vw)"
          />
          {/* Overlay — stronger on mobile so text stays readable over the canvas */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-white/80 md:from-white/40 md:via-transparent md:to-white/40" />
        </motion.div>

        {/* Foreground glass objects — hidden on mobile, pointer-events-none */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">

          {/* Triangular prism — drops first, centre */}
          <motion.div
            style={reduce ? {} : { y: triY, rotate: triRotate, opacity: triOpacity }}
            className="absolute left-1/2 bottom-[18%] -translate-x-1/2"
          >
            <svg width="160" height="176" viewBox="0 0 100 110" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id={`triGrad-${uid}`} x1="0" y1="0" x2="100" y2="87" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#f472b6" stopOpacity="0.60" />
                  <stop offset="50%"  stopColor="#a78bfa" stopOpacity="0.60" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.60" />
                </linearGradient>
              </defs>
              <polygon
                points="50,4 96,87 4,87"
                fill={`url(#triGrad-${uid})`}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.2"
              />
              <polygon points="50,30 72,72 28,72" fill="rgba(255,255,255,0.40)" />
            </svg>
          </motion.div>

          {/* Tall rectangle — left-centre */}
          <motion.div
            style={reduce ? {} : { y: rectY, rotate: rectRotate, opacity: rectOpacity }}
            className="absolute left-[27%] bottom-[25%]"
          >
            <div
              className="w-16 rounded-xl border-2 backdrop-blur-md"
              style={{
                height: "128px",
                background: "linear-gradient(160deg, rgba(196,181,253,0.45), rgba(147,197,253,0.38))",
                borderColor: "rgba(255,255,255,0.60)",
                boxShadow: "0 8px 32px rgba(167,139,250,0.25)",
              }}
            />
          </motion.div>

          {/* Small cube — far left */}
          <motion.div
            style={reduce ? {} : { y: cubeY, rotate: cubeRotate, opacity: cubeOpacity }}
            className="absolute left-[15%] bottom-[26%]"
          >
            <div
              className="w-14 h-14 rounded-xl border-2 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, rgba(110,231,183,0.45), rgba(96,165,250,0.38))",
                borderColor: "rgba(255,255,255,0.60)",
                boxShadow: "0 6px 24px rgba(96,165,250,0.20)",
              }}
            />
          </motion.div>

          {/* Sphere — right */}
          <motion.div
            style={reduce ? {} : { y: sphereY, opacity: sphereOpacity }}
            className="absolute right-[20%] bottom-[24%]"
          >
            <div
              className="w-20 h-20 rounded-full border-2"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.65), rgba(196,181,253,0.40) 60%, rgba(147,197,253,0.22))",
                borderColor: "rgba(255,255,255,0.65)",
                boxShadow: "0 8px 32px rgba(253,164,175,0.30)",
              }}
            />
          </motion.div>

          {/* Rainbow light — fades in as objects land */}
          <motion.div
            style={
              reduce
                ? { background: rainbowBg }
                : { opacity: rainbowOpacity, background: rainbowBg }
            }
            className="absolute bottom-0 left-0 right-0 h-[32%]"
            aria-hidden="true"
          />

        </div>
      </motion.div>
    </div>
  );
}
