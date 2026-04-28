import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { MediaCard } from "../ui/MediaCard";

export function GatewaySection() {
  const { siteCopy } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-[#D8E0E7]/70 py-20">
      <img src={assetUrl("images/pcb-closeup.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 blur-[1px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.78),rgba(250,250,247,0.94))]" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
        <p className="section-kicker mb-8">{siteCopy.topShowcase.gatewayKicker}</p>
        <div className="grid gap-5 md:grid-cols-3">
          {siteCopy.topShowcase.gatewayCards.map((card) => (
            <MediaCard key={card.title} image={card.image} title={card.title} subtitle={card.subtitle} className="h-56" />
          ))}
        </div>
      </div>
    </section>
  );
}
