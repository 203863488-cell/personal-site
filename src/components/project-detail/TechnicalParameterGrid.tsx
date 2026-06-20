import type { PortfolioTechnicalParameter } from "../../types/portfolio";

interface TechnicalParameterGridProps {
  title: string;
  parameters: PortfolioTechnicalParameter[];
}

export function TechnicalParameterGrid({ title, parameters }: TechnicalParameterGridProps) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {parameters.map((parameter) => (
          <div
            key={`${parameter.label}-${parameter.value}`}
            className="rounded-lg border border-[#D8E0E7]/90 bg-white/82 p-4 shadow-[0_12px_32px_rgba(31,41,51,0.04)]"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{parameter.label}</dt>
            <dd className="mt-2 text-base font-semibold leading-6 text-[#111827]">{parameter.value}</dd>
            {parameter.note ? <dd className="mt-2 text-xs leading-5 text-[#6B7280]">{parameter.note}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
