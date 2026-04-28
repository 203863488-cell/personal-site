import { skillGroups } from "../data/skills";
import type { Language } from "../types/language";

interface SkillMatrixProps {
  language: Language;
}

export function SkillMatrix({ language }: SkillMatrixProps) {
  const groups =
    language === "zh"
      ? skillGroups
      : [
          {
            title: "Power Electronics",
            summary: "Understanding converter topology, control targets, and system-level tradeoffs.",
            skills: [
              { name: "Totem-Pole PFC", level: "Deepening" },
              { name: "Half-Bridge LLC", level: "Deepening" },
              { name: "Buck / Boost / Half-Bridge", level: "Practical" }
            ]
          },
          {
            title: "Analog Circuits",
            summary: "Focused on signal conditioning, isolation, and sampling consistency.",
            skills: [
              { name: "Voltage / Current Sampling", level: "Practical" },
              { name: "Isolation and Conditioning", level: "Practical" },
              { name: "Small-Signal Front-End", level: "Growing" }
            ]
          },
          {
            title: "Embedded",
            summary: "Real-time control, timing organization, and protection logic.",
            skills: [
              { name: "STM32G4", level: "Core Focus" },
              { name: "PWM / ADC Trigger", level: "Practical" },
              { name: "State Machine / Protection", level: "Practical" }
            ]
          },
          {
            title: "PCB",
            summary: "Power loops, gate-drive loops, and isolation planning.",
            skills: [
              { name: "Power Loop Layout", level: "Practical" },
              { name: "Drive and Isolation Planning", level: "Practical" },
              { name: "EMI Thinking", level: "Growing" }
            ]
          },
          {
            title: "Toolchain",
            summary: "Tools and workflows for efficient validation and engineering iteration.",
            skills: [
              { name: "Oscilloscope / Electronic Load", level: "Practical" },
              { name: "PCB Design Workflow", level: "Practical" },
              { name: "Git / Documentation", level: "Used Often" }
            ]
          },
          {
            title: "Communication",
            summary: "Turning project reasoning and reviews into clear technical materials.",
            skills: [
              { name: "Design Reports", level: "Practical" },
              { name: "Review Slides", level: "Practical" },
              { name: "Project Retrospective", level: "Improving" }
            ]
          }
        ];

  return (
    <section id="skills" className="section-shell">
      <div className="mb-12">
        <p className="section-kicker">{language === "zh" ? "技能矩阵" : "Skill Matrix"}</p>
        <h2 className="section-title">
          {language === "zh" ? "适合在求职中快速说明的能力分组" : "Skill groups designed for fast portfolio scanning"}
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="paper-card p-6">
            <h3 className="text-xl font-semibold text-[#111827]">{group.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">{group.summary}</p>
            <div className="mt-6 space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-[#1F2933]">{skill.name}</span>
                    <span className="text-xs text-[#6B7280]">{skill.level}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#E7EDF2]">
                    <div
                      className={`h-1.5 rounded-full ${
                        skill.level === "重点方向" || skill.level === "Core Focus"
                          ? "w-[88%] bg-[#4F9CF9]"
                          : skill.level === "持续深入" || skill.level === "Deepening"
                            ? "w-[80%] bg-[#7AA2F7]"
                            : skill.level === "具备实践" || skill.level === "Practical"
                              ? "w-[72%] bg-[#5CC8A7]"
                              : "w-[64%] bg-[#9BA8B5]"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
