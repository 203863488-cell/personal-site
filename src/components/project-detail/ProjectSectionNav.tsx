import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../languageContext";

const sectionIds = ["overview", "drawings", "metrics", "design", "validation", "outcomes"] as const;
const sectionIdsWithoutDrawings = ["overview", "metrics", "design", "validation", "outcomes"] as const;

interface ProjectSectionNavProps {
  hasImages: boolean;
}

export function ProjectSectionNav({ hasImages }: ProjectSectionNavProps) {
  const { siteCopy } = useLanguage();
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>("overview");
  const suppressScrollUpdates = useRef(false);
  const suppressionTimer = useRef<number | null>(null);
  const labels = siteCopy.projectDetail.sectionNavigation;
  const availableSectionIds = hasImages ? sectionIds : sectionIdsWithoutDrawings;

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      if (suppressScrollUpdates.current) {
        return;
      }

      const offset = 176;
      const visibleSection = [...availableSectionIds].reverse().find((id) => {
        const section = document.getElementById(id);
        return section ? section.getBoundingClientRect().top <= offset : false;
      });

      setActiveSection(visibleSection ?? "overview");
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      if (suppressionTimer.current !== null) {
        window.clearTimeout(suppressionTimer.current);
      }
    };
  }, [availableSectionIds]);

  const scrollToSection = (id: (typeof sectionIds)[number]) => {
    suppressScrollUpdates.current = true;
    if (suppressionTimer.current !== null) {
      window.clearTimeout(suppressionTimer.current);
    }
    suppressionTimer.current = window.setTimeout(() => {
      suppressScrollUpdates.current = false;
      suppressionTimer.current = null;
    }, 1600);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  };

  return (
    <nav
      aria-label={labels.ariaLabel}
      className="mobile-scrollbar sticky top-[4.6rem] z-30 -mx-1 overflow-x-auto rounded-lg border border-[#D8E0E7]/80 bg-[#F8FAF7]/94 p-1 shadow-[0_10px_30px_rgba(31,41,51,0.07)] backdrop-blur-xl sm:top-[4.55rem] sm:rounded-xl sm:p-1.5 sm:shadow-[0_14px_40px_rgba(31,41,51,0.08)]"
    >
      <div className="flex min-w-max gap-0.5 sm:gap-1">
        {availableSectionIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            aria-current={activeSection === id ? "location" : undefined}
            className={`rounded-md px-2.5 py-1.5 text-[0.72rem] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] sm:rounded-lg sm:px-4 sm:py-2.5 sm:text-sm ${
              activeSection === id ? "bg-[#1F2933] text-white shadow-sm" : "text-[#55616E] hover:bg-white hover:text-[#111827]"
            }`}
          >
            {labels[id]}
          </button>
        ))}
      </div>
    </nav>
  );
}
