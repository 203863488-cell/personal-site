import { Activity, Cpu, Layers } from "lucide-react";
import type { PortfolioMetric } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { MetricTile } from "./MetricTile";

interface MetricGridProps {
  metrics: PortfolioMetric[];
  className: string;
  tileClassName?: string;
}

const metricIcons = [Activity, Cpu, Layers] as const;

/**
 * Shared metric renderer.
 *
 * The grid and tile class names stay caller-controlled so every existing page
 * keeps its exact spacing and visual weight, while the icon cycle and mapping
 * logic live in one place.
 */
export function MetricGrid({ metrics, className, tileClassName }: MetricGridProps) {
  const { siteCopy } = useLanguage();

  return (
    <div className={className}>
      {metrics.map((metric, index) => (
        <MetricTile
          key={metric.label}
          badge={
            metric.kind === "measured"
              ? siteCopy.common.measuredMetric
              : metric.kind === "design"
                ? siteCopy.common.designMetric
                : undefined
          }
          className={tileClassName}
          icon={metricIcons[index % metricIcons.length]}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}
