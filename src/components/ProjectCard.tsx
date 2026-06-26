import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { responsiveImageSources } from "../utils/responsiveImage";
import { getProjectHref } from "../routes/portfolioRoutes";
import { CompactMetricStrip } from "./ui/CompactMetricStrip";
import { MetricGrid } from "./ui/MetricGrid";
import { SignalField } from "./ui/SignalField";

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { siteCopy } = useLanguage();
  const imageSources = responsiveImageSources(project.image);
  const strongestMetric = project.metrics.find((metric) => metric.kind === "measured") ?? project.metrics[0];

  return (
    <a
      href={getProjectHref(project.id)}
      className="paper-card paper-card-hover group block min-w-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9]"
    >
      <div className="relative h-28 overflow-hidden border-b border-[#D8E0E7]/80 sm:h-48">
        <img
          src={imageSources.original}
          srcSet={imageSources.srcSet}
          sizes="(min-width: 1024px) 42vw, 92vw"
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-78 transition duration-500 motion-safe:group-hover:scale-[1.04]"
        />
        <SignalField className="opacity-46" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.14),rgba(250,250,247,0.66))]" />
      </div>

      <div className="p-3.5 sm:p-6">
        <div className="flex items-start justify-between gap-2.5 sm:gap-4">
          <div>
            <p className="balanced-text text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-[#4F9CF9] sm:text-xs sm:tracking-[0.16em]">{project.subtitle}</p>
            <h3 className="balanced-text mt-1.5 text-[1.05rem] font-semibold leading-[1.16] text-[#111827] sm:mt-3 sm:text-xl sm:leading-[1.2]">{project.title}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-[#D8E0E7] bg-white px-2 py-0.5 text-[0.64rem] text-[#425466] sm:px-3 sm:py-1 sm:text-xs">
            {siteCopy.common.completed}
          </span>
        </div>

        {strongestMetric ? (
          <div className="mt-2.5 flex items-center justify-between gap-2.5 rounded-lg border border-[#BFD0DF]/80 bg-[#F4F8FC] px-2.5 py-2 sm:mt-4 sm:gap-4 sm:px-4 sm:py-3">
            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-[#2563EB] sm:text-xs sm:tracking-[0.14em]">{siteCopy.common.featuredMetric}</span>
            <span className="text-right text-sm font-semibold text-[#111827]">{strongestMetric.label} · {strongestMetric.value}</span>
          </div>
        ) : null}

        <p className="mobile-line-clamp-2 mt-2.5 text-[0.82rem] leading-5 text-[#6B7280] sm:mt-4 sm:text-sm sm:leading-6">{project.summary}</p>

        <div className="mobile-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-0.5 sm:mt-5 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
          {project.tags.map((tag) => (
            <span key={tag} className="pill shrink-0 px-2.5 py-1 text-[0.68rem] sm:px-3 sm:py-1.5 sm:text-xs">
              {tag}
            </span>
          ))}
        </div>

        <CompactMetricStrip metrics={project.metrics.slice(0, 3)} className="mt-3 pb-0.5 sm:hidden" />

        <MetricGrid
          metrics={project.metrics.slice(0, 3)}
          className="mt-6 hidden gap-3 sm:grid sm:grid-cols-3"
          tileClassName="min-w-[10.75rem] snap-start p-3 shadow-[0_12px_32px_rgba(31,41,51,0.04)] sm:min-w-0 sm:p-4"
        />

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2933] sm:mt-6 sm:gap-2 sm:text-sm">
          {siteCopy.common.viewDetails}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:translate-x-1 sm:h-4 sm:w-4" strokeWidth={1.8} />
        </div>
      </div>
    </a>
  );
}
