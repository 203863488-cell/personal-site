import type { ElementType, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ as: Component = "div", children, className = "", delay = 0 }: RevealProps) {
  const { inView, ref } = useInView();
  const reducedMotion = useReducedMotion();
  const visible = inView || reducedMotion;

  return (
    <Component
      ref={ref}
      className={`reveal-frame ${visible ? "reveal-frame--visible" : ""} ${className}`}
      style={{ transitionDelay: reducedMotion ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
