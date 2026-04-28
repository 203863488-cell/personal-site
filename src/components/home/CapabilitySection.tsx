import { useState } from "react";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";

export function CapabilitySection() {
  const [activeTrack, setActiveTrack] = useState(0);
  const { siteCopy } = useLanguage();
  const capabilityTracks = siteCopy.topShowcase.capabilityTracks;
  const currentTrack = capabilityTracks[activeTrack];

  return (
    <section className="content-auto mt-16 overflow-hidden border-y border-[rgba(143,110,74,0.28)] bg-[linear-gradient(180deg,#3b2b20_0%,#2d2119_100%)] text-[#f7eddc] shadow-[0_30px_90px_rgba(41,24,12,0.28)]">
      <div className="grid min-h-[520px] lg:grid-cols-[0.38fr_0.62fr]">
        <div className="px-5 py-16 sm:px-8 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
          <div className="space-y-10" role="tablist" aria-label={siteCopy.topShowcase.capabilityLabel}>
            {capabilityTracks.map((track, index) => (
              <button
                key={track.title}
                type="button"
                role="tab"
                aria-selected={index === activeTrack}
                onClick={() => setActiveTrack(index)}
                onMouseEnter={() => setActiveTrack(index)}
                className={`block w-full border-l-4 pl-6 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)] ${
                  index === activeTrack ? "border-[var(--accent-brass)] opacity-100" : "border-transparent opacity-42 hover:opacity-75"
                }`}
              >
                <span className="balanced-text block text-2xl font-semibold leading-[1.18] sm:text-3xl">{track.title}</span>
                <span className="mt-3 block max-w-xs text-sm leading-6 text-[#f1e1ca]/72">{track.subtitle}</span>
                {index === activeTrack && <span className="mt-5 block text-2xl leading-none text-[var(--accent-brass)]">→</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-[520px] grid-cols-1 sm:grid-cols-2" role="tabpanel" aria-label={currentTrack.title}>
          {currentTrack.tiles.map((tile, index) => {
            const tileTitle = typeof tile === "string" ? tile : tile.title;
            const tileImage = typeof tile === "string" ? undefined : tile.image;

            return (
              <article
                key={tileTitle}
                className={`group relative overflow-hidden border border-[rgba(225,197,158,0.08)] bg-[rgba(70,51,37,0.84)] p-7 transition duration-300 hover:bg-[rgba(82,60,43,0.92)] ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                {tileImage && (
                  <img
                    src={assetUrl(tileImage)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain p-6 opacity-74 transition duration-500 motion-safe:group-hover:scale-[1.03] group-hover:opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(227,205,173,0.04)_0_1px,transparent_1px_40px)]" />
                <div className={`absolute inset-0 transition duration-300 ${tileImage ? "bg-[linear-gradient(180deg,rgba(63,46,31,0.18),rgba(27,19,14,0.68))]" : "group-hover:bg-[rgba(255,244,223,0.04)]"}`} />
                {!tileImage && (
                  <svg className="absolute inset-0 h-full w-full text-[rgba(176,132,86,0.18)] transition duration-300 group-hover:text-[rgba(176,132,86,0.32)]" viewBox="0 0 460 260" fill="none" aria-hidden="true">
                    <path d="M40 90H150C180 90 180 58 210 58H360" stroke="currentColor" />
                    <path d="M60 178C96 138 132 218 168 178C204 138 240 218 276 178C312 138 348 218 384 178" stroke="currentColor" />
                  </svg>
                )}
                <div className="relative flex h-full min-h-40 items-end">
                  <h4 className="balanced-text text-2xl font-semibold leading-[1.18] transition duration-300 motion-safe:group-hover:-translate-y-1">{tileTitle}</h4>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
