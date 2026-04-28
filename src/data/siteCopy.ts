import type { PortfolioMetric, PortfolioProject } from "../types/portfolio";

export type Language = "zh" | "en";

type LocalizedProjectFields = Omit<PortfolioProject, "id" | "category" | "image">;

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  metrics: PortfolioMetric[];
}

export interface GatewayCardCopy {
  title: string;
  subtitle: string;
  image: string;
}

export interface CapabilityTrackCopy {
  title: string;
  subtitle: string;
  tiles: Array<string | { title: string; image: string }>;
}

export interface EntryCopy {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  accent: "blue" | "green";
}

export interface SiteCopy {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    items: Array<{ label: string; href: string }>;
    resume: string;
    menu: string;
    language: string;
  };
  common: {
    backHome: string;
    viewDetails: string;
    enter: string;
    currentProgress: string;
  };
  topShowcase: {
    heroSlides: HeroSlide[];
    gatewayKicker: string;
    gatewayCards: GatewayCardCopy[];
    capabilityTracks: CapabilityTrackCopy[];
    heroStatus: string;
    playingStatus: string;
    pausedStatus: string;
    previousSlide: string;
    nextSlide: string;
    capabilityLabel: string;
  };
  home: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    metricCards: PortfolioMetric[];
    entranceKicker: string;
    entranceTitle: string;
    entranceDescription: string;
    entries: EntryCopy[];
    contactKicker: string;
    contactTitle: string;
    contactDescription: string;
    email: string;
    emailFeedback: string;
    download: string;
  };
  pages: {
    competition: {
      kicker: string;
      title: string;
      description: string;
      back: string;
    };
    personal: {
      kicker: string;
      title: string;
      description: string;
      back: string;
    };
    notFound: {
      kicker: string;
      title: string;
      description: string;
    };
  };
  projectDetail: {
    kicker: string;
    imagesKicker: string;
    imagesTitle: string;
    responsibilities: string;
    metrics: string;
    systemDiagram: string;
    diagramPlaceholder: string;
    designPoints: string;
    progress: string;
    validation: string;
    improvements: string;
  };
  footer: {
    left: string;
    right: string;
  };
}

