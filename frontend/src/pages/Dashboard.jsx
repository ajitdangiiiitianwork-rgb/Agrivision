// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Sprout,
  CloudSun,
  TrendingUp,
  ScanLine,
  Bot,
  FileSpreadsheet,
  Droplets,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trophy,
  Sun,
  Wind,
  Layers,
  Info,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";

import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import Badge from "../components/ui/Badge";
import PriceChart from "../components/PriceChart";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import { fetchMarketPrices } from "../utils/api";
import { predictYield } from "../services/ml";

// Download CSV helper
const downloadCSV = (rows, filename = "agrivision_crop_recommendations.csv") => {
  if (!rows?.length) return;
  const header = Object.keys(rows[0]);
  const csv = [
    header.join(","),
    ...rows.map((r) => header.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Pune & Maharashtra Soil & Irrigation Presets (farmer-friendly)
const SOIL_PRESETS = [
  {
    id: "medium_black_canal",
    titleMr: "मध्यम काळी जमीन (नहर / नदी पाणी)",
    titleHi: "मध्यम काली मिट्टी (नहर / नदी सिंचाई)",
    titleEn: "Medium Black Soil (Canal / River)",
    descMr: "बारामती, शिरूर, दौंड, इंदापूर पट्टा • उत्तम निचरा",
    descHi: "बारामती, शिरूर, दौंड, इंदापुर क्षेत्र • उत्तम जल निकासी",
    descEn: "Baramati, Shirur, Daund belt • Good drainage",
    icon: "🌱",
    values: {
      ph: 7.2,
      moisture: 24.0,
      n: 95,
      p: 45,
      k: 42,
      rain_sum: 190,
      tmin_avg: 20,
      tmax_avg: 32,
      humidity_avg: 62,
      wind_avg: 8,
      irrigation: "canal",
      prev_crop_1: "Soybean",
      prev_crop_2: "Wheat",
      village: "Baramati",
      state: "MH",
      sowing_month: 6
    }
  },
  {
    id: "deep_black_well",
    titleMr: "काळी कसदार जमीन (विहीर / बोअरवेल)",
    titleHi: "काली उपजाऊ मिट्टी (कुआं / बोरवेल)",
    titleEn: "Deep Black Clay Soil (Well / Borewell)",
    descMr: "जुन्नर, नारायणगाव, खेड, मंचर • भाजीपाला व बागायती",
    descHi: "जुन्नर, नारायणगांव, खेड, मंचर • सब्जी व बागवानी",
    descEn: "Junnar, Narayangaon, Khed • Heavy nutrients",
    icon: "🌿",
    values: {
      ph: 7.6,
      moisture: 28.0,
      n: 110,
      p: 52,
      k: 48,
      rain_sum: 220,
      tmin_avg: 19,
      tmax_avg: 31,
      humidity_avg: 68,
      wind_avg: 7,
      irrigation: "well",
      prev_crop_1: "Tomato",
      prev_crop_2: "Onion",
      village: "Narayangaon",
      state: "MH",
      sowing_month: 6
    }
  },
  {
    id: "light_red_rainfed",
    titleMr: "हलकी / तांबडी जमीन (कोरडवाहू / जिरायती)",
    titleHi: "हल्की / लाल मिट्टी (वर्षा आधारित / शुष्क)",
    titleEn: "Light Red Soil (Rainfed / Dryland)",
    descMr: "पुरंदर, सासवड, हवेली माळरान • कमी पाण्यात येणारी पिके",
    descHi: "पुरंदर, सासवड, हवेली • कम पानी में होने वाली फसलें",
    descEn: "Purandar, Saswad highlands • Drought tolerant crops",
    icon: "🍂",
    values: {
      ph: 6.4,
      moisture: 16.0,
      n: 65,
      p: 28,
      k: 30,
      rain_sum: 140,
      tmin_avg: 22,
      tmax_avg: 34,
      humidity_avg: 50,
      wind_avg: 11,
      irrigation: "rainfed",
      prev_crop_1: "Bajra",
      prev_crop_2: "Gram",
      village: "Saswad",
      state: "MH",
      sowing_month: 6
    }
  },
  {
    id: "horticulture_drip",
    titleMr: "ठिबक सिंचन शेती (फळबागा व आधुनिक)",
    titleHi: "ड्रिप सिंचाई खेती (बागवानी व आधुनिक)",
    titleEn: "Drip Irrigation Farm (Modern / Orchards)",
    descMr: "डाळिंब, अंजीर, टोमॅटो पट्टा • नियंत्रित पाणी व खत",
    descHi: "अनार, अंजीर, टमाटर क्षेत्र • नियंत्रित खाद व पानी",
    descEn: "Pomegranate, figs, drip fertigation",
    icon: "💧",
    values: {
      ph: 6.8,
      moisture: 22.0,
      n: 100,
      p: 48,
      k: 50,
      rain_sum: 160,
      tmin_avg: 21,
      tmax_avg: 33,
      humidity_avg: 58,
      wind_avg: 8,
      irrigation: "drip",
      prev_crop_1: "Pomegranate",
      prev_crop_2: "Vegetables",
      village: "Chakan",
      state: "MH",
      sowing_month: 6
    }
  }
];

// Crop names mapped to Marathi, Hindi, English & icons
const CROP_META = {
  Chickpea: {
    mr: "हरभरा (चना)",
    hi: "चना (हरभरा)",
    en: "Chickpea (Gram)",
    icon: "🥣",
    bestSeasonMr: "रब्बी (ऑक्टोबर-नोव्हेंबर)",
    bestSeasonHi: "रबी (अक्टूबर-नवंबर)",
    bestSeasonEn: "Rabi (Oct-Nov)",
    puneSuitabilityMr: "पुणे, बारामती व शिरूर पट्ट्यात उत्तम उत्पादन",
    puneSuitabilityHi: "पुणे, बारामती और शिरूर क्षेत्र में उच्च उपज",
    puneSuitabilityEn: "Ideal for well-drained loam and black soils",
  },
  Maize: {
    mr: "मका (कणीस)",
    hi: "मक्का (भुट्टा)",
    en: "Maize (Corn)",
    icon: "🌽",
    bestSeasonMr: "खरीप / रब्बी",
    bestSeasonHi: "खरीफ / रबी",
    bestSeasonEn: "Kharif / Rabi",
    puneSuitabilityMr: "जुन्नर, खेड, बारामतीत चारा व धान्यासाठी सर्वाधिक मागणी",
    puneSuitabilityHi: "जुन्नर, खेड, बारामती में दाने व चारे हेतु भारी मांग",
    puneSuitabilityEn: "High nitrogen responsive heavy yielding crop",
  },
  Rice: {
    mr: "भात (धान)",
    hi: "चावल (धान)",
    en: "Paddy (Rice)",
    icon: "🌾",
    bestSeasonMr: "खरीप (जून-जुलै)",
    bestSeasonHi: "खरीफ (जून-जुलाई)",
    bestSeasonEn: "Kharif (June-July)",
    puneSuitabilityMr: "मावळ, मुळशी, भोर, वेल्हे पश्चिम पट्ट्यात उत्तम",
    puneSuitabilityHi: "मावल, मुल्शी, भोर पश्चिमी भारी वर्षा क्षेत्र",
    puneSuitabilityEn: "Acid-tolerant, thrives with heavy water and moisture",
  },
  Cotton: {
    mr: "कापूस (पांढरे सोने)",
    hi: "कपास (सफेद सोना)",
    en: "Cotton",
    icon: "☁️",
    bestSeasonMr: "खरीप",
    bestSeasonHi: "खरीफ",
    bestSeasonEn: "Kharif",
    puneSuitabilityMr: "काळी कसदार जमीन व मध्यम पावसाच्या भागात अनुकूल",
    puneSuitabilityHi: "काली भारी मिट्टी व मध्यम वर्षा के लिए सर्वोत्तम",
    puneSuitabilityEn: "Tolerates mild salinity & alkalinity in black soils",
  },
  Soybean: {
    mr: "सोयाबीन (पिवळे सोने)",
    hi: "सोयाबीन",
    en: "Soybean",
    icon: "🌱",
    bestSeasonMr: "खरीप (जून-ऑक्टोबर)",
    bestSeasonHi: "खरीफ (जून-अक्टूबर)",
    bestSeasonEn: "Kharif (June-Oct)",
    puneSuitabilityMr: "उत्तम निचरा असलेल्या मध्यम काळ्या जमिनीत हमखास नफा",
    puneSuitabilityHi: "मध्यम काली मिट्टी में दलहनी व तेल बीज नकदी फसल",
    puneSuitabilityEn: "Excellent oilseed cash crop in neutral soils",
  },
  Wheat: {
    mr: "गहू (शरबती / सिहोर)",
    hi: "गेहूं",
    en: "Wheat",
    icon: "🌾",
    bestSeasonMr: "रब्बी (नोव्हेंबर-मार्च)",
    bestSeasonHi: "रबी (नवंबर-मार्च)",
    bestSeasonEn: "Rabi (Nov-March)",
    puneSuitabilityMr: "थंड हवामान व बागायती जमिनीत विक्रमी उत्पादन",
    puneSuitabilityHi: "शीतकालीन सिंचित गेहूं की भरपूर पैदावार",
    puneSuitabilityEn: "Premier winter cereal grain with reliable yield",
  },
  Bajra: {
    mr: "बाजरी",
    hi: "बाजरा (पर्ल मिलेट)",
    en: "Bajra (Pearl Millet)",
    icon: "🥖",
    bestSeasonMr: "खरीप / उन्हाळी",
    bestSeasonHi: "खरीफ / ग्रीष्मकालीन",
    bestSeasonEn: "Kharif / Summer",
    puneSuitabilityMr: "पुरंदर, सासवड व दुष्काळी माळरानावर कमी पाण्यात भरपूर पीक",
    puneSuitabilityHi: "कम पानी व क्षारीय/हल्की मिट्टी में सर्वाधिक सहनशील",
    puneSuitabilityEn: "Extremely hardy in dry, light and alkaline soils",
  },
};

export default function Dashboard() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi") ? "hi" : i18n.language?.startsWith("mr") ? "mr" : "en";
  const isHi = currentLang === "hi";
  const isMr = currentLang === "mr";

  // State
  const [selectedPreset, setSelectedPreset] = useState("medium_black_canal");
  const [acres, setAcres] = useState(2.5); // user enters Acres
  const [showAdvancedSoil, setShowAdvancedSoil] = useState(false);
  const [soilForm, setSoilForm] = useState(SOIL_PRESETS[0].values);

  // Predictions
  const [busy, setBusy] = useState(false);
  const [recs, setRecs] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Market Prices widget
  const [marketCrop, setMarketCrop] = useState("tomato");
  const [mandiPrices, setMandiPrices] = useState(null);
  const [pricesLoading, setPricesLoading] = useState(false);

  // When preset changes, load preset values
  const handleSelectPreset = (presetId) => {
    setSelectedPreset(presetId);
    const p = SOIL_PRESETS.find((x) => x.id === presetId);
    if (p) {
      setSoilForm({ ...p.values });
    }
  };

  // Live Soil Health and pH Diagnostics Banner
  const soilHealthNotice = useMemo(() => {
    const ph = Number(soilForm.ph) || 7.0;
    if (ph < 5.5) {
      return {
        type: "acidic",
        badgeBg: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300",
        badgeText: isHi ? "⚠️ तीव्र अम्लीय (Acidic)" : isMr ? "⚠️ तीव्र आम्लधर्मी (Acidic)" : "⚠️ Strongly Acidic",
        title: isHi
          ? `⚠️ अत्यधिक अम्लीय मिट्टी (pH ${ph})`
          : isMr
          ? `⚠️ तीव्र आम्लधर्मी जमीन (pH ${ph})`
          : `⚠️ Strongly Acidic Soil (pH ${ph})`,
        advice: isHi
          ? "चना, कपास व सोयाबीन में 50-85% तक उपज घट सकती है। धान (चावल) अम्लीय मिट्टी में अधिक सहनशील है। मिट्टी सुधार हेतु कृषि चूना (Agricultural Lime) 400-500 किग्रा/एकड़ मिलाएं।"
          : isMr
          ? "हरभरा, कापूस व सोयाबीनच्या मुळांतील गाठी नष्ट होऊन ५०-८५% उत्पादन घसरते! भात (धान) हे पीक आम्लतेत उत्तम तग धरते. जमीन सुधारण्यासाठी शेतात कृषी चुना (Agricultural Lime) ४०० ते ५०० किलो/एकर मिसळा."
          : "Severe yield crash for Chickpea, Cotton and Soybean due to root nodulation lock. Rice remains acid-tolerant. Apply Agricultural Lime (400-500 kg/acre) to neutralize."
      };
    }
    if (ph > 8.2) {
      return {
        type: "alkaline",
        badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300",
        badgeText: isHi ? "⚠️ तीव्र क्षारीय (Alkaline)" : isMr ? "⚠️ तीव्र विम्ल / क्षारपड (Alkaline)" : "⚠️ Strongly Alkaline",
        title: isHi
          ? `⚠️ अत्यधिक क्षारीय / चोपन मिट्टी (pH ${ph})`
          : isMr
          ? `⚠️ तीव्र विम्ल / क्षारपड चोपण जमीन (pH ${ph})`
          : `⚠️ Highly Alkaline / Sodic Soil (pH ${ph})`,
        advice: isHi
          ? "धान और मक्का में आयरन व जिंक की भारी कमी होती है और उपज तेजी से गिरती है। बाजरा और कपास क्षारीय मिट्टी में अधिक सहनशील हैं। सुधार हेतु जिप्सम (Gypsum) 1 से 1.5 टन/एकड़ डालें।"
          : isMr
          ? "भात व मका पिकात लोह व जस्ताची तीव्र कमतरता येऊन उत्पादन घसरते! बाजरी व कापूस हे पीक या जमिनीत सर्वाधिक सहनशील आहे. जमीन सुधारण्यासाठी शेतात जिप्सम (Gypsum) १ ते १.५ टन/एकर टाका."
          : "Rice and Maize suffer severe micronutrient chlorosis and yield loss. Bajra and Cotton tolerate high alkalinity. Apply Gypsum (1-1.5 tons/acre) and organic manure to treat."
      };
    }
    return {
      type: "optimal",
      badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
      badgeText: isHi ? "✅ आदर्श समतोल (Optimal)" : isMr ? "✅ आदर्श समतोल (Optimal)" : "✅ Optimal / Balanced",
      title: isHi
        ? `✅ आदर्श संतुलित उपजाऊ मिट्टी (pH ${ph})`
        : isMr
        ? `✅ आदर्श समतोल सुपीक जमीन (pH ${ph})`
        : `✅ Optimal Balanced Soil (pH ${ph})`,
      advice: isHi
        ? "मिट्टी का पीएच संतुलित है। एनपीके और सभी सूक्ष्म पोषक तत्व फसलों को पूरी क्षमता से मिलते हैं। सभी फसलों में उच्च पैदावार मिलेगी।"
        : isMr
        ? "जमिनीचा सामू एकदम आदर्श आहे (६.० ते ८.०). नत्र, स्फुरद, पालाश व सूक्ष्म अन्नद्रव्ये पिकाला सहजरीत्या मिळतात. सर्व पिकांसाठी उत्तम व विक्रमी उत्पादन मिळेल."
        : "Soil pH is in the optimal range (6.0 - 8.0). Maximum nutrient uptake efficiency and high potential yields across all crops."
    };
  }, [soilForm.ph, isHi, isMr]);

  // Load Pune Market prices for widget
  useEffect(() => {
    let active = true;
    const loadPrices = async () => {
      setPricesLoading(true);
      try {
        const data = await fetchMarketPrices({ commodity: marketCrop, mandi: "pune", horizon_days: 7 });
        if (active) {
          setMandiPrices(data);
        }
      } catch (err) {
        console.error("Failed to load mandi prices:", err);
      } finally {
        if (active) setPricesLoading(false);
      }
    };
    loadPrices();
    return () => {
      active = false;
    };
  }, [marketCrop]);

  // Run Recommendation function
  const runRecommendation = async (formData, farmAcres) => {
    setBusy(true);
    setErrorMsg("");
    try {
      const cropsToPredict = ["Chickpea", "Maize", "Rice", "Cotton", "Soybean", "Wheat", "Bajra"];
      const areaHa = Number((farmAcres * 0.404686).toFixed(2)); // convert acres to ha

      const batchPayload = cropsToPredict.map((cropName) => ({
        ...formData,
        area_ha: areaHa,
        crop: cropName,
        lat: formData.lat || 18.5204, // Pune lat
        lon: formData.lon || 73.8567  // Pune lon
      }));

      const res = await predictYield(batchPayload);
      const preds = res?.predictions || [];
      const details = res?.details || [];
      const maxY = Math.max(...preds, 0.001);

      const rows = cropsToPredict
        .map((name, idx) => {
          const detailItem =
            details.find((d) => d.crop?.toLowerCase() === name.toLowerCase()) ||
            details[idx] ||
            {};
          const yieldQPerHa = Number(preds[idx] ?? (detailItem.yield_q_per_ha ?? 0));
          const yieldQPerAcre = Number((yieldQPerHa * 0.404686).toFixed(1));
          const score = Math.round((yieldQPerHa / maxY) * 100);
          const meta = CROP_META[name] || {
            mr: name,
            hi: name,
            en: name,
            icon: "🌱",
            bestSeasonMr: "हंगामी",
            bestSeasonHi: "मौसमी",
            bestSeasonEn: "Seasonal",
            puneSuitabilityMr: "पुणे भागात अनुकूल",
            puneSuitabilityHi: "पुणे क्षेत्र में अनुकूल",
            puneSuitabilityEn: "Suitable for local region",
          };

          return {
            name,
            nameLocalized: isHi ? meta.hi : isMr ? meta.mr : meta.en,
            nameMr: meta.mr,
            nameHi: meta.hi,
            nameEn: meta.en,
            icon: meta.icon,
            bestSeason: isHi ? meta.bestSeasonHi : isMr ? meta.bestSeasonMr : meta.bestSeasonEn,
            puneSuitability: isHi ? meta.puneSuitabilityHi : isMr ? meta.puneSuitabilityMr : meta.puneSuitabilityEn,
            yieldQPerHa: Number(yieldQPerHa.toFixed(2)),
            yieldQPerAcre,
            totalYieldQ: Number((yieldQPerAcre * farmAcres).toFixed(1)),
            score,
            phFactor: detailItem.ph_factor ?? 1.0,
            phStatus: detailItem.ph_status || "optimal",
            phNote: detailItem.ph_note || ""
          };
        })
        .sort((a, b) => b.yieldQPerHa - a.yieldQPerHa)
        .map((row, index) => ({ ...row, rank: index + 1 }));

      setRecs(rows);
    } catch (err) {
      console.error("Recommendation error:", err);
      setErrorMsg(
        isHi
          ? "फसल सिफारिश प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।"
          : isMr
          ? "पीक शिफारस मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा."
          : "Could not calculate recommendations. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  // Live auto-recalculation whenever soilForm or acres changes (debounced 250ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      runRecommendation(soilForm, acres);
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soilForm, acres]);

  const handleExportCSV = () => {
    if (!recs?.length) return;
    downloadCSV(
      recs.map((r) => ({
        Rank: r.rank,
        Crop: r.name,
        Crop_Local: r.nameLocalized,
        Soil_pH_Entered: soilForm.ph,
        pH_Status: r.phStatus,
        pH_Factor: r.phFactor,
        Predicted_Yield_Quintals_Per_Acre: r.yieldQPerAcre,
        Predicted_Yield_Quintals_Per_Hectare: r.yieldQPerHa,
        Total_Farm_Yield_Quintals: Number((r.yieldQPerAcre * acres).toFixed(1)),
        Relative_Suitability_Score: `${r.score}%`,
        Region_Agronomic_Note: r.puneSuitability
      }))
    );
  };

  // Explanation audio text for farmers
  const audioExplanation = isHi
    ? "नमस्ते किसान भाइयों। यह आपका कृषि केंद्र डैशबोर्ड है। यहाँ आपको आज का मौसम और छिड़काव परामर्श, लाइव पुणे मंडी भाव, फसल रोग की त्वरित जांच, और आपकी मिट्टी के अनुसार सर्वाधिक उपज देने वाली फसलों की सिफारिश एक ही जगह मिलती है।"
    : isMr
    ? "नमस्कार शेतकरी बंधूंनो. हे तुमचे कृषी केंद्र डॅशबोर्ड आहे. येथे तुम्हाला आजचा हवामान सल्ला, पुणे मार्केटचे थेट भाव, पिकाची तपासणी आणि तुमच्या मातीनुसार कोणते पीक सर्वाधिक उत्पादन देईल याची शिफारस एकाच ठिकाणी मिळते."
    : "Welcome to your farm dashboard. Here you get today's spray advisory, live Pune APMC mandi rates, instant plant disease checks, and smart crop yield recommendations for your land.";

  // Chart data shaping
  const chartSeries = useMemo(() => {
    if (!mandiPrices?.series?.length) return [];
    return mandiPrices.series.map((item, idx) => ({
      date: item.date || `D${idx + 1}`,
      price: Number(item.price) || 0,
      projected: Boolean(item.projected)
    }));
  }, [mandiPrices]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* ======================================================== */}
      {/* 1. HEADER & PURPOSE BANNER: What is this & Why do I need it? */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-200 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isHi ? "मेरा कृषि केंद्र" : isMr ? "माझे कृषी केंद्र" : "My Farm Command Center"}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                📍 {isHi ? "पुणे व महाराष्ट्र विशेष" : isMr ? "पुणे व महाराष्ट्र विशेष" : "Pune & Maharashtra Edition"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {isHi ? "कृषि डैशबोर्ड एवं फसल सिफारिश" : isMr ? "शेती डॅशबोर्ड व उत्पादन शिफारस" : "Farm Overview & Crop Advisory"}
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              {isHi
                ? "मौसम परामर्श, लाइव पुणे एपीएमसी मंडी भाव, त्वरित फसल जांच, और आपकी मिट्टी के अनुसार एआई आधारित उपज सिफारिश एक ही जगह।"
                : isMr
                ? "हवामान अंदाज, थेट पुणे बाजारभाव, पिकांचे आरोग्य आणि तुमच्या जमिनीनुसार सर्वाधिक उत्पादन देणाऱ्या पिकांची शिफारस एकाच ठिकाणी."
                : "Weather advisory, live Pune APMC mandi prices, instant crop check, and AI yield recommendations tailored to your soil."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <VoiceSpeakerButton
              text={audioExplanation}
              lang={currentLang}
              label={isHi ? "डैशबोर्ड जानकारी सुनें" : isMr ? "डॅशबोर्ड माहिती ऐका" : "Listen to Overview"}
              size="md"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            />
          </div>
        </div>

        {/* Why Do I Need It? (Accordion/Info Pill) */}
        <div className="mt-5 pt-4 border-t border-emerald-600/50 grid sm:grid-cols-3 gap-3">
          <div className="bg-emerald-900/40 rounded-2xl p-3 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300 font-bold">
              1
            </div>
            <div>
              <h2 className="text-xs font-bold text-emerald-100 uppercase tracking-wide">
                {isMr ? "कशासाठी वापरावे?" : "Why use this?"}
              </h2>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                {isMr
                  ? "जमिनीनुसार कोणत्या पिकात सर्वात जास्त फायदा होईल हे जाणून घेण्यासाठी."
                  : "Find which crop will yield maximum harvest on your exact soil."}
              </p>
            </div>
          </div>

          <div className="bg-emerald-900/40 rounded-2xl p-3 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300 font-bold">
              2
            </div>
            <div>
              <h2 className="text-xs font-bold text-emerald-100 uppercase tracking-wide">
                {isMr ? "तोटा टाळण्यासाठी" : "Avoid Market Losses"}
              </h2>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                {isMr
                  ? "पुणे मार्केट यार्डातील ७ दिवसांचे भाव तपासून योग्य वेळी विक्री करा."
                  : "Track Pune APMC 7-day price forecast before bringing harvest to market."}
              </p>
            </div>
          </div>

          <div className="bg-emerald-900/40 rounded-2xl p-3 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300 font-bold">
              3
            </div>
            <div>
              <h2 className="text-xs font-bold text-emerald-100 uppercase tracking-wide">
                {isMr ? "फवारणी व हवामान" : "Weather & Spray Window"}
              </h2>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                {isMr
                  ? "वाऱ्याचा वेग व पाऊस पाहून औषध फवारणीचे योग्य नियोजन करा."
                  : "Plan foliar sprays according to wind speed, temperature and rain."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. LIVE PUNE FARM STATUS: 4 QUICK CARDS */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-emerald-900/10 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {isMr ? "पुणे हवामान सल्ला" : "Pune Weather Advisory"}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-neutral-900 dark:text-white">28°C</span>
              <span className="text-xs font-semibold text-neutral-500">
                {isMr ? "हलके ढगाळ" : "Partly Cloudy"}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2">
              💧 {isMr ? "आर्द्रता:" : "Humidity:"} <b>62%</b> • 💨 {isMr ? "वारा:" : "Wind:"} <b>8 km/h</b>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {isMr ? "सकाळी ९ पूर्वी फवारणी योग्य" : "Optimal spray before 9 AM"}
            </span>
          </div>
        </div>

        {/* Pune Mandi Snapshot */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-emerald-900/10 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {isMr ? "पुणे बाजारभाव थेट दर" : "Pune APMC Live"}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-700 dark:text-neutral-200">🍅 {isMr ? "टोमॅटो (क्रेट)" : "Tomato"}</span>
                <span className="font-black text-emerald-700 dark:text-emerald-400">₹१,८५०/q</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-700 dark:text-neutral-200">🧅 {isMr ? "कांदा लाल" : "Red Onion"}</span>
                <span className="font-black text-emerald-700 dark:text-emerald-400">₹२,१००/q</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-700 dark:text-neutral-200">🌱 {isMr ? "सोयाबीन" : "Soybean"}</span>
                <span className="font-black text-emerald-700 dark:text-emerald-400">₹४,५२०/q</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              to="/markets"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
            >
              {isMr ? "८ बाजार समित्यांचे दर पहा" : "View 8 Mandis"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Disease Check Action */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-emerald-900/10 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {isMr ? "पिकांची तपासणी" : "Plant Disease Check"}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 flex items-center justify-center">
                <ScanLine className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {isMr
                ? "पानांवर डाग किंवा किड आहे का? कॅमेऱ्याने फोटो काढून ५ सेकंदात रोग ओळखा."
                : "Leaves turning yellow or spotted? Photograph the leaf for instant AI diagnosis."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              to="/detect"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition"
            >
              <ScanLine className="w-4 h-4" />
              {isMr ? "पिकाचा फोटो तपासा" : "Scan Plant Now"}
            </Link>
          </div>
        </div>

        {/* 24x7 AI Assistant */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-emerald-900/10 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {isMr ? "कृषी मित्र AI सहाय्यक" : "AI Farm Advisor"}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {isMr
                ? "खत, फवारणी, बाजारभाव किंवा कीड नियंत्रणावर मराठीत बोलून प्रश्न विचारा."
                : "Ask any question about crops, fertilizers, sprays or mandi prices."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-xs shadow-sm transition"
            >
              <Bot className="w-4 h-4" />
              {isMr ? "कृषी मित्राशी बोला" : "Chat with Assistant"}
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. BEST CROP RECOMMENDATION: SOIL & WATER ADVISORY */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-emerald-900/10 dark:border-neutral-800 shadow-sm space-y-6">
        {/* Title & Explainer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-50">
                  {isMr ? "माती व हंगामानुसार सर्वोत्तम पीक शिफारस" : "Soil-Based Crop Yield Advisory"}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {isMr
                    ? "तुमच्या शेताच्या मातीचा प्रकार व पाण्याच्या सोयीनुसार कोणते पीक सर्वाधिक उत्पादन देईल?"
                    : "AI Machine Learning model predicts the highest-yielding crop for your specific soil."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {recs?.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-bold transition"
              >
                <FileSpreadsheet className="w-4 h-4" />
                {isMr ? "अहवाल डाउनलोड (CSV)" : "Export CSV"}
              </button>
            )}
          </div>
        </div>

        {/* Step 1: Select Soil Preset */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 dark:text-neutral-100 mb-2">
            🌱 {isMr ? "पायरी १: तुमच्या जमिनीचा प्रकार निवडा (१-टॅप सोपी निवड):" : "Step 1: Choose your soil & water type:"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SOIL_PRESETS.map((preset) => {
              const active = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    active
                      ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 bg-neutral-50/60 dark:bg-neutral-800/40"
                  }`}
                >
                  {active && (
                    <span className="absolute top-3 right-3 text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                    </span>
                  )}
                  <span className="text-2xl mb-2 block">{preset.icon}</span>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
                    {isHi ? (preset.titleHi || preset.titleMr) : isMr ? preset.titleMr : preset.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {isHi ? (preset.descHi || preset.descMr) : isMr ? preset.descMr : preset.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Farm Size (Acres) */}
        <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="block text-sm font-bold text-neutral-800 dark:text-neutral-100">
              📏 {isMr ? "पायरी २: तुमचे शेत क्षेत्र किती एकर आहे?" : "Step 2: Enter Farm Size (in Acres):"}
            </span>
            <span className="text-xs text-neutral-500">
              {isMr ? "१ एकर = सुमारे ४० गुंठे / ०.४ हेक्टर" : "1 Acre ≈ 0.40 Hectare"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 2.5, 5, 10].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAcres(val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  acres === val
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {val} {isMr ? "एकर" : "Acres"}
              </button>
            ))}
            <div className="flex items-center gap-1 pl-2 border-l border-neutral-300 dark:border-neutral-600">
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(Math.max(0.5, Number(e.target.value)))}
                className="w-16 px-2 py-1 text-center font-bold text-sm bg-white dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600"
              />
              <span className="text-xs font-semibold text-neutral-500">{isMr ? "एकर" : "Ac"}</span>
            </div>
          </div>
        </div>

        {/* Step 3: Progressive Disclosure for Soil Lab Values */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvancedSoil(!showAdvancedSoil)}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            <span>🔬 {isHi ? "माटी परीक्षण रिपोर्ट अनुसार आंकड़े बदलें (लाइव pH व पोषक तत्व):" : isMr ? "माती परीक्षण अहवालानुसार अचूक आकडे भरा (थेट सामू pH व खते):" : "Advanced: Custom Soil Test Values (Live pH & Nutrients):"}</span>
            {showAdvancedSoil ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAdvancedSoil && (
            <div className="mt-3 p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-4 animate-fadeIn">
              {/* Interactive pH Slider Banner */}
              <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    🧪 {isHi ? "मिट्टी pH (सामू) लाइव स्लाइडर:" : isMr ? "माती सामू (pH) थेट स्लाइडर:" : "Soil pH Live Slider:"}
                    <span className={`text-xs px-2.5 py-0.5 rounded-md font-black ${
                      soilForm.ph < 5.5
                        ? "bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300"
                        : soilForm.ph > 8.2
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                    }`}>
                      pH {soilForm.ph}
                    </span>
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500">
                    {soilForm.ph < 5.5
                      ? (isHi ? "अम्लीय (Acidic)" : isMr ? "आम्लधर्मी (Acidic)" : "Acidic")
                      : soilForm.ph > 8.2
                      ? (isHi ? "क्षारीय (Alkaline)" : isMr ? "विम्ल/क्षारपड (Alkaline)" : "Alkaline")
                      : (isHi ? "समतोल (Optimal)" : isMr ? "समतोल (Optimal)" : "Optimal")}
                  </span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="10.0"
                  step="0.1"
                  value={soilForm.ph}
                  onChange={(e) => setSoilForm((prev) => ({ ...prev, ph: parseFloat(e.target.value) }))}
                  className="w-full accent-emerald-600 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-bold mt-1 px-1">
                  <span className="text-red-500">4.0 (तीव्र आम्ल / Acidic)</span>
                  <span className="text-emerald-600 font-black">7.0 (आदर्श / Neutral)</span>
                  <span className="text-amber-600">10.0 (तीव्र क्षार / Alkaline)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">माती pH (सामू)</span>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="11.0"
                    value={soilForm.ph}
                    onChange={(e) => setSoilForm({ ...soilForm, ph: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">नायट्रोजन (N) kg/ha</span>
                  <input
                    type="number"
                    value={soilForm.n}
                    onChange={(e) => setSoilForm({ ...soilForm, n: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">फॉस्फरस (P) kg/ha</span>
                  <input
                    type="number"
                    value={soilForm.p}
                    onChange={(e) => setSoilForm({ ...soilForm, p: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">पोटॅश (K) kg/ha</span>
                  <input
                    type="number"
                    value={soilForm.k}
                    onChange={(e) => setSoilForm({ ...soilForm, k: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">ओलावा (Moisture %)</span>
                  <input
                    type="number"
                    value={soilForm.moisture}
                    onChange={(e) => setSoilForm({ ...soilForm, moisture: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
                <label className="text-xs flex flex-col gap-1">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">पाऊस (Rain mm)</span>
                  <input
                    type="number"
                    value={soilForm.rain_sum}
                    onChange={(e) => setSoilForm({ ...soilForm, rain_sum: Number(e.target.value) })}
                    className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-neutral-900 text-sm font-bold"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Soil Health & pH Diagnostics Banner */}
        <div className={`p-4 rounded-2xl border transition-all ${
          soilHealthNotice.type === "acidic"
            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/60"
            : soilHealthNotice.type === "alkaline"
            ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60"
            : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {soilHealthNotice.type === "optimal" ? "🌱" : "⚠️"}
              </span>
              <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                {soilHealthNotice.title}
              </h3>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold self-start sm:self-center border ${soilHealthNotice.badgeBg}`}>
              {soilHealthNotice.badgeText}
            </span>
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {soilHealthNotice.advice}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => runRecommendation(soilForm, acres)}
            disabled={busy}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-sm shadow-md transition cursor-pointer select-none"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: busy ? "2s" : "0s" }} />
            {busy
              ? (isHi ? "AI मॉडल गणना कर रहा है..." : isMr ? "AI मॉडेल गणना करत आहे..." : "Calculating best crops...")
              : (isHi ? "सर्वोत्तम फसल सिफारिश प्राप्त करें" : isMr ? "सर्वोत्तम पीक शिफारस मिळवा" : "Calculate Best Crop Yield")}
          </button>

          <span className="text-xs text-neutral-500">
            {isHi ? "⚡ pH या अन्य मान बदलने पर परिणाम स्वतः अपडेट होते हैं" : isMr ? "⚡ सामू (pH) किंवा घटक बदलल्यास थेट त्वरित अपडेट होते" : "⚡ Yields update live as you change pH and soil factors"}
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* ======================================================== */}
        {/* RECOMMENDATION RESULTS CARDS */}
        {/* ======================================================== */}
        {busy ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : recs?.length > 0 ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                🏆 {isHi ? "आपकी भूमि अनुसार फसल वरीयता क्रम:" : isMr ? "तुमच्या जमिनीनुसार पीक क्रमवारी:" : "Crop Suitability Ranking for Your Land:"}
              </h4>
              <span className="text-xs font-semibold text-neutral-500">
                {isHi ? `अनुमान: ${acres} एकड़ खेत हेतु` : isMr ? `अंदाज: ${acres} एकर शेतासाठी` : `Estimated for ${acres} Acres`}
              </span>
            </div>

            {/* Rank #1 Winner Card */}
            {recs[0] && (
              <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 dark:from-neutral-800 dark:via-neutral-800/90 dark:to-emerald-950/40 rounded-3xl p-5 border-2 border-emerald-500 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {recs[0].icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-900">
                          <Trophy className="w-3 h-3" />
                          #1 {isHi ? "सर्वोत्तम सिफारिश" : isMr ? "सर्वोत्तम शिफारस" : "Top Recommended"}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                          {recs[0].bestSeason}
                        </span>
                        {/* Dynamic pH Tolerance Badge */}
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          recs[0].phStatus === "acidic_stress"
                            ? "bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300 border-red-300"
                            : recs[0].phStatus === "alkaline_stress"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300"
                        }`}>
                          {recs[0].phStatus === "acidic_stress"
                            ? (isHi ? `⚠️ अम्लीय तनाव (${recs[0].phNote})` : isMr ? `⚠️ आम्ल ताण (${recs[0].phNote})` : `⚠️ ${recs[0].phNote}`)
                            : recs[0].phStatus === "alkaline_stress"
                            ? (isHi ? `⚠️ क्षारीय तनाव (${recs[0].phNote})` : isMr ? `⚠️ क्षार ताण (${recs[0].phNote})` : `⚠️ ${recs[0].phNote}`)
                            : (isHi ? "✅ pH अनुकूल (100%)" : isMr ? "✅ pH अनुकूल (१००%)" : "✅ Optimal pH")}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
                        {recs[0].nameLocalized || recs[0].name}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                        📍 {recs[0].puneSuitability}
                      </p>
                    </div>
                  </div>

                  {/* Yield numbers */}
                  <div className="bg-white/90 dark:bg-neutral-900/90 rounded-2xl p-4 border border-emerald-400/40 text-right sm:min-w-[210px] shadow-sm">
                    <span className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      {isHi ? "अपेक्षित कुल पैदावार" : isMr ? "अंदाजित एकूण उत्पादन" : "Expected Yield"}
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                      {(recs[0].yieldQPerAcre * acres).toFixed(1)}{" "}
                      <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                        {isHi ? "क्विंटल (कुल)" : isMr ? "क्विंटल (एकूण)" : "q total"}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-300 font-semibold mt-0.5">
                      <span>{recs[0].yieldQPerAcre} {isHi ? "क्विंटल/एकड़" : isMr ? "क्विंटल/एकर" : "q/acre"}</span>
                      <span className="text-neutral-400 font-normal"> • </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{recs[0].yieldQPerHa} q/ha</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-neutral-700 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">
                    {isHi ? "जमीन अनुकूलता क्षमता:" : isMr ? "जमीन अनुकूलता क्षमता:" : "Land Suitability Potential:"}
                  </span>
                  <div className="flex items-center gap-2 w-1/2">
                    <div className="flex-1 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${recs[0].score}%` }} />
                    </div>
                    <span className="font-black text-emerald-700 dark:text-emerald-300">{recs[0].score}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Other Ranks (2, 3, 4, 5, 6, 7) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recs.slice(1).map((crop) => (
                <div
                  key={crop.name}
                  className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{crop.icon}</span>
                      <div className="flex items-center gap-1.5">
                        {/* pH Badge */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          crop.phStatus === "acidic_stress"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                            : crop.phStatus === "alkaline_stress"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        }`}>
                          {crop.phStatus === "acidic_stress"
                            ? (isHi ? "⚠️ अम्लीय ताण" : isMr ? "⚠️ आम्ल ताण" : "⚠️ Acidic")
                            : crop.phStatus === "alkaline_stress"
                            ? (isHi ? "⚠️ क्षारीय ताण" : isMr ? "⚠️ क्षार ताण" : "⚠️ Alkaline")
                            : (isHi ? "✅ pH अनुकूल" : isMr ? "✅ pH अनुकूल" : "✅ Optimal")}
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200">
                          #{crop.rank}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                      {crop.nameLocalized || crop.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{crop.bestSeason}</p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">📍 {crop.puneSuitability}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-neutral-500">
                        {isHi ? "कुल उपज:" : isMr ? "एकूण उत्पादन:" : "Total Yield:"}
                      </span>
                      <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">
                        {(crop.yieldQPerAcre * acres).toFixed(1)} {isHi ? "क्विंटल" : isMr ? "क्विंटल" : "q"}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-neutral-500 mt-0.5">
                      <span>{crop.yieldQPerAcre} {isHi ? "क्विंटल/एकड़" : isMr ? "क्विंटल/एकर" : "q/acre"}</span>
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">{crop.yieldQPerHa} q/ha</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${crop.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* ======================================================== */}
      {/* 4. PUNE MANDI LIVE PRICES & PRICE TREND MINI-CHART */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-emerald-900/10 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                  {isMr ? "पुणे बाजारभाव व ७ दिवसांचा अंदाज" : "Pune Mandi 7-Day Price Forecast"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {isMr
                    ? "पुणे मार्केट यार्डातील प्रत्यक्ष दर आणि पुढील ७ दिवसांचा अंदाजित ट्रेंड"
                    : "Actual daily rates & forward projected prices for key Pune cash crops."}
                </p>
              </div>
            </div>
          </div>

          {/* Crop selector pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "tomato", mr: "🍅 टोमॅटो", en: "Tomato" },
              { id: "onion", mr: "🧅 कांदा", en: "Onion" },
              { id: "soybean", mr: "🌱 सोयाबीन", en: "Soybean" },
              { id: "wheat", mr: "🌾 गहू", en: "Wheat" }
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setMarketCrop(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  marketCrop === c.id
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
                }`}
              >
                {isMr ? c.mr : c.en}
              </button>
            ))}
            <Link
              to="/markets"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-700 inline-flex items-center gap-1"
            >
              {isMr ? "सर्व बाजारभाव →" : "All Mandis →"}
            </Link>
          </div>
        </div>

        {/* Current price banner */}
        {mandiPrices && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-[11px] font-bold text-neutral-500 uppercase">{isMr ? "आजचा सरासरी भाव" : "Modal Price"}</span>
              <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                ₹{mandiPrices.modal_price || 1850}{" "}
                <span className="text-xs font-normal text-neutral-500">/q</span>
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-[11px] font-bold text-neutral-500 uppercase">{isMr ? "किमान - कमाल दर" : "Min - Max Rate"}</span>
              <div className="text-sm font-black text-neutral-800 dark:text-neutral-200 mt-1">
                ₹{mandiPrices.min_price || 1400} - ₹{mandiPrices.max_price || 2300}
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-[11px] font-bold text-neutral-500 uppercase">{isMr ? "७ दिवसांचा ट्रेंड" : "7-Day Trend"}</span>
              <div className="text-sm font-black text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                {mandiPrices.trend || (isMr ? "स्थिर व वाढीव" : "Bullish")}
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-[11px] font-bold text-neutral-500 uppercase">{isMr ? "विक्री सल्ला" : "Selling Advice"}</span>
              <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mt-1">
                {isMr ? "प्रतवारीनुसार विक्री करावी" : "Grade A for maximum price"}
              </div>
            </div>
          </div>
        )}

        {/* SVG Price Chart */}
        <div className="pt-2">
          {pricesLoading ? (
            <Skeleton className="h-64 w-full rounded-2xl" />
          ) : chartSeries.length > 0 ? (
            <PriceChart data={chartSeries} />
          ) : (
            <div className="py-12 text-center text-sm text-neutral-500">
              {isMr ? "बाजारभाव लोड होत आहेत..." : "Loading market prices..."}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. EMBEDDED PROJECT ASSETS & EVALUATION HUB */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-emerald-900/10 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-indigo-700 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                {isHi ? "प्रोजेक्ट दस्तावेज एवं मूल्यांकन केंद्र" : isMr ? "प्रकल्प अहवाल, सर्वेक्षण व चाचणी केंद्र" : "Project Deliverables & Documentation Hub"}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isHi
                  ? "स्थानीय फ़ोल्डर में उपलब्ध किसान सर्वेक्षण (.docx), प्रेजेंटेशन डेक (.pptx), और जेमीटर परफॉर्मेंस रिपोर्ट"
                  : isMr
                  ? "स्थानिक फोल्डरमधील थेट शेतकरी प्रश्नावली (.docx), सादरीकरण (.pptx) आणि JMeter चाचणी आलेख"
                  : "Direct access to farmer survey Word docs, pitch deck PPTX, and JMeter load test graphs."}
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800 self-start sm:self-center">
            📁 Local: /public/docs/
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Survey Docx */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                {isHi ? "त्रैभाषिक किसान सर्वेक्षण (.docx)" : isMr ? "त्रिभाषिक शेतकरी प्रश्नावली (.docx)" : "Trilingual Farmer Survey (.docx)"}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {isHi ? "हिंदी, अंग्रेजी और मराठी में चेकबॉक्स सहित फील्ड प्रश्नावली।" : isMr ? "मराठी, हिंदी व इंग्रजीत शेतकरी समस्यांची चेकबॉक्स प्रश्नावली." : "Field questionnaire with checkboxes in Hindi, Marathi & English."}
              </p>
            </div>
            <a
              href="/docs/Farmer_Problem_Survey_Questionnaire_Trilingual.docx"
              download
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              {isHi ? "Word फ़ाइल डाउनलोड करें" : isMr ? "Word फाईल डाउनलोड" : "Download DOCX"}
            </a>
          </div>

          {/* Presentation PPTX */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                {isHi ? "प्रोजेक्ट प्रेजेंटेशन डेक (.pptx)" : isMr ? "प्रकल्प सादरीकरण डेक (.pptx)" : "Project Pitch Deck (.pptx)"}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {isHi ? "किसान पर्सोना, इंटरव्यू और एमएल आर्किटेक्चर सहित पूर्ण स्लाइड डेक।" : isMr ? "शेतकरी मुलाखती, युझर पर्सोना व ML आर्किटेक्चर सादरीकरण." : "16:9 widescreen presentation with personas & ML architecture."}
              </p>
            </div>
            <a
              href="/docs/AgriVision_Presentation_Deck.pptx"
              download
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              {isHi ? "PowerPoint डाउनलोड करें" : isMr ? "PPTX डाउनलोड" : "Download PPTX"}
            </a>
          </div>

          {/* JMeter Testing Results */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                {isHi ? "JMeter लोड टेस्टिंग आलेख" : isMr ? "JMeter कार्यक्षमता चाचणी अहवाल" : "JMeter Testing Report & Graphs"}
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {isHi ? "3,500 अनुरोधों पर 100% सफलता, 0.00% त्रुटि दर एवं थ्रूपुट ग्राफ़।" : isMr ? "३,५०० विनंत्यांवर १००% यश, ०% त्रुटी आणि अचूक प्रतिसाद आलेख." : "3,500 requests benchmark, 100% success rate, 0.00% error rate."}
              </p>
            </div>
            <a
              href="/docs/05_agrivision_jmeter_graphs_summary.png"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition"
            >
              <ExternalLink className="w-4 h-4" />
              {isHi ? "टेस्ट ग्राफ़ देखें (PNG)" : isMr ? "चाचणी आलेख पहा" : "View Graphs"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
