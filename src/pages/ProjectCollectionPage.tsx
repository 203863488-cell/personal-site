import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/ui/Reveal";
import { SignalButton } from "../components/ui/SignalButton";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";
import type { PortfolioProject, ProjectCategory } from "../types/portfolio";
import { portfolioHrefs } from "../routes/portfolioRoutes";

interface ProjectCollectionPageProps {
  pageKey: ProjectCategory;
  projects: PortfolioProject[];
}

/**
 * Reusable layout for project category pages.
 *
 * Competition and personal pages intentionally share markup. Keeping that shell
 * here makes future categories or copy edits data-driven, while preserving the
 * same DOM structure and Tailwind classes for the current pages.
 */
export function ProjectCollectionPage({ pageKey, projects }: ProjectCollectionPageProps) {
  const { language, siteCopy } = useLanguage();
  const page = siteCopy.pages[pageKey];
  const localizedProjects = useMemo(() => projects.map((project) => localizeProject(project, language)), [language, projects]);

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <SignalButton href={portfolioHrefs.home} icon={ArrowLeft} iconPosition="start" className="mb-10 py-2">
          {page.back}
        </SignalButton>

        <Reveal className="mb-12">
          <p className="section-kicker">{page.kicker}</p>
          <h1 className="section-title balanced-text">{page.title}</h1>
          <p className="section-copy">{page.description}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {localizedProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
