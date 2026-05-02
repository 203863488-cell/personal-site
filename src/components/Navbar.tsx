import { useEffect, useState } from "react";
import { ArrowRight, Download, Languages, Menu, X } from "lucide-react";
import type { Language } from "../data/siteCopy";
import { useLanguage } from "../languageContext";
import { portfolioHrefs } from "../routes/portfolioRoutes";
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
      className={`inline-flex items-center rounded-full border border-[#D8E0E7] bg-white/70 p-1 ${
        compact ? "w-fit" : ""
      }`}
      aria-label={siteCopy.nav.language}
    >
      {!compact ? <Languages aria-hidden="true" className="ml-2 h-3.5 w-3.5 text-[#6B7280]" strokeWidth={1.8} /> : null}
      {languageOptions.map((item) => (
        <button
          key={item.language}
          type="button"
          onClick={() => setLanguage(item.language)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            language === item.language ? "bg-[#1F2933] text-white shadow-sm" : "text-[#55616E] hover:text-[#111827]"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]`}
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
  const drawerId = "mobile-navigation-drawer";

  const isActive = (href: string) => {
    if (href === "#/") {
      return currentRoute === "/";
    }

    return currentRoute.startsWith(href.replace("#", ""));
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8E0E7]/70 bg-[#F8FAF7]/86 backdrop-blur-xl">
      <div className="navbar-shell mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href={portfolioHrefs.home}
          className="navbar-shell__brand text-base font-semibold text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9]"
          onClick={() => setOpen(false)}
        >
          {siteCopy.nav.brand}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {siteCopy.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9] ${
                isActive(item.href) ? "font-semibold text-[#111827]" : "text-[#55616E]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitch />
          <a href={assetUrl("resume.pdf")} download className="secondary-button gap-2 py-2">
            <Download aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            <span>{siteCopy.nav.resume}</span>
          </a>
        </nav>

        <button
          type="button"
          aria-label={siteCopy.nav.menu}
          aria-controls={drawerId}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="navbar-menu-trigger inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8E0E7] bg-white/80 text-[#1F2933] shadow-[0_10px_30px_rgba(31,41,51,0.08)] transition hover:border-[#BFD0DF] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] md:hidden"
        >
          {open ? <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} /> : <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="mobile-drawer-backdrop absolute inset-0 bg-[#111827]/34 backdrop-blur-[6px]"
            aria-label={siteCopy.nav.menu}
            onClick={() => setOpen(false)}
          />

          <aside
            id={drawerId}
            role="dialog"
            aria-modal="true"
            className="mobile-drawer-panel fixed bottom-0 right-0 top-0 flex h-dvh w-[min(88vw,23.5rem)] flex-col overflow-hidden border-l border-white/70 bg-[#F8FAF7]/96 shadow-[-28px_0_80px_rgba(31,41,51,0.24)] backdrop-blur-2xl"
            aria-label={siteCopy.nav.menu}
          >
            <div className="pointer-events-none absolute -right-16 top-10 h-44 w-44 rounded-full bg-[#5CC8A7]/18 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-28 h-48 w-48 rounded-full bg-[#4F9CF9]/16 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(31,41,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,41,51,0.045)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45" />

            <div className="relative flex items-center justify-between px-5 pb-4 pt-5">
              <a
                href={portfolioHrefs.home}
                className="min-w-0 pr-4 text-base font-semibold text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9]"
                onClick={() => setOpen(false)}
              >
                <span className="block truncate">{siteCopy.nav.brand}</span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-[0.2em] text-[#6B7280]">Portfolio</span>
              </a>

              <button
                type="button"
                aria-label={siteCopy.nav.menu}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8E0E7] bg-white/78 text-[#1F2933] shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]"
              >
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 pb-6">
              <div className="rounded-[1.75rem] border border-[#D8E0E7]/80 bg-white/70 p-3 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
                <div className="flex items-center justify-between gap-3 px-1 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">{siteCopy.nav.language}</span>
                  <LanguageSwitch compact />
                </div>

                <nav className="grid gap-2" aria-label={siteCopy.nav.menu}>
                  {siteCopy.nav.items.map((item, index) => {
                    const active = isActive(item.href);

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`mobile-drawer-link group relative overflow-hidden rounded-2xl border px-4 py-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] ${
                          active
                            ? "border-[#1F2933]/18 bg-[#1F2933] text-white shadow-[0_16px_36px_rgba(31,41,51,0.18)]"
                            : "border-[#E4E9EF] bg-[#F8FAF7]/76 text-[#1F2933] hover:border-[#BFD0DF] hover:bg-white"
                        }`}
                        style={{ animationDelay: `${index * 45}ms` }}
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className={`absolute right-3 top-3 text-[0.64rem] font-semibold tracking-[0.18em] ${
                            active ? "text-white/45" : "text-[#A7B2BE]"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <span className="relative flex items-end justify-between gap-5">
                          <span className="text-lg font-semibold leading-tight">{item.label}</span>
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition group-hover:translate-x-0.5 ${
                              active ? "bg-white/16 text-white" : "bg-white text-[#4F9CF9] shadow-sm"
                            }`}
                            aria-hidden="true"
                          >
                            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              <a
                href={assetUrl("resume.pdf")}
                download
                className="primary-button mt-4 min-h-12 w-full gap-2 rounded-2xl text-base shadow-[0_18px_45px_rgba(31,41,51,0.18)]"
                onClick={() => setOpen(false)}
              >
                <Download aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                <span>{siteCopy.nav.resume}</span>
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