export const copy: Record<Language, SiteCopy> = {
  zh: {
    meta: {
      title: "蓝宏涛｜电力电子硬件与功率变换器",
      description: "蓝宏涛的个人求职作品集，展示电力电子硬件与功率变换器相关项目。"
    },
    nav: {
      brand: "蓝宏涛",
      items: [
        { label: "首页", href: "#/" },
        { label: "电赛项目", href: "#/competition" },
        { label: "个人项目", href: "#/personal" },
        { label: "联系", href: "#/contact" }
      ],
      resume: "下载简历",
      menu: "切换菜单",
      language: "语言"
    },
    common: {
      backHome: "返回首页",
      viewDetails: "查看详情",
      enter: "进入查看",
      currentProgress: "当前进度"
    },
    topShowcase: {
      heroSlides: [
        {
          id: "welcome",
          kicker: "Welcome",
          title: "蓝宏涛的个人空间",
          description: "这里集中展示我的电力电子硬件、嵌入式控制与功率变换器项目，也记录从设计、焊接、代码到测试验证的工程实践。",
          image: "images/electronics-lab-oscilloscope.jpg",
          tags: ["求职作品集", "电子实验室", "工程实践", "项目记录"],
          metrics: [
            { label: "方向", value: "电力电子" },
            { label: "能力", value: "硬件 + 控制" },
            { label: "目标", value: "求职展示" }
          ]
        },
        {
          id: "competition",
          kicker: "Competition Module",
          title: "电赛隔离采样与控制平台",
          description: "从隔离采样、辅助供电、控制板到功率板，形成可复用的电力电子实验平台能力。",
          image: "images/pcb-closeup.jpg",
          tags: ["隔离采样", "辅助电源", "控制板", "PCB"],
          metrics: [
            { label: "模块数量", value: "3+" },
            { label: "角色", value: "系统支撑" },
            { label: "状态", value: "已打板" }
          ]
        },
        {
          id: "pfc",
          kicker: "Featured Project 01",
          title: "1kW Totem-Pole PFC",
          description: "围绕高功率因数整流、400V 母线、STM32G4 数字控制和系统鲁棒性展开的个人硬核项目。",
          image: "images/power-board-components.jpg",
          tags: ["AC-DC", "STM32G4", "PF / THD", "数字控制"],
          metrics: [
            { label: "功率目标", value: "1kW" },
            { label: "母线目标", value: "400V" },
            { label: "状态", value: "调试中" }
          ]
        },
        {
          id: "llc",
          kicker: "Research Direction",
          title: "半桥 LLC 高频调试能力",
          description: "面向谐振变换器、驱动时序、软开关区间和效率优化的持续研究方向。",
          image: "images/circuit-board-abstract.jpg",
          tags: ["LLC", "谐振控制", "驱动时序", "波形分析"],
          metrics: [
            { label: "方向", value: "DC-DC" },
            { label: "重点", value: "效率" },
            { label: "状态", value: "设计中" }
          ]
        }
      ],
      gatewayKicker: "作品集入口",
      heroStatus: "当前首页展示",
      playingStatus: "自动播放",
      pausedStatus: "已暂停",
      previousSlide: "上一张展示",
      nextSlide: "下一张展示",
      capabilityLabel: "能力模块切换",
      gatewayCards: [
        { title: "工程定位", subtitle: "电力电子硬件 / 嵌入式控制", image: "images/electronics-lab-oscilloscope.jpg" },
        { title: "项目方法", subtitle: "从原理图、PCB 到调试验证", image: "images/pcb-closeup.jpg" },
        { title: "求职方向", subtitle: "功率变换器与数字电源岗位", image: "images/circuit-board-abstract.jpg" }
      ],
      capabilityTracks: [
        {
          title: "电赛模块能力",
          subtitle: "采样、辅助供电、控制板与功率板",
          tiles: [{ title: "隔离采样板", image: "images/isolated-sampling-board.png" }, "辅助电源模块", "STM32G4 控制板"]
        },
        { title: "个人硬核项目", subtitle: "PFC、LLC 与高频功率控制", tiles: ["1kW Totem-Pole PFC", "半桥 LLC", "MEMS 调理电路"] },
        { title: "测试与复盘", subtitle: "波形、指标、问题定位与文档沉淀", tiles: ["示波器波形", "测试记录", "设计复盘"] }
      ]
    },
    home: {
      kicker: "Power Electronics Portfolio",
      title: "蓝宏涛",
      subtitle: "电力电子硬件与嵌入式控制",
      description: "关注功率变换器、隔离采样、STM32G4 数字控制与工程化调试，能够从原理图、PCB、焊接、代码到测试验证完整推进项目。",
      tags: ["PFC", "LLC", "STM32G4", "隔离采样", "辅助电源", "电赛"],
      metricCards: [
        { label: "方向", value: "电力电子" },
        { label: "能力", value: "硬件 + 控制" },
        { label: "形式", value: "点击式作品集" }
      ],
      entranceKicker: "Portfolio Entrance",
      entranceTitle: "选择你想了解的项目方向",
      entranceDescription: "电赛项目体系偏向模块化硬件平台与团队协作，个人项目作品集中展示 PFC、LLC、MEMS 等独立工程实践。",
      entries: [
        {
          title: "电赛项目体系",
          subtitle: "Competition System",
          description: "围绕电赛电源类题目，展示隔离采样、辅助供电、控制板、功率板和模块化接口策略。",
          href: "#/competition",
          image: "images/pcb-closeup.jpg",
          tags: ["隔离采样", "辅助电源", "控制板", "功率板"],
          accent: "blue"
        },
        {
          title: "个人项目作品",
          subtitle: "Personal Projects",
          description: "展示 PFC、LLC、MEMS 调理、数字电源工具和个人网站等硬核项目积累。",
          href: "#/personal",
          image: "images/power-board-components.jpg",
          tags: ["PFC", "LLC", "MEMS", "上位机"],
          accent: "green"
        }
      ],
      contactKicker: "Contact",
      contactTitle: "欢迎交流电力电子硬件、嵌入式控制和功率变换器相关岗位机会。",
      contactDescription: "邮箱、GitHub 与简历链接可后续替换为真实信息。",
      email: "邮箱联系",
      emailFeedback: "正在打开邮箱客户端",
      download: "下载简历"
    },
    pages: {
      competition: {
        kicker: "Competition System",
        title: "电赛项目体系",
        description: "围绕电赛电源类题目，构建可复用的模块化硬件平台。这里集中展示采样、供电、控制、功率级和接口策略等模块。",
        back: "返回首页"
      },
      personal: {
        kicker: "Personal Projects",
        title: "个人项目作品",
        description: "展示个人在电力电子硬件、嵌入式控制和工程调试方向的项目积累，重点突出从方案到验证的完整推进能力。",
        back: "返回首页"
      },
      notFound: {
        kicker: "Not Found",
        title: "没有找到这个项目",
        description: "请从电赛项目体系或个人项目作品页面重新进入。"
      }
    },
    projectDetail: {
      kicker: "Project Detail",
      imagesKicker: "Project Images",
      imagesTitle: "项目图纸与板卡",
      responsibilities: "我的职责",
      metrics: "技术指标",
      systemDiagram: "System Diagram",
      diagramPlaceholder: "后续可替换为真实系统框图",
      designPoints: "关键设计点",
      progress: "当前进度",
      validation: "测试与验证",
      improvements: "后续改进"
    },
    footer: {
      left: "蓝宏涛 · 点击式个人求职作品集",
      right: "Vite + React + TypeScript + Tailwind CSS · GitHub Pages Ready"
    }
  },
  en: {
    meta: {
      title: "Hongtao Lan | Power Electronics Hardware Portfolio",
      description: "Hongtao Lan's portfolio for power electronics hardware, embedded control, and converter projects."
    },
    nav: {
      brand: "Hongtao Lan",
      items: [
        { label: "Home", href: "#/" },
        { label: "Competition", href: "#/competition" },
        { label: "Projects", href: "#/personal" },
        { label: "Contact", href: "#/contact" }
      ],
      resume: "Resume",
      menu: "Toggle menu",
      language: "Language"
    },
    common: {
      backHome: "Back Home",
      viewDetails: "View Details",
      enter: "Enter",
      currentProgress: "Progress"
    },
    topShowcase: {
      heroSlides: [
        {
          id: "welcome",
          kicker: "Welcome",
          title: "Hongtao Lan's Portfolio",
          description: "A focused space for my power electronics hardware, embedded control, and converter projects, from design and soldering to code and validation.",
          image: "images/electronics-lab-oscilloscope.jpg",
          tags: ["Career Portfolio", "Electronics Lab", "Engineering Practice", "Project Notes"],
          metrics: [
            { label: "Focus", value: "Power Electronics" },
            { label: "Skills", value: "Hardware + Control" },
            { label: "Goal", value: "Career Showcase" }
          ]
        },
        {
          id: "competition",
          kicker: "Competition Module",
          title: "Isolated Sensing and Control Platform",
          description: "A reusable power electronics experiment platform built from isolated sensing, auxiliary power, control boards, and power stages.",
          image: "images/pcb-closeup.jpg",
          tags: ["Isolated Sensing", "Auxiliary Power", "Control Board", "PCB"],
          metrics: [
            { label: "Modules", value: "3+" },
            { label: "Role", value: "System Support" },
            { label: "Status", value: "PCB Built" }
          ]
        },
        {
          id: "pfc",
          kicker: "Featured Project 01",
          title: "1kW Totem-Pole PFC",
          description: "A personal core project around high power factor rectification, a 400V bus, STM32G4 digital control, and system robustness.",
          image: "images/power-board-components.jpg",
          tags: ["AC-DC", "STM32G4", "PF / THD", "Digital Control"],
          metrics: [
            { label: "Power", value: "1kW" },
            { label: "Bus", value: "400V" },
            { label: "Status", value: "Debugging" }
          ]
        },
        {
          id: "llc",
          kicker: "Research Direction",
          title: "Half-Bridge LLC High-Frequency Debugging",
          description: "An ongoing direction focused on resonant converters, drive timing, soft-switching regions, and efficiency optimization.",
          image: "images/circuit-board-abstract.jpg",
          tags: ["LLC", "Resonant Control", "Drive Timing", "Waveform Analysis"],
          metrics: [
            { label: "Focus", value: "DC-DC" },
            { label: "Priority", value: "Efficiency" },
            { label: "Status", value: "Designing" }
          ]
        }
      ],
      gatewayKicker: "Portfolio Gateway",
      heroStatus: "Current homepage showcase",
      playingStatus: "Auto playing",
      pausedStatus: "Paused",
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
      capabilityLabel: "Capability track switcher",
      gatewayCards: [
        { title: "Engineering Focus", subtitle: "Power electronics hardware / embedded control", image: "images/electronics-lab-oscilloscope.jpg" },
        { title: "Project Method", subtitle: "From schematic and PCB to validation", image: "images/pcb-closeup.jpg" },
        { title: "Career Direction", subtitle: "Converters and digital power roles", image: "images/circuit-board-abstract.jpg" }
      ],
      capabilityTracks: [
        {
          title: "Competition Modules",
          subtitle: "Sensing, auxiliary power, control, and power boards",
          tiles: [{ title: "Isolated Sensing Board", image: "images/isolated-sampling-board.png" }, "Auxiliary Power Module", "STM32G4 Control Board"]
        },
        { title: "Personal Core Projects", subtitle: "PFC, LLC, and high-frequency power control", tiles: ["1kW Totem-Pole PFC", "Half-Bridge LLC", "MEMS Conditioning Circuit"] },
        { title: "Testing and Review", subtitle: "Waveforms, metrics, troubleshooting, and documentation", tiles: ["Oscilloscope Waveforms", "Test Records", "Design Review"] }
      ]
    },
    home: {
      kicker: "Power Electronics Portfolio",
      title: "Hongtao Lan",
      subtitle: "Power Electronics Hardware and Embedded Control",
      description: "Focused on converters, isolated sensing, STM32G4 digital control, and engineering debug work, with the ability to push projects from schematic and PCB through soldering, firmware, and validation.",
      tags: ["PFC", "LLC", "STM32G4", "Isolated Sensing", "Auxiliary Power", "Competition"],
      metricCards: [
        { label: "Focus", value: "Power Electronics" },
        { label: "Skills", value: "Hardware + Control" },
        { label: "Format", value: "Clickable Portfolio" }
      ],
      entranceKicker: "Portfolio Entrance",
      entranceTitle: "Choose a project direction",
      entranceDescription: "Competition projects focus on modular hardware platforms and teamwork, while personal projects highlight independent work such as PFC, LLC, and MEMS circuits.",
      entries: [
        {
          title: "Competition Project System",
          subtitle: "Competition System",
          description: "A modular power-electronics platform covering isolated sensing, auxiliary power, control boards, power boards, and interface strategy.",
          href: "#/competition",
          image: "images/pcb-closeup.jpg",
          tags: ["Isolated Sensing", "Auxiliary Power", "Control Board", "Power Board"],
          accent: "blue"
        },
        {
          title: "Personal Projects",
          subtitle: "Personal Projects",
          description: "Core project experience including PFC, LLC, MEMS conditioning, digital power tooling, and this portfolio website.",
          href: "#/personal",
          image: "images/power-board-components.jpg",
          tags: ["PFC", "LLC", "MEMS", "Host Tool"],
          accent: "green"
        }
      ],
      contactKicker: "Contact",
      contactTitle: "Open to opportunities around power electronics hardware, embedded control, and converter engineering.",
      contactDescription: "Email, GitHub, and resume links can be replaced with real information later.",
      email: "Email",
      emailFeedback: "Opening email client",
      download: "Resume"
    },
    pages: {
      competition: {
        kicker: "Competition System",
        title: "Competition Project System",
        description: "A reusable modular hardware platform for power-electronics competition problems, covering sensing, power supply, control, power stages, and interface strategy.",
        back: "Back Home"
      },
      personal: {
        kicker: "Personal Projects",
        title: "Personal Projects",
        description: "A collection of power electronics hardware, embedded control, and engineering debug projects, emphasizing the full path from concept to validation.",
        back: "Back Home"
      },
      notFound: {
        kicker: "Not Found",
        title: "Project not found",
        description: "Please enter again from the competition or personal project pages."
      }
    },
    projectDetail: {
      kicker: "Project Detail",
      imagesKicker: "Project Images",
      imagesTitle: "Schematics and Board",
      responsibilities: "My Role",
      metrics: "Technical Metrics",
      systemDiagram: "System Diagram",
      diagramPlaceholder: "Can be replaced with the real system diagram later",
      designPoints: "Key Design Points",
      progress: "Current Progress",
      validation: "Testing and Validation",
      improvements: "Next Improvements"
    },
    footer: {
      left: "Hongtao Lan · Clickable career portfolio",
      right: "Vite + React + TypeScript + Tailwind CSS · GitHub Pages Ready"
    }
  }
};

