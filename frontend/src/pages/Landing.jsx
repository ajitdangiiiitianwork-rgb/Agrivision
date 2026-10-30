// src/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sprout,
  Camera,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  CloudSun,
  ShieldAlert,
  MapPin,
  LogIn,
  UserPlus,
  Sparkles,
  Layers
} from "lucide-react";

import FarmerButton from "../components/farmer/FarmerButton";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import PhotoTipsModal from "../components/farmer/PhotoTipsModal";
import FirstTimeTutorial from "../components/farmer/FirstTimeTutorial";
import FarmerHelpModal from "../components/farmer/FarmerHelpModal";
import { getUser } from "../utils/auth";

export default function Landing() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi")
    ? "hi"
    : i18n.language?.startsWith("mr")
    ? "mr"
    : "en";
  const isHi = currentLang === "hi";
  const isMr = currentLang === "mr";
  const user = getUser();

  const [photoTipsOpen, setPhotoTipsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  // Check if first-time user to offer visual tutorial
  useEffect(() => {
    try {
      const seen = localStorage.getItem("agrivision_tutorial_completed");
      if (!seen) {
        // Automatically offer tutorial to first-time visitor
        setTutorialOpen(true);
      }
    } catch (err) {
      void err;
    }

    const handleOpenTutorialEvent = () => setTutorialOpen(true);
    window.addEventListener("open-tutorial", handleOpenTutorialEvent);
    return () => window.removeEventListener("open-tutorial", handleOpenTutorialEvent);
  }, []);

  const welcomeSpokenText = isHi
    ? "नमस्ते! AgriVision में आपका स्वागत है। अपनी फसल की पत्ती का फोटो खींचकर रोग की पहचान करने के लिए नीचे दिए गए बड़े हरे बटन 'मेरी फसल की जांच करें' को दबाएं।"
    : isMr
    ? "नमस्कार! AgriVision मध्ये आपले स्वागत आहे. तुमच्या पिकाच्या पानाचा फोटो काढून रोग तपासण्यासाठी खालील मोठे हिरवे बटण 'माझ्या पिकाची तपासणी करा' दाबा."
    : "Welcome to AgriVision. Tap the big green button 'Check My Plant' to take a photo of your leaf and get instant disease guidance.";

  return (
    <div className="min-h-screen bg-warm-neutral dark:bg-neutral-950 pb-16">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: FOCUSED ON FARMER'S PRIMARY TASK (Hick-Hyman & Fitts's Law) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 px-4">
        {/* Soft natural agricultural gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_500px_at_50%_-10%,rgba(46,125,50,.18),transparent_70%)]" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Welcome Pill & Spoken Audio Greeting */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/60 px-4 py-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-300 shadow-xs">
            <Sprout className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>{t("home.greeting", { defaultValue: "Welcome, Farmer Friend!" })}</span>
            <VoiceSpeakerButton text={welcomeSpokenText} lang={currentLang} size="sm" />
          </div>

          {/* Friendly Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            {isHi ? (
              <>
                फसल के रोग पहचानें <br className="hidden sm:inline" />
                <span className="text-emerald-700 dark:text-emerald-400">
                  और तुरंत सही कृषि सलाह पाएं
                </span>
              </>
            ) : isMr ? (
              <>
                पिकावरील रोग ओळखा <br className="hidden sm:inline" />
                <span className="text-emerald-700 dark:text-emerald-400">
                  आणि योग्य कृषी सल्ला मिळवा
                </span>
              </>
            ) : (
              <>
                Identify Crop Diseases <br className="hidden sm:inline" />
                <span className="text-emerald-700 dark:text-emerald-400">
                  With Instant Practical Advice
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {t("home.subtitle", {
              defaultValue:
                "Check your crop leaf for diseases in seconds using your phone camera."
            })}
          </p>

          {/* ===================================================================== */}
          {/* DOMINANT PRIMARY ACTION: CHECK MY PLANT (Fitts's Law - 64px touch target) */}
          {/* ===================================================================== */}
          <div className="pt-4 max-w-md mx-auto space-y-3">
            <Link to="/diseasedetect" className="block w-full">
              <FarmerButton
                size="xl"
                variant="primary"
                icon={Camera}
                className="w-full text-xl sm:text-2xl py-5 shadow-xl bg-emerald-700 hover:bg-emerald-800 hover:shadow-2xl border-2 border-emerald-800 transform hover:-translate-y-0.5 transition-all"
              >
                {t("home.checkPlantBtn", { defaultValue: "Check My Plant" })}
              </FarmerButton>
            </Link>

            <span className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {isHi
                ? "मोबाइल कैमरा या गैलरी से फोटो चुनें"
                : isMr
                ? "मोबाईल कॅमेरा किंवा गॅलरीमधून फोटो निवडा"
                : "Use mobile camera or select from gallery"}
            </span>
          </div>

          {/* Quick Secondary Farmer Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <FarmerButton
              size="md"
              variant="outline"
              icon={Sparkles}
              onClick={() => setPhotoTipsOpen(true)}
            >
              {t("home.howToPhotoBtn", { defaultValue: "How to Take a Photo" })}
            </FarmerButton>

            <FarmerButton
              size="md"
              variant="outline"
              icon={BookOpen}
              onClick={() => setTutorialOpen(true)}
            >
              {t("home.tutorialBtn", { defaultValue: "Quick Tutorial" })}
            </FarmerButton>

            <FarmerButton
              size="md"
              variant="outline"
              icon={HelpCircle}
              onClick={() => setHelpOpen(true)}
            >
              {t("home.helpBtn", { defaultValue: "Need Help?" })}
            </FarmerButton>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE SIMPLE STEPS (Recognition rather than Recall) */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-8">
            {isHi ? "तीन आसान चरणों में जांच करें" : isMr ? "तीन सोप्या पायऱ्यांमध्ये तपासणी करा" : "Check in 3 Simple Steps"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-700 text-white font-bold text-xl mb-3 shadow-sm">
                1
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                {isHi ? "फोटो खींचें" : isMr ? "फोटो काढा" : "Take Photo"}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isHi
                  ? "रोगग्रस्त पत्ती की अच्छी रोशनी में पास से साफ फोटो लें।"
                  : isMr
                  ? "रोगट पानाच्या जवळून उजेडात स्पष्ट फोटो काढा."
                  : "Capture a close, clear photo of the diseased leaf in sunlight."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-700 text-white font-bold text-xl mb-3 shadow-sm">
                2
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                {isHi ? "जांच शुरू करें" : isMr ? "तपासणी सुरू करा" : "Start Check"}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isHi
                  ? "'जांच करें' दबाएं और एआई को लक्षणों की पहचान करने दें।"
                  : isMr
                  ? "'तपासणी करा' दाबा आणि संगणकाला लक्षणे पाहू द्या."
                  : "Tap 'Check Now' and let our AI examine the symptoms."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-700 text-white font-bold text-xl mb-3 shadow-sm">
                3
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                {isHi ? "उपाय जानें" : isMr ? "उपाय जाणून घ्या" : "Get Advice"}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isHi
                  ? "रोग का नाम देखें, बोलकर दी गई सलाह सुनें और फसल की रक्षा करें।"
                  : isMr
                  ? "रोगाचे नाव पहा, उपाय ऐका आणि पिकाची काळजी घ्या."
                  : "View disease name, listen to advice, and protect your crop."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ADDITIONAL EXISTING FARMING TOOLS (Progressive Disclosure) */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t("home.recentFeatures", { defaultValue: "More Farming Tools" })}
          </h2>

          {user ? (
            <Link
              to="/dashboard"
              className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{t("home.openDashboard")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{t("nav.login")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mandi Prices */}
          <Link
            to="/markets"
            className="group block p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-700 transition">
                {t("home.mandiFeature", { defaultValue: "Live Mandi Prices" })}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {isHi
                ? "नजदीकी मंडियों के आज के ताजा भाव देखें और सही समय पर बेचें।"
                : isMr
                ? "नजीकच्या बाजारपेठांमधील पिकांचे चालू भाव पहा."
                : "Track market prices in nearby mandis to sell at the best time."}
            </p>
          </Link>

          {/* Crop Plan */}
          <Link
            to="/plan"
            className="group block p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-700 transition">
                {t("home.cropPlanFeature", { defaultValue: "Crop Planning" })}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {isHi
                ? "मिट्टी और मौसम के अनुसार अपनी जमीन के लिए सबसे उपयुक्त फसल चुनें।"
                : isMr
                ? "माती आणि हवामानानुसार उत्तम पिकांची निवड करा."
                : "Plan the right crops based on your soil and seasonal weather."}
            </p>
          </Link>

          {/* AI Farmer Chat Assistant */}
          <Link
            to="/chat"
            className="group block p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-700 transition">
                {t("nav.assistant", { defaultValue: "AI Farm Assistant" })}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {isHi
                ? "खेती से जुड़े किसी भी सवाल के लिए अपने कृषि मित्र से बात करें।"
                : isMr
                ? "शेतीविषयक कोणत्याही प्रश्नासाठी कृषी मित्राशी बोला."
                : "Ask any farming or crop question in your own language."}
            </p>
          </Link>
        </div>

        {/* Account Prompt Card if not logged in */}
        {!user && (
          <div className="mt-8 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-100">
                {t("home.accountPrompt")}
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {isHi
                  ? "अपने खेत, मिट्टी जांच और पिछले रिकॉर्ड सुरक्षित रखने के लिए मुफ्त खाता बनाएं।"
                  : isMr
                  ? "आपले शेत, माती चाचणी व नोंदी सुरक्षित ठेवण्यासाठी विनामूल्य खाते तयार करा."
                  : "Create a free account to save your fields, soil tests, and previous results."}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/auth/login">
                <FarmerButton size="md" variant="outline" icon={LogIn}>
                  {t("nav.login")}
                </FarmerButton>
              </Link>
              <Link to="/auth/register">
                <FarmerButton size="md" variant="primary" icon={UserPlus}>
                  {t("nav.register")}
                </FarmerButton>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 text-center py-6 px-4 text-xs text-neutral-500">
        © {new Date().getFullYear()} AgriVision •{" "}
        {isHi
          ? "स्मार्ट इंडिया हैकाथॉन (SIH) 2025 पहल • किसानों की सेवा में समर्पित"
          : isMr
          ? "स्मार्ट इंडिया हॅकाथॉन (SIH) २०२५ उपक्रम • शेतकऱ्यांच्या सेवेसाठी"
          : "Smart India Hackathon 2025 Initiative • Built for Indian Farmers"}
      </footer>

      {/* Global Modals */}
      <PhotoTipsModal
        isOpen={photoTipsOpen}
        onClose={() => setPhotoTipsOpen(false)}
      />

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
