// src/pages/DiseaseDetect.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Camera,
  Image as ImageIcon,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Home,
  Info,
  ChevronRight,
  ShieldCheck,
  Volume2,
  Sparkles,
  FlaskConical,
  Leaf,
  Bug,
  Droplets
} from "lucide-react";

import FarmerButton from "../components/farmer/FarmerButton";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import StatusBanner from "../components/farmer/StatusBanner";
import PhotoTipsModal from "../components/farmer/PhotoTipsModal";
import { detectDisease } from "../utils/api";
import { getFriendlyDiseaseInfo } from "../utils/diseaseTranslator";
import useVoiceAssistant from "../hooks/useVoiceAssistant";

export default function DiseaseDetect() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi")
    ? "hi"
    : i18n.language?.startsWith("mr")
    ? "mr"
    : "en";
  const isHi = currentLang === "hi";
  const isMr = currentLang === "mr";
  const { stopSpeaking } = useVoiceAssistant();

  // State machine: "capture" -> "preview" -> "processing" -> "result"
  const [stage, setStage] = useState("capture");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

  // Hidden file inputs
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // File selection & validation handler
  const handleFileSelect = (selectedFile) => {
    setErrorMsg("");
    if (!selectedFile) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(jpe?g|png|webp)$/i)) {
      setErrorMsg(t("disease.invalidFileType"));
      return;
    }

    // Validate size (15MB maximum)
    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMsg(t("disease.fileTooLarge"));
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStage("preview");
    setResult(null);
  };

  // Run the real ML disease detection request
  const handleStartDiagnosis = async () => {
    if (!file) {
      setErrorMsg(t("disease.noFileSelected"));
      return;
    }

    setStage("processing");
    setErrorMsg("");
    setResult(null);

    try {
      const response = await detectDisease(file);
      setResult(response);
      setStage("result");
    } catch (err) {
      console.error("Disease detection failed:", err);
      setErrorMsg(
        isHi
          ? "फसल की जांच करते समय समस्या आई। कृपया इंटरनेट जांचें और 'पुनः प्रयास करें' दबाएं।"
          : isMr
          ? "पिकाची तपासणी करताना त्रुटी आली. कृपया इंटरनेट तपासा आणि 'पुन्हा प्रयत्न करा' दाबा."
          : err.message || "Failed to check plant. Please check your connection and try again."
      );
      setStage("preview"); // Keep photo intact for retry!
    }
  };

  // Reset to take another photo
  const handleReset = () => {
    stopSpeaking();
    setStage("capture");
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResult(null);
    setErrorMsg("");
  };

  // Friendly formatted disease details with causes, triggers, and remedies
  const friendlyInfo = result ? getFriendlyDiseaseInfo(result.disease, currentLang, result) : null;
  const confidencePercent = result?.confidence ? Math.round(result.confidence * 100) : null;
  const isUncertain = result?.uncertain || (confidencePercent !== null && confidencePercent < 40);

  const spokenDiagnosisText = friendlyInfo
    ? `${friendlyInfo.title}. ${isHi ? "संभावित कारण:" : isMr ? "संसर्गाचे कारण:" : "Likely Cause:"} ${friendlyInfo.primaryCause}. ${isHi ? "मुख्य उपचार:" : isMr ? "मुख्य फवारणी उपाय:" : "Main remedy:"} ${friendlyInfo.chemicalRemedies?.[0] || friendlyInfo.organicRemedies?.[0] || ""}`
    : "";

  return (
    <div className="min-h-[85vh] bg-warm-neutral dark:bg-neutral-950 py-6 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-900/10 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("appName", { defaultValue: "AgriVision" })}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
              {t("disease.title", { defaultValue: "Plant Disease Detection" })}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTipsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold cursor-pointer min-h-[44px]"
              aria-label={t("disease.photoTipsBtn")}
            >
              <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span className="hidden sm:inline">{t("disease.photoTipsBtn")}</span>
            </button>
          </div>
        </div>

        {/* Global Error Notice if any */}
        {errorMsg && (
          <StatusBanner
            type="error"
            title={t("disease.errorTitle")}
            message={errorMsg}
            action={
              stage === "preview" && (
                <FarmerButton
                  size="md"
                  variant="primary"
                  onClick={handleStartDiagnosis}
                  icon={RotateCcw}
                >
                  {t("actions.tryAgain", { defaultValue: "Try Again" })}
                </FarmerButton>
              )
            }
          />
        )}

        {/* ========================================================================= */}
        {/* STAGE 1: CAPTURE OR SELECT LEAF PHOTOGRAPH */}
        {/* ========================================================================= */}
        {stage === "capture" && (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  {t("disease.step1Title")}
                </h2>
                <VoiceSpeakerButton text={`${t("disease.step1Title")}. ${t("disease.step1Desc")}`} lang={currentLang} />
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300">
                {t("disease.step1Desc")}
              </p>
            </div>

            {/* Hidden native inputs */}
            {/* 1. Camera Capture (environment camera for mobile) */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
            {/* 2. Gallery / File picker */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            {/* Big Prominent Action Buttons (Fitts's Law) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <FarmerButton
                size="xl"
                variant="primary"
                onClick={() => cameraInputRef.current?.click()}
                icon={Camera}
                className="w-full"
              >
                {t("disease.takePhotoBtn", { defaultValue: "Take a Photo" })}
              </FarmerButton>

              <FarmerButton
                size="xl"
                variant="secondary"
                onClick={() => galleryInputRef.current?.click()}
                icon={ImageIcon}
                className="w-full"
              >
                {t("disease.choosePhotoBtn", { defaultValue: "Choose from Gallery" })}
              </FarmerButton>
            </div>

            {/* Quick Photography Guidance Card */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-950 dark:text-emerald-100 space-y-1">
                <span className="font-bold">
                  {isHi ? "महत्वपूर्ण सलाह:" : isMr ? "महत्त्वाची टीप:" : "Important Tip:"}
                </span>{" "}
                <span>
                  {isHi
                    ? "रोगग्रस्त पत्ती पर अच्छी रोशनी होनी चाहिए। मोबाइल को स्थिर रखकर पास से साफ फोटो लें।"
                    : isMr
                    ? "रोगट पानावर चांगला सूर्यप्रकाश असावा. कॅमेरा स्थिर धरून जवळून फोटो काढा."
                    : "Hold your phone steady in daylight and focus closely on the infected leaf spot."}
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => setTipsModalOpen(true)}
                    className="text-emerald-700 dark:text-emerald-300 font-bold underline cursor-pointer hover:opacity-80"
                  >
                    {t("disease.photoTipsBtn")} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: PREVIEW & CONFIRM PHOTOGRAPH */}
        {/* ========================================================================= */}
        {stage === "preview" && previewUrl && (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  {t("disease.step2Title")}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t("disease.step2Desc")}
                </p>
              </div>
              <VoiceSpeakerButton text={`${t("disease.step2Title")}. ${t("disease.step2Desc")}`} lang={currentLang} />
            </div>

            {/* Leaf Image Preview Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-600 shadow-md bg-neutral-950 flex items-center justify-center max-h-96">
              <img
                src={previewUrl}
                alt="Selected crop leaf"
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                ✓ {currentLang === "mr" ? "फोटो निवडला आहे" : "Photo Selected"}
              </div>
            </div>

            {/* Actions: Confirm (Primary) & Retake (Secondary) */}
            <div className="space-y-3 pt-2">
              <FarmerButton
                size="xl"
                variant="primary"
                onClick={handleStartDiagnosis}
                icon={CheckCircle2}
                className="w-full"
              >
                {t("disease.confirmBtn", { defaultValue: "Check This Leaf Now" })}
              </FarmerButton>

              <FarmerButton
                size="lg"
                variant="outline"
                onClick={handleReset}
                icon={RotateCcw}
                className="w-full"
              >
                {t("disease.retakeBtn", { defaultValue: "Take Another Photo" })}
              </FarmerButton>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: HONEST INDETERMINATE PROCESSING STATE */}
        {/* ========================================================================= */}
        {stage === "processing" && (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 shadow-sm border border-emerald-900/10 dark:border-neutral-800 text-center space-y-6 animate-pulse">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <svg
                className="animate-spin h-12 w-12 text-emerald-700 dark:text-emerald-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50" aria-live="polite">
                {t("disease.step3Title")}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                {t("disease.step3Desc")}
              </p>
            </div>

            {/* Thumbnail of what is being processed */}
            {previewUrl && (
              <div className="inline-block p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                <img
                  src={previewUrl}
                  alt="Processing leaf"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: FARMER-CENTRIC DIAGNOSIS RESULTS */}
        {/* ========================================================================= */}
        {stage === "result" && result && (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-6">
            {/* Completion Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                <span className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                  {isHi ? "फसल की जांच पूरी हुई" : isMr ? "पिकाची तपासणी पूर्ण झाली" : "Plant Check Complete"}
                </span>
              </div>
              <VoiceSpeakerButton
                text={spokenDiagnosisText}
                lang={currentLang}
                size="md"
                label={t("disease.listenResultBtn")}
              />
            </div>

            {/* Disease Detection Header Card */}
            <div
              className={`rounded-3xl p-6 border-2 shadow-sm ${
                friendlyInfo?.isHealthy
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-50"
                  : isUncertain
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-50"
                  : "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-neutral-900 dark:to-emerald-950/30 border-emerald-600 text-neutral-900 dark:text-neutral-100"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-black tracking-wider opacity-80">
                    {t("disease.detectedHeading")}
                  </span>
                  {/* Pathogen Type Badge */}
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                    friendlyInfo?.isHealthy
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300"
                      : friendlyInfo?.pathogenType === "bacterial"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300"
                      : friendlyInfo?.pathogenType === "viral"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300"
                      : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300"
                  }`}>
                    {friendlyInfo?.isHealthy
                      ? (isHi ? "🌿 स्वस्थ पौधा" : isMr ? "🌿 निरोगी पीक" : "🌿 Healthy Plant")
                      : friendlyInfo?.pathogenType === "bacterial"
                      ? (isHi ? "🦠 जीवाणुजन्य रोग (Bacterial)" : isMr ? "🦠 जिवाणूजन्य रोग (Bacterial)" : "🦠 Bacterial")
                      : friendlyInfo?.pathogenType === "viral"
                      ? (isHi ? "🧬 विषाणुजन्य रोग (Viral)" : isMr ? "🧬 विषाणूजन्य रोग (Viral)" : "🧬 Viral")
                      : (isHi ? "🍄 फफूंदजन्य रोग (Fungal)" : isMr ? "🍄 बुरशीजन्य रोग (Fungal)" : "🍄 Fungal")}
                  </span>
                </div>

                {/* Confidence Badge */}
                {confidencePercent !== null && (
                  <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 shadow-xs">
                    <span>{t("disease.confidenceLabel")}:</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400">{confidencePercent}%</span>
                    <span className="text-neutral-500 font-normal">
                      ({confidencePercent >= 70
                        ? t("disease.confidenceHigh")
                        : confidencePercent >= 40
                        ? t("disease.confidenceMedium")
                        : t("disease.confidenceLow")})
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                {friendlyInfo?.title}
              </h2>

              {friendlyInfo?.pathogenName && !friendlyInfo?.isHealthy && (
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1 italic">
                  🔬 {isHi ? "रोगजनक (पैथोजन):" : isMr ? "रोगकारक बुरशी/जिवाणू:" : "Causal Pathogen:"}{" "}
                  <span className="font-bold">{friendlyInfo.pathogenName}</span>
                </p>
              )}

              {/* Uncertain Warning */}
              {isUncertain && (
                <div className="mt-3 p-3 rounded-2xl bg-amber-100/90 dark:bg-amber-900/50 border border-amber-300 text-xs font-semibold text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-700" />
                  <span>{t("disease.uncertainNotice")}</span>
                </div>
              )}
            </div>

            {/* Leaf Image Reference */}
            {previewUrl && (
              <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 max-h-64 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Inspected leaf photograph"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            )}

            {/* ========================================================================= */}
            {/* 1. ROOT CAUSE & ENVIRONMENTAL TRIGGERS */}
            {/* ========================================================================= */}
            {!friendlyInfo?.isHealthy && friendlyInfo?.primaryCause && (
              <div className="rounded-3xl border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/20 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-red-950 dark:text-red-200">
                      {isHi ? "१. संक्रमण का मुख्य कारण एवं अनुकूल मौसम" : isMr ? "१. संसर्गाचे मुख्य कारण व हवामान घटक" : "1. Infection Cause & Environmental Triggers"}
                    </h3>
                    <span className="text-xs text-red-700/80 dark:text-red-400">
                      {isHi ? "यह बीमारी पौधे पर क्यों और कैसे आई?" : isMr ? "हा रोग शेतात का आणि कसा पसरला?" : "Why did this infection occur on your crop?"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed pt-1">
                  <div className="bg-white/80 dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-red-200/60 dark:border-red-900/40">
                    <span className="font-bold text-red-900 dark:text-red-300 block mb-1">
                      🔍 {isHi ? "मुख्य वैज्ञानिक कारण:" : isMr ? "मुख्य शास्त्रीय कारण:" : "Primary Pathological Cause:"}
                    </span>
                    <p>{friendlyInfo.primaryCause}</p>
                  </div>

                  {friendlyInfo.environmentalTriggers && (
                    <div className="bg-white/80 dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-red-200/60 dark:border-red-900/40">
                      <span className="font-bold text-red-900 dark:text-red-300 block mb-1">
                        🌧️ {isHi ? "रोग बढ़ाने वाले मौसम व पर्यावरणीय घटक:" : isMr ? "रोग वाढवणारे हवामान व बाह्य घटक:" : "Outbreak Weather Triggers:"}
                      </span>
                      <p>{friendlyInfo.environmentalTriggers}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. CHEMICAL SPRAY REMEDIES (WITH EXACT 15L PUMP DOSAGES) */}
            {/* ========================================================================= */}
            {!friendlyInfo?.isHealthy && friendlyInfo?.chemicalRemedies?.length > 0 && (
              <div className="rounded-3xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-blue-950 dark:text-blue-200">
                      {isHi ? "२. रासायनिक फवारणी व १५ लीटर पंप का सटीक माप" : isMr ? "२. रासायनिक फवारणी व १५L पंपाचे अचूक प्रमाण" : "2. Chemical Spray Remedies & 15L Pump Dosages"}
                    </h3>
                    <span className="text-xs text-blue-700/80 dark:text-blue-400">
                      {isHi ? "कृषि सेवा केंद्र से लाने हेतु अनुशंसित दवाइयाँ" : isMr ? "कृषी सेवा केंद्रातून आणायची औषधे व डोस" : "Standard generic & commercial treatments"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {friendlyInfo.chemicalRemedies.map((remedy, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-neutral-900 p-3.5 rounded-2xl border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-3 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {remedy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. ORGANIC & BIOLOGICAL REMEDIES */}
            {/* ========================================================================= */}
            {!friendlyInfo?.isHealthy && friendlyInfo?.organicRemedies?.length > 0 && (
              <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-emerald-950 dark:text-emerald-200">
                      {isHi ? "३. जैविक एवं प्राकृतिक घरेलू उपचार" : isMr ? "३. सेंद्रिय व जैविक घरगुती उपाय" : "3. Organic & Biological Remedies"}
                    </h3>
                    <span className="text-xs text-emerald-700/80 dark:text-emerald-400">
                      {isHi ? "कम खर्च में सुरक्षित प्राकृतिक नियंत्रण" : isMr ? "कमी खर्चात पिकाचे रक्षण करणारे उपाय" : "Eco-friendly bio-control options"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {friendlyInfo.organicRemedies.map((remedy, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-neutral-900 p-3.5 rounded-2xl border border-emerald-200/70 dark:border-emerald-900/40 flex items-start gap-3 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        🌱
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {remedy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. PREVENTATIVE FIELD SANITATION PRACTICES */}
            {/* ========================================================================= */}
            {friendlyInfo?.preventativeActions?.length > 0 && (
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                      {isHi ? "४. खेत की स्वच्छता एवं दोबारा रोग न आने के उपाय" : isMr ? "४. शेतातील स्वच्छता व पुढील प्रतिबंधात्मक काळजी" : "4. Preventative Field Sanitation & Cultural Practices"}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {isHi ? "रोग के फैलाव को रोकने के लिए जरूरी नियम" : isMr ? "रोग इतर झाडांवर पसरू नये म्हणून घ्यायची काळजी" : "Best agricultural practices to stop spread"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 pl-1 pt-1">
                  {friendlyInfo.preventativeActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. DIFFERENTIAL PROBABILITY CANDIDATES */}
            {/* ========================================================================= */}
            {Array.isArray(result?.top_predictions) && result.top_predictions.length > 1 && (
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  📊 {isHi ? "संभाव्यता विश्लेषण (अन्य संभावनाएं व प्रतिशत):" : isMr ? "संभाव्यता विश्लेषण (इतर संभाव्य शक्यता व टक्केवारी):" : "Differential Probability Candidates:"}
                </h4>
                <div className="space-y-2">
                  {result.top_predictions.map((pred, i) => {
                    const otherInfo = getFriendlyDiseaseInfo(pred.disease, currentLang);
                    const pct = Math.round(pred.confidence * 100);
                    return (
                      <div key={i} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-500">#{i + 1}</span>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">{otherInfo.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="font-black text-emerald-700 dark:text-emerald-400">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Honest Disclaimer Notice */}
            <div className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/40 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
              {t("disease.disclaimerNotice")}
            </div>

            {/* Technical details (Collapsible so ordinary farmers don't have to see code) */}
            <details className="text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer">
              <summary className="font-semibold py-1">
                {t("disease.technicalDetails")}
              </summary>
              <div className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl space-y-1 overflow-x-auto font-mono text-[11px]">
                <div>
                  <span className="font-bold">{t("disease.modelDiagnosis")}:</span>{" "}
                  {result?.disease}
                </div>
                <div>
                  <span className="font-bold">{t("disease.modelVersion")}:</span>{" "}
                  {result?.model_version || "unknown"}
                </div>
                <div>
                  <span className="font-bold">Raw Confidence:</span> {result?.confidence}
                </div>
                <pre className="mt-2 text-[10px]">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </details>

            {/* Action Buttons: Check Another & Back Home */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <FarmerButton
                size="xl"
                variant="primary"
                onClick={handleReset}
                icon={RotateCcw}
                className="w-full"
              >
                {t("disease.checkAnotherBtn")}
              </FarmerButton>

              <Link to="/" className="w-full">
                <FarmerButton
                  size="xl"
                  variant="outline"
                  icon={Home}
                  className="w-full"
                >
                  {t("disease.backHomeBtn")}
                </FarmerButton>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Photography Tips Guidance Modal */}
      <PhotoTipsModal
        isOpen={tipsModalOpen}
        onClose={() => setTipsModalOpen(false)}
      />
    </div>
  );
}
