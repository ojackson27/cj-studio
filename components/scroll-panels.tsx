"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";

const OV = 0.05; // crossfade overlap on each side of a boundary

function panelOpacity(p: number, index: number, count: number): number {
  if (count === 1) return 1;
  const seg = 1 / count;
  const start = index * seg;
  const end = (index + 1) * seg;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // fade-in contribution
  const fadeIn = isFirst
    ? 1
    : p < start - OV
    ? 0
    : p > start + OV
    ? 1
    : (p - (start - OV)) / (2 * OV);

  // fade-out contribution
  const fadeOut = isLast
    ? 1
    : p < end - OV
    ? 1
    : p > end + OV
    ? 0
    : 1 - (p - (end - OV)) / (2 * OV);

  return Math.min(fadeIn, fadeOut);
}

function panelY(p: number, index: number, count: number): number {
  if (count === 1 || index === 0) return 0;
  const seg = 1 / count;
  const start = index * seg;
  if (p >= start + OV) return 0;
  if (p <= start - OV) return 24;
  return 24 * (1 - (p - (start - OV)) / (2 * OV));
}

function PanelSlot({
  children,
  progress,
  index,
  count,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const opacity = useTransform(progress, (p) => panelOpacity(p, index, count));
  const y = useTransform(progress, (p) => panelY(p, index, count));

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

export default function ScrollPanels({
  panels,
  scrollPerPanel = 150,
}: {
  panels: React.ReactNode[];
  scrollPerPanel?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <div>
        {panels.map((panel, i) => (
          <div key={i} className="min-h-screen flex flex-col justify-center pt-16 px-6">
            {panel}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${panels.length * scrollPerPanel}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {panels.map((panel, i) => (
          <PanelSlot key={i} progress={scrollYProgress} index={i} count={panels.length}>
            {panel}
          </PanelSlot>
        ))}
      </div>
    </div>
  );
}
