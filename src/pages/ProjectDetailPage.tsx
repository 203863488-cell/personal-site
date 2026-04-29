import { ArrowLeft, Home } from "lucide-react";
import { ProjectDetail } from "../components/ProjectDetail";
import { SignalButton } from "../components/ui/SignalButton";
import { allProjects } from "../data/allProjects";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";

interface ProjectDetailPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const { language, siteCopy } = useLanguage();
  const sourceProject = allProjects.find((item) => item.id === projectId);
  const project = sourceProject ? localizeProject(sourceProject, language) : undefined;

  if (!project) {
    return (
      <section className="section-shell pt-16">
        <SignalButton href="#/" icon={ArrowLeft} iconPosition="start" className="mb-10 py-2">
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

  const backHref = project.category === "competition" ? "#/competition" : "#/personal";
  const backLabel = project.category === "competition" ? siteCopy.pages.competition.title : siteCopy.pages.personal.title;

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <div className="mb-10 flex flex-wrap gap-3">
          <SignalButton href={backHref} icon={ArrowLeft} iconPosition="start" className="py-2">
            {backLabel}
          </SignalButton>
          <SignalButton href="#/" icon={Home} className="py-2">
            {siteCopy.common.backHome}
          </SignalButton>
        </div>
        <ProjectDetail project={project} />
      </section>
    </div>
  );
}
