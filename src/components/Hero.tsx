import { profile } from "../data/profile";
import type { Language } from "../types/language";

interface HeroProps {
  language: Language;
}

const heroText = {
  zh: {
    kicker: "Power Electronics Portfolio",
    title: profile.title,
    subtitle: profile.subtitle,
    viewProjects: "查看项目",
    resume: "下载简历"
  },
  en: {
    kicker: "Power Electronics Portfolio",
    title: "Power Electronics Hardware & Embedded Control",
    subtitle:
      "Focused on power converters, isolated sampling, STM32G4 digital control, and engineering validation from schematic and PCB to soldering, code, and test.",
    viewProjects: "View Projects",
    resume: "Resume"
  }
};

export function Hero({ language }: HeroProps) {
  const text = heroText[language];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="section-shell py-16 md:py-24">
        <div className="relative overflow-hidden rounded-lg border border-[#D8E0E7] bg-white/46 shadow-[0_24px_80px_rgba(31,41,51,0.06)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(79,156,249,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(79,156,249,0.045)_1px,transparent_1px)] bg-[size:34px_34px]" />
          <svg
            className="hero-linework absolute right-0 top-0 hidden h-full w-[64%] text-[#4F9CF9]/34 md:block"
            viewBox="0 0 760 560"
            fill="none"
            aria-hidden="true"
          >
            <rect x="92" y="86" width="126" height="58" rx="4" stroke="currentColor" />
            <rect x="340" y="86" width="126" height="58" rx="4" stroke="currentColor" />
            <rect x="588" y="86" width="126" height="58" rx="4" stroke="currentColor" />
            <path d="M218 115H340M466 115H588" stroke="currentColor" />
            <path d="M84 225H190L230 170H370L410 225H520L560 170H715" stroke="currentColor" strokeWidth="1.4" />
            <path d="M84 306H214C254 306 254 250 294 250H420C460 250 460 335 500 335H716" stroke="currentColor" />
            <path
              d="M86 414C124 374 162 454 200 414C238 374 276 454 314 414C352 374 390 454 428 414C466 374 504 454 542 414"
              stroke="currentColor"
            />
            <path d="M64 488H660" stroke="currentColor" strokeOpacity="0.32" />
          </svg>

          <div className="relative z-10 grid min-h-[560px] gap-10 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-16">
            <div className="flex max-w-2xl flex-col justify-center">
              <p className="section-kicker">{text.kicker}</p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] text-[#111827] sm:text-5xl lg:text-6xl">
                {profile.name}
                <span className="block pt-5 text-2xl font-medium leading-tight text-[#1F2933] sm:text-3xl lg:text-4xl">
                  {text.title}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#5F6B77] sm:text-lg">{text.subtitle}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {profile.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#projects" className="primary-button">
                  {text.viewProjects}
                </a>
                <a href="./resume.pdf" download className="secondary-button">
                  {text.resume}
                </a>
                <a href="https://github.com/yourname" target="_blank" rel="noreferrer" className="secondary-button">
                  GitHub
                </a>
              </div>
            </div>

            <div className="hidden items-center justify-center lg:flex">
              <div className="w-full max-w-md rounded-lg border border-[#D8E0E7]/80 bg-white/54 p-5 backdrop-blur-sm">
                <div className="mb-4 h-px bg-gradient-to-r from-[#4F9CF9]/45 via-[#D8E0E7] to-transparent" />
                <div className="grid gap-3">
                  {profile.dashboard.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-[#D8E0E7]/70 py-3 last:border-b-0">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{item.label}</span>
                      <span className="text-2xl font-semibold text-[#111827]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-px border-t border-[#D8E0E7] bg-[#D8E0E7] sm:grid-cols-2 lg:hidden">
            {profile.dashboard.map((item) => (
              <div key={item.label} className="bg-white/82 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#111827]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
