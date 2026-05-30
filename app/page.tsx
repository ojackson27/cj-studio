import Nav from "@/components/nav";
import Hero from "@/components/hero";
import WebsiteAssembly from "@/components/website-assembly";
import Services from "@/components/services";
import Work from "@/components/work";
import Process from "@/components/process";
import Founders from "@/components/founders";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <Hero />
      <WebsiteAssembly />
      <Services />
      <Work />
      <Process />
      <Founders />
      <CTA />
      <Footer />
    </main>
  );
}
