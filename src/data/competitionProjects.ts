import type { PortfolioProject } from "../types/portfolio";

export const competitionProjects: PortfolioProject[] = [
  {
    id: "2026-contest-ac-ac",
    category: "competition",
    title: "2026电赛电源题",
    subtitle: "图腾柱无桥 PFC 与三相全桥 SVPWM AC-AC 变换系统",
    summary: "这是我们参加 2026 年全国大学生电子设计竞赛时做的 AC-AC 变换电路。前级用四开关图腾柱无桥 PFC，把 36V / 50Hz 单相交流送入直流母线；后级是三相全桥，由队友编写的 SVPWM 程序控制。比赛中我担任队长，并独立完成全部硬件，最终获得省级二等奖。",
    image: "images/contest-2026-three-phase-waveform.jpg",
    detailImages: [
      {
        src: "images/contest-2026-system-bench.jpg",
        title: "AC-AC 系统完整接线与实验台",
        description: "比赛现场的整机接线。图腾柱 PFC、三相全桥、控制板、采样板和滤波板都铺在同一块底板上，方便逐块上电、逐段排查。",
        kind: "prototype"
      },
      {
        src: "images/contest-2026-system-waveform-bench.jpg",
        title: "功率板、控制板与三相波形联合调试",
        description: "控制板接入 PFC 和逆变功率板后做整机联调，示波器同步观察三相输出，主要检查相序、幅值和波形对称性。",
        kind: "prototype"
      },
      {
        src: "images/contest-2026-pfc-power-meter.jpg",
        title: "低压单相输入侧功率分析记录",
        description: "这张照片记录的是其中一个输入侧调试工况：33.319Vrms、3.9074Arms、128.73W，功率因数为 0.989。",
        kind: "test"
      },
      {
        src: "images/contest-2026-mains-test-setup.jpg",
        title: "市电调压、隔离与断路保护装备",
        description: "正式上电前，市电先经过调压器、隔离变压器和断路器，再得到赛题要求的低压单相交流。前期调试全程限流，并按模块逐步加电。",
        kind: "test"
      },
      {
        src: "images/contest-2026-three-phase-waveform.jpg",
        title: "三相对称交流输出波形",
        description: "一次整机联调中拍下的三相波形，频率约 49.98Hz。它能说明三相逆变链路已经工作，但不是赛题 30Hz / 60Hz 工况的正式验收记录。",
        kind: "waveform"
      }
    ],
    tags: ["图腾柱无桥 PFC", "三相全桥", "SVPWM", "AC-AC", "省级二等奖"],
    status: "已完赛｜2026 年全国大学生电子设计竞赛省级二等奖",
    goal: "把 36V / 50Hz 单相交流经过 PFC 和直流母线，变成可调的三相交流输出。比赛时间很紧，硬件既要能拆开单独调试，也要能快速接上队友的控制程序跑整机。",
    quickOverview: {
      objective: "用 36V / 50Hz 单相交流输入，做出一套能带三相阻性负载的 AC-AC 变换系统。",
      challenge: "图腾柱 PFC、三相全桥、驱动、采样和保护都要在比赛周期内做完，还要给队友的软件留好接口。",
      contribution: "我担任队长，负责方案、分工和联调安排；硬件全部由我独立完成，SVPWM 控制软件由队友负责。",
      outcome: "整机顺利跑通，现场记录到 PF 0.989 和三相输出波形，最后拿到省级二等奖。"
    },
    responsibilities: [
      "我担任队长，先定下图腾柱无桥 PFC、直流母线和三相全桥这条技术路线，再按模块给队员分工。",
      "全部硬件由我独立负责，包括 PFC、三相全桥、隔离驱动、采样保护、母线、滤波和整机接线。",
      "我和软件队友提前对齐了六路 PWM、采样比例、保护极性和故障信号，后面联调时少走了不少弯路。",
      "上电顺序也是我安排的：先辅助电源和驱动，再看采样与单桥臂，确认没有直通后才接 PFC 和三相逆变。",
      "输入侧用功率分析仪看 PF，输出侧用示波器检查相序、频率和三相对称性。",
      "SVPWM 和控制软件由队友完成，我没有参与软件代码实现，主要负责硬件接口和整机联调。"
    ],
    metrics: [
      { label: "竞赛成果", value: "省级二等奖", kind: "measured" },
      { label: "现场 PF 记录", value: "0.989", kind: "measured" },
      { label: "赛题输入目标", value: "36V / 50Hz", kind: "design" },
      { label: "基本输出目标", value: "32V / 60Hz / 2A", kind: "design" },
      { label: "输出 THD 目标", value: "≤2%", kind: "design" },
      { label: "调整率目标", value: "≤0.3%", kind: "design" }
    ],
    keyComponents: [
      { label: "输入侧", value: "调压 + 隔离 + 断路保护", note: "把市电安全地降到赛题要求的低压单相交流。" },
      { label: "PFC 功率级", value: "四开关图腾柱无桥", note: "两组半桥负责正负半周换流和输入电流整形。" },
      { label: "直流母线", value: "储能 + 采样 + 保护", note: "连接前后两级，同时监测母线电压和故障状态。" },
      { label: "逆变功率级", value: "三相全桥", note: "三个桥臂输出三相 PWM，经滤波后接三相阻性负载。" },
      { label: "调制方式", value: "SVPWM", note: "软件由队友完成，我提供六路驱动、采样和保护接口。" },
      { label: "测试设备", value: "功率分析仪 + 示波器", note: "一个看输入侧 PF，一个看三相输出波形。" }
    ],
    operatingPrinciples: [
      "市电经过调压器、隔离变压器和断路器后，得到赛题规定的 36V / 50Hz 单相交流输入。",
      "图腾柱 PFC 的两组桥臂分别处理正、负半周。高频桥臂调电流，工频桥臂负责换向，能量送到直流母线。",
      "直流母线连接 PFC 和逆变级，缓冲前后级的瞬时功率差；母线电压、电流和故障信号同时送回控制板。",
      "后级三相全桥一共六路开关。队友的 SVPWM 程序给出控制信号，驱动板负责隔离、电平转换和可靠开关。",
      "三相 PWM 经过输出滤波后，得到相位相差 120° 的三相交流，再接入阻性负载测试。"
    ],
    engineeringHighlights: [
      "前级用了四开关图腾柱无桥 PFC，省掉传统整流桥，也减少了这部分的导通损耗。",
      "PFC、三相桥、驱动、采样和控制板都能单独拆开调。比赛现场哪一级有问题，可以很快缩小范围。",
      "我提前和软件队友定好六路 PWM、采样比例、保护极性和默认关断状态，硬件与程序按同一份接口表联调。",
      "上电时没有直接硬冲整机，而是从低压、单板、单桥臂一路往后加，确认前一级正常再接下一级。",
      "输入侧看功率分析仪，输出侧看三相波形。两边一起测，能比较快地判断问题是在 PFC 还是逆变级。"
    ],
    diagramTitle: "图腾柱 PFC 与三相逆变 AC-AC 系统链路",
    diagramNodes: ["市电调压 / 隔离", "36V / 50Hz 单相输入", "四开关图腾柱无桥 PFC", "直流母线", "三相全桥", "SVPWM + 输出滤波", "三相阻性负载"],
    designPoints: [
      "赛题基本工况是 36V / 50Hz 单相输入，三相线电压 32V±0.1V、60Hz±0.2Hz、线电流 2A；还要支持 32V / 30Hz / 2A。",
      "PF≥0.98、效率≥95%、线电压 THD≤2%、负载调整率和输入电压调整率≤0.3%是赛题目标。现有照片没有覆盖全部测试项，因此这里不把它们写成实测成绩。",
      "图腾柱 PFC 的难点在过零区。四个开关既要完成高频调制和工频换向，也要处理死区，驱动和电流采样方向必须跟控制状态一致。",
      "三相桥的六路驱动按桥臂做互锁，默认状态全部关断。这样即使控制板刚上电或信号异常，也不会让同一桥臂直通。",
      "布局和接线时把高 di/dt 功率回路、驱动、模拟采样和数字控制分开，并给母线、桥臂和故障信号留出测试点。"
    ],
    progress: "整机已经完成接线和联合调试。硬件由我独立完成，队友负责 SVPWM 控制程序。现场照片记录到输入侧 PF 0.989 和约 49.98Hz 的三相波形，项目最终获得省级二等奖。",
    validation: [
      "PFC、三相全桥、控制板、驱动、采样、滤波和保护已经接成完整系统，并完成联合运行。",
      "功率分析仪照片显示 33.319Vrms、3.9074Arms、128.73W，PF 为 0.989。这些数据只对应照片里的调试工况。",
      "示波器拍到了三相对称波形，三相依次错开，照片中的频率约为 49.98Hz。",
      "市电侧串了调压器、隔离变压器和断路器，调试时先限流，再逐级上电。",
      "目前没有完整的效率、THD 和调整率测试表，所以这些数值只按赛题目标列出，不算作实测成绩。"
    ],
    improvements: [
      "这次比赛让我完整走了一遍从系统方案、画板、焊接到整机上电的流程，也第一次以队长身份安排多人并行开发。",
      "图腾柱 PFC、直流母线和三相全桥都做成了相对独立的硬件模块，后面还能拿来做逆变电源和电机驱动实验。",
      "调试顺序也固定了下来：先查辅助电源和驱动，再看采样与单桥臂，最后接 PFC 和三相逆变。这样排故比整机一起查快很多。",
      "现在还缺一份完整的正式测试表。如果后续补齐，可以再加入 30Hz / 60Hz、2A 负载、效率、THD 和调整率的分工况数据。"
    ]
  },
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
        description: "板上集中标注 P/N/GND 输入、20mΩ 分流电阻、峰值电压 85V、峰值电流 4A、ADC 换算公式和关键测试点，便于现场接线与调试。",
        kind: "prototype"
      },
      {
        src: "images/isolated-sampling-schematic-main.png",
        title: "电压 / 电流隔离采样主原理图",
        description: "左侧为电压采样链路，右侧为 20mΩ 分流电流采样链路，两路均经过 AMC1301 隔离放大，再由 TLV9062 完成 1.65V 偏置和 ADC 调理。",
        kind: "schematic"
      },
      {
        src: "images/isolated-sampling-schematic-power.png",
        title: "隔离供电与 3.3V 参考部分",
        description: "包含 5V 输入保护、3.3V 稳压、B0505S 隔离电源、ISO_5V_1 / ISO_5V_2 去耦和 1.65V 偏置相关电路。",
        kind: "schematic"
      }
    ],
    tags: ["AMC1301", "TLV9062", "20mΩ 分流采样", "隔离供电"],
    status: "已完成设计、制板与标定验证",
    goal: "构建一块可复用的交直流电压电流隔离采样模块，让功率级、采样板和控制板之间形成清晰接口：高压侧只负责接入待测电压/电流，隔离侧完成安全隔离与比例缩放，控制侧直接读取以 1.65V 为零点偏置的 ADC 信号。",
    quickOverview: {
      objective: "完成适用于电赛功率级的双向电压、电流隔离采样前端。",
      challenge: "需要在高共模开关环境中兼顾双向量程、隔离供电、零点偏置和 ADC 有效分辨率。",
      contribution: "完成分压与分流参数、AMC1301 隔离链路、TLV9062 调理、电源域、PCB 和标定流程。",
      outcome: "实现 0～85V、0～4A 工作区间，保留约 ±103V / ±5A 量程裕量并完成动态噪声验证。"
    },
    responsibilities: ["根据 85V 峰值电压和 4A 峰值电流目标，分别确定电压分压比例、电流分流阻值和 ADC 输出范围", "设计电压采样与 20mΩ 电流分流采样链路，把高压/大电流信号先转换为适合 AMC1301 输入的低压差分信号", "使用 AMC1301 实现采样信号隔离放大，并通过 TLV9062 构造 1.65V 中点偏置，使双向电压/电流变化能够落在 0-3.3V ADC 量程内", "规划 5V、3.3V、ISO_5V_1、ISO_5V_2 电源域，利用 B0505S 为隔离侧供电，避免高压侧地与控制侧地直接耦合", "在 PCB 上标注换算公式、P/N/GND 端子方向、5V 输入、测试点和隔离电源节点，方便比赛现场快速接线、测量和排查"],
    metrics: [
      { label: "设计工作目标", value: "85V / 4A", kind: "design" },
      { label: "标定量程", value: "±103V / ±5A", kind: "measured" },
      { label: "ADC 接口", value: "3.3V / 12-bit", kind: "design" }
    ],
    keyComponents: [
      { label: "隔离放大器", value: "AMC1301DWVR ×2", note: "电压和电流通道分别隔离。" },
      { label: "后级运放", value: "TLV9062IDR", note: "差分转单端并叠加 1.65V 中点偏置。" },
      { label: "电流采样", value: "20mΩ", note: "5A 时耗散约 0.5W，需要至少 1W 等级或足够热裕量。" },
      { label: "输入滤波", value: "39Ω + 39Ω + 10nF", note: "抑制开关尖峰进入电流隔离通道。" },
      { label: "隔离供电", value: "B0505S-1WR3 ×2", note: "为两个 AMC1301 功率侧提供独立 ISO_5V。" },
      { label: "控制侧电源", value: "AZ1117D-3.3", note: "配合 10µH、10µF、100nF 滤波与去耦。" },
      { label: "ADC 保护", value: "PESD3V3S1BA-N", note: "提供插拔、误接和瞬态尖峰防护。" },
      { label: "5V 输入保护", value: "SMBJ5.0CA", note: "用于输入侧瞬态钳位。" }
    ],
    operatingPrinciples: [
      "双向量映射：无输入时 ADC 约为 1.65V；高于 1.65V 表示正方向，低于 1.65V 表示反方向。固件应在上电静态阶段实测零点，不能永久写死 1.65V。",
      "电压换算：V(P→GND) = 62.60 × (VADC_V - Voffset)。按 0～3.3V ADC 映射，双向量程约为 ±103.3V。",
      "电流换算：I(P→N) = 3.049 × (VADC_I - Ioffset)。20mΩ 分流电阻在 5A 时产生 100mV 压降，双向量程约为 ±5.03A。",
      "12 位 ADC 在 3.3V 参考下约为 0.806mV/LSB，对应理想量化分辨率约 50.4mV/LSB 和 2.46mA/LSB；实际有效分辨率还受噪声、失调和采样时刻影响。",
      "采样值进入保护和闭环前应转换为物理量，并采用滑动平均或一阶低通；PWM 更新与 ADC 采样应同步，避开功率开关瞬态。"
    ],
    engineeringHighlights: [
      "以 85V/4A 作为典型工作区间，采样链路保留约 ±103V/±5A 的双向量程裕量，兼顾测量范围与保护阈值配置。",
      "20mΩ 分流电阻按 5A、约 0.5W 耗散进行功率与散热设计，并通过铜箔面积和器件裕量控制温升。",
      "OVP/OCP 阈值结合标定结果、噪声水平和系统裕量配置，使保护动作与 ADC 有效量程协调。",
      "输入差分滤波、隔离供电去耦、回流路径和同步采样共同抑制功率级共模跃变对 ADC 的影响。",
      "AGND、GND、ISO_5V_1_GND 和 ISO_5V_2_GND 按功能域隔离，板级端子与测试点支持快速确认边界。"
    ],
    diagramTitle: "采样链路系统框图",
    diagramNodes: ["P/N/GND 输入端子", "分压/20mΩ 分流", "AMC1301 隔离放大", "TLV9062 + 3.3V ADC"],
    designPoints: ["从指标反推信号链：先以 85V 峰值电压和 4A 峰值电流确定 ADC 端允许摆幅，再倒推前端分压比例、20mΩ 分流阻值、AMC1301 输入范围和 TLV9062 输出偏置，保证整条链路从功率端到 MCU 端都有明确裕量。", "电压通道采用“高阻分压 + 隔离放大 + 偏置调理”的结构。P->GND 电压先被压缩到隔离放大器输入范围内，再由 TLV9062 整理为以 1.65V 为中心的 ADC 信号，换算关系固定为 V(P->GND) ≈ 62.60 × (VADC_V - 1.65)。", "电流通道采用 P-N 低阻分流方案。20mΩ 分流电阻在 4A 峰值时产生约 80mV 压降，随后通过 39Ω 输入电阻、差分滤波、AMC1301 隔离和运放调理进入 ADC，换算关系为 I(P->N) ≈ 3.049 × (VADC_I - 1.65)。", "隔离边界按“功率侧测量、控制侧读取”划分。电压、电流两路分别配置 AMC1301 与独立 ISO_5V 供电，使高压侧地噪声、功率回路尖峰和 MCU 采样地之间不直接耦合。", "调试路径在原理图阶段就前置设计：板上保留 TP、5V、3.3V、ISO_5V、ADC_V、ADC_I 等测试节点，调试顺序按供电、偏置、零点、比例、动态噪声逐级收敛。"],
    progress: "已完成原理图、PCB、板级标注、实物焊接与标定验证；接口方向、换算公式、电源域、隔离边界和测试点均已显式化，0～85V 电压通道与 0～4A 电流通道可直接接入控制系统。",
    validation: ["供电完整性：5V 输入、3.3V 稳压、ISO_5V_1/ISO_5V_2 隔离电源及各接地域边界均已验证。", "零点与偏置：无输入条件下完成 ADC_V、ADC_I 的 1.65V 中点检查与零点标定。", "静态比例：使用已知直流电压和负载电流完成两路换算系数验证。", "分段测量：完成分压/分流输入端、AMC1301 输出端、TLV9062 输出端和 ADC 输入端的信号链核对。", "动态噪声：在功率级开关条件下完成 ADC 纹波、输入滤波、供电去耦、回流路径和同步采样效果检查。"],
    improvements: ["形成 0～85V 电压通道和 0～4A 电流通道标定表，包含线性系数、零点偏移、误差和重复性记录。", "沉淀低压开环、分段高压和 PWM 开关场景的示波器波形，构成可复查的调试证据链。", "完成输入 RC、运放输出滤波及 10nF/100nF/10µF 去耦组合的实测优化。", "形成电赛现场可直接执行的接线检查表、上电顺序、信号定位表和 ADC 标定流程。"]
  },
  {
    id: "auxiliary-power-module",
    category: "competition",
    title: "隔离辅助电源板",
    subtitle: "双路 COT Buck 与隔离 15V / 5V 电源树",
    summary: "面向电赛低压功率平台设计的隔离辅助电源板。输入经 MSB40M 桥式整流和 440µF 母线储能后，由两路 SY8502FCC COT Buck 将 18V～80V 母线分别降至 15V_1 / 15V_2，再通过隔离 DC/DC 输出 ISO_15V 与 ISO_5V，为栅极驱动、采样和控制模块分区供电。",
    image: "images/auxiliary-power-module.png",
    detailImages: [
      {
        src: "images/auxiliary-power-module.png",
        title: "隔离辅助电源板 PCB",
        description: "板上划分整流与母线、双路 Buck、隔离 DC/DC 和多路输出端子区域，丝印标注最大 80V 峰值输入以及隔离 15V / 5V 输出。",
        kind: "prototype"
      },
      {
        src: "images/auxiliary-power-schematic-buck.png",
        title: "整流与双路 COT Buck 原理图",
        description: "输入经 MSB40M 整流和 220µF + 220µF 母线电容形成 V_BUS，两路 SY8502FCC、68µH 电感及 115kΩ / 10kΩ 反馈网络分别产生 15V_1 和 15V_2。",
        kind: "schematic"
      },
      {
        src: "images/auxiliary-power-schematic-isolation.png",
        title: "隔离 15V 与 5V 输出原理图",
        description: "两路 15V 前级分别接入隔离 DC/DC，输出侧配置 100µF + 100nF 滤波、TVS 保护和多组两针端子，用于驱动、采样与控制模块配电。",
        kind: "schematic"
      }
    ],
    tags: ["MSB40M", "SY8502FCC ×2", "COT Buck", "ISO_15V / ISO_5V"],
    status: "已完成设计、制板与带载验证",
    goal: "构建一套电源域清晰、可分模块调试的辅助供电平台，把宽范围低压输入转换为两路非隔离 15V，再提供隔离 15V 和隔离 5V，避免驱动类负载与采样/控制类负载共用单一路径造成串扰。",
    quickOverview: {
      objective: "为电赛功率平台提供宽输入、双路 Buck 和隔离 15V/5V 的模块化辅助供电。",
      challenge: "双路 COT 稳定性、隔离电源域、驱动脉冲负载和低噪声采样供电需要兼顾。",
      contribution: "完成整流母线、双路 SY8502FCC、隔离 DC/DC、保护、去耦、PCB 和全负载测试。",
      outcome: "覆盖 18V～80V 输入，输出隔离 15V/5V，并完成 25%～100% 负载、纹波与温升验证。"
    },
    responsibilities: [
      "根据驱动、采样和控制模块的供电需求规划 V_BUS、15V_1、15V_2、ISO_15V 和 ISO_5V 五个主要电源域。",
      "设计 MSB40M 桥式整流和 220µF + 220µF 母线储能网络，使交流或直流输入均可形成统一 V_BUS。",
      "使用两路 SY8502FCC COT Buck、68µH 电感和 115kΩ / 10kΩ 反馈网络，将 18V～80V 设计输入分别降至 15V_1 / 15V_2。",
      "为隔离 15V / 5V 输出配置独立 DC/DC、TVS、100µF + 100nF 滤波和多组端子，便于模块分区供电。",
      "保留两路 Buck 的 0Ω 应急连接位，但明确其只用于单路故障时的临时旁路，不作为长期并联方案。"
    ],
    metrics: [
      { label: "设计输入", value: "18V～80V", kind: "design" },
      { label: "隔离输出", value: "15V / 5V", kind: "measured" },
      { label: "母线储能", value: "440µF", kind: "design" }
    ],
    keyComponents: [
      { label: "输入整流", value: "MSB40M", note: "交流输入时 VBUS,peak ≈ √2 × VAC,rms - 2VD。" },
      { label: "母线电容", value: "220µF + 220µF", note: "总计 440µF，用于低频纹波抑制和瞬态储能。" },
      { label: "Buck 控制器", value: "SY8502FCC ×2", note: "COT 导通模式，覆盖宽输入降压与双路供电。" },
      { label: "Buck 电感", value: "68µH ×2", note: "配合 100µF + 100nF 输出滤波。" },
      { label: "反馈网络", value: "115kΩ / 10kΩ", note: "按约 1.2V FB 基准推导 15V 输出。" },
      { label: "RON 电阻", value: "1.6MΩ", note: "参与 COT 导通时间与工作频率设定。" },
      { label: "隔离 15V", value: "TDK15-24S15W", note: "与 15V_1 前级配合输出隔离驱动电源。" },
      { label: "隔离 5V", value: "TURB2405YMD-15WR3", note: "与 15V_2 前级配合输出隔离采样电源。" },
      { label: "输出保护", value: "SMAJ15.0CA / SMBJ5.0CA", note: "分别保护 ISO_15V 与 ISO_5V。" }
    ],
    operatingPrinciples: [
      "若输入为交流，整流后母线峰值近似 VBUS,peak = √2 × VAC,rms - 2VD；两只 220µF 电容并联形成 440µF 母线储能。",
      "Buck 输出近似 VOUT = VFB × (1 + 115kΩ / 10kΩ) = 12.5 × VFB；若反馈基准约 1.2V，则目标输出约为 15V。",
      "COT 控制依赖反馈端具有足够且相位正确的纹波。68µH 电感、100µF 输出电容和纹波注入网络共同决定轻载稳定性及瞬态响应。",
      "15V_1 与 15V_2 分担隔离 15V 和隔离 5V 前级负载，降低栅极驱动瞬态对数字采样电源的串扰。",
      "推荐上电顺序为：限流低压输入 → 检查 V_BUS → 分别确认 15V_1/15V_2 → 检查 ISO_15V/ISO_5V → 最后连接驱动、采样和控制负载。"
    ],
    engineeringHighlights: [
      "双路 SY8502FCC COT Buck 将驱动负载与采样/控制负载分开供电，降低脉冲电流在不同功能域之间的耦合。",
      "输入整流、440µF 母线储能、Buck 降压和隔离 DC/DC 构成分层电源树，覆盖交流或直流输入场景。",
      "反馈纹波注入、68µH 电感和输出电容组合经过轻载与带载调试，兼顾 COT 稳定性和瞬态响应。",
      "两路 15V 之间的 0Ω 位作为快速维护接口保留，正常工作时保持双路独立。",
      "ISO_15V_GND、ISO_5V_GND 与非隔离 GND 边界清晰，端子极性和电源域均通过丝印明确标注。"
    ],
    diagramTitle: "辅助供电分配框图",
    diagramNodes: ["AC / DC 输入", "MSB40M + 440µF V_BUS", "双路 SY8502FCC COT Buck", "15V_1 / 15V_2", "隔离 DC/DC", "ISO_15V / ISO_5V 负载"],
    designPoints: [
      "整流、非隔离降压和隔离输出三级职责明确，使不同题目可以从现有电源树中选择需要的供电节点。",
      "双 Buck 分路承载驱动与采样/控制负载，既分摊功率，也减少高 di/dt 栅极驱动对低噪声采样链路的污染。",
      "每路输出均配置低频储能、高频去耦、TVS 和多组端子，便于独立带载、纹波测量和故障隔离。",
      "板级丝印标注输入、输出和电源域，调试流程以低压限流、逐级确认、最后接负载为原则。"
    ],
    progress: "已完成两页原理图、PCB、实物焊接、双路 Buck 调试及隔离 15V/5V 输出验证；18V～80V 输入、电源域分配、纹波、带载能力和关键器件温升均完成实测核对。",
    validation: [
      "完成整流极性、V_BUS、15V_1 和 15V_2 的逐级上电验证。",
      "完成 ISO_15V 与 ISO_5V 空载电压、启动波形和隔离电阻测量。",
      "完成 25%、50%、75%、100% 负载分档下的输出电压、纹波、效率和关键器件温升记录。",
      "完成 18V、典型输入和接近 80V 输入下的 COT 开关波形、FB 纹波和轻载稳定性检查。",
      "完成驱动、采样和控制负载联合带载，确认 ISO_5V 与采样零点保持稳定。"
    ],
    improvements: [
      "形成隔离模块与 SY8502FCC 的选型、输入范围和功率裕量记录。",
      "沉淀各路额定输出电流、效率、纹波、启动过冲、保护表现和关键器件温升数据。",
      "完成纹波注入、输出电容 ESR 与最小负载配置优化，使 COT 环路覆盖完整负载范围。",
      "形成端子定义、电源预算、上电顺序和快速定位表，可在比赛现场直接复用。"
    ]
  },
  {
    id: "stm32g4-control-board",
    category: "competition",
    title: "STM32G4 控制板",
    subtitle: "面向数字电源控制的核心控制平台",
    summary: "以 STM32G4 为核心，围绕 PWM、ADC 同步采样、保护输入和通信接口构建可复用控制板。",
    image: "images/circuit-board-abstract.jpg",
    tags: ["STM32G4", "PWM", "ADC 同步", "保护逻辑"],
    status: "已完成设计、制板与联调验证",
    goal: "沉淀一块适合电源类题目的控制板，支撑 PFC、LLC、半桥等功率级快速验证。",
    quickOverview: {
      objective: "构建可复用于多种功率变换器的 STM32G4 数字电源控制平台。",
      challenge: "互补 PWM、ADC 同步采样、硬件保护和通信资源需要统一规划并与功率板时序匹配。",
      contribution: "完成控制板接口、PWM/ADC 资源、保护输入、通信链路和功率板联调。",
      outcome: "完成互补 PWM、死区、同步采样、保护触发与状态反馈验证，可快速接入 PFC、LLC 和 H 桥。"
    },
    responsibilities: ["规划控制板接口", "设计 PWM、ADC、保护与通信资源", "配合功率板进行联调"],
    metrics: [
      { label: "MCU", value: "STM32G4", kind: "design" },
      { label: "控制对象", value: "功率变换器", kind: "design" },
      { label: "联调结果", value: "实时闭环控制", kind: "measured" }
    ],
    diagramTitle: "控制板资源框图",
    diagramNodes: ["STM32G4", "ADC 输入", "PWM 输出", "保护/通信"],
    designPoints: ["PWM 与 ADC 采样时序统一规划", "硬件保护输入预留", "调试接口与关键测试点明确"],
    progress: "已完成 STM32G4 控制板硬件、PWM/ADC 资源配置、保护输入、通信接口及与功率板的联调验证。",
    validation: ["已完成互补 PWM、死区与输出极性检查", "已完成 ADC 同步采样和触发时序验证", "已完成保护输入触发、关断与状态反馈测试"],
    improvements: ["形成标准化引脚表与接口定义", "沉淀可复用控制代码模板", "集成调试状态指示与联调记录"]
  },
  {
    id: "four-mos-half-bridge-board",
    category: "competition",
    title: "100V 半桥 / 全桥功率板",
    subtitle: "四 MOS H 桥与四路悬浮隔离栅极驱动",
    summary: "面向 100V 等级电赛逆变与双向变换实验设计的四 MOS H 桥功率板。Q1/Q2 与 Q3/Q4 构成两个桥臂，SW1 与 SW2 之间形成全桥差分输出；四路 UCC23513 配合独立 B1515S 隔离 15V，使每个驱动参考各自 MOSFET 源极。",
    image: "images/four-mos-power-board.png",
    detailImages: [
      {
        src: "images/four-mos-power-board.png",
        title: "100V 半桥 / 全桥功率板 PCB",
        description: "四只 MOSFET 构成 H 桥，板上包含四路隔离驱动接口、DC+/GND 母线端、SW1/SW2 桥臂节点和 1mH 实验电感位置。",
        kind: "prototype"
      },
      {
        src: "images/full-bridge-power-schematic-main.png",
        title: "H 桥主电路与四路隔离驱动",
        description: "Q1～Q4 构成全桥，UCC23513 接收 PWM_H1/PWM_L1/PWM_H2/PWM_L2，经过 10Ω 栅极电阻驱动 NCEP0178AK，并配置 1N4148W 非对称开关路径。",
        kind: "schematic"
      },
      {
        src: "images/full-bridge-power-schematic-isolated-supplies.png",
        title: "四路悬浮隔离 15V 驱动电源",
        description: "四个 B1515S-1WR3 为每个 MOSFET 驱动提供独立 15V；高边输出负端分别参考 SW1、SW2，低边输出负端参考 GND。",
        kind: "schematic"
      }
    ],
    tags: ["100V H 桥", "NCEP0178AK", "UCC23513 ×4", "悬浮 15V 驱动"],
    status: "已完成设计、制板与 100V 带载验证",
    goal: "构建一块可复用的 100V H 桥功率平台，支持单桥臂半桥实验、全桥单极性/双极性 SPWM、离网逆变、模拟并网和双向变换，并把四路驱动参考地、死区和低压上电路径设计清楚。",
    quickOverview: {
      objective: "实现可复用的 100V 半桥/全桥功率平台，支持 SPWM、逆变和双向变换实验。",
      challenge: "四路悬浮驱动参考、桥臂互锁、死区、栅极回路和 100V 母线保护必须协同可靠。",
      contribution: "完成 H 桥功率回路、四路 UCC23513、独立隔离供电、PCB、栅极参数和保护联调。",
      outcome: "完成 12V、24V 到 100V 分阶段带载验证，并验证采样、过流、过压和故障锁存。"
    },
    responsibilities: [
      "规划 Q1/Q2、Q3/Q4 两个桥臂以及 DC+、GND、SW1、SW2 的功率回路和端子定义。",
      "设计四路 UCC23513 隔离驱动链路：PWM 输入经 100Ω 限流，输出经 10Ω 栅极电阻与 1N4148W 形成可调开通/关断速度。",
      "为每个 MOSFET 配置独立 B1515S-1WR3 隔离 15V，使高边驱动分别悬浮参考 SW1 / SW2，低边参考 GND。",
      "配置 10kΩ 栅源下拉、100nF + 10µF 驱动去耦、100µF + 100nF 母线旁路和 1mH 实验电感。",
      "制定从只上驱动电源、检查互补 PWM 和死区，到 12V/24V 限流母线、空载、假负载、逐步升压的调试顺序。"
    ],
    metrics: [
      { label: "实测母线", value: "100V", kind: "measured" },
      { label: "功率拓扑", value: "四 MOS H 桥", kind: "design" },
      { label: "隔离驱动", value: "4 路独立 15V", kind: "design" }
    ],
    keyComponents: [
      { label: "功率 MOSFET", value: "NCEP0178AK ×4", note: "100V 等级器件，构成 Q1～Q4 两个桥臂。" },
      { label: "隔离驱动", value: "UCC23513DWYR ×4", note: "四路 PWM 输入分别驱动四个 MOSFET。" },
      { label: "驱动电源", value: "B1515S-1WR3 ×4", note: "每路均为相对对应源极悬浮的隔离 15V。" },
      { label: "栅极网络", value: "10Ω + 1N4148W", note: "用于控制开通/关断速度并抑制振铃和误导通。" },
      { label: "栅源下拉", value: "10kΩ ×4", note: "驱动未启动或 MCU 复位时保持关断。" },
      { label: "PWM 输入", value: "100Ω 串联", note: "限制 UCC23513 输入侧瞬态电流。" },
      { label: "驱动去耦", value: "100nF + 10µF / 路", note: "分别处理高频尖峰和栅极充放电瞬态能量。" },
      { label: "母线去耦", value: "100µF + 100nF", note: "100nF 应尽量靠近高 di/dt 功率回路。" },
      { label: "实验电感", value: "1mH", note: "可作为输出滤波或拓扑实验串联电感。" }
    ],
    operatingPrinciples: [
      "左桥臂 S1=1 时 Q1 开通、Q2 关断，SW1≈DC+；S1=0 时 Q1 关断、Q2 开通，SW1≈GND。右桥臂 S2 对 Q3/Q4 和 SW2 同理。",
      "全桥差分输出为 VSW1-SW2 = (S1 - S2) × VDC：S1/S2 为 1/0 时输出 +VDC，为 0/1 时输出 -VDC，两者同为 1 或 0 时输出零矢量。",
      "双极性 SPWM 在 +VDC 与 -VDC 间切换，控制简单但高频纹波较大；单极性 SPWM 形成 +VDC / 0 / -VDC 三电平，通常更利于输出滤波。",
      "高边 Q1、Q3 的驱动电源负端必须分别跟随 SW1、SW2；低边 Q2、Q4 参考 GND。独立隔离电源使高边不依赖自举，支持长占空比和低频实验。",
      "初次调试死区建议从 500ns～1µs 的保守值开始，再依据 VGS、VDS 和桥臂电流波形逐步优化；同一桥臂上下管任何情况下都不得同时导通。"
    ],
    engineeringHighlights: [
      "互补 PWM、死区与保护逻辑共同构成桥臂互锁，保证上下管切换时序明确。",
      "Q1/Q3 高边驱动分别以 SW1/SW2 为悬浮参考，四路隔离供电支持长占空比、低频和静态导通实验。",
      "2.2kΩ 泄放电阻按 15V、约 0.102W 耗散进行封装与温升裕量设计。",
      "栅极开通/关断路径通过 10Ω 与 1N4148W 独立调节，并结合 VGS、VDS 和桥臂电流波形完成参数优化。",
      "板卡已完成从低压调试到 100V 母线带载的分阶段验证，采样、过流、过压和故障锁存协同工作。"
    ],
    diagramTitle: "100V H 桥功率与驱动链路",
    diagramNodes: ["15V / 四路 B1515S", "PWM_H1/L1/H2/L2", "四路 UCC23513", "Q1～Q4 H 桥", "SW1 / SW2 差分输出", "1mH / 负载 / 变压器"],
    designPoints: [
      "四路完全隔离驱动不依赖高边自举电容，适合低频、长占空比和静态导通等电赛调试场景。",
      "驱动参考地严格跟随 MOSFET 源极：Q1→SW1、Q2→GND、Q3→SW2、Q4→GND。",
      "100nF 与 10µF 独立布置在每路驱动侧，兼顾高频回路和栅极充放电瞬态；10kΩ 下拉确保掉电默认关断。",
      "H 桥可拆分为单桥臂半桥使用，也可以通过 SW1/SW2 组成完整全桥差分输出，提高模块复用范围。",
      "原理图预留端子和节点用于观察 PWM、驱动输出、SW1/SW2 与母线状态，便于按信号链逐段排障。"
    ],
    progress: "已完成两页原理图、PCB、实物焊接与 100V 母线带载验证；H 桥拓扑、四路隔离驱动、悬浮电源参考、互补 PWM、死区及保护链路均已完成联调。",
    validation: [
      "完成四个 B1515S 输出电压、极性和悬浮参考节点验证。",
      "完成 UCC23513 输出、四路 VGS、逻辑极性、传播延迟、关断状态和死区测量。",
      "完成 12V/24V 限流母线下的空载、假负载和串联电感调试。",
      "完成不同死区和栅极网络配置下的 VGS、VDS、桥臂电流、开关尖峰和器件温升记录。",
      "完成分阶段升压至 100V 母线带载，并验证采样、过流、过压和故障锁存功能。"
    ],
    improvements: [
      "形成高 di/dt 回路、驱动回路、母线去耦和爬电间距的 PCB 布局复盘资料。",
      "沉淀栅极阻值、二极管方向、死区与效率/EMI 表现之间的实测调参记录。",
      "集成硬件级快速过流关断、母线过压、欠压锁定和故障锁存接口。",
      "形成 12V、24V、100V 及不同负载下的开关波形、热像和保护动作记录。"
    ]
  }
];
