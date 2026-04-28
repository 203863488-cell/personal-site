import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface AutoCarouselOptions {
  itemCount: number;
  intervalMs: number;
}

export function useAutoCarousel({ itemCount, intervalMs }: AutoCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion || itemCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % itemCount);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, itemCount, paused, reducedMotion]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % itemCount);
  };

  return {
    activeIndex,
    setActiveIndex,
    paused,
    setPaused,
    reducedMotion,
    goToPrevious,
    goToNext
  };
}
