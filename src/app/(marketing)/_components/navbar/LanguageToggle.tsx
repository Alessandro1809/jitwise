"use client";

import { useLocale } from "next-intl";

export const LanguageToggle = () => {
  const locale = useLocale();

  const toggle = () => {
    const next = locale === "en" ? "es" : "en";
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/60 transition hover:text-white"
      title={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
};
