// src/pages/Settings.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RotateCcw, HelpCircle, BookOpen, Settings as SettingsIcon } from "lucide-react";
import Card from "../components/ui/Card";
import ThemeToggle from "../components/ThemeToggle";
import LangSelect from "../components/LangSelect";
import FarmerButton from "../components/farmer/FarmerButton";
import FirstTimeTutorial from "../components/farmer/FirstTimeTutorial";
import FarmerHelpModal from "../components/farmer/FarmerHelpModal";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const isMr = i18n.language === "mr";

  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleRestartTutorial = () => {
    try {
      localStorage.removeItem("agrivision_tutorial_completed");
    } catch (err) {
      void err;
    }
    setTutorialOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t("nav.settings", { defaultValue: "Settings" })}
          </h1>
          <p className="text-xs text-neutral-500">
            {isMr ? "ॲपची भाषा, रंगसंगती आणि शेतकरी मार्गदर्शन" : "Preferences, display and farmer guides"}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Language & Theme Card */}
        <Card title={isMr ? "भाषा आणि देखावा (Preferences)" : "Language & Appearance"}>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-semibold">{t("labels.language")}:</span>
              <LangSelect />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-semibold">{t("labels.theme")}:</span>
              <ThemeToggle />
            </div>
          </div>
        </Card>

        {/* Farmer Guides & Tutorials Card */}
        <Card title={isMr ? "शेतकरी मदत आणि ट्यूटोरियल" : "Farmer Guides & Tutorial"}>
          <div className="space-y-3 pt-2">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {isMr
                ? "ॲप कसे वापरावे हे पुन्हा पाहण्यासाठी किंवा मदत मिळवण्यासाठी खालील पर्याय निवडा."
                : "Replay the introductory walkthrough or browse practical farming questions."}
            </p>
            <div className="space-y-2 pt-1">
              <FarmerButton
                size="md"
                variant="outline"
                icon={RotateCcw}
                onClick={handleRestartTutorial}
                className="w-full justify-start"
              >
                {isMr ? "ॲप ट्यूटोरियल पुन्हा सुरू करा" : "Restart Intro Tutorial"}
              </FarmerButton>

              <FarmerButton
                size="md"
                variant="outline"
                icon={HelpCircle}
                onClick={() => setHelpOpen(true)}
                className="w-full justify-start"
              >
                {t("nav.help", { defaultValue: "Farmer Help & Guidance" })}
              </FarmerButton>
            </div>
          </div>
        </Card>

        {/* Notifications & Account info */}
        <Card title={isMr ? "सूचना (Alerts)" : "Notifications"}>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 py-2">
            {isMr
              ? "हवामान आणि बाजारभावाचे एसएमएस/इशारे (स्थानिक कृषी विभागाशी जोडलेले)."
              : "Weather and mandi alerts (available when SMS service is active)."}
          </div>
        </Card>

        <Card title={isMr ? "खाते व्यवस्थापन" : "Account Management"}>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 py-2">
            {isMr
              ? "प्रोफाईल, शेताची माहिती व नोंदणी तपशील."
              : "Manage your profile, fields data, and saved records."}
          </div>
        </Card>
      </div>

      <FirstTimeTutorial
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />

      <FarmerHelpModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        onRestartTutorial={() => setTutorialOpen(true)}
      />
    </div>
  );
}
