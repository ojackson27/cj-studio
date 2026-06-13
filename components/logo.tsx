import Image from "next/image";

interface LogoProps {
  /** "mark" for nav (SVG icon), "horizontal" for footer, "stacked" for other uses */
  variant?: "mark" | "horizontal" | "stacked";
  /** Height in pixels — width auto-scales to preserve aspect ratio */
  height?: number;
  className?: string;
}

const srcs: Record<NonNullable<LogoProps["variant"]>, string> = {
  mark: "/cj-mark.svg",
  horizontal: "/assets/cj-logo-horizontal.png",
  stacked: "/assets/cj-logo-stacked.png",
};

const aspectRatios: Record<NonNullable<LogoProps["variant"]>, number> = {
  mark: 1,
  horizontal: 5,
  stacked: 2,
};

export default function Logo({
  variant = "horizontal",
  height = 32,
  className = "",
}: LogoProps) {
  return (
    <Image
      src={srcs[variant]}
      alt="CJ Creative Studio"
      height={height}
      width={height * aspectRatios[variant]}
      className={`h-auto ${className}`}
      style={{ height, width: "auto" }}
      priority
    />
  );
}
