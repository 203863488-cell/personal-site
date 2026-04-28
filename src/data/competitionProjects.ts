import type { PortfolioProject } from "../types/portfolio";

export const competitionProjects: PortfolioProject[] = [
  {
    id: "isolated-sampling-board",
    category: "competition",
    title: "交直流电压电流隔离采样板",
    subtitle: "基于 AMC1301 的双通道隔离采样前端",
    summary: "面向电赛电源类题目设计的交直流电压、电流隔离采样板，电压通道负责把 P 对 GND 的母线电压缩放到隔离放大器可接受范围，电流通道通过 P-N 之间的 20mΩ 分流电阻把电流转换为毫伏级压降，再经过隔离放大和运放偏置调理，最终输出适配 3.3V ADC 的采样信号。",
    image: "images/isolated-sampling-board.png",
    detailImages: [
      {
        src: "images/isolated-sampling-board.png",
        title: "隔离采样板 PCB",
        description: "板上集中标注 P/N/GND 输入、20mΩ 分流电阻、峰值电压 85V、峰值电流 4A、ADC 换算公式和关键测试点，便于现场接线与调试。"
      },
      {
        src: "images/isolated-sampling-schematic-main.png",
        title: "电压 / 电流隔离采样主原理图",
        description: "左侧为电压采样链路，右侧为 20mΩ 分流电流采样链路，两路均经过 AMC1301 隔离放大，再由 TLV9062 完成 1.65V 偏置和 ADC 调理。"
      },
      {
        src: "images/isolated-sampling-schematic-power.png",
        title: "隔离供电与 3.3V 参考部分",
        description: "包含 5V 输入保护、3.3V 稳压、B0505S 隔离电源、ISO_5V_1 / ISO_5V_2 去耦和 1.65V 偏置相关电路。"
      }
    ],
    tags: ["AMC1301", "TLV9062", "20mΩ 分流采样", "隔离供电"],
    status: "已完成打板",
    goal: "构建一块可复用的交直流电压电流隔离采样模块，让功率级、采样板和控制板之间形成清晰接口：高压侧只负责接入待测电压/电流，隔离侧完成安全隔离与比例缩放，控制侧直接读取以 1.65V 为零点偏置的 ADC 信号。",
    responsibilities: ["根据 85V 峰值电压和 4A 峰值电流目标，分别确定电压分压比例、电流分流阻值和 ADC 输出范围", "设计电压采样与 20mΩ 电流分流采样链路，把高压/大电流信号先转换为适合 AMC1301 输入的低压差分信号", "使用 AMC1301 实现采样信号隔离放大，并通过 TLV9062 构造 1.65V 中点偏置，使双向电压/电流变化能够落在 0-3.3V ADC 量程内", "规划 5V、3.3V、ISO_5V_1、ISO_5V_2 电源域，利用 B0505S 为隔离侧供电，避免高压侧地与控制侧地直接耦合", "在 PCB 上标注换算公式、P/N/GND 端子方向、5V 输入、测试点和隔离电源节点，方便比赛现场快速接线、测量和排查"],
    metrics: [
      { label: "峰值电压", value: "85V" },
      { label: "峰值电流", value: "4A" },
      { label: "采样电阻", value: "20mΩ" }
    ],
    diagramTitle: "采样链路系统框图",
    diagramNodes: ["P/N/GND 输入端子", "分压/20mΩ 分流", "AMC1301 隔离放大", "TLV9062 + 3.3V ADC"],
    designPoints: ["从指标反推信号链：先以 85V 峰值电压和 4A 峰值电流确定 ADC 端允许摆幅，再倒推前端分压比例、20mΩ 分流阻值、AMC1301 输入范围和 TLV9062 输出偏置，保证整条链路从功率端到 MCU 端都有明确裕量。", "电压通道采用“高阻分压 + 隔离放大 + 偏置调理”的结构。P->GND 电压先被压缩到隔离放大器输入范围内，再由 TLV9062 整理为以 1.65V 为中心的 ADC 信号，换算关系固定为 V(P->GND) ≈ 62.60 × (VADC_V - 1.65)。", "电流通道采用 P-N 低阻分流方案。20mΩ 分流电阻在 4A 峰值时产生约 80mV 压降，随后通过 39Ω 输入电阻、差分滤波、AMC1301 隔离和运放调理进入 ADC，换算关系为 I(P->N) ≈ 3.049 × (VADC_I - 1.65)。", "隔离边界按“功率侧测量、控制侧读取”划分。电压、电流两路分别配置 AMC1301 与独立 ISO_5V 供电，使高压侧地噪声、功率回路尖峰和 MCU 采样地之间不直接耦合。", "调试路径在原理图阶段就前置设计：板上保留 TP、5V、3.3V、ISO_5V、ADC_V、ADC_I 等测试节点，调试顺序按供电、偏置、零点、比例、动态噪声逐级收敛。"],
    progress: "原理图、PCB 和板级标注已完成，项目已经从“能采样”推进到“可解释、可标定、可排障”的模块状态。当前版本把接口方向、换算公式、电源域、隔离边界和测试点全部显式化，后续调试时可以按固定流程定位问题，而不是依赖临场经验排查。",
    validation: ["供电完整性验证：先确认 5V 输入、3.3V 稳压、ISO_5V_1/ISO_5V_2 隔离电源均正常，再检查 AGND/GND 与隔离侧地之间的边界是否符合预期。", "零点与偏置验证：在无输入条件下检查 ADC_V、ADC_I 是否稳定在 1.65V 附近，用于判断 3.3V 分压参考、TLV9062 调理级和后级 ADC 接口是否正常。", "静态比例验证：对电压通道施加已知直流输入，按 V(P->GND) ≈ 62.60 × (VADC_V - 1.65) 反算；对电流通道施加已知负载电流，按 I(P->N) ≈ 3.049 × (VADC_I - 1.65) 反算。", "分段定位验证：分别观察分压/分流输入端、AMC1301 输出端、TLV9062 输出端和 ADC 输入端，判断误差来自前端比例、隔离放大、偏置网络还是后级采样。", "动态噪声验证：在功率级开关工作条件下观察 ADC 输出纹波和尖峰，评估输入滤波、供电去耦、地线回流和采样时刻对控制稳定性的影响。"],
    improvements: ["建立 0-85V 电压通道标定表、0-4A 电流通道标定表，并给出线性拟合系数、零点偏移和最大误差。", "补充低压开环、高压分段和带 PWM 开关噪声三种测试场景下的示波器波形，形成可复查的调试证据链。", "根据实测噪声频谱评估 10nF/100nF/10uF 滤波与去耦参数，必要时调整输入 RC 和运放输出滤波。", "整理成电赛现场可执行的接线检查表、上电顺序、异常现象定位表和 ADC 标定流程。"]
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
