// src/components/ui/TopBar.jsx
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sprout, HelpCircle, Menu, X } from "lucide-react";

import ThemeToggle from "../ThemeToggle";
import LangSelect from "../LangSelect";
import FarmerHelpModal from "../farmer/FarmerHelpModal";
import { getUser, clearUser } from "../../utils/auth";

export default function TopBar() {
  const { t } = useTranslation();
  const appName = t("appName", { defaultValue: "AgriVision" });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthPage = pathname.startsWith("/auth");

  const [user, setUser] = useState(() => getUser());
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onAuthChanged = () => setUser(getUser());
    window.addEventListener("auth-changed", onAuthChanged);
    const onStorage = (e) => {
      if (e.key === "agri_user" || e.key === "token" || e.key === "agri_token") onAuthChanged();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("auth-changed", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleLogout = () => {
    clearUser();
    setUser(null);
    navigate("/auth/login");
  };

  // Farmer-accessible navigation items
  const leftNav = [
    { key: "nav.home", path: "/" },
    { key: "nav.diseaseDetect", path: "/diseasedetect", highlight: true },
    { key: "nav.dashboard", path: "/dashboard" },
    { key: "nav.fields", path: "/fields" },
    { key: "nav.prices", path: "/markets" },
    { key: "nav.assistant", path: "/chat" },
    { key: "nav.settings", path: "/settings" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-emerald-900/10 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/90 backdrop-blur shadow-sm"
      >
        <div className="flex h-16 items-center justify-between px-3 sm:px-6 max-w-7xl mx-auto">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl"
            aria-label={appName}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-700 text-white shadow-sm">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-emerald-900 dark:text-emerald-400">
              {appName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold">
            {leftNav.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-700 dark:text-emerald-400 font-bold border-b-2 border-emerald-600 pb-1"
                    : item.highlight
                    ? "px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 transition-colors"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                }
                end={item.path === "/"}
              >
                {t(item.key)}
              </NavLink>
            ))}

            {/* Auth section */}
            {!user && !isAuthPage && (
              <div className="flex items-center gap-3 pl-2 border-l border-neutral-300 dark:border-neutral-700">
                <NavLink
                  to="/auth/login"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-emerald-700 font-medium"
                >
                  {t("nav.login", { defaultValue: "Login" })}
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-semibold shadow-sm"
                >
                  {t("nav.register", { defaultValue: "Register" })}
                </NavLink>
              </div>
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Help Button */}
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              aria-label={t("nav.help", { defaultValue: "Help" })}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700 text-sm font-semibold min-h-[40px] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span className="hidden sm:inline">{t("nav.help", { defaultValue: "Help" })}</span>
            </button>

            <LangSelect />
            <ThemeToggle />

            {/* Profile menu */}
            {user && <ProfileMenu user={user} onLogout={handleLogout} t={t} />}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-2 animate-fadeIn shadow-lg">
            {leftNav.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? "bg-emerald-700 text-white"
                      : "text-neutral-800 dark:text-neutral-200 hover:bg-emerald-50 dark:hover:bg-neutral-900"
                  }`
                }
                end={item.path === "/"}
              >
                {t(item.key)}
              </NavLink>
            ))}

            {!user && !isAuthPage && (
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-3">
                <NavLink
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold text-neutral-800 dark:text-neutral-200"
                >
                  {t("nav.login", { defaultValue: "Login" })}
                </NavLink>
                <NavLink
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-emerald-700 text-white font-semibold"
                >
                  {t("nav.register", { defaultValue: "Register" })}
                </NavLink>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Farmer Help Modal */}
      <FarmerHelpModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        onRestartTutorial={() => {
          try {
            localStorage.removeItem("agrivision_tutorial_completed");
          } catch (err) {
            void err;
          }
          window.dispatchEvent(new CustomEvent("open-tutorial"));
        }}
      />
    </>
  );
}

function ProfileMenu({ user, onLogout, t }) {
  const [open, setOpen] = useState(false);
  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] ||
    user?.username ||
    t("nav.profile", { defaultValue: "Profile" });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white min-h-[40px] cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="w-6 h-6 rounded-full bg-emerald-900 text-white flex items-center justify-center text-xs font-bold uppercase">
          {firstName.charAt(0)}
        </span>
        <span className="text-sm font-semibold">{firstName}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl py-1 z-50"
          onMouseLeave={() => setOpen(false)}
          role="menu"
        >
          <NavLink
            to="/profile"
            className="block px-4 py-2.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(false)}
          >
            {t("nav.myProfile", { defaultValue: "My Profile" })}
          </NavLink>
          <NavLink
            to="/settings"
            className="block px-4 py-2.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(false)}
          >
            {t("nav.settings", { defaultValue: "Settings" })}
          </NavLink>
          <button
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            {t("nav.logout", { defaultValue: "Logout" })}
          </button>
        </div>
      )}
    </div>
  );
}
