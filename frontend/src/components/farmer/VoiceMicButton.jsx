// src/components/farmer/VoiceMicButton.jsx
import React from "react";
import { Mic, MicOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import useVoiceAssistant from "../../hooks/useVoiceAssistant";

export default function VoiceMicButton({
  onTranscript,
  className = ""
}) {
  const { t } = useTranslation();
  const { isListening, startListening, stopListening, speechError } = useVoiceAssistant();

  const handleToggle = (e) => {
    e.preventDefault();
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        if (onTranscript) onTranscript(text);
      });
    }
  };

  return (
    <div className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isListening ? "Stop listening" : "Speak to input"}
        className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium border transition ${
          isListening
            ? "bg-red-100 text-red-800 border-red-300 animate-pulse dark:bg-red-950/40 dark:text-red-200"
            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700"
        } ${className}`}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 text-red-600" />
            <span>{t("actions.stop", { defaultValue: "Stop" })}</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>{t("actions.speak", { defaultValue: "Speak" })}</span>
          </>
        )}
      </button>
      {speechError && (
        <span className="text-xs text-red-600 mt-1" role="alert">
          {speechError}
        </span>
      )}
    </div>
  );
}
