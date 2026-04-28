import type { KeyboardEvent } from "react";
import type { PortfolioMetric } from "../../types/portfolio";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { Pill } from "../ui/Pill";

const AUTO_PLAY_MS = 3000;

function MetricPanel({ metrics }: { metrics: PortfolioMetric[] }) {
  return (
    <div className="rounded-[1.6rem] border border-[rgba(255,245,224,0.46)] bg-[rgba(245,235,218,0.5)] p-5 shadow-[0_20px_56px_rgba(52,33,19,0.18)] backdrop-blur-md transition duration-300 hover:bg-[rgba(247,238,222,0.62)] motion-safe:hover:-translate-y-1">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((item) => (
          <div key={item.label} className="rounded-[1rem] border border-[rgba(143,110,74,0.22)] bg-[rgba(249,242,231,0.82)] p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-[var(--text-strong)]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SlideRailProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

function SlideRail({ activeSlide, setActiveSlide }: SlideRailProps) {
  const { siteCopy } = useLanguage();
  const heroSlides = siteCopy.topShowcase.heroSlides;

  return (
    <div className="rounded-[1.5rem] border border-[rgba(255,245,224,0.42)] bg-[rgba(244,233,214,0.44)] p-3 shadow-[0_20px_50px_rgba(52,33,19,0.16)] backdrop-blur-md">
      <div className="grid gap-2">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            onMouseEnter={() => setActiveSlide(index)}
            className={`group flex items-center gap-3 rounded-[1rem] border p-2 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-faded)] ${
              index === activeSlide
                ? "border-[rgba(161,106,59,0.46)] bg-[rgba(249,242,231,0.88)]"
                : "border-transparent hover:border-[rgba(143,110,74,0.22)] hover:bg-[rgba(249,242,231,0.62)]"
            }`}
            aria-pressed={index === activeSlide}
          >
            <img
              src={assetUrl(item.image)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-12 w-16 rounded-lg object-cover opacity-78 transition group-hover:opacity-100"
            />
            <span>
              <span className="block text-sm font-semibold text-[var(--text-strong)]">{item.title}</span>
              <span className="block text-xs text-[var(--text-muted)]">{item.kicker}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const { siteCopy } = useLanguage();
  const heroSlides = siteCopy.topShowcase.heroSlides;
  const {
    activeIndex: activeSlide,
    setActiveIndex: setActiveSlide,
    paused,
    setPaused,
    reducedMotion,
    goToPrevious,
    goToNext
  } = useAutoCarousel({ itemCount: heroSlides.length, intervalMs: AUTO_PLAY_MS });
  const slide = heroSlides[activeSlide];
  const nearbySlides = new Set([
    activeSlide,
    (activeSlide + 1) % heroSlides.length,
    (activeSlide - 1 + heroSlides.length) % heroSlides.length
  ]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  return (
    <section
      className="relative min-h-[720px] overflow-hidden border-b border-[rgba(143,110,74,0.16)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label={siteCopy.topShowcase.heroStatus}
      tabIndex={-1}
    >
      {heroSlides.map((item, index) => nearbySlides.has(index) && (
        <img
          key={item.id}
          src={assetUrl(item.image)}
          alt=""
          decoding="async"
          fetchPriority={index === activeSlide ? "high" : "low"}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
            index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,212,165,0.3),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(94,109,119,0.22),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,234,216,0.94)_0%,rgba(238,225,202,0.78)_40%,rgba(87,69,54,0.3)_74%,rgba(42,30,22,0.44)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(239,227,208,0.86))]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-center">
            <div className="transition duration-500" key={slide.id}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="section-kicker">{slide.kicker}</p>
                <span className="rounded-full border border-[rgba(143,110,74,0.26)] bg-[rgba(249,242,231,0.72)] px-3 py-1 text-xs font-medium text-[var(--text-base)]">
                  {paused || reducedMotion ? siteCopy.topShowcase.pausedStatus : siteCopy.topShowcase.playingStatus}
                </span>
              </div>
              <h1 className="balanced-text mt-6 max-w-4xl text-4xl font-semibold leading-[1.12] text-[var(--text-strong)] sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="copy-text mt-6 max-w-3xl">{slide.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {slide.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>

            <div className="hidden flex-col gap-5 lg:flex xl:translate-x-8 2xl:translate-x-16">
              <MetricPanel metrics={slide.metrics} />
              <div className="hidden xl:block">
                <SlideRail activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex w-[min(100%-2.5rem,80rem)] -translate-x-1/2 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${siteCopy.nav.language}: ${item.title}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                  onMouseEnter={() => setActiveSlide(index)}
                  className={`h-3.5 rounded-[3px] border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-faded)] ${
                    index === activeSlide
                      ? "w-9 border-[var(--accent-brass)] bg-[var(--accent-brass)]"
                      : "w-3.5 border-[rgba(143,110,74,0.28)] bg-[rgba(249,242,231,0.78)] hover:border-[var(--accent-faded)]"
                  }`}
                />
              ))}
            </div>
            <div className="hidden gap-3 sm:flex">
              <button type="button" onClick={goToPrevious} className="secondary-button h-11 w-11 px-0 py-0" aria-label={siteCopy.topShowcase.previousSlide}>
                ←
              </button>
              <button type="button" onClick={goToNext} className="secondary-button h-11 w-11 px-0 py-0" aria-label={siteCopy.topShowcase.nextSlide}>
                →
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {siteCopy.topShowcase.heroStatus}: {slide.title}
          </p>
        </div>
      </div>
    </section>
  );
}