const projectTranslations: Record<"en", Record<string, LocalizedProjectFields>> = {
  en: {
    "isolated-sampling-board": {
      title: "AC/DC Voltage and Current Isolated Sensing Board",
      subtitle: "Dual-channel isolated sensing front end based on AMC1301",
      summary: "An isolated AC/DC voltage and current sensing board for power-electronics competition topics. The voltage channel scales the P-to-GND bus voltage into the AMC1301 input range, while the current channel converts P-to-N current into a millivolt-level drop through a 20mΩ shunt before isolation, biasing, and 3.3V ADC conditioning.",
      detailImages: [
        {
          src: "images/isolated-sampling-board.png",
          title: "Isolated Sensing PCB",
          description: "The PCB labels P/N/GND inputs, the 20mΩ shunt, 85V peak voltage, 4A peak current, ADC conversion formulas, and key test points for fast wiring and debugging."
        },
        {
          src: "images/isolated-sampling-schematic-main.png",
          title: "Voltage / Current Isolated Sensing Schematic",
          description: "The left side is the voltage sensing chain, and the right side is the 20mΩ shunt current sensing chain. Both channels use AMC1301 isolation followed by TLV9062 biasing and ADC conditioning around 1.65V."
        },
        {
          src: "images/isolated-sampling-schematic-power.png",
          title: "Isolated Power and 3.3V Reference",
          description: "This part covers 5V input protection, 3.3V regulation, B0505S isolated supplies, ISO_5V_1 / ISO_5V_2 decoupling, and the bias/reference support circuitry."
        }
      ],
      tags: ["AMC1301", "TLV9062", "20mΩ Shunt", "Isolated Power"],
      status: "PCB completed",
      goal: "Build a reusable isolated sensing module with clear boundaries between the power stage, sensing board, and control board: the high-voltage side handles voltage/current input, the isolation stage handles safety and scaling, and the control side reads 1.65V-biased ADC signals directly.",
      responsibilities: ["Chose the voltage divider ratio, shunt value, and ADC output range from the 85V peak voltage and 4A peak current targets", "Designed the voltage sensing chain and 20mΩ shunt current sensing chain so high-voltage/current signals become low-voltage differential inputs suitable for AMC1301", "Used AMC1301 for isolated amplification and TLV9062 to create a 1.65V-centered ADC signal that fits the 0-3.3V ADC range", "Planned 5V, 3.3V, ISO_5V_1, and ISO_5V_2 power domains with B0505S isolated supplies to avoid direct coupling between the power ground and control ground", "Marked conversion formulas, P/N/GND connector directions, 5V input, test points, and isolated supply nodes on the PCB for fast wiring and troubleshooting"],
      metrics: [
        { label: "Peak Voltage", value: "85V" },
        { label: "Peak Current", value: "4A" },
        { label: "Shunt", value: "20mΩ" }
      ],
      diagramTitle: "Sensing Chain Block Diagram",
      diagramNodes: ["P/N/GND Input", "Divider / 20mΩ Shunt", "AMC1301 Isolation", "TLV9062 + 3.3V ADC"],
      designPoints: ["The signal chain was derived backward from the measurement targets: 85V peak voltage and 4A peak current define the required ADC swing, which then determines the divider ratio, 20mΩ shunt value, AMC1301 input range, and TLV9062 output bias margin.", "The voltage channel follows a high-impedance divider, isolated amplification, and biased conditioning structure. P-to-GND voltage is scaled before AMC1301 isolation, then TLV9062 centers the ADC signal around 1.65V, with V(P->GND) ≈ 62.60 × (VADC_V - 1.65).", "The current channel uses low-resistance P-N shunt sensing. A 20mΩ shunt produces about 80mV at 4A peak, then the signal passes through 39Ω input resistors, differential filtering, AMC1301 isolation, and op-amp conditioning, with I(P->N) ≈ 3.049 × (VADC_I - 1.65).", "The isolation boundary is deliberately defined as power-side measurement and control-side acquisition. Separate AMC1301 channels and isolated ISO_5V supplies prevent high-voltage ground noise and switching spikes from directly coupling into the MCU sampling ground.", "The debug path was designed into the schematic: TP, 5V, 3.3V, ISO_5V, ADC_V, and ADC_I nodes allow bring-up to proceed by supply, bias, zero point, gain ratio, and dynamic-noise verification."],
      progress: "The schematic, PCB, and board-level markings are complete. The module has moved from basic signal acquisition to an explainable, calibratable, and debuggable sensing front end: connector direction, conversion formulas, power domains, isolation boundaries, and test points are all explicit, so debug can follow a deterministic procedure instead of ad-hoc probing.",
      validation: ["Power-integrity validation: verify 5V input, 3.3V regulation, and ISO_5V_1/ISO_5V_2 isolated supplies before checking the AGND/GND and isolated-ground boundaries.", "Zero-point and bias validation: with no input, confirm ADC_V and ADC_I remain near 1.65V to validate the 3.3V reference divider, TLV9062 conditioning stage, and ADC interface.", "Static gain validation: apply known DC voltage and back-calculate with V(P->GND) ≈ 62.60 × (VADC_V - 1.65); apply known load current and back-calculate with I(P->N) ≈ 3.049 × (VADC_I - 1.65).", "Segmented fault isolation: observe the divider/shunt input, AMC1301 output, TLV9062 output, and ADC input separately to distinguish errors from front-end scaling, isolation amplification, biasing, or downstream sampling.", "Dynamic-noise validation: under switching power-stage operation, observe ADC ripple and spikes to evaluate input filtering, decoupling, current return paths, and sampling instant placement."],
      improvements: ["Build 0-85V voltage and 0-4A current calibration tables with fitted coefficients, zero-offset values, and maximum error.", "Add oscilloscope waveforms for low-voltage open-loop, staged high-voltage, and PWM switching-noise scenarios to make the debug evidence reproducible.", "Use measured noise behavior to review the 10nF / 100nF / 10uF filtering and decoupling choices, and adjust input RC or op-amp output filtering if needed.", "Package the module into a competition-ready checklist covering wiring inspection, power-up order, fault symptoms, and ADC calibration procedure."]
    },
    "auxiliary-power-module": {
      title: "Auxiliary Power Module",
      subtitle: "Stable supply for driver, control, and sensing modules",
      summary: "A low-voltage auxiliary supply module designed around multi-rail needs for control boards, driver boards, and sensing boards.",
      tags: ["Auxiliary Power", "Multi-Rail Output", "Low-Voltage Validation", "System Supply"],
      status: "Under validation",
      goal: "Create a reusable low-voltage auxiliary power solution for fast system assembly and modular debugging.",
      responsibilities: ["Mapped system power requirements", "Planned output voltages, currents, and interfaces", "Ran low-voltage startup and load checks"],
      metrics: [
        { label: "Use", value: "Control / Driver" },
        { label: "Validation", value: "Low Voltage First" },
        { label: "Goal", value: "Stable Supply" }
      ],
      diagramTitle: "Auxiliary Power Distribution Diagram",
      diagramNodes: ["Input Power", "Auxiliary Supply", "Control Board", "Driver / Sensing"],
      designPoints: ["Clear distribution across module power domains", "Connector orientation and startup-sequence awareness", "Reserved test points for power troubleshooting"],
      progress: "The modular design approach is established. Ripple, load capability, and interface notes are being added.",
      validation: ["No-load and load output checks", "Key-node ripple observation", "Joint validation with the control board"],
      improvements: ["Add efficiency and thermal data", "Improve connector silkscreen", "Create a troubleshooting checklist"]
    },
    "stm32g4-control-board": {
      title: "STM32G4 Control Board",
      subtitle: "Core control platform for digital power projects",
      summary: "A reusable STM32G4 control board built around PWM, synchronized ADC sampling, protection inputs, and communication interfaces.",
      tags: ["STM32G4", "PWM", "ADC Sync", "Protection Logic"],
      status: "Debugging",
      goal: "Build a control board suitable for power-supply competition topics and fast validation of PFC, LLC, half-bridge, and other power stages.",
      responsibilities: ["Planned control-board interfaces", "Designed PWM, ADC, protection, and communication resources", "Co-debugged with power boards"],
      metrics: [
        { label: "MCU", value: "STM32G4" },
        { label: "Target", value: "Converters" },
        { label: "Focus", value: "Real-Time Control" }
      ],
      diagramTitle: "Control Board Resource Diagram",
      diagramNodes: ["STM32G4", "ADC Inputs", "PWM Outputs", "Protection / Communication"],
      designPoints: ["Unified PWM and ADC timing plan", "Reserved hardware protection inputs", "Clear debug interface and key test points"],
      progress: "The basic control platform is in place. Next steps are code templates and interface documentation.",
      validation: ["PWM output check", "ADC synchronized sampling validation", "Protection input trigger test"],
      improvements: ["Add a standardized pin table", "Improve control-code templates", "Add debug status indicators"]
    },
    "four-mos-half-bridge-board": {
      title: "Four-MOS Half-Bridge Power Board",
      subtitle: "Power-stage platform for multiple converter experiments",
      summary: "A half-bridge power stage designed around driver loops, power loops, and protection interfaces for competition converter experiments.",
      tags: ["Half Bridge", "MOSFET", "Driver Loop", "Power Loop"],
      status: "Design iteration",
      goal: "Build a reusable half-bridge power board for Buck, Boost, LLC, and related experiments.",
      responsibilities: ["Planned power and driver loops", "Considered bus capacitors, sensing, and protection interfaces", "Defined a staged low-voltage debug path"],
      metrics: [
        { label: "Topology", value: "Half Bridge" },
        { label: "Devices", value: "4 MOS" },
        { label: "Validation", value: "Staged" }
      ],
      diagramTitle: "Half-Bridge Power Stage Diagram",
      diagramNodes: ["Bus Input", "Isolated Driver", "MOS Half Bridge", "Load / Transformer"],
      designPoints: ["Reduce high di/dt loop area", "Separate driver and power-loop regions", "Reserve voltage, current, and temperature observation points"],
      progress: "The board is in structural optimization, with emphasis on debuggability and safety boundaries.",
      validation: ["Low-voltage PWM driver test", "Dead-time and waveform check", "Step-by-step bus-voltage increase"],
      improvements: ["Add thermal design review", "Improve protection chain", "Add layout review notes"]
    },
    "competition-interface-strategy": {
      title: "Competition Modular Interface Strategy",
      subtitle: "Fast combination of sensing, control, supply, and power-stage modules",
      summary: "A unified approach to interfaces, power definitions, signal naming, and debug flow to improve collaboration and reuse.",
      tags: ["Interface Spec", "Modular Design", "Teamwork", "Debug Flow"],
      status: "Ongoing practice",
      goal: "Move competition hardware from one-off builds toward a modular platform with better debug efficiency and reuse.",
      responsibilities: ["Defined module boundaries and signal interfaces", "Organized co-debug order and risk points", "Produced reusable documentation"],
      metrics: [
        { label: "Target", value: "Competition Platform" },
        { label: "Value", value: "Reuse" },
        { label: "Method", value: "Documented" }
      ],
      diagramTitle: "Modular Platform Relationship Diagram",
      diagramNodes: ["Auxiliary Power", "Sensing Board", "Control Board", "Power Board"],
      designPoints: ["Unified interfaces reduce co-debug cost", "Power and signal domains are clearly labeled", "Validate modules first, then integrate the full system"],
      progress: "The core methodology is established. Interface tables, photos, and debug cases will be added over time.",
      validation: ["Independent module validation", "Module connection checks", "Full-system co-debug records"],
      improvements: ["Create reusable interface-document templates", "Add a common fault library", "Build team handoff materials"]
    },
    "totem-pole-pfc": {
      title: "1kW Totem-Pole PFC",
      subtitle: "Digital-control AC/DC project for high PF and low THD",
      summary: "A personal core project around 220VAC input, a 400V bus, STM32G4 digital control, and high power factor rectification.",
      tags: ["PFC", "STM32G4", "Digital Control", "PF / THD"],
      status: "Ongoing co-debug",
      goal: "Achieve high power factor, low harmonics, and stable bus control while building maintainable and explainable digital-power firmware.",
      responsibilities: ["Designed the control software architecture", "Planned sensing, protection, and PWM modulation logic", "Ran staged debugging from low voltage to high voltage"],
      metrics: [
        { label: "Power", value: "1kW" },
        { label: "Bus", value: "400V" },
        { label: "Control", value: "STM32G4" }
      ],
      diagramTitle: "PFC Control System Diagram",
      diagramNodes: ["AC Input", "Sensing Chain", "Digital Control", "Power Stage"],
      designPoints: ["Layered state machine, protection, sampling, and control loops", "Clear ADC synchronized sampling and PWM update timing", "Gradual addition of robustness and performance modules"],
      progress: "The core architecture and optimization direction are established. Testing continues around PF, THD, efficiency, and stability.",
      validation: ["Low-voltage open-loop validation", "Sampling offset and scaling check", "Protection trigger and state-machine transition tests"],
      improvements: ["Add complete measured waveforms", "Record PF/THD/efficiency curves", "Organize tuning method and safety boundaries"]
    },
    "half-bridge-llc": {
      title: "Half-Bridge LLC",
      subtitle: "Resonant converter research for high-efficiency DC/DC",
      summary: "Design and validation work around LLC resonant networks, frequency modulation, drive timing, and soft-switching regions.",
      tags: ["LLC", "Resonant Control", "Soft Switching", "Efficiency Optimization"],
      status: "Designing",
      goal: "Build a complete understanding of LLC resonant converters from theory and hardware through debugging, then turn it into a presentable engineering project.",
      responsibilities: ["Analyzed resonant network and operating regions", "Planned drive and sensing chains", "Defined waveform validation and efficiency optimization paths"],
      metrics: [
        { label: "Type", value: "DC/DC" },
        { label: "Control", value: "Frequency Modulation" },
        { label: "Focus", value: "Efficiency" }
      ],
      diagramTitle: "LLC Power Chain Diagram",
      diagramNodes: ["Half-Bridge Driver", "Resonant Tank", "Transformer", "Rectified Output"],
      designPoints: ["Focus on efficiency around the resonant point", "Consider dead time and soft-switching conditions together", "Cross-check test waveforms with theoretical operating regions"],
      progress: "Theory analysis, hardware planning, and the test plan are being developed.",
      validation: ["Driver waveform check", "Resonant frequency range test", "Steady-state and dynamic output observation"],
      improvements: ["Add a parameter design table", "Add efficiency test plan", "Document soft-switching criteria and waveform examples"]
    },
    "mems-conditioning": {
      title: "MEMS Conditioning Circuit",
      subtitle: "Small-signal acquisition and analog front-end capability",
      summary: "Signal conditioning, amplification, filtering, and interface design for MEMS sensor signals, highlighting analog front-end and noise awareness.",
      tags: ["MEMS", "Analog Front End", "Filtering", "Small Signal"],
      status: "Organizing plan",
      goal: "Show understanding of weak-signal acquisition, front-end conditioning, and test validation methods beyond power electronics.",
      responsibilities: ["Planned the signal chain", "Analyzed gain, bandwidth, and noise constraints", "Designed testing and calibration ideas"],
      metrics: [
        { label: "Focus", value: "Analog Front End" },
        { label: "Target", value: "Small Signal" },
        { label: "Priority", value: "Low Noise" }
      ],
      diagramTitle: "MEMS Signal Chain Diagram",
      diagramNodes: ["MEMS Sensor", "Amplify / Filter", "ADC", "Data Processing"],
      designPoints: ["Match gain and bandwidth to target signals", "Handle low-noise layout and supply design", "Reserve calibration and test interfaces"],
      progress: "Specific metrics, key schematic sections, and test results are being added.",
      validation: ["Input signal injection", "Frequency response and noise observation", "Output linearity check"],
      improvements: ["Add measured curves", "Analyze noise sources", "Add circuit screenshots and layout notes"]
    },
    "stm32-digital-power-host": {
      title: "STM32 Digital Power Host Tool",
      subtitle: "Tooling for parameter tuning, status observation, and data logging",
      summary: "A tooling direction for digital power debugging, covering parameter configuration, status monitoring, data logging, and workflow assistance.",
      tags: ["Host Tool", "Parameter Tuning", "Data Logging", "Engineering Tool"],
      status: "Planning",
      goal: "Improve digital-power debug efficiency by making parameters, states, and test data systematic and reviewable.",
      responsibilities: ["Defined host-side data needs", "Planned communication protocol and parameter tables", "Designed debug records and visualization methods"],
      metrics: [
        { label: "Target", value: "Digital Power" },
        { label: "Value", value: "Debug Efficiency" },
        { label: "Function", value: "Log / Monitor" }
      ],
      diagramTitle: "Host Tool Communication Diagram",
      diagramNodes: ["STM32", "Communication", "Host Tool", "Logs / Charts"],
      designPoints: ["Unified parameter-table management", "Real-time display of key states", "Exportable and reviewable test data"],
      progress: "The requirement structure is clear. Implementation will follow the PFC/LLC debug process.",
      validation: ["Serial communication validation", "Parameter read/write check", "Data logging consistency check"],
      improvements: ["Add UI prototype", "Define communication protocol", "Add automated test records"]
    },
    "personal-portfolio-site": {
      title: "Personal Portfolio Website",
      subtitle: "Web-based presentation system for engineering project capability",
      summary: "Built with Vite, React, TypeScript, and Tailwind CSS to present power electronics hardware and embedded-control projects.",
      tags: ["React", "TypeScript", "GitHub Pages", "Portfolio"],
      status: "Iterating",
      goal: "Organize project capability, engineering process, and career information into a clear, maintainable, deployable portfolio.",
      responsibilities: ["Designed the information architecture", "Implemented responsive pages", "Configured GitHub Pages deployment"],
      metrics: [
        { label: "Stack", value: "Vite" },
        { label: "Deploy", value: "Pages" },
        { label: "Format", value: "Static Site" }
      ],
      diagramTitle: "Portfolio Page Structure",
      diagramNodes: ["Home Entry", "Project Lists", "Project Detail", "Contact"],
      designPoints: ["Clickable information architecture avoids overlong pages", "Centralized data files make maintenance easier", "Hash routing stays compatible with GitHub Pages refresh behavior"],
      progress: "The clickable portfolio architecture is complete. Real images, test data, and project documents will continue to be added.",
      validation: ["Local build validation", "Mobile layout check", "GitHub Pages path compatibility check"],
      improvements: ["Add real project photos", "Add resume and GitHub links", "Continue improving project detail copy"]
    }
  }
};

export function localizeProject(project: PortfolioProject, language: Language): PortfolioProject {
  if (language === "zh") {
    return project;
  }

  return {
    ...project,
    ...projectTranslations.en[project.id]
  };
}
