import type { Metadata } from "next";
import AuroraBackground from "@/components/aurora-background";
import Nav from "@/components/nav";
import WorkGallery from "@/components/work-gallery";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Work | CJ Creative Studio",
  description:
    "Selected projects from CJ Creative Studio — fast, modern websites for UK businesses.",
};

export default function WorkPage() {
  return (
    <AuroraBackground>
      <Nav />
      <main id="main-content" className="pt-24 pb-0 px-6 max-w-6xl mx-auto">
        <WorkGallery />
      </main>
      <Footer />
    </AuroraBackground>
  );
}
