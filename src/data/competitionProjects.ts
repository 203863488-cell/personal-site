import type { PortfolioProject } from "../types/portfolio";

export const competitionProjects: PortfolioProject[] = [
  {
    id: "isolated-sampling-board",
    category: "competition",
    title: "交直流电压电流隔离采样板",
    subtitle: "面向电源类题目的通用采样前端",
    summary: "为控制系统提供可靠、隔离、可标定的电压电流采样链路，支撑多种 AC/DC、DC/DC 调试场景。",
    image: "images/pcb-closeup.jpg",
    tags: ["隔离采样", "ADC 调理", "运放前端", "校准"],
    status: "已打板 / 持续优化",
    goal: "构建一块可复用的交直流电压电流采样模块，降低电赛中重复搭建前端链路的时间成本。",
    responsibilities: ["设计采样链路与接口定义", "规划隔离、调理和 ADC 输入范围", "整理调试流程与标定思路"],
    metrics: [
      { label: "输入类型", value: "AC / DC" },
      { label: "输出接口", value: "ADC" },
      { label: "用途", value: "控制前端" }
    ],
    diagramTitle: "采样链路系统框图",
    diagramNodes: ["高压/电流输入", "隔离与调理", "ADC 接口", "控制板"],
    designPoints: ["输入保护与量程规划", "模拟地与数字地的噪声隔离", "统一接口定义，方便快速接入控制板"],
    progress: "模块结构已完成，后续重点补充实测数据、误差分析和标定记录。",
    validation: ["低压信号注入验证", "输出范围与 ADC 匹配检查", "采样一致性与噪声观察"],
    improvements: ["补充标定表格", "增加不同量程版本", "整理为电赛通用模块文档"]
  },
  {
    id: "auxiliary-power-module",
    category: "competition",
    title: "辅助电源模块",
    subtitle: "为驱动、控制与采样模块提供稳定供电",
    summary: "围绕多路低压电源需求，设计辅助供电模块，保证控制板、驱动板和采样板具备清晰稳定的电源基础。",
    image: "images/electronics-lab-oscilloscope.jpg",
    tags: ["辅助供电", "多路输出", "低压验证", "系统供电"],
    status: "模块验证中",
    goal: "形成一套可复用的低压辅助供电方案，支撑电赛整机系统快速搭建和分模块调试。",
    responsibilities: ["梳理整机供电需求", "规划输出电压、电流和接口", "进行低压上电与负载检查"],
    metrics: [
      { label: "应用", value: "控制/驱动" },
      { label: "验证方式", value: "低压先行" },
      { label: "目标", value: "稳定供电" }
    ],
    diagramTitle: "辅助供电分配框图",
    diagramNodes: ["输入电源", "辅助电源", "控制板", "驱动/采样"],
    designPoints: ["不同模块电源域清晰分配", "接口防呆与上电顺序意识", "保留测试点方便排查供电问题"],
    progress: "已形成模块化设计思路，正在补充输出纹波、负载能力和接口说明。",
    validation: ["空载与带载输出检查", "关键节点纹波观察", "与控制板联调验证"],
    improvements: ["补充效率与温升数据", "完善接口丝印", "整理故障排查清单"]
  },
  {
    id: "stm32g4-control-board",
    category: "competition",
    title: "STM32G4 控制板",
    subtitle: "面向数字电源控制的核心控制平台",
    summary: "以 STM32G4 为核心，围绕 PWM、ADC 同步采样、保护输入和通信接口构建可复用控制板。",
    image: "images/circuit-board-abstract.jpg",
    tags: ["STM32G4", "PWM", "ADC 同步", "保护逻辑"],
    status: "调试中",
    goal: "沉淀一块适合电源类题目的控制板，支撑 PFC、LLC、半桥等功率级快速验证。",
    responsibilities: ["规划控制板接口", "设计 PWM、ADC、保护与通信资源", "配合功率板进行联调"],
    metrics: [
      { label: "MCU", value: "STM32G4" },
      { label: "控制对象", value: "功率变换器" },
      { label: "重点", value: "实时控制" }
    ],
    diagramTitle: "控制板资源框图",
    diagramNodes: ["STM32G4", "ADC 输入", "PWM 输出", "保护/通信"],
    designPoints: ["PWM 与 ADC 采样时序统一规划", "硬件保护输入预留", "调试接口与关键测试点明确"],
    progress: "基础控制平台已建立，后续重点完善代码模板和接口文档。",
    validation: ["PWM 输出检查", "ADC 同步采样验证", "保护输入触发测试"],
    improvements: ["补充标准化引脚表", "完善控制代码模板", "增加调试状态指示"]
  },
  {
    id: "four-mos-half-bridge-board",
    category: "competition",
    title: "四 MOS 半桥功率板",
    subtitle: "适配多种功率变换器实验的功率级平台",
    summary: "围绕半桥功率级、驱动回路、功率回路和保护接口展开设计，服务电赛功率变换实验。",
    image: "images/power-board-components.jpg",
    tags: ["半桥", "MOSFET", "驱动回路", "功率回路"],
    status: "设计迭代中",
    goal: "搭建一块可复用的半桥功率板，为 Buck、Boost、LLC 等实验提供功率级基础。",
    responsibilities: ["规划功率回路与驱动回路", "考虑母线电容、采样和保护接口", "制定低压调试路径"],
    metrics: [
      { label: "拓扑", value: "半桥" },
      { label: "器件", value: "4 MOS" },
      { label: "验证", value: "分阶段" }
    ],
    diagramTitle: "半桥功率级框图",
    diagramNodes: ["母线输入", "驱动隔离", "MOS 半桥", "负载/变压器"],
    designPoints: ["减小高 di/dt 回路面积", "驱动回路和功率回路分区", "保留电流、电压和温度观测点"],
    progress: "处于结构优化阶段，重点提升可调试性和安全边界。",
    validation: ["低压 PWM 驱动测试", "死区与波形检查", "母线电压逐步提升验证"],
    improvements: ["补充热设计评估", "完善保护链路", "增加布局复盘说明"]
  },
  {
    id: "competition-interface-strategy",
    category: "competition",
    title: "电赛模块化接口策略",
    subtitle: "让采样、控制、供电、功率级可以快速组合",
    summary: "通过统一接口、电源定义、信号命名和调试流程，提升团队协作和模块复用效率。",
    image: "images/circuit-board-abstract.jpg",
    tags: ["接口规范", "模块化", "团队协作", "调试流程"],
    status: "持续沉淀",
    goal: "把电赛硬件从一次性搭建转向模块化平台，提高调试效率与方案复用能力。",
    responsibilities: ["定义模块边界和信号接口", "整理联调顺序和风险点", "输出可复用文档"],
    metrics: [
      { label: "对象", value: "电赛平台" },
      { label: "价值", value: "复用" },
      { label: "方式", value: "文档化" }
    ],
    diagramTitle: "模块化平台关系图",
    diagramNodes: ["辅助电源", "采样板", "控制板", "功率板"],
    designPoints: ["接口统一降低联调成本", "电源域和信号域清晰标注", "先模块验证，再整机联调"],
    progress: "已形成基本方法论，后续会继续补充接口表、照片和调试案例。",
    validation: ["模块独立验证", "模块间连接检查", "整机联调记录"],
    improvements: ["形成模板化接口文档", "补充常见故障库", "沉淀团队交接资料"]
  }
];
