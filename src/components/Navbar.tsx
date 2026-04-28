import type { Language } from "../types/language";

interface NavbarProps {
  open: boolean;
  language: Language;
  onToggle: () => void;
  onLanguageToggle: () => void;
}

const navItems = [
  { zh: "项目", en: "Projects", href: "#projects" },
  { zh: "技能", en: "Skills", href: "#skills" },
  { zh: "经历", en: "Timeline", href: "#timeline" },
  { zh: "联系", en: "Contact", href: "#contact" }
];

export function Navbar({ open, language, onToggle, onLanguageToggle }: NavbarProps) {
  const downloadLabel = language === "zh" ? "下载简历" : "Resume";
  const languageLabel = language === "zh" ? "EN" : "中文";

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8E0E7]/70 bg-[#F8FAF7]/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#top" className="text-base font-semibold text-[#111827]">
          蓝宏涛
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[#55616E] transition hover:text-[#111827]">
              {item[language]}
            </a>
          ))}
          <button
            type="button"
            onClick={onLanguageToggle}
            className="rounded-full border border-[#D8E0E7] bg-white/70 px-3 py-2 text-sm font-medium text-[#1F2933] transition hover:border-[#AFC0CF] hover:bg-white"
            aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
          >
            {languageLabel}
          </button>
          <a href="./resume.pdf" download className="secondary-button py-2">
            {downloadLabel}
          </a>
        </nav>

        <button
          type="button"
          aria-label="切换菜单"
          aria-expanded={open}
          onClick={onToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D8E0E7] bg-white/70 text-[#1F2933] md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-[#D8E0E7]/70 bg-[#F8FAF7]/92 md:hidden`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[#55616E]">
              {item[language]}
            </a>
          ))}
          <button
            type="button"
            onClick={onLanguageToggle}
            className="secondary-button mt-2 w-fit py-2"
          >
            {languageLabel}
          </button>
          <a href="./resume.pdf" download className="secondary-button mt-2 w-fit py-2">
            {downloadLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
