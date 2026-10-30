# create_survey_doc.py
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def build_survey_document(filepath):
    doc = docx.Document()

    # Set standard margins (1 inch all around)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Base styling - clean standard black text, no colors, no background
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Calibri'
    font.size = Pt(11)
    font.color.rgb = RGBColor(0, 0, 0)

    # Document Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(4)
    run_title = p_title.add_run("FARMER PROBLEM IDENTIFICATION & FIELD SURVEY")
    run_title.bold = True
    run_title.font.size = Pt(16)

    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(14)
    run_sub = p_sub.add_run("Needs Assessment on Crop Diseases, Market Prices, Soil Health, and Digital Advisory")
    run_sub.font.size = Pt(11)
    run_sub.italic = True

    # Purpose Statement
    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(12)
    p_intro.add_run(
        "Purpose of this Survey: This questionnaire is conducted to understand the real-world operational and financial "
        "challenges faced by farmers regarding crop disease diagnosis, pesticide usage, mandi market prices, soil fertility, "
        "and digital mobile assistance. Your valuable feedback will help design practical solutions to support the farming community.\n"
        "(हा सर्वेक्षण शेतकऱ्यांना पिकांवरील रोग, औषध फवारणी, बाजारभाव, माती परीक्षण आणि मोबाईल तंत्रज्ञानातील अडचणी समजून घेण्यासाठी आहे.)"
    )

    # Metadata Block
    p_meta = doc.add_paragraph()
    p_meta.paragraph_format.space_after = Pt(14)
    p_meta.add_run("Date: ________________________        Surveyor Name: ____________________________________\n")
    p_meta.add_run("Village / Taluka: ____________________   District / State: __________________________________\n")
    p_meta.add_run("Farmer Name (Optional): __________________   Contact No. (Optional): _______________________")

    def add_section_header(title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(12)

    def add_question(q_num, q_text, options, is_multiselect=False):
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(8)
        p_q.paragraph_format.space_after = Pt(3)
        tag = " (Select all that apply / लागू असलेले सर्व निवडा)" if is_multiselect else " (Select one / एक पर्याय निवडा)"
        r_q = p_q.add_run(f"Q{q_num}. {q_text}{tag}")
        r_q.bold = True

        for opt in options:
            p_opt = doc.add_paragraph()
            p_opt.paragraph_format.left_indent = Inches(0.25)
            p_opt.paragraph_format.space_before = Pt(1)
            p_opt.paragraph_format.space_after = Pt(2)
            p_opt.add_run(f"[   ]  {opt}")

    q_count = 1

    # ==========================================
    # SECTION 1: FARMER PROFILE & LANDHOLDING
    # ==========================================
    add_section_header("SECTION 1: FARMER & LAND PROFILE (शेतकरी व जमिनीची प्राथमिक माहिती)")

    add_question(
        q_count,
        "What is the total size of your agricultural land? (तुमचे एकूण शेती क्षेत्र किती आहे?)",
        [
            "Marginal: Less than 1 Acre (१ एकरापेक्षा कमी)",
            "Small: 1 to 2.5 Acres (१ ते २.५ एकर)",
            "Medium: 2.5 to 5 Acres (२.५ ते ५ एकर)",
            "Large: More than 5 Acres (५ एकरांपेक्षा जास्त)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What is your primary source of irrigation? (शेतीसाठी पाण्याचा मुख्य स्रोत कोणता?)",
        [
            "Canal / River lift irrigation (नहर / नदी पाणी)",
            "Open Well / Borewell (विहीर / बोअरवेल)",
            "Rainfed / Dryland (केवळ पावसाचे पाणी / कोरडवाहू)",
            "Farm Pond / Tank (शेततळे / साठवणूक तलाव)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Which major crops do you cultivate? (तुम्ही कोणती मुख्य पिके घेता?)",
        [
            "Vegetables (Tomato, Onion, Potato, Chilli, etc. / भाजीपाला - टोमॅटो, कांदा, बटाटा)",
            "Oilseeds & Pulses (Soybean, Gram, Tur / तेलबिया व डाळी - सोयाबीन, हरभरा)",
            "Cereals (Wheat, Bajra, Maize, Rice / अन्नधान्य - गहू, बाजरी, मका, भात)",
            "Cash / Commercial Crops (Sugarcane, Cotton / ऊस, कापूस)",
            "Fruit Orchards (Pomegranate, Figs, Grapes, Custard Apple / फळबागा - डाळिंब, अंजीर, द्राक्ष)"
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "What kind of phone do you currently use? (तुम्ही सध्या कोणता फोन वापरता?)",
        [
            "Android Smartphone with active internet (इंटरनेट असलेला स्मार्टफोन)",
            "Android Smartphone without regular internet (नेहमी इंटरनेट नसलेला स्मार्टफोन)",
            "Basic Keypad / Feature Phone (साधा कीपॅड फोन)",
            "Family member owns a smartphone (घरातील इतर व्यक्तीकडे स्मार्टफोन आहे)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 2: CROP HEALTH, PESTS & DISEASES
    # ==========================================
    add_section_header("SECTION 2: CROP DISEASES & PEST CONTROL PROBLEMS (पिकांवरील कीड व रोग समस्या)")

    add_question(
        q_count,
        "How much crop yield/income do you lose annually due to pests and leaf diseases? (कीड व रोगांमुळे तुमचे दरवर्षी किती नुकसान होते?)",
        [
            "Severe Loss: More than 30% of total harvest (३०% पेक्षा जास्त मोठे नुकसान)",
            "Moderate Loss: 15% to 30% of harvest (१५% ते ३०% नुकसान)",
            "Mild Loss: Less than 15% of harvest (१५% पेक्षा कमी नुकसान)",
            "Negligible loss (फारसे नुकसान नाही)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "When leaves show yellow spots, curling, or pest damage, how do you usually diagnose the disease? (पानांवर डाग किंवा कीड दिसल्यास तुम्ही रोगाचे निदान कसे करता?)",
        [
            "Take leaf sample to local agro-chemical / krushi-seva shop (कृषी सेवा केंद्रात पान दाखवून)",
            "Ask experienced neighboring farmers (शेजारील अनुभवी शेतकऱ्यांना विचारून)",
            "Guess based on past experience and spray previous chemical (स्वतःच्या जुन्या अनुभवावरून फवारणी करतो)",
            "Contact government agricultural officer / KVK scientist (कृषी अधिकारी किंवा KVK शास्त्रज्ञांशी संपर्क साधून)",
            "Wait until damage becomes severe before acting (नुकसान जास्त होईपर्यंत वाट पाहतो)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What major problems do you face when buying pesticides from agro-chemical shops? (कृषी केंद्रातून कीटकनाशके घेताना कोणत्या अडचणी येतात?)",
        [
            "Shopkeeper sells expensive chemicals that do not cure the actual disease (रोग न ओळखता महागडी औषधे दिली जातात)",
            "Given 3 to 4 chemicals/tonics bundled together unnecessarily (गरज नसताना टॉनिक व अतिरिक्त औषधे दिली जातात)",
            "No clear dosage guidance for standard 15-liter spray pumps (१५ लिटर पंपासाठी अचूक डोस सांगितला जात नाही)",
            "Fake or low-quality pesticides sold with no results (हलक्या प्रतीची अथवा निष्प्रभ औषधे मिळतात)",
            "No issue, fully satisfied with local shop (कोणतीही अडचण नाही)"
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "Have you ever faced crop damage due to wrong chemical mixtures or incorrect dosages? (चुकीच्या फवारणीमुळे किंवा चुकीच्या प्रमाणामुळे कधी पिकाचे नुकसान झाले आहे का?)",
        [
            "Yes, multiple times (होय, अनेक वेळा नुकसान झाले आहे)",
            "Yes, once or twice (होय, एक-दोन वेळा झाले आहे)",
            "No, never faced crop burn or leaf fall (नाही, असा प्रसंग आला नाही)",
            "Not sure if damage was from disease or wrong spray (रोग की औषधामुळे नुकसान झाले हे समजले नाही)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "If a smartphone app could instantly identify plant disease from a leaf photo and tell you the exact dosage, would you use it? (मोबाईल कॅमेऱ्याने फोटो काढून तात्काळ रोग व अचूक डोस सांगणारे साधन वापरण्यास तुम्ही इच्छुक आहात का?)",
        [
            "Yes, definitely — it will save money and crop loss (होय नक्कीच, यामुळे पैसे व पीक वाचेल)",
            "Yes, provided it is in my regional language (Marathi) (होय, जर माहिती मराठीत सोपी असेल तर)",
            "Maybe, if someone teaches me how to take the photo (कदाचित, फोटो कसा काढायचा हे शिकवल्यास)",
            "No, I only trust local shopkeeper advice (नाही, मी केवळ कृषी दुकानदारावर विश्वास ठेवतो)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 3: MARKET PRICES & APMC MANDI SELLING
    # ==========================================
    add_section_header("SECTION 3: MARKET PRICES, MANDIS & SELLING DECISIONS (बाजारभाव व विक्रीतील अडचणी)")

    add_question(
        q_count,
        "How do you currently find daily market prices before harvesting or taking produce to market? (माल बाजारात नेण्यापूर्वी तुम्हाला आजचे बाजारभाव कसे समजतात?)",
        [
            "Phone call to local middleman / commission agent (दलाल / आडत्याला फोन करून विचारतो)",
            "Word of mouth from fellow farmers who visited the mandi (बाजारातून आलेल्या इतर शेतकऱ्यांकडून समजते)",
            "Newspaper reports (next day / delayed) (वृत्तपत्रातील आदल्या दिवसाचे दर वाचून)",
            "Directly take produce to mandi without knowing the rate in advance (दर माहीत नसतानाही थेट माल बाजारात नेतो)",
            "YouTube / WhatsApp groups (व्हॉट्सॲप अथवा सोशल मीडियावरून)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What is your biggest frustration when selling produce in agricultural mandis (APMCs)? (बाजार समितीत (APMC) माल विकताना सर्वात मोठा त्रास कोणता होतो?)",
        [
            "Sudden price crash upon reaching the market yard (बाजारात पोहोचल्यावर अचानक भाव पाडले जातात)",
            "High commission, arbitrary weighment cuts, and market deductions (जास्त आडत, वजनकाटा व हमाली कपात)",
            "Price difference across nearby mandis is unknown (उदा. चाकण, पुणे, नारायणगाव यांमधील दरातील फरक वेळेवर समजत नाही)",
            "High transportation cost forces selling at whatever rate is offered (वाहतूक खर्च जास्त असल्याने आलेला दर स्वीकारावा लागतो)",
            "Lack of proper cold storage to hold produce when rates are low (दर कमी असताना माल साठवून ठेवण्यासाठी गोदाम/कोल्ड स्टोरेज नाही)"
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "Have you ever sold your crop at a loss because you could not forecast whether prices would rise next week? (पुढील आठवड्यात भाव वाढतील की नाही हे न समजल्यामुळे कधी तोट्यात विक्री करावी लागली आहे का?)",
        [
            "Yes, happens almost every season (होय, जवळपास प्रत्येक हंगामात असे घडते)",
            "Yes, occasionally during peak harvest (होय, काढणीच्या हंगामात कधीकधी घडते)",
            "Rarely, I manage to sell at break-even (फार क्वचित, नुकसान टळते)",
            "No, I always get satisfactory market prices (नाही, समाधानकारक भाव मिळतो)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Would a 7-day price trend forecast and multi-mandi comparison tool help you get better returns? (पुढील ७ दिवसांचा भाव अंदाज व जवळच्या सर्व बाजारांचे भाव एकत्र दिसल्यास फायदा होईल का?)",
        [
            "Extremely helpful — can negotiate better and choose right mandi (अत्यंत उपयुक्त — योग्य बाजार निवडता येईल)",
            "Somewhat helpful for planning harvest date (काढणीचे नियोजन करण्यासाठी उपयुक्त ठरेल)",
            "Only helpful if local mandi is included (केवळ माझ्या जवळच्या स्थानिक बाजाराचे भाव असतील तरच)",
            "Not helpful, rates are completely unpredictable (उपयुक्त नाही, भाव कधीही बदलतात)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 4: SOIL TESTING, FERTILIZERS & CROP PLANNING
    # ==========================================
    add_section_header("SECTION 4: SOIL FERTILITY & CROP PLANNING (माती परीक्षण व पीक निवड)")

    add_question(
        q_count,
        "Have you tested your soil in an approved soil testing laboratory in the last 3 years? (गेल्या ३ वर्षात तुम्ही तुमच्या शेताचे अधिकृत माती परीक्षण केले आहे का?)",
        [
            "Yes, regular soil health card available (होय, नियमित माती परीक्षण करतो व अहवाल आहे)",
            "Tested once in the past, but not recently (पूर्वी एकदा केले होते, पण अलीकडे नाही)",
            "Never tested my soil (कधीही माती परीक्षण केलेले नाही)",
            "Do not know where the nearest soil testing lab is located (जवळची माती परीक्षण प्रयोगशाळा कुठे आहे माहीत नाही)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "If you have NOT tested your soil, what is the main reason? (माती परीक्षण न करण्याचे मुख्य कारण काय आहे?)",
        [
            "Lab is too far away and takes weeks to give report (लॅब खूप लांब आहे आणि अहवाल मिळण्यास खूप वेळ लागतो)",
            "Report contains scientific numbers (pH, NPK ppm) that are difficult to understand (अहवालातील इंग्रजी/वैज्ञानिक आकडे समजणे अवघड जाते)",
            "High testing cost or complicated procedure (खर्च जास्त किंवा पद्धत किचकट वाटते)",
            "Do not feel it makes any real difference to yield (माती परीक्षणाने उत्पादनात फरक पडतो असे वाटत नाही)",
            "Already tested my soil (मी आधीच परीक्षण केले आहे)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "How do you decide which crop to sow for the upcoming season? (पुढील हंगामात कोणते पीक घ्यायचे हे तुम्ही कसे ठरवता?)",
        [
            "Follow what majority of neighboring farmers are planting (शेजारील शेतकरी जे लावतात तेच पीक लावतो)",
            "Plant crops that had high market prices last season (मागील हंगामात ज्या पिकाला चांगला भाव मिळाला ते लावतो)",
            "Stick to traditional fixed crop rotation (पारंपरिक पिकेच वर्षानुवर्षे घेतो)",
            "Analyze my soil type, available water, and expected yield (मातीचा प्रकार, पाणी आणि अंदाजित नफा याचा विचार करून)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 5: WEATHER & SPRAY SCHEDULING
    # ==========================================
    add_section_header("SECTION 5: WEATHER UNCERTAINTY & SPRAY TIMING (हवामान व फवारणी नियोजन)")

    add_question(
        q_count,
        "Have you lost money because rain washed away an expensive chemical spray within hours of spraying? (औषध फवारल्यानंतर काही तासांतच पाऊस आल्याने औषध वाया गेले असा प्रसंग आला आहे का?)",
        [
            "Yes, frequently (2-3 times a year) (होय, वर्षातून २-३ वेळा असे घडते)",
            "Yes, once a year during monsoon (होय, पावसाळ्यात वर्षातून एकदा तरी घडते)",
            "Rarely, I check general weather signs (फार क्वचित घडते)",
            "No, never experienced this (कधीही नाही)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Do you currently get localized, reliable spray advisory (wind speed, rain probability) for your specific village? (तुमच्या गावासाठी फवारणीयोग्य वेळ व वाऱ्याचा वेग सांगणारा हवामान सल्ला मिळतो का?)",
        [
            "No, I only get generic district weather on TV/mobile (नाही, केवळ टीव्हीवर संपूर्ण जिल्ह्याचा सामान्य अंदाज मिळतो)",
            "I check default phone weather app, but it lacks farming advice (फोनमधील हवामान पाहतो, पण शेतीविषयक सल्ला नसतो)",
            "Rely entirely on traditional sky and wind observation (केवळ आकाशाचा अंदाज व वाऱ्याची दिशा पाहून ठरवतो)",
            "Yes, I receive reliable agricultural weather advisories (होय, अचूक कृषी हवामान सल्ला मिळतो)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 6: LANGUAGE, VOICE & TECHNOLOGY PREFERENCES
    # ==========================================
    add_section_header("SECTION 6: TECHNOLOGY, LANGUAGE & VOICE PREFERENCES (तंत्रज्ञान, भाषा व आवाज पसंती)")

    add_question(
        q_count,
        "In what format do you prefer receiving farming advisory on your phone? (मोबाईलवर शेती सल्ला कोणत्या स्वरूपात मिळणे सर्वात सोपे जाईल?)",
        [
            "Spoken Audio / Voice reading aloud in Marathi (मराठीत बोलून ऐकवणारा ऑडिओ आवाज)",
            "Simple text in Marathi with photos and icons (मराठीत सोपे शब्द, फोटो आणि चिन्हे)",
            "Speaking into the phone microphone instead of typing (टायपिंगऐवजी माईकमध्ये मराठीत बोलून प्रश्न विचारणे)",
            "Short video explanation (लहान व्हिडिओ क्लिप्स)"
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "What is your biggest hesitation when trying a new farming app on your phone? (मोबाईलमध्ये नवीन शेती ॲप वापरताना सर्वात मोठी अडचण कोणती वाटते?)",
        [
            "Too complicated with too many English words and confusing menus (खूप इंग्रजी शब्द आणि समजायला किचकट मेनू)",
            "Asks for too much typing and entering complex numbers (खूप टायपिंग आणि आकडे भरावे लागतात)",
            "Does not work when mobile internet is slow or unstable (इंटरनेट स्लो असताना चालत नाही)",
            "Fear of getting wrong advice that could ruin the crop (चुकीचा सल्ला मिळून पिकाचे नुकसान होण्याची भीती)",
            "No hesitation, eager to use practical tools (कोणतीही अडचण नाही, उपयुक्त साधन असल्यास वापरण्यास तयार)"
        ]
    )
    q_count += 1

    # ==========================================
    # SECTION 7: VALIDATING THE SOLUTION IDEA
    # ==========================================
    add_section_header("SECTION 7: SOLUTION VALIDATION & PRIORITIES (शेतकरी उपाय प्राधान्य व शिफारसी)")

    add_question(
        q_count,
        "Rank the MOST IMPORTANT feature that would make your farming significantly more profitable: (खालीलपैकी कोणते साधन उपलब्ध झाल्यास तुमचा नफा सर्वात जास्त वाढेल?)",
        [
            "Instant plant leaf disease diagnosis from photo with exact spray dosages (फोटोवरून ५ सेकंदात रोग व औषधाचा अचूक डोस सांगणे)",
            "Live APMC mandi prices and 7-day price forecasts across nearby markets (जवळच्या बाजार समित्यांचे थेट भाव व ७ दिवसांचा अंदाज)",
            "Soil-based best crop recommendations and expected harvest calculator (मातीनुसार सर्वाधिक उत्पादन देणारे पीक सुचवणे)",
            "24x7 Marathi voice assistant to answer any farming question instantly (कोणताही प्रश्न विचारल्यावर मराठीत बोलून उत्तर देणारा कृषी मित्र)",
            "Spray timing weather alerts (rain & wind advisory) (फवारणीसाठी सुरक्षित वेळ व हवामान सूचना)"
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Would you recommend such a free / low-cost digital farming helper to other farmers in your village? (असे सोपे व उपयुक्त साधन गावात इतर शेतकरी बांधवांना सुचवाल का?)",
        [
            "Yes, definitely — every farmer in the village needs this (होय नक्कीच, गावातील प्रत्येक शेतकऱ्याला याची गरज आहे)",
            "Yes, if I personally see good results on my farm (होय, आधी माझ्या शेतात चांगला फायदा दिसल्यास)",
            "Maybe, if someone in village demonstrates it first (कदाचित, आधी कोणीतरी वापरून दाखवल्यास)",
            "No (नाही)"
        ]
    )
    q_count += 1

    # Open Feedback Section
    add_section_header("OPEN FEEDBACK & SPECIFIC REGIONAL PROBLEMS (शेतकऱ्यांचे मनोगत व इतर अडचणी)")
    p_open = doc.add_paragraph()
    p_open.paragraph_format.space_before = Pt(6)
    p_open.paragraph_format.space_after = Pt(8)
    p_open.add_run(
        "Please describe any specific crop problem, market issue, or farming difficulty you faced recently that technology should solve:\n"
        "(अलीकडच्या काळात तुम्हाला पिकांबाबत, औषधांबाबत किंवा बाजारभावाबाबत आलेली एखादी मोठी अडचण खालील ओळींवर नोंदवावी:)\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n"
    )

    # Footer note
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.space_before = Pt(16)
    r_foot = p_foot.add_run("--- Thank you for your valuable time and contribution to empowering our farming community! ---")
    r_foot.font.size = Pt(10)
    r_foot.italic = True

    # Save document
    doc.save(filepath)
    print(f"[SUCCESS] Document successfully created at: {filepath}")

if __name__ == '__main__':
    target_path = "c:/CODING/AgriVision/Farmer_Problem_Survey_Questionnaire.docx"
    build_survey_document(target_path)
