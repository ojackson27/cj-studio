import type { Metadata } from "next";
import Link from "next/link";
import EditorialNav from "@/components/editorial-nav";

export const metadata: Metadata = {
  title: "Work — CJ Studio",
  description:
    "Selected case studies from CJ Studio — quiet, high-value launches for UK brands.",
};

const projects = [
  {
    index: "01",
    name: "Maple & Co",
    category: "Brand Identity",
    descriptor: "Full identity system for a London-based lifestyle brand.",
  },
  {
    index: "02",
    name: "Northfield Law",
    category: "Web Design",
    descriptor: "Editorial website for a boutique UK law practice.",
  },
  {
    index: "03",
    name: "Bloom Studio",
    category: "Digital Interface",
    descriptor: "Product interface for an independent creative studio.",
  },
  {
    index: "04",
    name: "Project Four",
    category: "Brand Identity",
    descriptor: "Visual identity and launch system for an emerging brand.",
  },
  {
    index: "05",
    name: "Project Five",
    category: "Web Design",
    descriptor: "Premium marketing site for a high-growth SaaS product.",
  },
  {
    index: "06",
    name: "Project Six",
    category: "Design Operations",
    descriptor: "Component library and design governance for a scaling team.",
  },
];

export default function WorkPage() {
  return (
    <div id="main-content" className="bg-white">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#f0ece3] pt-14" aria-label="Selected work hero">
        <div className="px-6 pt-12 pb-14">
          {/* Kicker row */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              Selected Work
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
              CJ Creative Studio
            </span>
          </div>

          {/* Display heading */}
          <h1
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] mb-8"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Case studies for quiet,
            <br />
            high-value launches.
          </h1>

          {/* Rule + body */}
          <div className="flex items-start gap-8 mt-2">
            <div className="w-10 border-t-[2px] border-[#0d0d0d] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65] text-gray-600 font-serif">
              A curated record of brands built with restraint. Real clients,
              real results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project Grid ─────────────────────────────────────── */}
      <section className="bg-white py-24" aria-label="All projects">
        <div className="px-6">
          {/* Section label + heading */}
          <div className="flex items-start justify-between mb-14">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-1">
              All Projects
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0d0d0d] text-right max-w-[480px]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Every project,
              <br />
              every detail.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {projects.map((project) => (
              <article
                key={project.index}
                className="bg-white flex flex-col group"
                aria-label={`${project.name} — ${project.category}`}
              >
                {/* Image placeholder */}
                <div
                  className="bg-[#f0ece3] w-full relative overflow-hidden transition-[background-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[#e5e0d6]"
                  style={{ aspectRatio: "4/3" }}
                >
                  <span className="absolute top-4 left-5 text-[9px] tracking-[0.22em] uppercase text-gray-400">
                    Project Image
                  </span>
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col gap-1 bg-white">
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {project.index}
                  </span>
                  <h3 className="font-serif italic font-bold text-[1.1rem] text-[#0d0d0d]">
                    {project.name}
                  </h3>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">
                    {project.category}
                  </span>
                  <p className="text-[13px] text-gray-500 mt-1 leading-[1.5]">
                    {project.descriptor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#f0ece3] py-24" aria-label="Start a project">
        <div className="px-6">
          <div className="flex items-start justify-between mb-12">
            <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-1">
              Start a Project
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] text-[#0d0d0d] text-right max-w-[520px]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Got a project in mind?
              <br />
              Let&apos;s talk.
            </h2>
          </div>

          <div className="flex justify-end">
            <Link
              href="/contact"
              className="border border-gray-900 px-6 py-3 text-[11px] tracking-widest uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0d0d0d] px-6 py-16" aria-label="Site footer">
        <p
          className="text-white text-[clamp(2.2rem,7vw,6rem)] leading-[0.9] uppercase tracking-tight"
          style={{ fontFamily: "var(--font-archivo-black)" }}
        >
          CJ Creative
          <br />/ Studio
        </p>
        <div className="mt-10 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-500">
            © 2025 CJ Studio
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-500">
            United Kingdom
          </span>
        </div>
      </footer>
    </div>
  );
}
