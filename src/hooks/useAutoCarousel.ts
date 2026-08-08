import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface AutoCarouselOptions {
  itemCount: number;
  intervalMs: number;
  pauseOnCoarseTablet?: boolean;
}

export function useAutoCarousel({ itemCount, intervalMs, pauseOnCoarseTablet = false }: AutoCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(() =>
    pauseOnCoarseTablet &&
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse), (min-width: 700px) and (max-width: 1199px)").matches
  );
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const paused = interactionPaused || userPaused;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (paused || !pageVisible || reducedMotion || itemCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % itemCount);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, itemCount, pageVisible, paused, reducedMotion]);

  const goToPrevious = () => {
    setUserPaused(true);
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  };

  const goToNext = () => {
    setUserPaused(true);
    setActiveIndex((current) => (current + 1) % itemCount);
  };

  const selectIndex = (index: number) => {
    setUserPaused(true);
    setActiveIndex(index);
  };

  return {
    activeIndex,
    setActiveIndex: selectIndex,
    paused,
    setPaused: setInteractionPaused,
    userPaused,
    setUserPaused,
    reducedMotion,
    goToPrevious,
    goToNext
  };
}
