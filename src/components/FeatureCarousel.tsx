import { useCallback, useEffect, useRef, useState } from "react";
import { featureSlides } from "../data/featureSlides";
import type { Language } from "../types/language";
import { FeatureSlideVisual } from "./FeatureSlideVisual";
import { MetricCards } from "./common/MetricCards";

const AUTO_ROTATE_MS = 5200;
const SWIPE_THRESHOLD_PX = 48;

interface FeatureCarouselProps {
  language: Language;
}

export function FeatureCarousel({ language }: FeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % featureSlides.length);
  }, []);

  const previousSlide = () => {
    setActiveIndex((current) => (current - 1 + featureSlides.length) % featureSlides.length);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(nextSlide, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) {
      return;
    }

    if (distance < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  return (
    <section
      className="relative z-10 border-b border-[#D8E0E7] bg-[#F7F9FB]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
        setIsPaused(true);
      }}
      onTouchEnd={(event) => {
        handleTouchEnd(event.changedTouches[0].clientX);
        setIsPaused(false);
      }}
    >
      <div className="relative min-h-[68vh] overflow-hidden md:min-h-[720px]">
        {featureSlides.map((slide, index) => {
          const localized = slide.content[language];

          return (
            <article
              key={slide.id}
              className={`absolute inset-0 transition duration-700 ${
                index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={index !== activeIndex}
            >
              <FeatureSlideVisual slide={slide} language={language} />
              <div className="section-shell relative flex min-h-[68vh] items-center pb-24 pt-20 md:min-h-[720px]">
                <div className="max-w-3xl">
                  <p className="section-kicker">{localized.kicker}</p>
                  <h2 className="mt-6 text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl md:text-6xl">
                    {localized.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#5F6B77] sm:text-lg">
                    {localized.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {localized.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {slide.visual === "welcome" && <MetricCards metrics={localized.metrics} />}
                </div>
              </div>
            </article>
          );
        })}

        <div className="absolute bottom-8 left-1/2 z-20 flex w-[min(100%-2.5rem,80rem)] -translate-x-1/2 items-center justify-between gap-4">
          <div className="flex gap-2">
            {featureSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`切换到 ${slide.content[language].title}`}
                onClick={() => setActiveIndex(index)}
                className={`h-3.5 w-3.5 rounded-[2px] border transition ${
                  index === activeIndex
                    ? "border-[#4F9CF9] bg-[#4F9CF9]"
                    : "border-[#BFD0DF] bg-white/75 hover:border-[#7AA2F7]"
                }`}
              />
            ))}
          </div>

          <div className="hidden gap-3 sm:flex">
            <button type="button" onClick={previousSlide} className="secondary-button h-11 w-11 px-0 py-0" aria-label="上一张">
              ←
            </button>
            <button type="button" onClick={nextSlide} className="secondary-button h-11 w-11 px-0 py-0" aria-label="下一张">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
