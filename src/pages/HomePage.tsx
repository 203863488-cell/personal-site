import { EntryCard } from "../components/EntryCard";
import { ContactBand } from "../components/home/ContactBand";
import { TopShowcase } from "../components/home/TopShowcase";
import { Pill } from "../components/ui/Pill";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";

export function HomePage() {
  const { siteCopy } = useLanguage();
  const home = siteCopy.home;

  return (
    <div className="animate-[reveal-up_0.5s_ease-out]">
      <TopShowcase />

      <section className="section-shell pb-12 pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-kicker">{home.kicker}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-[#111827] sm:text-6xl lg:text-7xl">
              {home.title}
              <span className="block text-3xl font-medium text-[#1F2933] sm:text-4xl lg:text-5xl">
                {home.subtitle}
              </span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-[#5D6673]">
              {home.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {home.tags.map((tag) => (
                <Pill key={tag}>
                  {tag}
                </Pill>
              ))}
            </div>
          </div>

          <div className="paper-card overflow-hidden">
            <div className="relative h-80">
              <img src={assetUrl("images/electronics-lab-oscilloscope.jpg")} alt="" className="h-full w-full object-cover opacity-82" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,247,0.1),rgba(248,250,247,0.82))]" />
              <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/30" viewBox="0 0 620 360" fill="none" aria-hidden="true">
                <rect x="70" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="260" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="450" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <path d="M190 104H260M380 104H450" stroke="currentColor" />
                <path d="M70 240C110 188 150 292 190 240C230 188 270 292 310 240C350 188 390 292 430 240" stroke="currentColor" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid gap-px overflow-hidden rounded-xl border border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-3">
                  {home.metricCards.map((metric) => (
                    <div key={metric.label} className="bg-white/82 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">{metric.label}</p>
                      <p className="mt-2 font-semibold text-[#111827]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <SectionHeader className="mb-10" kicker={home.entranceKicker} title={home.entranceTitle} description={home.entranceDescription} />

        <div className="grid gap-6 lg:grid-cols-2">
          {home.entries.map((entry) => (
            <EntryCard key={entry.href} {...entry} />
          ))}
        </div>
      </section>

      <ContactBand />
    </div>
  );
}
