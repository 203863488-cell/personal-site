import type { PortfolioProject } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";

interface ProjectImageGalleryProps {
  project: PortfolioProject;
}

/**
 * Optional project media area.
 *
 * Projects can be published before detailed photos are ready; the null return
 * keeps that data state explicit without forcing placeholder content.
 */
export function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const { siteCopy } = useLanguage();

  if (!project.detailImages?.length) {
    return null;
  }

  return (
    <section className="paper-card p-6">
      <div>
        <p className="section-kicker">{siteCopy.projectDetail.imagesKicker}</p>
        <h3 className="balanced-text mt-3 text-2xl font-semibold leading-[1.18] text-[#111827]">{siteCopy.projectDetail.imagesTitle}</h3>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {project.detailImages.map((image) => (
          <article key={image.src} className="overflow-hidden rounded-lg border border-[#D8E0E7]/90 bg-white/78">
            <div className="relative h-64 overflow-hidden bg-[#F7F9FB]">
              <img
                src={assetUrl(image.src)}
                alt={image.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-3"
              />
            </div>
            <div className="border-t border-[#D8E0E7]/80 p-5">
              <h4 className="balanced-text font-semibold leading-[1.2] text-[#111827]">{image.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[#5D6673]">{image.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
