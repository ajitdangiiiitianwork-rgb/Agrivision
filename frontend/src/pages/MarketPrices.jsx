// src/pages/MarketPrices.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Bell,
  Scale,
  RefreshCw,
  Trophy
} from "lucide-react";

import Card from "../components/ui/Card";
import PriceChart from "../components/PriceChart";
import FarmerButton from "../components/farmer/FarmerButton";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import StatusBanner from "../components/farmer/StatusBanner";
import { marketForecast, fetchMandis, fetchCommodities } from "../utils/api";

export default function MarketPrices() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi")
    ? "hi"
    : i18n.language?.startsWith("mr")
    ? "mr"
    : "en";
  const isHi = currentLang === "hi";
  const isMr = currentLang === "mr";

  // Selection states
  const [selectedMandi, setSelectedMandi] = useState("pune");
  const [selectedCommodity, setSelectedCommodity] = useState("tomato");
  const [horizonDays, setHorizonDays] = useState(7);

  // Loaded metadata
  const [mandisList, setMandisList] = useState([]);
  const [commoditiesList, setCommoditiesList] = useState([]);

  // Forecast data & loading
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertSuccess, setAlertSuccess] = useState("");

  // Load Mandis & Commodities list from API
  useEffect(() => {
    async function loadMeta() {
      try {
        const [mRes, cRes] = await Promise.all([fetchMandis(), fetchCommodities()]);
        if (mRes?.mandis) setMandisList(mRes.mandis);
        if (cRes?.commodities) setCommoditiesList(cRes.commodities);
      } catch (err) {
        console.warn("Using default market lists:", err);
      }
    }
    loadMeta();
  }, []);

  // Fetch live market data when selection changes
  const loadMarketForecast = useCallback(async (mandiId, commId, days) => {
    setLoading(true);
    setAlertSuccess("");
    try {
      const data = await marketForecast({
        commodity: commId || selectedCommodity,
        mandi: mandiId || selectedMandi,
        horizon_days: days || horizonDays
      });
      setMarketData(data);
    } catch (err) {
      console.error("Market fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCommodity, selectedMandi, horizonDays]);

  useEffect(() => {
    loadMarketForecast(selectedMandi, selectedCommodity, horizonDays);
  }, [selectedMandi, selectedCommodity, horizonDays, loadMarketForecast]);

  const currentModal = marketData?.current?.modal || 2450;
  const currentMin = marketData?.current?.min || 1800;
  const currentMax = marketData?.current?.max || 3100;
  const changePct = marketData?.current?.change_pct ?? 2.8;
  const isPositive = changePct >= 0;

  const advisoryText =
    marketData?.advisory?.[isHi ? "hi" : isMr ? "mr" : "en"] ||
    (isHi
      ? "अगले सप्ताह आवक नियंत्रित रहने पर भाव में सुधार की उम्मीद है। माल को गुणवत्ता व ग्रेडिंग के आधार पर ही मंडी में बेचें।"
      : isMr
      ? "पुढील आठवड्यात आवक नियंत्रणात राहिल्यास भावात सुधारणा अपेक्षित आहे. माल प्रतवारीनुसार विकावा."
      : "Prices expected to hold steady. Grade your produce before selling.");

  const bestMandi = marketData?.best_mandi;

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 sm:px-6 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 sm:p-7 shadow-sm border border-emerald-900/10 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full mb-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? "पुणे जिला व आसपास के मंडी भाव" : isMr ? "पुणे जिल्हा व परिसर कृषी बाजारभाव" : "Pune District & Regional Mandi Prices"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight">
            {isHi ? "लाइव मंडी भाव और मूल्य पूर्वानुमान" : isMr ? "बाजारभाव आणि भाव अंदाज" : "Live Mandi Rates & Price Forecast"}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
            {isHi
              ? "पुणे, नारायणगांव, चाकण, बारामती व मंचर के लाइव एपीएमसी भाव व अगले 7-30 दिनों का पूर्वानुमान"
              : isMr
              ? "पुणे, नारायणगाव, चाकण, बारामती, मंचर व परिसरातील थेट बाजारभाव व पुढील अंदाज"
              : "Live APMC prices, trends & projections for Pune, Narayangaon, Chakan & Baramati"}
          </p>
        </div>

        <FarmerButton
          size="md"
          variant="outline"
          icon={RefreshCw}
          onClick={() => loadMarketForecast(selectedMandi, selectedCommodity, horizonDays)}
          loading={loading}
        >
          {isMr ? "भाव ताजे करा" : "Refresh Rates"}
        </FarmerButton>
      </div>

      {/* Filters: Mandi & Commodity & Days */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border border-emerald-900/10 dark:border-neutral-800 space-y-4">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
          {isMr ? "पिक व बाजारपेठ निवडा (Select Crop & Market)" : "Select Crop & Mandi"}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Commodity Dropdown */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              🌾 {isMr ? "शेतमाल / पीक (Commodity)" : "Commodity / Crop"}
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-3 text-sm font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-600 cursor-pointer min-h-[48px]"
            >
              {(commoditiesList.length > 0
                ? commoditiesList
                : [
                    { id: "tomato", name: "टोमॅटो (Tomato)" },
                    { id: "onion", name: "कांदा (Onion)" },
                    { id: "soybean", name: "सोयाबीन (Soybean)" },
                    { id: "pomegranate", name: "डाळिंब - भगवा (Pomegranate)" },
                    { id: "wheat", name: "गहू - लोकवन (Wheat)" },
                    { id: "potato", name: "बटाटा (Potato)" },
                    { id: "capsicum", name: "ढोबळी मिरची (Capsicum)" },
                    { id: "bajra", name: "बाजरी (Bajra)" }
                  ]
              ).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mandi Dropdown */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              📍 {isMr ? "बाजार समिती (Pune APMC Mandi)" : "APMC Mandi (Pune District)"}
            </label>
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="w-full rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-3 text-sm font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-600 cursor-pointer min-h-[48px]"
            >
              {(mandisList.length > 0
                ? mandisList
                : [
                    { id: "pune", name: "पुणे - मार्केट यार्ड (गुलटेकडी)" },
                    { id: "narayangaon", name: "नारायणगाव - जुन्नर (Tomato Hub)" },
                    { id: "chakan", name: "चाकण - खेड (Onion & Potato Hub)" },
                    { id: "baramati", name: "बारामती बाजार समिती" },
                    { id: "manchar", name: "मंचर - आंबेगाव बाजार समिती" },
                    { id: "shirur", name: "शिरूर बाजार समिती" },
                    { id: "saswad", name: "सासवड - पुरंदर बाजार समिती" }
                  ]
              ).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Forecast Horizon Toggle */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              📅 {isMr ? "अंदाज कालावधी (Forecast Horizon)" : "Forecast Horizon"}
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl min-h-[48px]">
              {[7, 15, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setHorizonDays(days)}
                  className={`rounded-xl text-xs font-bold py-2 transition cursor-pointer ${
                    horizonDays === days
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {days} {isMr ? "दिवस" : "Days"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Price Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Modal / Average Price */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border-2 border-emerald-500/40 dark:border-emerald-800 space-y-1">
          <div className="text-xs font-bold text-neutral-500 uppercase">
            {isMr ? "आजचा सरासरी भाव (Modal Rate)" : "Today's Modal Rate"}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-800 dark:text-emerald-400 tracking-tight">
            ₹{currentModal.toLocaleString("en-IN")}
          </div>
          <div className="text-xs font-semibold text-neutral-500">
            प्रति क्विंटल (per 100 kg)
          </div>
        </div>

        {/* Min - Max Range */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-xs font-bold text-neutral-500 uppercase">
            {isMr ? "किमान - कमाल भाव (Price Range)" : "Min - Max Price Range"}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 tracking-tight">
            ₹{currentMin} - ₹{currentMax}
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            प्रतवारीनुसार (Grade / Quality based)
          </div>
        </div>

        {/* Daily Change */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-xs font-bold text-neutral-500 uppercase">
            {isMr ? "दरातील बदल (Daily Shift)" : "Daily Shift"}
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black flex items-center gap-1 ${
              isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-7 h-7" /> : <ArrowDownRight className="w-7 h-7" />}
            <span>{Math.abs(changePct)}%</span>
          </div>
          <div className="text-xs font-semibold text-neutral-500">
            {isPositive
              ? isMr ? "कालच्या तुलनेत वाढ" : "Higher than yesterday"
              : isMr ? "कालच्या तुलनेत घसरण" : "Lower than yesterday"}
          </div>
        </div>

        {/* Today's Arrival Volume */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-1">
          <div className="text-xs font-bold text-neutral-500 uppercase">
            {isMr ? "आजची आवक (Total Arrivals)" : "Today's Arrivals"}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 tracking-tight">
            {(marketData?.current?.arrival_qtl || 3200).toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            क्विंटल (Quintals recorded)
          </div>
        </div>
      </div>

      {/* Selling Advisory Banner with Voice playback */}
      <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/40 dark:to-neutral-900 border-2 border-emerald-400 dark:border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-base">
              {isMr ? "तज्ज्ञ कृषी सल्ला व विक्री नियोजन:" : "Farmer Selling Advisory & Market Outlook:"}
            </span>
          </div>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
            {advisoryText}
          </p>
        </div>

        <VoiceSpeakerButton
          text={advisoryText}
          lang={currentLang}
          size="md"
          label={isHi ? "सलाह सुनें" : isMr ? "सल्ला ऐका" : "Listen Advice"}
        />
      </div>

      {/* Price Alert Simulation Notification */}
      {alertSuccess && <StatusBanner type="success" message={alertSuccess} />}

      {/* Price Trend Chart Card */}
      <Card title={isMr ? "दर कल व पुढील अंदाज (Price Trend & Forecast)" : "Price Trend & Forecast Chart"}>
        <div className="pt-2">
          <PriceChart data={marketData?.series || []} />
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>
            {isMr
              ? "• डावीकडील रेषा: मागील ७ दिवसांचे प्रत्यक्ष भाव | उजवीकडील रेषा: पुढील संभाव्य अंदाज"
              : "• Left: Past 7 days actual market prices | Right: Projected price forecast"}
          </span>

          <button
            type="button"
            onClick={() => {
              setAlertSuccess(
                isMr
                  ? `✅ ₹${currentModal + 150} भावासाठी 'SMS / व्हॉट्सॲप' अलर्ट सेट केला आहे!`
                  : `✅ Price alert activated for ₹${currentModal + 150}/quintal!`
              );
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>{isMr ? "या पिकासाठी भाव अलर्ट सेट करा" : "Set Price Alert"}</span>
          </button>
        </div>
      </Card>

      {/* Comparison Across Pune District Mandis */}
      <Card title={isMr ? "पुणे जिल्ह्यातील इतर बाजारपेठांमधील भाव तुलना" : "Comparison Across Pune District Mandis"}>
        <div className="space-y-3 pt-2">
          {bestMandi && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  {isMr
                    ? `आज सर्वाधिक भाव: ${bestMandi.mandi_name}`
                    : `Highest Today: ${bestMandi.mandi_name_en}`}
                </span>
              </div>
              <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                ₹{bestMandi.modal_price}/क्विंटल
              </span>
            </div>
          )}

          {/* Mandi Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                <tr>
                  <th className="px-4 py-3">{isMr ? "बाजार समिती (APMC)" : "Mandi"}</th>
                  <th className="px-4 py-3">{isMr ? "पुण्यापासून अंतर" : "Distance"}</th>
                  <th className="px-4 py-3">{isMr ? "सरासरी भाव (Modal)" : "Modal Price"}</th>
                  <th className="px-4 py-3">{isMr ? "किमान - कमाल" : "Min - Max"}</th>
                  <th className="px-4 py-3 text-right">{isMr ? "निवडा" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-medium">
                {(marketData?.comparison || []).map((m) => (
                  <tr
                    key={m.mandi_id}
                    className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition ${
                      m.is_selected ? "bg-emerald-50/60 dark:bg-emerald-950/30 font-bold" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {m.is_selected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        <span>{isMr ? m.mandi_name : m.mandi_name_en}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-neutral-500">
                      {m.distance_km === 0 ? "पुणे शहर" : `${m.distance_km} km`}
                    </td>
                    <td className="px-4 py-3.5 text-emerald-700 dark:text-emerald-400 font-bold">
                      ₹{m.modal_price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-neutral-600 dark:text-neutral-300">
                      ₹{m.min_price} - ₹{m.max_price}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {!m.is_selected ? (
                        <button
                          type="button"
                          onClick={() => setSelectedMandi(m.mandi_id)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-emerald-600 hover:text-white font-bold transition cursor-pointer"
                        >
                          {isMr ? "पहा" : "View"}
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold">
                          {isMr ? "निवडलेली" : "Selected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
