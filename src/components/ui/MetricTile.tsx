import type { LucideIcon } from "lucide-react";

interface MetricTileProps {
  caption?: string;
  className?: string;
  icon?: LucideIcon;
  label: string;
  tone?: "light" | "dark";
  value: string;
}

export function MetricTile({ caption, className = "", icon: Icon, label, tone = "light", value }: MetricTileProps) {
  const dark = tone === "dark";

  return (
    <div
      className={`metric-tile ${
        dark ? "border-white/12 bg-white/8 text-white" : "border-[#D8E0E7]/90 bg-white/78 text-[#111827]"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-white/58" : "text-[#6B7280]"}`}>{label}</p>
        {Icon ? (
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${dark ? "bg-white/10 text-[#9BC9FF]" : "bg-[#F4F8FC] text-[#4F9CF9]"}`}>
            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </span>
        ) : null}
      </div>
      <p className={`mt-3 text-xl font-semibold leading-tight ${dark ? "text-white" : "text-[#111827]"}`}>{value}</p>
      {caption ? <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/62" : "text-[#6B7280]"}`}>{caption}</p> : null}
    </div>
  );
}
