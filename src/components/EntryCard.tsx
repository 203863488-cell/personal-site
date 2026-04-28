import { useLanguage } from "../languageContext";
import { assetUrl } from "../utils/assetUrl";
import { Pill } from "./ui/Pill";

interface EntryCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  accent: "blue" | "green";
}

export function EntryCard({ title, subtitle, description, href, image, tags, accent }: EntryCardProps) {
  const { siteCopy } = useLanguage();
  const accentColor = accent === "blue" ? "text-[#4F9CF9]" : "text-[#5CC8A7]";
  const accentBorder = accent === "blue" ? "group-hover:border-[#9BC9FF]" : "group-hover:border-[#9EDFCF]";

  return (
    <a
      href={href}
      className={`group relative min-h-[31rem] overflow-hidden rounded-[1.75rem] border border-[#D8E0E7]/90 bg-white/78 shadow-[0_22px_70px_rgba(31,41,51,0.07)] backdrop-blur-xl transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F9CF9] hover:shadow-[0_28px_80px_rgba(31,41,51,0.1)] motion-safe:hover:-translate-y-1 ${accentBorder}`}
    >
      <img
        src={assetUrl(image)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-0 h-56 w-full object-cover opacity-72 transition duration-500 motion-safe:group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,247,0.18),rgba(250,250,247,0.92)_42%,rgba(250,250,247,0.98))]" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-white/20 blur-2xl transition duration-700 motion-safe:group-hover:left-full" />
      <svg className="absolute right-6 top-8 h-56 w-[72%] text-[#4F9CF9]/28" viewBox="0 0 520 260" fill="none" aria-hidden="true">
        <rect x="70" y="42" width="100" height="52" rx="5" stroke="currentColor" />
        <rect x="240" y="42" width="100" height="52" rx="5" stroke="currentColor" />
        <path d="M170 68H240" stroke="currentColor" />
        <path d="M44 160H150C184 160 184 118 218 118H390" stroke="currentColor" />
        <path d="M62 215C96 175 130 255 164 215C198 175 232 255 266 215C300 175 334 255 368 215" stroke="currentColor" />
      </svg>

      <div className="relative flex h-full min-h-[31rem] flex-col justify-end p-7 sm:p-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentColor}`}>{subtitle}</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111827] sm:text-4xl">{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-[#5D6673]">{description}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} className="px-3 py-1.5 text-xs">
              {tag}
            </Pill>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#111827]">
          {siteCopy.common.enter}
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#D8E0E7] bg-white transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </a>
  );
}
