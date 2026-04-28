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
          <h3 className="mt-3 text-2xl font-semibold text-[#111827]">{project.diagramTitle}</h3>
        </div>
        <span className="text-sm text-[#6B7280]">{siteCopy.projectDetail.diagramPlaceholder}</span>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-[#D8E0E7] bg-[#F7F9FB]/70 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          {project.diagramNodes.map((node, index) => (
            <div key={node} className="relative">
              <div className="rounded-lg border border-[#BFD0DF] bg-white/78 px-4 py-5 text-center text-sm font-semibold text-[#1F2933]">
                {node}
              </div>
              {index < project.diagramNodes.length - 1 && (
                <div className="absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[#9BC9FF] md:block" />
              )}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 720 120" className="mt-8 h-auto w-full text-[#4F9CF9]/40" fill="none" aria-hidden="true">
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
        <h3 className="mt-3 text-2xl font-semibold text-[#111827]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {project.detailImages.map((image) => (
          <article key={image.src} className="overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-white/78">
            <div className="relative h-64 overflow-hidden bg-[#F7F9FB]">
              <img src={assetUrl(image.src)} alt={image.title} className="h-full w-full object-contain p-3" />
            </div>
            <div className="border-t border-[#D8E0E7]/80 p-5">
              <h4 className="font-semibold text-[#111827]">{image.title}</h4>
              <p className="mt-3 text-sm leading-7 text-[#5D6673]">{image.description}</p>
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
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl">{project.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5D6673]">{project.goal}</p>
          </div>
          <span className="w-fit rounded-full border border-[#D8E0E7] bg-white px-4 py-2 text-sm text-[#425466]">
            {siteCopy.common.currentProgress}: {project.status}
          </span>
        </div>
      </section>

      <ProjectImageGallery project={project} />

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title={labels.responsibilities} items={project.responsibilities} />
        <section className="card-block">
          <h3 className="detail-title">{labels.metrics}</h3>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-white/82 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#6B7280]">{metric.label}</p>
                <p className="mt-2 text-base font-semibold text-[#111827]">{metric.value}</p>
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
          <p className="mt-4 text-sm leading-7 text-[#5D6673]">{project.progress}</p>
        </section>
        <DetailList title={labels.validation} items={project.validation} />
        <DetailList title={labels.improvements} items={project.improvements} />
      </div>
    </div>
  );
}
