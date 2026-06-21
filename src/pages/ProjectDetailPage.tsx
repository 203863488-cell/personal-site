import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { DocumentMetadata } from "../components/DocumentMetadata";
import { ProjectDetail } from "../components/ProjectDetail";
import { SignalButton } from "../components/ui/SignalButton";
import { findProjectById, projectCollections } from "../data/projectCatalog";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";
import { getCategoryHref, getProjectHref, portfolioHrefs } from "../routes/portfolioRoutes";

interface ProjectDetailPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const { language, siteCopy } = useLanguage();
  const sourceProject = findProjectById(projectId);
  const project = sourceProject ? localizeProject(sourceProject, language) : undefined;

  if (!project) {
    return (
      <section className="section-shell pt-16">
        <DocumentMetadata title={`${siteCopy.pages.notFound.title} | ${siteCopy.nav.brand}`} description={siteCopy.pages.notFound.description} />
        <SignalButton href={portfolioHrefs.home} icon={ArrowLeft} iconPosition="start" className="mb-10 py-2">
          {siteCopy.common.backHome}
        </SignalButton>
        <div className="paper-card p-8">
          <p className="section-kicker">{siteCopy.pages.notFound.kicker}</p>
          <h1 className="mt-4 text-3xl font-semibold text-[#111827]">{siteCopy.pages.notFound.title}</h1>
          <p className="mt-4 text-[#6B7280]">{siteCopy.pages.notFound.description}</p>
        </div>
      </section>
    );
  }

  const backHref = getCategoryHref(project.category);
  const backLabel = project.category === "competition" ? siteCopy.pages.competition.title : siteCopy.pages.personal.title;
  const collection = projectCollections[project.category];
  const projectIndex = collection.findIndex((item) => item.id === project.id);
  const previousProject = projectIndex > 0 ? localizeProject(collection[projectIndex - 1], language) : undefined;
  const nextProject = projectIndex >= 0 && projectIndex < collection.length - 1
    ? localizeProject(collection[projectIndex + 1], language)
    : undefined;

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <DocumentMetadata title={`${project.title} | ${siteCopy.nav.brand}`} description={project.summary} />
      <section className="section-shell pt-16">
        <div className="mb-10 flex flex-wrap gap-3">
          <SignalButton href={backHref} icon={ArrowLeft} iconPosition="start" className="py-2">
            {backLabel}
          </SignalButton>
          <SignalButton href={portfolioHrefs.home} icon={Home} className="py-2">
            {siteCopy.common.backHome}
          </SignalButton>
        </div>
        <ProjectDetail project={project} />
        {previousProject || nextProject ? (
          <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label={siteCopy.projectDetail.projectNavigation}>
            {previousProject ? (
              <a href={getProjectHref(previousProject.id)} className="paper-card paper-card-hover flex items-center gap-4 p-5">
                <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0 text-[#4F9CF9]" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{siteCopy.projectDetail.previousProject}</span>
                  <span className="mt-2 block font-semibold text-[#111827]">{previousProject.title}</span>
                </span>
              </a>
            ) : <span />}
            {nextProject ? (
              <a href={getProjectHref(nextProject.id)} className="paper-card paper-card-hover flex items-center justify-between gap-4 p-5 text-right">
                <span className="ml-auto">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{siteCopy.projectDetail.nextProject}</span>
                  <span className="mt-2 block font-semibold text-[#111827]">{nextProject.title}</span>
                </span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#4F9CF9]" />
              </a>
            ) : null}
          </nav>
        ) : null}
      </section>
    </div>
  );
}
