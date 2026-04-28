import type { KeyboardEvent } from "react";
import type { PortfolioMetric } from "../../types/portfolio";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { Pill } from "../ui/Pill";

const AUTO_PLAY_MS = 3000;

function MetricPanel({ metrics }: { metrics: PortfolioMetric[] }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/58 p-5 shadow-[0_18px_55px_rgba(31,41,51,0.12)] backdrop-blur-md transition duration-300 hover:bg-white/70 motion-safe:hover:-translate-y-1">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((item) => (
          <div key={item.label} className="rounded-xl border border-[#D8E0E7]/90 bg-white/88 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-[#111827]">{item.value}</p>
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
    <div className="rounded-2xl border border-white/55 bg-white/42 p-3 shadow-[0_18px_55px_rgba(31,41,51,0.1)] backdrop-blur-md">
      <div className="grid gap-2">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            onMouseEnter={() => setActiveSlide(index)}
            className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] ${
              index === activeSlide ? "border-[#9BC9FF] bg-white/88" : "border-transparent hover:border-[#D8E0E7] hover:bg-white/66"
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
              <span className="block text-sm font-semibold text-[#111827]">{item.title}</span>
              <span className="block text-xs text-[#6B7280]">{item.kicker}</span>
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
      className="relative min-h-[720px] overflow-hidden border-b border-[#D8E0E7]"
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,247,0.9)_0%,rgba(248,250,247,0.68)_42%,rgba(248,250,247,0.3)_78%,rgba(248,250,247,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(248,250,247,0.78))]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-center">
            <div className="transition duration-500" key={slide.id}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="section-kicker">{slide.kicker}</p>
                <span className="rounded-full border border-[#BFD0DF] bg-white/72 px-3 py-1 text-xs font-medium text-[#425466]">
                  {paused || reducedMotion ? siteCopy.topShowcase.pausedStatus : siteCopy.topShowcase.playingStatus}
                </span>
              </div>
              <h1 className="balanced-text mt-6 max-w-4xl text-4xl font-semibold leading-[1.12] text-[#111827] sm:text-5xl lg:text-6xl">
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
                  className={`h-3.5 rounded-[3px] border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] ${
                    index === activeSlide
                      ? "w-9 border-[#4F9CF9] bg-[#4F9CF9]"
                      : "w-3.5 border-[#BFD0DF] bg-white/75 hover:border-[#7AA2F7]"
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
