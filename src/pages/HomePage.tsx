import { EntryCard } from "../components/EntryCard";
import { DocumentMetadata } from "../components/DocumentMetadata";
import { CapabilitySection } from "../components/home/CapabilitySection";
import { ClosingVisual } from "../components/home/ClosingVisual";
import { ContactBand } from "../components/home/ContactBand";
import { GatewaySection } from "../components/home/GatewaySection";
import { HeroShowcase } from "../components/home/HeroShowcase";
import { CompactMetricStrip } from "../components/ui/CompactMetricStrip";
import { MetricGrid } from "../components/ui/MetricGrid";
import { Pill } from "../components/ui/Pill";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalField } from "../components/ui/SignalField";
import { useLanguage } from "../languageContext";
import { responsiveImageSources } from "../utils/responsiveImage";

export function HomePage() {
  const { siteCopy } = useLanguage();
  const home = siteCopy.home;
  const profileImage = responsiveImageSources("images/electronics-lab-oscilloscope.jpg");

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <DocumentMetadata title={siteCopy.meta.title} description={siteCopy.meta.description} />
      <HeroShowcase />

      <Reveal as="section" className="content-auto section-shell pb-8 pt-10 sm:pb-12 sm:pt-14 lg:pt-20">
        <div className="grid gap-7 sm:gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:gap-12">
          <div>
            <p className="section-kicker">{home.kicker}</p>
            <h2 className="balanced-text mt-3 max-w-4xl text-3xl font-semibold leading-[1.1] text-[#111827] sm:mt-5 sm:text-4xl sm:leading-[1.12] lg:text-6xl">
              {home.title}
              <span className="mt-1.5 block text-xl font-medium leading-[1.16] text-[#1F2933] sm:mt-2 sm:text-3xl sm:leading-[1.18] lg:text-4xl">
                {home.subtitle}
              </span>
            </h2>
            <p className="copy-text mt-4 max-w-3xl text-sm leading-6 sm:mt-6 sm:text-base sm:leading-7">
              {home.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {home.tags.map((tag) => (
                <Pill key={tag}>
                  {tag}
                </Pill>
              ))}
            </div>
          </div>

          <div className="paper-card relative overflow-hidden">
            <div className="relative h-56 sm:h-80">
              <img
                src={profileImage.original}
                srcSet={profileImage.srcSet}
                sizes="(min-width: 1024px) 44vw, 92vw"
                alt={home.subtitle}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-82"
              />
              <SignalField className="opacity-58" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,247,0.12),rgba(248,250,247,0.68))]" />
              <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/30" viewBox="0 0 620 360" fill="none" aria-hidden="true">
                <rect x="70" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="260" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="450" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <path d="M190 104H260M380 104H450" stroke="currentColor" />
                <path d="M70 240C110 188 150 292 190 240C230 188 270 292 310 240C350 188 390 292 430 240" stroke="currentColor" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <CompactMetricStrip metrics={home.metricCards} className="pb-0.5 sm:hidden" />
                <MetricGrid
                  metrics={home.metricCards}
                  className="hidden gap-3 sm:grid sm:grid-cols-3"
                  tileClassName="min-w-[10.75rem] snap-start bg-white/84 p-3 shadow-[0_14px_38px_rgba(31,41,51,0.055)] sm:min-w-0 sm:p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <GatewaySection />
      <CapabilitySection />

      <Reveal as="section" className="content-auto section-shell pt-6 sm:pt-8">
        <SectionHeader className="mb-10" kicker={home.entranceKicker} title={home.entranceTitle} description={home.entranceDescription} />

        <div className="grid gap-6 lg:grid-cols-2">
          {home.entries.map((entry) => (
            <EntryCard key={entry.href} {...entry} />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <ContactBand />
      </Reveal>
      <div className="md:hidden xl:block">
        <ClosingVisual />
      </div>
    </div>
  );
}
