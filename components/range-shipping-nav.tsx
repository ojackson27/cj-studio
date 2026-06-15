"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

const links = [
  { label: "Services",  href: "#services" },
  { label: "Fleet",     href: "#fleet" },
  { label: "About",     href: "#about" },
  { label: "Contact",   href: "#contact" },
];

export default function RangeShippingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/[0.06] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <Link href="/range-shipping" className="flex items-center select-none" aria-label="Range Shipping home">
          <Image
            src="/range-shipping/logo.jpg"
            alt="Range Shipping"
            width={180}
            height={48}
            className="h-10 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Range Shipping navigation">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[14px] text-white/75 hover:text-white transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="rs-mobile-menu"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="rs-mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-250 bg-black/80 backdrop-blur-md border-t border-white/[0.06] ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] text-white/80 hover:text-white transition-colors py-1 font-medium"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
