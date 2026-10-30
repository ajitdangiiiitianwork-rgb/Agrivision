# create_trilingual_survey_doc.py
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def build_trilingual_survey(filepath):
    doc = docx.Document()

    # Set standard 1-inch margins
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Base styling - standard clean black text, no background colors
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Calibri'
    font.size = Pt(10.5)
    font.color.rgb = RGBColor(0, 0, 0)

    # Document Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(2)
    run_title = p_title.add_run("FARMER PROBLEM IDENTIFICATION & FIELD SURVEY")
    run_title.bold = True
    run_title.font.size = Pt(15)

    # Subtitle in Marathi & Hindi
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(12)
    run_sub = p_sub.add_run("शेतकरी समस्या ओळख व क्षेत्रीय सर्वेक्षण  |  किसान समस्या पहचान एवं क्षेत्रीय सर्वेक्षण\nNeeds Assessment on Crop Health, Market Prices, Soil Fertility, and Digital Advisory")
    run_sub.font.size = Pt(10)
    run_sub.italic = True

    # Purpose Statement (Trilingual)
    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(10)
    p_intro.add_run(
        "Purpose of Survey: This study collects ground-level feedback from farmers regarding difficulties with crop disease diagnosis, pesticide usage, mandi market rates, soil testing, and mobile assistance.\n"
        "उद्देश: हा सर्वेक्षण शेतकऱ्यांना पिकांवरील रोग, औषध फवारणी, बाजारभाव, माती परीक्षण आणि मोबाईल तंत्रज्ञानातील अडचणी समजून घेण्यासाठी आहे.\n"
        "उद्देश्य: यह सर्वेक्षण किसानों को फसल रोग, कीटनाशक छिड़काव, मंडी भाव, मिट्टी जांच और मोबाइल सहायता से जुड़ी जमीनी समस्याओं को समझने के लिए है।"
    )

    # Metadata Block
    p_meta = doc.add_paragraph()
    p_meta.paragraph_format.space_after = Pt(12)
    p_meta.add_run("Date / दिनांक: ___________________________        Surveyor / सर्वेक्षक नाव / नाम: ___________________________________\n")
    p_meta.add_run("Village / गाव / गाँव: _______________________      Taluka / तहसील: _________________  District / जिल्हा / जिला: _____________\n")
    p_meta.add_run("Farmer Name / नाव / नाम (Optional): _________________________   Contact / फोन (Optional): _________________________")

    def add_section_header(title_en, title_mr, title_hi):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(f"{title_en}\n({title_mr}  |  {title_hi})")
        r.bold = True
        r.font.size = Pt(11.5)

    def add_question(q_num, q_en, q_mr, q_hi, options, is_multiselect=False):
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(7)
        p_q.paragraph_format.space_after = Pt(2)
        tag = " [Select all that apply / लागू असलेले सर्व निवडा / लागू सभी चुनें]" if is_multiselect else " [Select one / एक पर्याय निवडा / एक चुनें]"
        
        r_q1 = p_q.add_run(f"Q{q_num}. {q_en}{tag}\n")
        r_q1.bold = True
        r_q2 = p_q.add_run(f"   (MR: {q_mr})\n   (HI: {q_hi})")
        r_q2.italic = True
        r_q2.font.size = Pt(9.5)

        for opt_en, opt_mr, opt_hi in options:
            p_opt = doc.add_paragraph()
            p_opt.paragraph_format.left_indent = Inches(0.2)
            p_opt.paragraph_format.space_before = Pt(1)
            p_opt.paragraph_format.space_after = Pt(2)
            p_opt.add_run(f"[   ]  {opt_en}  /  {opt_mr}  /  {opt_hi}")

    q_count = 1

    # =========================================================
    # SECTION 1: FARMER & LAND PROFILE
    # =========================================================
    add_section_header(
        "SECTION 1: FARMER & LAND PROFILE",
        "शेतकरी व जमिनीची प्राथमिक माहिती",
        "किसान एवं भूमि की बुनियादी जानकारी"
    )

    add_question(
        q_count,
        "What is the total size of your agricultural land?",
        "तुमचे एकूण शेती क्षेत्र किती आहे?",
        "आपकी कुल कृषि भूमि का आकार कितना है?",
        [
            ("Marginal: Less than 1 Acre", "१ एकरापेक्षा कमी", "१ एकड़ से कम"),
            ("Small: 1 to 2.5 Acres", "१ ते २.५ एकर", "१ से २.५ एकड़"),
            ("Medium: 2.5 to 5 Acres", "२.५ ते ५ एकर", "२.५ से ५ एकड़"),
            ("Large: More than 5 Acres", "५ एकरांपेक्षा जास्त", "५ एकड़ से अधिक")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What is your primary source of irrigation?",
        "शेतीसाठी पाण्याचा मुख्य स्रोत कोणता?",
        "खेती के लिए पानी का मुख्य स्रोत क्या है?",
        [
            ("Canal / River lift irrigation", "नहर / नदी पाणी", "नहर / नदी का पानी"),
            ("Open Well / Borewell", "विहीर / बोअरवेल", "कुआं / बोरवेल"),
            ("Rainfed / Dryland farming only", "केवळ पावसाचे पाणी / कोरडवाहू", "केवल बारिश का पानी / असिंचित"),
            ("Farm Pond / Water Tank", "शेततळे / साठवणूक तलाव", "खेत तालाब / जल संग्रहण")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Which major crops do you cultivate?",
        "तुम्ही कोणती मुख्य पिके घेता?",
        "आप मुख्य रूप से कौन सी फसलें उगाते हैं?",
        [
            ("Vegetables (Tomato, Onion, Potato, Chilli)", "भाजीपाला (टोमॅटो, कांदा, बटाटा, मिरची)", "सब्जियां (टमाटर, प्याज, आलू, मिर्च)"),
            ("Oilseeds & Pulses (Soybean, Gram, Tur)", "तेलबिया व डाळी (सोयाबीन, हरभरा, तूर)", "तिलहन व दलहन (सोयाबीन, चना, अरहर)"),
            ("Cereals (Wheat, Bajra, Maize, Rice)", "अन्नधान्य (गहू, बाजरी, मका, भात)", "अनाज (गेहूं, बाजरा, मक्का, धान)"),
            ("Cash Crops (Sugarcane, Cotton)", "रोख पिके (ऊस, कापूस)", "नकदी फसलें (गन्ना, कपास)"),
            ("Fruit Orchards (Pomegranate, Figs, Grapes)", "फळबागा (डाळिंब, अंजीर, द्राक्ष, सीताफळ)", "बागवानी (अनार, अंजीर, अंगूर, शरीफा)")
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "What kind of phone do you currently use?",
        "तुम्ही सध्या कोणता फोन वापरता?",
        "वर्तमान में आप किस प्रकार का फोन उपयोग करते हैं?",
        [
            ("Android Smartphone with active internet", "इंटरनेट असलेला स्मार्टफोन", "इंटरनेट युक्त स्मार्टफोन"),
            ("Android Smartphone without regular data plan", "नेहमी डेटा नसलेला स्मार्टफोन", "स्मार्टफोन (नियमित इंटरनेट नहीं)"),
            ("Basic Keypad / Feature Phone", "साधा कीपॅड फोन", "साधारण कीपैड फोन"),
            ("Family member owns a smartphone", "घरातील इतर व्यक्तीकडे स्मार्टफोन आहे", "परिवार के अन्य सदस्य के पास स्मार्टफोन है")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 2: CROP HEALTH & PEST PROBLEMS
    # =========================================================
    add_section_header(
        "SECTION 2: CROP DISEASES & PEST CONTROL PROBLEMS",
        "पिकांवरील कीड व रोग समस्या",
        "फसल रोग एवं कीट नियंत्रण समस्याएं"
    )

    add_question(
        q_count,
        "How much crop yield/income do you lose annually due to pests and leaf diseases?",
        "कीड व रोगांमुळे तुमचे दरवर्षी किती नुकसान होते?",
        "कीट व रोगों के कारण आपका प्रतिवर्ष कितना नुकसान होता है?",
        [
            ("Severe Loss: More than 30% of total harvest", "३०% पेक्षा जास्त मोठे नुकसान", "३०% से अधिक भारी नुकसान"),
            ("Moderate Loss: 15% to 30% of harvest", "१५% ते ३०% नुकसान", "१५% से ३०% नुकसान"),
            ("Mild Loss: Less than 15% of harvest", "१५% पेक्षा कमी नुकसान", "१५% से कम नुकसान"),
            ("Negligible loss", "फारसे नुकसान नाही", "नगण्य / कोई खास नुकसान नहीं")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "When leaves show spots, curling, or pest damage, how do you diagnose the disease?",
        "पानांवर डाग किंवा कीड दिसल्यास तुम्ही रोगाचे निदान कसे करता?",
        "पत्तियों पर धब्बे या कीट दिखने पर आप बीमारी की पहचान कैसे करते हैं?",
        [
            ("Take leaf sample to local agro-chemical / krushi-seva shop", "कृषी केंद्रात पान दाखवून विचारतो", "कीटनाशक विक्रेता को पत्ता दिखाकर पूछते हैं"),
            ("Ask experienced neighboring farmers", "शेजारील अनुभवी शेतकऱ्यांना विचारतो", "पड़ोसी अनुभवी किसानों से सलाह लेते हैं"),
            ("Guess based on past experience and spray old chemicals", "जुने औषध स्वतःच्या अंदाजाने फवारतो", "अपने पुराने अनुभव से अंदाजे से दवा डालते हैं"),
            ("Contact government agricultural officer / KVK scientist", "कृषी अधिकारी किंवा KVK शास्त्रज्ञांशी संपर्क करतो", "कृषि अधिकारी या KVK वैज्ञानिक से संपर्क करते हैं"),
            ("Wait until damage becomes severe before acting", "नुकसान जास्त होईपर्यंत वाट पाहतो", "नुकसान अधिक होने तक इंतजार करते हैं")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What major problems do you face when buying pesticides from shops?",
        "कृषी केंद्रातून कीटकनाशके घेताना कोणत्या अडचणी येतात?",
        "दुकान से कीटनाशक खरीदते समय कौन सी परेशानियां आती हैं?",
        [
            ("Sold expensive chemicals that do not cure actual disease", "रोग न ओळखता महागडी औषधे दिली जातात", "बीमारी जाने बिना महंगी दवा थमा दी जाती है"),
            ("Forced bundling of unnecessary tonics & growth boosters", "गरज नसताना टॉनिक व अतिरिक्त औषधे दिली जातात", "अनावश्यक टॉनिक और अतिरिक्त उत्पाद जबरन दिए जाते हैं"),
            ("No clear dosage guidance for standard 15-liter spray pump", "१५ लिटर पंपासाठी अचूक प्रमाण सांगितले जात नाही", "१५ लीटर पंप के लिए सही डोज स्पष्ट नहीं बताई जाती"),
            ("Ineffective, counterfeit, or low-quality chemicals", "हलक्या प्रतीची अथवा निष्प्रभ औषधे मिळतात", "कम गुणवत्ता वाली या नकली दवाएं मिल जाती हैं"),
            ("No issue, fully satisfied with local shop", "कोणतीही अडचण नाही", "कोई परेशानी नहीं, संतुष्ट हैं")
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "Have you ever faced crop damage due to wrong chemical mixtures or overdosing?",
        "चुकीच्या फवारणीमुळे किंवा चुकीच्या प्रमाणामुळे कधी पिकाचे नुकसान झाले आहे का?",
        "क्या कभी गलत दवा मिलाने या ज्यादा डोज से फसल झुलसने का नुकसान हुआ है?",
        [
            ("Yes, multiple times", "होय, अनेक वेळा नुकसान झाले आहे", "हाँ, कई बार नुकसान हुआ है"),
            ("Yes, once or twice in the past", "होय, एक-दोन वेळा झाले आहे", "हाँ, एक-दो बार ऐसा हुआ है"),
            ("No, never experienced crop burn or leaf drop", "नाही, असा प्रसंग कधी आला नाही", "नहीं, ऐसा कभी नहीं हुआ"),
            ("Not sure if damage was from disease or wrong spray", "रोग की औषधामुळे नुकसान झाले हे समजले नाही", "स्पष्ट नहीं कि नुकसान बीमारी से हुआ या दवा से")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "If a phone tool could diagnose disease from a leaf photo and give exact pump dosages, would you use it?",
        "कॅमेऱ्याने पानाचा फोटो काढून रोग व अचूक डोस सांगणारे साधन वापरण्यास इच्छुक आहात का?",
        "यदि फोन कैमरे से पत्ती का फोटो देखकर रोग और सटीक डोज बताई जाए, तो क्या उपयोग करेंगे?",
        [
            ("Yes, definitely — it will save heavy crop loss and money", "होय नक्कीच, पैसे व पीक वाचेल", "हाँ बिल्कुल, इससे फसल और पैसे की बचत होगी"),
            ("Yes, provided it explains clearly in my regional language", "होय, जर माहिती मराठी/हिंदीत सोपी असेल तर", "हाँ, यदि मेरी स्थानीय भाषा में आसान सलाह मिले"),
            ("Maybe, if someone trains me how to click clear photos", "कदाचित, फोटो काढण्याची पद्धत शिकवल्यास", "शायद, यदि कोई स्पष्ट फोटो खींचना सिखाए"),
            ("No, I only trust physical agricultural shopkeeper", "नाही, मी केवळ स्थानिक दुकानदारावर विश्वास ठेवतो", "नहीं, मैं केवल स्थानीय विक्रेता पर भरोसा करता हूँ")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 3: MARKET PRICES & MANDI SELLING
    # =========================================================
    add_section_header(
        "SECTION 3: MARKET PRICES, MANDIS & SELLING DECISIONS",
        "बाजारभाव व विक्रीतील अडचणी",
        "मंडी भाव एवं फसल बिक्री की समस्याएं"
    )

    add_question(
        q_count,
        "How do you currently find daily market prices before harvesting or taking produce to mandi?",
        "माल बाजारात नेण्यापूर्वी तुम्हाला आजचे बाजारभाव कसे समजतात?",
        "मंडी में फसल ले जाने से पहले आपको दैनिक भाव कैसे पता चलते हैं?",
        [
            ("Phone call to local commission agent / middleman (Aadtya)", "दलाल / आडत्याला फोन करून विचारतो", "स्थानीय दलाल / आढ़ती को फोन करके"),
            ("Word of mouth from neighboring farmers who visited mandi", "बाजारातून परत आलेल्या शेतकऱ्यांना विचारून", "मंडी से लौटे साथी किसानों से सुनकर"),
            ("Delayed newspaper reports (next day rates)", "वृत्तपत्रातील आदल्या दिवसाचे दर वाचून", "अखबार में छपे पिछले दिन के पुराने भाव से"),
            ("Take produce directly to mandi without knowing rate in advance", "दर माहीत नसतानाही माल बाजारात नेतो", "बिना भाव जाने सीधे मंडी में माल ले जाते हैं"),
            ("WhatsApp groups or social media updates", "व्हॉट्सॲप अथवा सोशल मीडियावरून", "व्हाट्सएप ग्रुप या सोशल मीडिया से")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "What is your biggest frustration when selling produce in agricultural mandis (APMCs)?",
        "बाजार समितीत (APMC) माल विकताना सर्वात मोठा त्रास कोणता होतो?",
        "कृषि मंडी (APMC) में माल बेचते समय सबसे बड़ी परेशानी क्या होती है?",
        [
            ("Sudden price crash after reaching the market yard", "बाजारात पोहोचल्यावर अचानक भाव पाडले जातात", "मंडी प्रांगण में पहुँचते ही अचानक भाव गिर जाना"),
            ("High commission cuts, arbitrary weighment deductions", "जास्त आडत, वजनकाटा व हमाली कपात", "अत्यधिक आढ़त व वजन में मनमानी कटौती"),
            ("Price difference across nearby mandis is unknown in real-time", "जवळच्या इतर बाजारातील भाव वेळेवर समजत नाहीत", "आस-पास की अन्य मंडियों के भाव का तुरंत पता न होना"),
            ("High transportation costs force selling at whatever rate is offered", "वाहतूक खर्चामुळे मिळेल त्या भावात विकावे लागते", "परिवहन खर्च अधिक होने से मजबूरी में कम भाव पर बेचना"),
            ("Lack of cold storage to hold produce when prices collapse", "दर पडल्यावर माल साठवण्यासाठी गोदाम नाही", "भाव गिरने पर माल सुरक्षित रखने के लिए गोदाम न होना")
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "Have you ever sold your harvest at a loss because you could not forecast upcoming price trends?",
        "पुढील आठवड्यात भाव वाढतील की नाही हे न समजल्यामुळे तोट्यात विक्री करावी लागली आहे का?",
        "क्या कभी आने वाले दिनों के भाव का अंदाजा न होने से मजबूरी में घाटे में फसल बेची है?",
        [
            ("Yes, happens almost every season", "होय, जवळपास प्रत्येक हंगामात असे घडते", "हाँ, लगभग हर सीजन में ऐसा होता है"),
            ("Yes, occasionally during peak harvest glut", "होय, काढणीच्या हंगामात कधीकधी घडते", "हाँ, मुख्य आवक के समय कभी-कभार"),
            ("Rarely, I manage to sell at break-even", "फार क्वचित, नुकसान टळते", "बहुत कम, लागत निकल आती है"),
            ("No, I always receive satisfactory market prices", "नाही, समाधानकारक भाव मिळतो", "नहीं, हमेशा संतोषजनक भाव मिल जाता है")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Would a 7-day price forecast and multi-mandi comparison tool help you earn more?",
        "पुढील ७ दिवसांचा भाव अंदाज व सर्व बाजारांचे भाव एकत्र दिसल्यास फायदा होईल का?",
        "क्या ७ दिन का भाव अनुमान और सभी आस-पास की मंडियों की तुलना से लाभ होगा?",
        [
            ("Extremely helpful — can select the best mandi and time sales", "अत्यंत उपयुक्त — योग्य बाजार निवडता येईल", "अत्यंत उपयोगी — सही मंडी और सही दिन चुना जा सकेगा"),
            ("Somewhat helpful for planning harvest schedule", "काढणीचे नियोजन करण्यासाठी काही प्रमाणात उपयुक्त", "फसल तुड़ाई की योजना बनाने में कुछ मददगार"),
            ("Only helpful if small rural collection centers are included", "स्थानिक उपबाजारांचे भाव असतील तरच उपयुक्त", "तभी उपयोगी जब स्थानीय ग्रामीण उप-मंडी भी शामिल हो"),
            ("Not helpful, prices depend purely on luck", "उपयुक्त नाही, भाव केवळ नशिबावर अवलंबून असतात", "उपयोगी नहीं, भाव पूरी तरह किस्मत पर निर्भर हैं")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 4: SOIL TESTING & CROP SELECTION
    # =========================================================
    add_section_header(
        "SECTION 4: SOIL FERTILITY & CROP PLANNING",
        "माती परीक्षण व पीक नियोजन",
        "मिट्टी जांच एवं फसल चयन"
    )

    add_question(
        q_count,
        "Have you tested your soil in an authorized laboratory within the last 3 years?",
        "गेल्या ३ वर्षात तुम्ही अधिकृत माती परीक्षण केले आहे का?",
        "क्या पिछले ३ वर्षों में आपने किसी अधिकृत प्रयोगशाला से मिट्टी जांच कराई है?",
        [
            ("Yes, regular soil health card available", "होय, नियमित माती परीक्षण करतो व अहवाल आहे", "हाँ, नियमित मिट्टी जांच कराते हैं और कार्ड है"),
            ("Tested once long ago, but not recently", "पूर्वी एकदा केले होते, पण अलीकडे नाही", "पहले कभी एक बार कराई थी, हाल में नहीं"),
            ("Never tested my farm soil", "कधीही माती परीक्षण केलेले नाही", "कभी भी मिट्टी जांच नहीं कराई"),
            ("Do not know where nearest testing facility is located", "जवळची लॅब कुठे आहे माहीत नाही", "नहीं पता कि पास की जांच प्रयोगशाला कहाँ है")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "If you have NOT tested your soil, what is the primary reason?",
        "माती परीक्षण न करण्याचे मुख्य कारण काय आहे?",
        "यदि आपने मिट्टी जांच नहीं कराई है, तो इसका मुख्य कारण क्या है?",
        [
            ("Lab is too far away and reports take weeks to arrive", "लॅब खूप लांब आहे व अहवाल उशिरा मिळतो", "प्रयोगशाला बहुत दूर है और रिपोर्ट में हफ्तों लगते हैं"),
            ("Report numbers (pH, NPK) are too scientific and hard to understand", "अहवालातील वैज्ञानिक आकडे समजणे अवघड जाते", "रिपोर्ट के वैज्ञानिक आंकड़े (pH, NPK) समझना कठिन है"),
            ("High testing fees or complicated sampling procedure", "खर्च जास्त किंवा सॅम्पलिंग पद्धत किचकट वाटते", "जांच शुल्क अधिक है या प्रक्रिया जटिल लगती है"),
            ("Do not believe it creates any meaningful yield difference", "उत्पादनात काही फरक पडतो असे वाटत नाही", "नहीं लगता कि इससे पैदावार में कोई वास्तविक लाभ होगा"),
            ("Already tested soil recently", "आधीच परीक्षण केले आहे", "हाल ही में मिट्टी जांच करा चुके हैं")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "How do you currently decide which crop to plant for the upcoming season?",
        "पुढील हंगामात कोणते पीक घ्यायचे हे तुम्ही कसे ठरवता?",
        "अगले मौसम के लिए आप कौन सी फसल बोने का निर्णय कैसे लेते हैं?",
        [
            ("Follow whatever majority of neighboring farmers are planting", "शेजारील शेतकरी जे लावतात तेच पीक लावतो", "जो अधिकांश पड़ोसी किसान बोते हैं, वही बोते हैं"),
            ("Plant crops that fetched very high market rates last season", "मागील हंगामात ज्या पिकाला जास्त भाव मिळाला ते लावतो", "जिस फसल का पिछले साल अधिक भाव था, वही चुनते हैं"),
            ("Stick strictly to traditional fixed crop routines", "पारंपरिक पिकेच वर्षानुवर्षे घेतो", "पीढ़ियों से चली आ रही पारंपरिक फसल ही बोते हैं"),
            ("Scientifically evaluate soil type, available water, and expected yield", "माती, पाणी आणि नफा याचा विचार करून ठरवतो", "मिट्टी, उपलब्ध पानी व अपेक्षित मुनाफे का आकलन करके")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 5: WEATHER UNCERTAINTY & SPRAY TIMING
    # =========================================================
    add_section_header(
        "SECTION 5: WEATHER UNCERTAINTY & SPRAY TIMING",
        "हवामान व फवारणी नियोजन",
        "मौसम अनिश्चितता एवं छिड़काव समय"
    )

    add_question(
        q_count,
        "Have you lost money due to sudden rain washing away expensive chemical sprays within hours?",
        "फवारणीनंतर पाऊस आल्याने औषध वाया गेले असा प्रसंग आला आहे का?",
        "क्या कभी छिड़काव के तुरंत बाद बारिश होने से महंगी कीटनाशक दवा बहने का नुकसान हुआ है?",
        [
            ("Yes, frequently (2 to 3 times every year)", "होय, वर्षातून २-३ वेळा असे घडते", "हाँ, साल में २ से ३ बार ऐसा भारी नुकसान होता है"),
            ("Yes, at least once a year during monsoon", "होय, पावसाळ्यात वर्षातून एकदा तरी घडते", "हाँ, बारिश के मौसम में साल में एकाध बार"),
            ("Rarely, I monitor general weather signs", "फार क्वचित, ढगांचा अंदाज घेतो", "शायद ही कभी, आसमान देखकर छिड़काव करते हैं"),
            ("No, never experienced this issue", "नाही, असा प्रसंग कधी आला नाही", "नहीं, कभी ऐसा नुकसान नहीं हुआ")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Do you currently receive reliable village-level weather advisories (wind speed, spray windows)?",
        "तुमच्या गावासाठी फवारणीयोग्य वेळ व वाऱ्याचा वेग सांगणारा अचूक सल्ला मिळतो का?",
        "क्या आपको अपने गाँव के लिए हवा की गति व सुरक्षित छिड़काव समय की सटीक मौसम सलाह मिलती है?",
        [
            ("No, only generic district-wide weather forecasts on TV/radio", "नाही, टीव्हीवर केवळ जिल्ह्याचा सामान्य अंदाज मिळतो", "नहीं, केवल टीवी/रेडियो पर जिले का सामान्य अनुमान मिलता है"),
            ("Check default smartphone weather app, but it lacks farming advice", "फोनमध्ये हवामान पाहतो, पण शेतीविषयक सल्ला नसतो", "फोन का मौसम देखते हैं, पर खेती की सलाह नहीं होती"),
            ("Rely completely on traditional sky, wind, and cloud observation", "केवळ आकाशाचा अंदाज व वाऱ्याची दिशा पाहून ठरवतो", "पूरी तरह बादलों और हवा के पारंपरिक ज्ञान पर निर्भर हैं"),
            ("Yes, I receive reliable agricultural weather guidance", "होय, अचूक कृषी हवामान सल्ला मिळतो", "हाँ, सटीक कृषि मौसम परामर्श मिलता है")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 6: LANGUAGE & VOICE PREFERENCES
    # =========================================================
    add_section_header(
        "SECTION 6: TECHNOLOGY, LANGUAGE & VOICE PREFERENCES",
        "तंत्रज्ञान, भाषा व आवाज पसंती",
        "तकनीक, भाषा एवं वॉइस प्राथमिकताएं"
    )

    add_question(
        q_count,
        "In what format do you find it easiest to understand farming guidance on your phone?",
        "मोबाईलवर शेती सल्ला कोणत्या स्वरूपात मिळणे सर्वात सोपे जाईल?",
        "मोबाइल पर खेती की सलाह किस रूप में पाना आपके लिए सबसे आसान है?",
        [
            ("Spoken voice audio reading aloud in my regional language (Marathi / Hindi)", "माझ्या भाषेत बोलून ऐकवणारा ऑडिओ आवाज", "मेरी भाषा में बोलकर सुनाने वाला ऑडियो"),
            ("Simple regional text accompanied by photos and clear visual icons", "मराठी/हिंदीत सोपे शब्द, फोटो आणि चिन्हे", "सरल स्थानीय भाषा में शब्द, फोटो व स्पष्ट चिह्न"),
            ("Speaking into phone microphone instead of typing long questions", "टायपिंगऐवजी माईकमध्ये बोलून प्रश्न विचारणे", "टाइप करने के बजाय माइक में बोलकर प्रश्न पूछना"),
            ("Short illustrated video demonstrations", "लहान प्रात्यक्षिक व्हिडिओ", "छोटे वीडियो संदेश")
        ],
        is_multiselect=True
    )
    q_count += 1

    add_question(
        q_count,
        "What is your biggest hesitation when using a new farming mobile app?",
        "मोबाईल ॲप वापरताना सर्वात मोठी अडचण कोणती वाटते?",
        "खेती से जुड़ा नया मोबाइल ऐप इस्तेमाल करते समय सबसे बड़ी झिझक क्या होती है?",
        [
            ("Too complicated with English words, technical terms, and complex menus", "खूप इंग्रजी शब्द आणि समजायला किचकट मेनू", "अंग्रेजी के कठिन शब्द व उलझन भरे मेनू"),
            ("Requires too much manual typing and entering numeric scientific data", "खूप टायपिंग व आकडे भरावे लागतात", "बहुत ज्यादा टाइपिंग व आंकड़े दर्ज करने का झंझट"),
            ("App crashes or fails when mobile internet connection is slow", "इंटरनेट स्लो असताना ॲप चालत नाही", "धीमे इंटरनेट पर ऐप का बंद या अटक जाना"),
            ("Fear of receiving wrong advice that damages crop investment", "चुकीचा सल्ला मिळून पिकाचे नुकसान होण्याची भीती", "गलत सलाह मिलने से फसल खराब होने का डर"),
            ("No hesitation, eager to adopt helpful farming technology", "कोणतीही अडचण नाही, वापरण्यास उत्सुक आहे", "कोई झिझक नहीं, उपयोगी टूल अपनाने को तैयार")
        ]
    )
    q_count += 1

    # =========================================================
    # SECTION 7: SOLUTION VALIDATION
    # =========================================================
    add_section_header(
        "SECTION 7: SOLUTION VALIDATION & PRIORITIES",
        "उपाय प्राधान्य व शिफारसी",
        "समाधान प्राथमिकता एवं स्वीकार्यता"
    )

    add_question(
        q_count,
        "Which SINGLE feature would provide the greatest financial benefit to your farm?",
        "खालीलपैकी कोणते साधन उपलब्ध झाल्यास तुमचा नफा सर्वात जास्त वाढेल?",
        "निम्न में से कौन सा एक फीचर आपके खेत के मुनाफे को सबसे ज्यादा बढ़ा सकता है?",
        [
            ("Instant plant disease diagnosis from leaf photo with exact chemical/organic dosages", "फोटोवरून रोग व औषधाचा अचूक डोस सांगणे", "पत्ती के फोटो से तुरंत बीमारी व सही दवा/डोज बताना"),
            ("Live APMC mandi prices and 7-day forward price trend forecasts", "बाजार समित्यांचे थेट भाव व ७ दिवसांचा अंदाज", "मंडी के लाइव भाव और आगामी ७ दिन का मूल्य अनुमान"),
            ("Soil-based crop yield recommendation and harvest calculator", "मातीनुसार सर्वाधिक उत्पादन देणारे पीक सुचवणे", "मिट्टी अनुसार सबसे बेहतर फसल व पैदावार कैलकुलेटर"),
            ("24x7 voice assistant answering farming questions in regional language", "कोणताही प्रश्न विचारल्यावर बोलून उत्तर देणारा कृषी मित्र", "२४x७ बोलकर जवाब देने वाला डिजिटल कृषि मित्र"),
            ("Weather spray window alerts to prevent chemical waste", "फवारणीसाठी सुरक्षित वेळ व हवामान सूचना", "दवा बहने से बचाने वाली मौसम व छिड़काव सूचना")
        ]
    )
    q_count += 1

    add_question(
        q_count,
        "Would you recommend such an easy-to-use digital farming tool to fellow farmers in your village?",
        "असे सोपे व उपयुक्त साधन गावातील इतर शेतकरी बांधवांना सुचवाल का?",
        "क्या आप ऐसा आसान कृषि टूल अपने गाँव के अन्य किसान भाइयों को इस्तेमाल करने की सलाह देंगे?",
        [
            ("Yes, definitely — every farmer in our village needs this", "होय नक्कीच, गावातील प्रत्येक शेतकऱ्याला गरज आहे", "हाँ अवश्य, गाँव के हर किसान को इसकी जरूरत है"),
            ("Yes, once I personally see good results on my own fields", "होय, आधी माझ्या शेतात चांगला फायदा दिसल्यास", "हाँ, पहले अपने खेत में सकारात्मक परिणाम देखने के बाद"),
            ("Maybe, if a village demonstration is organized first", "कदाचित, आधी गावात कोणीतरी प्रात्यक्षिक दाखवल्यास", "शायद, यदि पहले गाँव में इसका कोई प्रदर्शन करके दिखाए"),
            ("No, I prefer traditional farming without digital tools", "नाही, मला पारंपरिक पद्धतच योग्य वाटते", "नहीं, मैं बिना डिजिटल साधनों की पारंपरिक खेती पसंद करता हूँ")
        ]
    )
    q_count += 1

    # Open Feedback Section
    add_section_header(
        "OPEN FEEDBACK & REGIONAL ISSUES",
        "शेतकऱ्यांचे मनोगत व इतर अडचणी",
        "किसानों के अन्य सुझाव एवं क्षेत्रीय समस्याएं"
    )
    
    p_open = doc.add_paragraph()
    p_open.paragraph_format.space_before = Pt(6)
    p_open.paragraph_format.space_after = Pt(8)
    p_open.add_run(
        "Please describe any specific agricultural difficulty, pesticide issue, or mandi selling problem you faced recently:\n"
        "(अलीकडच्या काळात तुम्हाला पिकांबाबत, औषध फवारणीबाबत किंवा बाजारभावाबाबत आलेली एखादी मोठी अडचण खालील ओळींवर नोंदवावी:)\n"
        "(हाल के समय में आपको फसलों, कीटनाशक छिड़काव अथवा मंडी में माल बेचने से जुड़ी कोई बड़ी समस्या आई हो तो यहाँ लिखें:)\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n\n"
        "_____________________________________________________________________________________________________\n"
    )

    # Footer
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.space_before = Pt(16)
    r_foot = p_foot.add_run(
        "--- Thank you for your valuable time and contribution to empowering our farming community! ---\n"
        "--- शेतकरी बांधवांना सक्षम करण्यासाठी वेळ दिल्याबद्दल मनःपूर्वक धन्यवाद! ---\n"
        "--- किसान भाइयों के सशक्तिकरण में अपना अमूल्य समय देने के लिए बहुत-बहुत धन्यवाद! ---"
    )
    r_foot.font.size = Pt(9.5)
    r_foot.italic = True

    # Save
    doc.save(filepath)
    print(f"[SUCCESS] Trilingual survey successfully generated at: {filepath}")

if __name__ == '__main__':
    target = "c:/CODING/AgriVision/Farmer_Problem_Survey_Questionnaire.docx"
    build_trilingual_survey(target)
