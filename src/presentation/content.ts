import type { Language } from "../data/siteCopy";
import type { PortfolioProject } from "../types/portfolio";

export const slideNames = {
  zh: ["个人开场", "电赛成果", "电源项目", "工程能力", "项目目录", "联系与简历"],
  en: ["Introduction", "Competition", "Power projects", "Engineering", "All projects", "Contact"]
};

export const powerProjects = [
  {
    id: "half-bridge-llc", short: "SiC LLC", image: "images/llc-full-load-board.jpg",
    specification: "400VDC → 24V / 300W",
    result: "94.4%", resultEn: "Efficiency", resultZh: "实测效率",
    work: ["谐振腔计算与 PQ40 磁件设计", "SiC 驱动、PCB 与样机焊接", "STM32G4 闭环及效率 / 纹波测试"],
    workEn: ["Resonant tank and PQ40 magnetics", "SiC drive, PCB and prototype assembly", "STM32G4 loop, efficiency and ripple tests"],
    evidence: "实测输出 279.6W · 纹波 287mVPP",
    evidenceEn: "279.6W measured output · 287mVPP ripple"
  },
  {
    id: "totem-pole-pfc", short: "Boost PFC", image: "images/pfc-boost-project.jpg",
    specification: "220VAC → 400VDC / 160W",
    result: "96.9%", resultEn: "Efficiency", resultZh: "实测效率",
    work: ["器件选型、损耗分析与磁件参数", "PCB、软启动与双环补偿设计", "Simulink 闭环建模及高压带载调试"],
    workEn: ["Component selection, losses and magnetics", "PCB, soft start and dual-loop compensation", "Simulink model and high-voltage load tests"],
    evidence: "160W 工作点 · PF 0.94",
    evidenceEn: "160W operating point · PF 0.94"
  },
  {
    id: "flyback", short: "Flyback", image: "images/flyback-project.jpg",
    specification: "85–265VAC → 24V / 3A",
    result: "≈85%", resultEn: "Efficiency at 220VAC", resultZh: "220VAC 实测效率",
    work: ["功率级计算与定制变压器设计", "RCD 吸收、TL431 + 光耦反馈", "高压 PCB、样机调试及纹波测试"],
    workEn: ["Power-stage calculations and transformer", "RCD clamp and TL431 optocoupler feedback", "High-voltage PCB, debugging and ripple tests"],
    evidence: "72W 输出 · 负载调整率 0.67%",
    evidenceEn: "72W output · 0.67% load regulation"
  }
];

export const capabilities = [
  { title: "方案计算", en: "Calculations", image: "images/capability-calculation.jpg", description: "拓扑、器件应力与闭环建模", descriptionEn: "Topology, device stress and loop models" },
  { title: "磁件设计", en: "Magnetics", image: "images/capability-magnetics.jpg", description: "变压器 / 电感、损耗与绕制", descriptionEn: "Transformers, inductors, losses and windings" },
  { title: "PCB 实现", en: "PCB layout", image: "images/capability-pcb-layout.jpg", description: "功率回路、驱动回路与采样布局", descriptionEn: "Power loops, gate drives and sensing" },
  { title: "驱动与控制", en: "Drive & control", image: "images/capability-stm32g4-control.jpg", description: "隔离驱动、STM32G4 与保护", descriptionEn: "Isolated drive, STM32G4 and protection" },
  { title: "闭环调试", en: "Closed-loop debug", image: "images/capability-closed-loop-debug.jpg", description: "分级上电、环路与整机联调", descriptionEn: "Staged power-up and system integration" },
  { title: "测试记录", en: "Validation", image: "images/capability-test-record.jpg", description: "效率、波形、纹波与调整率", descriptionEn: "Efficiency, waveforms, ripple and regulation" }
];

/** Presentation copy is intentionally separate: the desktop project content is preserved. */
export function presentationProject(project: PortfolioProject, language: Language): PortfolioProject {
  const zh = language === "zh";
  if (project.id === "2026-contest-ac-ac") {
    return {
      ...project,
      status: zh ? "队长兼硬件负责人 · 省级一等奖" : "Team captain & hardware lead · Provincial first prize",
      quickOverview: {
        ...project.quickOverview,
        contribution: zh
          ? "担任队长兼硬件负责人；独立完成硬件模块设计与调试，统筹 PFC、三相逆变和整机联调。SVPWM 软件由队友负责。"
          : "Team captain and hardware lead. Designed and debugged the hardware and coordinated PFC, inverter and system integration. A teammate implemented SVPWM.",
        outcome: zh ? "获省级一等奖；竞赛成绩 PF 0.99、输出 THD 1.3%。" : "Provincial first prize; competition PF 0.99 and output THD 1.3%."
      },
      progress: zh
        ? "整机已完成接线和联合调试。我担任队长兼硬件负责人，独立完成全部硬件；队友负责 SVPWM 控制程序。项目获省级一等奖，竞赛成绩为 PF 0.99、输出 THD 1.3%。"
        : "System wiring and integration are complete. As captain and hardware lead, I independently completed the hardware; a teammate implemented SVPWM. The project received a Provincial First Prize with competition PF 0.99 and output THD 1.3%.",
      designPoints: project.designPoints.map((point, index) => index === 1
        ? (zh
          ? "赛题目标为 PF≥0.98、效率≥95%、输出 THD≤2%、负载及输入电压调整率≤0.3%。最终竞赛成绩为 PF 0.99、输出 THD 1.3%；效率与调整率仍按设计目标标注。"
          : "Contest targets are PF≥0.98, efficiency≥95%, output THD≤2%, and load/input regulation≤0.3%. Final competition results are PF 0.99 and output THD 1.3%; efficiency and regulation remain labeled as design targets.")
        : point),
      validation: project.validation.map((point, index) => index === 4
        ? (zh
          ? "最终竞赛成绩：PF 0.99、输出 THD 1.3%。上方照片保留各自的调试工况；效率和调整率尚未列为实测成绩。"
          : "Final competition results: PF 0.99 and output THD 1.3%. The photographs retain their individual debug conditions; efficiency and regulation are not claimed as measured results.")
        : point),
      improvements: project.improvements.map((point, index) => index === 3
        ? (zh
          ? "后续可补充不同频率、负载点的效率与调整率测试表，形成更完整的分工况记录。"
          : "Future documentation can add efficiency and regulation tables across frequency and load conditions.")
        : point),
      metrics: [
        { label: zh ? "竞赛成果" : "Award", value: zh ? "省级一等奖" : "Provincial first prize", kind: "measured" },
        { label: zh ? "竞赛 PF" : "Competition PF", value: "0.99", kind: "measured" },
        { label: zh ? "输出 THD" : "Output THD", value: "1.3%", kind: "measured" },
        ...project.metrics.filter(metric => metric.kind === "design")
      ]
    };
  }
  if (powerProjects.some(item => item.id === project.id)) {
    return { ...project, status: (zh ? "硬件负责人 · " : "Hardware lead · ") + project.status };
  }
  return project;
}
