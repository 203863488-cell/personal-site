import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { DetailList } from "./project-detail/DetailList";
import { ProjectImageGallery } from "./project-detail/ProjectImageGallery";
import { ProjectSectionNav } from "./project-detail/ProjectSectionNav";
import { QuickOverview } from "./project-detail/QuickOverview";
import { SystemDiagram } from "./project-detail/SystemDiagram";
import { TechnicalParameterGrid } from "./project-detail/TechnicalParameterGrid";
import { CompactMetricStrip } from "./ui/CompactMetricStrip";
import { MetricGrid } from "./ui/MetricGrid";
import { ShareQrDialog } from "./ui/ShareQrDialog";

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
  const [copied, setCopied] = useState(false);

  const copyProjectLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error: unknown) {
      console.error("Failed to copy project URL.", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <section id="overview" className="project-section paper-card p-4 sm:p-8">
        <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-kicker">{labels.kicker}</p>
            <h1 className="balanced-text mt-2.5 text-2xl font-semibold leading-[1.12] text-[#111827] sm:mt-4 sm:text-5xl sm:leading-[1.14]">{project.title}</h1>
            <p className="copy-text mobile-line-clamp-3 mt-3 max-w-3xl text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7">{project.goal}</p>
            {project.links?.length ? (
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-button gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:text-sm"
                  >
                    {link.label}
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <ShareQrDialog buttonLabel={labels.shareProject} buttonClassName="gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:text-sm" />
              <button type="button" onClick={copyProjectLink} className="secondary-button gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:text-sm">
                {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied ? labels.copiedProjectLink : labels.copyProjectLink}
              </button>
            </div>
          </div>
          <span className="w-fit rounded-full border border-[#D8E0E7] bg-white px-3 py-1.5 text-xs text-[#425466] sm:px-4 sm:py-2 sm:text-sm">
            {siteCopy.common.currentProgress}: {project.status}
          </span>
        </div>
      </section>

      <QuickOverview project={project} />
      <ProjectSectionNav hasImages={Boolean(project.detailImages?.length)} />
      <ProjectImageGallery project={project} />

      <div id="metrics" className="project-section grid gap-5 xl:grid-cols-2">
        <DetailList title={labels.responsibilities} items={project.responsibilities} />
        <section className="card-block">
          <h3 className="detail-title">{labels.metrics}</h3>
          <CompactMetricStrip metrics={project.metrics} className="mt-3 pb-0.5 sm:hidden" />
          <MetricGrid
            metrics={project.metrics}
            className="mt-5 hidden gap-3 sm:grid sm:grid-cols-3"
            tileClassName="min-w-[11rem] snap-start bg-white/82 p-3 shadow-[0_12px_32px_rgba(31,41,51,0.045)] sm:min-w-0 sm:p-4"
          />
        </section>
      </div>

      <div id="design" className="project-section space-y-4 sm:space-y-6">
        {project.keyComponents?.length ? (
          <TechnicalParameterGrid title={labels.keyComponents} parameters={project.keyComponents} />
        ) : null}

        <SystemDiagram project={project} />

        {project.operatingPrinciples?.length || project.engineeringHighlights?.length ? (
          <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
            {project.operatingPrinciples?.length ? (
              <DetailList title={labels.operatingPrinciples} items={project.operatingPrinciples} />
            ) : null}
            {project.engineeringHighlights?.length ? (
              <DetailList title={labels.engineeringHighlights} items={project.engineeringHighlights} />
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
          <DetailList title={labels.designPoints} items={project.designPoints} />
          <section className="card-block">
            <h3 className="detail-title">{labels.progress}</h3>
            <p className="mt-3 text-sm leading-6 text-[#5D6673] sm:mt-4">{project.progress}</p>
          </section>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
        <div id="validation" className="project-section">
          <DetailList title={labels.validation} items={project.validation} />
        </div>
        <div id="outcomes" className="project-section">
          <DetailList title={labels.improvements} items={project.improvements} />
        </div>
      </div>
    </div>
  );
}
