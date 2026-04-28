import { useLanguage } from "../i18n";

export function Footer() {
  const { siteCopy } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-[#D8E0E7]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[#6B7280] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>{siteCopy.footer.left}</p>
        <p>{siteCopy.footer.right}</p>
      </div>
    </footer>
  );
}
