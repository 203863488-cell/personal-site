import type { ReactNode } from "react";
import { assetUrl } from "../../utils/assetUrl";

interface MediaCardProps {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function MediaCard({ image, title, subtitle, className = "" }: MediaCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.15rem] border border-[rgba(255,246,230,0.48)] bg-[rgba(247,238,222,0.56)] shadow-[0_18px_55px_rgba(58,36,18,0.14)] transition duration-300 focus-within:border-[rgba(196,149,102,0.6)] hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(41,24,12,0.2)] ${className}`}
    >
      <img
        src={assetUrl(image)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(73,52,35,0.12),rgba(33,23,17,0.7))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(240,214,170,0.22),transparent_30%),linear-gradient(180deg,transparent,rgba(29,20,14,0.24))]" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-[rgba(255,242,214,0.1)] blur-xl transition duration-700 motion-safe:group-hover:left-full" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white transition duration-300 motion-safe:group-hover:translate-y-[-4px]">
        <h3 className="balanced-text text-2xl font-semibold leading-[1.16]">{title}</h3>
        {subtitle && <p className="mt-2 text-sm leading-6 text-white/84">{subtitle}</p>}
      </div>
    </article>
  );
}
