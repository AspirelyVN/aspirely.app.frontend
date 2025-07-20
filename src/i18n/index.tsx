import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NextIntlProvider, useTranslations } from "next-intl";
import Cookies from "js-cookie";

import en from "../messages/en.json";
import vi from "../messages/vi.json";

export type Locale = "en" | "vi";

const messages = { en, vi } as const;

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    (Cookies.get("lang") as Locale) || "vi"
  );

  const setLocale = (l: Locale) => {
    Cookies.set("lang", l, { expires: 365 });
    setLocaleState(l);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <NextIntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlProvider>
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  const t = useTranslations();
  return { ...ctx, t };
}
