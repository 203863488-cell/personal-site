import type { FeatureSlide } from "../data/featureSlides";
import type { Language } from "../types/language";
import { MetricCards } from "./common/MetricCards";

interface FeatureSlideVisualProps {
  slide: FeatureSlide;
  language: Language;
}

export function FeatureSlideVisual({ slide, language }: FeatureSlideVisualProps) {
  const isWelcome = slide.visual === "welcome";

  const overlay = isWelcome
    ? "bg-[linear-gradient(90deg,rgba(248,250,247,0.84)_0%,rgba(248,250,247,0.68)_38%,rgba(248,250,247,0.18)_76%,rgba(248,250,247,0.06)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(248,250,247,0.9)_0%,rgba(248,250,247,0.72)_42%,rgba(248,250,247,0.36)_75%,rgba(248,250,247,0.24)_100%)]";

  const asset = (path: string) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slide.imageUrl && (
        <img
          src={asset(slide.imageUrl)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className={`absolute inset-0 ${overlay}`} />

      {!isWelcome && (
        <MetricCards
          metrics={slide.content[language].metrics}
          variant="floating"
        />
      )}
    </div>
  );
}