import HomeClient from "@/components/home-client";
import DarkWorkCarousel from "@/components/dark-work-carousel";
import WhyItMatters from "@/components/why-it-matters";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HomeClient />
      <main id="main-content">
        <WhyItMatters />
        <DarkWorkCarousel />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
