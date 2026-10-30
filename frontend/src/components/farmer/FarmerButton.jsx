// src/components/farmer/FarmerButton.jsx
import React from "react";

export default function FarmerButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  variant = "primary", // "primary" | "secondary" | "outline" | "danger"
  size = "lg", // "md" | "lg" | "xl"
  icon: Icon,
  className = "",
  type = "button",
  ariaLabel,
  ...rest
}) {
  const sizeClasses = {
    md: "min-h-[44px] px-4 py-2.5 text-base font-medium rounded-xl gap-2",
    lg: "min-h-[52px] px-6 py-3.5 text-lg font-semibold rounded-2xl gap-2.5",
    xl: "min-h-[60px] px-8 py-4 text-xl font-bold rounded-2xl gap-3 shadow-md"
  };

  const variantClasses = {
    primary:
      "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm border border-emerald-800 active:scale-[0.98] focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900",
    secondary:
      "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-600 active:scale-[0.98] focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-700",
    outline:
      "bg-white hover:bg-neutral-100 text-neutral-800 border-2 border-neutral-300 active:scale-[0.98] focus:ring-4 focus:ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800",
    danger:
      "bg-red-700 hover:bg-red-800 text-white border border-red-800 active:scale-[0.98] focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none ${sizeClasses[size] || sizeClasses.lg} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
