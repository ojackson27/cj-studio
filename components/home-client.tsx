"use client";

import Nav from "@/components/nav";
import HeroSection from "@/components/hero-section";

export default function HomeClient() {
  return (
    <>
      <Nav onLight={false} />
      <HeroSection />
    </>
  );
}
