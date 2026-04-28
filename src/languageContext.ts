import { createContext, useContext } from "react";
import type { Language, SiteCopy } from "./data/siteCopy";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  siteCopy: SiteCopy;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return value;
}
