import { assetUrl } from "../utils/assetUrl";

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
    active: true
  },
  {
    title: "个人硬核项目",
    subtitle: "PFC、LLC 与高频功率控制",
    active: false
  },
  {
    title: "测试与复盘",
    subtitle: "波形、指标、问题定位与文档沉淀",
    active: false
  }
];

const capabilityTiles = ["隔离采样板", "辅助电源模块", "STM32G4 控制板"];

function MetricPanel() {
  return (
    <div className="hidden rounded-lg border border-white/55 bg-white/58 p-5 shadow-[0_18px_55px_rgba(31,41,51,0.12)] backdrop-blur-md lg:block">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "模块数量", value: "3+" },
          { label: "角色", value: "系统支撑" },
          { label: "状态", value: "已打板" }
        ].map((item) => (
          <div key={item.label} className="rounded border border-[#D8E0E7]/90 bg-white/88 p-4">
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
    <article className="group relative h-56 overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
      <img src={assetUrl(image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.06),rgba(17,24,39,0.64))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-38" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-white/84">{subtitle}</p>
      </div>
    </article>
  );
}

function DarkCapabilityPanel() {
  return (
    <section className="mt-16 overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_24px_70px_rgba(31,41,51,0.14)]">
      <div className="grid min-h-[520px] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="px-5 py-16 sm:px-8 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
          <div className="space-y-10">
            {capabilityTracks.map((track) => (
              <div
                key={track.title}
                className={`border-l-4 pl-6 ${track.active ? "border-[#4F9CF9] opacity-100" : "border-transparent opacity-42"}`}
              >
                <h3 className="text-3xl font-semibold">{track.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-white/68">{track.subtitle}</p>
                {track.active && <span className="mt-5 block text-2xl leading-none">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-h-[520px] grid-cols-1 sm:grid-cols-2">
          {capabilityTiles.map((tile, index) => (
            <article
              key={tile}
              className={`relative overflow-hidden border border-white/8 bg-[#273442] p-7 ${index === 2 ? "sm:col-span-2" : ""}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <svg className="absolute inset-0 h-full w-full text-[#7AA2F7]/28" viewBox="0 0 460 260" fill="none" aria-hidden="true">
                <path d="M40 90H150C180 90 180 58 210 58H360" stroke="currentColor" />
                <path d="M60 178C96 138 132 218 168 178C204 138 240 218 276 178C312 138 348 218 384 178" stroke="currentColor" />
              </svg>
              <div className="relative flex h-full min-h-40 items-end">
                <h4 className="text-2xl font-semibold">{tile}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopShowcase() {
  return (
    <div className="relative z-10">
      <section className="relative min-h-[720px] overflow-hidden border-b border-[#D8E0E7]">
        <img src={assetUrl("images/pcb-closeup.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.9)_0%,rgba(248,250,247,0.68)_42%,rgba(248,250,247,0.3)_78%,rgba(248,250,247,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(248,250,247,0.92))]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="w-full">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
              <div>
                <p className="section-kicker">Competition Module</p>
                <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl lg:text-6xl">
                  电赛隔离采样与控制平台
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#5F6B77] sm:text-lg">
                  从隔离采样、辅助供电、控制板到功率板，形成可复用的电力电子实验平台能力。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["隔离采样", "辅助电源", "控制板", "PCB"].map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <MetricPanel />
            </div>

            <div className="absolute bottom-10 left-1/2 flex w-[min(100%-2.5rem,80rem)] -translate-x-1/2 items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3.5 w-3.5 rounded-[2px] border border-[#BFD0DF] bg-white/75" />
                <span className="h-3.5 w-3.5 rounded-[2px] border border-[#BFD0DF] bg-white/75" />
                <span className="h-3.5 w-3.5 rounded-[2px] border border-[#4F9CF9] bg-[#4F9CF9]" />
                <span className="h-3.5 w-3.5 rounded-[2px] border border-[#BFD0DF] bg-white/75" />
              </div>
              <div className="hidden gap-3 sm:flex">
                <span className="secondary-button h-11 w-11 px-0 py-0">←</span>
                <span className="secondary-button h-11 w-11 px-0 py-0">→</span>
              </div>
            </div>
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
