"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import AnimatedButton from "./animated-button";

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 aurora aurora-animate opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-[13px] uppercase tracking-[0.16em] text-gray-400 mb-6 font-medium"
          >
            Get in touch
          </motion.p>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-gray-900 leading-[1.05] mb-6"
          >
            Ready to build<br />something great?
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-[44ch] mb-10"
          >
            Tell us about your project. We&apos;ll get back to you within 24 hours with a quote.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <AnimatedButton href="/contact" variant="primary">
              <EnvelopeSimple size={16} weight="bold" />
              hello@cjstudio.co.uk
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight size={14} weight="bold" />
              </motion.span>
            </AnimatedButton>

            <AnimatedButton href="tel:+447700000000" variant="outline">
              <Phone size={16} />
              Call us
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
