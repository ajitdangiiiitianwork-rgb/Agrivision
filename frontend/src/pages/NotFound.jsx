// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, AlertCircle } from "lucide-react";
import FarmerButton from "../components/farmer/FarmerButton";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isMr = i18n.language === "mr";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {isMr ? "पृष्ठ सापडले नाही (४०४)" : "Page Not Found (404)"}
        </h1>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {isMr
            ? "तुम्ही शोधत असलेले पान उपलब्ध नाही. मुख्य पृष्ठावर जाण्यासाठी खालील बटण दाबा."
            : "The page you are looking for does not exist. Please return to the home screen."}
        </p>

        <Link to="/" className="inline-block w-full">
          <FarmerButton size="lg" variant="primary" icon={Home} className="w-full">
            {t("actions.home", { defaultValue: "Go to Home" })}
          </FarmerButton>
        </Link>
      </div>
    </div>
  );
}
