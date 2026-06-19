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
    projectsAction: string;
    resumeAction: string;
    contactAction: string;
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
    github: string;
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
    openImage: string;
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
      title: "蓝宏涛｜2027 届电源硬件研发作品集",
      description: "蓝宏涛的电源硬件研发求职作品集，展示 CCM Boost PFC、数控 SiC 半桥 LLC、反激电源、STM32G4 控制和样机测试。"
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
          kicker: "2027 届 · 电源硬件研发",
          title: "蓝宏涛｜电源硬件研发作品集",
          description: "面向电源硬件研发岗位，覆盖 Boost PFC、数控 SiC 半桥 LLC、反激电源、STM32G4 控制与从原理设计到样机调试的完整工程链路。",
          image: "images/competition-lab-bench-crop.jpg",
          tags: ["电源硬件研发", "功率变换器", "磁件 / PCB", "闭环调试"],
          metrics: [
            { label: "LLC 满载效率", value: "94.4%" },
            { label: "PFC 功率因数", value: "0.94" },
            { label: "反激输出", value: "24V / 3A" }
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
          title: "1kW CCM Boost PFC",
          description: "基于 UCC28019ADR 完成 220VAC 到 400VDC 高压母线、软启动、EMI/安规和平均电流模式双环设计，阶段性实测 PF 0.94。",
          image: "images/pfc-boost-project.jpg",
          tags: ["UCC28019ADR", "CCM PFC", "400VDC", "Type-II 补偿"],
          metrics: [
            { label: "输入", value: "220VAC" },
            { label: "母线", value: "400VDC" },
            { label: "PF", value: "0.94" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 02",
          title: "数控 SiC 半桥 LLC",
          description: "300VDC 输入、24V / 300W 输出，基于 STM32G4 调频 PI、SiC 双极性栅极驱动和副边同步整流，满载效率 94.4%。",
          image: "images/llc-full-load-board.jpg",
          tags: ["SiC 半桥", "STM32G4", "FHA", "ZVS / 同步整流"],
          metrics: [
            { label: "输出", value: "24V / 300W" },
            { label: "效率", value: "94.4%" },
            { label: "纹波", value: "287mVPP" }
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
      projectsAction: "查看核心项目",
      resumeAction: "下载简历",
      contactAction: "联系我",
      gatewayCards: [
        { title: "工程定位", subtitle: "电力电子硬件 / 嵌入式控制", image: "images/electronics-lab-oscilloscope.jpg" },
        { title: "项目方法", subtitle: "从原理图、PCB 到调试验证", image: "images/pcb-closeup.jpg" },
        { title: "求职方向", subtitle: "功率变换器与数字电源岗位", image: "images/circuit-board-abstract.jpg" }
      ],
      capabilityTracks: [
        {
          title: "电赛模块能力",
          subtitle: "采样、辅助供电、控制板与功率板",
          tiles: [
            { title: "隔离采样板", image: "images/isolated-sampling-board.png" },
            { title: "辅助电源模块", image: "images/auxiliary-power-module.png" },
            { title: "四 MOS 半桥功率板", image: "images/four-mos-power-board.png" }
          ]
        },
        {
          title: "已完成项目",
          subtitle: "PFC、LLC 与反激电源的样机及实测证据",
          tiles: [
            { title: "1kW CCM Boost PFC", image: "images/pfc-boost-project.jpg" },
            { title: "数控 SiC 半桥 LLC", image: "images/llc-full-load-board.jpg" },
            { title: "72W Flyback 反激电源", image: "images/flyback-doc-board.jpg" }
          ]
        },
        {
          title: "测试与复盘",
          subtitle: "波形、指标、问题定位与设计文档沉淀",
          tiles: [
            { title: "示波器波形", image: "images/oscilloscope-waveform.jpg" },
            { title: "测试记录", image: "images/test-record.jpg" },
            { title: "设计复盘", image: "images/design-review.jpg" }
          ]
        }
      ]
    },
    home: {
      kicker: "Power Electronics Portfolio",
      title: "蓝宏涛",
      subtitle: "2027 届 · 电源硬件研发",
      description: "具备从拓扑设计、器件选型、参数计算、磁件设计、PCB、Simulink 闭环仿真到样机调试的完整能力，重点方向为 PFC、SiC 半桥 LLC、反激与数字电源控制。",
      tags: ["CCM Boost PFC", "SiC 半桥 LLC", "Flyback", "STM32G4", "Simulink", "PCB"],
      metricCards: [
        { label: "方向", value: "电力电子" },
        { label: "能力", value: "硬件 + 控制" },
        { label: "形式", value: "点击式作品集" }
      ],
      entranceKicker: "Portfolio Entrance",
      entranceTitle: "选择你想了解的项目方向",
      entranceDescription: "电赛项目体系展示模块化硬件和团队协作；个人项目重点展示 PFC、LLC、反激、上位机与网站工程实践。",
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
          description: "展示 Boost PFC、数控 SiC 半桥 LLC、72W 反激、数字电源上位机和个人网站。",
          href: "#/personal",
          image: "images/llc-full-load-board.jpg",
          tags: ["PFC", "LLC", "Flyback", "上位机"],
          accent: "green"
        }
      ],
      contactKicker: "Contact",
      contactTitle: "求职方向：电源硬件研发岗（2027 届）",
      contactDescription: "欢迎通过邮箱联系，也可以查看 GitHub 代码仓库或下载完整简历。电话和微信仅保留在简历中，不在网页正文公开。",
      email: "邮箱联系",
      emailFeedback: "正在打开邮箱客户端",
      github: "GitHub",
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
      openImage: "查看高清原图",
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
      left: "蓝宏涛 · 2027 届电源硬件研发作品集",
      right: "203863488@qq.com · GitHub: 203863488-cell"
    }
  },
  en: {
    meta: {
      title: "Hongtao Lan | Class of 2027 Power Hardware Portfolio",
      description: "Power hardware portfolio covering CCM Boost PFC, digital SiC half-bridge LLC, flyback conversion, STM32G4 control, and prototype validation."
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
          kicker: "Class of 2027 · Power Hardware",
          title: "Hongtao Lan | Power Hardware Portfolio",
          description: "Power-supply hardware portfolio covering Boost PFC, digital SiC half-bridge LLC, flyback conversion, STM32G4 control, and the full path from design to prototype validation.",
          image: "images/competition-lab-bench-crop.jpg",
          tags: ["Power Hardware", "Converters", "Magnetics / PCB", "Closed-Loop Debug"],
          metrics: [
            { label: "LLC Efficiency", value: "94.4%" },
            { label: "PFC PF", value: "0.94" },
            { label: "Flyback Output", value: "24V / 3A" }
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
          title: "1kW CCM Boost PFC",
          description: "UCC28019ADR-based 220VAC to 400VDC PFC covering inrush control, EMI/safety design, and average-current-mode loops, with a measured PF of 0.94.",
          image: "images/pfc-boost-project.jpg",
          tags: ["UCC28019ADR", "CCM PFC", "400VDC", "Type-II Compensation"],
          metrics: [
            { label: "Input", value: "220VAC" },
            { label: "Bus", value: "400VDC" },
            { label: "PF", value: "0.94" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 02",
          title: "Digital SiC Half-Bridge LLC",
          description: "300VDC to 24V / 300W with STM32G4 frequency PI control, bipolar SiC gate drive, synchronous rectification, and 94.4% full-load efficiency.",
          image: "images/llc-full-load-board.jpg",
          tags: ["SiC Half Bridge", "STM32G4", "FHA", "ZVS / SR"],
          metrics: [
            { label: "Output", value: "24V / 300W" },
            { label: "Efficiency", value: "94.4%" },
            { label: "Ripple", value: "287mVPP" }
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
      projectsAction: "View Core Projects",
      resumeAction: "Download Resume",
      contactAction: "Contact Me",
      gatewayCards: [
        { title: "Engineering Focus", subtitle: "Power electronics hardware / embedded control", image: "images/electronics-lab-oscilloscope.jpg" },
        { title: "Project Method", subtitle: "From schematic and PCB to validation", image: "images/pcb-closeup.jpg" },
        { title: "Career Direction", subtitle: "Converters and digital power roles", image: "images/circuit-board-abstract.jpg" }
      ],
      capabilityTracks: [
        {
          title: "Competition Modules",
          subtitle: "Sensing, auxiliary power, control, and power boards",
          tiles: [
            { title: "Isolated Sensing Board", image: "images/isolated-sampling-board.png" },
            { title: "Auxiliary Power Module", image: "images/auxiliary-power-module.png" },
            { title: "Four-MOS Half-Bridge Board", image: "images/four-mos-power-board.png" }
          ]
        },
        {
          title: "Completed Projects",
          subtitle: "Prototype and measurement evidence for PFC, LLC, and flyback converters",
          tiles: [
            { title: "1kW CCM Boost PFC", image: "images/pfc-boost-project.jpg" },
            { title: "Digital SiC Half-Bridge LLC", image: "images/llc-full-load-board.jpg" },
            { title: "72W Flyback Supply", image: "images/flyback-doc-board.jpg" }
          ]
        },
        {
          title: "Testing and Review",
          subtitle: "Waveforms, metrics, troubleshooting, and design documentation",
          tiles: [
            { title: "Oscilloscope Waveforms", image: "images/oscilloscope-waveform.jpg" },
            { title: "Test Records", image: "images/test-record.jpg" },
            { title: "Design Review", image: "images/design-review.jpg" }
          ]
        }
      ]
    },
    home: {
      kicker: "Power Electronics Portfolio",
      title: "Hongtao Lan",
      subtitle: "Class of 2027 · Power Hardware Engineering",
      description: "End-to-end capability across topology design, component selection, calculation, magnetics, PCB, Simulink closed-loop modeling, and prototype debugging, with a focus on PFC, SiC LLC, flyback, and digital power.",
      tags: ["CCM Boost PFC", "SiC Half-Bridge LLC", "Flyback", "STM32G4", "Simulink", "PCB"],
      metricCards: [
        { label: "Focus", value: "Power Electronics" },
        { label: "Skills", value: "Hardware + Control" },
        { label: "Format", value: "Clickable Portfolio" }
      ],
      entranceKicker: "Portfolio Entrance",
      entranceTitle: "Choose a project direction",
      entranceDescription: "Competition work highlights modular hardware and teamwork; personal projects cover PFC, LLC, flyback, telemetry tooling, and this portfolio.",
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
          description: "Core work including Boost PFC, digital SiC LLC, a 72W flyback supply, telemetry tooling, and this portfolio.",
          href: "#/personal",
          image: "images/llc-full-load-board.jpg",
          tags: ["PFC", "LLC", "Flyback", "Host Tool"],
          accent: "green"
        }
      ],
      contactKicker: "Contact",
      contactTitle: "Target role: Power Hardware R&D, Class of 2027",
      contactDescription: "Contact me by email, review the GitHub repository, or download the full resume. Phone and WeChat remain in the resume rather than the public page body.",
      email: "Email",
      emailFeedback: "Opening email client",
      github: "GitHub",
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
      openImage: "View Full-Resolution Image",
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
      left: "Hongtao Lan · Class of 2027 Power Hardware Portfolio",
      right: "203863488@qq.com · GitHub: 203863488-cell"
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
      title: "1kW CCM Boost PFC",
      subtitle: "UCC28019ADR / 220VAC to 400VDC average-current-mode PFC",
      summary: "A 1kW-class front-end design covering component selection, EMI and safety, relay-bypassed NTC inrush limiting, and dual-loop compensation. The current public validation is a 160W stage at 96.9% efficiency and PF 0.94.",
      detailImages: [
        { src: "images/pfc-boost-project.jpg", title: "1kW-Class CCM Boost PFC Prototype", description: "Prototype with input protection, soft start, bridge, boost stage, high-voltage bus, UCC28019ADR control, and auxiliary supply." },
        { src: "images/pfc-boost-schematic-main.png", title: "Power Stage, Sensing, and Compensation", description: "Main schematic covering the boost stage, VSENSE/VINS/ISENSE paths, and voltage/current loop compensation." },
        { src: "images/pfc-boost-input-power.jpg", title: "220VAC Input Power and PF Record", description: "Staged-load record used to review input voltage, current, active power, and power factor." },
        { src: "images/pfc-boost-bus-ripple.jpg", title: "400V Bus Ripple Record", description: "Bus waveform used to review voltage-loop stability and twice-line-frequency energy storage." },
        { src: "images/pfc-boost-schematic-aux.png", title: "Auxiliary Supply and Protective Earth", description: "Auxiliary control power, relay drive, decoupling, protective earth, and mounting structure." }
      ],
      tags: ["UCC28019ADR", "CCM Boost PFC", "1kW Design", "400VDC", "Type-II Compensation", "EMI / Safety"],
      status: "160W high-voltage closed-loop stage validated",
      goal: "Build a 1kW-class single-phase CCM Boost PFC that establishes a 400VDC bus from 220VAC and improves input-current shape and power factor through average-current-mode control.",
      responsibilities: [
        "Selected the MOSFET, bridge rectifier, boost diode, inductor, and high-voltage bus capacitors with loss and stress analysis.",
        "Built a Simulink closed-loop model to review device stress and loop behavior.",
        "Designed the input EMI network, relay-bypassed NTC soft start, and high-voltage PCB clearance strategy.",
        "Derived the CCM PFC small-signal behavior and designed the outer-voltage and inner-current Type-II compensation.",
        "Completed the staged 220VAC to 400VDC test and recorded efficiency, PF, and input-current improvement."
      ],
      metrics: [
        { label: "Design Power", value: "1kW" },
        { label: "Input / Bus", value: "220VAC / 400VDC" },
        { label: "Test Load", value: "160W" },
        { label: "Stage Efficiency", value: "96.9%" },
        { label: "Power Factor", value: "0.94" },
        { label: "Controller", value: "UCC28019ADR" }
      ],
      diagramTitle: "CCM Boost PFC Power and Control Path",
      diagramNodes: ["220VAC + EMI / Soft Start", "Bridge + Boost Stage", "400V Bus", "Voltage / Current Sensing", "UCC28019ADR Dual Loops", "PWM Drive / Protection"],
      designPoints: [
        "The outer loop regulates the 400V bus while the inner loop tracks the rectified-line envelope; bandwidth separation limits 100Hz bus-ripple interaction.",
        "The voltage-loop crossover is around 10Hz and the current-loop bandwidth is in the 5kHz-10kHz range.",
        "The relay bypasses the NTC after startup so inrush limiting does not become a continuous loss source.",
        "The page clearly separates the 1kW design target from the currently validated 160W operating point."
      ],
      progress: "The 1kW-class design, component and loop calculations, PCB prototype, and 220VAC to 400VDC conversion are complete. Public measured results are currently limited to the 160W stage: 96.9% efficiency and PF 0.94.",
      validation: [
        "Established and regulated the 400VDC bus from 220VAC.",
        "Recorded about 96.9% efficiency at the staged 160W load.",
        "Recorded PF about 0.94 with improved input-current behavior.",
        "Checked NTC inrush limiting and relay-bypass sequencing.",
        "Boundary: full 1kW, complete THD curves, and product-level compliance are not claimed as completed."
      ],
      improvements: ["Add load-point efficiency, PF, and THD curves", "Capture VDS and inductor-current waveforms", "Add startup, step-load, and protection tests", "Complete thermal mapping", "Advance toward 1kW only in a properly protected lab setup"]
    },
    "half-bridge-llc": {
      title: "Digital SiC Half-Bridge LLC",
      subtitle: "300VDC to 24V / 300W STM32G4 frequency-controlled LLC",
      summary: "A complete prototype with the power board, STM32G4 controller, auxiliary supply, PQ40 transformer, and synchronous rectification. Full-load output is 279.6W at 94.4% efficiency with 287mVPP ripple and 0.06% load regulation.",
      detailImages: [
        { src: "images/llc-full-load-board.jpg", title: "Full-Load Digital SiC LLC Prototype", description: "Complete prototype with power board, controller, auxiliary supply, PQ40 transformer, synchronous rectification, and output filtering." },
        { src: "images/llc-full-load-input-power.jpg", title: "Full-Load Input Power", description: "Input-side record of about 300V and 295.99W." },
        { src: "images/llc-full-load-output-load.jpg", title: "24V / 11.7A Output Load", description: "Electronic-load record of about 279.6W output." },
        { src: "images/llc-gs-waveform.jpg", title: "SiC Gate-Source Waveform", description: "Check of UCC23513 isolation, +18V / -3V gate drive, dead time, and turn-off margin." },
        { src: "images/llc-sr-waveform.jpg", title: "Synchronous Rectifier Waveform", description: "Secondary MOS timing check against resonant-current direction." },
        { src: "images/llc-output-ripple.jpg", title: "Full-Load Ripple: 287mVPP", description: "Output-quality record used to review filtering, SR, sensing noise, and layout." },
        { src: "images/llc-load-regulation.jpg", title: "Load Regulation Record", description: "Measured regulation of about 0.06%." },
        { src: "images/design-review.jpg", title: "Magnetics and Parameter Review", description: "FHA gain, resonant tank, transformer turns ratio, leakage integration, and LCR review." }
      ],
      tags: ["300VDC", "24V / 300W", "SiC Half Bridge", "STM32G4", "UCC23513", "FHA / Frequency PI"],
      status: "Full-load closed-loop validation complete",
      goal: "Build a reviewable 300VDC to 24V / 300W isolated digital power prototype from FHA analysis and magnetics through SiC drive, PCB layout, STM32G4 control, synchronous rectification, and full-load validation.",
      responsibilities: [
        "Completed the main power board, STM32G4 controller, and auxiliary supply.",
        "Designed the resonant tank and operating frequency range with FHA analysis.",
        "Designed the PQ40 transformer with a 30:4:4 turns ratio and controlled leakage inductance.",
        "Implemented UCC23513 isolated +18V / -3V bipolar SiC gate drive and constrained the high di/dt PCB loops.",
        "Implemented complementary PWM, ADC, frequency PI control, soft start, limits, protection, and fault latching on STM32G4.",
        "Collected full-load power, efficiency, gate-drive, SR, ripple, load-regulation, and ZVS evidence."
      ],
      metrics: [
        { label: "Input", value: "300VDC" },
        { label: "Output", value: "24V / 300W" },
        { label: "Full-Load Eff.", value: "94.4%" },
        { label: "Ripple", value: "287mVPP" },
        { label: "Load Regulation", value: "0.06%" },
        { label: "Turns Ratio", value: "30:4:4" }
      ],
      diagramTitle: "300V Frequency-Controlled LLC Power and Control Path",
      diagramNodes: ["300VDC Bus", "SiC Half Bridge + UCC23513", "LLC Tank / PQ40 Transformer", "Synchronous Rectifier + Filter", "Feedback / STM32G4", "Frequency PI / PWM / Protection"],
      designPoints: [
        "The operating range is defined by gain, resonance, frequency limits, load variation, and the capacitive-region boundary.",
        "Transformer design considers core and window margin, insulation, leakage control, and high-current secondary copper loss.",
        "Bipolar gate drive and Kelvin-source layout reduce false turn-on and improve turn-off reliability.",
        "Validation follows a traceable chain from input power to output power, efficiency, switching waveforms, ripple, and regulation."
      ],
      progress: "The prototype completed hardware, magnetics, STM32G4 frequency control, and full-load validation: about 300V / 295.99W input, 279.6W output, 94.4% efficiency, 287mVPP ripple, 0.06% load regulation, ZVS, and secondary synchronous rectification.",
      validation: ["Input power: about 300V / 295.99W", "Output power: about 24V / 11.70A and 279.6W", "Full-load efficiency: 94.4%", "Bipolar gate drive and ZVS waveform checks", "Synchronous-rectifier timing check", "Ripple: 287mVPP; load regulation: 0.06%"],
      improvements: ["Add 25%-100% load matrices", "Document PI and protection parameters", "Add startup, step-load, and aging records", "Expand transformer and PCB review evidence"]
    },
    "flyback": {
      title: "72W Flyback Power Supply",
      subtitle: "85-265VAC wide input to isolated 24V / 3A output",
      summary: "A UCC287506DBVR flyback supply with TL431 plus optocoupler feedback and a custom 24:6:5 transformer. At 220VAC full load, efficiency is about 85%, ripple about 390mVPP, and load regulation 0.67%.",
      detailImages: [
        { src: "images/flyback-doc-board.jpg", title: "24V / 3A Flyback Prototype", description: "Prototype showing input rectification, transformer, control and feedback, and output filtering." },
        { src: "images/flyback-input-power.jpg", title: "Full-Load Input Power", description: "220VAC full-load input voltage, current, and active-power record." },
        { src: "images/flyback-output-load.jpg", title: "Electronic Load Output Record", description: "Approximately 24V / 3A and 72W output." },
        { src: "images/flyback-ripple-waveform.jpg", title: "Full-Load Output Ripple", description: "Output ripple and high-frequency spike record with bandwidth limiting and a short ground connection." },
        { src: "images/flyback-vds-waveform.jpg", title: "MOSFET VDS Stress", description: "Waveform used to review reflected voltage, leakage spike, and RCD clamp behavior." }
      ],
      tags: ["Flyback", "UCC287506", "24V / 3A", "TL431 Optocoupler", "RCD Clamp", "Wide Input"],
      status: "Full-load validation complete",
      goal: "Develop an isolated 24V / 3A auxiliary supply covering the power stage, transformer, RCD clamp, primary current sensing, secondary feedback, and full-load validation.",
      responsibilities: ["Defined the offline flyback architecture for 85-265VAC and 24V / 3A", "Designed the UCC287506 power, sensing, auxiliary, and TL431 feedback circuits", "Specified the 24:6:5 transformer, 100µH primary inductance, leakage, gap, and insulation", "Designed the RCD clamp from reflected voltage and leakage energy", "Validated output regulation, efficiency, ripple, load regulation, and MOSFET VDS stress"],
      metrics: [
        { label: "Input Range", value: "85-265VAC" },
        { label: "Output", value: "24V / 3A" },
        { label: "Full-Load Eff.", value: "About 85%" },
        { label: "Ripple", value: "About 390mVPP" },
        { label: "Load Regulation", value: "0.67%" },
        { label: "Turns Ratio", value: "24:6:5" }
      ],
      diagramTitle: "Wide-Input Isolated Flyback Power Path",
      diagramNodes: ["85-265VAC", "Rectifier / HV Bus", "UCC287506 + MOSFET", "24:6:5 Transformer", "Schottky Rectifier / Filter", "TL431 + Optocoupler"],
      designPoints: ["The transformer is derived from the per-cycle energy model", "MOSFET VDS includes bus, reflected voltage, and leakage spike", "The TL431 divider sets the output while compensation shapes stability and dynamics", "The page separates completed 220VAC results from pending wide-input and compliance tests"],
      progress: "The schematic, transformer specification, PCB prototype, full-load output, efficiency, ripple, and MOSFET-stress tests are complete for the 220VAC operating point.",
      validation: ["Full-load operation at 220VAC and 24V / 3A", "Efficiency about 85%", "Ripple about 390mVPP", "Load regulation 0.67%", "VDS waveform review of the RCD clamp", "Boundary: the full 85-265VAC matrix is still pending"],
      improvements: ["Complete the 85/110/220/265VAC matrix", "Recheck high-line VDS and thermal stress", "Add transient, protection, and aging tests", "Expand EMI and safety documentation"]
    },
    "stm32-digital-power-host": {
      title: "STM32G4 LLC Real-Time Telemetry Dashboard",
      subtitle: "Web Serial / 921600 8N1 / read-only telemetry",
      summary: "A local Web Serial dashboard that receives LLC operating data from STM32G4, displays Vin, Vout, Iout, Fsw, PI and PWM/fault state, and exports charts, CSV, and raw logs.",
      detailImages: [
        { src: "images/stm32g4-llc-host-dashboard.png", title: "STM32G4 LLC Telemetry Dashboard", description: "Interface with voltage, current, switching frequency, PI output, PWM/fault state, link statistics, and real-time charts." }
      ],
      tags: ["Web Serial", "STM32G4", "921600 8N1", "Chart.js", "CSV", "Read Only"],
      status: "Functional prototype complete",
      goal: "Provide read-only telemetry so control variables, output state, and link health can be reviewed without granting the browser direct authority over the power stage.",
      responsibilities: ["Defined the isolated STM32G4 USART to CH340 to Web Serial path", "Implemented framed CSV parsing and link statistics", "Built status cards, charts, pause/clear controls, CSV export, and raw-log storage", "Kept the browser side read-only to preserve the safety boundary"],
      metrics: [
        { label: "Serial", value: "921600 8N1" },
        { label: "Protocol", value: "LLC CSV" },
        { label: "UI Refresh", value: "10Hz" },
        { label: "Chart Window", value: "3000 points" },
        { label: "Buffer", value: "100000 rows" },
        { label: "Safety", value: "Read Only" }
      ],
      diagramTitle: "LLC Telemetry Data Path",
      diagramNodes: ["STM32G4 Variables", "USART1_TX CSV", "Isolated CH340", "Web Serial Parser", "Cards / Charts", "CSV / Raw Log"],
      designPoints: ["Read-only telemetry decouples visualization from control authority", "Invalid frames never enter charts or exports", "Continuous receive is decoupled from 10Hz UI refresh", "Structured CSV and raw logs support different review tasks"],
      progress: "The functional prototype includes parsing, status cards, real-time charts, link statistics, CSV export, and raw-log storage.",
      validation: ["Valid and invalid frame tests", "Split and multi-frame buffering", "Chrome / Edge localhost requirement", "Isolated USB-TTL requirement", "Pause freezes display but not background receive"],
      improvements: ["Compare firmware transmit and host receive rates", "Export session metadata", "Gate any future write-back behind strict safety controls", "Add long-run real-serial examples"]
    },
    "personal-portfolio-site": {
      title: "Personal Portfolio Website",
      subtitle: "Bilingual, data-driven portfolio for power-hardware roles",
      summary: "A React, TypeScript, Vite, and Tailwind CSS portfolio with responsive project details, full-resolution image viewing, WebP previews, offline caching, SEO, and automatic GitHub Pages deployment.",
      detailImages: [
        { src: "images/portfolio-site-projects-overview.png", title: "Personal Project Collection", description: "Responsive project grid for PFC, LLC, flyback, STM32G4 telemetry, and the portfolio itself." },
        { src: "images/portfolio-site-project-card.png", title: "Data-Driven Project Card", description: "Titles, summaries, status, tags, and key metrics are generated from the shared project model." },
        { src: "images/portfolio-site-project-detail.png", title: "Reusable Project Detail Page", description: "Shared detail structure for responsibilities, metrics, system design, decisions, progress, validation, and next steps." }
      ],
      tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GitHub Pages", "SEO / PWA"],
      status: "Live and iterating",
      goal: "Give recruiters a direct path to identify the target role, inspect engineering evidence, download the resume, and make contact on phones, tablets, and desktops.",
      responsibilities: ["Designed the recruiter-oriented information architecture", "Created a shared bilingual project data model", "Implemented reusable React components and hash routing", "Built an accessible responsive image viewer", "Generated WebP previews while preserving original images", "Unified source, CI build, and GitHub Pages deployment"],
      metrics: [
        { label: "Projects", value: "10" },
        { label: "Languages", value: "ZH / EN" },
        { label: "Frontend", value: "React 19" },
        { label: "Routing", value: "Hash + Lazy" },
        { label: "Deployment", value: "GitHub Pages" },
        { label: "Images", value: "WebP + Original" }
      ],
      diagramTitle: "Portfolio Content, UI, and Delivery Path",
      diagramNodes: ["Project Data + Bilingual Copy", "Reusable React Components", "Hash Routes + Lazy Loading", "CI Build + GitHub Pages"],
      designPoints: ["The flow moves from role identification to project comparison, evidence review, and contact", "Project content is decoupled from page structure", "Lists use WebP previews and load originals only in the viewer", "One CI build now produces the deployed site", "Keyboard, ARIA, focus, and reduced-motion behavior are included"],
      progress: "The site now uses the real resume and contact information, source-controlled current project data, responsive original-image viewing, optimized previews, SEO, offline caching, and automatic deployment.",
      validation: ["TypeScript, ESLint, and production build checks", "Hash-route smoke tests", "Chinese/English and external-link checks", "Phone, tablet, and desktop viewer tests", "WebP preview and original-image checks"],
      improvements: ["Keep adding measured curves and public evidence", "Add project repositories when they are safe to publish", "Consider privacy-friendly analytics only if needed"],
      links: [
        { label: "GitHub Repository", href: "https://github.com/203863488-cell/personal-site" },
        { label: "Live Website", href: "https://203863488-cell.github.io/personal-site/" }
      ]
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
