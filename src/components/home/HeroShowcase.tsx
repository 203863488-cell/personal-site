import type { KeyboardEvent } from "react";
import { Activity, ChevronLeft, ChevronRight, Cpu, FileText, FolderKanban, Layers, Mail, Pause, Play } from "lucide-react";
import type { PortfolioMetric } from "../../types/portfolio";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { responsiveImageSources } from "../../utils/responsiveImage";
import { MetricTile } from "../ui/MetricTile";
import { Pill } from "../ui/Pill";
import { ShareQrDialog } from "../ui/ShareQrDialog";
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
          (() => {
            const sources = responsiveImageSources(item.image);

            return (
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
                  src={sources.original}
                  srcSet={sources.srcSet}
                  sizes="64px"
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
            );
          })()
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
        (item, index) => {
          const sources = responsiveImageSources(item.image);

          return (
            nearbySlides.has(index) && (
            <img
              key={item.id}
              src={sources.original}
              srcSet={sources.srcSet}
              sizes="100vw"
              alt=""
              decoding="async"
              fetchPriority={index === activeSlide ? "high" : "low"}
              className={`hero-showcase__backdrop absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ${
                item.id === "welcome" ? "object-[58%_center] sm:object-center" : "object-center"
              } ${
                index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          )
          );
        }
      )}
      <div className="hero-showcase__wash absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(248,250,247,0.92)_0%,rgba(248,250,247,0.82)_56%,rgba(248,250,247,0.58)_100%)] sm:bg-[linear-gradient(90deg,rgba(248,250,247,0.86)_0%,rgba(248,250,247,0.66)_42%,rgba(248,250,247,0.3)_78%,rgba(248,250,247,0.14)_100%)]" />
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
    <div className="hero-showcase__controls absolute bottom-3.5 left-5 right-5 z-20 flex w-auto items-center justify-between gap-4 sm:bottom-10 sm:left-1/2 sm:right-auto sm:w-[min(100%-2.5rem,80rem)] sm:-translate-x-1/2">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${siteCopy.topShowcase.heroStatus}: ${item.title}`}
            aria-pressed={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            onMouseEnter={() => setActiveSlide(index)}
            className={`h-2.5 rounded-[3px] border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] sm:h-3.5 ${
              index === activeSlide ? "w-7 border-[#4F9CF9] bg-[#4F9CF9] sm:w-9" : "w-2.5 border-[#BFD0DF] bg-white/75 hover:border-[#7AA2F7] sm:w-3.5"
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
    setUserPaused,
    reducedMotion,
    goToPrevious,
    goToNext
  } = useAutoCarousel({ itemCount: heroSlides.length, intervalMs: AUTO_PLAY_MS, pauseOnCoarseTablet: true });
  const slide = heroSlides[activeSlide];
  const nearbySlides = new Set([
    activeSlide,
    (activeSlide + 1) % heroSlides.length,
    (activeSlide - 1 + heroSlides.length) % heroSlides.length
  ]);

  const toggleAutoplay = () => {
    if (paused) {
      setUserPaused(false);
      setPaused(false);
      return;
    }

    setUserPaused(true);
  };

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
      className="hero-showcase relative min-h-[31.5rem] overflow-hidden border-b border-[#D8E0E7] sm:min-h-[720px]"
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

      <div className="hero-showcase__shell relative z-10 mx-auto flex min-h-[31.5rem] max-w-7xl items-start px-4 pb-[3.25rem] pt-[3.5rem] sm:min-h-[720px] sm:items-center sm:px-8 sm:py-20 lg:px-10">
        <div className="w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-center">
            <div className="hero-showcase__content transition duration-500" key={slide.id}>
              <div className="hero-showcase__eyebrow flex flex-wrap items-center gap-3">
                <p className="section-kicker">{slide.kicker}</p>
                <button
                  type="button"
                  onClick={toggleAutoplay}
                  disabled={reducedMotion}
                  className="inline-flex items-center gap-2 rounded-full border border-[#BFD0DF] bg-white/78 px-3 py-1 text-xs font-medium text-[#425466] shadow-sm transition hover:border-[#8DB7DF] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] disabled:cursor-default"
                  aria-label={paused || reducedMotion ? siteCopy.topShowcase.resumeCarousel : siteCopy.topShowcase.pauseCarousel}
                >
                  {paused || reducedMotion ? <Play aria-hidden="true" className="h-3.5 w-3.5" /> : <Pause aria-hidden="true" className="h-3.5 w-3.5" />}
                  {paused || reducedMotion ? siteCopy.topShowcase.resumeCarousel : siteCopy.topShowcase.pauseCarousel}
                </button>
              </div>
              <h1 className="hero-showcase__title balanced-text mt-3.5 max-w-[12ch] text-[clamp(1.85rem,7.5vw,2.45rem)] font-semibold leading-[1.05] text-[#111827] sm:mt-6 sm:max-w-4xl sm:text-5xl sm:leading-[1.12] lg:text-6xl">
                {slide.title}
              </h1>
              <p className="hero-showcase__copy copy-text mt-3.5 max-w-[18rem] text-[0.86rem] leading-6 sm:mt-6 sm:max-w-3xl sm:text-base sm:leading-7">{slide.description}</p>
              <div className="hero-showcase__tags mt-4 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {slide.tags.map((tag) => (
                  <Pill key={tag} className="px-2.5 py-1 text-[0.68rem] sm:px-4 sm:py-2 sm:text-sm">{tag}</Pill>
                ))}
              </div>
              <div className="mt-4 grid max-w-[17rem] grid-cols-2 gap-2 sm:mt-8 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3">
                <a href={slide.href} className="primary-button w-full gap-1.5 px-2.5 py-2 text-[0.72rem] sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm">
                  <FolderKanban aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {slide.actionLabel}
                </a>
                <a href={assetUrl("resume.pdf")} target="_blank" rel="noopener noreferrer" className="secondary-button w-full gap-1.5 px-2.5 py-2 text-[0.72rem] sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm">
                  <FileText aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {siteCopy.topShowcase.resumeAction}
                </a>
                <a href="#/contact" className="secondary-button w-full gap-1.5 px-2.5 py-2 text-[0.72rem] sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm">
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {siteCopy.topShowcase.contactAction}
                </a>
                <ShareQrDialog buttonClassName="w-full gap-1.5 px-2.5 py-2 text-[0.72rem] sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm" />
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
