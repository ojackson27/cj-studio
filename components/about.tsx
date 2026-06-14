"use client";

import ScrollPanels from "./scroll-panels";

const principles = [
  {
    num: "01",
    title: "Best service first",
    body: "We work with businesses that genuinely need help. Our clients get our full attention, not a template.",
  },
  {
    num: "02",
    title: "No lock-in, ever",
    body: "No rising fees mid-contract. No hostage websites. You own your domain and can walk away any time.",
  },
  {
    num: "03",
    title: "Visits become customers",
    body: "Every design decision is made to improve conversion and raise your Google ranking.",
  },
  {
    num: "04",
    title: "Complete transparency",
    body: "Your domain is bought in your business name. You have full legal access. We just host and maintain.",
  },
];

const steps = [
  { number: "01", title: "Client form", body: "You fill in our contact form with your project needs and goals." },
  { number: "02", title: "Demo created", body: "We build a working demo based on your brief, usually within a week." },
  { number: "03", title: "Teams call", body: "We review together over video call and align on final direction." },
  { number: "04", title: "Full build", body: "The complete website is built. You see it live at every stage." },
  { number: "05", title: "Final approval", body: "You review every detail. Nothing ships without your sign-off." },
  { number: "06", title: "Sign off and go live", body: "Contracts signed, domain connected, hosting begins." },
];

const founders = [
  {
    initials: "JC",
    name: "Josh Carter",
    role: "Co-founder",
    bio: "Economics graduate from the University of Nottingham. Passionate about interface design and the psychology of customer conversion: how small design choices drive big business outcomes.",
    interests: ["Hiking", "Football", "Keeping fit"],
  },
  {
    initials: "OJ",
    name: "Oliver Jackson",
    role: "Co-founder",
    bio: "Economics and Finance graduate from Cardiff University. Passionate about coding for the web and staying at the cutting edge of AI-assisted design. Believes great software should feel inevitable.",
    interests: ["Running", "Tennis", "Padel"],
  },
];

// ── Panel 1: Principles ───────────────────────────────────────────────────────
const panel1 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
      <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white leading-tight">
        We&apos;re here for businesses
        <br className="hidden sm:block" /> that want to grow.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {principles.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-5 flex flex-col gap-2"
          >
            <span className="text-xs font-bold tracking-widest text-[#8a6cff]">{p.num}</span>
            <h3 className="text-white font-semibold text-[16px] leading-snug">{p.title}</h3>
            <p className="text-white/55 text-[14px] leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Panel 2: Process ──────────────────────────────────────────────────────────
const panel2 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white leading-tight">
        Six steps from first contact
        <br className="hidden sm:block" /> to live site.
      </h2>

      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            className="snap-start shrink-0 min-w-[240px] rounded-2xl bg-white/[0.05] border border-white/[0.08] p-5 flex flex-col gap-2"
          >
            <span className="text-2xl font-black leading-none text-[#8a6cff]">
              {step.number}
            </span>
            <h3 className="text-white font-semibold text-[15px]">{step.title}</h3>
            <p className="text-white/55 text-[13px] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          "24-hour response time on all client messages",
          "Your domain stays in your name: you own it always",
        ].map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-xs text-white/55"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0" />
            {pill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ── Panel 3: Founders ─────────────────────────────────────────────────────────
const panel3 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white leading-tight">
        Two people. One studio.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {founders.map((f) => (
          <div
            key={f.name}
            className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full p-[2px] shrink-0"
                style={{
                  background: "linear-gradient(135deg, #8a6cff, #4d7cff, #27d7c4)",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0c0e14] flex items-center justify-center">
                  <span className="text-sm font-bold text-white tracking-wider">
                    {f.initials}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-[17px] leading-tight">{f.name}</p>
                <p className="text-[13px] text-white/40 mt-0.5">{f.role}, CJ Studio</p>
              </div>
            </div>

            <p className="text-[14px] text-white/55 leading-relaxed">{f.bio}</p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {f.interests.map((interest, idx) => (
                <span key={interest} className="flex items-center gap-2">
                  <span className="text-white/55 text-[13px]">{interest}</span>
                  {idx < f.interests.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function About() {
  return <ScrollPanels panels={[panel1, panel2, panel3]} />;
}
