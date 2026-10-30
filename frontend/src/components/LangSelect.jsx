// src/components/LangSelect.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LangSelect({ className = "" }) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e) => {
    const nextLang = e.target.value;
    i18n.changeLanguage(nextLang);
    try {
      localStorage.setItem("agrivision.lang", nextLang);
      localStorage.setItem("i18nextLng", nextLang);
      document.documentElement.lang = nextLang;
    } catch (err) {
      void err;
    }
  };

  const current = i18n.language || "mr";

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
      <label htmlFor="language-select" className="sr-only">
        {t("labels.language", { defaultValue: "Language" })}
      </label>
      <select
        id="language-select"
        value={current}
        onChange={handleLanguageChange}
        className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm min-h-[44px]"
      >
        <option value="mr">मराठी (Marathi)</option>
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
      </select>
    </div>
  );
}
