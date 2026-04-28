import { ProjectCard } from "../components/ProjectCard";
import { competitionProjects } from "../data/competitionProjects";

export function CompetitionPage() {
  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <a href="#/" className="secondary-button mb-10 py-2">← 返回首页</a>

        <div className="mb-12">
          <p className="section-kicker">Competition System</p>
          <h1 className="section-title text-4xl sm:text-5xl">电赛项目体系</h1>
          <p className="section-copy">
            围绕电赛电源类题目，构建可复用的模块化硬件平台。这里集中展示采样、供电、控制、功率级和接口策略等模块。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {competitionProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
