"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const founders = [
  {
    name: "Josh Carter",
    role: "Co-founder",
    initials: "JC",
    bio: "Obsessed with clean code and making things that work. Handles the build side and makes sure every site ships on time.",
    gradient: "from-violet-400 to-blue-400",
    light: "from-violet-50 to-blue-50",
    img: "https://picsum.photos/seed/josh-portrait-professional/400/400",
  },
  {
    name: "Ollie Jackson",
    role: "Co-founder",
    initials: "OJ",
    bio: "Leads design and client relationships. Believes a great website is the best first impression a business can make.",
    gradient: "from-pink-400 to-rose-400",
    light: "from-pink-50 to-rose-50",
    img: "https://picsum.photos/seed/ollie-portrait-creative/400/400",
  },
];

export default function Founders() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="founders" className="py-28 px-6 relative overflow-hidden">
      {/* Parallax tinted panel behind */}
      <motion.div
        style={reduce ? {} : { y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-transparent to-pink-50/60" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            The people behind<br />the pixels.
          </h2>
        </motion.div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={reduce ? false : { opacity: 0, y: 48, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                stiffness: 70,
                damping: 16,
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`bg-gradient-to-br ${f.light} border border-white/70 backdrop-blur-sm rounded-3xl p-8 flex flex-col gap-6`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {f.initials}
                  </div>
                  {/* Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradient} opacity-30 blur-xl -z-10`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{f.name}</h3>
                  <p className="text-[14px] text-gray-400 mt-0.5">{f.role}, CJ Studio</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] text-gray-600 leading-relaxed">{f.bio}</p>

              {/* Prism accent strip */}
              <div className="h-px w-full bg-gradient-to-r from-pink-200 via-purple-200 via-blue-200 to-emerald-200 opacity-60" />

              {/* Initials display */}
              <div className={`text-[72px] font-black tracking-tighter leading-none bg-gradient-to-br ${f.gradient} bg-clip-text text-transparent opacity-10 select-none absolute bottom-6 right-8`}
                aria-hidden="true"
              >
                {f.initials}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-[14px] text-gray-400"
        >
          Two people. One studio. Every site built with care.
        </motion.p>
      </div>
    </section>
  );
}
