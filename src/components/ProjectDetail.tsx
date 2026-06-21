import { ExternalLink } from "lucide-react";
import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { DetailList } from "./project-detail/DetailList";
import { ProjectImageGallery } from "./project-detail/ProjectImageGallery";
import { SystemDiagram } from "./project-detail/SystemDiagram";
import { TechnicalParameterGrid } from "./project-detail/TechnicalParameterGrid";
import { MetricGrid } from "./ui/MetricGrid";

interface ProjectDetailProps {
  project: PortfolioProject;
}

/**
 * Detail page composer.
 *
 * The section order is kept here as the page-level contract, while repeated
 * blocks live in smaller components. Future detail fields can be inserted here
 * without changing image, diagram, or metric rendering internals.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const { siteCopy } = useLanguage();
  const labels = siteCopy.projectDetail;

  return (
    <div className="space-y-6">
      <section className="paper-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-kicker">{labels.kicker}</p>
            <h1 className="balanced-text mt-4 text-3xl font-semibold leading-[1.14] text-[#111827] sm:text-5xl">{project.title}</h1>
            <p className="copy-text mt-5 max-w-3xl">{project.goal}</p>
            {project.links?.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-button gap-2 py-2"
                  >
                    {link.label}
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
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
          <MetricGrid
            metrics={project.metrics}
            className="mt-5 grid gap-3 sm:grid-cols-3"
            tileClassName="bg-white/82 shadow-[0_12px_32px_rgba(31,41,51,0.045)]"
          />
        </section>
      </div>

      {project.keyComponents?.length ? (
        <TechnicalParameterGrid title={labels.keyComponents} parameters={project.keyComponents} />
      ) : null}

      <SystemDiagram project={project} />

      {project.operatingPrinciples?.length || project.engineeringHighlights?.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {project.operatingPrinciples?.length ? (
            <DetailList title={labels.operatingPrinciples} items={project.operatingPrinciples} />
          ) : null}
          {project.engineeringHighlights?.length ? (
            <DetailList title={labels.engineeringHighlights} items={project.engineeringHighlights} />
          ) : null}
        </div>
      ) : null}

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
