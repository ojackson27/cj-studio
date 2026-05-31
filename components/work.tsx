"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function Work() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Selected work
          </h2>
          <p className="hidden md:block text-[14px] text-gray-400 pb-1">More coming soon</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : p.enter}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${p.color} aspect-[4/3] relative backdrop-blur-sm border border-white/50`}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover mix-blend-multiply opacity-75 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-sm">
                  <ArrowUpRight size={14} weight="bold" className="text-gray-900" />
                </div>
              </div>
              <div className="mt-3 px-1">
                <p className="text-[15px] font-semibold text-gray-900">{p.name}</p>
                <p className="text-[13px] text-gray-400">{p.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
