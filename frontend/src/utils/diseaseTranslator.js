// src/utils/diseaseTranslator.js
// Translates raw ML model disease labels into human-friendly names, scientific causes,
// environmental outbreak triggers, and actionable organic & chemical remedies.

const DISEASE_MAP = {
  "Tomato___Early_blight": {
    en: "Tomato — Early Blight (Alternaria Solani)",
    mr: "टोमॅटो — करपा / अर्ली ब्लाइट (अल्टरनेरिया)",
    hi: "टमाटर — अगेती झुलसा (अर्ली ब्लाइट)",
    plantEn: "Tomato",
    plantMr: "टोमॅटो",
    plantHi: "टमाटर",
    pathogenType: "fungal",
    pathogenName: "Alternaria solani (Fungus)",
    causeEn: "Fungal spores survive in soil debris and splash onto lower leaves during irrigation or rain.",
    causeMr: "जमिनीतील जुन्या पिकांच्या अवशेषांमध्ये बुरशीचे बीजाणू जिवंत राहतात आणि पाण्याच्या उडणाऱ्या थेंबांमुळे खालच्या पानांवर पसरतात.",
    causeHi: "फंगल बीजाणु मिट्टी और पुरानी फसल के अवशेषों में जीवित रहते हैं और पानी के छींटों से फैलते हैं।",
    triggersEn: "Warm temperatures (24°C - 29°C), high humidity (>80%), and alternating wet/dry weather.",
    triggersMr: "उबदार हवामान (२४°C ते २९°C), हवेतील जास्त दमटपणा (८०% पेक्षा जास्त) आणि पानांवर साचलेले पाणी.",
    triggersHi: "गरम तापमान (24°C - 29°C), उच्च आर्द्रता और रुक-रुक कर होने वाली बारिश।",
    organicRemediesEn: [
      "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil @ 5 ml/L water.",
      "Apply Trichoderma viride @ 50 g per 15L knapsack pump.",
      "Spray fermented sour buttermilk (ताक) @ 500 ml per 15L pump."
    ],
    organicRemediesMr: [
      "५% निंबोळी अर्क किंवा ५ मिली कडुलिंब तेल प्रति लिटर पाण्यात १ मिली स्टिकर मिसळून फवारा.",
      "ट्रायकोडर्मा व्हिरिडी (Trichoderma viride) ५० ग्रॅम प्रति १५ लिटर पंप फवारा.",
      "आंबट ताक ५०० मिली प्रति १५ लिटर पंप पाण्यात मिसळून फवारा."
    ],
    organicRemediesHi: [
      "नीम का तेल (Neem Oil) 5 मिली प्रति लीटर पानी में मिलाकर छिड़कें।",
      "ट्राइकोडर्मा विरिडी 50 ग्राम प्रति 15 लीटर पंप घोलकर छिड़काव करें।",
      "खट्टी छाछ 500 मिली प्रति 15 लीटर पंप में मिलाकर प्राकृतिक कवकनाशी के रूप में इस्तेमाल करें।"
    ],
    chemicalRemediesEn: [
      "Preventive: Mancozeb 75% WP @ 35 g per 15L pump (Dithane M-45).",
      "Curative: Chlorothalonil 75% WP @ 30 g per 15L pump (Kavach).",
      "Severe Outbreak: Azoxystrobin + Difenoconazole @ 15 ml per 15L pump (Amistar Top)."
    ],
    chemicalRemediesMr: [
      "प्रतिबंधात्मक: मँकोझेब ७५% WP (डायथेन एम-४५) ३५ ग्रॅम प्रति १५ लिटर पंप.",
      "रोगाचा प्रादुर्भाव दिसताच: क्लोरोथॅलोनिल ७५% WP (कवच) ३० ग्रॅम प्रति १५ लिटर पंप.",
      "तीव्र प्रादुर्भावात: ॲझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल (ॲमिस्टार टॉप) १५ मिली प्रति १५ लिटर पंप."
    ],
    chemicalRemediesHi: [
      "रोकथाम हेतु: मैंकोजेब 75% WP (डाइथेन एम-45) 35 ग्राम प्रति 15 लीटर पंप।",
      "उपचार हेतु: क्लोरोथालोनिल 75% WP (कवच) 30 ग्राम प्रति 15 लीटर पंप।",
      "गंभीर स्थिति में: एमिस्टार टॉप 15 मिली प्रति 15 लीटर पंप।"
    ],
    preventativeEn: [
      "Prune bottom 30 cm foliage to prevent soil splash.",
      "Use drip irrigation instead of overhead sprinklers.",
      "Practice 2-year crop rotation avoiding potato, eggplant, or capsicum."
    ],
    preventativeMr: [
      "जमिनीपासून ३० सेमी उंचीपर्यंतची खालची पाने छाटून टाका.",
      "तुषार सिंचन टाळून ठिबक सिंचनाचा वापर करा.",
      "टोमॅटोनंतर लगेच बटाटा किंवा वांगी लावू नका."
    ],
    preventativeHi: [
      "निचली 30 सेमी तक की पत्तियों को काटकर हटा दें।",
      "ऊपर से फव्वारा सिंचाई बंद करें और ड्रिप से पानी दें।",
      "टमाटर के बाद आलू या बैंगन न लगाएं।"
    ]
  },

  "Tomato___Late_blight": {
    en: "Tomato — Late Blight (Phytophthora Water-soaked Rot)",
    mr: "टोमॅटो — लेट ब्लाइट / तांबेरा (काळपट ओले डाग व सड)",
    hi: "टमाटर — पछेती झुलसा (लेट ब्लाइट)",
    plantEn: "Tomato",
    plantMr: "टोमॅटो",
    plantHi: "टमाटर",
    pathogenType: "fungal",
    pathogenName: "Phytophthora infestans (Oomycete)",
    causeEn: "Aggressive airborne water-mold thriving in cold, overcast, rainy conditions.",
    causeMr: "थंड, धुक्याचे आणि सतत दमट पावसाळी हवामानात हवेतील बुरशीमुळे हा अत्यंत घातक रोग वेगाने पसरतो.",
    causeHi: "ठंडे और लगातार कोहरे/बारिश वाले मौसम में तेजी से हवा द्वारा फैलता है।",
    triggersEn: "Cool nights (10°C - 15°C), high humidity (>90%), and prolonged leaf wetness.",
    triggersMr: "थंड रात्री (१०°C ते १५°C), ९०% पेक्षा जास्त दमटपणा आणि पानांवर साचलेले दव.",
    triggersHi: "ठंडी रातें, 90% से अधिक आर्द्रता और पत्तियों पर लगातार ओस।",
    organicRemediesEn: [
      "Spray 1% Bordeaux mixture (बोर्डो मिश्रण) or Copper Hydroxide @ 30 g/pump.",
      "Apply Pseudomonas fluorescens bio-agent @ 50 g per 15L pump.",
      "Uproot and deeply bury heavily damaged foliage immediately."
    ],
    organicRemediesMr: [
      "१% बोर्डो मिश्रण किंवा कॉपर हायड्रॉक्साईड ३० ग्रॅम प्रति १५ लिटर पंप फवारा.",
      "स्यूडोमोनास फ्लुरोसन्स ५० ग्रॅम प्रति १५ लिटर पंप फवारा.",
      "अत्यंत बाधित झाडे शेताबाहेर जमिनीत पुरा किंवा जाळून टाका."
    ],
    organicRemediesHi: [
      "1% बोर्डो मिश्रण या कॉपर हाइड्रोक्साइड 30 ग्राम प्रति पंप का सुरक्षात्मक स्प्रे करें।",
      "स्यूडोमोनास 50 ग्राम प्रति 15 लीटर पंप छिड़कें।",
      "संक्रमित पौधों को खेत से बाहर निकालकर जमीन में गहरा दबाएं।"
    ],
    chemicalRemediesEn: [
      "Preventive: Copper Oxychloride 50% WP (Blitox) @ 40 g per 15L pump.",
      "Curative: Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 35 g per 15L pump.",
      "Heavy Outbreak: Dimethomorph 50% WP (Acrobat) @ 15 g OR Metalaxyl + Mancozeb @ 35 g per 15L pump."
    ],
    chemicalRemediesMr: [
      "प्रतिबंधात्मक: कॉपर ऑक्सिक्लोराईड ५०% WP (ब्लायटॉक्स) ४० ग्रॅम प्रति १५ लिटर पंप.",
      "सुरुवातीस: सायमॉक्सॅनिल ८% + मँकोझेब ६४% WP (कर्झेट) ३५ ग्रॅम प्रति १५ लिटर पंप.",
      "गंभीर प्रादुर्भावात: डायमेथोमॉर्फ ५०% WP (ॲक्रोबॅट) १५ ग्रॅम किंवा रिडोमिल गोल्ड ३५ ग्रॅम प्रति १५ लिटर पंप."
    ],
    chemicalRemediesHi: [
      "रोकथाम: कॉपर ऑक्सीक्लोराइड 50% WP (ब्लाइटॉक्स) 40 ग्राम प्रति 15 लीटर पंप।",
      "शुरुआती लक्षण: साइमोक्सानिल + मैंकोजेब (कर्जेट) 35 ग्राम प्रति 15 लीटर पंप।",
      "तीव्र प्रकोप: डाइमेथोमॉर्फ 50% WP (एक्रोबैट) 15 ग्राम या रिडोमिल गोल्ड 35 ग्राम प्रति 15L पंप।"
    ],
    preventativeEn: [
      "Do not irrigate in evening or night; foliage must dry before sunset.",
      "Maintain wide 90 cm row spacing for rapid wind aeration.",
      "Plant certified blight-tolerant hybrid seeds."
    ],
    preventativeMr: [
      "संध्याकाळी किंवा रात्री पाणी देणे टाळा; सूर्यास्तापूर्वी पाने कोरडी राहू द्या.",
      "दोन ओळींमध्ये किमान ९० सेमी अंतर ठेवा.",
      "रोगप्रतिकारक संकरित बियाण्यांची लागवड करा."
    ],
    preventativeHi: [
      "शाम या रात में सिंचाई न करें।",
      "कतारों के बीच 90 सेमी की दूरी रखें।",
      "रोग-प्रतिरोधी किस्मों के बीज लगाएं।"
    ]
  },

  "Tomato___Bacterial_spot": {
    en: "Tomato — Bacterial Spot (Xanthomonas)",
    mr: "टोमॅटो — जिवाणू ठिपके (बॅक्टेरियल स्पॉट)",
    hi: "टमाटर — जीवाणु धब्बा रोग",
    plantEn: "Tomato",
    plantMr: "टोमॅटो",
    plantHi: "टमाटर",
    pathogenType: "bacterial",
    pathogenName: "Xanthomonas campestris pv. vesicatoria",
    causeEn: "Seed-borne or wound-transmitted bacteria entering stomata in warm, rainy weather.",
    causeMr: "संसर्गित बियाणे किंवा जखमांमधून हे जिवाणू पानात शिरून काळे ठिपके निर्माण करतात.",
    causeHi: "संक्रमित बीज या औजारों द्वारा जीवाणु पत्तियों के छिद्रों से प्रवेश करते हैं।",
    triggersEn: "Warm temperatures (25°C - 30°C) with persistent rainy spells and driving winds.",
    triggersMr: "२५°C ते ३०°C उबदार तापमान, सोसाट्याचा वारा आणि पावसाची संततधार.",
    triggersHi: "तेज बारिश, उच्च तापमान (25°C - 30°C) और तेज हवाओं के साथ नमी।",
    organicRemediesEn: [
      "Hot water seed treatment at 50°C for 25 minutes prior to sowing.",
      "Foliar spray of Bacillus subtilis bio-bactericide @ 40 g per 15L pump."
    ],
    organicRemediesMr: [
      "लागवडीपूर्वी बियाण्यांवर ५०°C कोमट पाण्यात २५ मिनिटे बीजप्रक्रिया करा.",
      "बॅसिलस सबटिलिस जिवाणूनाशक ४० ग्रॅम प्रति १५ लिटर पंप फवारा."
    ],
    organicRemediesHi: [
      "बुवाई से पहले बीजों को 50°C गर्म पानी में 25 मिनट उपचारित करें।",
      "बैसिलस सबटिलिस 40 ग्राम प्रति 15 लीटर पंप छिड़कें।"
    ],
    chemicalRemediesEn: [
      "Standard: Copper Oxychloride 50% WP @ 35 g + Streptocycline @ 2 g per 15L pump.",
      "Alternative: Kasugamycin 3% SL (Kasu-B) @ 30 ml per 15L pump."
    ],
    chemicalRemediesMr: [
      "कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम + स्ट्रेप्टोसायक्लिन २ ग्रॅम प्रति १५ लिटर पंप एकत्र मिसळून फवारा.",
      "कासुगामायसिन ३% SL (कासु-बी) ३० मिली प्रति १५ लिटर पंप फवारा."
    ],
    chemicalRemediesHi: [
      "कॉपर ऑक्सीक्लोराइड 35 ग्राम + स्ट्रेप्टोसाइक्लिन 2 ग्राम प्रति 15 लीटर पंप।",
      "कासुगामाइसिन 3% SL 30 मिली प्रति 15 लीटर पंप।"
    ],
    preventativeEn: [
      "Never prune or work in fields while leaves are wet.",
      "Sterilize secateurs with alcohol between rows."
    ],
    preventativeMr: [
      "पाने ओली असताना छाटणी किंवा मशागत करू नका.",
      "छाटणीची हत्यारे सॅनिटायझरने निर्जंतुक करा."
    ],
    preventativeHi: [
      "पत्तियां गीली होने पर खेत में काम न करें।",
      "औजारों को सैनिटाइजर से साफ करते रहें।"
    ]
  },

  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    en: "Tomato — Yellow Leaf Curl Virus (TYLCV)",
    mr: "टोमॅटो — पिवळा चुरडा-मुरडा / कुकडा रोग (TYLCV)",
    hi: "टमाटर — पीला पत्ती मरोड़ रोग (लीफ कर्ल वायरस)",
    plantEn: "Tomato",
    plantMr: "टोमॅटो",
    plantHi: "टमाटर",
    pathogenType: "viral",
    pathogenName: "Tomato Yellow Leaf Curl Virus (Begomovirus)",
    causeEn: "Persistent viral transmission by Silverleaf Whiteflies feeding on leaf sap.",
    causeMr: "रस शोषणाऱ्या पांढऱ्या माशीमुळे (Whitefly) हा घातक विषाणू एका झाडावरून दुसऱ्या झाडावर पसरतो.",
    causeHi: "सफेद मक्खी (Whitefly) द्वारा संक्रमित पौधों से स्वस्थ पौधों में रस चूसने के दौरान यह वायरस फैलता है।",
    triggersEn: "Hot, dry conditions (28°C - 38°C) triggering massive whitefly populations.",
    triggersMr: "उष्ण व कोरडे हवामान (२८°C ते ३८°C); पांढऱ्या माशीची प्रचंड पैदास.",
    triggersHi: "गर्म और शुष्क मौसम (28°C - 38°C) जिसमें सफेद मक्खी की आबादी तेजी से बढ़ती है।",
    organicRemediesEn: [
      "Install 20-25 Yellow Sticky Traps per acre at canopy level.",
      "Spray Verticillium lecanii bio-insecticide @ 60 g per 15L pump.",
      "Spray 10,000 PPM Neem Oil @ 3 ml/L water every 7 days."
    ],
    organicRemediesMr: [
      "एकरमध्ये २० ते २५ पिवळे चिकट सापळे झाडांच्या उंचीवर लावा.",
      "व्हर्टिसिलियम लेकॅनी ही जैविक बुरशी ६० ग्रॅम प्रति १५ लिटर पंप फवारा.",
      "१०,००० PPM निंबोळी तेल ३ मिली प्रति लिटर पाण्यात मिसळून फवारा."
    ],
    organicRemediesHi: [
      "प्रति एकड़ 20-25 पीले चिपचिपे कार्ड (Yellow Sticky Traps) लगाएं।",
      "ब्यूवेरिया बासियाना जैविक कीटनाशक 60 ग्राम प्रति 15 लीटर पंप छिड़कें।",
      "नीम का तेल (10,000 PPM) 3 मिली प्रति लीटर पानी में मिलाकर हर हफ्ते छिड़कें।"
    ],
    chemicalRemediesEn: [
      "Vector Spray: Diafenthiuron 50% WP (Pegasus) @ 20 g per 15L pump.",
      "Systemic: Imidacloprid 17.8% SL (Confidor) @ 5 ml per 15L pump.",
      "Advanced: Cyantraniliprole 10.26% OD (Benevia) @ 30 ml per 15L pump."
    ],
    chemicalRemediesMr: [
      "पांढऱ्या माशीसाठी: डायाफेन्थिरॉन ५०% WP (पेगासस) २० ग्रॅम प्रति १५ लिटर पंप.",
      "अंतरप्रवाही औषध: इमिडाक्लोप्रिड १७.८% SL (कॉन्फिडोर) ५ मिली प्रति १५ लिटर पंप.",
      "अतिप्रभावी उपाय: सायन्ट्रानिलिप्रोल १०.२६% OD (बेनेव्हिया) ३० मिली प्रति १५ लिटर पंप."
    ],
    chemicalRemediesHi: [
      "सफेद मक्खी नियंत्रण: डायफेंथियूरॉन 50% WP (पेगासस) 20 ग्राम प्रति 15 लीटर पंप।",
      "प्रणालीगत कीटनाशक: इमिडाक्लोप्रिड 17.8% SL (कॉन्फिडोर) 5 मिली प्रति 15 लीटर पंप।",
      "आधुनिक कीटनाशक: सायनट्रानिलिप्रोल 10.26% OD (बेनेविया) 30 मिली प्रति 15 लीटर पंप।"
    ],
    preventativeEn: [
      "Uproot and burn virus-stunted plants immediately (no chemical cure for virus).",
      "Grow 3 border barrier rows of Maize or Sorghum.",
      "Protect nursery with 40-mesh insect netting."
    ],
    preventativeMr: [
      "चुरडा झालेले झाड ताबडतोब उपटून नष्ट करा (व्हायरसवर रासायनिक औषध चालत नाही).",
      "शेताभोवती मका किंवा ज्वारीच्या ३ ओळींचे कुंपण लावा.",
      "रोपवाटिकेवर ४० मेशचे कीटक प्रतिबंधक जाळे वापरा."
    ],
    preventativeHi: [
      "वायरस से ग्रसित पौधों को तुरंत उखाड़कर नष्ट करें।",
      "खेत के चारों ओर मक्का या ज्वार की 3 लाइनें लगाएं।",
      "नर्सरी में 40-मेश नेट का उपयोग करें।"
    ]
  },

  "Tomato___healthy": {
    en: "Tomato — Healthy Plant",
    mr: "टोमॅटो — निरोगी रोप",
    hi: "टमाटर — स्वस्थ पौधा",
    plantEn: "Tomato",
    plantMr: "टोमॅटो",
    plantHi: "टमाटर",
    pathogenType: "none",
    pathogenName: "No Pathogen Detected",
    causeEn: "Excellent leaf health, robust photosynthesis, and active balanced nutrition.",
    causeMr: "पीक पूर्णपणे निरोगी असून पानात हरितद्रव्याचे प्रमाण उत्तम आहे आणि कोणताही रोग नाही.",
    causeHi: "पौधा पूरी तरह स्वस्थ है, क्लोरोफिल की मात्रा अच्छी है और कोई बीमारी नहीं है।",
    triggersEn: "Favorable weather with balanced irrigation.",
    triggersMr: "संतुलित पाणी व खत व्यवस्थापन.",
    triggersHi: "संतुलित मौसम और उचित पोषण प्रबंधन।",
    organicRemediesEn: ["Spray Panchagavya (3%) or Seaweed extract every 15 days."],
    organicRemediesMr: ["दर १५ दिवसांनी ३% जीवामृत किंवा पंचगव्य फवारा."],
    organicRemediesHi: ["हर 15 दिन में पंचगव्य (3%) का सुरक्षात्मक स्प्रे करें।"],
    chemicalRemediesEn: ["No fungicide needed. Maintain 19:19:19 @ 3 kg/acre weekly."],
    chemicalRemediesMr: ["बुरशीनाशकाची गरज नाही; १९:१९:१९ खत ३ किलो प्रति एकर दर आठवड्याला द्या."],
    chemicalRemediesHi: ["रासायनिक दवा की जरूरत नहीं; 19:19:19 खाद 3 किग्रा प्रति एकड़ दें।"],
    preventativeEn: ["Scout weekly and keep farm borders weed-free."],
    preventativeMr: ["दर आठवड्याला पाहणी करा आणि बांधावरील तण नष्ट करा."],
    preventativeHi: ["हर हफ्ते फसल की जांच करें और मेड़ों को साफ रखें।"]
  },

  "Potato___Early_blight": {
    en: "Potato — Early Blight (Alternaria)",
    mr: "बटाटा — करपा (अर्ली ब्लाइट)",
    hi: "आलू — अगेती झुलसा",
    plantEn: "Potato",
    plantMr: "बटाटा",
    plantHi: "आलू",
    pathogenType: "fungal",
    pathogenName: "Alternaria solani",
    causeEn: "Fungal pathogen attacking mature leaves via soil splash and infected tubers.",
    causeMr: "जमिनीतील बुरशी जुन्या पानांवर पसरते; पाण्याच्या उडण्याने व संसर्गित बेण्यांमुळे वाढते.",
    causeHi: "पुरानी पत्तियों पर फंगस का हमला; सिंचाई के छींटों और संक्रमित कंदों से फैलाव।",
    triggersEn: "Temperatures 24°C - 30°C with frequent dew and nitrogen-stressed crops.",
    triggersMr: "२४°C ते ३०°C तापमान आणि नत्राची कमतरता असल्यास हा रोग वेगाने वाढतो.",
    triggersHi: "24°C से 30°C तापमान, पत्तियों पर रात की ओस और नाइट्रोजन की कमी।",
    organicRemediesEn: ["Spray Trichoderma viride @ 5 g/L with jaggery water."],
    organicRemediesMr: ["ट्रायकोडर्मा व्हिरिडी ५ ग्रॅम प्रति लिटर गुळाच्या पाण्यात मिसळून फवारा."],
    organicRemediesHi: ["ट्राइकोडर्मा 5 ग्राम प्रति लीटर गुड़ के पानी के साथ मिलाकर छिड़कें।"],
    chemicalRemediesEn: ["Spray Mancozeb 75% WP @ 35 g per 15L pump (or Score @ 10 ml)."],
    chemicalRemediesMr: ["मँकोझेब ७५% WP ३५ ग्रॅम किंवा स्कोर १० मिली प्रति १५ लिटर पंप फवारा."],
    chemicalRemediesHi: ["मैंकोजेब 75% WP 35 ग्राम प्रति 15 लीटर पंप स्प्रे करें।"],
    preventativeEn: ["Use certified disease-free seed tubers."],
    preventativeMr: ["प्रमाणित रोगमुक्त बटाटा बेणेच लागवडीसाठी वापरा."],
    preventativeHi: ["प्रमाणित रोगमुक्त आलू कंदों की ही बुवाई करें।"]
  },

  "Potato___Late_blight": {
    en: "Potato — Late Blight (Water-soaked Foliage Rot)",
    mr: "बटाटा — तांबेरा / लेट ब्लाइट (पानांची करप)",
    hi: "आलू — पछेती झुलसा",
    plantEn: "Potato",
    plantMr: "बटाटा",
    plantHi: "आलू",
    pathogenType: "fungal",
    pathogenName: "Phytophthora infestans",
    causeEn: "Aggressive oomycete destroying entire foliage within days in cold, humid weather.",
    causeMr: "ढगाळ, थंड व धुके असलेल्या हवेत ही बुरशी अवघ्या काही दिवसांत संपूर्ण पीक काळे पाडते.",
    causeHi: "ठंडे और बादल छाए रहने पर 5-7 दिनों में पूरी फसल को जलाकर नष्ट कर देता है।",
    triggersEn: "Persistent overcast sky, temp 12°C - 20°C, and humidity >90%.",
    triggersMr: "सतत ढगाळ हवा, १२°C ते २०°C तापमान आणि हवेत ९०% पेक्षा जास्त दमटपणा.",
    triggersHi: "लगातार बादल, 12°C से 20°C तापमान और 90% से अधिक आर्द्रता।",
    organicRemediesEn: ["Spray Copper Hydroxide @ 30 g per 15L pump and mound soil high."],
    organicRemediesMr: ["कॉपर हायड्रॉक्साईड ३० ग्रॅम प्रति १५ लिटर पंप फवारा व झाडाला चांगली भर लावा."],
    organicRemediesHi: ["कॉपर हाइड्रोक्साइड 30 ग्राम प्रति 15 लीटर पंप छिड़कें।"],
    chemicalRemediesEn: ["Emergency: Ridomil Gold @ 40 g per 15L pump immediately."],
    chemicalRemediesMr: ["तातडीचा उपाय: रिडोमिल गोल्ड ४० ग्रॅम प्रति १५ लिटर पंप ताबडतोब फवारा."],
    chemicalRemediesHi: ["आपातकालीन: रिडोमिल गोल्ड 40 ग्राम प्रति 15 लीटर पंप तुरंत छिड़कें।"],
    preventativeEn: ["Cut haulms 12 days prior to harvest if infection appears."],
    preventativeMr: ["रोग दिसल्यास काढणीपूर्वी १२ दिवस आधी वरचा पाला कापून शेताबाहेर नष्ट करा."],
    preventativeHi: ["रोग दिखने पर खुदाई से 12 दिन पहले ऊपर की पत्तियों को काटकर हटा दें।"]
  },

  "Potato___healthy": {
    en: "Potato — Healthy Plant",
    mr: "बटाटा — निरोगी रोप",
    hi: "आलू — स्वस्थ पौधा",
    plantEn: "Potato",
    plantMr: "बटाटा",
    plantHi: "आलू",
    pathogenType: "none",
    pathogenName: "No Pathogen Detected",
    causeEn: "Foliage in robust condition with good canopy closure.",
    causeMr: "पाने एकदम निरोगी, गर्द हिरवी व डागरहित आहेत.",
    causeHi: "पत्तियां पूरी तरह स्वस्थ, गहरी हरी और धब्बों से मुक्त हैं।",
    triggersEn: "Balanced seasonal weather with good soil drainage.",
    triggersMr: "उत्तम निचरा असलेली जमीन आणि अनुकूल हवामान.",
    triggersHi: "अनुकूल मौसम और उत्तम जल निकास।",
    organicRemediesEn: ["Apply preventive Dashaparni Ark @ 20 ml/L."],
    organicRemediesMr: ["दशपर्णी अर्क २० मिली प्रति लिटर फवारा."],
    organicRemediesHi: ["दशपर्णी अर्क 20 मिली प्रति लीटर का सुरक्षात्मक छिड़काव करें।"],
    chemicalRemediesEn: ["Keep Mancozeb standby for overcast rainy spells."],
    chemicalRemediesMr: ["ढगाळ हवामान आल्यास मँकोझेब ३५ ग्रॅमचा सुरक्षात्मक फवारा घ्या."],
    chemicalRemediesHi: ["बादल छाने पर मैंकोजेब 35 ग्राम का सुरक्षात्मक स्प्रे करें।"],
    preventativeEn: ["Earthing up at 30 days after sowing."],
    preventativeMr: ["लागवडीनंतर ३० दिवसांनी पिकाला मातीची भर लावा."],
    preventativeHi: ["बुवाई के 30 दिन बाद पौधों पर मिट्टी चढ़ाएं।"]
  },

  "Corn_(maize)___Common_rust_": {
    en: "Maize — Common Rust (Puccinia sorghi)",
    mr: "मका — तांबेरा रोग (पानावरील लालसर-तपकिरी फोड)",
    hi: "मक्का — रतुआ / गेरुआ रोग",
    plantEn: "Maize",
    plantMr: "मका",
    plantHi: "मक्का",
    pathogenType: "fungal",
    pathogenName: "Puccinia sorghi",
    causeEn: "Windborne rust spores forming golden-brown to cinnamon-brown pustules on leaves.",
    causeMr: "वाऱ्यामुळे हवेतून उडणारे बुरशीचे बीजाणू पानांवर लालसर-तपकिरी रंगाचे फोड तयार करतात.",
    causeHi: "हवा द्वारा दूर से आने वाले कवक बीजाणु पत्तियों पर लाल भूरे दाने बना देते हैं।",
    triggersEn: "Cool, humid nights (16°C - 23°C) and heavy morning dew.",
    triggersMr: "१६°C ते २३°C थंड हवामान आणि सकाळी पानांवर दाट दव असणे.",
    triggersHi: "ठंडी नम रातें (16°C - 23°C) और पत्तियों पर भारी ओस।",
    organicRemediesEn: ["Spray Wettable Sulphur 80% WDG @ 30 g per 15L pump."],
    organicRemediesMr: ["पाण्यात विरघळणारे गंधक (सल्फर ८०% WDG) ३० ग्रॅम प्रति १५ लिटर पंप फवारा."],
    organicRemediesHi: ["घुलनशील गंधक (सल्फर 80% WDG) 30 ग्राम प्रति 15 लीटर पंप छिड़कें।"],
    chemicalRemediesEn: ["Curative: Tebuconazole 25.9% EC (Folicur) @ 15 ml per 15L pump."],
    chemicalRemediesMr: ["टेबुकोनॅझोल २५.९% EC (फॉलिक्युअर) १५ मिली प्रति १५ लिटर पंप फवारा."],
    chemicalRemediesHi: ["टेबुकोनाज़ोल 25.9% EC (फॉलिक्यूर) 15 मिली प्रति 15 लीटर पंप छिड़कें।"],
    preventativeEn: ["Select rust-tolerant hybrid corn varieties and sow on time."],
    preventativeMr: ["तांबेरा सहनशील संकरित वाण निवडा आणि वेळेवर पेरणी करा."],
    preventativeHi: ["रतुआ-सहनशील संकर मक्का किस्मों का चयन करें।"]
  },

  "Corn_(maize)___healthy": {
    en: "Maize — Healthy Plant",
    mr: "मका — निरोगी रोप",
    hi: "मक्का — स्वस्थ पौधा",
    plantEn: "Maize",
    plantMr: "मका",
    plantHi: "मक्का",
    pathogenType: "none",
    pathogenName: "No Pathogen Detected",
    causeEn: "Broad, deep green foliage with vigorous cob formation.",
    causeMr: "पाने गर्द हिरवीगार, जोमदार आणि उत्तम कणसांची वाढ होत आहे.",
    causeHi: "पत्तियां पूरी तरह हरी, मजबूत और रोगमुक्त हैं।",
    triggersEn: "Good sunlight and balanced nitrogen management.",
    triggersMr: "भरपूर सूर्यप्रकाश आणि योग्य खत व्यवस्थापन.",
    triggersHi: "उचित धूप और संतुलित खाद।",
    organicRemediesEn: ["Apply Jeevamrut through drip @ 200 L/acre."],
    organicRemediesMr: ["२०० लिटर जीवामृत प्रति एकर ठिबकद्वारे द्या."],
    organicRemediesHi: ["200 लीटर जीवामृत प्रति एकड़ ड्रिप से दें।"],
    chemicalRemediesEn: ["Top-dress Urea @ 30 kg/acre at knee-high stage."],
    chemicalRemediesMr: ["गुडघाभर उंचीवर ३० किलो युरिया प्रति एकर द्या."],
    chemicalRemediesHi: ["घुटने की ऊंचाई पर 30 किग्रा यूरिया प्रति एकड़ दें।"],
    preventativeEn: ["Inspect whorl leaves regularly for Fall Armyworm."],
    preventativeMr: ["लष्करी अळीसाठी पोंग्याची नियमित पाहणी करा."],
    preventativeHi: ["सैनिक कीट (आर्मीवर्म) की नियमित जांच करें।"]
  }
};

