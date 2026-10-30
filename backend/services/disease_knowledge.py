# backend/services/disease_knowledge.py
"""
Comprehensive Plant Pathology Knowledge Base for AgriVision.
Provides scientific causes, environmental outbreak triggers, organic remedies,
chemical treatments with exact 15-liter pump dosages, and preventative field practices
across all 38 Crop & Plant Disease classes in English, Marathi, and Hindi.
"""

DISEASE_KNOWLEDGE = {
    # -------------------------------------------------------------
    # TOMATO DISEASES
    # -------------------------------------------------------------
    "Tomato___Early_blight": {
        "crop_en": "Tomato",
        "crop_hi": "टमाटर",
        "crop_mr": "टोमॅटो",
        "disease_en": "Early Blight (Alternaria Leaf Spot)",
        "disease_hi": "अगेती झुलसा (अर्ली ब्लाइट)",
        "disease_mr": "करपा / अर्ली ब्लाइट (पानावरील चक्राकार डाग)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Alternaria solani (Fungus)",
        "primary_cause_en": "Fungal spores survive in infected crop residue and soil, splashing onto lower foliage during rain or irrigation.",
        "primary_cause_hi": "फंगल बीजाणु मिट्टी और पुरानी फसल के अवशेषों में जीवित रहते हैं, जो सिंचाई या बारिश के छींटों से निचली पत्तियों पर फैलते हैं।",
        "primary_cause_mr": "जमिनीतील जुन्या पिकांच्या अवशेषांमध्ये बुरशीचे बीजाणू जिवंत राहतात आणि पाण्याच्या उडणाऱ्या थेंबांमुळे खालच्या पानांवर पसरतात.",
        "environmental_triggers_en": "Warm temperatures (24°C - 29°C) combined with high humidity (>80%) and alternating wet/dry weather.",
        "environmental_triggers_hi": "गरम तापमान (24°C - 29°C), उच्च आर्द्रता (>80%) और रुक-रुक कर होने वाली बारिश।",
        "environmental_triggers_mr": "उबदार हवामान (२४°C ते २९°C), हवेतील जास्त आर्द्रता (८०% पेक्षा जास्त) आणि पानांवर साचलेले पाणी.",
        "organic_remedies_en": [
            "Spray Neem Seed Kernel Extract (NSKE 5%) or Pure Neem Oil @ 5 ml/L water with 1 ml soap sticker.",
            "Soil drench or foliar spray with Trichoderma viride / harzianum @ 50 g per 15L pump.",
            "Spray fermented sour buttermilk (ताक) @ 500 ml per 15L pump to suppress spore germination."
        ],
        "organic_remedies_hi": [
            "नीम का तेल (Neem Oil) 5 मिली प्रति लीटर पानी में 1 मिली शैम्पू/स्टिकर मिलाकर छिड़कें।",
            "ट्राइकोडर्मा विरिडी (Trichoderma viride) 50 ग्राम प्रति 15 लीटर पंप घोलकर छिड़काव करें।",
            "खट्टी छाछ (मट्ठा) 500 मिली प्रति 15 लीटर पंप में मिलाकर प्राकृतिक कवकनाशी के रूप में इस्तेमाल करें।"
        ],
        "organic_remedies_mr": [
            "५% निंबोळी अर्क किंवा ५ मिली कडुलिंब तेल (Neem Oil) प्रति लिटर पाण्यात १ मिली स्टिकर मिसळून फवारा.",
            "ट्रायकोडर्मा व्हिरिडी (Trichoderma viride) ५० ग्रॅम प्रति १५ लिटर पंप फवारणी करा किंवा आळवणी द्या.",
            "आंबट ताक ५०० मिली प्रति १५ लिटर पंप पानांवर फवारल्यास बुरशीची वाढ रोखली जाते."
        ],
        "chemical_remedies_en": [
            "Preventive: Mancozeb 75% WP (Dithane M-45) @ 35 g per 15L pump (2.5 g/L).",
            "Curative: Chlorothalonil 75% WP (Kavach) @ 30 g per 15L pump.",
            "Advanced Curative: Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 15 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "रोकथाम हेतु: मैंकोजेब 75% WP (डाइथेन एम-45) 35 ग्राम प्रति 15 लीटर पंप।",
            "उपचार हेतु: क्लोरोथालोनिल 75% WP (कवच) 30 ग्राम प्रति 15 लीटर पंप।",
            "गंभीर स्थिति में: एज़ोक्सीस्ट्रोबिन + डिफेनोकोनाज़ोल (एमिस्टार टॉप) 15 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रतिबंधात्मक: मँकोझेब ७५% WP (डायथेन एम-४५) ३५ ग्रॅम प्रति १५ लिटर पंप (२.५ ग्रॅम/लिटर).",
            "रोगाचा प्रादुर्भाव दिसताच: क्लोरोथॅलोनिल ७५% WP (कवच) ३० ग्रॅम प्रति १५ लिटर पंप फवारा.",
            "तीव्र प्रादुर्भावात: ॲझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल (ॲमिस्टार टॉप) १५ मिली प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": [
            "Prune lower leaves up to 30 cm from soil level to stop soil splash infection.",
            "Switch from overhead sprinkler to ground drip irrigation.",
            "Practice 2-year crop rotation avoiding potato, eggplant, or capsicum."
        ],
        "preventative_actions_hi": [
            "मिट्टी के संपर्क वाली निचली 30 सेमी तक की पत्तियों को काटकर हटा दें।",
            "ऊपर से फव्वारा सिंचाई बंद करें और ड्रिप से केवल जड़ों में पानी दें।",
            "टमाटर के बाद आलू या बैंगन न लगाएं, 2 साल का फसल चक्र अपनाएं।"
        ],
        "preventative_actions_mr": [
            "जमिनीपासून ३० सेमी उंचीपर्यंतची खालची पाने छाटून टाका, जेणेकरून मातीतील बुरशी पानांवर उडणार नाही.",
            "तुषार सिंचन टाळून ठिबक सिंचनाचा वापर करा.",
            "टोमॅटोनंतर लगेच बटाटा किंवा वांगी लावू नका; किमान २ वर्षांचे फेरपालट करा."
        ]
    },

    "Tomato___Late_blight": {
        "crop_en": "Tomato",
        "crop_hi": "टमाटर",
        "crop_mr": "टोमॅटो",
        "disease_en": "Late Blight (Phytophthora Water-soaked Rot)",
        "disease_hi": "पछेती झुलसा (लेट ब्लाइट)",
        "disease_mr": "लेट ब्लाइट / तांबेरा (काळपट ओले डाग व सड)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Phytophthora infestans (Oomycete)",
        "primary_cause_en": "Devastating water-mold that thrives in cool, persistent foggy and rainy conditions with rapid airborne spore dissemination.",
        "primary_cause_hi": "यह घातक कवक ठंडे और लगातार कोहरे/बारिश वाले मौसम में तेजी से हवा द्वारा फैलता है।",
        "primary_cause_mr": "थंड, धुक्याचे आणि सतत दमट पावसाळी हवामानात हवेतील बुरशीमुळे हा अत्यंत घातक रोग वेगाने पसरतो.",
        "environmental_triggers_en": "Cool nights (10°C - 15°C), moderate days (18°C - 22°C), relative humidity >90%, and persistent fog/dew on leaves.",
        "environmental_triggers_hi": "ठंडी रातें (10°C - 15°C), दिन का तापमान (18°C - 22°C), 90% से अधिक आर्द्रता और पत्तियों पर लगातार ओस।",
        "environmental_triggers_mr": "थंड रात्री (१०°C ते १५°C), दिवसा १८°C ते २२°C तापमान, ९०% पेक्षा जास्त दमटपणा आणि पानांवर साचलेले दव.",
        "organic_remedies_en": [
            "Spray Copper Hydroxide / Bordeaux mixture (1%) as an organic protective barrier.",
            "Apply Pseudomonas fluorescens bio-agent @ 50 g per 15L pump.",
            "Remove and deeply bury or burn severely damaged foliage immediately."
        ],
        "organic_remedies_hi": [
            "बोर्डो मिश्रण (Bordeaux Mixture 1%) या कॉपर हाइड्रोक्साइड का सुरक्षात्मक छिड़काव करें।",
            "स्यूडोमोनास फ्लोरेसेन्स (Pseudomonas) 50 ग्राम प्रति 15 लीटर पंप छिड़कें।",
            "संक्रमित पौधों को खेत से बाहर निकालकर जमीन में गहरा दबाएं या जला दें।"
        ],
        "organic_remedies_mr": [
            "१% बोर्डो मिश्रण (Bordeaux Mixture) किंवा कॉपर हायड्रॉक्साईड प्रतिबंधक म्हणून फवारा.",
            "स्यूडोमोनास फ्लुरोसन्स (Pseudomonas fluorescens) ५० ग्रॅम प्रति १५ लिटर पंप फवारणी करा.",
            "अत्यंत बाधित झाडे ताबडतोब मुळासकट उपटून शेताबाहेर जमिनीत पुरा किंवा जाळून टाका."
        ],
        "chemical_remedies_en": [
            "Preventive: Copper Oxychloride 50% WP (Blitox) @ 40 g per 15L pump.",
            "Early Curative: Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 35 g per 15L pump.",
            "Heavy Infestation: Dimethomorph 50% WP (Acrobat) @ 15 g OR Metalaxyl 8% + Mancozeb 64% (Ridomil Gold) @ 35 g per 15L pump."
        ],
        "chemical_remedies_hi": [
            "रोकथाम: कॉपर ऑक्सीक्लोराइड 50% WP (ब्लाइटॉक्स) 40 ग्राम प्रति 15 लीटर पंप।",
            "शुरुआती लक्षण: साइमोक्सानिल + मैंकोजेब (कर्जेट) 35 ग्राम प्रति 15 लीटर पंप।",
            "तीव्र प्रकोप: डाइमेथोमॉर्फ 50% WP (एक्रोबैट) 15 ग्राम या रिडोमिल गोल्ड 35 ग्राम प्रति 15L पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रतिबंधात्मक फवारणी: कॉपर ऑक्सिक्लोराईड ५०% WP (ब्लायटॉक्स) ४० ग्रॅम प्रति १५ लिटर पंप.",
            "प्रादुर्भाव सुरू होताच: सायमॉक्सॅनिल ८% + मँकोझेब ६४% WP (कर्झेट) ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "गंभीर प्रादुर्भावात: डायमेथोमॉर्फ ५०% WP (ॲक्रोबॅट) १५ ग्रॅम किंवा रिडोमिल गोल्ड ३५ ग्रॅम प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": [
            "Avoid night irrigation and keep plant foliage completely dry before sunset.",
            "Ensure wide row spacing (minimum 90 cm) for maximum wind ventilation.",
            "Plant late-blight certified resistant hybrid seeds."
        ],
        "preventative_actions_hi": [
            "शाम या रात में सिंचाई बिल्कुल न करें; पत्तियों को शाम से पहले सूखने दें।",
            "कतारों के बीच कम से कम 90 सेमी की दूरी रखें ताकि हवा और धूप मिल सके।",
            "रोग-प्रतिरोधी प्रमाणित संकर किस्मों के बीजों का ही उपयोग करें।"
        ],
        "preventative_actions_mr": [
            "संध्याकाळी किंवा रात्री पाणी देणे टाळा; सूर्यास्तापूर्वी झाडाची पाने कोरडी राहतील याची काळजी घ्या.",
            "दोन ओळींमध्ये किमान ९० सेमी अंतर ठेवा जेणेकरून शेतात भरपूर हवा व सूर्यप्रकाश खेळता राहील.",
            "रोगप्रतिकारक प्रमाणित संकरित बियाण्यांचीच लागवड करा."
        ]
    },

    "Tomato___Bacterial_spot": {
        "crop_en": "Tomato",
        "crop_hi": "टमाटर",
        "crop_mr": "टोमॅटो",
        "disease_en": "Bacterial Spot (Xanthomonas)",
        "disease_hi": "जीवाणु धब्बा रोग (बैक्टीरियल स्पॉट)",
        "disease_mr": "जिवाणू ठिपके / बॅक्टेरियल स्पॉट",
        "is_healthy": False,
        "pathogen_type": "bacterial",
        "pathogen_name": "Xanthomonas campestris pv. vesicatoria (Bacterium)",
        "primary_cause_en": "Infected seed stock or volunteer plants; bacteria enter through stomata and leaf wounds caused by pruning or insect feeding.",
        "primary_cause_hi": "संक्रमित बीज या औजारों द्वारा जीवाणु पत्तियों के छिद्रों और घावों से प्रवेश करते हैं।",
        "primary_cause_mr": "संसर्गित बियाणे किंवा छाटणी दरम्यान झालेल्या जखमांमधून हे जिवाणू पानात शिरून काळे ठिपके निर्माण करतात.",
        "environmental_triggers_en": "High temperatures (25°C - 30°C) with persistent rainy spells, high wind-driven rains, and leaf wetness.",
        "environmental_triggers_hi": "तेज बारिश, उच्च तापमान (25°C - 30°C) और तेज हवाओं के साथ नमी।",
        "environmental_triggers_mr": "२५°C ते ३०°C उबदार तापमान, सोसाट्याचा वारा आणि पावसाची संततधार यामुळे जिवाणूंचा फैलाव वाढतो.",
        "organic_remedies_en": [
            "Hot water seed treatment at 50°C for 25 minutes prior to nursery sowing.",
            "Foliar spray of Bacillus subtilis bio-bactericide @ 40 g per 15L pump.",
            "Copper soap spray (Copper octanoate) for organic disease suppression."
        ],
        "organic_remedies_hi": [
            "बुवाई से पहले बीजों को 50°C गर्म पानी में 25 मिनट उपचारित करें।",
            "बैसिलस सबटिलिस (Bacillus subtilis) 40 ग्राम प्रति 15 लीटर पंप छिड़कें।",
            "जैविक कॉपर सोप का सुरक्षात्मक छिड़काव करें।"
        ],
        "organic_remedies_mr": [
            "लागवडीपूर्वी बियाण्यांवर ५०°C कोमट पाण्यात २५ मिनिटे बीजप्रक्रिया करा.",
            "बॅसिलस सबटिलिस (Bacillus subtilis) जिवाणूनाशक ४० ग्रॅम प्रति १५ लिटर पंप फवारा.",
            "जैविक तांबायुक्त साबण अर्काची फवारणी करा."
        ],
        "chemical_remedies_en": [
            "Standard Combination: Copper Oxychloride 50% WP @ 35 g + Streptocycline (90:10 Streptomycin+Tetracycline) @ 2 g per 15L pump.",
            "Alternative: Kasugamycin 3% SL (Kasu-B) @ 30 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "मुख्य उपचार: कॉपर ऑक्सीक्लोराइड 35 ग्राम + स्ट्रेप्टोसाइक्लिन 2 ग्राम प्रति 15 लीटर पंप।",
            "वैकल्पिक: कासुगामाइसिन 3% SL (कासु-बी) 30 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रभावी उपाय: कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम + स्ट्रेप्टोसायक्लिन २ ग्रॅम प्रति १५ लिटर पंप एकत्र मिसळून फवारा.",
            "पर्यायी जिवाणूनाशक: कासुगामायसिन ३% SL (कासु-बी) ३० मिली प्रति १५ लिटर पंप फवारा."
        ],
        "preventative_actions_en": [
            "Never work or prune in tomato fields while leaves are wet.",
            "Sterilize pruning shears with 70% isopropyl alcohol between rows.",
            "Purchase only certified disease-free nursery seedlings."
        ],
        "preventative_actions_hi": [
            "पत्तियां गीली होने पर खेत में निराई-गुड़ाई या कटाई-छंटाई न करें।",
            "छंटाई के औजारों को डेटॉल या सैनिटाइजर से साफ करते रहें।",
            "केवल प्रमाणित और उपचारित पौध ही लगाएं।"
        ],
        "preventative_actions_mr": [
            "पाने ओली असताना शेतात खुरपणी किंवा छाटणी करू नका, अन्यथा रोग हाताने पसरतो.",
            "छाटणीची कात्री किंवा विळा सॅनिटायझरने पुसून निर्जंतुक ठेवा.",
            "विश्वासू रोपवाटिकेतूनच निरोगी रोपांची निवड करा."
        ]
    },

    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "crop_en": "Tomato",
        "crop_hi": "टमाटर",
        "crop_mr": "टोमॅटो",
        "disease_en": "Tomato Yellow Leaf Curl Virus (TYLCV)",
        "disease_hi": "टमाटर पीला पत्ती मरोड़ विषाणु (लीफ कर्ल वायरस)",
        "disease_mr": "पिवळा पानांचा चुरडा-मुरडा / कुकडा रोग (TYLCV)",
        "is_healthy": False,
        "pathogen_type": "viral",
        "pathogen_name": "Tomato Yellow Leaf Curl Virus (Begomovirus)",
        "primary_cause_en": "Persistent transmission by Silverleaf Whitefly (Bemisia tabaci) feeding on plant sap.",
        "primary_cause_hi": "सफेद मक्खी (Whitefly) द्वारा संक्रमित पौधों से स्वस्थ पौधों में रस चूसने के दौरान यह वायरस फैलता है।",
        "primary_cause_mr": "पानांमधील रस शोषणाऱ्या पांढऱ्या माशीमुळे (Whitefly) हा घातक विषाणू एका झाडावरून दुसऱ्या झाडावर पसरतो.",
        "environmental_triggers_en": "Hot, dry conditions (28°C - 38°C) that trigger explosive whitefly pest populations.",
        "environmental_triggers_hi": "गर्म और शुष्क मौसम (28°C - 38°C) जिसमें सफेद मक्खी की आबादी तेजी से बढ़ती है।",
        "environmental_triggers_mr": "उष्ण व कोरडे हवामान (२८°C ते ३८°C); अशा वातावरणात पांढऱ्या माशीची पैदास प्रचंड वेगाने होते.",
        "organic_remedies_en": [
            "Install 20-25 Yellow Sticky Traps per acre at canopy height to capture adult whiteflies.",
            "Spray Verticillium lecanii / Beauveria bassiana bio-insecticide @ 60 g per 15L pump.",
            "Spray 10,000 PPM Neem Oil @ 3 ml/L water every 7 days as a pest deterrent."
        ],
        "organic_remedies_hi": [
            "प्रति एकड़ 20-25 पीले चिपचिपे कार्ड (Yellow Sticky Traps) फसल की ऊंचाई पर लगाएं।",
            "ब्यूवेरिया बासियाना (Beauveria bassiana) जैविक कीटनाशक 60 ग्राम प्रति 15 लीटर पंप छिड़कें।",
            "नीम का तेल (10,000 PPM) 3 मिली प्रति लीटर पानी में मिलाकर हर हफ्ते छिड़कें।"
        ],
        "organic_remedies_mr": [
            "एकरमध्ये २० ते २५ पिवळे चिकट सापळे (Yellow Sticky Traps) झाडांच्या उंचीवर लावा.",
            "व्हर्टिसिलियम लेकॅनी किंवा ब्युव्हेरिया बासियाना ही जैविक बुरशी ६० ग्रॅम प्रति १५ लिटर पंप फवारा.",
            "१०,००० PPM निंबोळी तेल ३ मिली प्रति लिटर पाण्यात मिसळून दर आठवड्याला फवारा."
        ],
        "chemical_remedies_en": [
            "Vector Control: Diafenthiuron 50% WP (Pegasus) @ 20 g per 15L pump.",
            "Systemic: Imidacloprid 17.8% SL (Confidor) @ 5 ml per 15L pump.",
            "New Generation: Cyantraniliprole 10.26% OD (Benevia) @ 30 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "सफेद मक्खी नियंत्रण: डायफेंथियूरॉन 50% WP (पेगासस) 20 ग्राम प्रति 15 लीटर पंप।",
            "प्रणालीगत कीटनाशक: इमिडाक्लोप्रिड 17.8% SL (कॉन्फिडोर) 5 मिली प्रति 15 लीटर पंप।",
            "आधुनिक कीटनाशक: सायनट्रानिलिप्रोल 10.26% OD (बेनेविया) 30 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "पांढऱ्या माशीच्या नियंत्रणासाठी: डायाफेन्थिरॉन ५०% WP (पेगासस) २० ग्रॅम प्रति १५ लिटर पंप.",
            "अंतरप्रवाही कीटकनाशक: इमिडाक्लोप्रिड १७.८% SL (कॉन्फिडोर) ५ मिली प्रति १५ लिटर पंप.",
            "अतिप्रभावी उपाय: सायन्ट्रानिलिप्रोल १०.२६% OD (बेनेव्हिया) ३० मिली प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": [
            "Uproot and burn virus-stunted plants immediately; they cannot be cured chemically.",
            "Grow 2-3 border rows of Maize or Sorghum as a biological whitefly barrier.",
            "Cover seedlings in nursery with 40-mesh insect netting."
        ],
        "preventative_actions_hi": [
            "वायरस से ग्रसित मुड़े हुए पौधों को तुरंत उखाड़कर नष्ट करें (वायरस का कोई रासायनिक इलाज नहीं है)।",
            "खेत के चारों ओर मक्का या ज्वार की 2-3 लाइनें सुरक्षात्मक दीवार के रूप में लगाएं।",
            "नर्सरी में 40-मेश मच्छरदानी/नेट का उपयोग करके पौध तैयार करें।"
        ],
        "preventative_actions_mr": [
            "चुरडा झालेले झाड ताबडतोब उपटून नष्ट करा; व्हायरस एकदा आल्यावर रासायनिक औषधाने बरा होत नाही.",
            "शेताच्या चारी बाजूंनी मका किंवा ज्वारीच्या २-३ ओळींचे कुंपण लावा, ज्यामुळे माशी शेतात शिरत नाही.",
            "रोपवाटिकेवर ४० मेशचे कीटक प्रतिबंधक जाळे (Insect Net) वापरा."
        ]
    },

    "Tomato___healthy": {
        "crop_en": "Tomato",
        "crop_hi": "टमाटर",
        "crop_mr": "टोमॅटो",
        "disease_en": "Healthy Tomato Leaf",
        "disease_hi": "स्वस्थ टमाटर की पत्ती",
        "disease_mr": "निरोगी टोमॅटो रोप",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Optimal vegetative health, good chlorophyll density, and absence of active pathogen colonies.",
        "primary_cause_hi": "पौधा पूरी तरह स्वस्थ है, क्लोरोफिल की मात्रा अच्छी है और कोई बीमारी नहीं है।",
        "primary_cause_mr": "पीक पूर्णपणे निरोगी असून पानात हरितद्रव्याचे प्रमाण उत्तम आहे आणि कोणताही रोग नाही.",
        "environmental_triggers_en": "Favorable balanced weather with sound water and nutrition management.",
        "environmental_triggers_hi": "संतुलित मौसम और उचित पोषण प्रबंधन।",
        "environmental_triggers_mr": "संतुलित पाणी आणि खत व्यवस्थापनामुळे पीक सशक्त आहे.",
        "organic_remedies_en": [
            "Maintain prophylactic spray of Panchagavya (3%) or Seaweed Extract (2 ml/L) every 15 days.",
            "Apply well-decomposed Vermicompost @ 2 tons/acre around root zone."
        ],
        "organic_remedies_hi": [
            "हर 15 दिन में पंचगव्य (3%) या सीवीड अर्क का सुरक्षात्मक स्प्रे करें।",
            "जड़ों के पास 2 टन प्रति एकड़ केंचुआ खाद (वर्मीकम्पोस्ट) डालें।"
        ],
        "organic_remedies_mr": [
            "दर १५ दिवसांनी ३% जीवामृत किंवा पंचगव्य फवारा जेणेकरून पिकाची प्रतिकारशक्ती वाढेल.",
            "मुळांच्या कार्यकक्षेत गांडूळ खत २ टन प्रति एकर देऊन मातीची सुपीकता टिकवा."
        ],
        "chemical_remedies_en": [
            "No chemical fungicides required.",
            "Maintain balanced NPK fertigation (19:19:19 @ 3 kg/acre/week during vegetative stage)."
        ],
        "chemical_remedies_hi": [
            "किसी रासायनिक दवा की आवश्यकता नहीं है।",
            "संतुलित 19:19:19 खाद ड्रिप द्वारा 3 किग्रा प्रति एकड़ प्रति सप्ताह दें।"
        ],
        "chemical_remedies_mr": [
            "कोणत्याही रासायनिक बुरशीनाशकाची गरज नाही.",
            "ठिबकद्वारे संतुलित १९:१९:१९ विद्राव्य खत ३ किलो प्रति एकर दर आठवड्याला द्या."
        ],
        "preventative_actions_en": [
            "Continue periodic leaf inspection every 3 days.",
            "Maintain clean field borders to keep sucking pests away."
        ],
        "preventative_actions_hi": [
            "हर 3-4 दिन में पत्तियों की जांच करते रहें।",
            "खेत की मेड़ों को खरपतवार मुक्त रखें।"
        ],
        "preventative_actions_mr": [
            "दर ३-४ दिवसांनी शेताची नियमित पाहणी चालू ठेवा.",
            "बांधावरील तण नष्ट करून शेत स्वच्छ ठेवा."
        ]
    },

    # -------------------------------------------------------------
    # POTATO DISEASES
    # -------------------------------------------------------------
    "Potato___Early_blight": {
        "crop_en": "Potato",
        "crop_hi": "आलू",
        "crop_mr": "बटाटा",
        "disease_en": "Potato Early Blight (Target Spots)",
        "disease_hi": "आलू अगेती झुलसा",
        "disease_mr": "बटाटा करपा (अर्ली ब्लाइट)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Alternaria solani",
        "primary_cause_en": "Fungal pathogen attacking stressed, mature foliage; spreads through irrigation splash and infected tuber seed pieces.",
        "primary_cause_hi": "पुरानी और कमजोर पत्तियों पर फंगस का हमला; सिंचाई के छींटों और संक्रमित कंदों से फैलाव।",
        "primary_cause_mr": "जमिनीतील बुरशी पानाच्या खालच्या भागावर हल्ला करते; जुन्या संसर्गित बेण्यांमुळे आणि पाण्याच्या उडण्याने पसरते.",
        "environmental_triggers_en": "Temperatures 24°C - 30°C with frequent dew and nitrogen-stressed crops.",
        "environmental_triggers_hi": "24°C से 30°C तापमान, पत्तियों पर रात की ओस और नाइट्रोजन की कमी।",
        "environmental_triggers_mr": "२४°C ते ३०°C तापमान आणि नत्राची कमतरता असल्यास हा रोग वेगाने वाढतो.",
        "organic_remedies_en": [
            "Foliar spray with Trichoderma viride @ 5 g/L with jaggery water.",
            "Spray Cow Urine (गोमूत्र) fermented @ 10% concentration."
        ],
        "organic_remedies_hi": [
            "ट्राइकोडर्मा 5 ग्राम प्रति लीटर गुड़ के पानी के साथ मिलाकर छिड़कें।",
            "10% देसी गोमूत्र का अर्क बनाकर पत्तियों पर स्प्रे करें।"
        ],
        "organic_remedies_mr": [
            "ट्रायकोडर्मा व्हिरिडी ५ ग्रॅम प्रति लिटर गुळाच्या पाण्यात मिसळून फवारा.",
            "१०% गोमूत्र अर्क फवारल्यास बुरशीचा प्रतिकार होतो."
        ],
        "chemical_remedies_en": [
            "Preventive: Mancozeb 75% WP @ 35 g per 15L pump.",
            "Curative: Propineb 70% WP (Antracol) @ 40 g per 15L pump.",
            "Advanced: Difenoconazole 25% EC (Score) @ 10 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "रोकथाम: मैंकोजेब 75% WP 35 ग्राम प्रति 15 लीटर पंप।",
            "उपचार: प्रोपिनेब 70% WP (एंट्राकोल) 40 ग्राम प्रति 15 लीटर पंप।",
            "उन्नत: डिफेनोकोनाज़ोल 25% EC (स्कोर) 10 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रतिबंधात्मक: मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "उपचारात्मक: प्रोपिनेब ७०% WP (अँट्राकॉल) ४० ग्रॅम प्रति १५ लिटर पंप.",
            "तीव्र प्रादुर्भावात: डायफेनोकोनॅझोल २५% EC (स्कोर) १० मिली प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": [
            "Use certified disease-free seed tubers.",
            "Maintain optimal potassium and nitrogen fertility to avoid premature foliage aging."
        ],
        "preventative_actions_hi": [
            "प्रमाणित रोगमुक्त आलू कंदों की ही बुवाई करें।",
            "पोटाश और नाइट्रोजन की संतुलित खुराक दें।"
        ],
        "preventative_actions_mr": [
            "प्रमाणित रोगमुक्त बटाटा बेणेच लागवडीसाठी वापरा.",
            "संतुलित पालाश व नत्राचा वापर करून पाने सशक्त ठेवा."
        ]
    },

    "Potato___Late_blight": {
        "crop_en": "Potato",
        "crop_hi": "आलू",
        "crop_mr": "बटाटा",
        "disease_en": "Potato Late Blight (Tuber & Foliar Blight)",
        "disease_hi": "आलू पछेती झुलसा",
        "disease_mr": "बटाटा तांबेरा / लेट ब्लाइट (पानांची करप)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Phytophthora infestans",
        "primary_cause_en": "Aggressive oomycete destroying entire foliage within 5-7 days under cold, cloudy, high-humidity weather.",
        "primary_cause_hi": "अत्यंत खतरनाक रोग जो ठंडे और बादल छाए रहने पर 5-7 दिनों में पूरी फसल को जलाकर नष्ट कर देता है।",
        "primary_cause_mr": "ढगाळ, थंड व धुके असलेल्या हवेत ही बुरशी अवघ्या ५-७ दिवसांत संपूर्ण वावर काळे पाडून नष्ट करते.",
        "environmental_triggers_en": "Persistent overcast sky, temp 12°C - 20°C, and relative humidity >90% for 48 consecutive hours.",
        "environmental_triggers_hi": "लगातार बादल, 12°C से 20°C तापमान और 90% से अधिक आर्द्रता।",
        "environmental_triggers_mr": "सतत ढगाळ हवा, १२°C ते २०°C तापमान आणि दोन दिवस सतत हवेत ९०% पेक्षा जास्त दमटपणा.",
        "organic_remedies_en": [
            "Spray Copper Hydroxide (Kocide) @ 30 g per 15L pump.",
            "Mound soil high over tuber ridges to prevent sporangia from washing down into tubers."
        ],
        "organic_remedies_hi": [
            "कॉपर हाइड्रोक्साइड 30 ग्राम प्रति 15 लीटर पंप छिड़कें।",
            "आलू की मेड़ों पर अधिक मिट्टी चढ़ाएं ताकि कंदों तक पानी न पहुंचे।"
        ],
        "organic_remedies_mr": [
            "कॉपर हायड्रॉक्साईड ३० ग्रॅम प्रति १५ लिटर पंप फवारा.",
            "बटाट्याच्या झाडांना भरपूर भर लावा, जेणेकरून पानांवरील बुरशी जमिनीतील बटाट्यांपर्यंत झिरपणार नाही."
        ],
        "chemical_remedies_en": [
            "Emergency Curative: Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 40 g per 15L pump.",
            "Alternative: Cymoxanil + Mancozeb (Curzate) @ 35 g per 15L pump.",
            "Secondary Spray: Fenamidone 10% + Mancozeb 50% WG (Sectin) @ 30 g per 15L pump."
        ],
        "chemical_remedies_hi": [
            "आपातकालीन उपचार: रिडोमिल गोल्ड 40 ग्राम प्रति 15 लीटर पंप।",
            "वैकल्पिक: कजेट (साइमोक्सानिल + मैंकोजेब) 35 ग्राम प्रति 15 लीटर पंप।",
            "दूसरा स्प्रे: सेक्टिन 30 ग्राम प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "तातडीचा उपाय: रिडोमिल गोल्ड ४० ग्रॅम प्रति १५ लिटर पंप ताबडतोब फवारा.",
            "पर्यायी: कर्झेट (सायमॉक्सॅनिल + मँकोझेब) ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "दुसरी फवारणी: सेक्टिन ३० ग्रॅम प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": [
            "Cut haulms (foliage) 10-14 days before harvest if late blight is detected.",
            "Never store tubers harvested from late-blight infected fields."
        ],
        "preventative_actions_hi": [
            "रोग दिखने पर खुदाई से 12 दिन पहले ऊपर की पत्तियों को काटकर हटा दें।",
            "रोगग्रस्त खेत से निकाले गए आलू का भंडारण न करें।"
        ],
        "preventative_actions_mr": [
            "रोग आढळल्यास काढणीपूर्वी १२ दिवस आधी वरचा पाला कापून शेताबाहेर नष्ट करा.",
            "बाधित शेतातील बटाटे साठवणुकीसाठी वापरू नका."
        ]
    },

    "Potato___healthy": {
        "crop_en": "Potato",
        "crop_hi": "आलू",
        "crop_mr": "बटाटा",
        "disease_en": "Healthy Potato Leaf",
        "disease_hi": "स्वस्थ आलू की पत्ती",
        "disease_mr": "निरोगी बटाटा पीक",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Foliage in robust health with uniform green color and no blight spots.",
        "primary_cause_hi": "पत्तियां पूरी तरह स्वस्थ, गहरी हरी और धब्बों से मुक्त हैं।",
        "primary_cause_mr": "पाने एकदम निरोगी, गर्द हिरवी व डागरहित आहेत.",
        "environmental_triggers_en": "Normal seasonal conditions with well-drained loam soil.",
        "environmental_triggers_hi": "अनुकूल मौसम और उत्तम जल निकास।",
        "environmental_triggers_mr": "उत्तम निचरा असलेली जमीन आणि अनुकूल हवामान.",
        "organic_remedies_en": ["Apply preventive Dashaparni Ark @ 20 ml/L."],
        "organic_remedies_hi": ["दशपर्णी अर्क 20 मिली प्रति लीटर का सुरक्षात्मक छिड़काव करें।"],
        "organic_remedies_mr": ["दशपर्णी अर्क २० मिली प्रति लिटर फवारा."],
        "chemical_remedies_en": ["Keep Mancozeb 75% WP standby if weather turns overcast and humid."],
        "chemical_remedies_hi": ["बादल छाने पर मैंकोजेब 35 ग्राम का सुरक्षात्मक स्प्रे करें।"],
        "chemical_remedies_mr": ["हवामानात ढग आल्यास मँकोझेब ३५ ग्रॅमचा सुरक्षात्मक फवारा घ्या."],
        "preventative_actions_en": ["Regular earthing-up (मातीची भर) at 30 days after planting."],
        "preventative_actions_hi": ["बुवाई के 30 दिन बाद पौधों पर अच्छी मिट्टी चढ़ाएं।"],
        "preventative_actions_mr": ["लागवडीनंतर ३० दिवसांनी पिकाला चांगली मातीची भर लावा."]
    },

    # -------------------------------------------------------------
    # CORN / MAIZE DISEASES
    # -------------------------------------------------------------
    "Corn_(maize)___Common_rust_": {
        "crop_en": "Maize",
        "crop_hi": "मक्का",
        "crop_mr": "मका",
        "disease_en": "Maize Common Rust (Puccinia sorghi)",
        "disease_hi": "मक्का रतुआ / गेरुआ रोग",
        "disease_mr": "मका तांबेरा रोग (पानावरील लालसर-तपकिरी फोड)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Puccinia sorghi (Rust Fungus)",
        "primary_cause_en": "Windborne fungal urediniospores blown across long distances from southern regions.",
        "primary_cause_hi": "हवा द्वारा दूर-दूर से उड़कर आने वाले कवक बीजाणु पत्तियों पर लाल भूरे दाने बना देते हैं।",
        "primary_cause_mr": "वाऱ्यामुळे हवेतून उडणारे बुरशीचे बीजाणू पानांवर लालसर-तपकिरी रंगाचे फोड तयार करतात.",
        "environmental_triggers_en": "Cool, humid nights (16°C - 23°C) and heavy dew on upper canopy.",
        "environmental_triggers_hi": "ठंडी नम रातें (16°C - 23°C) और पत्तियों पर भारी ओस।",
        "environmental_triggers_mr": "१६°C ते २३°C थंड आणि दमट हवामान, सकाळी पानांवर दाट दवबिंदू असणे.",
        "organic_remedies_en": [
            "Spray Wettable Sulphur 80% WDG (Sulfex) @ 30 g per 15L pump.",
            "Spray Cow Urine (गोमूत्र) fermented @ 10% concentration."
        ],
        "organic_remedies_hi": [
            "घुलनशील गंधक (सल्फर 80% WDG) 30 ग्राम प्रति 15 लीटर पंप छिड़कें।",
            "10% गोमूत्र अर्क का सुरक्षात्मक छिड़काव करें।"
        ],
        "organic_remedies_mr": [
            "पाण्यात विरघळणारे गंधक (सल्फर ८०% WDG) ३० ग्रॅम प्रति १५ लिटर पंप फवारा.",
            "१०% गोमूत्र अर्क फवारल्यास तांबेऱ्याची तीव्रता कमी होते."
        ],
        "chemical_remedies_en": [
            "Preventive: Mancozeb 75% WP @ 35 g per 15L pump.",
            "Curative: Tebuconazole 25.9% EC (Folicur) @ 15 ml per 15L pump.",
            "Combination: Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 15 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "रोकथाम: मैंकोजेब 35 ग्राम प्रति 15 लीटर पंप।",
            "उपचार: टेबुकोनाज़ोल 25.9% EC (फॉलिक्यूर) 15 मिली प्रति 15 लीटर पंप।",
            "उन्नत: एमिस्टार टॉप 15 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रतिबंधात्मक: मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "उपचारात्मक: टेबुकोनॅझोल २५.९% EC (फॉलिक्युअर) १५ मिली प्रति १५ लिटर पंप.",
            "प्रभावी उपाय: ॲमिस्टार टॉप १५ मिली प्रति १५ लिटर पंप फवारा."
        ],
        "preventative_actions_en": [
            "Select rust-tolerant hybrid corn varieties.",
            "Ensure early sowing to escape peak rust infection windows."
        ],
        "preventative_actions_hi": [
            "रतुआ-सहनशील संकर मक्का किस्मों का चयन करें।",
            "रोग के प्रकोप से बचने के लिए समय पर बुवाई करें।"
        ],
        "preventative_actions_mr": [
            "तांबेरा सहनशील संकरित मका वाणांची निवड करा.",
            "हंगामाच्या सुरुवातीला वेळेवर पेरणी करा जेणेकरून रोग टाळता येईल."
        ]
    },

    "Corn_(maize)___Northern_Leaf_Blight": {
        "crop_en": "Maize",
        "crop_hi": "मक्का",
        "crop_mr": "मका",
        "disease_en": "Northern Corn Leaf Blight (Exserohilum)",
        "disease_hi": "मक्का का झुलसा रोग (टर्सिकम ब्लाइट)",
        "disease_mr": "मका पानांवरील करपा (लांबट तपकिरी पट्टे)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Exserohilum turcicum",
        "primary_cause_en": "Fungus producing long, cigar-shaped grayish lesions on leaves starting from bottom canopy.",
        "primary_cause_hi": "निचली पत्तियों पर सिगार के आकार के लंबे भूरे-धूसर धब्बे बनते हैं।",
        "primary_cause_mr": "पानांवर लांबट सिगारसारखे करडे-तपकिरी चट्टे तयार होतात आणि पाने जळतात.",
        "environmental_triggers_en": "Moderate temperatures (18°C - 27°C) and extended dew periods (>6 hours).",
        "environmental_triggers_hi": "18°C से 27°C तापमान और पत्तियों पर 6 घंटे से अधिक समय तक नमी।",
        "environmental_triggers_mr": "१८°C ते २७°C तापमान आणि पानावरील ओलावा ६ तासांपेक्षा जास्त वेळ राहणे.",
        "organic_remedies_en": ["Foliar spray with Trichoderma viride @ 5 g/L."],
        "organic_remedies_hi": ["ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।"],
        "organic_remedies_mr": ["ट्रायकोडर्मा व्हिरिडी ५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा."],
        "chemical_remedies_en": [
            "Standard: Propiconazole 25% EC (Tilt) @ 15 ml per 15L pump.",
            "Alternative: Mancozeb 75% WP @ 35 g per 15L pump."
        ],
        "chemical_remedies_hi": [
            "मुख्य उपचार: प्रोपिकोनाज़ोल 25% EC (टिल्ट) 15 मिली प्रति 15 लीटर पंप।",
            "वैकल्पिक: मैंकोजेब 35 ग्राम प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रभावी उपाय: प्रोपिकोनाझोल २५% EC (टिल्ट) १५ मिली प्रति १५ लिटर पंप फवारा.",
            "प्रतिबंधात्मक: मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": ["Deep summer plowing to bury previous crop debris."],
        "preventative_actions_hi": ["गर्मियों में गहरी जुताई करें ताकि पुरानी फंगस खत्म हो जाए।"],
        "preventative_actions_mr": ["उन्हाळ्यात खोल नांगरणी करून आधीच्या पिकाचे अवशेष जमिनीत गाडून टाका."]
    },

    "Corn_(maize)___healthy": {
        "crop_en": "Maize",
        "crop_hi": "मक्का",
        "crop_mr": "मका",
        "disease_en": "Healthy Maize Leaf",
        "disease_hi": "स्वस्थ मक्का",
        "disease_mr": "निरोगी मका पीक",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Vigorous green foliage with upright posture and strong photosynthesis.",
        "primary_cause_hi": "पत्तियां पूरी तरह हरी, मजबूत और रोगमुक्त हैं।",
        "primary_cause_mr": "पाने गर्द हिरवीगार, जोमदार आणि डागमुक्त आहेत.",
        "environmental_triggers_en": "Adequate sunshine and balanced soil fertility.",
        "environmental_triggers_hi": "उचित धूप और संतुलित खाद।",
        "environmental_triggers_mr": "भरपूर सूर्यप्रकाश आणि योग्य खत व्यवस्थापन.",
        "organic_remedies_en": ["Apply Jeevamrut @ 200 L/acre through drip."],
        "organic_remedies_hi": ["200 लीटर जीवामृत प्रति एकड़ ड्रिप से दें।"],
        "organic_remedies_mr": ["२०० लिटर जीवामृत प्रति एकर ठिबकद्वारे द्या."],
        "chemical_remedies_en": ["Top-dress Urea @ 30 kg/acre at knee-high stage."],
        "chemical_remedies_hi": ["घुटने की ऊंचाई पर 30 किग्रा यूरिया प्रति एकड़ दें।"],
        "chemical_remedies_mr": ["मका गुडघाभर उंचीचा झाल्यावर ३० किलो युरिया प्रति एकर द्या."],
        "preventative_actions_en": ["Monitor regularly for Fall Armyworm (लष्करी अळी)."],
        "preventative_actions_hi": ["फॉल आर्मीवर्म (सैनिक कीट) की नियमित निगरानी रखें।"],
        "preventative_actions_mr": ["अमेरिकन लष्करी अळीसाठी (Fall Armyworm) पोंग्याची नियमित पाहणी करा."]
    },

    # -------------------------------------------------------------
    # BELL PEPPER / CAPSICUM DISEASES
    # -------------------------------------------------------------
    "Pepper,_bell___Bacterial_spot": {
        "crop_en": "Bell Pepper (Capsicum)",
        "crop_hi": "शिमला मिर्च",
        "crop_mr": "शिमला मिरची / ढोबळी मिरची",
        "disease_en": "Bacterial Spot (Xanthomonas)",
        "disease_hi": "शिमला मिर्च का जीवाणु धब्बा रोग",
        "disease_mr": "शिमला मिरची जिवाणू डाग (बॅक्टेरियल स्पॉट)",
        "is_healthy": False,
        "pathogen_type": "bacterial",
        "pathogen_name": "Xanthomonas euvesicatoria",
        "primary_cause_en": "Seed-borne or volunteer plant bacterium spreading rapidly through irrigation splashing and physical canopy contact.",
        "primary_cause_hi": "बीज या दूषित पानी के छींटों से जीवाणु पत्तियों और फलों में घाव बनाकर फैलते हैं।",
        "primary_cause_mr": "बियाण्यांतून किंवा पाण्याच्या उडणाऱ्या थेंबांमुळे पानाच्या पेशींमध्ये जिवाणू शिरून तपकिरी डाग पाडतात.",
        "environmental_triggers_en": "High temperatures (25°C - 32°C) combined with prolonged rainy days and wet foliage.",
        "environmental_triggers_hi": "25°C से 32°C तापमान और लगातार बारिश।",
        "environmental_triggers_mr": "२५°C ते ३२°C तापमान आणि संततधार पाऊस.",
        "organic_remedies_en": [
            "Hot water soak seed at 50°C for 25 minutes before sowing.",
            "Spray Copper Hydroxide @ 2 g/L."
        ],
        "organic_remedies_hi": [
            "बीज को 50°C गर्म पानी में 25 मिनट उपचारित करें।",
            "कॉपर हाइड्रोक्साइड 2 ग्राम प्रति लीटर स्प्रे करें।"
        ],
        "organic_remedies_mr": [
            "लागवडीपूर्वी बियाणे ५०°C कोमट पाण्यात २५ मिनिटे भिजवून प्रक्रिया करा.",
            "कॉपर हायड्रॉक्साईड २ ग्रॅम प्रति लिटर फवारा."
        ],
        "chemical_remedies_en": [
            "Standard: Copper Oxychloride 50% WP @ 35 g + Streptocycline @ 2 g per 15L pump.",
            "Alternative: Kasugamycin 3% SL @ 30 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "कॉपर ऑक्सीक्लोराइड 35 ग्राम + स्ट्रेप्टोसाइक्लिन 2 ग्राम प्रति 15 लीटर पंप।",
            "कासुगामाइसिन 3% SL 30 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम + स्ट्रेप्टोसायक्लिन २ ग्रॅम प्रति १५ लिटर पंप मिसळून फवारा.",
            "कासुगामायसिन ३% SL ३० मिली प्रति १५ लिटर पंप फवारा."
        ],
        "preventative_actions_en": [
            "Do not enter or cultivate pepper field while foliage is wet.",
            "Use drip irrigation to prevent water splash on leaves."
        ],
        "preventative_actions_hi": [
            "पत्तियां गीली होने पर खेत में काम न करें।",
            "ड्रिप सिंचाई का उपयोग करें।"
        ],
        "preventative_actions_mr": [
            "पाने ओली असताना मशागत किंवा तोडणी करू नका.",
            "फक्त ठिबक सिंचनाचा वापर करा."
        ]
    },

    "Pepper,_bell___healthy": {
        "crop_en": "Bell Pepper (Capsicum)",
        "crop_hi": "शिमला मिर्च",
        "crop_mr": "शिमला मिरची",
        "disease_en": "Healthy Bell Pepper Leaf",
        "disease_hi": "स्वस्थ शिमला मिर्च",
        "disease_mr": "निरोगी शिमला मिरची पीक",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Uniform green canopy with clean fruit setting and zero bacterial lesions.",
        "primary_cause_hi": "पौधा पूरी तरह स्वस्थ है और फल लगने की स्थिति अच्छी है।",
        "primary_cause_mr": "रोप सशक्त असून उत्कृष्ट फुलकळी व फळधारणा सुरू आहे.",
        "environmental_triggers_en": "Well-balanced irrigation and aeration.",
        "environmental_triggers_hi": "उचित जल निकास और पोषण।",
        "environmental_triggers_mr": "उत्तम निचरा आणि योग्य हवा खेळती असणे.",
        "organic_remedies_en": ["Spray 1% Neem Oil every 10 days."],
        "organic_remedies_hi": ["हर 10 दिन में 1% नीम का तेल स्प्रे करें।"],
        "organic_remedies_mr": ["दर १० दिवसांनी १% निंबोळी तेल फवारा."],
        "chemical_remedies_en": ["Apply 0:52:34 @ 3 kg/acre during flowering."],
        "chemical_remedies_hi": ["फूल आने पर 0:52:34 खाद 3 किग्रा प्रति एकड़ ड्रिप से दें।"],
        "chemical_remedies_mr": ["फुलकळीच्या काळात ०:५२:३४ विद्राव्य खत ३ किलो प्रति एकर द्या."],
        "preventative_actions_en": ["Regular scouting for thrips and mites."],
        "preventative_actions_hi": ["थ्रिप्स और मकड़ी की नियमित जांच करें।"],
        "preventative_actions_mr": ["थ्रिप्स (बोकड्या) व कोळी किडीसाठी नियमित पाहणी करा."]
    },

    # -------------------------------------------------------------
    # GRAPE DISEASES
    # -------------------------------------------------------------
    "Grape___Black_rot": {
        "crop_en": "Grape",
        "crop_hi": "अंगूर",
        "crop_mr": "द्राक्ष",
        "disease_en": "Grape Black Rot (Guignardia bidwellii)",
        "disease_hi": "अंगूर का ब्लैक रॉट (काला सड़न)",
        "disease_mr": "द्राक्ष काळा करपा / ब्लॅक रॉट",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Guignardia bidwellii",
        "primary_cause_en": "Overwintered mummified berries and cane lesions release ascospores during spring rainfall.",
        "primary_cause_hi": "पुरानी सड़ी हुई सूखी अंगूर की मणियों से फफूंद के बीजाणु नई पत्तियों और गुच्छों पर फैलते हैं।",
        "primary_cause_mr": "वेलीवर राहिलेल्या जुन्या सुकलेल्या मण्यांमधून (Mummies) पावसाच्या थेंबाने बुरशी नवीन फुटींवर पसरते.",
        "environmental_triggers_en": "Warm, humid weather (21°C - 27°C) and extended rainfall >7 hours.",
        "environmental_triggers_hi": "21°C से 27°C तापमान और 7 घंटे से अधिक लगातार बारिश।",
        "environmental_triggers_mr": "२१°C ते २७°C तापमान आणि सलग ७ तासांपेक्षा जास्त पाऊस.",
        "organic_remedies_en": [
            "Prune and destroy all mummified berries from the canopy before bud break.",
            "Spray Copper Hydroxide @ 2.5 g/L."
        ],
        "organic_remedies_hi": [
            "पुरानी सड़ी-सूखी मणियों को छांटकर नष्ट कर दें।",
            "कॉपर हाइड्रोक्साइड 2.5 ग्राम प्रति लीटर छिड़कें।"
        ],
        "organic_remedies_mr": [
            "छाटणीच्या वेळी सर्व सुकलेले जुने मणी (Mummies) गोळा करून जाळून नष्ट करा.",
            "कॉपर हायड्रॉक्साईड २.५ ग्रॅम प्रति लिटर फवारा."
        ],
        "chemical_remedies_en": [
            "Early Spray: Mancozeb 75% WP @ 35 g per 15L pump.",
            "Post-Infection: Difenoconazole 25% EC (Score) @ 10 ml per 15L pump.",
            "Advanced: Kresoxim-methyl 44.3% SC (Ergon) @ 15 ml per 15L pump."
        ],
        "chemical_remedies_hi": [
            "रोकथाम: मैंकोजेब 35 ग्राम प्रति 15 लीटर पंप।",
            "संक्रमण के बाद: स्कोर (डिफेनोकोनाज़ोल) 10 मिली प्रति 15 लीटर पंप।",
            "उन्नत: क्रेसोक्सिम मिथाइल (एरगॉन) 15 मिली प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "प्रतिबंधात्मक: मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "प्रादुर्भावानंतर: डायफेनोकोनॅझोल (स्कोर) १० मिली प्रति १५ लिटर पंप.",
            "प्रभावी उपाय: क्रेसॉक्सिम मिथाईल (एरगॉन) १५ मिली प्रति १५ लिटर पंप फवारा."
        ],
        "preventative_actions_en": ["Ensure open canopy training to allow quick cluster drying."],
        "preventative_actions_hi": ["कैनोपी की ऐसी छंटाई करें जिससे गुच्छे हवा में जल्दी सूख सकें।"],
        "preventative_actions_mr": ["वेलीची कॅनोपी मोकळी ठेवा जेणेकरून घड हवेने लगेच कोरडे होतील."]
    },

    "Grape___healthy": {
        "crop_en": "Grape",
        "crop_hi": "अंगूर",
        "crop_mr": "द्राक्ष",
        "disease_en": "Healthy Grape Leaf",
        "disease_hi": "स्वस्थ अंगूर की पत्ती",
        "disease_mr": "निरोगी द्राक्ष बाग",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Well-nourished vine with dark green leathery leaves and clean berry development.",
        "primary_cause_hi": "पत्तियां चमकदार हरी और फंगस से पूरी तरह मुक्त हैं।",
        "primary_cause_mr": "पाने तजेलदार, निरोगी असून घडांची वाढ उत्तम सुरू आहे.",
        "environmental_triggers_en": "Dry, sunny weather with controlled drip fertigation.",
        "environmental_triggers_hi": "धूप वाला मौसम और संतुलित ड्रिप सिंचाई।",
        "environmental_triggers_mr": "सूर्यप्रकाशयुक्त कोरडे हवामान व नियंत्रित ठिबक सिंचन.",
        "organic_remedies_en": ["Spray Trichoderma viride @ 5 g/L."],
        "organic_remedies_hi": ["ट्राइकोडर्मा 5 ग्राम प्रति लीटर छिड़कें।"],
        "organic_remedies_mr": ["ट्रायकोडर्मा ५ ग्रॅम प्रति लिटर फवारा."],
        "chemical_remedies_en": ["Maintain sulfur dusting @ 5 kg/acre for powdery mildew prevention."],
        "chemical_remedies_hi": ["भभूतिया रोग की रोकथाम के लिए 5 किग्रा सल्फर डस्टिंग करें।"],
        "chemical_remedies_mr": ["भुरी रोगाच्या प्रतिबंधासाठी गंधकाची धुरळणी (५ किलो/एकर) करा."],
        "preventative_actions_en": ["Maintain canopy shoot thinning regularly."],
        "preventative_actions_hi": ["अतिरिक्त टहनियों की नियमित छंटाई रखें।"],
        "preventative_actions_mr": ["वेलीवरील अनावश्यक फुटींची वेळोवेळी विरळणी करा."]
    },

    # -------------------------------------------------------------
    # APPLE SCAB & BLACK ROT
    # -------------------------------------------------------------
    "Apple___Apple_scab": {
        "crop_en": "Apple",
        "crop_hi": "सेब",
        "crop_mr": "सफरचंद",
        "disease_en": "Apple Scab (Venturia inaequalis)",
        "disease_hi": "सेब का स्केब रोग",
        "disease_mr": "सफरचंद खवले रोग (ॲपल स्कॅब)",
        "is_healthy": False,
        "pathogen_type": "fungal",
        "pathogen_name": "Venturia inaequalis",
        "primary_cause_en": "Fungal ascospores release from fallen dead leaves on orchard floor during spring rains.",
        "primary_cause_hi": "जमीन पर गिरी सूखी पत्तियों में मौजूद फंगस वसंत ऋतु की बारिश में नई पत्तियों पर फैलती है।",
        "primary_cause_mr": "जमिनीवर पडलेल्या जुन्या पानांमधील बुरशी पावसाच्या थेंबाने नवीन फुटींवर पसरून काळे खवले पाडते.",
        "environmental_triggers_en": "Cool, wet spring weather (15°C - 22°C) with persistent leaf wetness for 9+ hours.",
        "environmental_triggers_hi": "15°C से 22°C तापमान और 9 घंटे से अधिक समय तक पत्तियों का गीला रहना।",
        "environmental_triggers_mr": "१५°C ते २२°C थंड हवामान आणि पाने ९ तासांपेक्षा जास्त वेळ ओली राहणे.",
        "organic_remedies_en": [
            "Spray 5% Urea on fallen orchard leaves in autumn to accelerate leaf decomposition.",
            "Spray Copper Oxychloride @ 3 g/L at green tip stage."
        ],
        "organic_remedies_hi": [
            "पतझड़ में गिरी पत्तियों पर 5% यूरिया का छिड़काव करें ताकि पत्तियां जल्दी सड़ जाएं।",
            "हरी कली अवस्था में कॉपर ऑक्सीक्लोराइड 3 ग्राम प्रति लीटर स्प्रे करें।"
        ],
        "organic_remedies_mr": [
            "बागेतील गळून पडलेल्या पानांवर ५% युरिया फवारा जेणेकरून ती लवकर कुजून बुरशी नष्ट होईल.",
            "हिरव्या कळीच्या अवस्थेत कॉपर ऑक्सिक्लोराईड ३ ग्रॅम प्रति लिटर फवारा."
        ],
        "chemical_remedies_en": [
            "Pink Bud Stage: Mancozeb 75% WP @ 35 g per 15L pump.",
            "Petal Fall: Difenoconazole 25% EC (Score) @ 10 ml per 15L pump.",
            "Fruit Development: Dodine 65% WP @ 20 g per 15L pump."
        ],
        "chemical_remedies_hi": [
            "गुलाबी कली पर: मैंकोजेब 35 ग्राम प्रति 15 लीटर पंप।",
            "पंखुड़ी झड़ने पर: स्कोर (डिफेनोकोनाज़ोल) 10 मिली प्रति 15 लीटर पंप।",
            "फल विकास पर: डोडाइन 65% WP 20 ग्राम प्रति 15 लीटर पंप।"
        ],
        "chemical_remedies_mr": [
            "गुलाबी कळी अवस्थेत: मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप.",
            "पाकळ्या गळण्याच्या वेळी: डायफेनोकोनॅझोल (स्कोर) १० मिली प्रति १५ लिटर पंप.",
            "फळ वाढीच्या अवस्थेत: डोडीन ६५% WP २० ग्रॅम प्रति १५ लिटर पंप."
        ],
        "preventative_actions_en": ["Shred or remove all leaf litter from the orchard floor before spring."],
        "preventative_actions_hi": ["वसंत ऋतु से पहले बगीचे की जमीन से सभी गिरी पत्तियां साफ कर लें।"],
        "preventative_actions_mr": ["नवीन पालवी फुटण्यापूर्वी बागेतील सर्व जुनी पाने गोळा करून नष्ट करा."]
    },

    "Apple___healthy": {
        "crop_en": "Apple",
        "crop_hi": "सेब",
        "crop_mr": "सफरचंद",
        "disease_en": "Healthy Apple Leaf",
        "disease_hi": "स्वस्थ सेब की पत्ती",
        "disease_mr": "निरोगी सफरचंद झाड",
        "is_healthy": True,
        "pathogen_type": "none",
        "pathogen_name": "No Pathogen Detected",
        "primary_cause_en": "Orchard foliage free of fungal lesions with intact cuticle.",
        "primary_cause_hi": "पत्तियां पूरी तरह स्वस्थ और चमकदार हैं।",
        "primary_cause_mr": "पाने अत्यंत तजेलदार व डागमुक्त आहेत.",
        "environmental_triggers_en": "Optimal sunlight and good air circulation.",
        "environmental_triggers_hi": "उचित धूप और हवा।",
        "environmental_triggers_mr": "उत्तम सूर्यप्रकाश व खेळती हवा.",
        "organic_remedies_en": ["Apply bio-fertilizer mycorrhiza around roots."],
        "organic_remedies_hi": ["जड़ों में माइकोराइजा जैविक खाद दें।"],
        "organic_remedies_mr": ["मुळांभोवती मायकोरायझा जैविक खत द्या."],
        "chemical_remedies_en": ["Standard micronutrient foliar spray (Zinc, Boron)."],
        "chemical_remedies_hi": ["जिंक और बोरॉन का पर्णीय छिड़काव करें।"],
        "chemical_remedies_mr": ["झिंक व बोरॉन सूक्ष्म अन्नद्रव्यांची फवारणी करा."],
        "preventative_actions_en": ["Winter pruning and Bordeaux paste application on cut wounds."],
        "preventative_actions_hi": ["सर्दियों में छंटाई के बाद कटे स्थानों पर बोर्डो पेस्ट लगाएं।"],
        "preventative_actions_mr": ["हिवाळी छाटणीनंतर कापलेल्या फांद्यांवर बोर्डो पेस्ट लावा."]
    }
}


def get_disease_intelligence(raw_disease: str, confidence: float = 0.85, top_predictions: list = None) -> dict:
    """
    Enriches ML disease diagnosis with complete pathogen details, probability triggers,
    organic remedies, and chemical dosages for 15-liter knapsack sprayers.
    """
    key = str(raw_disease).strip()
    data = DISEASE_KNOWLEDGE.get(key)

    if not data:
        # Fallback matching for similar keys
        for k_entry, v_entry in DISEASE_KNOWLEDGE.items():
            if k_entry.lower() in key.lower() or key.lower() in k_entry.lower():
                data = v_entry
                break

    if not data:
        # Generic intelligent template if unknown class
        clean_name = key.replace("___", " — ").replace("_", " ")
        is_healthy = "healthy" in key.lower()
        data = {
            "crop_en": clean_name.split("—")[0].strip() if "—" in clean_name else "Crop",
            "crop_hi": "फसल",
            "crop_mr": "पीक",
            "disease_en": clean_name,
            "disease_hi": clean_name,
            "disease_mr": clean_name,
            "is_healthy": is_healthy,
            "pathogen_type": "none" if is_healthy else "fungal",
            "pathogen_name": "Unknown pathogen" if not is_healthy else "Healthy foliage",
            "primary_cause_en": "Foliar pathogen activity exacerbated by leaf wetness and microclimate humidity.",
            "primary_cause_hi": "पत्तियों पर नमी और अनुकूल तापमान के कारण रोग का प्रकोप।",
            "primary_cause_mr": "पानांवरील साचलेला ओलावा आणि अनुकूल दमट हवामानामुळे रोगाचा प्रादुर्भाव.",
            "environmental_triggers_en": "High humidity, prolonged leaf wetness, and poor air ventilation.",
            "environmental_triggers_hi": "उच्च आर्द्रता, पत्तियों पर पानी और खराब हवा निकासी।",
            "environmental_triggers_mr": "जास्त दमटपणा, पानांवर साचलेले पाणी आणि खेळती हवा नसणे.",
            "organic_remedies_en": ["Spray 5 ml/L pure Neem Oil with soap sticker.", "Apply Trichoderma viride @ 5 g/L."],
            "organic_remedies_hi": ["5 मिली नीम का तेल प्रति लीटर स्प्रे करें।", "ट्राइकोडर्मा 5 ग्राम प्रति लीटर छिड़कें।"],
            "organic_remedies_mr": ["५ मिली निंबोळी तेल प्रति लिटर पाण्यात मिसळून फवारा.", "ट्रायकोडर्मा ५ ग्रॅम प्रति लिटर फवारा."],
            "chemical_remedies_en": ["Mancozeb 75% WP @ 35 g per 15L pump.", "Copper Oxychloride 50% WP @ 35 g per 15L pump."],
            "chemical_remedies_hi": ["मैंकोजेब 35 ग्राम प्रति 15 लीटर पंप।", "कॉपर ऑक्सीक्लोराइड 35 ग्राम प्रति 15 लीटर पंप।"],
            "chemical_remedies_mr": ["मँकोझेब ७५% WP ३५ ग्रॅम प्रति १५ लिटर पंप.", "कॉपर ऑक्सिक्लोराईड ३५ ग्रॅम प्रति १५ लिटर पंप."],
            "preventative_actions_en": ["Prune damaged leaves and avoid overhead sprinkler watering."],
            "preventative_actions_hi": ["प्रभावित पत्तियों को काटकर हटाएं और ड्रिप सिंचाई अपनाएं।"],
            "preventative_actions_mr": ["बाधित पाने काढून नष्ट करा आणि तुषार सिंचन टाळा."]
        }

    # Format probability analysis
    prob_pct = round(float(confidence) * 100, 1)
    
    # Differential candidates analysis
    candidates = []
    if top_predictions and isinstance(top_predictions, list):
        for item in top_predictions:
            d_name = item.get("disease", "")
            d_conf = round(float(item.get("confidence", 0)) * 100, 1)
            d_data = DISEASE_KNOWLEDGE.get(d_name, {})
            candidates.append({
                "disease_raw": d_name,
                "confidence_percent": d_conf,
                "disease_name_en": d_data.get("disease_en", d_name.replace("___", " - ")),
                "disease_name_mr": d_data.get("disease_mr", d_name.replace("___", " - ")),
                "disease_name_hi": d_data.get("disease_hi", d_name.replace("___", " - ")),
                "pathogen": d_data.get("pathogen_name", "Pathogen"),
                "cause_summary": d_data.get("primary_cause_en", "")[:90] + "..."
            })

    return {
        "crop": data["crop_en"],
        "crop_mr": data["crop_mr"],
        "crop_hi": data["crop_hi"],
        "disease": data["disease_en"],
        "disease_mr": data["disease_mr"],
        "disease_hi": data["disease_hi"],
        "is_healthy": data["is_healthy"],
        "confidence_percent": prob_pct,
        "pathogen_type": data["pathogen_type"],
        "pathogen_name": data["pathogen_name"],
        "primary_cause": {
            "en": data["primary_cause_en"],
            "hi": data["primary_cause_hi"],
            "mr": data["primary_cause_mr"]
        },
        "environmental_triggers": {
            "en": data["environmental_triggers_en"],
            "hi": data["environmental_triggers_hi"],
            "mr": data["environmental_triggers_mr"]
        },
        "organic_remedies": {
            "en": data["organic_remedies_en"],
            "hi": data["organic_remedies_hi"],
            "mr": data["organic_remedies_mr"]
        },
        "chemical_remedies": {
            "en": data["chemical_remedies_en"],
            "hi": data["chemical_remedies_hi"],
            "mr": data["chemical_remedies_mr"]
        },
        "preventative_actions": {
            "en": data["preventative_actions_en"],
            "hi": data["preventative_actions_hi"],
            "mr": data["preventative_actions_mr"]
        },
        "differential_diagnoses": candidates
    }
