import { ArrowLeft, BriefcaseBusiness, FileText, GitBranch, Mail } from "lucide-react";
import { DocumentMetadata } from "../components/DocumentMetadata";
import { MetricGrid } from "../components/ui/MetricGrid";
import { SignalButton } from "../components/ui/SignalButton";
import { SignalField } from "../components/ui/SignalField";
import { useLanguage } from "../languageContext";
import { portfolioHrefs } from "../routes/portfolioRoutes";
import { assetUrl } from "../utils/assetUrl";

export function ContactPage() {
  const { siteCopy } = useLanguage();
  const home = siteCopy.home;

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <DocumentMetadata title={`${home.contactTitle} | ${siteCopy.nav.brand}`} description={home.contactDescription} />
      <section className="section-shell pt-10 md:pt-12">
        <SignalButton href={portfolioHrefs.home} icon={ArrowLeft} iconPosition="start" className="mb-6 py-2">
          {siteCopy.common.backHome}
        </SignalButton>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_28px_90px_rgba(31,41,51,0.18)]">
          <SignalField tone="dark" density="rich" className="opacity-52" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,156,249,0.11),transparent_52%,rgba(92,200,167,0.1))]" />

          <div className="relative grid gap-8 p-6 sm:p-9 md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] md:items-center lg:p-12">
            <div>
              <p className="section-kicker">{home.contactKicker}</p>
              <h1 className="balanced-text mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                {home.contactTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{home.contactDescription}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                <SignalButton href="mailto:203863488@qq.com" variant="ghost" icon={Mail} iconPosition="start" className="w-full">
                  {home.email}
                </SignalButton>
                <SignalButton href="https://github.com/203863488-cell" target="_blank" rel="noopener noreferrer" variant="ghost" icon={GitBranch} iconPosition="start" className="w-full">
                  {home.github}
                </SignalButton>
                <SignalButton href={assetUrl("resume.pdf")} target="_blank" rel="noopener noreferrer" icon={FileText} iconPosition="start" className="w-full bg-white font-semibold text-[#111827] hover:bg-[#EEF4FA]">
                  {home.download}
                </SignalButton>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/9 p-4 shadow-[0_22px_60px_rgba(8,17,29,0.18)] backdrop-blur-md sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/12 text-[#9BC9FF]">
                  <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{siteCopy.nav.brand}</p>
                  <p className="mt-1 text-xs text-white/58">{home.subtitle}</p>
                </div>
              </div>
              <MetricGrid
                metrics={home.metricCards}
                className="mt-5 grid gap-3"
                tileClassName="border-white/12 bg-white/9 p-3 text-white shadow-none [&_p]:text-white [&_p:first-child]:text-white/55"
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
