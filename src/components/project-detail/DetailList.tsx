import { CheckCircle2, TriangleAlert } from "lucide-react";

interface DetailListProps {
  title: string;
  items: string[];
  variant?: "default" | "warning";
}

/**
 * Small repeated detail block used across responsibilities, design points,
 * validation, and improvement sections.
 */
export function DetailList({ title, items, variant = "default" }: DetailListProps) {
  const Icon = variant === "warning" ? TriangleAlert : CheckCircle2;
  const iconClassName = variant === "warning" ? "text-[#D97706]" : "text-[#5CC8A7]";

  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>
            <Icon aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${iconClassName}`} strokeWidth={1.8} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
