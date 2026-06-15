import RangeShippingHero from "@/components/range-shipping-hero";
import RangeShippingNav from "@/components/range-shipping-nav";

export const metadata = {
  title: "Range Shipping",
  description: "Global Maritime Logistics",
};

export default function RangeShippingPage() {
  return (
    <main className="bg-black">
      <RangeShippingNav />
      <RangeShippingHero />

      {/* Content section — logo reappears at the top, creating continuity from the hero exit */}
      <section className="bg-white min-h-screen px-6 md:px-16 lg:px-24 py-20">
        {/* Logo mark at top of content — mirrors the hero exit destination */}
        <div className="mb-20 md:mb-28">
          <p className="text-[0.65rem] tracking-[0.45em] text-black/40 uppercase mb-3">
            Global Maritime Logistics
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-black uppercase">
            Range Shipping
          </h2>
        </div>

        {/* Company information — placeholder content */}
        <div className="max-w-2xl">
          <p className="text-sm tracking-[0.05em] leading-relaxed text-black/50 uppercase mb-12">
            About
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-black/80 mb-8">
            Moving cargo across the world&apos;s most demanding routes.
          </p>
          <p className="text-base leading-loose text-black/50 mb-6">
            {/* Replace with actual company description */}
            Range Shipping delivers end-to-end maritime logistics solutions for
            industries that cannot afford to wait. From bulk carriers to
            specialised freight, we operate with precision across every ocean.
          </p>
          <p className="text-base leading-loose text-black/50">
            {/* Replace with actual company description */}
            Our fleet and partnerships span six continents, connecting
            manufacturers, commodity traders, and infrastructure projects to
            their destinations — on time, every time.
          </p>
        </div>

        {/* Stat row — placeholder */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-black/10 pt-12">
          {[
            { value: "60+", label: "Countries served" },
            { value: "1,200", label: "Voyages per year" },
            { value: "98.4%", label: "On-time delivery" },
            { value: "40yr", label: "In operation" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-light text-black mb-2">{value}</p>
              <p className="text-xs tracking-[0.2em] text-black/40 uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
