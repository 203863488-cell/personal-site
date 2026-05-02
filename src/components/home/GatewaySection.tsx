import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { MediaCard } from "../ui/MediaCard";
import { Reveal } from "../ui/Reveal";
import { SignalField } from "../ui/SignalField";

export function GatewaySection() {
  const { siteCopy } = useLanguage();

  return (
    <section className="content-auto relative overflow-hidden border-b border-[#D8E0E7]/70 py-16 sm:py-20">
      <img
        src={assetUrl("images/pcb-closeup.jpg")}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-18 blur-[1px]"
      />
      <SignalField className="opacity-44" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.68),rgba(250,250,247,0.88))]" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
        <p className="section-kicker mb-8">{siteCopy.topShowcase.gatewayKicker}</p>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {siteCopy.topShowcase.gatewayCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 70}>
              <MediaCard image={card.image} title={card.title} subtitle={card.subtitle} className="h-[11rem] sm:h-56" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
