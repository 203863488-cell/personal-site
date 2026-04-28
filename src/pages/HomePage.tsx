import { EntryCard } from "../components/EntryCard";
import { assetUrl } from "../utils/assetUrl";

export function HomePage() {
  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <section className="section-shell pb-12 pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-kicker">Power Electronics Portfolio</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-[#111827] sm:text-6xl lg:text-7xl">
              蓝宏涛
              <span className="block text-3xl font-medium text-[#1F2933] sm:text-4xl lg:text-5xl">
                电力电子硬件与嵌入式控制
              </span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-[#5D6673]">
              关注功率变换器、隔离采样、STM32G4 数字控制与工程化调试，能够从原理图、PCB、焊接、代码到测试验证完整推进项目。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["PFC", "LLC", "STM32G4", "隔离采样", "辅助电源", "电赛"].map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="paper-card overflow-hidden">
            <div className="relative h-80">
              <img src={assetUrl("images/electronics-lab-oscilloscope.jpg")} alt="" className="h-full w-full object-cover opacity-82" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,247,0.1),rgba(248,250,247,0.82))]" />
              <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/30" viewBox="0 0 620 360" fill="none" aria-hidden="true">
                <rect x="70" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="260" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="450" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <path d="M190 104H260M380 104H450" stroke="currentColor" />
                <path d="M70 240C110 188 150 292 190 240C230 188 270 292 310 240C350 188 390 292 430 240" stroke="currentColor" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid gap-px overflow-hidden rounded-xl border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
                  <div className="bg-white/82 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">方向</p>
                    <p className="mt-2 font-semibold text-[#111827]">电力电子</p>
                  </div>
                  <div className="bg-white/82 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">能力</p>
                    <p className="mt-2 font-semibold text-[#111827]">硬件 + 控制</p>
                  </div>
                  <div className="bg-white/82 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">形式</p>
                    <p className="mt-2 font-semibold text-[#111827]">点击式作品集</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="mb-10">
          <p className="section-kicker">Portfolio Entrance</p>
          <h2 className="section-title">请选择一条项目主线进入</h2>
          <p className="section-copy">首页只保留入口与定位，具体项目和详情需要点击后进入对应页面查看。</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <EntryCard
            title="电赛项目体系"
            subtitle="Competition System"
            description="围绕电赛电源类题目，展示隔离采样、辅助供电、控制板、功率板和模块化接口策略。"
            href="#/competition"
            image="images/pcb-closeup.jpg"
            tags={["隔离采样", "辅助电源", "控制板", "功率板"]}
            accent="blue"
          />
          <EntryCard
            title="个人项目作品"
            subtitle="Personal Projects"
            description="展示 PFC、LLC、MEMS 调理、数字电源工具和个人网站等硬核项目积累。"
            href="#/personal"
            image="images/power-board-components.jpg"
            tags={["PFC", "LLC", "MEMS", "上位机"]}
            accent="green"
          />
        </div>
      </section>

      <section id="contact" className="section-shell pt-10">
        <div className="paper-card p-7 sm:p-8">
          <p className="section-kicker">Contact</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#111827]">欢迎交流电力电子硬件、嵌入式控制和功率变换器相关岗位机会。</h2>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">邮箱、GitHub 与简历链接可后续替换为真实信息。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:example@email.com" className="secondary-button">邮箱联系</a>
              <a href={assetUrl("resume.pdf")} download className="primary-button">下载简历</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
