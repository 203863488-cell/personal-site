import type { PortfolioMetric } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";

interface CompactMetricStripProps {
  className?: string;
  metrics: PortfolioMetric[];
}

export function CompactMetricStrip({ className = "", metrics }: CompactMetricStripProps) {
  const { siteCopy } = useLanguage();

  return (
    <div className={`mobile-scrollbar flex snap-x gap-2 overflow-x-auto ${className}`}>
      {metrics.map((metric) => {
        const badge =
          metric.kind === "measured"
            ? siteCopy.common.measuredMetric
            : metric.kind === "design"
              ? siteCopy.common.designMetric
              : undefined;

        return (
          <div
            key={metric.label}
            className="compact-metric-chip min-w-[8.75rem] snap-start rounded-lg border border-[#D8E0E7]/90 bg-white/82 px-2.5 py-2 shadow-[0_10px_24px_rgba(31,41,51,0.035)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{metric.label}</span>
              {badge ? <span className="shrink-0 rounded-full bg-[#EEF5FC] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#2563EB]">{badge}</span> : null}
            </div>
            <p className="mt-1 truncate text-sm font-semibold leading-tight text-[#111827]">{metric.value}</p>
          </div>
        );
      })}
    </div>
  );
}
