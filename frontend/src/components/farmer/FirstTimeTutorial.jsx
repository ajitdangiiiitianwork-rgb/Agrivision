// src/components/farmer/FirstTimeTutorial.jsx
import React, { useState } from "react";
import { Sprout, Camera, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import VoiceSpeakerButton from "./VoiceSpeakerButton";
import FarmerButton from "./FarmerButton";

export default function FirstTimeTutorial({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  if (!isOpen) return null;

  const handleFinish = () => {
    try {
      localStorage.setItem("agrivision_tutorial_completed", "true");
    } catch (err) {
      void err;
    }
    onClose();
  };

  const stepsData = [
    {
      step: 1,
      icon: Sprout,
      title: t("tutorial.step1Title"),
      desc: t("tutorial.step1Text"),
      audioText: t("tutorial.step1Audio"),
      color: "emerald"
    },
    {
      step: 2,
      icon: Camera,
      title: t("tutorial.step2Title"),
      desc: t("tutorial.step2Text"),
      audioText: t("tutorial.step2Audio"),
      color: "sky"
    },
    {
      step: 3,
      icon: Sparkles,
      title: t("tutorial.step3Title"),
      desc: t("tutorial.step3Text"),
      audioText: t("tutorial.step3Audio"),
      color: "amber"
    },
    {
      step: 4,
      icon: CheckCircle2,
      title: t("tutorial.step4Title"),
      desc: t("tutorial.step4Text"),
      audioText: t("tutorial.step4Audio"),
      color: "emerald"
    }
  ];

  const current = stepsData[currentStep - 1];
  const StepIcon = current.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-step-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
        {/* Top Header: Progress & Skip */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
            {t("tutorial.stepIndicator", { current: currentStep, total: totalSteps })}
          </span>
          <button
            onClick={handleFinish}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            aria-label="Skip tutorial"
          >
            {t("tutorial.skip")}
          </button>
        </div>

        {/* Step Visual Indicator Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full my-4 overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="text-center py-4 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-inner">
            <StepIcon className="w-10 h-10" />
          </div>

          <h2 id="tutorial-step-title" className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            {current.title}
          </h2>

          <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-sm mx-auto">
            {current.desc}
          </p>

          <div className="pt-2">
            <VoiceSpeakerButton text={current.audioText} size="md" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <FarmerButton
              variant="outline"
              size="md"
              onClick={() => setCurrentStep((s) => s - 1)}
              icon={ChevronLeft}
            >
              {t("tutorial.back")}
            </FarmerButton>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <FarmerButton
              variant="primary"
              size="md"
              onClick={() => setCurrentStep((s) => s + 1)}
            >
              <span>{t("tutorial.next")}</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </FarmerButton>
          ) : (
            <FarmerButton
              variant="primary"
              size="lg"
              onClick={handleFinish}
              className="flex-1"
            >
              {t("tutorial.finish")}
            </FarmerButton>
          )}
        </div>
      </div>
    </div>
  );
}
