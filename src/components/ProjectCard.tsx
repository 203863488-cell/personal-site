import type { Project } from "../types/site";
import type { Language } from "../types/language";
import { projectEnglish } from "../data/projectLocales";

interface ProjectCardProps {
  project: Project;
  active: boolean;
  language: Language;
  onSelect: (projectId: string) => void;
}

export function ProjectCard({ project, active, language, onSelect }: ProjectCardProps) {
  const localized = language === "zh" ? project : projectEnglish[project.id as keyof typeof projectEnglish];

  return (
    <article
      className={`paper-card paper-card-hover p-6 ${
        active ? "border-[#4F9CF9]/45 bg-[#F7FBFF]/82" : ""
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#111827]">{localized.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">{localized.summary}</p>
        </div>
        <span className="w-fit rounded-full border border-[#D8E0E7] bg-white px-3 py-1 text-xs text-[#425466]">
          {localized.status}
        </span>
      </div>

      <div className="mt-6 h-28 rounded-lg border border-[#D8E0E7]/80 bg-[linear-gradient(rgba(79,156,249,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(79,156,249,0.06)_1px,transparent_1px)] bg-[size:18px_18px] p-4">
        <div className="h-full rounded border border-dashed border-[#BFD0DF] bg-white/45" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {localized.tags.map((tag) => (
          <span key={tag} className="pill px-3 py-1.5 text-xs">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
        {localized.metrics.map((metric) => (
          <div key={metric.label} className="bg-white/82 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#6B7280]">{metric.label}</p>
            <p className="mt-2 text-base font-semibold text-[#111827]">{metric.value}</p>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => onSelect(project.id)} className="secondary-button mt-6 py-2">
        {language === "zh" ? "查看详情" : "View Details"}
      </button>
    </article>
  );
}
