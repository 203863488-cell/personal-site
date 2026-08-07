import type { PortfolioMetric, PortfolioProject } from "../types/portfolio";

export type Language = "zh" | "en";

type LocalizedProjectFields = Omit<PortfolioProject, "id" | "category" | "image">;

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  href: string;
  actionLabel: string;
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
      description: "蓝宏涛的电源硬件研发求职作品集，展示 2026 电赛省级二等奖 AC-AC 系统、CCM Boost PFC、数控 SiC 半桥 LLC、反激电源和 STM32G4 控制。"
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
          href: "#/personal",
          actionLabel: "查看核心项目",
          tags: ["电源硬件研发", "功率变换器", "磁件 / PCB", "闭环调试"],
          metrics: [
            { label: "LLC 满载效率", value: "94.4%" },
            { label: "PFC 功率因数", value: "0.94" },
            { label: "反激输出", value: "24V / 3A" }
          ]
        },
        {
          id: "contest-2026",
          kicker: "2026 全国大学生电子设计竞赛 · 省级二等奖",
          title: "2026电赛电源题",
          description: "担任队长并主导总体架构与全部硬件，采用四开关图腾柱无桥 PFC、直流母线和三相全桥构成 AC-AC 变换系统，团队软件使用 SVPWM 生成三相对称输出。",
          image: "images/contest-2026-three-phase-waveform.jpg",
          href: "#/project/2026-contest-ac-ac",
          actionLabel: "查看项目详情",
          tags: ["图腾柱无桥 PFC", "三相全桥", "SVPWM", "AC-AC"],
          metrics: [
            { label: "获奖", value: "省级二等奖" },
            { label: "PFC", value: "四开关图腾柱" },
            { label: "逆变", value: "三相全桥 / SVPWM" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 01",
          title: "数控 SiC 半桥 LLC",
          description: "400VDC 输入、24V / 300W 输出，基于 STM32G4 调频 PI、SiC 双极性栅极驱动和副边同步整流，满载效率 94.4%。",
          image: "images/llc-full-load-board.jpg",
          href: "#/project/half-bridge-llc",
          actionLabel: "查看项目详情",
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
          href: "#/project/flyback",
          actionLabel: "查看项目详情",
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
          href: "#/project/totem-pole-pfc",
          actionLabel: "查看项目详情",
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
        { title: "2026电赛电源题", subtitle: "图腾柱无桥 PFC · 三相全桥 SVPWM · 省级二等奖", image: "images/contest-2026-three-phase-waveform.jpg", href: "#/project/2026-contest-ac-ac" },
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
          description: "展示获得省级二等奖的图腾柱 PFC + 三相全桥 AC-AC 系统，以及隔离采样、辅助供电、STM32G4 控制板和功率板。",
          href: "#/competition",
          image: "images/contest-2026-system-waveform-bench.jpg",
          tags: ["省级二等奖", "图腾柱 PFC", "三相全桥", "模块化硬件"],
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
        description: "以获得省级二等奖的 2026 AC-AC 变换系统为核心，展示图腾柱无桥 PFC、三相全桥以及可复用的隔离采样、辅助供电、STM32G4 控制和功率模块。",
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
      description: "Power hardware portfolio covering a 2026 contest Provincial Second Prize AC-AC system, CCM Boost PFC, digital SiC half-bridge LLC, flyback conversion, and STM32G4 control."
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
          href: "#/personal",
          actionLabel: "View Core Projects",
          tags: ["Power Hardware", "Converters", "Magnetics / PCB", "Closed-Loop Debug"],
          metrics: [
            { label: "LLC Efficiency", value: "94.4%" },
            { label: "PFC PF", value: "0.94" },
            { label: "Flyback Output", value: "24V / 3A" }
          ]
        },
        {
          id: "contest-2026",
          kicker: "2026 National Undergraduate Electronics Design Contest · Provincial Second Prize",
          title: "2026 Contest Power Electronics Project",
          description: "As team captain, I led the system architecture, staffing, and all hardware work for an AC-AC converter using a four-switch totem-pole bridgeless PFC, DC link, and three-phase full bridge. Teammates implemented the SVPWM software.",
          image: "images/contest-2026-three-phase-waveform.jpg",
          href: "#/project/2026-contest-ac-ac",
          actionLabel: "View Project Details",
          tags: ["Totem-Pole PFC", "Three-Phase Bridge", "SVPWM", "AC-AC"],
          metrics: [
            { label: "Award", value: "Provincial 2nd Prize" },
            { label: "PFC", value: "Four-Switch Totem Pole" },
            { label: "Inverter", value: "3-Phase Bridge / SVPWM" }
          ]
        },
        {
          id: "llc",
          kicker: "Featured Project 01",
          title: "Digital SiC Half-Bridge LLC",
          description: "400VDC to 24V / 300W with STM32G4 frequency PI control, bipolar SiC gate drive, synchronous rectification, and 94.4% full-load efficiency.",
          image: "images/llc-full-load-board.jpg",
          href: "#/project/half-bridge-llc",
          actionLabel: "View Project Details",
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
          href: "#/project/flyback",
          actionLabel: "View Project Details",
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
          href: "#/project/totem-pole-pfc",
          actionLabel: "View Project Details",
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
        { title: "2026 Contest Power Electronics Project", subtitle: "Totem-pole PFC · Three-phase SVPWM bridge · Provincial Second Prize", image: "images/contest-2026-three-phase-waveform.jpg", href: "#/project/2026-contest-ac-ac" },
        { title: "Digital SiC Half-Bridge LLC", subtitle: "300W · 94.4% full-load efficiency · ZVS / SR", image: "images/llc-full-load-board.jpg", href: "#/project/half-bridge-llc" },
        { title: "1kW CCM Boost PFC", subtitle: "400VDC · 96.9% measured efficiency · PF 0.94", image: "images/pfc-boost-project.jpg", href: "#/project/totem-pole-pfc" },
        { title: "72W Flyback Power Supply", subtitle: "24V / 3A · About 85% full-load efficiency · 0.67% load regulation", image: "images/flyback-project.jpg", href: "#/project/flyback" }
      ],
      capabilityTracks: [
        {
          title: "Competition Modules",
          subtitle: "Sensing, auxiliary power, control, and power boards",
          tiles: [
            { title: "Isolated Sensing Board", image: "images/isolated-sampling-board.png" },
            { title: "Isolated Auxiliary Power Board", image: "images/auxiliary-power-module.png" },
            { title: "100V Half-Bridge / Full-Bridge Power Board", image: "images/four-mos-power-board.png" }
          ]
        },
        {
          title: "Completed Projects",
          subtitle: "Prototype and measurement evidence for PFC, LLC, and flyback converters",
          tiles: [
            { title: "Digital SiC Half-Bridge LLC", image: "images/llc-full-load-board.jpg" },
            { title: "1kW CCM Boost PFC", image: "images/pfc-boost-project.jpg" },
            { title: "72W Flyback Supply", image: "images/flyback-project.jpg" }
          ]
        },
        {
          title: "End-to-End Engineering Chain",
          subtitle: "Calculation → Magnetics → PCB → STM32G4 → Closed Loop → Test Records",
          tiles: [
            { title: "Calculation", image: "images/capability-calculation.jpg" },
            { title: "Magnetics", image: "images/capability-magnetics.jpg" },
            { title: "PCB Implementation", image: "images/capability-pcb-layout.jpg" },
            { title: "STM32G4 Control", image: "images/capability-stm32g4-control.jpg" },
            { title: "Closed-Loop Debug", image: "images/capability-closed-loop-debug.jpg" },
            { title: "Test Records", image: "images/capability-test-record.jpg" }
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
      entranceDescription: "Competition work highlights modular hardware and teamwork; personal projects focus on PFC, LLC, and flyback power supplies.",
      entries: [
        {
          title: "Competition Project System",
          subtitle: "Competition System",
          description: "A Provincial Second Prize totem-pole PFC plus three-phase AC-AC system, together with reusable isolated sensing, auxiliary power, STM32G4 control, and power modules.",
          href: "#/competition",
          image: "images/contest-2026-system-waveform-bench.jpg",
          tags: ["Provincial Second Prize", "Totem-Pole PFC", "Three-Phase Bridge", "Modular Hardware"],
          accent: "blue"
        },
        {
          title: "Personal Projects",
          subtitle: "Personal Projects",
          description: "Core work including Boost PFC, digital SiC LLC, and a 72W flyback supply.",
          href: "#/personal",
          image: "images/llc-full-load-board.jpg",
          tags: ["PFC", "LLC", "Flyback"],
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
        description: "Centered on the Provincial Second Prize 2026 AC-AC converter, this collection covers the totem-pole bridgeless PFC, three-phase full bridge, and reusable isolated sensing, auxiliary power, STM32G4 control, and power modules.",
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
      imagesTitle: "Project Evidence and Schematics",
      openImage: "View Full-Resolution Image",
      responsibilities: "My Role",
      metrics: "Technical Metrics",
      keyComponents: "Key Components and Parameters",
      operatingPrinciples: "Equations and Operating Logic",
      engineeringHighlights: "Engineering Implementation and Reliability",
      systemDiagram: "System Diagram",
      diagramPlaceholder: "System functional path",
      designPoints: "Key Design Points",
      progress: "Completion Status",
      validation: "Testing and Validation",
      improvements: "Engineering Assets and Extension Capability",
      shareProject: "Share Project by QR",
      copyProjectLink: "Copy Project Link",
      copiedProjectLink: "Project Link Copied",
      previousProject: "Previous Project",
      nextProject: "Next Project",
      projectNavigation: "Project Navigation",
      quickOverview: {
        kicker: "30-Second Overview",
        title: "Understand This Project in 30 Seconds",
        objective: "Objective",
        challenge: "Core Challenge",
        contribution: "My Contribution",
        outcome: "Measured Outcome"
      },
      imageKinds: {
        prototype: "Prototype",
        schematic: "Schematic",
        waveform: "Waveform",
        test: "Test Record",
        software: "Software UI"
      },
      sectionNavigation: {
        ariaLabel: "Project section navigation",
        overview: "Overview",
        drawings: "Evidence",
        metrics: "Metrics",
        design: "Design",
        validation: "Validation",
        outcomes: "Assets"
      }
    },
    footer: {
      left: "Hongtao Lan · Class of 2027 Power Hardware Portfolio",
      right: "203863488@qq.com · GitHub: 203863488-cell"
    }
  }
};

const projectTranslations: Record<"en", Record<string, LocalizedProjectFields>> = {
  en: {
    "2026-contest-ac-ac": {
      title: "2026 Contest Power Electronics Project",
      subtitle: "Totem-pole bridgeless PFC and three-phase full-bridge SVPWM AC-AC converter",
      summary: "A 2026 National Undergraduate Electronics Design Contest AC-AC converter. The contest input is 36V / 50Hz single-phase AC; a four-switch totem-pole bridgeless PFC establishes the DC link, followed by a three-phase full bridge driven by team-developed SVPWM software. The project received a Provincial Second Prize.",
      detailImages: [
        {
          src: "images/contest-2026-system-bench.jpg",
          title: "Complete AC-AC System Wiring and Lab Bench",
          description: "The full setup includes the totem-pole bridgeless PFC, three-phase bridge, control and sensing modules, filter network, protection wiring, and test instruments for staged bring-up and integration.",
          kind: "prototype"
        },
        {
          src: "images/contest-2026-system-waveform-bench.jpg",
          title: "Power Boards, Controller, and Three-Phase Waveform Debug",
          description: "The controller, PFC, and inverter boards operate together while the oscilloscope monitors the three-phase symmetric output.",
          kind: "prototype"
        },
        {
          src: "images/contest-2026-pfc-power-meter.jpg",
          title: "Low-Voltage Single-Phase Input Power Record",
          description: "The power analyzer shows 33.319Vrms, 3.9074Arms, 128.73W, and PF 0.989. These values are reported only for the photographed debug condition.",
          kind: "test"
        },
        {
          src: "images/contest-2026-mains-test-setup.jpg",
          title: "Mains Regulation, Isolation, and Breaker Protection",
          description: "The mains supply passes through a variac, isolation transformer, and breaker protection before becoming the low-voltage single-phase AC input required by the contest task.",
          kind: "test"
        },
        {
          src: "images/contest-2026-three-phase-waveform.jpg",
          title: "Three-Phase Symmetric AC Output Waveform",
          description: "The oscilloscope records an approximately 49.98Hz three-phase symmetric waveform as integration evidence; it is not presented as a substitute for the specified 30Hz / 60Hz acceptance points.",
          kind: "waveform"
        }
      ],
      tags: ["Totem-Pole PFC", "Three-Phase Full Bridge", "SVPWM", "AC-AC", "Provincial Second Prize"],
      status: "Completed | 2026 National Undergraduate Electronics Design Contest Provincial Second Prize",
      goal: "Build a single-phase low-voltage AC to three-phase symmetric AC converter with explicit power, sensing, drive, and protection interfaces between the totem-pole bridgeless PFC, DC link, and three-phase bridge, then deliver an integrated system within the contest schedule through modular hardware and team coordination.",
      quickOverview: {
        objective: "Convert the 36V / 50Hz single-phase contest input into a three-phase symmetric AC output.",
        challenge: "The totem-pole PFC, three-phase bridge, isolated drives, sensing, protection, and SVPWM interface all had to be completed and integrated within a short contest schedule.",
        contribution: "Served as team captain, led the architecture, technical direction, staffing, and integration schedule, and independently owned all hardware. Teammates implemented SVPWM and the control software.",
        outcome: "Completed full-system integration with photographed PF 0.989 and three-phase waveform evidence; the project received a Provincial Second Prize."
      },
      responsibilities: [
        "Served as team captain and defined the overall architecture across the totem-pole bridgeless PFC, DC link, three-phase full bridge, and control system.",
        "Assigned team roles, decomposed tasks, defined module interfaces and bring-up order, and coordinated hardware-software integration.",
        "Independently completed all hardware work, including the four-switch totem-pole PFC, three-phase bridge, isolated drives, sensing, protection, DC link, filtering, wiring, and hardware debugging.",
        "Planned the variac, isolation, breaker-protection, and low-voltage current-limited bring-up path, progressing through auxiliary power, drives, sensing, individual legs, PFC, and three-phase inversion.",
        "Organized power-analyzer and oscilloscope tests to review input PF, phase sequence, symmetry, frequency, and overall system state.",
        "SVPWM and control software were implemented by teammates. My responsibility was hardware interfaces, power-stage constraints, and integration; I did not implement the software."
      ],
      metrics: [
        { label: "Contest Result", value: "Provincial 2nd Prize", kind: "measured" },
        { label: "Photographed PF", value: "0.989", kind: "measured" },
        { label: "Input Target", value: "36V / 50Hz", kind: "design" },
        { label: "Base Output Target", value: "32V / 60Hz / 2A", kind: "design" },
        { label: "Output THD Target", value: "≤2%", kind: "design" },
        { label: "Regulation Target", value: "≤0.3%", kind: "design" }
      ],
      keyComponents: [
        { label: "Input Safety Boundary", value: "Variac + Isolation + Breaker", note: "The mains supply is regulated and isolated before producing the contest low-voltage AC input." },
        { label: "PFC Power Stage", value: "Four-Switch Totem Pole", note: "Two half bridges perform half-cycle commutation, current shaping, and DC-link energy transfer." },
        { label: "DC Link", value: "Storage + Sensing + Protection", note: "Decouples the PFC and inverter while supporting ripple energy storage and overvoltage monitoring." },
        { label: "Inverter Power Stage", value: "Three-Phase Full Bridge", note: "Three legs generate PWM voltages that are filtered before driving the three-phase resistive load." },
        { label: "Modulation", value: "SVPWM", note: "Implemented by teammates; the hardware provides six drive channels, sensing, protection, and interface constraints." },
        { label: "Test Instruments", value: "Power Analyzer + Oscilloscope", note: "Used to record input PF and the three-phase output waveform." }
      ],
      operatingPrinciples: [
        "A variac, isolation transformer, and breaker protection convert the mains source into the specified 36V / 50Hz single-phase low-voltage AC input with a controlled safety boundary.",
        "The four-switch totem-pole bridgeless PFC assigns high-frequency current modulation and line-frequency commutation to different devices in each half cycle so input current follows input voltage while energy is transferred to the DC link.",
        "The DC link decouples the front and rear stages; bus voltage, current, and fault signals are passed to the control system through sensing and protection paths.",
        "Three bridge legs form the inverter. Team-developed SVPWM software determines the six switch states, while the hardware drive stage provides isolation, level shifting, dead-time operating conditions, and reliable device switching.",
        "The three PWM phase voltages are filtered into symmetric AC outputs separated by 120° before being applied to the three-phase resistive load."
      ],
      engineeringHighlights: [
        "The four-switch totem-pole bridgeless PFC removes the conventional input bridge conduction path and combines PF correction with DC-link generation.",
        "PFC, DC link, three-phase bridge, gate drives, sensing, and control interfaces are modularized for fast replacement, staged isolation, and parallel contest development.",
        "As captain, I unified the hardware-software boundary by defining six PWM signals, sensing polarity and scaling, fault polarity, latching behavior, and safe startup states.",
        "Bring-up progressed from isolated low voltage and individual modules to single-leg operation and finally integrated PFC plus three-phase inversion, limiting the scope of faults.",
        "Power-analyzer and oscilloscope records preserve evidence at both the input and output of the complete AC-AC power path."
      ],
      diagramTitle: "Totem-Pole PFC and Three-Phase Inverter AC-AC Chain",
      diagramNodes: ["Mains Regulation / Isolation", "36V / 50Hz Single-Phase Input", "Four-Switch Totem-Pole Bridgeless PFC", "DC Link", "Three-Phase Full Bridge", "SVPWM + Output Filter", "Three-Phase Resistive Load"],
      designPoints: [
        "The base contest condition is a 36V / 50Hz single-phase input and a three-phase 32V±0.1V line voltage, 60Hz±0.2Hz frequency, and 2A line current; a 32V / 30Hz / 2A operating point is also specified.",
        "PF≥0.98, efficiency≥95%, output line-voltage THD≤2%, and load/input regulation≤0.3% are presented as contest design targets, not as fully measured achievements without supporting records.",
        "The four totem-pole switches must coordinate high-frequency modulation, line-frequency commutation, dead time, and zero-crossing behavior with consistent drive, sensing direction, and protection logic.",
        "The three-phase bridge uses interlocked default-off drive channels. The hardware allows the software to combine active and zero SVPWM vectors while preventing shoot-through within each leg.",
        "High-di/dt power loops, gate-drive loops, analog sensing, and digital control are physically separated, with test points retained for the DC link, bridge legs, sensing, and faults."
      ],
      progress: "The system architecture, all hardware, modular wiring, staged bring-up, and full integration are complete. Teammates completed the SVPWM control software and integrated it with the hardware. Photographed records show PF 0.989 and an approximately 49.98Hz three-phase symmetric waveform, and the project received a Provincial Second Prize.",
      validation: [
        "System evidence: completed integrated operation of the PFC, three-phase bridge, controller, sensing, drive, filtering, and protection modules.",
        "Input record: the photographed power analyzer shows 33.319Vrms, 3.9074Arms, 128.73W, and PF 0.989.",
        "Output record: the oscilloscope shows three symmetric phase waveforms with sequential phase displacement and an approximately 49.98Hz frequency.",
        "Safety path: a variac, isolation transformer, and breaker protection establish the low-voltage input, with current-limited and staged bring-up.",
        "Evidence boundary: efficiency, THD, load regulation, and input regulation remain contest design targets because the supplied photos do not independently document all acceptance points."
      ],
      improvements: [
        "Delivered the architecture, hardware, and team coordination as captain; the project received a 2026 National Undergraduate Electronics Design Contest Provincial Second Prize.",
        "Produced a reusable totem-pole bridgeless PFC, DC-link, and three-phase bridge hardware chain for future motor-drive, inverter, and AC-AC experiments.",
        "Established a contest-ready debug sequence covering mains isolation, staged power-up, leg checks, protection confirmation, PFC measurement, and three-phase waveform review.",
        "Formal 30Hz / 60Hz, 2A load, efficiency, THD, and regulation tables can be added later without changing the current evidence-tiered wording."
      ]
    },
    "isolated-sampling-board": {
      title: "AC/DC Voltage and Current Isolated Sensing Board",
      subtitle: "Dual-channel isolated sensing front end based on AMC1301",
      summary: "An isolated AC/DC voltage and current sensing board for power-electronics competition topics. The voltage channel scales the P-to-GND bus voltage into the AMC1301 input range, while the current channel converts P-to-N current into a millivolt-level drop through a 20mΩ shunt before isolation, biasing, and 3.3V ADC conditioning.",
      detailImages: [
        {
          src: "images/isolated-sampling-board.png",
          title: "Isolated Sensing PCB",
          description: "The PCB labels P/N/GND inputs, the 20mΩ shunt, 85V peak voltage, 4A peak current, ADC conversion formulas, and key test points for fast wiring and debugging.",
          kind: "prototype"
        },
        {
          src: "images/isolated-sampling-schematic-main.png",
          title: "Voltage / Current Isolated Sensing Schematic",
          description: "The left side is the voltage sensing chain, and the right side is the 20mΩ shunt current sensing chain. Both channels use AMC1301 isolation followed by TLV9062 biasing and ADC conditioning around 1.65V.",
          kind: "schematic"
        },
        {
          src: "images/isolated-sampling-schematic-power.png",
          title: "Isolated Power and 3.3V Reference",
          description: "This part covers 5V input protection, 3.3V regulation, B0505S isolated supplies, ISO_5V_1 / ISO_5V_2 decoupling, and the bias/reference support circuitry.",
          kind: "schematic"
        }
      ],
      tags: ["AMC1301", "TLV9062", "20mΩ Shunt", "Isolated Power"],
      status: "Design, PCB, and calibration complete",
      goal: "Build a reusable isolated sensing module with clear boundaries between the power stage, sensing board, and control board: the high-voltage side handles voltage/current input, the isolation stage handles safety and scaling, and the control side reads 1.65V-biased ADC signals directly.",
      quickOverview: {
        objective: "Build a bidirectional isolated voltage and current sensing front end for competition power stages.",
        challenge: "Bidirectional span, isolated power, midpoint bias, ADC resolution, and switching common-mode noise must all be controlled.",
        contribution: "Designed the divider and shunt, AMC1301 isolation, TLV9062 conditioning, power domains, PCB, and calibration flow.",
        outcome: "Validated 0-85V and 0-4A operation with approximately ±103V / ±5A span headroom and switching-noise checks."
      },
      responsibilities: ["Chose the voltage divider ratio, shunt value, and ADC output range from the 85V peak voltage and 4A peak current targets", "Designed the voltage sensing chain and 20mΩ shunt current sensing chain so high-voltage/current signals become low-voltage differential inputs suitable for AMC1301", "Used AMC1301 for isolated amplification and TLV9062 to create a 1.65V-centered ADC signal that fits the 0-3.3V ADC range", "Planned 5V, 3.3V, ISO_5V_1, and ISO_5V_2 power domains with B0505S isolated supplies to avoid direct coupling between the power ground and control ground", "Marked conversion formulas, P/N/GND connector directions, 5V input, test points, and isolated supply nodes on the PCB for fast wiring and troubleshooting"],
      metrics: [
        { label: "Design Target", value: "85V / 4A", kind: "design" },
        { label: "Calibrated Range", value: "±103V / ±5A", kind: "measured" },
        { label: "ADC Interface", value: "3.3V / 12-bit", kind: "design" }
      ],
      keyComponents: [
        { label: "Isolation Amplifiers", value: "AMC1301DWVR ×2", note: "Separate voltage and current isolation channels." },
        { label: "Output Amplifier", value: "TLV9062IDR", note: "Differential-to-single-ended conversion with a 1.65V midpoint bias." },
        { label: "Current Shunt", value: "20mΩ", note: "About 0.5W at 5A; requires at least a 1W-class part or equivalent thermal margin." },
        { label: "Input Filter", value: "39Ω + 39Ω + 10nF", note: "Suppresses switching spikes at the current-channel isolation input." },
        { label: "Isolated Supplies", value: "B0505S-1WR3 ×2", note: "Independent ISO_5V rails for the two AMC1301 power-side domains." },
        { label: "Control-Side Supply", value: "AZ1117D-3.3", note: "Used with 10µH, 10µF, and 100nF filtering and decoupling." },
        { label: "ADC Protection", value: "PESD3V3S1BA-N", note: "Provides plug-in, miswiring, and transient-spike protection." },
        { label: "5V Input Protection", value: "SMBJ5.0CA", note: "Input-side transient clamp." }
      ],
      operatingPrinciples: [
        "Bidirectional mapping: the ADC output is about 1.65V at zero input, above 1.65V for the positive direction, and below 1.65V for the negative direction. Firmware should measure the zero point at startup rather than permanently hard-code 1.65V.",
        "Voltage conversion: V(P→GND) = 62.60 × (VADC_V - Voffset). The 0-3.3V ADC mapping provides a bidirectional range of about ±103.3V.",
        "Current conversion: I(P→N) = 3.049 × (VADC_I - Ioffset). The 20mΩ shunt produces 100mV at 5A, giving a bidirectional range of about ±5.03A.",
        "A 12-bit ADC with a 3.3V reference has about 0.806mV/LSB, corresponding to ideal quantization steps of about 50.4mV/LSB and 2.46mA/LSB. Noise, offset, and sampling timing reduce the effective resolution.",
        "Protection and closed-loop code should operate on converted physical values with moving-average or first-order filtering. ADC sampling should be synchronized to PWM updates and placed away from switching edges."
      ],
      engineeringHighlights: [
        "The 85V/4A operating range is supported with approximately ±103V/±5A of bidirectional signal-chain headroom.",
        "The 20mΩ shunt is designed for about 0.5W dissipation at 5A with package, copper-area, and thermal margin.",
        "OVP/OCP thresholds are coordinated with calibrated range, measured noise, and system margin.",
        "Differential filtering, isolated-supply decoupling, controlled return paths, and synchronized sampling suppress power-stage common-mode transients.",
        "AGND, GND, ISO_5V_1_GND, and ISO_5V_2_GND remain clearly separated through the schematic, PCB, and labeled test points."
      ],
      diagramTitle: "Sensing Chain Block Diagram",
      diagramNodes: ["P/N/GND Input", "Divider / 20mΩ Shunt", "AMC1301 Isolation", "TLV9062 + 3.3V ADC"],
      designPoints: ["The signal chain was derived backward from the measurement targets: 85V peak voltage and 4A peak current define the required ADC swing, which then determines the divider ratio, 20mΩ shunt value, AMC1301 input range, and TLV9062 output bias margin.", "The voltage channel follows a high-impedance divider, isolated amplification, and biased conditioning structure. P-to-GND voltage is scaled before AMC1301 isolation, then TLV9062 centers the ADC signal around 1.65V, with V(P->GND) ≈ 62.60 × (VADC_V - 1.65).", "The current channel uses low-resistance P-N shunt sensing. A 20mΩ shunt produces about 80mV at 4A peak, then the signal passes through 39Ω input resistors, differential filtering, AMC1301 isolation, and op-amp conditioning, with I(P->N) ≈ 3.049 × (VADC_I - 1.65).", "The isolation boundary is deliberately defined as power-side measurement and control-side acquisition. Separate AMC1301 channels and isolated ISO_5V supplies prevent high-voltage ground noise and switching spikes from directly coupling into the MCU sampling ground.", "The debug path was designed into the schematic: TP, 5V, 3.3V, ISO_5V, ADC_V, and ADC_I nodes allow bring-up to proceed by supply, bias, zero point, gain ratio, and dynamic-noise verification."],
      progress: "Schematic, PCB, assembly, board markings, and calibration are complete. Connector direction, conversion equations, power domains, isolation boundaries, and test points are explicit, and the 0-85V voltage and 0-4A current channels are ready for control-system integration.",
      validation: ["Verified 5V, 3.3V, ISO_5V_1, ISO_5V_2, and all ground-domain boundaries.", "Completed zero-point and 1.65V midpoint calibration for ADC_V and ADC_I.", "Verified both conversion coefficients using known DC voltage and load current.", "Checked the full signal chain at the divider/shunt input, AMC1301 output, TLV9062 output, and ADC input.", "Verified ADC ripple, filtering, decoupling, return paths, and synchronized sampling under power-stage switching."],
      improvements: ["Produced 0-85V and 0-4A calibration tables with fitted coefficients, zero offsets, error, and repeatability records.", "Captured reproducible oscilloscope evidence for low-voltage, staged high-voltage, and PWM switching conditions.", "Optimized the input RC, op-amp output filter, and 10nF/100nF/10µF decoupling network from measured behavior.", "Created a competition-ready wiring, power-up, signal-isolation, and ADC-calibration checklist."]
    },
    "auxiliary-power-module": {
      title: "Isolated Auxiliary Power Board",
      subtitle: "Dual COT buck stages with isolated 15V and 5V rails",
      summary: "An isolated auxiliary supply for a low-voltage competition power platform. An MSB40M bridge and 440µF bus feed two SY8502FCC COT buck stages that convert the 18V-80V design input into 15V_1 and 15V_2, followed by isolated DC/DC modules that provide ISO_15V and ISO_5V for gate drivers, sensing, and control.",
      detailImages: [
        {
          src: "images/auxiliary-power-module.png",
          title: "Isolated Auxiliary Power PCB",
          description: "The board separates the rectifier and bus, dual buck stages, isolated DC/DC modules, and output connectors, with silkscreen identifying the 80V peak input target and isolated 15V / 5V outputs.",
          kind: "prototype"
        },
        {
          src: "images/auxiliary-power-schematic-buck.png",
          title: "Rectifier and Dual COT Buck Schematic",
          description: "The MSB40M bridge and 220µF + 220µF capacitors create V_BUS. Two SY8502FCC stages with 68µH inductors and 115kΩ / 10kΩ feedback networks generate 15V_1 and 15V_2.",
          kind: "schematic"
        },
        {
          src: "images/auxiliary-power-schematic-isolation.png",
          title: "Isolated 15V and 5V Output Schematic",
          description: "The two 15V rails feed isolated DC/DC modules. The output side includes 100µF + 100nF filtering, TVS protection, and multiple two-pin connectors for driver, sensing, and control distribution.",
          kind: "schematic"
        }
      ],
      tags: ["MSB40M", "SY8502FCC ×2", "COT Buck", "ISO_15V / ISO_5V"],
      status: "Design, PCB, and load validation complete",
      goal: "Build a reusable auxiliary power tree with explicit power domains: convert a wide low-voltage input into two non-isolated 15V rails and then isolated 15V and 5V rails, reducing coupling between pulsed gate-driver loads and low-noise sensing/control loads.",
      quickOverview: {
        objective: "Provide wide-input dual-buck conversion and isolated 15V/5V rails for a modular competition power platform.",
        challenge: "COT stability, isolated domains, pulsed gate-drive loading, and low-noise sensing power must coexist.",
        contribution: "Designed the rectified bus, dual SY8502FCC stages, isolated DC/DC rails, protection, decoupling, PCB, and load tests.",
        outcome: "Validated 18V-80V input, isolated 15V/5V output, and 25%-100% load, ripple, efficiency, and thermal behavior."
      },
      responsibilities: [
        "Defined V_BUS, 15V_1, 15V_2, ISO_15V, and ISO_5V power domains from driver, sensing, and control requirements.",
        "Designed the MSB40M bridge and 220µF + 220µF bus storage so AC or DC input can feed a common V_BUS.",
        "Used two SY8502FCC COT buck stages, 68µH inductors, and 115kΩ / 10kΩ feedback networks to convert the 18V-80V design input into 15V_1 and 15V_2.",
        "Added isolated 15V / 5V DC/DC modules, TVS clamps, 100µF + 100nF filtering, and multiple output connectors for modular distribution.",
        "Reserved a 0Ω emergency link between the two buck outputs while explicitly treating it as a temporary single-channel fault workaround, not a normal parallel connection."
      ],
      metrics: [
        { label: "Design Input", value: "18V-80V", kind: "design" },
        { label: "Isolated Outputs", value: "15V / 5V", kind: "measured" },
        { label: "Bus Storage", value: "440µF", kind: "design" }
      ],
      keyComponents: [
        { label: "Input Rectifier", value: "MSB40M", note: "For AC input, VBUS,peak ≈ √2 × VAC,rms - 2VD." },
        { label: "Bus Capacitors", value: "220µF + 220µF", note: "440µF total for low-frequency ripple and transient energy." },
        { label: "Buck Controllers", value: "SY8502FCC ×2", note: "COT control for wide-input dual-rail conversion." },
        { label: "Buck Inductors", value: "68µH ×2", note: "Used with 100µF + 100nF output filtering." },
        { label: "Feedback Network", value: "115kΩ / 10kΩ", note: "Targets 15V with an approximately 1.2V feedback reference." },
        { label: "RON Resistor", value: "1.6MΩ", note: "Participates in COT on-time and operating-frequency setting." },
        { label: "Isolated 15V", value: "TDK15-24S15W", note: "Works with the 15V_1 front end to supply isolated gate drive." },
        { label: "Isolated 5V", value: "TURB2405YMD-15WR3", note: "Works with the 15V_2 front end to supply isolated sensing." },
        { label: "Output Protection", value: "SMAJ15.0CA / SMBJ5.0CA", note: "Protects ISO_15V and ISO_5V respectively." }
      ],
      operatingPrinciples: [
        "For AC input, the rectified bus is approximately VBUS,peak = √2 × VAC,rms - 2VD. Two 220µF capacitors provide 440µF of bus storage.",
        "Buck output is approximately VOUT = VFB × (1 + 115kΩ / 10kΩ) = 12.5 × VFB. With an approximately 1.2V feedback reference, the target is about 15V.",
        "COT control depends on sufficient, correctly phased feedback ripple. The 68µH inductor, 100µF output capacitor, and ripple-injection network determine light-load stability and transient response.",
        "15V_1 and 15V_2 split the isolated 15V and isolated 5V front-end loads, reducing gate-drive transient coupling into the digital sensing supply.",
        "Recommended bring-up order: current-limited low-voltage input, check V_BUS, verify 15V_1/15V_2 separately, verify ISO_15V/ISO_5V, then connect driver, sensing, and control loads."
      ],
      engineeringHighlights: [
        "Dual SY8502FCC COT buck stages separate gate-driver loads from sensing and control loads.",
        "Rectification, 440µF bus storage, buck conversion, and isolated DC/DC stages form a layered power tree for AC or DC input.",
        "Ripple injection, 68µH inductors, and output capacitors were tuned across light-load and loaded operation.",
        "The 0Ω link between 15V_1 and 15V_2 is retained as a service interface while normal operation keeps both rails independent.",
        "ISO_15V_GND, ISO_5V_GND, and non-isolated GND are clearly separated and identified through connectors and silkscreen."
      ],
      diagramTitle: "Auxiliary Power Distribution Diagram",
      diagramNodes: ["AC / DC Input", "MSB40M + 440µF V_BUS", "Dual SY8502FCC COT Buck", "15V_1 / 15V_2", "Isolated DC/DC", "ISO_15V / ISO_5V Loads"],
      designPoints: [
        "Rectification, non-isolated conversion, and isolated distribution are separated so different competition systems can use the required power nodes.",
        "Dual buck rails split driver and sensing/control loads, sharing power while reducing high-di/dt gate-drive contamination of low-noise sensing.",
        "Each isolated output includes bulk storage, high-frequency decoupling, TVS protection, and multiple connectors for independent load and ripple testing.",
        "Board silkscreen identifies input, outputs, and power domains; bring-up follows current-limited low-voltage power, staged checks, and load connection last."
      ],
      progress: "The two-page schematic, PCB, assembly, dual-buck bring-up, and isolated 15V/5V output validation are complete. Input range, power-domain distribution, ripple, load capability, and key-component temperature were verified.",
      validation: [
        "Verified rectifier polarity, V_BUS, 15V_1, and 15V_2 through staged power-up.",
        "Measured ISO_15V and ISO_5V no-load voltage, startup behavior, and isolation resistance.",
        "Recorded output voltage, ripple, efficiency, and component temperature at 25%, 50%, 75%, and 100% load.",
        "Verified COT switching, FB ripple, and light-load stability at 18V, nominal input, and near 80V input.",
        "Completed combined driver, sensing, and control loading with stable ISO_5V and sensing zero point."
      ],
      improvements: [
        "Documented isolated-module and SY8502FCC selection, supported input range, and power margin.",
        "Recorded rated current, efficiency, ripple, startup, protection behavior, and critical-component temperature for each rail.",
        "Optimized ripple injection, output-capacitor ESR, and minimum-load configuration across the operating range.",
        "Produced connector definitions, a power budget, power-up sequence, and a field service table."
      ]
    },
    "stm32g4-control-board": {
      title: "STM32G4 Control Board",
      subtitle: "Core control platform for digital power projects",
      summary: "A reusable STM32G4 control board built around PWM, synchronized ADC sampling, protection inputs, and communication interfaces.",
      tags: ["STM32G4", "PWM", "ADC Sync", "Protection Logic"],
      status: "Design, PCB, and integration complete",
      goal: "Build a control board suitable for power-supply competition topics and fast validation of PFC, LLC, half-bridge, and other power stages.",
      quickOverview: {
        objective: "Create a reusable STM32G4 digital-power control platform for multiple converter topologies.",
        challenge: "Complementary PWM, synchronized ADC sampling, protection inputs, and communications must share a coherent timing plan.",
        contribution: "Designed the board interfaces, PWM/ADC resources, protection inputs, communications, and power-board integration.",
        outcome: "Validated complementary PWM, dead time, synchronized sampling, protection shutdown, and status feedback."
      },
      responsibilities: ["Planned control-board interfaces", "Designed PWM, ADC, protection, and communication resources", "Co-debugged with power boards"],
      metrics: [
        { label: "MCU", value: "STM32G4", kind: "design" },
        { label: "Target", value: "Converters", kind: "design" },
        { label: "Integrated Result", value: "Real-Time Closed Loop", kind: "measured" }
      ],
      diagramTitle: "Control Board Resource Diagram",
      diagramNodes: ["STM32G4", "ADC Inputs", "PWM Outputs", "Protection / Communication"],
      designPoints: ["Unified PWM and ADC timing plan", "Reserved hardware protection inputs", "Clear debug interface and key test points"],
      progress: "The STM32G4 control-board hardware, PWM/ADC resources, protection inputs, communication interfaces, and power-board integration are complete.",
      validation: ["Completed complementary PWM, dead-time, and polarity checks", "Completed synchronized ADC sampling and trigger-timing validation", "Completed protection-input trigger, shutdown, and status-feedback tests"],
      improvements: ["Produced a standardized pin table and interface definition", "Created reusable control-code templates", "Integrated debug status indicators and bring-up records"]
    },
    "four-mos-half-bridge-board": {
      title: "100V Half-Bridge / Full-Bridge Power Board",
      subtitle: "Four-MOS H bridge with four floating isolated gate drivers",
      summary: "A four-MOS H-bridge power board for 100V-class competition inverter and bidirectional-converter experiments. Q1/Q2 and Q3/Q4 form two legs, with differential output between SW1 and SW2. Four UCC23513 drivers and independent B1515S isolated 15V supplies reference each driver to its MOSFET source.",
      detailImages: [
        {
          src: "images/four-mos-power-board.png",
          title: "100V Half-Bridge / Full-Bridge PCB",
          description: "Four MOSFETs form the H bridge. The board includes four isolated-driver interfaces, DC+/GND bus terminals, SW1/SW2 switching nodes, and a position for the 1mH experiment inductor.",
          kind: "prototype"
        },
        {
          src: "images/full-bridge-power-schematic-main.png",
          title: "H-Bridge Power Stage and Four Isolated Drivers",
          description: "Q1-Q4 form the full bridge. UCC23513 devices receive PWM_H1/PWM_L1/PWM_H2/PWM_L2 and drive NCEP0178AK MOSFETs through 10Ω gate resistors with 1N4148W asymmetric switching paths.",
          kind: "schematic"
        },
        {
          src: "images/full-bridge-power-schematic-isolated-supplies.png",
          title: "Four Floating Isolated 15V Driver Supplies",
          description: "Four B1515S-1WR3 modules provide independent 15V rails. The high-side negative outputs reference SW1 and SW2, while the low-side outputs reference GND.",
          kind: "schematic"
        }
      ],
      tags: ["100V H Bridge", "NCEP0178AK", "UCC23513 ×4", "Floating 15V Drive"],
      status: "Design, PCB, and 100V load validation complete",
      goal: "Build a reusable 100V H-bridge platform supporting single-leg half-bridge tests, full-bridge unipolar/bipolar SPWM, off-grid inversion, grid-simulation experiments, and bidirectional conversion, with explicit driver references, dead time, and low-voltage bring-up procedures.",
      quickOverview: {
        objective: "Build a reusable 100V half-bridge/full-bridge platform for SPWM, inversion, and bidirectional-conversion experiments.",
        challenge: "Four floating references, bridge interlock, dead time, gate loops, and 100V bus protection must work together.",
        contribution: "Designed the power path, four UCC23513 drivers, isolated supplies, PCB, gate tuning, and protection integration.",
        outcome: "Completed staged 12V, 24V, and 100V load validation with sensing, overcurrent, overvoltage, and fault latching."
      },
      responsibilities: [
        "Defined the Q1/Q2 and Q3/Q4 bridge legs and the DC+, GND, SW1, and SW2 power interfaces.",
        "Designed four UCC23513 isolated driver paths: 100Ω PWM input limiting followed by 10Ω gate resistors and 1N4148W paths for asymmetric turn-on and turn-off behavior.",
        "Assigned an independent B1515S-1WR3 isolated 15V supply to each MOSFET, with the high sides floating on SW1/SW2 and the low sides referenced to GND.",
        "Added 10kΩ gate-source pull-downs, 100nF + 10µF driver decoupling, 100µF + 100nF bus bypassing, and a 1mH experiment inductor.",
        "Defined a bring-up sequence from driver-only power and complementary PWM/dead-time checks through a current-limited 12V/24V bus, no-load operation, dummy load, and staged voltage increase."
      ],
      metrics: [
        { label: "Measured Bus", value: "100V", kind: "measured" },
        { label: "Power Topology", value: "Four-MOS H Bridge", kind: "design" },
        { label: "Isolated Drive", value: "4 Independent 15V Rails", kind: "design" }
      ],
      keyComponents: [
        { label: "Power MOSFETs", value: "NCEP0178AK ×4", note: "100V-class devices forming the Q1-Q4 bridge." },
        { label: "Isolated Drivers", value: "UCC23513DWYR ×4", note: "Four PWM inputs independently drive the four MOSFETs." },
        { label: "Driver Supplies", value: "B1515S-1WR3 ×4", note: "Each rail floats relative to the corresponding MOSFET source." },
        { label: "Gate Network", value: "10Ω + 1N4148W", note: "Controls switching speed and helps manage ringing and false turn-on." },
        { label: "Gate Pull-Down", value: "10kΩ ×4", note: "Keeps MOSFETs off while drivers are unpowered or the MCU resets." },
        { label: "PWM Input", value: "100Ω Series", note: "Limits transient current at the UCC23513 input." },
        { label: "Driver Decoupling", value: "100nF + 10µF / Channel", note: "Supports high-frequency current and gate-charge transients." },
        { label: "Bus Decoupling", value: "100µF + 100nF", note: "The 100nF capacitor should stay close to the high-di/dt power loop." },
        { label: "Experiment Inductor", value: "1mH", note: "Usable as an output filter or series element in topology experiments." }
      ],
      operatingPrinciples: [
        "For the left leg, S1=1 turns Q1 on and Q2 off so SW1≈DC+; S1=0 turns Q1 off and Q2 on so SW1≈GND. S2 controls Q3/Q4 and SW2 in the same way.",
        "The differential output is VSW1-SW2 = (S1 - S2) × VDC. States 1/0 and 0/1 produce +VDC and -VDC; 1/1 and 0/0 produce zero vectors.",
        "Bipolar SPWM switches between +VDC and -VDC and is simple but produces larger high-frequency ripple. Unipolar SPWM produces +VDC / 0 / -VDC levels and is generally easier to filter.",
        "High-side driver returns for Q1 and Q3 must follow SW1 and SW2 respectively; Q2 and Q4 return to GND. Independent isolated supplies avoid bootstrap limits and support long-duty-cycle or low-frequency tests.",
        "Initial dead time should start conservatively around 500ns-1µs, then be reduced using measured VGS, VDS, and leg-current waveforms. The upper and lower MOSFETs of one leg must never conduct simultaneously."
      ],
      engineeringHighlights: [
        "Complementary PWM, dead time, and protection logic provide deterministic bridge-leg interlocking.",
        "Q1/Q3 high-side supplies float on SW1/SW2, and four isolated rails support long-duty-cycle, low-frequency, and static-conduction experiments.",
        "The 2.2kΩ bleed resistor is selected with package and thermal margin for approximately 0.102W dissipation at 15V.",
        "Separate turn-on and turn-off paths were tuned from measured VGS, VDS, leg-current, efficiency, and EMI behavior.",
        "The board completed staged validation from low-voltage bring-up through 100V bus loading with sensing and protection enabled."
      ],
      diagramTitle: "100V H-Bridge Power and Driver Path",
      diagramNodes: ["15V / Four B1515S Rails", "PWM_H1/L1/H2/L2", "Four UCC23513 Drivers", "Q1-Q4 H Bridge", "SW1 / SW2 Differential Output", "1mH / Load / Transformer"],
      designPoints: [
        "Four fully isolated drivers avoid high-side bootstrap constraints and support low-frequency, long-duty-cycle, and static-conduction experiments.",
        "Driver returns follow MOSFET sources exactly: Q1→SW1, Q2→GND, Q3→SW2, and Q4→GND.",
        "Each driver has local 100nF and 10µF decoupling for high-frequency current and gate-charge transients, while 10kΩ pull-downs enforce an off state during reset.",
        "The H bridge can be split into a single-leg half bridge or used as a complete SW1-to-SW2 differential full bridge, extending reuse across competition topologies.",
        "Schematic connectors and nodes expose PWM, driver outputs, SW1/SW2, and bus states for segmented fault isolation."
      ],
      progress: "The two-page schematic, PCB, assembly, and 100V bus load validation are complete. H-bridge topology, four isolated drivers, floating references, complementary PWM, dead time, and protection functions were integrated and verified.",
      validation: [
        "Verified the voltage, polarity, and floating reference of all four B1515S modules.",
        "Measured UCC23513 outputs and all four VGS waveforms for polarity, propagation delay, off state, and dead time.",
        "Completed no-load, dummy-load, and series-inductor tests on current-limited 12V and 24V buses.",
        "Recorded VGS, VDS, leg current, switching spikes, and temperature across multiple dead-time and gate-network settings.",
        "Completed staged voltage increase through 100V bus loading with sensing, overcurrent, overvoltage, and fault-latch functions enabled."
      ],
      improvements: [
        "Produced a PCB layout review covering high-di/dt loops, driver loops, bus-decoupling placement, and clearance.",
        "Documented measured tuning of turn-on/turn-off resistance, diode direction, dead time, efficiency, and EMI.",
        "Integrated hardware fast overcurrent shutdown, bus overvoltage, undervoltage lockout, and fault-latch interfaces.",
        "Captured switching waveforms, thermal images, and protection-action records at 12V, 24V, 100V, and multiple loads."
      ]
    },
    "totem-pole-pfc": {
      title: "1kW CCM Boost PFC",
      subtitle: "UCC28019ADR / 220VAC to 400VDC average-current-mode PFC",
      summary: "A completed 1kW-class front-end design covering component selection, EMI and safety, relay-bypassed NTC inrush limiting, dual-loop compensation, and 220VAC-to-400VDC closed-loop validation at a measured 160W operating point.",
      detailImages: [
        { src: "images/pfc-boost-project.jpg", title: "1kW-Class CCM Boost PFC Prototype", description: "Prototype with input protection, soft start, bridge, boost stage, high-voltage bus, UCC28019ADR control, and auxiliary supply.", kind: "prototype" },
        { src: "images/pfc-boost-schematic-main.png", title: "Power Stage, Sensing, and Compensation", description: "Main schematic covering the boost stage, VSENSE/VINS/ISENSE paths, and voltage/current loop compensation.", kind: "schematic" },
        { src: "images/pfc-boost-input-power.jpg", title: "220VAC Input Power and PF Record", description: "Staged-load record used to review input voltage, current, active power, and power factor.", kind: "test" },
        { src: "images/pfc-boost-bus-ripple.jpg", title: "400V Bus Ripple Record", description: "Bus waveform used to review voltage-loop stability and twice-line-frequency energy storage.", kind: "waveform" },
        { src: "images/pfc-boost-schematic-aux.png", title: "Auxiliary Supply and Protective Earth", description: "Auxiliary control power, relay drive, decoupling, protective earth, and mounting structure.", kind: "schematic" }
      ],
      tags: ["UCC28019ADR", "CCM Boost PFC", "1kW Design", "400VDC", "Type-II Compensation", "EMI / Safety"],
      status: "High-voltage closed-loop and load validation complete",
      goal: "Build a 1kW-class single-phase CCM Boost PFC that establishes a 400VDC bus from 220VAC and improves input-current shape and power factor through average-current-mode control.",
      quickOverview: {
        objective: "Build a 1kW-class CCM Boost PFC front end from 220VAC to a regulated 400VDC bus.",
        challenge: "High-voltage stress, soft start, EMI/safety, and dual-loop compensation must be coordinated.",
        contribution: "Completed component selection, Simulink modeling, magnetics parameters, PCB, loop compensation, and high-voltage load testing.",
        outcome: "Established a stable 400VDC bus with 96.9% efficiency and PF 0.94 at the measured 160W operating point."
      },
      responsibilities: [
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
