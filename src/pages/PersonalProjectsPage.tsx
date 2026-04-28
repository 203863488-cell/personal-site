import { ProjectCard } from "../components/ProjectCard";
import { personalProjects } from "../data/personalProjects";
import { localizeProject } from "../data/siteCopy";
import { useLanguage } from "../languageContext";

export function PersonalProjectsPage() {
  const { language, siteCopy } = useLanguage();
  const page = siteCopy.pages.personal;
  const projects = personalProjects.map((project) => localizeProject(project, language));

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <a href="#/" className="secondary-button mb-10 py-2">← {page.back}</a>

        <div className="mb-12">
          <p className="section-kicker">{page.kicker}</p>
          <h1 className="section-title text-4xl sm:text-5xl">{page.title}</h1>
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
