import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact | CJ Studio",
  description: "Tell us about your project. We'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Nav />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-start">

            {/* Left: info */}
            <div>
              <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 mb-5 font-medium">
                Get in touch
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
                Let&apos;s build<br />something great.
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-[40ch] mb-10">
                Tell us what you need. We reply within 24 hours with a quote.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:hello@cjstudio.co.uk"
                  className="flex items-center gap-3 text-[15px] text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-purple-50 flex items-center justify-center transition-colors">
                    <EnvelopeSimple size={16} className="text-gray-500 group-hover:text-purple-500 transition-colors" />
                  </div>
                  hello@cjstudio.co.uk
                </a>
              </div>

              {/* Reassurance */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col gap-3">
                {[
                  "Free, no-obligation quote",
                  "Reply within 24 hours",
                  "50% deposit to get started",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[14px] text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white/60 backdrop-blur-sm border border-gray-100/80 rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
