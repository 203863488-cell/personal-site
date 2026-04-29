import type { PortfolioProject } from "../types/portfolio";
import { Activity, CheckCircle2, Cpu, Layers } from "lucide-react";
import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";
import { ProjectSignalMap } from "./ProjectSignalMap";
import { MetricTile } from "./ui/MetricTile";
import { SignalField } from "./ui/SignalField";

interface ProjectDetailProps {
  project: PortfolioProject;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#5CC8A7]" strokeWidth={1.8} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SystemDiagram({ project }: { project: PortfolioProject }) {
  const { siteCopy } = useLanguage();

  return (
    <section className="paper-card relative overflow-hidden p-6">
      <SignalField className="opacity-42" />
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">{siteCopy.projectDetail.systemDiagram}</p>
          <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[#111827]">{project.diagramTitle}</h3>
        </div>
        <span className="text-sm text-[#6B7280]">{siteCopy.projectDetail.diagramPlaceholder}</span>
      </div>

      <div className="relative mt-8">
        <ProjectSignalMap title={project.diagramTitle} nodes={project.diagramNodes} />
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
        <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[#111827]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {project.detailImages.map((image) => (
          <article key={image.src} className="overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-white/78">
            <div className="relative h-64 overflow-hidden bg-[#F7F9FB]">
              <img
                src={assetUrl(image.src)}
                alt={image.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-3"
              />
            </div>
            <div className="border-t border-[#D8E0E7]/80 p-5">
              <h4 className="balanced-text font-semibold leading-[1.2] text-[#111827]">{image.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[#5D6673]">{image.description}</p>
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
  const metricIcons = [Activity, Cpu, Layers];

  return (
    <div className="space-y-6">
      <section className="paper-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-kicker">{labels.kicker}</p>
            <h2 className="balanced-text mt-4 text-3xl font-semibold leading-[1.14] text-[#111827] sm:text-5xl">{project.title}</h2>
            <p className="copy-text mt-5 max-w-3xl">{project.goal}</p>
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
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <MetricTile
                key={metric.label}
                icon={metricIcons[index % metricIcons.length]}
                label={metric.label}
                value={metric.value}
                className="bg-white/82 shadow-[0_12px_32px_rgba(31,41,51,0.045)]"
              />
            ))}
          </div>
        </section>
      </div>

      <SystemDiagram project={project} />

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title={labels.designPoints} items={project.designPoints} />
        <section className="card-block">
          <h3 className="detail-title">{labels.progress}</h3>
          <p className="mt-4 text-sm leading-6 text-[#5D6673]">{project.progress}</p>
        </section>
        <DetailList title={labels.validation} items={project.validation} />
        <DetailList title={labels.improvements} items={project.improvements} />
      </div>
    </div>
  );
}
