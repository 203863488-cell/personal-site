import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { responsiveImageSources } from "../../utils/responsiveImage";

interface MediaCardProps {
  href: string;
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function MediaCard({ href, image, title, subtitle, className = "" }: MediaCardProps) {
  const imageSources = responsiveImageSources(image);

  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_18px_55px_rgba(31,41,51,0.08)] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9] hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(31,41,51,0.13)] ${className}`}
    >
      <img
        src={imageSources.original}
        srcSet={imageSources.srcSet}
        sizes="(min-width: 768px) 32vw, 92vw"
        alt={typeof title === "string" ? title : ""}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.14),rgba(17,24,39,0.56))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-38" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-white/12 blur-xl transition duration-700 motion-safe:group-hover:left-full" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white transition duration-300 motion-safe:group-hover:translate-y-[-4px] sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="balanced-text text-[1.85rem] font-semibold leading-[1.12] sm:text-2xl sm:leading-[1.16]">{title}</h3>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/24 bg-white/12 text-white">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </span>
        </div>
        {subtitle && <p className="mt-2 text-[0.95rem] leading-6 text-white/84 sm:text-sm">{subtitle}</p>}
      </div>
    </a>
  );
}
