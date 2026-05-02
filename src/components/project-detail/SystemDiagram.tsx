import type { PortfolioProject } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { ProjectSignalMap } from "../ProjectSignalMap";
import { SignalField } from "../ui/SignalField";

interface SystemDiagramProps {
  project: PortfolioProject;
}

/**
 * Project signal-map wrapper.
 *
 * The rendered diagram stays data-driven: project records provide node labels,
 * while this component owns the surrounding card, title, and visual treatment.
 */
export function SystemDiagram({ project }: SystemDiagramProps) {
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
