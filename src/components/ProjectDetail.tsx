import { BadgeCheck, Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { PortfolioProject } from "../types/portfolio";
import { useLanguage } from "../languageContext";
import { responsiveImageSources } from "../utils/responsiveImage";
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
  presentationMode?: boolean;
}

/**
 * Detail page composer.
 *
 * The section order is kept here as the page-level contract, while repeated
 * blocks live in smaller components. Future detail fields can be inserted here
 * without changing image, diagram, or metric rendering internals.
 */
export function ProjectDetail({ project, presentationMode = false }: ProjectDetailProps) {
  const { siteCopy } = useLanguage();
  const labels = siteCopy.projectDetail;
  const [copied, setCopied] = useState(false);
  const coverImage = responsiveImageSources(project.image);

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
      <section id="overview" className="project-section paper-card overflow-hidden p-4 sm:p-6 lg:p-8">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.92fr)] md:items-stretch lg:gap-8">
          <div>
            <p className="section-kicker">{labels.kicker}</p>
            <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#9BC9FF]/70 bg-[#EEF5FC] px-3 py-1.5 text-xs font-semibold text-[#1D4F91] sm:mt-4 sm:text-sm">
              <BadgeCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
              {project.status}
            </span>
            <h1 className="balanced-text mt-3 text-2xl font-semibold leading-[1.12] text-[#111827] sm:text-4xl sm:leading-[1.14] lg:text-5xl">{project.title}</h1>
            <p className="copy-text mobile-line-clamp-3 mt-3 max-w-3xl text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7">{project.goal}</p>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full border border-[#D8E0E7] bg-white/78 px-3 py-1 text-xs font-medium text-[#425466]">{tag}</span>
              ))}
            </div>
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
              <ShareQrDialog compactDialog={presentationMode} buttonLabel={labels.shareProject} buttonClassName="gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:text-sm" />
              <button type="button" onClick={copyProjectLink} className="secondary-button gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:text-sm">
                {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied ? labels.copiedProjectLink : labels.copyProjectLink}
              </button>
            </div>
          </div>
          <div className="relative min-h-52 overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-[#EEF3F7] md:min-h-full">
            <img
              src={coverImage.original}
              srcSet={coverImage.srcSet}
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 42vw, 92vw"
              alt={project.title}
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(12,22,34,0.74))]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/68">{siteCopy.common.featuredMetric}</p>
              <p className="mt-1.5 text-base font-semibold leading-snug sm:text-lg">{project.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <QuickOverview project={project} />
      <ProjectSectionNav hasImages={Boolean(project.detailImages?.length)} />
      <ProjectImageGallery project={project} swipeEnabled={presentationMode} />

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
