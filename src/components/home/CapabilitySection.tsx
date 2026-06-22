import { useState } from "react";
import { Activity, ArrowRight, Cpu, Layers, ZoomIn } from "lucide-react";
import type { PortfolioImage } from "../../types/portfolio";
import { useLanguage } from "../../languageContext";
import { responsiveImageSources } from "../../utils/responsiveImage";
import { ImageLightbox } from "../ui/ImageLightbox";
import { SignalField } from "../ui/SignalField";

const capabilityIcons = [Layers, Cpu, Activity];

export function CapabilitySection() {
  const [activeTrack, setActiveTrack] = useState(2);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const { siteCopy } = useLanguage();
  const capabilityTracks = siteCopy.topShowcase.capabilityTracks;
  const currentTrack = capabilityTracks[activeTrack];
  const denseTrack = currentTrack.tiles.length > 3;
  const galleryImages: PortfolioImage[] = currentTrack.tiles.flatMap((tile) =>
    typeof tile === "string"
      ? []
      : [
          {
            src: tile.image,
            title: tile.title,
            description: currentTrack.subtitle,
            kind: "prototype"
          }
        ]
  );

  return (
    <section className="content-auto relative mt-12 overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_24px_70px_rgba(31,41,51,0.14)] sm:mt-16">
      <SignalField tone="dark" density="rich" className="opacity-45" />
      <div className="relative grid min-h-[520px] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="px-5 py-12 sm:px-8 sm:py-16 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
          <div className="space-y-7 sm:space-y-10" role="tablist" aria-label={siteCopy.topShowcase.capabilityLabel}>
            {capabilityTracks.map((track, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];

              return (
                <button
                  key={track.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeTrack}
                  onClick={() => setActiveTrack(index)}
                  onMouseEnter={() => setActiveTrack(index)}
                  className={`block w-full border-l-4 pl-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9] sm:pl-6 ${
                    index === activeTrack ? "border-[#4F9CF9] opacity-100" : "border-transparent opacity-42 hover:opacity-75"
                  }`}
                >
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8 text-[#9BC9FF]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="balanced-text block text-[1.75rem] font-semibold leading-[1.14] sm:text-3xl sm:leading-[1.18]">{track.title}</span>
                  <span className="mt-2.5 block max-w-xs text-[0.95rem] leading-6 text-white/68 sm:mt-3 sm:text-sm">{track.subtitle}</span>
                  {index === activeTrack ? <ArrowRight aria-hidden="true" className="mt-4 h-5 w-5 text-[#9BC9FF] sm:mt-5" strokeWidth={1.8} /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-[420px] grid-cols-1 sm:min-h-[520px] sm:grid-cols-2" role="tabpanel" aria-label={currentTrack.title}>
          {currentTrack.tiles.map((tile, index) => {
            const tileTitle = typeof tile === "string" ? tile : tile.title;
            const tileImage = typeof tile === "string" ? undefined : tile.image;
            const imageIndex = tileImage ? galleryImages.findIndex((image) => image.src === tileImage) : -1;
            const sources = tileImage ? responsiveImageSources(tileImage) : null;

            return (
              <article
                key={tileTitle}
                className={`group relative overflow-hidden border border-white/8 bg-[#273442] transition duration-300 hover:bg-[#2E3E4E] ${
                  denseTrack ? "aspect-video min-h-0" : "p-5 sm:p-7"
                } ${
                  !denseTrack && index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                {tileImage && sources ? (
                  <img
                    width={1280}
                    height={720}
                    src={sources.original}
                    srcSet={sources.srcSet}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                    alt={tileTitle}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full opacity-74 transition duration-500 motion-safe:group-hover:scale-[1.03] group-hover:opacity-90 ${
                      denseTrack ? "object-cover" : "object-contain p-5 sm:p-6"
                    }`}
                  />
                ) : (
                  <SignalField tone="dark" className="opacity-55 transition duration-300 group-hover:opacity-80" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <div className={`absolute inset-0 transition duration-300 ${tileImage ? "bg-[linear-gradient(180deg,rgba(31,41,51,0.18),rgba(31,41,51,0.64))]" : "group-hover:bg-white/4"}`} />
                <div className={`relative flex h-full items-end ${denseTrack ? "p-5 sm:p-6" : "min-h-32 sm:min-h-40"}`}>
                  <h4 className={`balanced-text font-semibold leading-[1.14] transition duration-300 motion-safe:group-hover:-translate-y-1 sm:leading-[1.18] ${
                    denseTrack ? "text-xl sm:text-[1.35rem]" : "text-[1.7rem] sm:text-2xl"
                  }`}>{tileTitle}</h4>
                </div>
                {tileImage ? (
                  <button
                    type="button"
                    className="absolute inset-0 z-20 cursor-zoom-in rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#9BC9FF]"
                    onClick={() => setActiveImage(imageIndex)}
                    aria-label={`${siteCopy.projectDetail.openImage}: ${tileTitle}`}
                  >
                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#111827]/60 text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100">
                      <ZoomIn aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </button>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
      <ImageLightbox
        images={galleryImages}
        activeIndex={activeImage}
        onActiveIndexChange={setActiveImage}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
}
