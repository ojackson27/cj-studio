"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import AuroraBackground from "@/components/aurora-background";

const MotionLink = motion.create(Link);

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-10"
      >
        <Image
          src="/cj-studio-logo.png"
          width={384}
          height={150}
          alt="CJ Studio"
          priority
          className="w-72 h-auto md:w-96"
        />
        <MotionLink
          href="/work"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium tracking-tight text-white transition-shadow hover:shadow-lg"
        >
          View Our Work
        </MotionLink>
      </motion.div>
    </AuroraBackground>
  );
}
