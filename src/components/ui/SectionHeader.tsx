import type { ReactNode } from "react";

interface SectionHeaderProps {
  kicker: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeader({ kicker, title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="section-kicker">{kicker}</p>
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="section-copy">{description}</p>}
    </div>
  );
}
