import { useLanguage } from "../../languageContext";
import { responsiveImageSources } from "../../utils/responsiveImage";
import { MediaCard } from "../ui/MediaCard";
import { Reveal } from "../ui/Reveal";
import { SignalField } from "../ui/SignalField";

export function GatewaySection() {
  const { siteCopy } = useLanguage();
  const backgroundImage = responsiveImageSources("images/pcb-closeup.jpg");

  return (
    <section className="content-auto relative overflow-hidden border-b border-[#D8E0E7]/70 py-16 sm:py-20">
      <img
        src={backgroundImage.original}
        srcSet={backgroundImage.srcSet}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-18 blur-[1px]"
      />
      <SignalField className="opacity-44" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.68),rgba(250,250,247,0.88))]" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
        <p className="section-kicker mb-8">{siteCopy.topShowcase.gatewayKicker}</p>
        <div className="mobile-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {siteCopy.topShowcase.gatewayCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 70} className="min-w-[82vw] max-w-[22rem] shrink-0 snap-start sm:min-w-0 sm:max-w-none">
              <MediaCard href={card.href} image={card.image} title={card.title} subtitle={card.subtitle} className="block h-[11rem] sm:h-56 xl:h-[13rem]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
