import { useState } from "react";
import type { Language } from "../data/siteCopy";
import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";

interface NavbarProps {
  currentRoute: string;
}

const languageOptions: Array<{ language: Language; label: string }> = [
  { language: "zh", label: "中文" },
  { language: "en", label: "EN" }
];

function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, siteCopy } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[rgba(138,110,80,0.26)] bg-[rgba(247,237,220,0.8)] p-1 shadow-[0_10px_24px_rgba(61,38,18,0.08)] ${
        compact ? "w-fit" : ""
      }`}
      aria-label={siteCopy.nav.language}
    >
      {languageOptions.map((item) => (
        <button
          key={item.language}
          type="button"
          onClick={() => setLanguage(item.language)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            language === item.language
              ? "bg-[linear-gradient(180deg,#463226_0%,#2e2118_100%)] text-[#f7ebd8] shadow-[0_10px_20px_rgba(54,34,19,0.18)]"
              : "text-[var(--text-base)] hover:text-[var(--text-strong)]"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-faded)]`}
          aria-pressed={language === item.language}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Navbar({ currentRoute }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { siteCopy } = useLanguage();

  const isActive = (href: string) => {
    if (href === "#/") {
      return currentRoute === "/";
    }

    return currentRoute.startsWith(href.replace("#", ""));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(138,110,80,0.2)] bg-[rgba(239,228,208,0.82)] shadow-[0_18px_45px_rgba(58,36,18,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#/" className="text-base font-semibold text-[var(--text-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)]" onClick={() => setOpen(false)}>
          {siteCopy.nav.brand}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {siteCopy.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition hover:text-[var(--text-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)] ${
                isActive(item.href) ? "font-semibold text-[var(--text-strong)]" : "text-[var(--text-base)]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitch />
          <a href={assetUrl("resume.pdf")} download className="secondary-button py-2">
            {siteCopy.nav.resume}
          </a>
        </nav>

        <button
          type="button"
          aria-label={siteCopy.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(138,110,80,0.26)] bg-[rgba(247,237,220,0.8)] text-[var(--text-strong)] shadow-[0_10px_22px_rgba(61,38,18,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-faded)] md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-[rgba(138,110,80,0.2)] bg-[rgba(241,232,215,0.94)] md:hidden`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8">
          <LanguageSwitch compact />
          {siteCopy.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)] ${isActive(item.href) ? "font-semibold text-[var(--text-strong)]" : "text-[var(--text-base)]"}`}
            >
              {item.label}
            </a>
          ))}
          <a href={assetUrl("resume.pdf")} download className="secondary-button mt-2 w-fit py-2" onClick={() => setOpen(false)}>
            {siteCopy.nav.resume}
          </a>
        </div>
      </div>
    </header>
  );
}
