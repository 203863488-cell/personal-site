import type { Language } from "../types/language";

export interface FeatureSlide {
  id: string;
  content: Record<
    Language,
    {
      kicker: string;
      title: string;
      description: string;
      tags: string[];
      metrics: { label: string; value: string }[];
    }
  >;
  visual: "welcome" | "pfc" | "sampling" | "llc";
  imageUrl?: string;
}

export const featureSlides: FeatureSlide[] = [
  {
    id: "welcome",
    content: {
      zh: {
        kicker: "Welcome",
        title: "蓝宏涛的个人空间",
        description: "这里集中展示我的电力电子硬件、嵌入式控制与功率变换器项目，也记录从设计、焊接、代码到测试验证的工程实践。",
        tags: ["求职作品集", "电子实验室", "工程实践", "项目记录"],
        metrics: [
          { label: "方向", value: "电力电子" },
          { label: "能力", value: "硬件 + 控制" },
          { label: "目标", value: "求职展示" }
        ]
      },
      en: {
        kicker: "Welcome",
        title: "Lantao Lan's Personal Space",
        description: "A portfolio for power electronics hardware, embedded control, and converter projects, documenting work from schematic and PCB to code and validation.",
        tags: ["Portfolio", "Electronics Lab", "Engineering Practice", "Project Notes"],
        metrics: [
          { label: "Focus", value: "Power Electronics" },
          { label: "Ability", value: "HW + Control" },
          { label: "Goal", value: "Career Portfolio" }
        ]
      }
    },
    visual: "welcome",
    imageUrl: "images/electronics-lab-oscilloscope.jpg"
  },
  {
    id: "pfc",
    content: {
      zh: {
        kicker: "Featured Project 01",
        title: "1kW Totem-Pole PFC",
        description: "围绕高功率因数整流、母线稳压、采样一致性和控制鲁棒性展开的个人硬核项目。",
        tags: ["AC-DC", "STM32G4", "PF / THD", "数字控制"],
        metrics: [
          { label: "功率目标", value: "1kW" },
          { label: "母线目标", value: "400V" },
          { label: "状态", value: "调试中" }
        ]
      },
      en: {
        kicker: "Featured Project 01",
        title: "1kW Totem-Pole PFC",
        description: "A personal flagship project focused on high power factor rectification, bus regulation, sampling consistency, and robust digital control.",
        tags: ["AC-DC", "STM32G4", "PF / THD", "Digital Control"],
        metrics: [
          { label: "Power Target", value: "1kW" },
          { label: "Bus Target", value: "400V" },
          { label: "Status", value: "Debugging" }
        ]
      }
    },
    visual: "pfc",
    imageUrl: "images/power-board-components.jpg"
  },
  {
    id: "sampling",
    content: {
      zh: {
        kicker: "Competition Module",
        title: "电赛隔离采样与控制平台",
        description: "从隔离采样、辅助供电、控制板到功率板，形成可复用的电力电子实验平台能力。",
        tags: ["隔离采样", "辅助电源", "控制板", "PCB"],
        metrics: [
          { label: "模块数量", value: "3+" },
          { label: "角色", value: "系统支撑" },
          { label: "状态", value: "已打板" }
        ]
      },
      en: {
        kicker: "Competition Module",
        title: "Isolated Sampling & Control Platform",
        description: "Reusable power electronics platform capability built from sampling boards, auxiliary supplies, control boards, and power stages.",
        tags: ["Isolated Sampling", "Aux Supply", "Control Board", "PCB"],
        metrics: [
          { label: "Modules", value: "3+" },
          { label: "Role", value: "System Support" },
          { label: "Status", value: "PCB Ordered" }
        ]
      }
    },
    visual: "sampling",
    imageUrl: "images/pcb-closeup.jpg"
  },
  {
    id: "llc",
    content: {
      zh: {
        kicker: "Research Direction",
        title: "半桥 LLC 与高频调试能力",
        description: "面向谐振变换器、驱动时序、软开关区间和效率优化的持续研究方向。",
        tags: ["LLC", "谐振控制", "驱动时序", "波形分析"],
        metrics: [
          { label: "方向", value: "DC-DC" },
          { label: "重点", value: "效率" },
          { label: "状态", value: "设计中" }
        ]
      },
      en: {
        kicker: "Research Direction",
        title: "Half-Bridge LLC & High-Frequency Debugging",
        description: "An ongoing research direction around resonant converters, gate-drive timing, soft-switching regions, and efficiency tuning.",
        tags: ["LLC", "Resonant Control", "Gate Timing", "Waveform Analysis"],
        metrics: [
          { label: "Domain", value: "DC-DC" },
          { label: "Focus", value: "Efficiency" },
          { label: "Status", value: "Designing" }
        ]
      }
    },
    visual: "llc",
    imageUrl: "images/circuit-board-abstract.jpg"
  }
];
