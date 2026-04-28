import type { SkillGroup } from "../types/site";

export const skillGroups: SkillGroup[] = [
  {
    title: "电力电子",
    summary: "围绕功率拓扑、控制目标与系统性能建立工程认识。",
    skills: [
      { name: "Totem-Pole PFC", level: "持续深入" },
      { name: "半桥 LLC", level: "持续深入" },
      { name: "Buck / Boost / 半桥", level: "具备实践" }
    ]
  },
  {
    title: "模拟电路",
    summary: "重视前端调理、隔离与采样一致性。",
    skills: [
      { name: "电压 / 电流采样", level: "具备实践" },
      { name: "隔离放大与调理", level: "具备实践" },
      { name: "小信号调理", level: "持续积累" }
    ]
  },
  {
    title: "嵌入式",
    summary: "关注实时控制、时序规划与保护逻辑。",
    skills: [
      { name: "STM32G4", level: "重点方向" },
      { name: "PWM / ADC 触发", level: "具备实践" },
      { name: "状态机 / 保护逻辑", level: "具备实践" }
    ]
  },
  {
    title: "PCB",
    summary: "强调功率环路、驱动环路与隔离区域规划。",
    skills: [
      { name: "功率回路布局", level: "具备实践" },
      { name: "驱动与隔离规划", level: "具备实践" },
      { name: "EMI 思路", level: "持续积累" }
    ]
  },
  {
    title: "工具链",
    summary: "围绕验证效率与工程流程构建工具使用习惯。",
    skills: [
      { name: "示波器 / 电子负载", level: "具备实践" },
      { name: "Altium / KiCad 思维", level: "具备实践" },
      { name: "Git / 文档协同", level: "持续使用" }
    ]
  },
  {
    title: "文档表达",
    summary: "把设计思路、问题复盘与评审内容沉淀成可交流材料。",
    skills: [
      { name: "设计报告", level: "具备实践" },
      { name: "评审 PPT", level: "具备实践" },
      { name: "项目复盘", level: "持续强化" }
    ]
  }
];
