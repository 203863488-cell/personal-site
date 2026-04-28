import { EntryCard } from "../components/EntryCard";
import { ClosingVisual } from "../components/home/ClosingVisual";
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

      <section className="content-auto section-shell pb-12 pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="section-kicker">{home.kicker}</p>
            <h1 className="balanced-text mt-5 max-w-4xl text-4xl font-semibold leading-[1.12] text-[var(--text-strong)] sm:text-5xl lg:text-6xl">
              {home.title}
              <span className="mt-2 block text-2xl font-medium leading-[1.18] text-[var(--text-strong)] sm:text-3xl lg:text-4xl">
                {home.subtitle}
              </span>
            </h1>
            <p className="copy-text mt-6 max-w-3xl">
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
              <img
                src={assetUrl("images/electronics-lab-oscilloscope.jpg")}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-82"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,233,214,0.12),rgba(242,229,205,0.7))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(240,212,165,0.2),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(104,121,131,0.14),transparent_20%)]" />
              <svg className="absolute inset-0 h-full w-full text-[rgba(104,121,131,0.22)]" viewBox="0 0 620 360" fill="none" aria-hidden="true">
                <rect x="70" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="260" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <rect x="450" y="72" width="120" height="64" rx="6" stroke="currentColor" />
                <path d="M190 104H260M380 104H450" stroke="currentColor" />
                <path d="M70 240C110 188 150 292 190 240C230 188 270 292 310 240C350 188 390 292 430 240" stroke="currentColor" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid gap-px overflow-hidden rounded-[1rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(143,110,74,0.14)] sm:grid-cols-3">
                  {home.metricCards.map((metric) => (
                    <div key={metric.label} className="bg-[rgba(250,243,232,0.8)] p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{metric.label}</p>
                      <p className="mt-2 font-semibold text-[var(--text-strong)]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-auto section-shell pt-8">
        <SectionHeader className="mb-10" kicker={home.entranceKicker} title={home.entranceTitle} description={home.entranceDescription} />

        <div className="grid gap-6 lg:grid-cols-2">
          {home.entries.map((entry) => (
            <EntryCard key={entry.href} {...entry} />
          ))}
        </div>
      </section>

      <ContactBand />
      <ClosingVisual />
    </div>
  );
}
