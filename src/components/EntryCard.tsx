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
  const accentColor = accent === "blue" ? "text-[var(--accent-brass)]" : "text-[var(--accent-oxide)]";
  const accentBorder = accent === "blue" ? "group-hover:border-[rgba(161,106,59,0.5)]" : "group-hover:border-[rgba(100,132,118,0.52)]";

  return (
    <a
      href={href}
      className={`group relative min-h-[31rem] overflow-hidden rounded-[1.9rem] border border-[rgba(143,110,74,0.3)] bg-[rgba(248,239,224,0.82)] shadow-[0_24px_70px_rgba(69,46,26,0.12)] backdrop-blur-xl transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-faded)] hover:shadow-[0_30px_82px_rgba(41,24,12,0.18)] motion-safe:hover:-translate-y-1 ${accentBorder}`}
    >
      <img
        src={assetUrl(image)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-0 h-56 w-full object-cover opacity-68 transition duration-500 motion-safe:group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,235,214,0.16),rgba(242,229,205,0.62)_38%,rgba(243,231,212,0.92))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(240,214,170,0.22),transparent_26%),radial-gradient(circle_at_78%_24%,rgba(104,124,135,0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-[rgba(255,244,221,0.2)] blur-2xl transition duration-700 motion-safe:group-hover:left-full" />
      <svg className="absolute right-6 top-8 h-56 w-[72%] text-[rgba(104,121,131,0.22)]" viewBox="0 0 520 260" fill="none" aria-hidden="true">
        <rect x="70" y="42" width="100" height="52" rx="5" stroke="currentColor" />
        <rect x="240" y="42" width="100" height="52" rx="5" stroke="currentColor" />
        <path d="M170 68H240" stroke="currentColor" />
        <path d="M44 160H150C184 160 184 118 218 118H390" stroke="currentColor" />
        <path d="M62 215C96 175 130 255 164 215C198 175 232 255 266 215C300 175 334 255 368 215" stroke="currentColor" />
      </svg>

      <div className="relative flex h-full min-h-[31rem] flex-col px-7 pb-7 pt-[13.75rem] sm:px-8 sm:pb-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentColor}`}>{subtitle}</p>
        <h2 className="balanced-text mt-4 text-3xl font-semibold leading-[1.16] text-[var(--text-strong)] sm:text-4xl">{title}</h2>
        <p className="copy-text mt-5 max-w-xl">{description}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} className="px-3 py-1.5 text-xs">
              {tag}
            </Pill>
          ))}
        </div>

        <div className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold text-[var(--text-strong)]">
          {siteCopy.common.enter}
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(143,110,74,0.28)] bg-[rgba(250,243,232,0.88)] transition group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}
