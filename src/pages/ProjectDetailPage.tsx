import { ProjectDetail } from "../components/ProjectDetail";
import { allProjects } from "../data/allProjects";

interface ProjectDetailPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const project = allProjects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="section-shell pt-16">
        <a href="#/" className="secondary-button mb-10 py-2">← 返回首页</a>
        <div className="paper-card p-8">
          <p className="section-kicker">Not Found</p>
          <h1 className="mt-4 text-3xl font-semibold text-[#111827]">没有找到这个项目</h1>
          <p className="mt-4 text-[#6B7280]">请从电赛项目体系或个人项目作品页面重新进入。</p>
        </div>
      </section>
    );
  }

  const backHref = project.category === "competition" ? "#/competition" : "#/personal";
  const backLabel = project.category === "competition" ? "返回电赛项目体系" : "返回个人项目作品";

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pt-16">
        <div className="mb-10 flex flex-wrap gap-3">
          <a href={backHref} className="secondary-button py-2">← {backLabel}</a>
          <a href="#/" className="secondary-button py-2">返回首页</a>
        </div>
        <ProjectDetail project={project} />
      </section>
    </div>
  );
}
