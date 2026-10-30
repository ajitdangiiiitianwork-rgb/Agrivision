// src/components/farmer/FarmerHelpModal.jsx
import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, RotateCcw, X, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import VoiceSpeakerButton from "./VoiceSpeakerButton";
import FarmerButton from "./FarmerButton";

export default function FarmerHelpModal({ isOpen, onClose, onRestartTutorial }) {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  if (!isOpen) return null;

  // Retrieve localized topics from translation resource
  const rawTopics = t("help.topics", { returnObjects: true });
  const topics = Array.isArray(rawTopics) ? rawTopics : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="farmer-help-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 id="farmer-help-title" className="text-xl font-bold text-neutral-900 dark:text-white">
                {t("help.title", { defaultValue: "Farmer Help & Guidance" })}
              </h2>
              <span className="text-xs text-neutral-500">
                {i18n.language === "mr" ? "१० सोपे प्रश्न आणि उत्तरे" : "10 Simple Questions & Answers"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-pointer"
            aria-label="Close help"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Accordion Topics List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {topics.map((item, idx) => {
            const isOpenTopic = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpenTopic
                    ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpenTopic ? -1 : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpenTopic}
                >
                  <span className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
                    {idx + 1}. {item.q}
                  </span>
                  {isOpenTopic ? (
                    <ChevronUp className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  )}
                </button>

                {isOpenTopic && (
                  <div className="px-5 pb-5 pt-1 border-t border-emerald-100 dark:border-emerald-900/40">
                    <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                      {item.a}
                    </p>
                    <div className="mt-3">
                      <VoiceSpeakerButton
                        text={`${item.q}. ${item.a}`}
                        size="sm"
                        label={t("help.audioListen", { defaultValue: "Listen to this help topic" })}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {onRestartTutorial && (
            <FarmerButton
              variant="outline"
              size="md"
              onClick={() => {
                onClose();
                onRestartTutorial();
              }}
              icon={RotateCcw}
            >
              {i18n.language === "mr" ? "ट्यूटोरियल पुन्हा सुरू करा" : "Restart Tutorial"}
            </FarmerButton>
          )}

          <FarmerButton
            variant="primary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {t("help.close", { defaultValue: "Close Help" })}
          </FarmerButton>
        </div>
      </div>
    </div>
  );
}
