import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-[rgba(138,110,80,0.24)] bg-[rgba(248,239,224,0.8)] px-4 py-2 text-sm text-[var(--text-base)] shadow-[inset_0_1px_0_rgba(255,251,242,0.56)] ${className}`}>
      {children}
    </span>
  );
}
