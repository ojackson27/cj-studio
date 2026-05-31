import Nav from "@/components/nav";
import Hero from "@/components/hero";
import WebsiteAssembly from "@/components/website-assembly";
import WorkTeaser from "@/components/work-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <Hero />
      <WebsiteAssembly />
      <WorkTeaser />
      <CTA />
      <Footer />
    </main>
  );
}
