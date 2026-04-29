import { useState } from "react";
import { useLanguage } from "../../languageContext";
import { assetUrl } from "../../utils/assetUrl";
import { ActionButton } from "../ui/ActionButton";

export function ContactBand() {
  const [copied, setCopied] = useState(false);
  const { siteCopy } = useLanguage();
  const home = siteCopy.home;

  const handleEmailClick = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="contact" className="content-auto relative mt-12 overflow-hidden border-y border-[#D8E0E7] bg-[#1F2933] sm:mt-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg className="absolute inset-0 h-full w-full text-[#4F9CF9]/25" viewBox="0 0 1440 320" fill="none" aria-hidden="true">
        <path d="M90 88H210C250 88 250 50 290 50H430" stroke="currentColor" />
        <path d="M770 100H930C982 100 982 58 1034 58H1220" stroke="currentColor" />
        <path d="M160 218C206 168 252 268 298 218C344 168 390 268 436 218C482 168 528 268 574 218" stroke="currentColor" />
        <path d="M880 230C920 184 960 276 1000 230C1040 184 1080 276 1120 230C1160 184 1200 276 1240 230" stroke="currentColor" />
      </svg>

      <div className="relative mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center gap-6 px-5 py-12 text-white sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-3xl">
          <p className="section-kicker">{home.contactKicker}</p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">{home.contactTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">{home.contactDescription}</p>
          <p className="mt-3 h-5 text-xs font-medium text-[#9BC9FF]" aria-live="polite">
            {copied ? home.emailFeedback : ""}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ActionButton href="mailto:example@email.com" variant="ghostDark" onClick={handleEmailClick} className="w-full sm:w-auto">
            {home.email}
          </ActionButton>
          <ActionButton href={assetUrl("resume.pdf")} download className="w-full bg-white font-semibold text-[#111827] hover:bg-[#EEF4FA] sm:w-auto">
            {home.download}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
