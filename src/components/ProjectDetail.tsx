import type { PortfolioProject } from "../types/portfolio";

interface ProjectDetailProps {
  project: PortfolioProject;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function SystemDiagram({ project }: { project: PortfolioProject }) {
  return (
    <section className="paper-card p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">System Diagram</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#111827]">{project.diagramTitle}</h3>
        </div>
        <span className="text-sm text-[#6B7280]">后续可替换为真实系统框图</span>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-[#D8E0E7] bg-[#F7F9FB]/70 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          {project.diagramNodes.map((node, index) => (
            <div key={node} className="relative">
              <div className="rounded-lg border border-[#BFD0DF] bg-white/78 px-4 py-5 text-center text-sm font-semibold text-[#1F2933]">
                {node}
              </div>
              {index < project.diagramNodes.length - 1 && (
                <div className="absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[#9BC9FF] md:block" />
              )}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 720 120" className="mt-8 h-auto w-full text-[#4F9CF9]/40" fill="none" aria-hidden="true">
          <path d="M20 62H150C190 62 190 28 230 28H380" stroke="currentColor" />
          <path d="M420 62H560C600 62 600 92 640 92H700" stroke="currentColor" />
          <path d="M40 98C74 62 108 134 142 98C176 62 210 134 244 98C278 62 312 134 346 98" stroke="currentColor" />
        </svg>
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-6">
      <section className="paper-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-kicker">Project Detail</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl">{project.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5D6673]">{project.goal}</p>
          </div>
          <span className="w-fit rounded-full border border-[#D8E0E7] bg-white px-4 py-2 text-sm text-[#425466]">
            当前进度：{project.status}
          </span>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title="我的职责" items={project.responsibilities} />
        <section className="card-block">
          <h3 className="detail-title">技术指标</h3>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-white/82 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#6B7280]">{metric.label}</p>
                <p className="mt-2 text-base font-semibold text-[#111827]">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <SystemDiagram project={project} />

      <div className="grid gap-5 xl:grid-cols-2">
        <DetailList title="关键设计点" items={project.designPoints} />
        <section className="card-block">
          <h3 className="detail-title">当前进度</h3>
          <p className="mt-4 text-sm leading-7 text-[#5D6673]">{project.progress}</p>
        </section>
        <DetailList title="测试与验证" items={project.validation} />
        <DetailList title="后续改进" items={project.improvements} />
      </div>
    </div>
  );
}
