import type { Project } from "../types/site";
import type { Language } from "../types/language";
import { projectEnglish } from "../data/projectLocales";

interface ProjectDetailProps {
  project: Project;
  language: Language;
}

function PlaceholderDiagram({ title, subtitle, language }: { title: string; subtitle: string; language: Language }) {
  return (
    <div className="paper-card p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">{title}</h4>
        <span className="text-xs text-[#6B7280]">{language === "zh" ? "占位区" : "Placeholder"}</span>
      </div>
      <div className="rounded-lg border border-dashed border-[#BFD0DF] bg-[#F7F9FB]/75 p-5">
        <svg viewBox="0 0 640 160" className="h-auto w-full text-[#4F9CF9]/55" fill="none" aria-hidden="true">
          <rect x="24" y="42" width="130" height="68" rx="4" stroke="currentColor" />
          <rect x="255" y="42" width="130" height="68" rx="4" stroke="currentColor" />
          <rect x="486" y="42" width="130" height="68" rx="4" stroke="currentColor" />
          <path d="M154 76H255M385 76H486" stroke="currentColor" />
          <path d="M46 126C72 104 98 148 124 126C150 104 176 148 202 126" stroke="currentColor" />
          <path d="M430 126H596" stroke="currentColor" />
        </svg>
        <p className="mt-4 text-sm leading-7 text-[#6B7280]">{subtitle}</p>
      </div>
    </div>
  );
}

export function ProjectDetail({ project, language }: ProjectDetailProps) {
  const localized = language === "zh" ? project : projectEnglish[project.id as keyof typeof projectEnglish];

  return (
    <section className="border-t border-[#D8E0E7] pt-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">{language === "zh" ? "项目详情" : "Project Detail"}</p>
          <h3 className="mt-3 text-3xl font-semibold text-[#111827]">{localized.title}</h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#6B7280]">{localized.background}</p>
        </div>
        <span className="w-fit rounded-full border border-[#BFD0DF] bg-white px-4 py-2 text-sm text-[#425466]">
          {language === "zh" ? "当前状态" : "Status"}：{localized.status}
        </span>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "我的职责" : "My Role"}</h4>
          <ul className="detail-list">
            {localized.role.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "技术指标" : "Technical Targets"}</h4>
          <ul className="detail-list">
            {localized.indicators.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="xl:col-span-2">
          <PlaceholderDiagram title={localized.diagramTitle} subtitle={language === "zh" ? "后续可替换为系统框图、控制流程图或模块关系图。" : "Reserved for system diagrams, control flow, or module relationship maps."} language={language} />
        </div>
        <PlaceholderDiagram title={localized.schematicTitle} subtitle={language === "zh" ? "后续可放关键原理图截图，并标注关键器件与设计思路。" : "Reserved for key schematic captures and design notes."} language={language} />
        <PlaceholderDiagram title={localized.hardwareTitle} subtitle={language === "zh" ? "后续可放 PCB、3D 视图、实物图或焊接调试现场照片。" : "Reserved for PCB views, 3D renders, hardware photos, or lab debugging scenes."} language={language} />
        <div className="xl:col-span-2">
          <PlaceholderDiagram title={localized.waveformTitle} subtitle={language === "zh" ? "后续可放示波器波形、测试结果表格和关键现象说明。" : "Reserved for oscilloscope captures, test tables, and key observations."} language={language} />
        </div>
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "关键设计点" : "Key Design Points"}</h4>
          <ul className="detail-list">
            {localized.designPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "测试与验证" : "Testing & Validation"}</h4>
          <ul className="detail-list">
            {localized.verification.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "遇到的问题" : "Challenges"}</h4>
          <ul className="detail-list">
            {localized.issues.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card-block">
          <h4 className="detail-title">{language === "zh" ? "后续改进" : "Next Improvements"}</h4>
          <ul className="detail-list">
            {localized.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
