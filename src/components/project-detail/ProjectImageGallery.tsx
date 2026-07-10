import { useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";
import type { PortfolioProject } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { responsiveImageSources } from "../../utils/responsiveImage";
import { ImageLightbox } from "../ui/ImageLightbox";

interface ProjectImageGalleryProps {
  project: PortfolioProject;
}

const kindPriority = { prototype: 0, test: 1, waveform: 2, software: 3, schematic: 4 } as const;

/**
 * Optional project media area.
 *
 * Projects can be published before detailed photos are ready; the null return
 * keeps that data state explicit without forcing placeholder content.
 */
export function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const { siteCopy } = useLanguage();
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const images = useMemo(
    () => [...(project.detailImages ?? [])].sort((left, right) => kindPriority[left.kind] - kindPriority[right.kind]),
    [project.detailImages]
  );

  if (!images.length) {
    return null;
  }

  return (
    <section id="drawings" className="project-section paper-card p-3.5 sm:p-6">
      <div>
        <p className="section-kicker">{siteCopy.projectDetail.imagesKicker}</p>
        <h3 className="balanced-text mt-2 text-lg font-semibold leading-[1.16] text-[#111827] sm:mt-3 sm:text-2xl sm:leading-[1.18]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mobile-scrollbar -mx-3.5 mt-3.5 flex snap-x gap-2.5 overflow-x-auto px-3.5 pb-1.5 sm:mx-0 sm:mt-6 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {images.map((image, index) => {
          const sources = responsiveImageSources(image.src);

          return (
            <article key={image.src} className="min-w-[74vw] max-w-[17rem] snap-start overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-white/78 sm:min-w-0 sm:max-w-none">
              <button
                type="button"
                className="group relative block h-36 w-full overflow-hidden bg-[#F7F9FB] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4F9CF9] sm:h-64"
                onClick={() => setActiveImage(index)}
                aria-label={`${siteCopy.projectDetail.openImage}: ${image.title}`}
              >
                <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-white/70 bg-[#111827]/76 px-2.5 py-1 text-[0.68rem] font-semibold text-white shadow-lg backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
                  {siteCopy.projectDetail.imageKinds[image.kind]}
                </span>
                <img
                  src={sources.original}
                  srcSet={sources.srcSet}
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-3 transition duration-300 motion-safe:group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#111827]/82 px-2.5 py-1.5 text-[0.68rem] font-semibold text-white opacity-100 shadow-lg transition sm:bottom-3 sm:right-3 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <ZoomIn aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {siteCopy.projectDetail.openImage}
                </span>
              </button>
              <div className="border-t border-[#D8E0E7]/80 p-3 sm:p-5">
                <h4 className="balanced-text text-sm font-semibold leading-[1.18] text-[#111827] sm:text-base sm:leading-[1.2]">{image.title}</h4>
                <p className="mobile-line-clamp-2 mt-2 text-[0.78rem] leading-5 text-[#5D6673] sm:mt-3 sm:text-sm sm:leading-6">{image.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <ImageLightbox
        images={images}
        activeIndex={activeImage}
        onActiveIndexChange={setActiveImage}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
}
