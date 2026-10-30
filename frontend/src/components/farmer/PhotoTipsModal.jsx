// src/components/farmer/PhotoTipsModal.jsx
import React from "react";
import { Check, X, Camera, Sun, ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import VoiceSpeakerButton from "./VoiceSpeakerButton";
import FarmerButton from "./FarmerButton";

export default function PhotoTipsModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  if (!isOpen) return null;

  const isHi = i18n.language?.startsWith("hi");
  const isMr = i18n.language?.startsWith("mr");
  const activeLang = isHi ? "hi" : isMr ? "mr" : "en";

  const spokenText = isHi
    ? "अच्छा फोटो खींचने के लिए: प्राकृतिक धूप में रोगग्रस्त पत्ती की पास से साफ फोटो लें। धुंधली, अंधेरी या बहुत दूर से खींची गई फोटो से बचें।"
    : isMr
    ? "चांगला फोटो काढण्यासाठी: दिवसाच्या चांगल्या सूर्यप्रकाशात रोगट पानाचा जवळून स्पष्ट फोटो काढा. अंधुक, हललेला किंवा खूप लांबून काढलेला फोटो टाळा."
    : "For a good photo: Focus clearly on the diseased leaf under natural sunlight. Avoid blurry, dark, or distant photos.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tips-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 id="photo-tips-title" className="text-xl font-bold text-neutral-900 dark:text-white">
              {t("photoTips.title", { defaultValue: "How to Take a Clear Leaf Photo" })}
            </h2>
          </div>
          <VoiceSpeakerButton text={spokenText} lang={activeLang} size="sm" />
        </div>

        <div className="mt-4 space-y-4">
          {/* Visual Do's & Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DO */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 p-4">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </span>
                <span>{t("photoTips.goodPhotoTitle", { defaultValue: "Good Leaf Photo" })}</span>
              </div>
              <ul className="space-y-2 text-sm text-emerald-950 dark:text-emerald-100">
                <li className="flex items-start gap-2">
                  <ZoomIn className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{t("photoTips.goodPhoto1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sun className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{t("photoTips.goodPhoto2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{t("photoTips.goodPhoto3")}</span>
                </li>
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-2xl border-2 border-red-400 bg-red-50/60 dark:bg-red-950/30 p-4">
              <div className="flex items-center gap-2 font-bold text-red-800 dark:text-red-300 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs">
                  <X className="w-4 h-4 stroke-[3]" />
                </span>
                <span>{t("photoTips.badPhotoTitle", { defaultValue: "Avoid These Mistakes" })}</span>
              </div>
              <ul className="space-y-2 text-sm text-red-950 dark:text-red-100">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{t("photoTips.badPhoto1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{t("photoTips.badPhoto2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{t("photoTips.badPhoto3")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <FarmerButton
            onClick={onClose}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {t("photoTips.closeBtn", { defaultValue: "Got It, Continue" })}
          </FarmerButton>
        </div>
      </div>
    </div>
  );
}
