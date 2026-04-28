import { useLanguage } from "../languageContext";

export function Footer() {
  const { siteCopy } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-[rgba(143,110,74,0.18)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[var(--text-muted)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>{siteCopy.footer.left}</p>
        <p>{siteCopy.footer.right}</p>
      </div>
    </footer>
  );
}
