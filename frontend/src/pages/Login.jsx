// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogIn, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

import FarmerButton from "../components/farmer/FarmerButton";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import StatusBanner from "../components/farmer/StatusBanner";
import { setUser } from "../utils/auth";

export default function Login() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "mr";
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("password"); // "password" | "otp"
  const [identifier, setIdentifier] = useState(""); // phone or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const API = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

  const readJson = async (res) => {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    const t = await res.text();
    try {
      return JSON.parse(t);
    } catch {
      return {};
    }
  };

  // Password Login Handler
  const handlePasswordLogin = async (e) => {
    e?.preventDefault?.();
    setErrorMsg("");
    setSuccessMsg("");

    const id = identifier.trim();
    if (!id) {
      setErrorMsg(
        currentLang === "mr"
          ? "कृपया आपला १० अंकी मोबाईल नंबर किंवा ईमेल टाका."
          : "Please enter your mobile number or email."
      );
      return;
    }
    if (!password) {
      setErrorMsg(
        currentLang === "mr" ? "कृपया आपला पासवर्ड टाका." : "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);
      const isEmail = /^\S+@\S+\.\S+$/.test(id);
      const body = { password: password.trim() };
      if (isEmail) body.email = id.toLowerCase();
      else body.phone = id;
      body.identifier = id;

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await readJson(res);

      if (!res.ok) {
        if (res.status === 401 || res.status === 404) {
          setErrorMsg(t("auth.invalidCredentials"));
        } else {
          setErrorMsg(data?.error || t("auth.networkError"));
        }
        return;
      }

      // Store credentials using standard helper
      setUser(data.user, data.token || "dev-token");
      setSuccessMsg(t("auth.loginSuccess"));

      const destination = location.state?.from?.pathname || "/dashboard";
      setTimeout(() => navigate(destination, { replace: true }), 400);
    } catch (err) {
      console.error("Login network failure:", err);
      setErrorMsg(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  // Request OTP Handler
  const handleRequestOtp = async (e) => {
    e?.preventDefault?.();
    setErrorMsg("");
    setSuccessMsg("");

    const p = phone.trim();
    if (!/^\d{10}$/.test(p)) {
      setErrorMsg(t("auth.invalidPhone"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p })
      });
      const data = await readJson(res);

      if (!res.ok) {
        setErrorMsg(data?.error || t("auth.networkError"));
        return;
      }

      setOtpRequested(true);
      setSuccessMsg(
        data?.dev_otp
          ? `OTP पाठवला (DEV): ${data.dev_otp}`
          : "OTP आपल्या मोबाईलवर पाठवला आहे."
      );
    } catch (err) {
      console.error(err);
      setErrorMsg(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP Handler
  const handleVerifyOtp = async (e) => {
    e?.preventDefault?.();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp.trim()) {
      setErrorMsg(t("auth.enterOtpLabel"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), otp: otp.trim() })
      });
      const data = await readJson(res);

      if (!res.ok) {
        setErrorMsg(data?.error || t("auth.invalidCredentials"));
        return;
      }

      setUser(data.user, data.token || "dev-token");
      setSuccessMsg(t("auth.loginSuccess"));

      const destination = location.state?.from?.pathname || "/dashboard";
      setTimeout(() => navigate(destination, { replace: true }), 400);
    } catch (err) {
      console.error(err);
      setErrorMsg(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-warm-neutral dark:bg-neutral-950 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-6">
        {/* Header with audio prompt */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AgriVision</span>
            </div>
            <VoiceSpeakerButton text={t("auth.loginSpeakPrompt")} size="sm" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 pt-1">
            {t("auth.loginTitle")}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t("auth.loginSubtitle")}
          </p>
        </div>

        {/* Tab mode switcher: Password vs OTP */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setMode("password");
              setErrorMsg("");
            }}
            className={`py-2 text-sm font-bold rounded-xl transition cursor-pointer ${
              mode === "password"
                ? "bg-white dark:bg-neutral-900 text-emerald-800 dark:text-emerald-300 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
            }`}
          >
            {t("auth.passwordTab", { defaultValue: "Password" })}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("otp");
              setErrorMsg("");
            }}
            className={`py-2 text-sm font-bold rounded-xl transition cursor-pointer ${
              mode === "otp"
                ? "bg-white dark:bg-neutral-900 text-emerald-800 dark:text-emerald-300 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
            }`}
          >
            {t("auth.otpTab", { defaultValue: "OTP" })}
          </button>
        </div>

        {/* Status Alerts */}
        {errorMsg && <StatusBanner type="error" message={errorMsg} />}
        {successMsg && <StatusBanner type="success" message={successMsg} />}

        {/* Password Login Form */}
        {mode === "password" ? (
          <form className="space-y-4" onSubmit={handlePasswordLogin}>
            {/* Mobile or Email field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-identifier"
                className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {t("auth.phoneLabel")} / {t("auth.emailLabel")}
              </label>
              <div className="relative">
                <input
                  id="login-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    currentLang === "mr"
                      ? "उदा. ९८७६५४३२१० किंवा ईमेल"
                      : "e.g. 9876543210 or email"
                  }
                  autoComplete="username"
                  className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[50px]"
                />
              </div>
            </div>

            {/* Password field with toggle */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {t("auth.passwordLabel")}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.passwordPlaceholder")}
                  autoComplete="current-password"
                  className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 pr-14 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[50px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                  aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <FarmerButton
              type="submit"
              size="xl"
              variant="primary"
              loading={loading}
              loadingText={t("auth.loggingInBtn")}
              className="w-full mt-2"
              icon={LogIn}
            >
              {t("auth.loginBtn")}
            </FarmerButton>
          </form>
        ) : (
          /* OTP Login Form */
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div className="space-y-1.5">
              <label
                htmlFor="otp-phone"
                className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {t("auth.phoneLabel")}
              </label>
              <div className="flex gap-2">
                <input
                  id="otp-phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-h-[50px]"
                />
                <FarmerButton
                  size="md"
                  variant="secondary"
                  onClick={handleRequestOtp}
                  loading={loading && !otpRequested}
                  loadingText="..."
                  disabled={!/^\d{10}$/.test(phone.trim())}
                >
                  {t("auth.requestOtpBtn")}
                </FarmerButton>
              </div>
            </div>

            {otpRequested && (
              <div className="space-y-1.5 animate-fadeIn">
                <label
                  htmlFor="otp-code"
                  className="block text-sm font-bold text-neutral-800 dark:text-neutral-200"
                >
                  {t("auth.enterOtpLabel")}
                </label>
                <input
                  id="otp-code"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center tracking-widest text-2xl font-mono rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-600 min-h-[50px]"
                />
              </div>
            )}

            <FarmerButton
              type="submit"
              size="xl"
              variant="primary"
              loading={loading && otpRequested}
              loadingText={t("auth.verifyingOtpBtn")}
              disabled={!otpRequested || !otp.trim()}
              className="w-full mt-2"
              icon={KeyRound}
            >
              {t("auth.verifyOtpBtn")}
            </FarmerButton>
          </form>
        )}

        {/* Link to Register */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <span>{t("auth.noAccountPrompt")} </span>
          <Link
            to="/auth/register"
            className="font-bold text-emerald-700 dark:text-emerald-400 underline hover:opacity-85"
          >
            {t("auth.createAccountLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
