import { ProjectCard } from "../components/ProjectCard";
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
        <a href="#/" className="secondary-button mb-10 py-2">← {page.back}</a>

        <div className="mb-12">
          <p className="section-kicker">{page.kicker}</p>
          <h1 className="section-title balanced-text">{page.title}</h1>
          <p className="section-copy">
            {page.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
