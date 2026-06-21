import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { responsiveImageSources } from "../utils/responsiveImage";
import { getProjectHref } from "../routes/portfolioRoutes";
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
      className="paper-card paper-card-hover group block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9]"
    >
      <div className="relative h-40 overflow-hidden border-b border-[#D8E0E7]/80 sm:h-48">
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

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="balanced-text text-xs font-semibold uppercase tracking-[0.16em] text-[#4F9CF9]">{project.subtitle}</p>
            <h3 className="balanced-text mt-3 text-xl font-semibold leading-[1.2] text-[#111827]">{project.title}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-[#D8E0E7] bg-white px-3 py-1 text-xs text-[#425466]">
            {siteCopy.common.completed}
          </span>
        </div>

        {strongestMetric ? (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#BFD0DF]/80 bg-[#F4F8FC] px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB]">{siteCopy.common.featuredMetric}</span>
            <span className="text-right text-sm font-semibold text-[#111827]">{strongestMetric.label} · {strongestMetric.value}</span>
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-6 text-[#6B7280]">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="pill px-3 py-1.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <MetricGrid
          metrics={project.metrics.slice(0, 3)}
          className="mt-6 grid gap-3 sm:grid-cols-3"
          tileClassName="p-3.5 shadow-[0_12px_32px_rgba(31,41,51,0.04)] sm:p-4"
        />

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1F2933]">
          {siteCopy.common.viewDetails}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.8} />
        </div>
      </div>
    </a>
  );
}
