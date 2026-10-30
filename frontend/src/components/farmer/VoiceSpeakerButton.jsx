// src/components/farmer/VoiceSpeakerButton.jsx
import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import useVoiceAssistant from "../../hooks/useVoiceAssistant";

export default function VoiceSpeakerButton({
  text,
  lang,
  className = "",
  size = "md", // "sm" | "md" | "lg"
  label
}) {
  const { t, i18n } = useTranslation();
  const { isSpeaking, speak, stopSpeaking } = useVoiceAssistant();

  const rawLang = (lang || i18n.language || "mr").toLowerCase();
  const activeLang = rawLang.startsWith("hi") ? "hi" : rawLang.startsWith("mr") ? "mr" : "en";

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else if (text) {
      speak(text, activeLang);
    }
  };

  const defaultLabel = isSpeaking
    ? t("disease.stopAudioBtn", { defaultValue: "Stop Speaking" })
    : label || t("actions.speak", { defaultValue: "Listen" });

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-h-[36px]",
    md: "px-3.5 py-2 text-sm gap-2 min-h-[44px]",
    lg: "px-4 py-2.5 text-base gap-2.5 min-h-[50px]"
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isSpeaking ? "Stop speaking" : `Listen: ${text?.substring(0, 40)}...`}
      className={`inline-flex items-center justify-center font-medium rounded-xl border transition-all duration-150 cursor-pointer select-none ${
        isSpeaking
          ? "bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200 animate-pulse dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700"
          : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800"
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-5 h-5 text-amber-700 dark:text-amber-300 flex-shrink-0 animate-bounce" />
          <span>{defaultLabel}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-emerald-700 dark:text-emerald-300 flex-shrink-0" />
          <span>{defaultLabel}</span>
        </>
      )}
    </button>
  );
}
