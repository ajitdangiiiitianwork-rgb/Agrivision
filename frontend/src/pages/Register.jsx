// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserPlus, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";

import FarmerButton from "../components/farmer/FarmerButton";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import StatusBanner from "../components/farmer/StatusBanner";

export default function Register() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "mr";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

  const validate = () => {
    if (!name.trim()) return t("auth.missingFields");
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) return t("auth.invalidPhone");
    if (!village.trim()) return t("auth.missingFields");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) return t("auth.invalidEmail");
    if (password.length < 6) return t("auth.passwordTooShort");
    if (password !== confirmPassword) return t("auth.passwordMismatch");
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const valErr = validate();
    if (valErr) {
      setErrorMsg(valErr);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          village: village.trim(),
          password: password.trim()
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.error?.includes("already exists")) {
          setErrorMsg(
            currentLang === "mr"
              ? "हा मोबाईल नंबर किंवा ईमेल आधीच नोंदणीकृत आहे. कृपया लॉगिन करा."
              : "User already exists with this phone or email. Please log in."
          );
        } else {
          setErrorMsg(data?.error || t("auth.networkError"));
        }
        return;
      }

      setSuccessMsg(t("auth.registerSuccess"));
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMsg(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-warm-neutral dark:bg-neutral-950 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AgriVision</span>
            </div>
            <VoiceSpeakerButton text={t("auth.registerSpeakPrompt")} size="sm" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 pt-1">
            {t("auth.registerTitle")}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t("auth.registerSubtitle")}
          </p>
        </div>

        {/* Status Alerts */}
        {errorMsg && <StatusBanner type="error" message={errorMsg} />}
        {successMsg && <StatusBanner type="success" message={successMsg} />}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-1">
            <label
              htmlFor="reg-name"
              className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
            >
              {t("auth.nameLabel")}
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.namePlaceholder")}
              autoComplete="name"
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
            />
          </div>

          {/* Phone (numeric keypad) */}
          <div className="space-y-1">
            <label
              htmlFor="reg-phone"
              className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
            >
              {t("auth.phoneLabel")}
            </label>
            <input
              id="reg-phone"
              type="tel"
              inputMode="numeric"
              pattern="\d*"
              maxLength={10}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("auth.phonePlaceholder")}
              autoComplete="tel"
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
            />
          </div>

          {/* Village */}
          <div className="space-y-1">
            <label
              htmlFor="reg-village"
              className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
            >
              {t("auth.villageLabel")}
            </label>
            <input
              id="reg-village"
              type="text"
              required
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder={t("auth.villagePlaceholder")}
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="reg-email"
              className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
            >
              {t("auth.emailLabel")}
            </label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label
                htmlFor="reg-pass"
                className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {t("auth.passwordLabel")}
              </label>
              <div className="relative">
                <input
                  id="reg-pass"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  autoComplete="new-password"
                  className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="reg-confirm"
                className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {t("auth.confirmPasswordLabel")}
              </label>
              <div className="relative">
                <input
                  id="reg-confirm"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="******"
                  autoComplete="new-password"
                  className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[48px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                  aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <FarmerButton
            type="submit"
            size="xl"
            variant="primary"
            loading={loading}
            loadingText={t("auth.registeringBtn")}
            className="w-full mt-2"
            icon={UserPlus}
          >
            {t("auth.registerBtn")}
          </FarmerButton>
        </form>

        {/* Link to Login */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <span>{t("auth.haveAccountPrompt")} </span>
          <Link
            to="/auth/login"
            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:opacity-85"
          >
            {t("auth.loginLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
