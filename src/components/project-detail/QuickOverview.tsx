import { BadgeCheck, Target, Wrench, Zap } from "lucide-react";
import type { PortfolioProject } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";

interface QuickOverviewProps {
  project: PortfolioProject;
}

export function QuickOverview({ project }: QuickOverviewProps) {
  const { siteCopy } = useLanguage();
  const labels = siteCopy.projectDetail.quickOverview;
  const items = [
    { label: labels.objective, value: project.quickOverview.objective, icon: Target },
    { label: labels.challenge, value: project.quickOverview.challenge, icon: Zap },
    { label: labels.contribution, value: project.quickOverview.contribution, icon: Wrench },
    { label: labels.outcome, value: project.quickOverview.outcome, icon: BadgeCheck }
  ];

  return (
    <section className="paper-card overflow-hidden p-6 sm:p-8" aria-labelledby="quick-overview-title">
      <p className="section-kicker">{labels.kicker}</p>
      <h2 id="quick-overview-title" className="mt-3 text-2xl font-semibold text-[#111827]">{labels.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-[#D8E0E7]/85 bg-[#FAFAF7]/80 p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF5FC] text-[#2563EB]">
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-[#111827]">{label}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5D6673]">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
