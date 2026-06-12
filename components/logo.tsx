import Image from "next/image";

interface LogoProps {
  /** "horizontal" for the nav header, "stacked" for the laptop screen */
  variant?: "horizontal" | "stacked";
  /** Height in pixels — width auto-scales to preserve aspect ratio */
  height?: number;
  className?: string;
}

export default function Logo({
  variant = "horizontal",
  height = 32,
  className = "",
}: LogoProps) {
  const src =
    variant === "horizontal"
      ? "/assets/cj-logo-horizontal.png"
      : "/assets/cj-logo-stacked.png";

  return (
    <Image
      src={src}
      alt="CJ Creative Studio"
      height={height}
      width={height * (variant === "horizontal" ? 5 : 2)}
      className={`h-auto ${className}`}
      style={{ height, width: "auto" }}
      priority
    />
  );
}
