import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/ui/Reveal";
import { SignalButton } from "../components/ui/SignalButton";
import { competitionProjects } from "../data/competitionProjects";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";

export function CompetitionPage() {
  const { language, siteCopy } = useLanguage();
  const page = siteCopy.pages.competition;
  const projects = competitionProjects.map((project) => localizeProject(project, language));

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <SignalButton href="#/" icon={ArrowLeft} iconPosition="start" className="mb-10 py-2">
          {page.back}
        </SignalButton>

        <Reveal className="mb-12">
          <p className="section-kicker">{page.kicker}</p>
          <h1 className="section-title balanced-text">{page.title}</h1>
          <p className="section-copy">{page.description}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
