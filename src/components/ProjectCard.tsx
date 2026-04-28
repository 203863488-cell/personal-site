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
      className="paper-card paper-card-hover group block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)]"
    >
      <div className="relative h-48 overflow-hidden border-b border-[rgba(143,110,74,0.22)]">
        <img
          src={assetUrl(project.image)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-72 transition duration-500 motion-safe:group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,232,211,0.08),rgba(243,230,209,0.54),rgba(243,230,209,0.8))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(240,214,170,0.2),transparent_26%),radial-gradient(circle_at_78%_20%,rgba(104,121,131,0.12),transparent_20%)]" />
        <svg className="absolute inset-0 h-full w-full text-[rgba(104,121,131,0.22)]" viewBox="0 0 520 220" fill="none" aria-hidden="true">
          <path d="M56 72H160C196 72 196 42 232 42H380" stroke="currentColor" />
          <path d="M70 155C104 120 138 190 172 155C206 120 240 190 274 155C308 120 342 190 376 155" stroke="currentColor" />
        </svg>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="balanced-text text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-brass)]">{project.subtitle}</p>
            <h3 className="balanced-text mt-3 text-xl font-semibold leading-[1.2] text-[var(--text-strong)]">{project.title}</h3>
          </div>
          <span className="shrink-0 rounded-full border border-[rgba(143,110,74,0.24)] bg-[rgba(250,243,232,0.8)] px-3 py-1 text-xs text-[var(--text-base)]">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-[var(--text-base)]">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="pill px-3 py-1.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[0.9rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(143,110,74,0.14)] sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-[rgba(250,243,232,0.76)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{metric.label}</p>
              <p className="mt-2 text-base font-semibold text-[var(--text-strong)]">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]">
          {siteCopy.common.viewDetails}
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}
