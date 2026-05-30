import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/60 backdrop-blur-sm py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/">
          <Logo size={22} wordmarkColor="dark" />
        </Link>

        <p className="text-[13px] text-gray-400">
          &copy; {new Date().getFullYear()} CJ Studio. UK Web Design.
        </p>

        <div className="flex items-center gap-5 flex-wrap justify-center">
          {[
            { label: "Work", href: "/#work" },
            { label: "Services", href: "/#services" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors"
            >
              {label}
            </Link>
          ))}
          <span className="w-px h-3 bg-gray-200" />
          <Link href="/privacy" className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
