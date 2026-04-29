import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.18,
  triggerOnce = true
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = globalThis.requestAnimationFrame(() => setInView(true));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);

        if (visible && triggerOnce) {
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { inView, ref };
}
