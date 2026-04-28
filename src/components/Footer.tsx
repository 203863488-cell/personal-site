import type { Language } from "../types/language";

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-[#D8E0E7]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[#6B7280] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>{language === "zh" ? "蓝宏涛 · 求职项目能力网站" : "Lantao Lan · Career Portfolio"}</p>
        <p>Vite + React + TypeScript + Tailwind CSS · GitHub Pages Ready</p>
      </div>
    </footer>
  );
}
