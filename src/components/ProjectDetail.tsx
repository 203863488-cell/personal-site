import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";

interface ProjectDetailProps {
  project: PortfolioProject;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function SystemDiagram({ project }: { project: PortfolioProject }) {
  const { siteCopy } = useLanguage();

  return (
    <section className="paper-card p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">{siteCopy.projectDetail.systemDiagram}</p>
          <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[var(--text-strong)]">{project.diagramTitle}</h3>
        </div>
        <span className="text-sm text-[var(--text-muted)]">{siteCopy.projectDetail.diagramPlaceholder}</span>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(245,235,218,0.66)] p-5">
        <div className="grid gap-4 md:grid-cols-4">
          {project.diagramNodes.map((node, index) => (
            <div key={node} className="relative">
              <div className="rounded-[0.95rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(249,242,231,0.84)] px-4 py-5 text-center text-sm font-semibold text-[var(--text-strong)]">
                {node}
              </div>
              {index < project.diagramNodes.length - 1 && (
                <div className="absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[rgba(161,106,59,0.44)] md:block" />
              )}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 720 120" className="mt-8 h-auto w-full text-[rgba(104,121,131,0.28)]" fill="none" aria-hidden="true">
          <path d="M20 62H150C190 62 190 28 230 28H380" stroke="currentColor" />
          <path d="M420 62H560C600 62 600 92 640 92H700" stroke="currentColor" />
          <path d="M40 98C74 62 108 134 142 98C176 62 210 134 244 98C278 62 312 134 346 98" stroke="currentColor" />
        </svg>
      </div>
    </section>
  );
}

function ProjectImageGallery({ project }: { project: PortfolioProject }) {
  const { siteCopy } = useLanguage();

  if (!project.detailImages?.length) {
    return null;
  }

  return (
    <section className="paper-card p-6">
      <div>
        <p className="section-kicker">{siteCopy.projectDetail.imagesKicker}</p>
        <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[var(--text-strong)]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {project.detailImages.map((image) => (
          <article key={image.src} className="overflow-hidden rounded-[1rem] border border-[rgba(143,110,74,0.24)] bg-[rgba(249,242,231,0.8)]">
            <div className="relative h-64 overflow-hidden bg-[rgba(241,230,210,0.7)]">
              <img
                src={assetUrl(image.src)}
                alt={image.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-3"
              />
            </div>
            <div className="border-t border-[rgba(143,110,74,0.22)] p-5">
              <h4 className="balanced-text font-semibold leading-[1.2] text-[var(--text-strong)]">{image.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[var(--text-base)]">{image.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { siteCopy } = useLanguage();
  const labels = siteCopy.projectDetail;

  return (
    <div className="space-y-6">
      <section className="paper-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-kicker">{labels.kicker}</p>
            <h2 className="balanced-text mt-4 text-3xl font-semibold leading-[1.14] text-[var(--text-strong)] sm:text-5xl">{project.title}</h2>
            <p className="copy-text mt-5 max-w-3xl">{project.goal}</p>
          </div>
          <span className="w-fit rounded-full border border-[rgba(143,110,74,0.24)] bg-[rgba(249,242,231,0.82)] px-4 py-2 text-sm text-[var(--text-base)]">
            {siteCopy.common.currentProgress}: {project.status}
          </span>
        </div>
      </section>

      <ProjectImageGallery project={project} />

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title={labels.responsibilities} items={project.responsibilities} />
        <section className="card-block">
          <h3 className="detail-title">{labels.metrics}</h3>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[0.95rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(143,110,74,0.14)] sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-[rgba(250,243,232,0.78)] p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{metric.label}</p>
                <p className="mt-2 text-base font-semibold text-[var(--text-strong)]">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <SystemDiagram project={project} />

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title={labels.designPoints} items={project.designPoints} />
        <section className="card-block">
          <h3 className="detail-title">{labels.progress}</h3>
          <p className="mt-4 text-sm leading-6 text-[var(--text-base)]">{project.progress}</p>
        </section>
        <DetailList title={labels.validation} items={project.validation} />
        <DetailList title={labels.improvements} items={project.improvements} />
      </div>
    </div>
  );
}
