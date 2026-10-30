# backend/services/market_service.py
from datetime import date, timedelta
import random

# Pune District APMCs & Mandis
PUNE_MANDIS = [
    {
        "id": "pune",
        "name": "पुणे - श्री छत्रपती शिवाजी मार्केट यार्ड (गुलटेकडी)",
        "name_en": "Pune - Market Yard (Gultekdi)",
        "district": "Pune",
        "distance_km": 0,
        "specialty": "सर्व पिके, फळे व भाजीपाला (Central Hub)"
    },
    {
        "id": "narayangaon",
        "name": "नारायणगाव - जुन्नर कृषी उत्पन्न बाजार समिती",
        "name_en": "Narayangaon / Junnar APMC",
        "district": "Pune (North)",
        "distance_km": 75,
        "specialty": "टोमॅटो हब (Asia's Top Tomato Market) व कोबी"
    },
    {
        "id": "chakan",
        "name": "चाकण - खेड कृषी उत्पन्न बाजार समिती",
        "name_en": "Chakan / Khed APMC",
        "district": "Pune (North)",
        "distance_km": 32,
        "specialty": "कांदा, बटाटा व भुईमूग (Major Onion & Potato Hub)"
    },
    {
        "id": "baramati",
        "name": "बारामती कृषी उत्पन्न बाजार समिती",
        "name_en": "Baramati APMC",
        "district": "Pune (South-East)",
        "distance_km": 100,
        "specialty": "सोयाबीन, गहू, डाळिंब व ऊस गूळ"
    },
    {
        "id": "manchar",
        "name": "मंचर - आंबेगाव कृषी उत्पन्न बाजार समिती",
        "name_en": "Manchar / Ambegaon APMC",
        "district": "Pune",
        "distance_km": 62,
        "specialty": "बटाटा, कांदा व हिरवे वाटाणे"
    },
    {
        "id": "shirur",
        "name": "शिरूर कृषी उत्पन्न बाजार समिती",
        "name_en": "Shirur APMC",
        "district": "Pune (East)",
        "distance_km": 65,
        "specialty": "बाजरी, कांदा व कडधान्ये"
    },
    {
        "id": "saswad",
        "name": "सासवड - पुरंदर कृषी उत्पन्न बाजार समिती",
        "name_en": "Saswad / Purandar APMC",
        "district": "Pune (South)",
        "distance_km": 30,
        "specialty": "पुरंदर अंजीर (GI Fig), सीताफळ व वाटाणा"
    },
    {
        "id": "daund",
        "name": "दौंड कृषी उत्पन्न बाजार समिती",
        "name_en": "Daund APMC",
        "district": "Pune (East)",
        "distance_km": 80,
        "specialty": "गहू, ज्वारी व ऊस गूळ"
    }
]

# Major crops grown around Pune district with realistic price baselines (Rs/quintal)
COMMODITIES = [
    {
        "id": "tomato",
        "name": "टोमॅटो (Tomato)",
        "name_en": "Tomato",
        "base_min": 1800,
        "base_modal": 2450,
        "base_max": 3100,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 3200,
        "trend_bias": 15
    },
    {
        "id": "onion",
        "name": "कांदा (Onion)",
        "name_en": "Onion",
        "base_min": 2100,
        "base_modal": 2850,
        "base_max": 3500,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 5800,
        "trend_bias": 25
    },
    {
        "id": "soybean",
        "name": "सोयाबीन (Soybean)",
        "name_en": "Soybean",
        "base_min": 4200,
        "base_modal": 4650,
        "base_max": 4900,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 1400,
        "trend_bias": 10
    },
    {
        "id": "pomegranate",
        "name": "डाळिंब - भगवा (Pomegranate)",
        "name_en": "Pomegranate (Bhagwa)",
        "base_min": 7500,
        "base_modal": 11500,
        "base_max": 15500,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 650,
        "trend_bias": 50
    },
    {
        "id": "wheat",
        "name": "गहू - लोकवन/शरबती (Wheat)",
        "name_en": "Wheat (Lokwan)",
        "base_min": 2400,
        "base_modal": 2850,
        "base_max": 3250,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 2100,
        "trend_bias": 5
    },
    {
        "id": "bajra",
        "name": "बाजरी (Bajra)",
        "name_en": "Bajra",
        "base_min": 2000,
        "base_modal": 2400,
        "base_max": 2700,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 1200,
        "trend_bias": -5
    },
    {
        "id": "potato",
        "name": "बटाटा (Potato)",
        "name_en": "Potato",
        "base_min": 1400,
        "base_modal": 1850,
        "base_max": 2300,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 4100,
        "trend_bias": -10
    },
    {
        "id": "capsicum",
        "name": "ढोबळी मिरची (Capsicum)",
        "name_en": "Capsicum / Shimla Mirch",
        "base_min": 2800,
        "base_modal": 3600,
        "base_max": 4400,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 850,
        "trend_bias": 20
    },
    {
        "id": "chickpea",
        "name": "हरभरा / चना (Gram)",
        "name_en": "Gram / Chickpea",
        "base_min": 5200,
        "base_modal": 5750,
        "base_max": 6200,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 950,
        "trend_bias": 8
    },
    {
        "id": "sugarcane_jaggery",
        "name": "गूळ (Jaggery)",
        "name_en": "Jaggery (Gur)",
        "base_min": 3500,
        "base_modal": 3950,
        "base_max": 4400,
        "unit": "₹/क्विंटल (100 kg)",
        "daily_volume": 1100,
        "trend_bias": 12
    }
]


