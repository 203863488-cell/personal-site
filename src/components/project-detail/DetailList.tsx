import { CheckCircle2 } from "lucide-react";

interface DetailListProps {
  title: string;
  items: string[];
}

/**
 * Small repeated detail block used across responsibilities, design points,
 * validation, and improvement sections.
 */
export function DetailList({ title, items }: DetailListProps) {
  return (
    <section className="card-block">
      <h3 className="detail-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#5CC8A7]" strokeWidth={1.8} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
