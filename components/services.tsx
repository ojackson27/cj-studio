"use client";

import AnimatedButton from "./animated-button";
import ScrollPanels from "./scroll-panels";

const webDesignFeatures = [
  "Logo design and brand adaptation",
  "Custom website build, mobile-first",
  "SEO-ready from day one",
  "Delivered in days, not months",
];

const plans = [
  {
    title: "Free hosting",
    price: "£0 / month",
    description:
      "Hosting included forever. Changes aren't covered: if you need an update, we'll quote a callout fee.",
    callout: "Typical changes from £30",
    features: ["Hosting included", "Site stays live", "Callout fee for changes"],
    highlight: false,
  },
  {
    title: "Simple",
    price: "£15 / month",
    description: "Ongoing care so your site stays accurate and fast.",
    callout: null,
    features: [
      "Everything in Free",
      "Monthly content updates",
      "Error and uptime monitoring",
      "Traffic consistency checks",
    ],
    highlight: false,
  },
  {
    title: "Adaptive",
    price: "£45 / month",
    description: "For businesses that move fast and need their site to keep up.",
    callout: null,
    features: [
      "Everything in Simple",
      "Frequent design changes",
      "Traffic trend analysis",
      "Proactive improvement suggestions",
    ],
    highlight: true,
  },
];

// ── Panel 1: Intro + First month callout ─────────────────────────────────────
const panel1 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      <div className="max-w-2xl">
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-white leading-tight mb-5">
          Websites that keep your
          <br className="hidden sm:block" /> business ahead.
        </h1>
        <p className="text-[17px] text-white/55 leading-relaxed">
          Design that converts, code that performs, care that lasts. We build
          websites for UK businesses that want results, not templates.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#8a6cff]/25 bg-gradient-to-br from-[#8a6cff]/[0.10] to-[#27d7c4]/[0.07] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#8a6cff]/20 to-[#27d7c4]/15 blur-3xl"
        />
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #8a6cff, #27d7c4)" }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L11.8 7.6H17.6L12.9 11.1L14.7 16.7L10 13.2L5.3 16.7L7.1 11.1L2.4 7.6H8.2L10 2Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">First month on us.</h2>
          <p className="text-[15px] text-white/60 leading-relaxed">
            Every new website includes 1 month of free hosting and upkeep as
            standard. No strings, no small print.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ── Panel 2: Web design ───────────────────────────────────────────────────────
const panel2 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-white leading-tight mb-6">
            Web design
          </h2>
          <div className="space-y-4 text-[16px] text-white/55 leading-relaxed mb-8">
            <p>
              Everything from logo design and brand adaptation to a fully custom
              website, built to reflect your business and speak directly to your
              customers.
            </p>
            <p>
              We start by listening: your market, your customers, your goals. Every
              design decision is shaped to improve how visitors experience your brand
              and turn browsing into buying.
            </p>
          </div>
          <ul className="space-y-3">
            {webDesignFeatures.map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-[15px] text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a6cff] shrink-0 mt-2" />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="aspect-video rounded-2xl overflow-hidden bg-[#0c0e14] border border-white/10 flex flex-col"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
            <div className="flex-1 mx-3 rounded-md bg-white/5 h-5 flex items-center px-2">
              <span className="text-[9px] text-white/30 font-mono tracking-wide">
                yourclientsite.co.uk
              </span>
            </div>
          </div>
          <div className="flex-1 p-5 flex flex-col gap-3">
            <div
              className="h-5 w-3/4 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #8a6cff 0%, #4d7cff 60%, #27d7c4 100%)",
              }}
            />
            <div className="h-2.5 w-full rounded-full bg-white/[0.08]" />
            <div className="h-2.5 w-5/6 rounded-full bg-white/[0.08]" />
            <div className="h-2.5 w-4/6 rounded-full bg-white/[0.06]" />
            <div className="mt-2 flex gap-2">
              <div className="h-8 w-28 rounded-full bg-[#8a6cff]/70" />
              <div className="h-8 w-20 rounded-full border border-white/15" />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2">
              {([0.14, 0.09, 0.11] as const).map((op, i) => (
                <div
                  key={i}
                  className="rounded-lg aspect-[4/3]"
                  style={{
                    background: `rgba(138,108,255,${op})`,
                    border: "1px solid rgba(138,108,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Panel 3: Pricing ──────────────────────────────────────────────────────────
const panel3 = (
  <div className="absolute inset-0 flex flex-col justify-center pt-16 px-6">
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-white leading-tight mb-3">
          Hosting and upkeep
        </h2>
        <p className="text-[16px] text-white/55 leading-relaxed max-w-[55ch]">
          Once your site is live, we keep it that way. Pick a plan that fits how
          often your business changes, or keep hosting free with no commitment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`relative rounded-2xl p-5 flex flex-col gap-4 border ${
              plan.highlight
                ? "border-[#8a6cff]/25 bg-gradient-to-br from-[#8a6cff]/[0.12] to-[#27d7c4]/[0.08]"
                : "border-white/[0.08] bg-white/[0.05]"
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider bg-[#8a6cff] text-white px-2 py-0.5 rounded-full">
                Most popular
              </span>
            )}
            <div>
              <p className="text-[12px] font-semibold text-white/40 mb-1">{plan.title}</p>
              <p className="text-xl font-bold text-white">{plan.price}</p>
            </div>
            <p className="text-[14px] text-white/55 leading-relaxed">{plan.description}</p>
            {plan.callout && (
              <p className="text-[12px] font-medium text-[#8a6cff]">{plan.callout}</p>
            )}
            <ul className="space-y-2 mt-auto">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-white/60">
                  <span className="w-1 h-1 rounded-full bg-[#8a6cff] shrink-0 mt-[6px]" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
        <p className="text-[15px] text-white/55 max-w-[48ch] leading-relaxed">
          Build pricing is bespoke to each project. You&apos;ll always receive a
          clear, fixed quote before anything starts.
        </p>
        <AnimatedButton href="/contact" variant="inverted" className="shrink-0">
          Get a free quote
        </AnimatedButton>
      </div>
    </div>
  </div>
);

export default function Services() {
  return <ScrollPanels panels={[panel1, panel2, panel3]} />;
}
