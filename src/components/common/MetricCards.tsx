interface Metric {
  label: string;
  value: string;
}

interface MetricCardsProps {
  metrics: readonly Metric[];
  variant?: "inline" | "floating";
}

export function MetricCards({ metrics, variant = "inline" }: MetricCardsProps) {
  if (variant === "floating") {
    return (
      <div className="absolute right-[7%] top-[18%] hidden w-[28rem] rounded-lg border border-[#D8E0E7]/80 bg-white/62 p-5 backdrop-blur-sm md:block">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded border border-[#D8E0E7] bg-[#FAFAF7]/80 p-3">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#6B7280]">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-[#111827]">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid max-w-2xl gap-px overflow-hidden rounded-lg border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white/76 p-4 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">{metric.label}</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
