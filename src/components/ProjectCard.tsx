import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { siteCopy } = useLanguage();

  return (
    <a
      href={`#/project/${project.id}`}
      className="paper-card paper-card-hover group block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9]"
    >
      <div className="relative h-48 overflow-hidden border-b border-[#D8E0E7]/80">
        <img src={assetUrl(project.image)} alt="" className="h-full w-full object-cover opacity-78 transition duration-500 motion-safe:group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.1),rgba(250,250,247,0.78))]" />
        <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/26" viewBox="0 0 520 220" fill="none" aria-hidden="true">
          <path d="M56 72H160C196 72 196 42 232 42H380" stroke="currentColor" />
          <path d="M70 155C104 120 138 190 172 155C206 120 240 190 274 155C308 120 342 190 376 155" stroke="currentColor" />
        </svg>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4F9CF9]">{project.subtitle}</p>
            <h3 className="mt-3 text-xl font-semibold text-[#111827]">{project.title}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-[#D8E0E7] bg-white px-3 py-1 text-xs text-[#425466]">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[#6B7280]">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="pill px-3 py-1.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-white/82 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#6B7280]">{metric.label}</p>
              <p className="mt-2 text-base font-semibold text-[#111827]">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1F2933]">
          {siteCopy.common.viewDetails}
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}
