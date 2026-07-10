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
    <section className="content-auto relative mt-6 overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_24px_70px_rgba(31,41,51,0.14)] sm:mt-16">
      <SignalField tone="dark" density="rich" className="opacity-45" />
      <div className="relative grid sm:min-h-[520px] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="px-4 py-4 sm:px-8 sm:py-16 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
          <div className="grid grid-cols-3 rounded-xl border border-white/10 bg-white/7 p-1 shadow-[0_14px_38px_rgba(8,17,29,0.18)] sm:hidden" role="tablist" aria-label={siteCopy.topShowcase.capabilityLabel}>
            {capabilityTracks.map((track, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const active = index === activeTrack;

              return (
                <button
                  key={track.title}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTrack(index)}
                  className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9BC9FF] ${
                    active ? "bg-white text-[#111827] shadow-sm" : "text-white/66"
                  }`}
                >
                  <Icon aria-hidden="true" className={`h-3.5 w-3.5 ${active ? "text-[#2563EB]" : "text-[#9BC9FF]"}`} strokeWidth={1.8} />
                  <span className="w-full truncate text-[0.66rem] font-semibold leading-none">{track.title}</span>
                </button>
              );
            })}
          </div>
          <p className="mobile-line-clamp-2 mt-2.5 text-[0.78rem] leading-5 text-white/68 sm:hidden">{currentTrack.subtitle}</p>

          <div className="hidden sm:block sm:space-y-10" role="tablist" aria-label={siteCopy.topShowcase.capabilityLabel}>
            {capabilityTracks.map((track, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const active = index === activeTrack;

              return (
                <button
                  key={track.title}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTrack(index)}
                  onMouseEnter={() => setActiveTrack(index)}
                  className={`block min-w-[12.5rem] snap-start rounded-xl border p-3 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9] sm:min-w-0 sm:w-full sm:rounded-none sm:border-0 sm:border-l-4 sm:bg-transparent sm:p-0 sm:pl-6 ${
                    active ? "border-[#4F9CF9]/60 bg-white/10 opacity-100 sm:border-[#4F9CF9]" : "border-white/10 bg-white/5 opacity-62 hover:opacity-85 sm:border-transparent sm:bg-transparent sm:opacity-42 sm:hover:opacity-75"
                  }`}
                >
                  <span className="mb-2 grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-white/8 text-[#9BC9FF] sm:mb-4 sm:h-10 sm:w-10">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                  </span>
                  <span className="balanced-text block text-base font-semibold leading-[1.12] sm:text-3xl sm:leading-[1.18]">{track.title}</span>
                  <span className="mt-1.5 block max-w-xs text-[0.72rem] leading-4 text-white/68 sm:mt-3 sm:text-sm sm:leading-6">{track.subtitle}</span>
                  {active ? <ArrowRight aria-hidden="true" className="mt-4 hidden h-5 w-5 text-[#9BC9FF] sm:mt-5 sm:block" strokeWidth={1.8} /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`grid min-h-0 gap-1.5 px-4 pb-4 sm:min-h-[520px] sm:gap-0 sm:px-0 sm:pb-0 ${
            denseTrack ? "grid-cols-2 sm:grid-cols-3 sm:grid-rows-2" : "grid-cols-3 sm:grid-cols-2"
          }`}
          role="tabpanel"
          aria-label={currentTrack.title}
        >
          {currentTrack.tiles.map((tile, index) => {
            const tileTitle = typeof tile === "string" ? tile : tile.title;
            const tileImage = typeof tile === "string" ? undefined : tile.image;
            const imageIndex = tileImage ? galleryImages.findIndex((image) => image.src === tileImage) : -1;
            const sources = tileImage ? responsiveImageSources(tileImage) : null;

            return (
              <article
                key={tileTitle}
                className={`group relative h-[5.65rem] overflow-hidden rounded-md border border-white/8 bg-[#273442] transition duration-300 hover:bg-[#2E3E4E] sm:h-auto sm:rounded-none ${
                  denseTrack ? "sm:min-h-0" : "sm:p-7"
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
                    sizes={
                      denseTrack
                        ? "(min-width: 1024px) 21vw, (min-width: 640px) 33vw, 50vw"
                        : "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 33vw"
                    }
                    alt={tileTitle}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full opacity-74 transition duration-500 motion-safe:group-hover:scale-[1.03] group-hover:opacity-90 ${
                      denseTrack ? "object-cover" : "object-cover sm:object-contain sm:p-6"
                    }`}
                  />
                ) : (
                  <SignalField tone="dark" className="opacity-55 transition duration-300 group-hover:opacity-80" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <div className={`absolute inset-0 transition duration-300 ${tileImage ? "bg-[linear-gradient(180deg,rgba(31,41,51,0.18),rgba(31,41,51,0.64))]" : "group-hover:bg-white/4"}`} />
                <div className={`relative flex h-full items-end ${denseTrack ? "p-2.5 sm:p-6" : "p-2.5 sm:min-h-40 sm:p-0"}`}>
                  <h4 className={`balanced-text font-semibold leading-[1.14] transition duration-300 motion-safe:group-hover:-translate-y-1 sm:leading-[1.18] ${
                    denseTrack ? "text-[0.82rem] sm:text-[1.35rem]" : "text-[0.76rem] sm:text-2xl"
                  }`}>{tileTitle}</h4>
                </div>
                {tileImage ? (
                  <button
                    type="button"
                    className="absolute inset-0 z-20 cursor-zoom-in rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#9BC9FF]"
                    onClick={() => setActiveImage(imageIndex)}
                    aria-label={`${siteCopy.projectDetail.openImage}: ${tileTitle}`}
                  >
                    <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-[#111827]/60 text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10">
                      <ZoomIn aria-hidden="true" className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
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
