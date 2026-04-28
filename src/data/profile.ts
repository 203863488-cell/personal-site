import type { AbilityItem, ProfileData } from "../types/site";

export const profile: ProfileData = {
  name: "蓝宏涛",
  title: "电力电子硬件与嵌入式控制",
  subtitle:
    "关注功率变换器、隔离采样、STM32G4 数字控制与工程化调试，能够从原理图、PCB、焊接、代码到测试验证完整推进项目。",
  tags: [
    "Totem-Pole PFC",
    "LLC",
    "STM32G4",
    "隔离采样",
    "辅助电源",
    "电赛"
  ],
  dashboard: [
    { label: "项目数量", value: "05" },
    { label: "最高功率目标", value: "1kW" },
    { label: "核心方向", value: "PFC / LLC" },
    { label: "测试状态", value: "持续联调" }
  ]
};

export const abilities: AbilityItem[] = [
  {
    title: "功率拓扑",
    description: "围绕常见 AC-DC / DC-DC 拓扑建立系统理解与实践能力。",
    points: ["Buck", "Boost", "半桥", "LLC", "Totem-Pole PFC"],
    accent: "from-sky-500/20 to-cyan-400/10"
  },
  {
    title: "模拟与采样",
    description: "重视前端信号质量，保证控制系统输入链路稳定可信。",
    points: ["隔离放大器", "电压采样", "电流采样", "ADC 调理"],
    accent: "from-cyan-500/20 to-teal-400/10"
  },
  {
    title: "嵌入式控制",
    description: "使用 STM32G4 构建功率控制、状态机与保护逻辑。",
    points: ["STM32G4", "PWM", "ADC 同步采样", "保护逻辑"],
    accent: "from-indigo-500/20 to-sky-400/10"
  },
  {
    title: "PCB 设计",
    description: "围绕功率环路、驱动环路、隔离间距与 EMI 约束进行布局规划。",
    points: ["功率回路", "驱动回路", "隔离间距", "EMI 思路"],
    accent: "from-amber-500/20 to-emerald-400/10"
  },
  {
    title: "测试调试",
    description: "坚持低压先行、分模块验证与波形驱动的问题定位方式。",
    points: ["示波器", "电子负载", "低压验证", "波形分析"],
    accent: "from-emerald-500/20 to-cyan-400/10"
  },
  {
    title: "文档与协作",
    description: "不仅做硬件，也重视评审、复盘、表达与团队分工协同。",
    points: ["评审 PPT", "设计报告", "任务拆解", "进度同步"],
    accent: "from-violet-500/20 to-sky-400/10"
  }
];
