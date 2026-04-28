import type { PortfolioProject } from "../types/portfolio";

export const personalProjects: PortfolioProject[] = [
  {
    id: "totem-pole-pfc",
    category: "personal",
    title: "1kW Totem-Pole PFC",
    subtitle: "面向高 PF、低 THD 的数字控制 AC/DC 项目",
    summary: "围绕 220VAC 输入、400V 母线、STM32G4 数字控制和高功率因数整流展开的个人核心项目。",
    image: "images/power-board-components.jpg",
    tags: ["PFC", "STM32G4", "数字控制", "PF / THD"],
    status: "持续联调",
    goal: "实现高功率因数、低谐波和稳定母线控制，并沉淀一套可解释、可维护的数字电源控制代码。",
    responsibilities: ["设计控制软件架构", "规划采样、保护和 PWM 调制逻辑", "进行低压到高压的分阶段调试"],
    metrics: [
      { label: "功率目标", value: "1kW" },
      { label: "母线目标", value: "400V" },
      { label: "控制平台", value: "STM32G4" }
    ],
    diagramTitle: "PFC 控制系统框图",
    diagramNodes: ["交流输入", "采样链路", "数字控制", "功率级"],
    designPoints: ["状态机、保护、采样和控制环路分层", "ADC 同步采样与 PWM 更新时序明确", "逐步加入鲁棒性与性能优化模块"],
    progress: "核心架构和性能优化方向已建立，继续围绕 PF、THD、效率和稳定性做实测闭环。",
    validation: ["低压开环验证", "采样零点与比例检查", "保护触发和状态机切换测试"],
    improvements: ["补充完整实测波形", "记录 PF/THD/效率曲线", "整理调参方法和安全边界"]
  },
  {
    id: "half-bridge-llc",
    category: "personal",
    title: "半桥 LLC",
    subtitle: "面向高效率 DC/DC 的谐振变换器研究",
    summary: "围绕 LLC 谐振网络、频率调制、驱动时序和软开关区间进行设计与验证。",
    image: "images/circuit-board-abstract.jpg",
    tags: ["LLC", "谐振控制", "软开关", "效率优化"],
    status: "设计中",
    goal: "建立对 LLC 谐振变换器从理论、硬件到调试的完整理解，并形成可展示的工程项目。",
    responsibilities: ["分析谐振网络与工作区间", "规划驱动与采样链路", "制定波形验证和效率优化路径"],
    metrics: [
      { label: "类型", value: "DC/DC" },
      { label: "控制", value: "调频" },
      { label: "重点", value: "效率" }
    ],
    diagramTitle: "LLC 功率链路框图",
    diagramNodes: ["半桥驱动", "谐振腔", "变压器", "整流输出"],
    designPoints: ["关注谐振点附近的效率表现", "驱动死区和软开关条件联合考虑", "测试波形与理论工作区间相互校验"],
    progress: "正在推进理论分析、硬件规划和测试方案整理。",
    validation: ["驱动波形检查", "谐振频率范围测试", "输出稳态和动态响应观察"],
    improvements: ["补充参数设计表", "增加效率测试计划", "整理软开关判据和波形示例"]
  },
  {
    id: "mems-conditioning",
    category: "personal",
    title: "MEMS 调理电路",
    subtitle: "小信号采集与模拟前端能力展示",
    summary: "面向 MEMS 传感信号的调理、放大、滤波与接口设计，体现模拟前端和噪声意识。",
    image: "images/pcb-closeup.jpg",
    tags: ["MEMS", "模拟前端", "滤波", "小信号"],
    status: "方案整理中",
    goal: "展示对弱信号采集、前端调理和测试验证方法的理解，补充电力电子之外的模拟能力。",
    responsibilities: ["规划信号链路", "分析增益、带宽和噪声约束", "设计测试与标定思路"],
    metrics: [
      { label: "方向", value: "模拟前端" },
      { label: "对象", value: "小信号" },
      { label: "重点", value: "低噪声" }
    ],
    diagramTitle: "MEMS 信号链路框图",
    diagramNodes: ["MEMS 传感器", "放大/滤波", "ADC", "数据处理"],
    designPoints: ["增益与带宽匹配目标信号", "低噪声布局和供电处理", "保留标定与测试接口"],
    progress: "正在补充具体指标、原理图关键部分和测试结果。",
    validation: ["输入信号注入", "频响与噪声观察", "输出线性度检查"],
    improvements: ["补充实测曲线", "整理噪声来源分析", "增加电路截图与布局说明"]
  },
  {
    id: "stm32-digital-power-host",
    category: "personal",
    title: "STM32 数字电源上位机",
    subtitle: "用于参数调试、状态观察和数据记录的工具化方向",
    summary: "围绕数字电源调试需求，构建参数配置、状态监控、数据记录和调试流程辅助工具。",
    image: "images/electronics-lab-oscilloscope.jpg",
    tags: ["上位机", "参数调试", "数据记录", "工程工具"],
    status: "规划中",
    goal: "提升数字电源调试效率，让参数、状态和测试数据可以被系统化记录和复盘。",
    responsibilities: ["定义上位机数据需求", "规划通信协议和参数表", "设计调试记录与可视化方式"],
    metrics: [
      { label: "对象", value: "数字电源" },
      { label: "价值", value: "调试效率" },
      { label: "功能", value: "记录/监控" }
    ],
    diagramTitle: "上位机通信框图",
    diagramNodes: ["STM32", "通信接口", "上位机", "日志/图表"],
    designPoints: ["参数表统一管理", "关键状态实时显示", "测试数据可导出、可复盘"],
    progress: "需求结构已明确，后续根据 PFC/LLC 调试过程逐步落地。",
    validation: ["串口通信验证", "参数读写检查", "数据记录一致性检查"],
    improvements: ["补充 UI 原型", "定义通信协议", "增加自动化测试记录"]
  },
  {
    id: "personal-portfolio-site",
    category: "personal",
    title: "个人求职网站",
    subtitle: "工程项目能力的网页化展示系统",
    summary: "使用 Vite、React、TypeScript 和 Tailwind CSS 构建，用于展示电力电子硬件与嵌入式控制项目。",
    image: "images/circuit-board-abstract.jpg",
    tags: ["React", "TypeScript", "GitHub Pages", "作品集"],
    status: "持续迭代",
    goal: "把项目能力、工程过程和求职信息组织成清晰、可维护、可部署的个人作品集。",
    responsibilities: ["设计信息架构", "实现响应式页面", "配置 GitHub Pages 自动部署"],
    metrics: [
      { label: "技术栈", value: "Vite" },
      { label: "部署", value: "Pages" },
      { label: "形式", value: "静态站点" }
    ],
    diagramTitle: "作品集页面结构图",
    diagramNodes: ["首页入口", "项目列表", "项目详情", "联系入口"],
    designPoints: ["点击式信息架构避免长页面堆叠", "数据文件集中管理便于维护", "Hash 路由兼容 GitHub Pages 刷新"],
    progress: "已完成点击式作品集架构，后续继续补充真实图片、测试数据和项目文档。",
    validation: ["本地构建验证", "移动端布局检查", "GitHub Pages 路径兼容检查"],
    improvements: ["补充真实项目图片", "增加简历与 GitHub 链接", "持续优化项目详情文案"]
  }
];
