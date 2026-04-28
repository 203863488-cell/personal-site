import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { MediaCard } from "../ui/MediaCard";

export function GatewaySection() {
  const { siteCopy } = useLanguage();

  return (
    <section className="content-auto relative overflow-hidden border-b border-[rgba(143,110,74,0.18)] py-20">
      <img
        src={assetUrl("images/pcb-closeup.jpg")}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-16 blur-[2px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,233,214,0.72),rgba(242,230,208,0.88))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,212,165,0.16),transparent_24%),radial-gradient(circle_at_80%_26%,rgba(104,121,131,0.08),transparent_18%)]" />
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