/**
 * Format a raw model disease string into comprehensive human-friendly diagnostics,
 * cause analysis, environmental triggers, and actionable organic/chemical remedies.
 */
export function getFriendlyDiseaseInfo(rawDisease, lang = "mr", apiResult = null) {
  const currentLang = lang?.startsWith("hi") ? "hi" : lang?.startsWith("mr") ? "mr" : "en";

  if (!rawDisease) {
    return {
      title: currentLang === "hi" ? "रोग की पहचान नहीं हो सकी" : currentLang === "mr" ? "रोग ओळखता आला नाही" : "Could not identify disease",
      advice: currentLang === "hi" ? "कृपया पत्ती का दूसरा साफ फोटो लेकर पुनः जांचें।" : currentLang === "mr" ? "कृपया पानाचा दुसरा स्पष्ट फोटो काढून तपासा." : "Please take another clear photo to check.",
      isHealthy: false,
      raw: "",
      pathogenType: "none",
      pathogenName: "Unknown",
      primaryCause: "",
      environmentalTriggers: "",
      organicRemedies: [],
      chemicalRemedies: [],
      preventativeActions: [],
      differentialDiagnoses: []
    };
  }

  // 1. If backend API already provided rich intelligence, use it directly!
  if (apiResult?.intelligence) {
    const intel = apiResult.intelligence;
    const isHealthy = Boolean(intel.is_healthy);
    const title = currentLang === "hi" ? intel.disease_hi : currentLang === "mr" ? intel.disease_mr : intel.disease;
    const primaryCause = intel.primary_cause?.[currentLang] || intel.primary_cause?.en || "";
    const triggers = intel.environmental_triggers?.[currentLang] || intel.environmental_triggers?.en || "";
    const organic = intel.organic_remedies?.[currentLang] || intel.organic_remedies?.en || [];
    const chemical = intel.chemical_remedies?.[currentLang] || intel.chemical_remedies?.en || [];
    const preventative = intel.preventative_actions?.[currentLang] || intel.preventative_actions?.en || [];

    let adviceSummary = "";
    if (isHealthy) {
      adviceSummary = currentLang === "hi"
        ? "पौधा पूरी तरह स्वस्थ है! नियमित सिंचाई और जैविक पोषण जारी रखें।"
        : currentLang === "mr"
        ? "पीक पूर्णपणे निरोगी आहे! नियमित पाणी आणि संतुलित सेंद्रिय खत व्यवस्थापन चालू ठेवा."
        : "Your plant appears healthy! Continue regular watering and balanced nutrition.";
    } else {
      const firstChem = chemical[0] || "";
      const firstOrg = organic[0] || "";
      adviceSummary = currentLang === "hi"
        ? `कारण: ${primaryCause} प्राथमिक उपचार: ${firstChem} (जैविक: ${firstOrg})`
        : currentLang === "mr"
        ? `संभाव्य कारण: ${primaryCause} तातडीचा उपाय: ${firstChem} (जैविक: ${firstOrg})`
        : `Cause: ${primaryCause} Recommended Spray: ${firstChem}`;
    }

    return {
      title,
      crop: currentLang === "hi" ? intel.crop_hi : currentLang === "mr" ? intel.crop_mr : intel.crop,
      advice: adviceSummary,
      isHealthy,
      raw: rawDisease,
      pathogenType: intel.pathogen_type || "fungal",
      pathogenName: intel.pathogen_name || "Pathogen",
      primaryCause,
      environmentalTriggers: triggers,
      organicRemedies: organic,
      chemicalRemedies: chemical,
      preventativeActions: preventative,
      differentialDiagnoses: intel.differential_diagnoses || []
    };
  }

  // 2. Check local client-side dictionary
  if (DISEASE_MAP[rawDisease]) {
    const entry = DISEASE_MAP[rawDisease];
    const isHealthy = Boolean(rawDisease.toLowerCase().includes("healthy"));
    const title = entry[currentLang] || entry.en;
    const cause = entry[currentLang === "hi" ? "causeHi" : currentLang === "mr" ? "causeMr" : "causeEn"] || entry.causeEn;
    const triggers = entry[currentLang === "hi" ? "triggersHi" : currentLang === "mr" ? "triggersMr" : "triggersEn"] || entry.triggersEn;
    const organic = entry[currentLang === "hi" ? "organicRemediesHi" : currentLang === "mr" ? "organicRemediesMr" : "organicRemediesEn"] || entry.organicRemediesEn;
    const chemical = entry[currentLang === "hi" ? "chemicalRemediesHi" : currentLang === "mr" ? "chemicalRemediesMr" : "chemicalRemediesEn"] || entry.chemicalRemediesEn;
    const preventative = entry[currentLang === "hi" ? "preventativeHi" : currentLang === "mr" ? "preventativeMr" : "preventativeEn"] || entry.preventativeEn;

    return {
      title,
      crop: entry[currentLang === "hi" ? "plantHi" : currentLang === "mr" ? "plantMr" : "plantEn"],
      advice: `${cause} ${chemical?.[0] || ""}`,
      isHealthy,
      raw: rawDisease,
      pathogenType: entry.pathogenType || "fungal",
      pathogenName: entry.pathogenName || "Pathogen",
      primaryCause: cause,
      environmentalTriggers: triggers,
      organicRemedies: organic,
      chemicalRemedies: chemical,
      preventativeActions: preventative,
      differentialDiagnoses: []
    };
  }

  // 3. Fallback generic parsing
  const clean = rawDisease.replace(/_{2,}/g, " — ").replace(/_/g, " ");
  const isHealthy = rawDisease.toLowerCase().includes("healthy");

  return {
    title: clean,
    crop: clean.split("—")[0].trim(),
    advice: currentLang === "hi"
      ? (isHealthy ? "पौधा स्वस्थ प्रतीत हो रहा है। नियमित देखभाल रखें।" : "संक्रमित पत्तियों को हटाएं और कॉपर ऑक्सीक्लोराइड 35 ग्राम प्रति 15 लीटर पंप का छिड़काव करें।")
      : currentLang === "mr"
      ? (isHealthy ? "पीक चांगले दिसत आहे. नियमित काळजी आणि पाणी व्यवस्थापन ठेवा." : "बाधित पाने वेगळी करा आणि कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम प्रति १५ लिटर पंप फवारा.")
      : (isHealthy ? "The plant looks healthy. Maintain regular watering." : "Prune infected leaves and apply Copper Oxychloride @ 35 g per 15L pump."),
    isHealthy,
    raw: rawDisease,
    pathogenType: isHealthy ? "none" : "fungal",
    pathogenName: isHealthy ? "No Pathogen" : "Foliar pathogen",
    primaryCause: currentLang === "hi"
      ? "पत्तियों पर नमी और अनुकूल तापमान के कारण रोग का प्रकोप।"
      : currentLang === "mr"
      ? "पानांवरील साचलेला ओलावा आणि अनुकूल दमट हवामानामुळे रोगाचा प्रादुर्भाव."
      : "Foliar pathogen activity exacerbated by leaf wetness and humidity.",
    environmentalTriggers: currentLang === "hi"
      ? "उच्च आर्द्रता और पत्तियों का लंबे समय तक गीला रहना।"
      : currentLang === "mr"
      ? "हवेतील जास्त दमटपणा आणि पानांवर पाणी साचणे."
      : "High humidity and prolonged leaf wetness.",
    organicRemedies: [
      currentLang === "hi" ? "नीम का तेल 5 मिली प्रति लीटर पानी में मिलाकर छिड़कें।" : currentLang === "mr" ? "५ मिली निंबोळी तेल प्रति लिटर पाण्यात मिसळून फवारा." : "Spray 5 ml/L pure Neem Oil.",
      currentLang === "hi" ? "ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर छिड़कें।" : currentLang === "mr" ? "ट्रायकोडर्मा व्हिरिडी ५ ग्रॅम प्रति लिटर फवारा." : "Apply Trichoderma viride @ 5 g/L."
    ],
    chemicalRemedies: [
      currentLang === "hi" ? "कॉपर ऑक्सीक्लोराइड 35 ग्राम प्रति 15 लीटर पंप।" : currentLang === "mr" ? "कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम प्रति १५ लिटर पंप." : "Copper Oxychloride 50% WP @ 35 g per 15L pump.",
      currentLang === "hi" ? "मैंकोजेब 75% WP 35 ग्राम प्रति 15 लीटर पंप।" : currentLang === "mr" ? "मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप." : "Mancozeb 75% WP @ 35 g per 15L pump."
    ],
    preventativeActions: [
      currentLang === "hi" ? "संक्रमित पत्तियों को काटकर नष्ट करें और ड्रिप से सिंचाई करें।" : currentLang === "mr" ? "बाधित पाने काढून नष्ट करा आणि ठिबक सिंचन वापरा." : "Prune infected foliage and avoid overhead watering."
    ],
    differentialDiagnoses: []
  };
}
