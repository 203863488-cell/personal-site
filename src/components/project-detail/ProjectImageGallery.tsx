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
    <section id="drawings" className="project-section paper-card p-6">
      <div>
        <p className="section-kicker">{siteCopy.projectDetail.imagesKicker}</p>
        <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[#111827]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {images.map((image, index) => {
          const sources = responsiveImageSources(image.src);

          return (
            <article key={image.src} className="overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-white/78">
              <button
                type="button"
                className="group relative block h-64 w-full overflow-hidden bg-[#F7F9FB] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4F9CF9]"
                onClick={() => setActiveImage(index)}
                aria-label={`${siteCopy.projectDetail.openImage}: ${image.title}`}
              >
                <span className="absolute left-3 top-3 z-10 rounded-full border border-white/70 bg-[#111827]/76 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">
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
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#111827]/82 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn aria-hidden="true" className="h-4 w-4" />
                  {siteCopy.projectDetail.openImage}
                </span>
              </button>
              <div className="border-t border-[#D8E0E7]/80 p-5">
                <h4 className="balanced-text font-semibold leading-[1.2] text-[#111827]">{image.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[#5D6673]">{image.description}</p>
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
