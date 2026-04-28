import { ProjectCard } from "../components/ProjectCard";
import { personalProjects } from "../data/personalProjects";

export function PersonalProjectsPage() {
  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <a href="#/" className="secondary-button mb-10 py-2">← 返回首页</a>

        <div className="mb-12">
          <p className="section-kicker">Personal Projects</p>
          <h1 className="section-title text-4xl sm:text-5xl">个人项目作品</h1>
          <p className="section-copy">
            展示个人在电力电子硬件、嵌入式控制和工程调试方向的项目积累，重点突出从方案到验证的完整推进能力。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {personalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
