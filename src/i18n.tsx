import { useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Language } from "./data/siteCopy";
import { LanguageContext } from "./languageContext";

const storageKey = "portfolio-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  return window.localStorage.getItem(storageKey) === "en" ? "en" : "zh";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const currentCopy = copy[language];

    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = currentCopy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", currentCopy.meta.description);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      siteCopy: copy[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
