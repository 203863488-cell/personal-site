import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-[#D8E0E7] bg-white/70 px-4 py-2 text-sm text-[#425466] ${className}`}>
      {children}
    </span>
  );
}
