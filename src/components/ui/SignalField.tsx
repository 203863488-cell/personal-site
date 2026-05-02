import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SignalFieldProps {
  className?: string;
  density?: "calm" | "rich";
  tone?: "light" | "dark";
}

export function SignalField({ className = "", density = "calm", tone = "light" }: SignalFieldProps) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isDark = tone === "dark";

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const node = fieldRef.current;

      if (!node) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;

      if (!inside) {
        node.style.setProperty("--signal-x", "50%");
        node.style.setProperty("--signal-y", "50%");
        return;
      }

      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      // CSS variables keep the signal layer responsive without forcing React re-renders.
      node.style.setProperty("--signal-x", `${x.toFixed(2)}%`);
      node.style.setProperty("--signal-y", `${y.toFixed(2)}%`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  return (
    <div
      ref={fieldRef}
      className={`signal-field signal-field--${tone} signal-field--${density} ${className}`}
      aria-hidden="true"
    >
      <div className="signal-field__grid" />
      <svg className="signal-field__lines" viewBox="0 0 1200 620" fill="none" preserveAspectRatio="none">
        <path d="M-40 182H86C142 182 142 126 198 126H394C456 126 456 84 518 84H1240" />
        <path d="M-80 442H96C154 442 154 386 212 386H422C488 386 488 330 554 330H1280" />
        <path d="M112 548C176 492 240 604 304 548C368 492 432 604 496 548C560 492 624 604 688 548C752 492 816 604 880 548" />
        {density === "rich" ? (
          <>
            <path d="M86 42C188 92 288 112 386 102C516 88 610 26 730 54C850 82 890 164 1012 176C1098 184 1182 154 1260 120" />
            <path d="M1012 0V122C1012 170 974 170 974 218V620" />
          </>
        ) : null}
      </svg>
      <div className={isDark ? "signal-field__focus signal-field__focus--dark" : "signal-field__focus"} />
    </div>
  );
}
