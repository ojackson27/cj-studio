import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
