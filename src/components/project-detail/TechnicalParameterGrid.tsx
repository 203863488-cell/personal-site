import type { PortfolioTechnicalParameter } from "../../types/portfolio";

interface TechnicalParameterGridProps {
  title: string;
  parameters: PortfolioTechnicalParameter[];
}

export function TechnicalParameterGrid({ title, parameters }: TechnicalParameterGridProps) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <dl className="mt-3 grid gap-2.5 sm:mt-5 sm:gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {parameters.map((parameter) => (
          <div
            key={`${parameter.label}-${parameter.value}`}
            className="rounded-lg border border-[#D8E0E7]/90 bg-white/82 p-3 shadow-[0_12px_32px_rgba(31,41,51,0.04)] sm:p-4"
          >
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#6B7280] sm:text-xs sm:tracking-[0.12em]">{parameter.label}</dt>
            <dd className="mt-1.5 text-sm font-semibold leading-5 text-[#111827] sm:mt-2 sm:text-base sm:leading-6">{parameter.value}</dd>
            {parameter.note ? <dd className="mt-1.5 text-xs leading-5 text-[#6B7280] sm:mt-2">{parameter.note}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
