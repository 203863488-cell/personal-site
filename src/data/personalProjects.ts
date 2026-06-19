import type { PortfolioProject } from "../types/portfolio";

export const personalProjects: PortfolioProject[] = [
  {
    id: "totem-pole-pfc",
    category: "personal",
    title: "1kW CCM Boost PFC",
    subtitle: "UCC28019ADR / 220VAC -> 400VDC 平均电流模式 PFC",
    summary: "面向 1kW 级电源前级，完成关键器件选型、EMI/安规、继电器旁路 NTC 软启动和双环补偿设计；阶段性完成 220VAC 到 400VDC、160W 带载验证，效率 96.9%、PF 0.94。",
    image: "images/pfc-boost-project.jpg",
    detailImages: [
      {
        src: "images/pfc-boost-project.jpg",
        title: "1kW CCM Boost PFC 样机",
        description: "实物板包含输入保护与软启动、整流桥、Boost 电感、功率器件散热区、高压母线电容、UCC28019ADR 控制与辅助供电。"
      },
      {
        src: "images/pfc-boost-schematic-main.png",
        title: "主功率级、采样与补偿原理图",
        description: "主图覆盖 Boost 功率级、MOSFET/SiC 二极管、VSENSE/VINS/ISENSE 采样和 UCC28019ADR 电压环、电流环补偿网络。"
      },
      {
        src: "images/pfc-boost-input-power.jpg",
        title: "220VAC 输入功率与 PF 记录",
        description: "阶段性带载测试用于核对输入电压、电流、有功功率和功率因数，当前公开口径为 PF 0.94。"
      },
      {
        src: "images/pfc-boost-bus-ripple.jpg",
        title: "400V 高压母线纹波记录",
        description: "用于检查外电压环稳定性、母线电容储能能力和 100Hz 二倍频纹波。"
      },
      {
        src: "images/pfc-boost-schematic-aux.png",
        title: "辅助供电与结构接地",
        description: "包含控制侧辅助电源、继电器驱动、去耦以及保护地和安装点设计。"
      }
    ],
    tags: ["UCC28019ADR", "CCM Boost PFC", "1kW 设计", "400VDC", "Type-II 补偿", "EMI / 安规"],
    status: "阶段性完成 160W 高压闭环验证",
    goal: "完成一套面向 1kW 级电源前级的单相 CCM Boost PFC，从 220VAC 建立 400VDC 高压母线，并通过平均电流模式双环控制改善输入电流波形和功率因数。",
    responsibilities: [
      "完成 MOSFET、整流桥、升压二极管、Boost 电感和高压母线电容等关键器件选型与损耗分析。",
      "使用 Simulink 建立闭环模型，核对关键器件电压、电流应力以及控制环路工作区间。",
      "设计压敏电阻、X/Y 电容、共模电感等输入 EMI 网络，并在 PCB 中控制高压爬电距离。",
      "采用 RC 定时、继电器旁路 NTC 的软启动方案，限制高压母线电容充电浪涌。",
      "基于状态空间平均法分析 CCM PFC 小信号模型，设计电压外环和电流内环 Type-II 补偿。",
      "完成 220VAC 到 400VDC 高压母线和初步 160W 带载测试，记录效率、PF 和输入电流改善情况。"
    ],
    metrics: [
      { label: "设计功率", value: "1kW" },
      { label: "输入 / 母线", value: "220VAC / 400VDC" },
      { label: "阶段负载", value: "160W" },
      { label: "阶段效率", value: "96.9%" },
      { label: "功率因数", value: "0.94" },
      { label: "控制器", value: "UCC28019ADR" }
    ],
    diagramTitle: "CCM Boost PFC 功率与控制链路",
    diagramNodes: ["220VAC + EMI / 软启动", "整流桥 + Boost 功率级", "400V 高压母线", "电压 / 电流采样", "UCC28019ADR 双环控制", "PWM 驱动与保护"],
    designPoints: [
      "外电压环负责稳住 400V 母线，内电流环负责跟踪整流输入电压包络；两个环路带宽分离，避免 100Hz 功率脉动污染电流参考。",
      "电压外环穿越频率控制在约 10Hz，电流内环带宽设置在 5kHz-10kHz 量级，兼顾正弦电流跟踪和开关噪声抑制。",
      "输入浪涌、持续损耗和继电器时序联合考虑：NTC 只承担启动阶段限流，母线稳定后由继电器旁路。",
      "高压网络和继电器引脚区域采用挖槽与距离约束，功率回路、采样回路和控制地回流分区处理。",
      "页面明确区分 1kW 设计目标和当前 160W 阶段性实测，不把尚未完成的满功率结果包装成已验证指标。"
    ],
    progress: "已完成 1kW 级方案设计、关键器件与环路参数计算、PCB 样机以及 220VAC -> 400VDC 高压母线转换验证。当前公开实测为初步 160W 带载效率 96.9%、PF 0.94；满功率、THD、温升和长期老化仍在后续验证范围。",
    validation: [
      "阶段性高压闭环：完成 220VAC 输入到 400VDC 母线建立和稳压验证。",
      "阶段性效率：160W 带载条件下记录效率约 96.9%。",
      "功率因数：同一阶段测试记录 PF 约 0.94，输入电流谐波表现得到改善。",
      "软启动：检查 NTC 限流和继电器旁路时序，避免上电浪涌直接冲击整流桥和母线电容。",
      "验证边界：当前结果不代表已经完成 1kW 满载、完整 THD 曲线或产品级 EMI/安规认证。"
    ],
    improvements: [
      "补齐 25%、50%、75%、100% 负载点效率、PF、THD 和 3/5/7 次谐波记录。",
      "使用高压差分探头和电流探头记录 MOSFET VDS、Boost 电感电流和过零区波形。",
      "增加启动浪涌、母线过冲、负载阶跃、输入电压变化和保护触发/恢复测试。",
      "完成 MOSFET、SiC 二极管、电感、采样电阻、NTC/继电器和母线电容温升矩阵。",
      "在具备合适隔离、探头和保护条件的实验环境中推进 1kW 级测试。"
    ]
  },
  {
    id: "half-bridge-llc",
    category: "personal",
    title: "数控 SiC 半桥 LLC",
    subtitle: "300VDC -> 24V / 300W STM32G4 数字调频 LLC",
    summary: "完成主功率板、STM32G4 主控板、辅助电源、PQ40 主变压器和同步整流方案；满载输出 279.6W，效率 94.4%，纹波 287mVPP，负载调整率 0.06%。",
    image: "images/llc-full-load-board.jpg",
    detailImages: [
      {
        src: "images/llc-full-load-board.jpg",
        title: "数控 SiC 半桥 LLC 满载样机",
        description: "完整样机包含主功率板、STM32G4 控制板、辅助供电、PQ40 主变压器、副边同步整流和输出滤波。"
      },
      {
        src: "images/llc-full-load-input-power.jpg",
        title: "满载输入功率记录",
        description: "输入侧记录约 300V / 295.99W，用于与输出功率交叉核算满载效率。"
      },
      {
        src: "images/llc-full-load-output-load.jpg",
        title: "24V / 11.7A 输出负载记录",
        description: "电子负载记录输出约 24V / 11.70A、279.6W，处于 300W 额定附近。"
      },
      {
        src: "images/llc-gs-waveform.jpg",
        title: "SiC 栅源驱动 G-S 波形",
        description: "检查 UCC23513 隔离驱动、+18V / -3V 双极性栅压、死区和关断裕量。"
      },
      {
        src: "images/llc-sr-waveform.jpg",
        title: "副边同步整流 SR 波形",
        description: "用于确认同步整流时序与谐振电流方向匹配，减少体二极管导通和反向电流风险。"
      },
      {
        src: "images/llc-output-ripple.jpg",
        title: "满载输出纹波 287mVPP",
        description: "满载输出纹波用于复核输出电容、同步整流、采样噪声和功率回路布局。"
      },
      {
        src: "images/llc-load-regulation.jpg",
        title: "负载调整率记录",
        description: "测试结果约 0.06%，用于验证 STM32G4 调频 PI 闭环稳压能力。"
      },
      {
        src: "images/design-review.jpg",
        title: "磁件与参数复核",
        description: "围绕 FHA 增益、谐振腔参数、匝比、漏感集成和 LCR 测量结果进行设计复盘。"
      }
    ],
    tags: ["300VDC", "24V / 300W", "SiC 半桥", "STM32G4", "UCC23513", "FHA / 调频 PI"],
    status: "已完成满载闭环验证",
    goal: "完成一套可复盘的 300VDC 到 24V / 300W 隔离数字电源样机，把 LLC 从 FHA 分析、磁件设计、SiC 驱动和 PCB 推进到 STM32G4 闭环、同步整流和满载测试。",
    responsibilities: [
      "完成主功率板、STM32G4 主控板和辅助电源板方案，搭建完整隔离 DC-DC 样机链路。",
      "基于 FHA 模型完成增益与谐振腔参数计算，确定频率上下限并约束容性区边界。",
      "基于 Ap 法设计 PQ40 主变压器，匝数比 Np:Ns1:Ns2 = 30:4:4，并将可控漏感集成为谐振电感。",
      "评估 SiC MOSFET Qg、Coss、驱动电压、开关损耗和 dv/dt 风险，采用 UCC23513 与 +18V / -3V 双极性驱动。",
      "独立完成 SiC 功率板 PCB 布局，约束驱动回路、换流回路、母线退耦、Kelvin 源极、SW 节点和高压爬电距离。",
      "基于 STM32G4 实现互补 PWM、死区、ADC、调频 PI、软启动、限幅以及欠/过压、过流和故障锁存。",
      "完成输入功率、输出功率、效率、栅极驱动、SR、纹波、负载调整率和 ZVS 验证。"
    ],
    metrics: [
      { label: "输入规格", value: "300VDC" },
      { label: "输出规格", value: "24V / 300W" },
      { label: "满载效率", value: "94.4%" },
      { label: "输出纹波", value: "287mVPP" },
      { label: "负载调整率", value: "0.06%" },
      { label: "主变匝比", value: "30:4:4" }
    ],
    diagramTitle: "300V 数字调频 LLC 功率与控制链路",
    diagramNodes: ["300VDC 高压母线", "SiC 半桥 + UCC23513", "LLC 谐振腔 / PQ40 主变", "同步整流 + 输出滤波", "采样反馈 / STM32G4", "调频 PI / PWM / 保护状态机"],
    designPoints: [
      "设计围绕增益曲线、谐振点、频率上下限、负载变化和容性区边界展开，不只核算单一额定点。",
      "主变压器同时考虑 Ap/Aw/Ae 裕量、窗口利用率、绝缘、漏感可控性和大电流副边铜损。",
      "SiC 双极性栅压用于降低误导通风险；布局优先保证栅极回路、Kelvin 源极和驱动退耦。",
      "功率板压缩半桥换流环、母线退耦环和变压器原边回路，并控制 SW 节点面积和采样地耦合。",
      "满载验证遵循输入功率、输出功率、效率、驱动、SR、纹波和稳压性能的证据链。"
    ],
    progress: "样机已完成硬件、磁件、STM32G4 调频闭环和满载验证。输入约 300V / 295.99W，输出约 279.6W，效率 94.4%，输出纹波 287mVPP，负载调整率 0.06%，满载实现 ZVS 与副边同步整流。",
    validation: [
      "输入功率：满载输入约 300V / 295.99W。",
      "输出功率：电子负载记录约 24V / 11.70A、279.6W。",
      "效率：按输入和输出功率计算满载效率约 94.4%。",
      "栅极驱动与软开关：检查 +18V / -3V 栅压、死区和满载 ZVS。",
      "同步整流：通过 SR MOS 波形检查副边导通时序。",
      "输出质量：纹波 287mVPP，负载调整率约 0.06%。"
    ],
    improvements: [
      "补齐 25%、50%、75%、100% 负载效率、纹波、SR 波形和温升矩阵。",
      "整理频率限幅、软启动斜率、PI 参数、保护阈值和故障复位条件。",
      "增加启动过冲、关断、负载阶跃、母线扰动、短时过载和长期老化记录。",
      "继续补充变压器承认书、LCR 实测和 PCB 布局复盘。"
    ]
  },
  {
    id: "flyback",
    category: "personal",
    title: "72W Flyback 反激电源",
    subtitle: "85-265VAC 宽输入 -> 24V / 3A 隔离辅助电源",
    summary: "基于 UCC287506DBVR、TL431 + 光耦反馈和 24:6:5 定制变压器；220VAC 满载效率约 85%，纹波约 390mVPP，负载调整率 0.67%。",
    image: "images/flyback-project.jpg",
    detailImages: [
      {
        src: "images/flyback-project.jpg",
        title: "24V / 3A 反激电源实物板",
        description: "展示输入整流滤波、主变压器、控制反馈和输出整流滤波区域。"
      },
      {
        src: "images/flyback-input-power.jpg",
        title: "输入侧满载功率记录",
        description: "220VAC 满载工况下记录输入电压、电流和有功功率。"
      },
      {
        src: "images/flyback-output-load.jpg",
        title: "输出侧电子负载记录",
        description: "电子负载记录约 24V / 3A、72W 输出。"
      },
      {
        src: "images/flyback-ripple-waveform.jpg",
        title: "满载输出纹波",
        description: "短地弹簧和带宽限制条件下记录输出纹波及高频尖峰。"
      },
      {
        src: "images/flyback-vds-waveform.jpg",
        title: "MOSFET VDS 应力波形",
        description: "用于核对反射电压、漏感尖峰和 RCD 吸收网络的钳位效果。"
      }
    ],
    tags: ["Flyback", "UCC287506", "24V / 3A", "TL431 光耦", "RCD 吸收", "宽输入"],
    status: "已完成满载验证",
    goal: "为主功率系统设计一款 24V / 3A 宽输入隔离辅助电源，覆盖功率级、磁件、RCD 吸收、原边采样、二次侧隔离反馈和满载验证。",
    responsibilities: [
      "根据 85-265VAC 输入和 24V / 3A 输出确定离线反激拓扑与器件应力。",
      "采用 UCC287506DBVR 控制器，设计高压 MOSFET、原边电流采样、辅助绕组供电和二次侧 TL431 + 光耦闭环。",
      "按 72W、100kHz 完成主变压器设计，确定 Np:Ns:Naux = 24:6:5、Lp = 100µH±10%、Llk ≤ 3µH 和绝缘规范。",
      "根据反射电压和漏感能量设计 RCD 吸收网络，限制 MOSFET 关断尖峰。",
      "完成输出分压和 Type-II 补偿，验证 24V 稳压、效率、纹波、负载调整率和 VDS 应力。"
    ],
    metrics: [
      { label: "输入范围", value: "85-265VAC" },
      { label: "输出规格", value: "24V / 3A" },
      { label: "满载效率", value: "约 85%" },
      { label: "输出纹波", value: "约 390mVPP" },
      { label: "负载调整率", value: "0.67%" },
      { label: "主变匝比", value: "24:6:5" }
    ],
    diagramTitle: "宽输入隔离反激功率链路",
    diagramNodes: ["85-265VAC 输入", "整流与高压母线", "UCC287506 + MOSFET", "24:6:5 反激变压器", "肖特基整流 + 滤波", "TL431 + 光耦反馈"],
    designPoints: [
      "按单周期储能模型核算原边峰值电流、单周期能量、气隙和磁芯利用率。",
      "MOSFET VDS 由高压母线、反射电压和漏感尖峰叠加决定，需要同时复核 220VAC 和 265VAC 高线。",
      "TL431 分压决定输出设定值，补偿网络需要兼顾低频稳压、动态响应和高频噪声衰减。",
      "RCD 吸收既要限制尖峰，也要关注吸收电阻与二极管的损耗和温升。",
      "页面将已完成的 220VAC 满载结果与尚未补齐的宽输入、EMI/安规测试明确区分。"
    ],
    progress: "已完成原理图、磁件规格、PCB 样机、满载输出、效率、纹波和 MOSFET 应力测试。当前公开结果为 220VAC 输入、24V / 3A 输出、效率约 85%、纹波约 390mVPP、负载调整率 0.67%。",
    validation: [
      "220VAC 输入、24V / 3A 输出工况下完成满载运行。",
      "满载效率约 85%，与前期功率级和磁件估算目标一致。",
      "输出纹波约 390mVPP，负载调整率约 0.67%。",
      "通过 VDS 波形核对 MOSFET 应力和 RCD 吸收效果。",
      "验证边界：85VAC、110VAC 和 265VAC 全输入范围数据仍需补齐。"
    ],
    improvements: [
      "补全 85VAC、110VAC、220VAC、265VAC 的效率、纹波、VDS、VDD 和温升记录。",
      "重点复核 265VAC 高线下 MOSFET 应力、RCD 温升、整流管温升和变压器漏感。",
      "增加负载阶跃、短路/过载、轻载跳频和长期满载老化。",
      "补充保险丝、NTC、MOV、共模电感、Y 电容、EMI 和安规爬电距离记录。"
    ]
  },
  {
    id: "stm32-digital-power-host",
    category: "personal",
    title: "STM32G4 LLC 实时上位机",
    subtitle: "Web Serial / 921600 8N1 / 只读遥测仪表盘",
    summary: "本机 Web Serial 工具接收 STM32G4 的 LLC 运行数据，实时显示 Vin、Vout、Iout、Fsw、PI、PWM/故障状态，并支持图表、CSV 和原始日志导出。",
    image: "images/stm32g4-llc-host-dashboard.png",
    detailImages: [
      {
        src: "images/stm32g4-llc-host-dashboard.png",
        title: "STM32G4 LLC 遥测仪表盘",
        description: "界面包含输出电压/电流、开关频率、PI 输出、PWM/故障状态、链路统计和实时图表。"
      }
    ],
    tags: ["Web Serial", "STM32G4", "921600 8N1", "Chart.js", "CSV", "只读遥测"],
    status: "功能原型完成",
    goal: "建立一个不下发危险控制命令的只读遥测工具，把 MCU 控制变量、输出状态和通信健康度实时展示并保存，降低数字电源调试记录成本。",
    responsibilities: [
      "定义 STM32G4 USART1_TX 到隔离 CH340 再到浏览器 Web Serial 的硬件与通信链路。",
      "固定 921600 baud、8N1 参数，解析带帧头和序号的 LLC ASCII CSV 协议。",
      "实现分帧、错误帧丢弃、解析错误、字节数、丢帧和链路健康状态统计。",
      "实现状态卡片、实时图表、暂停、清空、CSV 导出和 Raw Log 保存。",
      "坚持只读遥测边界，浏览器刷新、崩溃或误点击不会直接改变功率级状态。"
    ],
    metrics: [
      { label: "串口参数", value: "921600 8N1" },
      { label: "协议", value: "LLC CSV" },
      { label: "UI 刷新", value: "10Hz" },
      { label: "图表窗口", value: "3000 点" },
      { label: "缓存", value: "100000 行" },
      { label: "安全边界", value: "只读" }
    ],
    diagramTitle: "LLC 上位机数据链路",
    diagramNodes: ["STM32G4 控制变量", "USART1_TX CSV", "隔离 CH340", "Web Serial 解析", "状态卡片 / 图表", "CSV / Raw Log"],
    designPoints: [
      "只读遥测将显示工具与功率级控制权限解耦，降低浏览器端故障引发危险动作的可能性。",
      "协议解析严格检查帧头、字段数量和数值合法性，坏帧不进入图表和导出数据。",
      "串口持续接收与 UI 约 10Hz 刷新解耦，避免高波特率数据直接拖慢页面渲染。",
      "同时导出结构化 CSV 和原始日志，分别服务数据分析与协议问题定位。"
    ],
    progress: "已完成功能原型、协议解析、状态卡片、实时图表、链路统计、CSV 导出和 Raw Log 保存，并形成可展示的本地仪表盘界面。",
    validation: [
      "覆盖有效帧、非法数值、字段顺序、拆包/多包、不同换行和长垃圾数据重同步。",
      "页面要求在 Chrome / Edge 的 localhost 安全环境运行，不能直接双击 HTML 使用串口。",
      "使用隔离 USB-TTL，避免电脑地与功率板地直接耦合。",
      "暂停只冻结显示，不停止后台接收和解析。"
    ],
    improvements: [
      "增加固件侧发送帧率与上位机接收率对比。",
      "导出样机编号、输入电压、负载、磁件批次、参数版本和测试备注。",
      "如未来加入参数写入，必须增加安全状态门控、范围限制、二次确认和回读校验。",
      "补充真实串口长时间运行和 CSV 复盘样例。"
    ]
  },
  {
    id: "personal-portfolio-site",
    category: "personal",
    title: "个人求职网站",
    subtitle: "中英双语、数据驱动的电源硬件作品集",
    summary: "使用 React、TypeScript、Vite 和 Tailwind CSS 构建，覆盖响应式布局、项目详情、高清图片查看、WebP 预览、离线缓存、SEO 和 GitHub Pages 自动部署。",
    image: "images/portfolio-site-project-card.png",
    detailImages: [
      {
        src: "images/portfolio-site-projects-overview.png",
        title: "个人项目列表",
        description: "响应式项目网格集中展示 PFC、LLC、反激、STM32G4 上位机和个人网站。"
      },
      {
        src: "images/portfolio-site-project-card.png",
        title: "数据驱动项目卡片",
        description: "项目标题、摘要、状态、标签和关键指标由统一数据模型生成。"
      },
      {
        src: "images/portfolio-site-project-detail.png",
        title: "可复用项目详情页",
        description: "详情模板统一展示职责、指标、系统结构、设计点、进度、验证和后续改进。"
      }
    ],
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GitHub Pages", "SEO / PWA"],
    status: "已上线，持续迭代",
    goal: "提供一个招聘方可以直接浏览的在线作品集，让访问者快速识别求职方向、查看工程证据、下载简历并联系本人，同时保证手机、平板和电脑端体验一致。",
    responsibilities: [
      "围绕招聘方阅读路径设计首页、项目分类、项目详情、联系入口和简历下载。",
      "建立统一项目数据模型和中英双语映射，减少页面重复与内容漂移。",
      "使用 React 19、TypeScript、Vite 和 Tailwind CSS 拆分导航、轮播、卡片、指标、画廊和详情组件。",
      "实现 GitHub Pages 兼容的 Hash 路由、路由级懒加载和自动构建部署。",
      "实现可访问的高清图片查看器，支持键盘、手机、平板和桌面端。",
      "为项目图片生成 WebP 响应式预览，高清原图仅在查看器打开后加载。",
      "补充 SEO、Service Worker、离线图片占位、构建验证和仓库文档。"
    ],
    metrics: [
      { label: "项目数量", value: "10 个" },
      { label: "语言", value: "中 / EN" },
      { label: "前端", value: "React 19" },
      { label: "路由", value: "Hash + Lazy" },
      { label: "部署", value: "GitHub Pages" },
      { label: "图片", value: "WebP + 原图" }
    ],
    diagramTitle: "作品集内容、界面与发布链路",
    diagramNodes: ["项目数据与双语文案", "React 复用组件", "Hash 路由与按需加载", "CI 构建与 Pages 部署"],
    designPoints: [
      "信息流遵循快速判断方向、比较项目、查看工程证据、获取联系方式的顺序。",
      "项目内容与页面结构解耦，新增项目主要是增加结构化数据而不是复制页面。",
      "列表加载 WebP 缩略图，点击后才加载高清原图，兼顾移动网络和查看质量。",
      "源码、构建产物和 GitHub Pages 由同一次 CI 生成，不再维护压缩后的静态快照。",
      "导航、图片查看器和轮播补充键盘焦点、ARIA 状态和减少动画偏好支持。"
    ],
    progress: "已完成真实简历和邮箱接入、项目数据迁回源码、响应式高清图片查看、图片预览优化、SEO、离线缓存和 GitHub Pages 自动构建流程。",
    validation: [
      "执行 TypeScript 构建、ESLint 和生产产物完整性检查。",
      "验证首页、项目分类和项目详情 Hash 路由。",
      "检查中英文切换、简历下载、邮箱和 GitHub 链接。",
      "检查手机、横屏平板和桌面布局及高清图片查看器。",
      "检查 WebP 预览生成和原图按需加载。"
    ],
    improvements: [
      "持续补充项目实测曲线、测试报告和不涉及敏感信息的公开附件。",
      "在后续项目代码可公开时增加对应仓库链接。",
      "根据实际访问数据决定是否加入隐私友好的匿名统计。"
    ],
    links: [
      {
        label: "GitHub 仓库",
        href: "https://github.com/203863488-cell/personal-site"
      },
      {
        label: "在线网站",
        href: "https://203863488-cell.github.io/personal-site/"
      }
    ]
  }
];
