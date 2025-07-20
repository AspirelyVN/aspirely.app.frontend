"use client";
import { useTranslation, Locale } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const switchTo = (l: Locale) => () => setLocale(l);
  return (
    <div className="flex gap-2 justify-end mb-4">
      <button
        onClick={switchTo("en")}
        disabled={locale === "en"}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        EN
      </button>
      <button
        onClick={switchTo("vi")}
        disabled={locale === "vi"}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        VI
      </button>
    </div>
  );
}
