import type { Metadata } from "next";
import Nav from "@/components/nav";
import Process from "@/components/process";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Process | CJ Studio",
  description: "How CJ Studio builds websites — from brief to launch.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Process />
      <Footer />
    </main>
  );
}