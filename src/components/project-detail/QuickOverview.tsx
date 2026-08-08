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
    <section className="paper-card overflow-hidden p-4 sm:p-8" aria-labelledby="quick-overview-title">
      <p className="section-kicker">{labels.kicker}</p>
      <h2 id="quick-overview-title" className="mt-2 text-xl font-semibold text-[#111827] sm:mt-3 sm:text-2xl">{labels.title}</h2>
      <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-[#D8E0E7]/85 bg-[#FAFAF7]/80 p-3.5 sm:p-5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF5FC] text-[#2563EB] sm:h-10 sm:w-10">
              <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-[#111827] sm:mt-4">{label}</h3>
            <p className="mobile-line-clamp-3 mt-1.5 text-[0.82rem] leading-5 text-[#5D6673] sm:mt-2 sm:text-sm sm:leading-6">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