def get_pune_mandis():
    return PUNE_MANDIS


def get_commodities():
    return COMMODITIES


def forecast(commodity_id: str = "tomato", mandi_id: str = "pune", horizon_days: int = 7) -> dict:
    """Generates realistic historical trend + forecast for Pune district mandis."""
    # Normalize inputs
    comm_id = (commodity_id or "tomato").lower().strip()
    m_id = (mandi_id or "pune").lower().strip()
    horizon = max(1, min(30, int(horizon_days or 7)))

    # Find commodity
    comm = next((c for c in COMMODITIES if c["id"] == comm_id or comm_id in c["name_en"].lower()), None)
    if not comm:
        comm = COMMODITIES[0]

    # Find mandi
    mandi = next((m for m in PUNE_MANDIS if m["id"] == m_id or m_id in m["name_en"].lower()), None)
    if not mandi:
        mandi = PUNE_MANDIS[0]

    # Specific regional price modifiers
    # e.g., Narayangaon gives slightly higher tomato prices; Chakan gives higher onion prices
    mandi_modifier = 0
    if mandi["id"] == "narayangaon" and comm["id"] == "tomato":
        mandi_modifier = 180  # Premier hub premium
    elif mandi["id"] == "chakan" and comm["id"] in ["onion", "potato"]:
        mandi_modifier = 120
    elif mandi["id"] == "baramati" and comm["id"] in ["soybean", "pomegranate"]:
        mandi_modifier = 150
    elif mandi["id"] == "saswad" and comm["id"] in ["onion", "capsicum"]:
        mandi_modifier = 90

    base_modal = comm["base_modal"] + mandi_modifier
    base_min = comm["base_min"] + int(mandi_modifier * 0.7)
    base_max = comm["base_max"] + int(mandi_modifier * 1.3)

    today = date.today()

    # Generate 7 days of historical prices + horizon_days of future forecast
    series = []
    # Seed pseudo-random generator with commodity + date so numbers are consistent per day
    seed_val = sum(ord(c) for c in (comm["id"] + mandi["id"])) + today.toordinal()
    rng = random.Random(seed_val)

    # 1. Historical data (-7 days to yesterday)
    for i in range(-7, 0):
        day_date = today + timedelta(days=i)
        # Random historical jitter
        drift = rng.randint(-60, 60) + (i * 10)
        day_modal = round(base_modal + drift)
        series.append({
            "date": day_date.strftime("%d %b"),
            "full_date": str(day_date),
            "price": day_modal,
            "min_price": round(day_modal * 0.85),
            "max_price": round(day_modal * 1.18),
            "status": "historical",
            "volume_qtl": round(comm["daily_volume"] * rng.uniform(0.85, 1.15))
        })

    # 2. Today's current live price
    today_modal = round(base_modal + rng.randint(-20, 40))
    today_min = round(today_modal * 0.84)
    today_max = round(today_modal * 1.20)
    series.append({
        "date": today.strftime("%d %b") + " (आज)",
        "full_date": str(today),
        "price": today_modal,
        "min_price": today_min,
        "max_price": today_max,
        "status": "today",
        "volume_qtl": comm["daily_volume"]
    })

    # 3. Future Forecast (1 to horizon_days)
    cum_trend = 0
    for i in range(1, horizon + 1):
        day_date = today + timedelta(days=i)
        # Apply commodity trend bias + slight noise
        cum_trend += comm["trend_bias"] + rng.randint(-15, 20)
        proj_modal = round(today_modal + cum_trend)
        series.append({
            "date": day_date.strftime("%d %b"),
            "full_date": str(day_date),
            "price": proj_modal,
            "min_price": round(proj_modal * 0.83),
            "max_price": round(proj_modal * 1.22),
            "status": "forecast",
            "volume_qtl": round(comm["daily_volume"] * rng.uniform(0.9, 1.1))
        })

    # Compare current commodity prices across all other Pune mandis
    comparison = []
    for other_m in PUNE_MANDIS:
        other_mod = 0
        if other_m["id"] == "narayangaon" and comm["id"] == "tomato":
            other_mod = 180
        elif other_m["id"] == "chakan" and comm["id"] in ["onion", "potato"]:
            other_mod = 120
        elif other_m["id"] == "baramati" and comm["id"] in ["soybean", "pomegranate"]:
            other_mod = 150
        elif other_m["id"] == "pune":
            other_mod = 40

        other_modal = round(comm["base_modal"] + other_mod + rng.randint(-30, 30))
        comparison.append({
            "mandi_id": other_m["id"],
            "mandi_name": other_m["name"],
            "mandi_name_en": other_m["name_en"],
            "distance_km": other_m["distance_km"],
            "modal_price": other_modal,
            "min_price": round(other_modal * 0.84),
            "max_price": round(other_modal * 1.20),
            "is_selected": (other_m["id"] == mandi["id"])
        })

    # Sort comparison by highest modal price
    comparison.sort(key=lambda x: x["modal_price"], reverse=True)
    best_mandi = comparison[0]

    # Daily percentage change
    yesterday_price = series[6]["price"]
    change_pct = round(((today_modal - yesterday_price) / yesterday_price) * 100, 1)

    # Actionable Pune-specific advisory
    comm_hi = {
        "tomato": "टमाटर",
        "onion": "प्याज",
        "soybean": "सोयाबीन",
        "pomegranate": "अनार",
        "wheat": "गेहूं",
        "potato": "आलू",
        "capsicum": "शिमला मिर्च",
        "bajra": "बाजरा"
    }.get(comm["id"], comm["name_en"])

    mandi_hi = best_mandi["mandi_name_en"]

    if comm["trend_bias"] > 10:
        advisory_mr = (
            f"पुढील {horizon} दिवसांत {comm['name'].split()[0]} आवक मर्यादित राहण्याची शक्यता असून भावात तेजीचे संकेत आहेत. "
            f"शक्य असल्यास माल टप्प्याटप्प्याने बाजारात आणावा. आज {best_mandi['mandi_name'].split()[0]} बाजारात सर्वाधिक भाव मिळत आहे."
        )
        advisory_hi = (
            f"अगले {horizon} दिनों में {comm_hi} की आवक सीमित रहने की संभावना है और भाव में तेजी के संकेत हैं। "
            f"संभव हो तो फसल को चरणबद्ध तरीके से बाजार में लाएं। आज {mandi_hi} में सबसे अच्छा भाव मिल रहा है।"
        )
        advisory_en = (
            f"Prices for {comm['name_en']} are projected to trend upward over the next {horizon} days due to lower expected arrivals. "
            f"Consider staggered selling. Currently, {best_mandi['mandi_name_en']} offers the highest modal rate."
        )
    elif comm["trend_bias"] < 0:
        advisory_mr = (
            f"{comm['name'].split()[0]} बाजारात आवक वाढण्याची शक्यता असल्याने दरात किंचित नरमाई राहू शकते. "
            f"तयार माल जास्त काळ न रोखता प्रतवारीनुसार चांगल्या बाजारपेठेत विक्रीचा निर्णय घ्यावा."
        )
        advisory_hi = (
            f"{comm_hi} मंडी में आवक बढ़ने की संभावना है जिससे भाव में हल्की नरमी रह सकती है। "
            f"तैयार फसल को ज्यादा समय तक न रोकें और उचित ग्रेडिंग के साथ अच्छी मंडी में बेचें।"
        )
        advisory_en = (
            f"Arrivals of {comm['name_en']} are picking up, which may keep prices steady to slightly lower. "
            f"Avoid holding perishable stock too long. Grade properly before dispatch."
        )
    else:
        advisory_mr = (
            f"{comm['name'].split()[0]} भाव स्थिर राहण्याचा अंदाज आहे. स्थानिक बाजारपेठेचा वाहतूक खर्च विचारात घेऊन योग्य मंडी निवडावी."
        )
        advisory_hi = (
            f"{comm_hi} के भाव स्थिर रहने का अनुमान है। स्थानीय परिवहन खर्च को ध्यान में रखकर सही मंडी चुनें।"
        )
        advisory_en = (
            f"Prices for {comm['name_en']} are expected to remain range-bound and stable. "
            f"Factor in transportation costs when choosing between Pune mandis."
        )

    return {
        "commodity": {
            "id": comm["id"],
            "name": comm["name"],
            "name_en": comm["name_en"],
            "unit": comm["unit"]
        },
        "mandi": {
            "id": mandi["id"],
            "name": mandi["name"],
            "name_en": mandi["name_en"],
            "district": mandi["district"],
            "distance_km": mandi["distance_km"],
            "specialty": mandi["specialty"]
        },
        "current": {
            "modal": today_modal,
            "min": today_min,
            "max": today_max,
            "change_pct": change_pct,
            "arrival_qtl": comm["daily_volume"]
        },
        "best_mandi": best_mandi,
        "advisory": {
            "mr": advisory_mr,
            "hi": advisory_hi,
            "en": advisory_en
        },
        "series": series,
        "comparison": comparison
    }
