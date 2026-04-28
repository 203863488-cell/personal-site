import { abilities } from "../data/profile";
import type { Language } from "../types/language";

interface AbilityGridProps {
  language: Language;
}

export function AbilityGrid({ language }: AbilityGridProps) {
  const abilityItems =
    language === "zh"
      ? abilities
      : [
          {
            title: "Power Topologies",
            description: "Building practical understanding around common AC-DC and DC-DC converter topologies.",
            points: ["Buck", "Boost", "Half-Bridge", "LLC", "Totem-Pole PFC"],
            accent: ""
          },
          {
            title: "Analog & Sampling",
            description: "Keeping front-end signal quality stable and trustworthy for control systems.",
            points: ["Isolation Amplifier", "Voltage Sampling", "Current Sampling", "ADC Conditioning"],
            accent: ""
          },
          {
            title: "Embedded Control",
            description: "Using STM32G4 to build power control, state machines, and protection logic.",
            points: ["STM32G4", "PWM", "ADC Sync Sampling", "Protection Logic"],
            accent: ""
          },
          {
            title: "PCB Design",
            description: "Planning layout around power loops, gate-drive loops, isolation, and EMI constraints.",
            points: ["Power Loop", "Drive Loop", "Isolation Clearance", "EMI Thinking"],
            accent: ""
          },
          {
            title: "Testing & Debugging",
            description: "Working from low-voltage validation to waveform-based diagnosis.",
            points: ["Oscilloscope", "Electronic Load", "Low-Voltage Test", "Waveform Analysis"],
            accent: ""
          },
          {
            title: "Documentation & Collaboration",
            description: "Turning designs, reviews, and project lessons into clear engineering materials.",
            points: ["Review Decks", "Design Reports", "Task Breakdown", "Progress Sync"],
            accent: ""
          }
        ];

  return (
    <section className="section-shell">
      <div className="mb-12">
        <p className="section-kicker">{language === "zh" ? "能力概览" : "Capabilities"}</p>
        <h2 className="section-title">
          {language === "zh" ? "以工程落地为导向的能力矩阵" : "A capability map shaped around engineering delivery"}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {abilityItems.map((item, index) => (
          <article
            key={item.title}
            className={`paper-card paper-card-hover p-6 ${
              index === 0 ? "md:col-span-2 xl:col-span-2" : ""
            }`}
          >
            <div className="mb-8 h-px w-full bg-gradient-to-r from-[#4F9CF9]/35 via-[#D8E0E7] to-transparent" />
            <h3 className="text-xl font-semibold text-[#111827]">{item.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B7280]">{item.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.points.map((point) => (
                <span key={point} className="pill px-3 py-1.5 text-xs">
                  {point}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
