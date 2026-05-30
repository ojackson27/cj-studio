"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f472b6" /><stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="2" y="7" width="32" height="22" rx="3" stroke="url(#g1)" strokeWidth="2.5" fill="none"/>
        <line x1="2" y1="13" x2="34" y2="13" stroke="url(#g1)" strokeWidth="2.5"/>
        <circle cx="7" cy="10" r="1.5" fill="url(#g1)"/>
        <circle cx="12" cy="10" r="1.5" fill="url(#g1)"/>
        <rect x="8" y="18" width="20" height="3" rx="1.5" fill="url(#g1)" opacity="0.5"/>
        <rect x="8" y="23" width="12" height="3" rx="1.5" fill="url(#g1)" opacity="0.3"/>
      </svg>
    ),
    title: "Design",
    body: "Clean, modern designs tailored to your brand. Mobile-first, built to convert.",
    bg: "from-pink-50/90 to-purple-50/90",
    spotColor: "rgba(244,114,182,0.18)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" /><stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <polyline points="10,13 4,18 10,23" stroke="url(#g2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polyline points="26,13 32,18 26,23" stroke="url(#g2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="21" y1="8" x2="15" y2="28" stroke="url(#g2)" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Build",
    body: "Fast, SEO-ready websites using the latest tech. Deployed on Vercel, live in days not weeks.",
    bg: "from-blue-50/90 to-emerald-50/90",
    spotColor: "rgba(96,165,250,0.18)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" /><stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle cx="18" cy="18" r="12" stroke="url(#g3)" strokeWidth="2.5" fill="none"/>
        <path d="M18 10 L18 18 L23 23" stroke="url(#g3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="18" r="2.5" fill="url(#g3)"/>
      </svg>
    ),
    title: "Maintain",
    body: "Monthly upkeep so your site stays fast, secure, and up to date. We handle it so you don't have to.",
    bg: "from-emerald-50/90 to-teal-50/90",
    spotColor: "rgba(52,211,153,0.18)",
  },
];

function SpotlightCard({
  service,
  index,
  reduce,
}: {
  service: (typeof services)[0];
  index: number;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current || !spotRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(260px circle at ${x}px ${y}px, ${service.spotColor}, transparent 70%)`;
    spotRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (!spotRef.current) return;
    spotRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: "spring",
        stiffness: 90,
        damping: 18,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative bg-gradient-to-br ${service.bg} backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-5 border border-white/70 overflow-hidden group cursor-default`}
    >
      {/* Spotlight overlay — updated via JS */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* Icon bounces on card hover */}
      <motion.div
        whileHover={reduce ? {} : { y: -4, scale: 1.12 }}
        transition={{ type: "spring", stiffness: 400, damping: 14 }}
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm"
      >
        {service.icon}
      </motion.div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-[15px] text-gray-500 leading-relaxed">{service.body}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Everything you need,<br />nothing you don&apos;t.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <SpotlightCard key={s.title} service={s} index={i} reduce={reduce} />
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35, type: "spring", stiffness: 80 }}
          className="mt-4 rounded-2xl bg-gray-900/95 backdrop-blur-sm text-white p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Flat fee builds", sub: "No hourly surprises" },
            { label: "First month free", sub: "Bug fixes included" },
            { label: "Auto-deployed", sub: "Live on Vercel" },
            { label: "UK-based", sub: "Ollie & Josh" },
          ].map((feat) => (
            <div key={feat.label}>
              <p className="text-[15px] font-semibold text-white">{feat.label}</p>
              <p className="text-[13px] text-gray-400 mt-0.5">{feat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
