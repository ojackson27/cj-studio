import type { Metadata } from "next";
import Nav from "@/components/nav";
import Services from "@/components/services";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Services | CJ Studio",
  description: "Web design, build, and maintenance services from CJ Studio.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Services />
      <Footer />
    </main>
  );
}