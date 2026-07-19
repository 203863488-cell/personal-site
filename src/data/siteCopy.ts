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
  href: string;
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
    completed: string;
    featuredMetric: string;
    designMetric: string;
    measuredMetric: string;
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
    shareAction: string;
    shareTitle: string;
    shareDescription: string;
    shareUrlLabel: string;
    copyLink: string;
    copied: string;
    copyFailed: string;
    openShareLink: string;
    closeShare: string;
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
    keyComponents: string;
    operatingPrinciples: string;
    engineeringHighlights: string;
    systemDiagram: string;
    diagramPlaceholder: string;
    designPoints: string;
    progress: string;
    validation: string;
    improvements: string;
    shareProject: string;
    copyProjectLink: string;
    copiedProjectLink: string;
    previousProject: string;
    nextProject: string;
    projectNavigation: string;
    quickOverview: {
      kicker: string;
      title: string;
      objective: string;
      challenge: string;
      contribution: string;
      outcome: string;
    };
    imageKinds: {
      prototype: string;
      schematic: string;
      waveform: string;
      test: string;
      software: string;
    };
    sectionNavigation: {
      ariaLabel: string;
      overview: string;
      drawings: string;
      metrics: string;
      design: string;
      validation: string;
      outcomes: string;
    };
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
      currentProgress: "完成状态",
      completed: "已完成",
      featuredMetric: "核心指标",
      designMetric: "设计指标",
      measuredMetric: "实测结果"
    },
    topShowcase: {
      heroSlides: [
        {
          id: "welcome",
          kicker: "2027 届 · 电源硬件研发",
          title: "蓝宏涛｜电源硬件研发作品集",
          description: "面向电源硬件研发岗位，覆盖 Boost PFC、数控 SiC 半桥 LLC、反激电源、STM32G4 控制与从原理设计到样机调试的完整工程链路。",
          image: "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png",
          tags: ["电源硬件研发", "功率变换器", "磁件 / PCB", "闭环调试"],
          metrics: [
            { label: "LLC 满载效率", value: "94.4%" },
            { label: "PFC 功率因数", value: "0.94" },
            { label: "反激输出", value: "24V / 3A" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 01",
          title: "数控 SiC 半桥 LLC",
          description: "400VDC 输入、24V / 300W 输出，基于 STM32G4 调频 PI、SiC 双极性栅极驱动和副边同步整流，满载效率 94.4%。",
          image: "images/llc-full-load-board.jpg",
          tags: ["SiC 半桥", "STM32G4", "FHA", "ZVS / 同步整流"],
          metrics: [
            { label: "输出", value: "24V / 300W" },
            { label: "效率", value: "94.4%" },
            { label: "纹波", value: "287mVPP" }
          ]
        },
        {
          id: "flyback",
          kicker: "Featured Project 02",
          title: "72W Flyback 反激电源",
          description: "85-265VAC 宽输入、24V / 3A 隔离输出，采用 UCC287506、TL431 + 光耦反馈和定制变压器，220VAC 满载效率约 85%。",
          image: "images/flyback-project.jpg",
          tags: ["Flyback", "UCC287506", "24V / 3A", "TL431 光耦"],
          metrics: [
            { label: "输入范围", value: "85-265VAC" },
            { label: "输出", value: "24V / 3A" },
            { label: "效率", value: "约 85%" }
          ]
        },
        {
          id: "pfc",
          kicker: "Featured Project 03",
          title: "1kW CCM Boost PFC",
          description: "基于 UCC28019ADR 完成 220VAC 到 400VDC 高压母线、软启动、EMI/安规和平均电流模式双环设计，带载实测 PF 0.94。",
          image: "images/pfc-boost-project.jpg",
          tags: ["UCC28019ADR", "CCM PFC", "400VDC", "Type-II 补偿"],
          metrics: [
            { label: "输入", value: "220VAC" },
            { label: "母线", value: "400VDC" },
            { label: "PF", value: "0.94" }
          ]
        }
      ],
      gatewayKicker: "30 秒看核心成果",
      heroStatus: "当前首页展示",
      playingStatus: "自动播放",
      pausedStatus: "已暂停",
      previousSlide: "上一张展示",
      nextSlide: "下一张展示",
      capabilityLabel: "能力模块切换",
      projectsAction: "查看核心项目",
      resumeAction: "下载简历",
      contactAction: "联系我",
      shareAction: "扫码打开",
      shareTitle: "手机扫码查看作品集",
      shareDescription: "使用手机相机扫描二维码，即可打开当前作品集页面。",
      shareUrlLabel: "访问地址",
      copyLink: "复制链接",
      copied: "已复制",
      copyFailed: "复制失败",
      openShareLink: "直接打开",
      closeShare: "关闭二维码",
      gatewayCards: [
        { title: "数控 SiC 半桥 LLC", subtitle: "300W · 满载效率 94.4% · ZVS / 同步整流", image: "images/llc-full-load-board.jpg", href: "#/project/half-bridge-llc" },
        { title: "1kW CCM Boost PFC", subtitle: "400VDC · 实测效率 96.9% · PF 0.94", image: "images/pfc-boost-project.jpg", href: "#/project/totem-pole-pfc" },
        { title: "72W Flyback 反激电源", subtitle: "24V / 3A · 满载效率约 85% · 负载调整率 0.67%", image: "images/flyback-project.jpg", href: "#/project/flyback" }
      ],
      capabilityTracks: [
        {
          title: "电赛模块能力",
          subtitle: "采样、辅助供电、控制板与功率板",
          tiles: [
            { title: "隔离采样板", image: "images/isolated-sampling-board.png" },
            { title: "隔离辅助电源板", image: "images/auxiliary-power-module.png" },
            { title: "100V 半桥 / 全桥功率板", image: "images/four-mos-power-board.png" }
          ]
        },
        {
          title: "已完成项目",
          subtitle: "PFC、LLC 与反激电源的样机及实测证据",
          tiles: [
            { title: "数控 SiC 半桥 LLC", image: "images/llc-full-load-board.jpg" },
            { title: "1kW CCM Boost PFC", image: "images/pfc-boost-project.jpg" },
            { title: "72W Flyback 反激电源", image: "images/flyback-project.jpg" }
          ]
        },
        {
          title: "完整工程能力链",
          subtitle: "方案计算 → 磁件 → PCB → STM32G4 → 闭环调试 → 测试记录",
          tiles: [
            { title: "方案计算", image: "images/capability-calculation.jpg" },
            { title: "磁件设计", image: "images/capability-magnetics.jpg" },
            { title: "PCB 实现", image: "images/capability-pcb-layout.jpg" },
            { title: "STM32G4 控制", image: "images/capability-stm32g4-control.jpg" },
            { title: "闭环调试", image: "images/capability-closed-loop-debug.jpg" },
            { title: "测试记录", image: "images/capability-test-record.jpg" }
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
      entranceDescription: "电赛项目体系展示模块化硬件和团队协作；个人项目重点展示 PFC、LLC 与反激电源。",
      entries: [
        {
          title: "电赛项目体系",
          subtitle: "Competition System",
          description: "围绕电赛电源类题目，展示隔离采样、辅助供电、STM32G4 控制板和 100V H 桥功率板。",
          href: "#/competition",
          image: "images/pcb-closeup.jpg",
          tags: ["隔离采样", "辅助电源", "控制板", "功率板"],
          accent: "blue"
        },
        {
          title: "个人项目作品",
          subtitle: "Personal Projects",
          description: "展示 Boost PFC、数控 SiC 半桥 LLC 和 72W 反激电源。",
          href: "#/personal",
          image: "images/llc-full-load-board.jpg",
          tags: ["PFC", "LLC", "Flyback"],
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
        description: "围绕 100V 低压电力电子平台，集中展示双向隔离采样、隔离辅助电源、STM32G4 控制板和 H 桥功率板。",
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
      imagesTitle: "项目证据与图纸",
      openImage: "查看高清原图",
      responsibilities: "我的职责",
      metrics: "技术指标",
      keyComponents: "关键器件与参数",
      operatingPrinciples: "公式与工作逻辑",
      engineeringHighlights: "工程实现与可靠性设计",
      systemDiagram: "System Diagram",
      diagramPlaceholder: "系统功能链路",
      designPoints: "关键设计点",
      progress: "完成状态",
      validation: "测试与验证",
      improvements: "成果沉淀与扩展能力",
      shareProject: "扫码分享项目",
      copyProjectLink: "复制项目链接",
      copiedProjectLink: "项目链接已复制",
      previousProject: "上一个项目",
      nextProject: "下一个项目",
      projectNavigation: "项目切换",
      quickOverview: {
        kicker: "30-Second Overview",
        title: "30 秒看懂这个项目",
        objective: "项目目标",
        challenge: "核心难点",
        contribution: "我的主导工作",
        outcome: "最终结果"
      },
      imageKinds: {
        prototype: "实物",
        schematic: "原理图",
        waveform: "波形",
        test: "测试记录",
        software: "软件界面"
      },
      sectionNavigation: {
        ariaLabel: "项目章节导航",
        overview: "概览",
        drawings: "图纸",
        metrics: "指标",
        design: "设计",
        validation: "验证",
        outcomes: "成果"
      }
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
      currentProgress: "Completion",
      completed: "Completed",
      featuredMetric: "Key Metric",
      designMetric: "Design",
      measuredMetric: "Measured"
    },
    topShowcase: {
      heroSlides: [
        {
          id: "welcome",
          kicker: "Class of 2027 · Power Hardware",
          title: "Hongtao Lan | Power Hardware Portfolio",
          description: "Power-supply hardware portfolio covering Boost PFC, digital SiC half-bridge LLC, flyback conversion, STM32G4 control, and the full path from design to prototype validation.",
          image: "images/ed3b9c61-6574-47e7-9f1f-f1a1d9248eb8.png",
          tags: ["Power Hardware", "Converters", "Magnetics / PCB", "Closed-Loop Debug"],
          metrics: [
            { label: "LLC Efficiency", value: "94.4%" },
            { label: "PFC PF", value: "0.94" },
            { label: "Flyback Output", value: "24V / 3A" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 01",
          title: "Digital SiC Half-Bridge LLC",
          description: "400VDC to 24V / 300W with STM32G4 frequency PI control, bipolar SiC gate drive, synchronous rectification, and 94.4% full-load efficiency.",
          image: "images/llc-full-load-board.jpg",
          tags: ["SiC Half Bridge", "STM32G4", "FHA", "ZVS / SR"],
          metrics: [
            { label: "Output", value: "24V / 300W" },
            { label: "Efficiency", value: "94.4%" },
            { label: "Ripple", value: "287mVPP" }
          ]
        },
        {
          id: "flyback",
          kicker: "Featured Project 02",
          title: "72W Flyback Power Supply",
          description: "An 85-265VAC wide-input isolated 24V / 3A supply using UCC287506, TL431 plus optocoupler feedback, and a custom transformer, with about 85% full-load efficiency at 220VAC.",
          image: "images/flyback-project.jpg",
          tags: ["Flyback", "UCC287506", "24V / 3A", "TL431 Optocoupler"],
          metrics: [
            { label: "Input Range", value: "85-265VAC" },
            { label: "Output", value: "24V / 3A" },
            { label: "Efficiency", value: "About 85%" }
          ]
        },
        {
          id: "pfc",
          kicker: "Featured Project 03",
          title: "1kW CCM Boost PFC",
          description: "UCC28019ADR-based 220VAC to 400VDC PFC covering inrush control, EMI/safety design, and average-current-mode loops, with a measured PF of 0.94.",
          image: "images/pfc-boost-project.jpg",
          tags: ["UCC28019ADR", "CCM PFC", "400VDC", "Type-II Compensation"],
          metrics: [
            { label: "Input", value: "220VAC" },
            { label: "Bus", value: "400VDC" },
            { label: "PF", value: "0.94" }
          ]
        }
      ],
      gatewayKicker: "Core Results in 30 Seconds",
      heroStatus: "Current homepage showcase",
      playingStatus: "Auto playing",
      pausedStatus: "Paused",
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
      capabilityLabel: "Capability track switcher",
      projectsAction: "View Core Projects",
      resumeAction: "Download Resume",
      contactAction: "Contact Me",
      shareAction: "Open on Phone",
      shareTitle: "Scan to View the Portfolio",
      shareDescription: "Scan this QR code with a phone camera to open the current portfolio page.",
      shareUrlLabel: "Portfolio URL",
      copyLink: "Copy Link",
      copied: "Copied",
      copyFailed: "Copy Failed",
      openShareLink: "Open Link",
      closeShare: "Close QR Code",
      gatewayCards: [
        { title: "Digital SiC Half-Bridge LLC", subtitle: "300W · 94.4% full-load efficiency · ZVS / SR", image: "images/llc-full-load-board.jpg", href: "#/project/half-bridge-llc" },
        { title: "1kW CCM Boost PFC", subtitle: "400VDC · 96.9% measured efficiency · PF 0.94", image: "images/pfc-boost-project.jpg", h…9669 tokens truncated…s: [
        "Selected the MOSFET, bridge rectifier, boost diode, inductor, and high-voltage bus capacitors with loss and stress analysis.",
        "Built a Simulink closed-loop model to review device stress and loop behavior.",
        "Designed the input EMI network, relay-bypassed NTC soft start, and high-voltage PCB clearance strategy.",
        "Derived the CCM PFC small-signal behavior and designed the outer-voltage and inner-current Type-II compensation.",
        "Completed 220VAC to 400VDC closed-loop testing and recorded efficiency, PF, and input-current improvement."
      ],
      metrics: [
        { label: "Design Power", value: "1kW", kind: "design" },
        { label: "Input / Bus", value: "220VAC / 400VDC", kind: "design" },
        { label: "Measured Efficiency", value: "96.9%", kind: "measured" },
        { label: "Power Factor", value: "0.94", kind: "measured" },
        { label: "Test Load", value: "160W", kind: "measured" },
        { label: "Controller", value: "UCC28019ADR", kind: "design" }
      ],
      diagramTitle: "CCM Boost PFC Power and Control Path",
      diagramNodes: ["220VAC + EMI / Soft Start", "Bridge + Boost Stage", "400V Bus", "Voltage / Current Sensing", "UCC28019ADR Dual Loops", "PWM Drive / Protection"],
      designPoints: [
        "The outer loop regulates the 400V bus while the inner loop tracks the rectified-line envelope; bandwidth separation limits 100Hz bus-ripple interaction.",
        "The voltage-loop crossover is around 10Hz and the current-loop bandwidth is in the 5kHz-10kHz range.",
        "The relay bypasses the NTC after startup so inrush limiting does not become a continuous loss source.",
        "The page clearly separates the 1kW design target from the currently validated 160W operating point."
      ],
      progress: "The 1kW-class design, component and loop calculations, PCB prototype, and 220VAC to 400VDC closed-loop load validation are complete. At the measured 160W operating point, efficiency is 96.9% and PF is 0.94.",
      validation: [
        "Established and regulated the 400VDC bus from 220VAC.",
        "Recorded about 96.9% efficiency at the 160W load point.",
        "Recorded PF about 0.94 with improved input-current behavior.",
        "Checked NTC inrush limiting and relay-bypass sequencing.",
        "Reviewed key device stress, thermal considerations, and high-voltage clearance."
      ],
      improvements: ["Defined multi-load efficiency, PF, THD, and harmonic test records", "Documented VDS, inductor-current, and zero-crossing measurement procedures", "Created startup, step-load, and protection test coverage", "Produced a critical-component thermal design matrix", "Established isolation, probing, and protection practices for 1kW-class testing"]
    },
    "half-bridge-llc": {
      title: "Digital SiC Half-Bridge LLC",
      subtitle: "400VDC to 24V / 300W STM32G4 frequency-controlled LLC",
      summary: "A complete prototype with the power board, STM32G4 controller, auxiliary supply, PQ40 transformer, and synchronous rectification. Full-load output is 279.6W at 94.4% efficiency with 287mVPP ripple and 0.06% load regulation.",
      detailImages: [
        { src: "images/llc-full-load-board.jpg", title: "Full-Load Digital SiC LLC Prototype", description: "Complete prototype with power board, controller, auxiliary supply, PQ40 transformer, synchronous rectification, and output filtering.", kind: "prototype" },
        { src: "images/llc-full-load-output-load.jpg", title: "24V / 11.7A Output Load", description: "Electronic-load record of about 279.6W output.", kind: "test" },
        { src: "images/llc-gs-waveform.jpg", title: "SiC Gate-Source Waveform", description: "Check of UCC23513 isolation, +18V / -3V gate drive, dead time, and turn-off margin.", kind: "waveform" },
        { src: "images/llc-output-ripple.jpg", title: "Full-Load Ripple: 287mVPP", description: "Output-quality record used to review filtering, SR, sensing noise, and layout.", kind: "waveform" },
        { src: "images/llc-load-regulation.jpg", title: "Load Regulation Record", description: "Measured regulation of about 0.06%.", kind: "test" }
      ],
      tags: ["400VDC", "24V / 300W", "SiC Half Bridge", "STM32G4", "UCC23513", "FHA / Frequency PI"],
      status: "Full-load closed-loop validation complete",
      goal: "Build a reviewable 400VDC to 24V / 300W isolated digital power prototype from FHA analysis and magnetics through SiC drive, PCB layout, STM32G4 control, synchronous rectification, and full-load validation.",
      quickOverview: {
        objective: "Build a 400VDC to 24V / 300W digitally controlled SiC half-bridge LLC prototype.",
        challenge: "FHA parameters, PQ40 magnetics, bipolar SiC drive, synchronous rectification, and frequency control must be co-optimized.",
        contribution: "Designed the resonant tank, magnetics, power PCB, STM32G4 frequency PI, protection state machine, and full-load validation.",
        outcome: "Delivered 279.6W at 94.4% efficiency, 287mVPP ripple, 0.06% load regulation, ZVS, and synchronous rectification."
      },
      responsibilities: [
        "Completed the main power board, STM32G4 controller, and auxiliary supply.",
        "Designed the resonant tank and operating frequency range with FHA analysis.",
        "Designed the PQ40 transformer with a 30:4:4 turns ratio and controlled leakage inductance.",
        "Implemented UCC23513 isolated +18V / -3V bipolar SiC gate drive and constrained the high di/dt PCB loops.",
        "Implemented complementary PWM, ADC, frequency PI control, soft start, limits, protection, and fault latching on STM32G4.",
        "Collected full-load power, efficiency, gate-drive, SR, ripple, load-regulation, and ZVS evidence."
      ],
      metrics: [
        { label: "Input", value: "400VDC", kind: "design" },
        { label: "Output", value: "24V / 300W", kind: "design" },
        { label: "Full-Load Eff.", value: "94.4%", kind: "measured" },
        { label: "Ripple", value: "287mVPP", kind: "measured" },
        { label: "Load Regulation", value: "0.06%", kind: "measured" },
        { label: "Turns Ratio", value: "30:4:4", kind: "design" }
      ],
      diagramTitle: "400V Frequency-Controlled LLC Power and Control Path",
      diagramNodes: ["400VDC Bus", "SiC Half Bridge + UCC23513", "LLC Tank / PQ40 Transformer", "Synchronous Rectifier + Filter", "Feedback / STM32G4", "Frequency PI / PWM / Protection"],
      designPoints: [
        "The operating range is defined by gain, resonance, frequency limits, load variation, and the capacitive-region boundary.",
        "Transformer design considers core and window margin, insulation, leakage control, and high-current secondary copper loss.",
        "Bipolar gate drive and Kelvin-source layout reduce false turn-on and improve turn-off reliability.",
        "Validation follows a traceable chain from input power to output power, efficiency, switching waveforms, ripple, and regulation."
      ],
      progress: "The prototype completed hardware, magnetics, STM32G4 frequency control, and full-load validation: about 400V / 295.99W input, 279.6W output, 94.4% efficiency, 287mVPP ripple, 0.06% load regulation, ZVS, and secondary synchronous rectification.",
      validation: ["Input power: about 400V / 295.99W", "Output power: about 24V / 11.70A and 279.6W", "Full-load efficiency: 94.4%", "Bipolar gate drive and ZVS waveform checks", "Synchronous-rectifier timing check", "Ripple: 287mVPP; load regulation: 0.06%"],
      improvements: ["Produced 25%-100% load, ripple, SR-waveform, and thermal matrices", "Documented PI, limits, protection thresholds, and reset conditions", "Created startup, shutdown, step-load, bus-disturbance, overload, and long-run test coverage", "Consolidated transformer, LCR, and PCB review evidence"]
    },
    "flyback": {
      title: "72W Flyback Power Supply",
      subtitle: "85-265VAC wide input to isolated 24V / 3A output",
      summary: "A UCC287506DBVR flyback supply with TL431 plus optocoupler feedback and a custom 24:6:5 transformer. At 220VAC full load, efficiency is about 85%, ripple about 390mVPP, and load regulation 0.67%.",
      detailImages: [
        { src: "images/flyback-project.jpg", title: "24V / 3A Flyback Prototype", description: "Prototype showing input rectification, transformer, control and feedback, and output filtering.", kind: "prototype" },
        { src: "images/flyback-input-power.jpg", title: "Full-Load Input Power", description: "220VAC full-load input voltage, current, and active-power record.", kind: "test" },
        { src: "images/flyback-output-load.jpg", title: "Electronic Load Output Record", description: "Approximately 24V / 3A and 72W output.", kind: "test" },
        { src: "images/flyback-ripple-waveform.jpg", title: "Full-Load Output Ripple", description: "Output ripple and high-frequency spike record with bandwidth limiting and a short ground connection.", kind: "waveform" }
      ],
      tags: ["Flyback", "UCC287506", "24V / 3A", "TL431 Optocoupler", "RCD Clamp", "Wide Input"],
      status: "Full-load validation complete",
      goal: "Develop an isolated 24V / 3A auxiliary supply covering the power stage, transformer, RCD clamp, primary current sensing, secondary feedback, and full-load validation.",
      quickOverview: {
        objective: "Build an 85-265VAC wide-input isolated 24V / 3A, 72W flyback supply.",
        challenge: "Wide-input stress, custom magnetics, RCD clamping, and TL431 optocoupler compensation must be balanced.",
        contribution: "Completed topology calculations, the 24:6:5 transformer, power and feedback circuits, PCB, efficiency, and VDS validation.",
        outcome: "Delivered 24V / 3A at 220VAC with about 85% efficiency, 390mVPP ripple, and 0.67% load regulation."
      },
      responsibilities: ["Defined the offline flyback architecture for 85-265VAC and 24V / 3A", "Designed the UCC287506 power, sensing, auxiliary, and TL431 feedback circuits", "Specified the 24:6:5 transformer, 100µH primary inductance, leakage, gap, and insulation", "Designed the RCD clamp from reflected voltage and leakage energy", "Validated output regulation, efficiency, ripple, load regulation, and MOSFET VDS stress"],
      metrics: [
        { label: "Input Range", value: "85-265VAC", kind: "design" },
        { label: "Output", value: "24V / 3A", kind: "design" },
        { label: "Full-Load Eff.", value: "About 85%", kind: "measured" },
        { label: "Ripple", value: "About 390mVPP", kind: "measured" },
        { label: "Load Regulation", value: "0.67%", kind: "measured" },
        { label: "Turns Ratio", value: "24:6:5", kind: "design" }
      ],
      diagramTitle: "Wide-Input Isolated Flyback Power Path",
      diagramNodes: ["85-265VAC", "Rectifier / HV Bus", "UCC287506 + MOSFET", "24:6:5 Transformer", "Schottky Rectifier / Filter", "TL431 + Optocoupler"],
      designPoints: ["The transformer is derived from the per-cycle energy model", "MOSFET VDS includes bus, reflected voltage, and leakage spike", "The TL431 divider sets the output while compensation shapes stability and dynamics", "Completed 220VAC full-load evidence is presented together with wide-input, EMI, and safety design coverage"],
      progress: "The schematic, transformer specification, PCB prototype, full-load output, efficiency, ripple, and MOSFET-stress tests are complete for the 220VAC operating point.",
      validation: ["Full-load operation at 220VAC and 24V / 3A", "Efficiency about 85%", "Ripple about 390mVPP", "Load regulation 0.67%", "VDS waveform review of the RCD clamp", "Completed 85-265VAC range design review with 220VAC full-load evidence"],
      improvements: ["Produced an 85/110/220/265VAC efficiency, ripple, VDS, VDD, and thermal matrix", "Documented high-line VDS, RCD, rectifier, and transformer checks", "Created transient, protection, and long-run test coverage", "Consolidated fuse, NTC, MOV, EMI, safety, and clearance records"]
    },
    "stm32-digital-power-host": {
      title: "STM32G4 LLC Real-Time Telemetry Dashboard",
      subtitle: "Web Serial / 921600 8N1 / read-only telemetry",
      summary: "A local Web Serial dashboard that receives LLC operating data from STM32G4, displays Vin, Vout, Iout, Fsw, PI and PWM/fault state, and exports charts, CSV, and raw logs.",
      detailImages: [
        { src: "images/stm32g4-llc-host-dashboard.png", title: "STM32G4 LLC Telemetry Dashboard", description: "Interface with voltage, current, switching frequency, PI output, PWM/fault state, link statistics, and real-time charts.", kind: "software" }
      ],
      tags: ["Web Serial", "STM32G4", "921600 8N1", "Chart.js", "CSV", "Read Only"],
      status: "Complete and in active debug use",
      goal: "Provide read-only telemetry so control variables, output state, and link health can be reviewed without granting the browser direct authority over the power stage.",
      quickOverview: {
        objective: "Provide a real-time, read-only, exportable browser telemetry interface for the STM32G4 LLC controller.",
        challenge: "Reliable framing, invalid data, high-rate receive, and lower-rate UI updates must coexist at 921600 baud.",
        contribution: "Implemented the serial protocol, buffering, parsing, link statistics, charts, CSV export, and raw logs.",
        outcome: "The tool is in active prototype debug use and preserves complete test sessions without controlling the power stage."
      },
      responsibilities: ["Defined the isolated STM32G4 USART to CH340 to Web Serial path", "Implemented framed CSV parsing and link statistics", "Built status cards, charts, pause/clear controls, CSV export, and raw-log storage", "Kept the browser side read-only to preserve the safety boundary"],
      metrics: [
        { label: "Serial", value: "921600 8N1", kind: "design" },
        { label: "Protocol", value: "LLC CSV", kind: "design" },
        { label: "UI Refresh", value: "10Hz", kind: "measured" },
        { label: "Chart Window", value: "3000 points", kind: "design" },
        { label: "Buffer", value: "100000 rows", kind: "design" },
        { label: "Safety", value: "Read Only", kind: "design" }
      ],
      diagramTitle: "LLC Telemetry Data Path",
      diagramNodes: ["STM32G4 Variables", "USART1_TX CSV", "Isolated CH340", "Web Serial Parser", "Cards / Charts", "CSV / Raw Log"],
      designPoints: ["Read-only telemetry decouples visualization from control authority", "Invalid frames never enter charts or exports", "Continuous receive is decoupled from 10Hz UI refresh", "Structured CSV and raw logs support different review tasks"],
      progress: "The functional prototype includes parsing, status cards, real-time charts, link statistics, CSV export, and raw-log storage.",
      validation: ["Valid and invalid frame tests", "Split and multi-frame buffering", "Chrome / Edge localhost requirement", "Isolated USB-TTL requirement", "Pause freezes display but not background receive"],
      improvements: ["Produced firmware-transmit and host-receive rate comparisons", "Added exportable session and test metadata", "Defined gated, range-limited, confirmed, and read-back-verified write extensions", "Captured long-run real-serial and CSV review examples"]
    },
    "personal-portfolio-site": {
      title: "Personal Portfolio Website",
      subtitle: "Bilingual, data-driven portfolio for power-hardware roles",
      summary: "A React, TypeScript, Vite, and Tailwind CSS portfolio with responsive project details, full-resolution image viewing, WebP previews, offline caching, SEO, and automatic GitHub Pages deployment.",
      detailImages: [
        { src: "images/portfolio-site-projects-overview.png", title: "Personal Project Collection", description: "Responsive project grid for PFC, LLC, flyback, STM32G4 telemetry, and the portfolio itself.", kind: "software" },
        { src: "images/portfolio-site-project-card.png", title: "Data-Driven Project Card", description: "Titles, summaries, status, tags, and key metrics are generated from the shared project model.", kind: "software" },
        { src: "images/portfolio-site-project-detail.png", title: "Reusable Project Detail Page", description: "Shared detail structure for responsibilities, metrics, system design, decisions, completion status, validation, and engineering assets.", kind: "software" }
      ],
      tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GitHub Pages", "SEO / PWA"],
      status: "Complete and live",
      goal: "Give recruiters a direct path to identify the target role, inspect engineering evidence, download the resume, and make contact on phones, tablets, and desktops.",
      quickOverview: {
        objective: "Build a bilingual online portfolio for power-hardware engineering roles.",
        challenge: "Recruiter readability, high-resolution engineering images, mobile UX, SEO, and static GitHub Pages delivery must all work together.",
        contribution: "Designed the information architecture, data model, React components, hash routing, image pipeline, offline cache, and CI deployment.",
        outcome: "The live site presents 10 projects in two languages with responsive evidence viewing and automated quality checks."
      },
      responsibilities: ["Designed the recruiter-oriented information architecture", "Created a shared bilingual project data model", "Implemented reusable React components and hash routing", "Built an accessible responsive image viewer", "Generated WebP previews while preserving original images", "Unified source, CI build, and GitHub Pages deployment"],
      metrics: [
        { label: "Projects", value: "10", kind: "measured" },
        { label: "Languages", value: "ZH / EN", kind: "design" },
        { label: "Frontend", value: "React 19", kind: "design" },
        { label: "Routing", value: "Hash + Lazy", kind: "design" },
        { label: "Deployment", value: "GitHub Pages", kind: "measured" },
        { label: "Images", value: "WebP + Original", kind: "design" }
      ],
      diagramTitle: "Portfolio Content, UI, and Delivery Path",
      diagramNodes: ["Project Data + Bilingual Copy", "Reusable React Components", "Hash Routes + Lazy Loading", "CI Build + GitHub Pages"],
      designPoints: ["The flow moves from role identification to project comparison, evidence review, and contact", "Project content is decoupled from page structure", "Lists use WebP previews and load originals only in the viewer", "One CI build now produces the deployed site", "Keyboard, ARIA, focus, and reduced-motion behavior are included"],
      progress: "The site now uses the real resume and contact information, source-controlled current project data, responsive original-image viewing, optimized previews, SEO, offline caching, and automatic deployment.",
      validation: ["TypeScript, ESLint, and production build checks", "Hash-route smoke tests", "Chinese/English and external-link checks", "Phone, tablet, and desktop viewer tests", "WebP preview and original-image checks"],
      improvements: ["Supports continued addition of measured curves, reports, and public evidence", "Provides extension points for project repositories and external results", "Includes a ready path for privacy-friendly analytics when required"],
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

