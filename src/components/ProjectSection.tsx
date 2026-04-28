import { useMemo, useRef } from "react";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";
import type { Language } from "../types/language";

interface ProjectSectionProps {
  language: Language;
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
}

export function ProjectSection({ language, selectedProjectId, onSelectProject }: ProjectSectionProps) {
  const detailRef = useRef<HTMLDivElement | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId]
  );

  const handleSelect = (projectId: string) => {
    onSelectProject(projectId);
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="projects" className="section-shell">
      <div className="mb-12">
        <p className="section-kicker">{language === "zh" ? "精选项目" : "Selected Projects"}</p>
        <h2 className="section-title">
          {language === "zh"
            ? "围绕硬件、控制与验证展开的代表性项目"
            : "Representative projects across hardware, control, and validation"}
        </h2>
        <p className="section-copy">
          {language === "zh"
            ? "页面优先展示最能体现求职能力的项目。每个项目都保留后续补充框图、波形、测试结果和实物图片的位置，方便持续迭代。"
            : "These projects are structured for career presentation, with reserved space for diagrams, waveforms, test results, and hardware photos."}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            active={project.id === selectedProject.id}
            language={language}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div ref={detailRef} className="mt-16">
        <ProjectDetail project={selectedProject} language={language} />
      </div>
    </section>
  );
}
