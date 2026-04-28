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
    <section id="contact" className="content-auto relative mt-16 overflow-hidden border-y border-[rgba(143,110,74,0.24)] bg-[linear-gradient(180deg,#36271d_0%,#2c2018_100%)]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(224,199,165,0.04)_0_1px,transparent_1px_34px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(240,212,165,0.12),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(100,132,118,0.12),transparent_18%)]" />
      <svg className="absolute inset-0 h-full w-full text-[rgba(111,127,138,0.22)]" viewBox="0 0 1440 320" fill="none" aria-hidden="true">
        <path d="M90 88H210C250 88 250 50 290 50H430" stroke="currentColor" />
        <path d="M770 100H930C982 100 982 58 1034 58H1220" stroke="currentColor" />
        <path d="M160 218C206 168 252 268 298 218C344 168 390 268 436 218C482 168 528 268 574 218" stroke="currentColor" />
        <path d="M880 230C920 184 960 276 1000 230C1040 184 1080 276 1120 230C1160 184 1200 276 1240 230" stroke="currentColor" />
      </svg>

      <div className="relative mx-auto flex min-h-[300px] max-w-7xl flex-col justify-center gap-8 px-5 py-16 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-3xl">
          <p className="section-kicker">{home.contactKicker}</p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">{home.contactTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f0dfc8]/72">{home.contactDescription}</p>
          <p className="mt-3 h-5 text-xs font-medium text-[var(--accent-oxide-soft)]" aria-live="polite">
            {copied ? home.emailFeedback : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton href="mailto:example@email.com" variant="ghostDark" onClick={handleEmailClick}>
            {home.email}
          </ActionButton>
          <ActionButton href={assetUrl("resume.pdf")} download className="bg-[rgba(248,239,224,0.92)] font-semibold text-[var(--text-strong)] hover:bg-[rgba(250,243,232,0.98)]">
            {home.download}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
