"use client";

interface Props {
  scrollProgress: number; // 0–1
}

function mapRange(v: number, a: number, b: number, c: number, d: number): number {
  return c + ((Math.min(Math.max(v, a), b) - a) / (b - a)) * (d - c);
}

interface StageConfig {
  eyebrow: string;
  headline: string;
  sub: string;
  opacityIn: [number, number];
  opacityOut: [number, number];
  translateIn: [number, number];
  translateOut: [number, number];
  gradient?: boolean;
}

const stages: StageConfig[] = [
  {
    eyebrow: "WEB DESIGN STUDIO",
    headline: "We build\nextraordinary websites.",
    sub: "Flat-fee builds. Monthly retainer. Real results.",
    opacityIn: [0.05, 0.15],
    opacityOut: [0.22, 0.28],
    translateIn: [0.05, 0.15],
    translateOut: [0.22, 0.28],
    gradient: true,
  },
  {
    eyebrow: "DESIGN OBSESSED",
    headline: "Every pixel.\nIntentional.",
    sub: "We sweat the details so your brand stands out.",
    opacityIn: [0.38, 0.48],
    opacityOut: [0.55, 0.62],
    translateIn: [0.38, 0.48],
    translateOut: [0.55, 0.62],
  },
  {
    eyebrow: "YOUR BRAND",
    headline: "Elevated.\nRemembered.",
    sub: "We've built for startups, law firms, and everything between.",
    opacityIn: [0.72, 0.82],
    opacityOut: [0.90, 0.95],
    translateIn: [0.72, 0.82],
    translateOut: [0.90, 0.95],
  },
];

function StagePanel({ config, scrollProgress }: { config: StageConfig; scrollProgress: number }) {
  const p = scrollProgress;

  const opacityIn = mapRange(p, config.opacityIn[0], config.opacityIn[1], 0, 1);
  const opacityOut = mapRange(p, config.opacityOut[0], config.opacityOut[1], 1, 0);
  const opacity = Math.min(opacityIn, opacityOut);

  const yIn = mapRange(p, config.translateIn[0], config.translateIn[1], 32, 0);
  const yOut = mapRange(p, config.translateOut[0], config.translateOut[1], 0, -24);
  const y = yIn + yOut;

  const headlineParts = config.headline.split("\n");

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ opacity, transform: `translateY(${y}px)` }}
      aria-hidden={opacity < 0.05 ? "true" : undefined}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.45)",
          marginBottom: "1.5rem",
        }}
      >
        {config.eyebrow}
      </p>

      {/* Headline */}
      <h2
        style={{
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          whiteSpace: "pre-line",
          margin: "0 0 1.25rem",
          ...(config.gradient
            ? {
                background: "linear-gradient(135deg, #ffffff 0%, #c4b5ff 40%, #27d7c4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "white" }),
        }}
      >
        {headlineParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < headlineParts.length - 1 && <br />}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "clamp(0.875rem, 2vw, 1.0625rem)",
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.01em",
          maxWidth: "42ch",
          lineHeight: 1.6,
        }}
      >
        {config.sub}
      </p>
    </div>
  );
}

// Animated scroll cue — visible only before first text stage
function ScrollCue({ scrollProgress }: { scrollProgress: number }) {
  const opacity = mapRange(scrollProgress, 0, 0.05, 1, 0);
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      style={{ opacity }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Scroll
      </span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: "scrollBounce 1.6s ease-in-out infinite" }}>
        <rect x="6.5" y="0.5" width="3" height="5" rx="1.5" fill="rgba(255,255,255,0.4)" />
        <line x1="8" y1="8" x2="8" y2="23" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>
      <style>{`@keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }`}</style>
    </div>
  );
}

export default function CinematicTypography({ scrollProgress }: Props) {
  return (
    <div className="relative w-full h-full">
      {stages.map((stage, i) => (
        <StagePanel key={i} config={stage} scrollProgress={scrollProgress} />
      ))}
      <ScrollCue scrollProgress={scrollProgress} />
    </div>
  );
}
