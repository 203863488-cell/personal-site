import { timelineItems } from "../data/timeline";
import type { Language } from "../types/language";

interface TimelineProps {
  language: Language;
}

export function Timeline({ language }: TimelineProps) {
  const items =
    language === "zh"
      ? timelineItems
      : [
          {
            period: "Stage 01",
            title: "University Electronics Study",
            description: "Built foundational understanding in electronics, power circuits, and control systems.",
            category: "Coursework"
          },
          {
            period: "Stage 02",
            title: "R&D Internship",
            description: "Learned the importance of process, review, validation, and team collaboration in real engineering work.",
            category: "Internship"
          },
          {
            period: "Stage 03",
            title: "Competition Team Projects",
            description: "Designed modules such as sampling boards, auxiliary supplies, and control boards in a team setting.",
            category: "Competition"
          },
          {
            period: "Stage 04",
            title: "Personal PFC / LLC Projects",
            description: "Moved deeper into high-performance converter projects, control logic, protection, and debugging.",
            category: "Personal Projects"
          },
          {
            period: "Stage 05",
            title: "Career Direction",
            description: "Seeking roles in power electronics hardware, embedded control, and converter systems.",
            category: "Career"
          }
        ];

  return (
    <section id="timeline" className="section-shell">
      <div className="mb-12">
        <p className="section-kicker">{language === "zh" ? "经历时间线" : "Timeline"}</p>
        <h2 className="section-title">
          {language === "zh" ? "从课程学习到项目深化的成长路径" : "A growth path from coursework to deeper hardware projects"}
        </h2>
      </div>

      <div className="relative pl-7 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-[#D8E0E7]">
        {items.map((item) => (
          <article key={item.period} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.45rem] top-7 h-3 w-3 rounded-full border border-[#4F9CF9]/45 bg-[#F8FAF7] shadow-[0_0_0_7px_rgba(248,250,247,0.95)]" />
            <div className="paper-card p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4F9CF9]">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#111827]">{item.title}</h3>
                </div>
                <span className="w-fit rounded-full border border-[#D8E0E7] bg-white px-3 py-1 text-xs text-[#55616E]">
                  {item.category}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
