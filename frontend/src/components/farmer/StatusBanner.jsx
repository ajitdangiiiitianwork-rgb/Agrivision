// src/components/farmer/StatusBanner.jsx
import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";

export default function StatusBanner({
  type = "info", // "success" | "warning" | "error" | "info"
  title,
  message,
  action,
  className = ""
}) {
  const configs = {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800",
      text: "text-emerald-900 dark:text-emerald-100",
      icon: CheckCircle2,
      iconColor: "text-emerald-700 dark:text-emerald-400"
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800",
      text: "text-amber-900 dark:text-amber-100",
      icon: AlertTriangle,
      iconColor: "text-amber-700 dark:text-amber-400"
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800",
      text: "text-red-900 dark:text-red-100",
      icon: AlertCircle,
      iconColor: "text-red-700 dark:text-red-400"
    },
    info: {
      bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800",
      text: "text-sky-900 dark:text-sky-100",
      icon: Info,
      iconColor: "text-sky-700 dark:text-sky-400"
    }
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`rounded-2xl border-2 p-4 flex items-start gap-3.5 ${config.bg} ${config.text} ${className}`}
    >
      <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1">
        {title && <div className="font-bold text-base mb-1">{title}</div>}
        {message && <div className="text-sm leading-relaxed opacity-95">{message}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}
