import { Activity, Cpu, Layers } from "lucide-react";
import type { PortfolioMetric } from "../../types/portfolio";
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
  return (
    <div className={className}>
      {metrics.map((metric, index) => (
        <MetricTile
          key={metric.label}
          className={tileClassName}
          icon={metricIcons[index % metricIcons.length]}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}
