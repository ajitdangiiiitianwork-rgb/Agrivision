// src/pages/Offline.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WifiOff, RotateCcw, Home } from "lucide-react";
import FarmerButton from "../components/farmer/FarmerButton";

export default function Offline() {
  const { i18n } = useTranslation();
  const isMr = i18n.language === "mr";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
          <WifiOff className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {isMr ? "इंटरनेट जोडलेले नाही" : "You Are Offline"}
        </h1>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {isMr
            ? "तुमचा मोबाईल इंटरनेट किंवा वाय-फायशी जोडलेला नाही. नेटवर्क तपासा आणि पुन्हा प्रयत्न करा."
            : "Your device is currently offline. Please check your mobile data or Wi-Fi connection."}
        </p>

        <div className="space-y-3 pt-2">
          <FarmerButton
            size="lg"
            variant="primary"
            onClick={() => window.location.reload()}
            icon={RotateCcw}
            className="w-full"
          >
            {isMr ? "पुन्हा प्रयत्न करा" : "Try Again"}
          </FarmerButton>

          <Link to="/" className="block w-full">
            <FarmerButton size="md" variant="outline" icon={Home} className="w-full">
              {isMr ? "मुख्य पानावर जा" : "Go to Home"}
            </FarmerButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
