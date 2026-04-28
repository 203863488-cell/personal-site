import type { Language } from "../types/language";

export type GatewayCardKind = "photo" | "diagram" | "wave";

export interface GatewayCard {
  title: string;
  subtitle: string;
  imageUrl?: string;
  kind: GatewayCardKind;
}

export interface GatewayTrack {
  title: string;
  subtitle: string;
  tiles: readonly string[];
}

export interface PortfolioGatewayContent {
  cards: readonly GatewayCard[];
  tracks: readonly GatewayTrack[];
}

export const portfolioGatewayContent: Record<Language, PortfolioGatewayContent> = {
  zh: {
    cards: [
      {
        title: "工程定位",
        subtitle: "电力电子硬件 / 嵌入式控制",
        imageUrl: "/images/electronics-lab-oscilloscope.jpg",
        kind: "photo"
      },
      {
        title: "项目方法",
        subtitle: "从原理图、PCB 到调试验证",
        imageUrl: "/images/pcb-closeup.jpg",
        kind: "diagram"
      },
      {
        title: "求职方向",
        subtitle: "功率变换器与数字电源岗位",
        imageUrl: "/images/circuit-board-abstract.jpg",
        kind: "wave"
      }
    ],
    tracks: [
      {
        title: "电赛模块能力",
        subtitle: "采样、辅助供电、控制板与功率板",
        tiles: ["隔离采样板", "辅助电源模块", "STM32G4 控制板"]
      },
      {
        title: "个人硬核项目",
        subtitle: "PFC、LLC 与高频功率控制",
        tiles: ["1kW Totem-Pole PFC", "半桥 LLC", "MEMS 调理电路"]
      },
      {
        title: "测试与复盘",
        subtitle: "波形、指标、问题定位与文档沉淀",
        tiles: ["示波器波形", "测试记录", "设计复盘"]
      }
    ]
  },
  en: {
    cards: [
      {
        title: "Engineering Profile",
        subtitle: "Power electronics hardware / embedded control",
        imageUrl: "/images/electronics-lab-oscilloscope.jpg",
        kind: "photo"
      },
      {
        title: "Project Method",
        subtitle: "From schematic and PCB to validation",
        imageUrl: "/images/pcb-closeup.jpg",
        kind: "diagram"
      },
      {
        title: "Career Focus",
        subtitle: "Converter and digital power roles",
        imageUrl: "/images/circuit-board-abstract.jpg",
        kind: "wave"
      }
    ],
    tracks: [
      {
        title: "Competition Modules",
        subtitle: "Sampling, auxiliary supply, control and power boards",
        tiles: ["Isolated Sampling", "Auxiliary Supply", "STM32G4 Control Board"]
      },
      {
        title: "Flagship Projects",
        subtitle: "PFC, LLC, and high-frequency power control",
        tiles: ["1kW Totem-Pole PFC", "Half-Bridge LLC", "MEMS Conditioning"]
      },
      {
        title: "Test & Review",
        subtitle: "Waveforms, metrics, debugging, and documentation",
        tiles: ["Scope Waveforms", "Test Logs", "Design Review"]
      }
    ]
  }
};
