import type { Metadata } from "next";
import Nav from "@/components/nav";
import WorkGallery from "@/components/work-gallery";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected projects from CJ Studio — fast, modern websites for UK businesses.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav onLight={false} />
      <main id="main-content" className="flex-1 flex flex-col justify-center pt-16 px-6 pb-12">
        <div className="max-w-6xl mx-auto w-full py-10">
          <WorkGallery />
        </div>
      </main>
      <Footer />
    </div>
  );
}
