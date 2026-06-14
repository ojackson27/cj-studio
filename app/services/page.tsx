import type { Metadata } from "next";
import Nav from "@/components/nav";
import Services from "@/components/services";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, build, and maintenance services from CJ Studio.",
};

export default function ServicesPage() {
  return (
    <div style={{ background: "#0c0e14" }}>
      <Nav onLight={false} />
      <main id="main-content">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
