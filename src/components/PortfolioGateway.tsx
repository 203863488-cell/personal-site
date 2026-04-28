import { useState } from "react";
import { portfolioGatewayContent } from "../data/portfolioGateway";
import type { GatewayCard, GatewayCardKind, GatewayTrack } from "../data/portfolioGateway";
import type { Language } from "../types/language";

interface PortfolioGatewayProps {
  language: Language;
}

function GatewayVisual({ kind, imageUrl }: { kind: GatewayCardKind; imageUrl?: string }) {
  if (imageUrl) {
    return <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />;
  }

  return (
    <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/45" viewBox="0 0 420 190" fill="none" aria-hidden="true">
      {kind === "diagram" ? (
        <>
          <rect x="44" y="58" width="86" height="50" rx="4" stroke="currentColor" />
          <rect x="168" y="58" width="86" height="50" rx="4" stroke="currentColor" />
          <rect x="292" y="58" width="86" height="50" rx="4" stroke="currentColor" />
          <path d="M130 83H168M254 83H292" stroke="currentColor" />
          <path d="M64 135H356" stroke="currentColor" strokeOpacity="0.45" />
        </>
      ) : (
        <>
          <path d="M34 112C66 74 98 150 130 112C162 74 194 150 226 112C258 74 290 150 322 112C354 74 386 150 418 112" stroke="currentColor" />
          <path d="M42 54H136C166 54 166 92 196 92H380" stroke="currentColor" strokeOpacity="0.6" />
          <path d="M42 150H380" stroke="currentColor" strokeOpacity="0.4" />
        </>
      )}
    </svg>
  );
}

function GatewayCardItem({ card }: { card: GatewayCard }) {
  return (
    <article className="group relative h-64 overflow-hidden rounded-lg border border-white/60 bg-white shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
      <GatewayVisual kind={card.kind} imageUrl={card.imageUrl} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.08),rgba(17,24,39,0.54))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-2xl font-semibold">{card.title}</h3>
        <p className="mt-2 text-sm text-white/82">{card.subtitle}</p>
      </div>
      <div className="absolute inset-0 border border-white/0 transition group-hover:border-white/40" />
    </article>
  );
}

function TrackButton({
  track,
  active,
  onClick
}: {
  track: GatewayTrack;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full border-l-4 pl-6 text-left transition ${
        active ? "border-[#4F9CF9] opacity-100" : "border-transparent opacity-42 hover:opacity-70"
      }`}
    >
      <span className="text-3xl font-semibold">{track.title}</span>
      <span className="mt-3 block text-sm text-white/68">{track.subtitle}</span>
      {active && <span className="mt-5 block text-2xl leading-none">→</span>}
    </button>
  );
}

function TrackTiles({ track }: { track: GatewayTrack }) {
  return (
    <div className="grid min-h-[560px] grid-cols-1 sm:grid-cols-2">
      {track.tiles.map((tile, index) => (
        <article
          key={tile}
          className={`relative overflow-hidden border border-white/8 bg-[#273442] p-7 ${
            index === 2 ? "sm:col-span-2" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <svg className="absolute inset-0 h-full w-full text-[#7AA2F7]/28" viewBox="0 0 460 260" fill="none" aria-hidden="true">
            <path d="M40 90H150C180 90 180 58 210 58H360" stroke="currentColor" />
            <path d="M60 178C96 138 132 218 168 178C204 138 240 218 276 178C312 138 348 218 384 178" stroke="currentColor" />
          </svg>
          <div className="relative flex h-full min-h-40 items-end">
            <h4 className="text-2xl font-semibold">{tile}</h4>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PortfolioGateway({ language }: PortfolioGatewayProps) {
  const [activeTrack, setActiveTrack] = useState(0);
  const content = portfolioGatewayContent[language];
  const currentTrack = content.tracks[activeTrack];

  return (
    <section className="relative z-10 bg-[#FAFAF7]">
      <div className="relative isolate overflow-hidden border-y border-[#D8E0E7]/80 py-20 md:py-24">
        <img src="images/pcb-closeup.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,250,247,0.94),rgba(250,250,247,0.58)_48%,rgba(250,250,247,0.82))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_46%,rgba(255,255,255,0.72),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.48),transparent_52%)]" />
        <div className="relative w-full px-5 sm:px-8 lg:px-12">
          <p className="section-kicker mb-8">{language === "zh" ? "作品集入口" : "Portfolio Gateway"}</p>
          <div className="grid gap-5 md:grid-cols-3">
            {content.cards.map((card) => (
              <GatewayCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] text-white shadow-[0_24px_70px_rgba(31,41,51,0.14)]">
          <div className="grid min-h-[560px] lg:grid-cols-[0.38fr_0.62fr]">
            <div className="px-5 py-16 sm:px-8 lg:py-24 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
              <div className="space-y-10">
                {content.tracks.map((track, index) => (
                  <TrackButton
                    key={track.title}
                    track={track}
                    active={index === activeTrack}
                    onClick={() => setActiveTrack(index)}
                  />
                ))}
              </div>
            </div>

            <TrackTiles track={currentTrack} />
          </div>
        </div>
      </div>
    </section>
  );
}
