import type { KeyboardEvent } from "react";
import { Activity, ChevronLeft, ChevronRight, Cpu, Layers, Pause, Play } from "lucide-react";
import type { PortfolioMetric } from "../../types/portfolio";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { MetricTile } from "../ui/MetricTile";
import { Pill } from "../ui/Pill";
import { SignalField } from "../ui/SignalField";

const AUTO_PLAY_MS = 3000;
const metricIcons = [Activity, Cpu, Layers];

function MetricPanel({ metrics }: { metrics: PortfolioMetric[] }) {
  return (
    <div className="rounded-lg border border-white/60 bg-white/58 p-3 shadow-[0_18px_55px_rgba(31,41,51,0.12)] backdrop-blur-md">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((item, index) => (
          <MetricTile key={item.label} icon={metricIcons[index % metricIcons.length]} label={item.label} value={item.value} />
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
    <div className="rounded-lg border border-white/55 bg-white/42 p-3 shadow-[0_18px_55px_rgba(31,41,51,0.1)] backdrop-blur-md">
      <div className="grid gap-2">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            onMouseEnter={() => setActiveSlide(index)}
            className={`group flex items-center gap-3 rounded-lg border p-2 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] ${
              index === activeSlide ? "border-[#9BC9FF] bg-white/90 shadow-sm" : "border-transparent hover:border-[#D8E0E7] hover:bg-white/66"
            }`}
            aria-pressed={index === activeSlide}
          >
            <img
              src={assetUrl(item.image)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-12 w-16 rounded-md object-cover opacity-78 transition group-hover:opacity-100"
            />
            <span className="min-w-0">
              <span className="balanced-text block text-sm font-semibold leading-tight text-[#111827]">{item.title}</span>
              <span className="mt-1 block text-xs text-[#6B7280]">{item.kicker}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroBackdrop({ activeSlide, nearbySlides }: { activeSlide: number; nearbySlides: Set<number> }) {
  const { siteCopy } = useLanguage();

  return (
    <>
      {siteCopy.topShowcase.heroSlides.map(
        (item, index) =>
          nearbySlides.has(index) && (
            <img
              key={item.id}
              src={assetUrl(item.image)}
              alt=""
              decoding="async"
              fetchPriority={index === activeSlide ? "high" : "low"}
              className={`hero-showcase__backdrop absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ${
                index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          )
      )}
      <div className="hero-showcase__wash absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(248,250,247,0.86)_0%,rgba(248,250,247,0.66)_42%,rgba(248,250,247,0.3)_78%,rgba(248,250,247,0.14)_100%)]" />
      <SignalField density="rich" className="z-[2] opacity-42" />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-32 bg-[linear-gradient(180deg,transparent,rgba(248,250,247,0.78))]" />
    </>
  );
}

interface HeroControlsProps {
  activeSlide: number;
  goToNext: () => void;
  goToPrevious: () => void;
  setActiveSlide: (index: number) => void;
}

function HeroControls({ activeSlide, goToNext, goToPrevious, setActiveSlide }: HeroControlsProps) {
  const { siteCopy } = useLanguage();
  const heroSlides = siteCopy.topShowcase.heroSlides;

  return (
    <div className="hero-showcase__controls absolute bottom-10 left-1/2 flex w-[min(100%-2.5rem,80rem)] -translate-x-1/2 items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${siteCopy.topShowcase.heroStatus}: ${item.title}`}
            aria-pressed={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            onMouseEnter={() => setActiveSlide(index)}
            className={`h-3.5 rounded-[3px] border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] ${
              index === activeSlide ? "w-9 border-[#4F9CF9] bg-[#4F9CF9]" : "w-3.5 border-[#BFD0DF] bg-white/75 hover:border-[#7AA2F7]"
            }`}
          />
        ))}
      </div>
      <div className="hidden gap-3 sm:flex">
        <button type="button" onClick={goToPrevious} className="secondary-button h-11 w-11 px-0 py-0" aria-label={siteCopy.topShowcase.previousSlide}>
          <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
        </button>
        <button type="button" onClick={goToNext} className="secondary-button h-11 w-11 px-0 py-0" aria-label={siteCopy.topShowcase.nextSlide}>
          <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
        </button>
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
      className="hero-showcase relative min-h-[720px] overflow-hidden border-b border-[#D8E0E7]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label={siteCopy.topShowcase.heroStatus}
      tabIndex={-1}
    >
      <HeroBackdrop activeSlide={activeSlide} nearbySlides={nearbySlides} />

      <div className="hero-showcase__shell relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-center">
            <div className="hero-showcase__content transition duration-500" key={slide.id}>
              <div className="hero-showcase__eyebrow flex flex-wrap items-center gap-3">
                <p className="section-kicker">{slide.kicker}</p>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#BFD0DF] bg-white/72 px-3 py-1 text-xs font-medium text-[#425466]">
                  {paused || reducedMotion ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}
                  {paused || reducedMotion ? siteCopy.topShowcase.pausedStatus : siteCopy.topShowcase.playingStatus}
                </span>
              </div>
              <h1 className="hero-showcase__title balanced-text mt-6 max-w-4xl text-4xl font-semibold leading-[1.12] text-[#111827] sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="hero-showcase__copy copy-text mt-6 max-w-3xl">{slide.description}</p>
              <div className="hero-showcase__tags mt-8 flex flex-wrap gap-3">
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

          <HeroControls activeSlide={activeSlide} goToNext={goToNext} goToPrevious={goToPrevious} setActiveSlide={setActiveSlide} />
          <p className="sr-only" aria-live="polite">
            {siteCopy.topShowcase.heroStatus}: {slide.title}
          </p>
        </div>
      </div>
    </section>
  );
}
