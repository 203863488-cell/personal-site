import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl";

const AUTO_PLAY_MS = 3000;

const heroSlides = [
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
];

const gatewayCards = [
  {
    title: "工程定位",
    subtitle: "电力电子硬件 / 嵌入式控制",
    image: "images/electronics-lab-oscilloscope.jpg"
  },
  {
    title: "项目方法",
    subtitle: "从原理图、PCB 到调试验证",
    image: "images/pcb-closeup.jpg"
  },
  {
    title: "求职方向",
    subtitle: "功率变换器与数字电源岗位",
    image: "images/circuit-board-abstract.jpg"
  }
];

const capabilityTracks = [
  {
    title: "电赛模块能力",
    subtitle: "采样、辅助供电、控制板与功率板",
    tiles: ["隔离采样板", "辅助电源模块", "STM32G4 控制板"]
  },
  {
    title: "个人硬核项目",
    subtitle: "PFC、LLC 与高频功率控制",
    tiles: ["1kW Totem-Pole PFC", "半桥 LLC", "MEMS 调理电路"]
  },
  {
    title: "测试与复盘",
    subtitle: "波形、指标、问题定位与文档沉淀",
    tiles: ["示波器波形", "测试记录", "设计复盘"]
  }
];

function MetricPanel({ metrics }: { metrics: typeof heroSlides[number]["metrics"] }) {
  return (
    <div className="hidden rounded-2xl border border-white/60 bg-white/58 p-5 shadow-[0_18px_55px_rgba(31,41,51,0.12)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/70 lg:block">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((item) => (
          <div key={item.label} className="rounded-xl border border-[#D8E0E7]/90 bg-white/88 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopGatewayCard({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <article className="group relative h-56 overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_18px_55px_rgba(31,41,51,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(31,41,51,0.13)]">
      <img src={assetUrl(image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.06),rgba(17,24,39,0.64))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-38" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white transition duration-300 group-hover:translate-y-[-4px]">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-white/84">{subtitle}</p>
      </div>
    </article>
  );
}

function DarkCapabilityPanel() {
  const [activeTrack, setActiveTrack] = useState(0);
  const currentTrack = capabilityTracks[activeTrack];

  return (
    <section className="mt-16 overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_24px_70px_rgba(31,41,51,0.14)]">
      <div className="grid min-h-[520px] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="px-5 py-16 sm:px-8 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
          <div className="space-y-10">
            {capabilityTracks.map((track, index) => (
              <button
                key={track.title}
                type="button"
                onClick={() => setActiveTrack(index)}
                onMouseEnter={() => setActiveTrack(index)}
                className={`block w-full border-l-4 pl-6 text-left transition duration-300 ${
                  index === activeTrack ? "border-[#4F9CF9] opacity-100" : "border-transparent opacity-42 hover:opacity-75"
                }`}
              >
                <span className="block text-3xl font-semibold">{track.title}</span>
                <span className="mt-3 block max-w-xs text-sm leading-7 text-white/68">{track.subtitle}</span>
                {index === activeTrack && <span className="mt-5 block text-2xl leading-none">→</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-[520px] grid-cols-1 sm:grid-cols-2">
          {currentTrack.tiles.map((tile, index) => (
            <article
              key={tile}
              className={`group relative overflow-hidden border border-white/8 bg-[#273442] p-7 transition duration-300 hover:bg-[#2E3E4E] ${
                index === 2 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <svg className="absolute inset-0 h-full w-full text-[#7AA2F7]/28 transition duration-300 group-hover:text-[#7AA2F7]/45" viewBox="0 0 460 260" fill="none" aria-hidden="true">
                <path d="M40 90H150C180 90 180 58 210 58H360" stroke="currentColor" />
                <path d="M60 178C96 138 132 218 168 178C204 138 240 218 276 178C312 138 348 218 384 178" stroke="currentColor" />
              </svg>
              <div className="relative flex h-full min-h-40 items-end">
                <h4 className="text-2xl font-semibold transition duration-300 group-hover:-translate-y-1">{tile}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goToPrevious = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  return (
    <div className="relative z-10">
      <section
        className="relative min-h-[720px] overflow-hidden border-b border-[#D8E0E7]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {heroSlides.map((item, index) => (
          <img
            key={item.id}
            src={assetUrl(item.image)}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.9)_0%,rgba(248,250,247,0.68)_42%,rgba(248,250,247,0.3)_78%,rgba(248,250,247,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(248,250,247,0.92))]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="w-full">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
              <div className="transition duration-500" key={slide.id}>
                <p className="section-kicker">{slide.kicker}</p>
                <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#5F6B77] sm:text-lg">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {slide.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <MetricPanel metrics={slide.metrics} />
            </div>

            <div className="absolute bottom-10 left-1/2 flex w-[min(100%-2.5rem,80rem)] -translate-x-1/2 items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`切换到 ${item.title}`}
                    onClick={() => setActiveSlide(index)}
                    onMouseEnter={() => setActiveSlide(index)}
                    className={`h-3.5 rounded-[3px] border transition-all duration-300 ${
                      index === activeSlide
                        ? "w-9 border-[#4F9CF9] bg-[#4F9CF9]"
                        : "w-3.5 border-[#BFD0DF] bg-white/75 hover:border-[#7AA2F7]"
                    }`}
                  />
                ))}
              </div>
              <div className="hidden gap-3 sm:flex">
                <button type="button" onClick={goToPrevious} className="secondary-button h-11 w-11 px-0 py-0" aria-label="上一页">
                  ←
                </button>
                <button type="button" onClick={goToNext} className="secondary-button h-11 w-11 px-0 py-0" aria-label="下一页">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 right-[max(1.25rem,calc((100vw-80rem)/2+2.5rem))] hidden w-[25rem] rounded-2xl border border-white/55 bg-white/42 p-3 shadow-[0_18px_55px_rgba(31,41,51,0.1)] backdrop-blur-md xl:block">
          <div className="grid gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                onMouseEnter={() => setActiveSlide(index)}
                className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition duration-300 ${
                  index === activeSlide ? "border-[#9BC9FF] bg-white/88" : "border-transparent hover:border-[#D8E0E7] hover:bg-white/66"
                }`}
              >
                <img src={assetUrl(item.image)} alt="" className="h-12 w-16 rounded-lg object-cover opacity-78 transition group-hover:opacity-100" />
                <span>
                  <span className="block text-sm font-semibold text-[#111827]">{item.title}</span>
                  <span className="block text-xs text-[#6B7280]">{item.kicker}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#D8E0E7]/70 py-20">
        <img src={assetUrl("images/pcb-closeup.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 blur-[1px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.78),rgba(250,250,247,0.94))]" />
        <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
          <p className="section-kicker mb-8">作品集入口</p>
          <div className="grid gap-5 md:grid-cols-3">
            {gatewayCards.map((card) => (
              <TopGatewayCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <DarkCapabilityPanel />
    </div>
  );
}
