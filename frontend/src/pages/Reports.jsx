// src/pages/Reports.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Download,
  ExternalLink,
  Layers,
  TrendingUp,
  BarChart3,
  Network,
  GitBranch,
  Boxes,
  Workflow,
  Sparkles
} from "lucide-react";

export default function Reports() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("hi") ? "hi" : i18n.language?.startsWith("mr") ? "mr" : "en";
  const isHi = currentLang === "hi";
  const isMr = currentLang === "mr";

  const [activeUmlTab, setActiveUmlTab] = useState("usecase");
  const [activeJmeterTab, setActiveJmeterTab] = useState("view_tree");

  const reports = [
    {
      id: "srs",
      titleHi: "सॉफ्टवेयर आवश्यकता विशिष्टता (SRS) दस्तावेज (.docx)",
      titleMr: "सॉफ्टवेअर आवश्यकता तपशील (SRS) दस्तऐवज (.docx)",
      titleEn: "Software Requirements Specification (SRS) Document (.docx)",
      descHi: "IEEE Std 830-1998 मानक अनुसार 4 एम्बेडेड UML आरेखों सहित पूर्ण औपचारिक SRS दस्तावेज।",
      descMr: "IEEE 830 मानांकानुसार ४ एम्बेड केलेल्या UML आकृत्यांसह संपूर्ण औपचारिक SRS दस्तऐवज.",
      descEn: "IEEE Std 830-1998 compliant full specification document embedding all 4 UML diagrams.",
      icon: <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: "IEEE 830 Word DOCX",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      downloadUrl: "/docs/AgriVision_Software_Requirements_Specification_SRS.docx",
      downloadText: isHi ? "SRS (Word) डाउनलोड करें" : isMr ? "SRS (DOCX) डाउनलोड करा" : "Download SRS (.docx)"
    },
    {
      id: "ml_guide",
      titleHi: "मशीन लर्निंग मॉडल्स एवं आर्किटेक्चर गाइड (.docx)",
      titleMr: "मशिन लर्निंग मॉडेल्स व आर्किटेक्चर मार्गदर्शक (.docx)",
      titleEn: "Machine Learning Models & Functioning Guide (.docx)",
      descHi: "EfficientNet-B0 सीएनएन, XGBoost रिग्रेसर, मंडी फोरकास्टर व जेमिनी एलएलएम की विस्तृत कार्यप्रणाली।",
      descMr: "EfficientNet-B0 CNN, XGBoost रिग्रेसर, बाजारभाव अंदाज व Gemini AI सविस्तर कार्यपद्धती.",
      descEn: "In-depth technical functioning of EfficientNet-B0 CNN, XGBoost, Mandi Forecaster & Gemini LLM.",
      icon: <Boxes className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      badge: "ML Architecture DOCX",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
      downloadUrl: "/docs/AgriVision_ML_Models_and_Architecture_Guide.docx",
      downloadText: isHi ? "ML गाइड डाउनलोड करें" : isMr ? "ML गाईड डाउनलोड करा" : "Download ML Guide"
    },
    {
      id: "testing_report",
      titleHi: "सॉफ्टवेयर टेस्टिंग एवं क्वालिटी रिपोर्ट (.docx)",
      titleMr: "सॉफ्टवेअर टेस्टिंग व दर्जा अहवाल (.docx)",
      titleEn: "Software Testing & Quality Assurance Report (.docx)",
      descHi: "यूनिट टेस्टिंग, इंटीग्रेशन, व्हाइट बॉक्स, ब्लैक बॉक्स एवं 3,500 रिक्वेस्ट JMeter परिणामों का विवरण।",
      descMr: "युनिट, इंटिग्रेशन, व्हाईट बॉक्स, ब्लॅक बॉक्स चाचण्या आणि ३,५०० JMeter निकालांचे सविस्तर विश्लेषण.",
      descEn: "Comprehensive results: Unit, Integration, White-Box, Black-Box & 3,500 request JMeter stress tests.",
      icon: <Workflow className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      badge: "Testing Report DOCX",
      badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300",
      downloadUrl: "/docs/AgriVision_Software_Testing_and_Quality_Report.docx",
      downloadText: isHi ? "टेस्टिंग रिपोर्ट डाउनलोड करें" : isMr ? "चाचणी अहवाल डाउनलोड करा" : "Download Test Report"
    },
    {
      id: "survey",
      titleHi: "त्रैभाषिक किसान फील्ड सर्वेक्षण प्रश्नावली (.docx)",
      titleMr: "त्रिभाषिक शेतकरी फील्ड प्रश्नावली (.docx)",
      titleEn: "Trilingual Farmer Field Survey Questionnaire (.docx)",
      descHi: "हिंदी, अंग्रेजी और मराठी में चेकबॉक्स सहित 10 बहुविकल्पीय फील्ड प्रश्न।",
      descMr: "मराठी, हिंदी व इंग्रजीत शेतकरी समस्या जाणून घेणारी चेकबॉक्स प्रश्नावली.",
      descEn: "10 multiple choice field survey questions with checkboxes in 3 languages.",
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      badge: "Word DOCX",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
      downloadUrl: "/docs/Farmer_Problem_Survey_Questionnaire_Trilingual.docx",
      downloadText: isHi ? "Word फ़ाइल डाउनलोड करें" : isMr ? "DOCX फाईल डाउनलोड" : "Download DOCX"
    },
    {
      id: "deck",
      titleHi: "AgriVision प्रोजेक्ट प्रेजेंटेशन डेक (.pptx)",
      titleMr: "AgriVision प्रकल्प सादरीकरण डेक (.pptx)",
      titleEn: "AgriVision Project Pitch Deck (.pptx)",
      descHi: "किसान पर्सोना, फील्ड इंटरव्यू और एमएल आर्किटेक्चर सहित पूर्ण 16:9 स्लाइड डेक।",
      descMr: "८ शेतकरी मुलाखती, युझर पर्सोना, सिस्टीम आर्किटेक्चर व मॉडेल्स सादरीकरण.",
      descEn: "16:9 widescreen presentation featuring farmer personas & ML architecture.",
      icon: <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      badge: "PowerPoint PPTX",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
      downloadUrl: "/docs/AgriVision_Presentation_Deck.pptx",
      downloadText: isHi ? "PowerPoint डाउनलोड करें" : isMr ? "PPTX डाउनलोड करा" : "Download PPTX"
    },
    {
      id: "jmeter",
      titleHi: "JMeter लोड एवं स्ट्रेस टेस्टिंग रिपोर्ट",
      titleMr: "JMeter कार्यक्षमता व लोड चाचणी अहवाल",
      titleEn: "JMeter Performance & Load Testing Report",
      descHi: "3,500 अनुरोधों पर 100% सफलता, 0.00% त्रुटि दर, थ्रूपुट व रेस्पॉन्स टाइम ग्राफ।",
      descMr: "३,५०० विनंत्यांवर १००% यश, ०.००% एरर रेट, थ्रूपूट आणि रिस्पॉन्स टाइम आलेख.",
      descEn: "3,500 requests load test benchmark with 100% success and 0.00% error rate.",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: "JMeter Benchmarks",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      downloadUrl: "/docs/05_agrivision_jmeter_graphs_summary.png",
      downloadText: isHi ? "टेस्ट ग्राफ़ देखें (PNG)" : isMr ? "चाचणी आलेख पहा (PNG)" : "View Graphs (PNG)"
    }
  ];

  const umlDiagrams = [
    {
      id: "usecase",
      titleHi: "1. यूज़ केस आरेख (Use Case Diagram)",
      titleMr: "१. युझ केस आकृती (Use Case Diagram)",
      titleEn: "1. Use Case Diagram (UC-01 to UC-05a)",
      descHi: "किसान, कृषि अधिकारी, एफिशिएंटनेट सीएनएन, एपीएमसी मंडी और जेमिनी एआई के बीच संबंध।",
      descMr: "शेतकरी, कृषी विस्तारक, CNN मॉडेल, पुणे कृषी उत्पन्न बाजार समिती आणि Gemini AI परस्परसंबंध.",
      descEn: "System boundaries, primary & secondary actors, include and extend relationships.",
      icon: <Network className="w-4 h-4" />,
      imgPath: "/docs/uml/1_use_case_diagram.png"
    },
    {
      id: "class",
      titleHi: "2. विस्तृत क्लास आरेख (Class Diagram)",
      titleMr: "२. क्लास आकृती (Class Diagram)",
      titleEn: "2. Detailed Class Diagram",
      descHi: "ऑब्जेक्ट-ओरिएंटेड मॉडल: User, Field, SoilProfile, CropEngine, DiseaseClassifier, आदि।",
      descMr: "ऑब्जेक्ट-ओरिएंटेड आर्किटेक्चर: User, SoilProfile, CropRecommendationEngine, DiseaseClassifier.",
      descEn: "Object-oriented Model-Service-Controller classes, attributes, methods, and associations.",
      icon: <Boxes className="w-4 h-4" />,
      imgPath: "/docs/uml/2_class_diagram.png"
    },
    {
      id: "sequence",
      titleHi: "3. सीक्वेंस आरेख (Sequence Diagram)",
      titleMr: "३. सिक्वेन्स आकृती (Sequence Diagram)",
      titleEn: "3. Sequence Diagram (Leaf Disease Detection)",
      descHi: "पत्ती फोटो स्कैन, फास्टएपीआई अनुमान, 15L स्प्रे गणना व वॉइस आउटपुट का समयबद्ध प्रवाह।",
      descMr: "पानाचा फोटो कॅप्चर, CNN रोग निदान, १५ लिटर फवारणी मात्रा आणि व्हॉईस असिस्टंट प्रवाह.",
      descEn: "Asynchronous multi-tier lifecycle: React client -> Flask -> FastAPI -> CNN -> Pathology DB.",
      icon: <Workflow className="w-4 h-4" />,
      imgPath: "/docs/uml/3_sequence_diagram.png"
    },
    {
      id: "activity",
      titleHi: "4. एक्टिविटी आरेख (Activity Diagram)",
      titleMr: "४. ॲक्टिव्हिटी आकृती (Activity Diagram)",
      titleEn: "4. Activity Diagram (Soil pH & Yield Workflow)",
      descHi: "मिट्टी pH स्लाइडर (4.0-10.0), डीबाउन्स ट्रिगर, एसिडिक/क्षारीय तनाव व चूना/जिप्सम सलाह कार्यप्रवाह।",
      descMr: "जमिनीचा सामू (pH), २४०ms डीबाउन्स, आम्लयुक्त/खारवट ताण व खत/जिप्सम शिफारस प्रवाह.",
      descEn: "User input branching, debounced API dispatch, acidic/alkaline stress curves and synchronization.",
      icon: <GitBranch className="w-4 h-4" />,
      imgPath: "/docs/uml/4_activity_diagram.png"
    }
  ];

  const activeDiagram = umlDiagrams.find((d) => d.id === activeUmlTab) || umlDiagrams[0];

  const jmeterScreenshots = [
    {
      id: "view_tree",
      titleHi: "1. View Results Tree (अनुरोध व रिस्पॉन्स डेटा)",
      titleMr: "१. View Results Tree (सर्व विनंत्या व प्रतिसाद डेटा)",
      titleEn: "1. View Results Tree (HTTP Requests & 200 OK)",
      descHi: "सभी HTTP/API अनुरोधों पर हरे चेकमार्क (200 OK), हेडर, लेटेंसी और मॉडल JSON आउटपुट।",
      descMr: "सर्व विनंत्यांवर हिरवे चेकमार्क (200 OK), हेडर्स, लेटन्सी आणि मॉडेलचा JSON प्रतिसाद.",
      descEn: "Every HTTP request with green checkmarks, latency, headers, and model prediction JSON payloads.",
      imgPath: "/docs/jmeter_testing/jmeter_gui_view_results_tree.png"
    },
    {
      id: "testing_live",
      titleHi: "2. लाइव टेस्टिंग प्रक्रिया (50 समवर्ती थ्रेड्स)",
      titleMr: "२. थेट चाचणी प्रक्रिया (५० समवर्ती थ्रेड्स)",
      titleEn: "2. Live Testing in Progress (50 Threads Active)",
      descHi: "JMeter में 50 किसान थ्रेड्स का एक साथ निष्पादन, रैंडम रैंप-अप और रनिंग स्टेटस मॉनिटर।",
      descMr: "JMeter मध्ये ५० शेतकरी थ्रेड्सचे एकाच वेळी चालू असलेले परीक्षण आणि थेट प्रगती.",
      descEn: "Live JMeter execution with active 50/50 virtual farmer thread pool and real-time timer.",
      imgPath: "/docs/jmeter_testing/jmeter_gui_testing_in_progress.png"
    },
    {
      id: "summary_report",
      titleHi: "3. Summary Report (3,500 लेन-देन सांख्यिकी)",
      titleMr: "३. Summary Report (३,५०० व्यवहार सांख्यिकी)",
      titleEn: "3. Summary Report Table (3,500 Transactions)",
      descHi: "औसत, न्यूनतम, अधिकतम लेटेंसी, 0.00% एरर रेट और 33.44 अनुरोध/सेकंड थ्रूपुट तालिका।",
      descMr: "किमान, कमाल आणि सरासरी रिस्पॉन्स वेळ, ०.००% त्रुटी आणि ३३.४४ विनंत्या/सेकंद थ्रूपूट सारणी.",
      descEn: "Aggregate statistics table across all 7 endpoints with 0.00% error rate and throughput.",
      imgPath: "/docs/jmeter_testing/jmeter_gui_summary_report.png"
    },
    {
      id: "results_table",
      titleHi: "4. View Results in Table (सैंपल स्ट्रीम)",
      titleMr: "४. View Results in Table (सॅम्पल प्रवाह)",
      titleEn: "4. View Results in Table (Sample Stream)",
      descHi: "प्रत्येक व्यक्तिगत सैंपल का टाइमस्टैम्प, थ्रेड आईडी, लेटेंसी और HTTP 200 OK स्टेटस।",
      descMr: "प्रत्येक वैयक्तिक सॅम्पलचा वेळ, थ्रेड नाव, लेटन्सी आणि HTTP 200 OK स्थिती.",
      descEn: "Individual transaction stream showing timestamps, thread IDs, latency and HTTP 200 OK.",
      imgPath: "/docs/jmeter_testing/jmeter_gui_view_results_in_table.png"
    },
    {
      id: "response_graph",
      titleHi: "5. Response Time Graph (लेटेंसी वक्र)",
      titleMr: "५. Response Time Graph (लेटन्सी आलेख)",
      titleEn: "5. Response Time Graph (Latency Curves)",
      descHi: "पूरे 3,500 परीक्षणों के दौरान सभी एंडपॉइंट्स का समय-आधारित लेटेंसी वक्र।",
      descMr: "संपूर्ण ३,५०० व्यवहारांमधील सर्व एंडपॉइंट्सचा रिस्पॉन्स टाइम वक्र आलेख.",
      descEn: "Continuous latency curve over time across all 3,500 transactions for each endpoint.",
      imgPath: "/docs/jmeter_testing/jmeter_gui_response_time_graph.png"
    }
  ];

  const activeJmeter = jmeterScreenshots.find((d) => d.id === activeJmeterTab) || jmeterScreenshots[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
            📁 {isHi ? "सॉफ्टवेयर इंजीनियरिंग एवं प्रोजेक्ट हब" : isMr ? "सॉफ्टवेअर इंजिनिअरिंग व प्रकल्प हब" : "Software Engineering Deliverables"}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300">
            Local: /docs/uml & /docs
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {isHi ? "UML आरेख, SRS विशिष्टता दस्तावेज एवं रिपोर्ट" : isMr ? "UML आकृत्या, SRS तपशील दस्तऐवज व अहवाल" : "UML Architecture Diagrams & IEEE 830 SRS Specification"}
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
          {isHi
            ? "सॉफ्टवेयर इंजीनियरिंग मानकों (IEEE Std 830-1998) के अनुसार तैयार क्लास आरेख, सीक्वेंस आरेख, एक्टिविटी आरेख, यूज़ केस आरेख एवं पूर्ण SRS वर्ड (.docx) दस्तावेज।"
            : isMr
            ? "सॉफ्टवेअर अभियांत्रिकी मानके (IEEE 830) नुसार तयार केलेली क्लास, सिक्वेन्स, ॲक्टिव्हिटी आणि युझ केस आकृती तसेच संपूर्ण SRS दस्तऐवज."
            : "Publication-grade 300-DPI UML diagrams, IEEE Std 830-1998 Software Requirements Specification, and JMeter performance benchmark reports."}
        </p>
      </div>

      {/* Deliverable Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                  {rep.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rep.badgeColor}`}>
                  {rep.badge}
                </span>
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white leading-snug">
                {isHi ? rep.titleHi : isMr ? rep.titleMr : rep.titleEn}
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                {isHi ? rep.descHi : isMr ? rep.descMr : rep.descEn}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={rep.downloadUrl}
                download={!rep.downloadUrl.endsWith(".png")}
                target={rep.downloadUrl.endsWith(".png") ? "_blank" : undefined}
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                {rep.downloadText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* UML Architecture Gallery */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <Network className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                {isHi ? "UML सॉफ्टवेयर आर्किटेक्चर आरेख (300 DPI)" : isMr ? "UML सॉफ्टवेअर आर्किटेक्चर आकृत्या (३०० DPI)" : "AgriVision UML Software Architecture Suite"}
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {isHi
                ? "चारों उच्च-रिज़ॉल्यूशन आरेख आपके स्थानीय फोल्डर docs/uml/ में PNG रूप में सुरक्षित हैं।"
                : isMr
                ? "सर्व ४ उच्च-रिझोल्यूशन आकृत्या तुमच्या स्थानिक docs/uml/ फोल्डरमध्ये PNG म्हणून जतन आहेत."
                : "All 4 high-resolution diagrams saved locally in your repository at docs/uml/ as PNG images."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeDiagram.imgPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isHi ? "पूर्ण स्क्रीन (PNG)" : isMr ? "पूर्ण आकाराची इमेज" : "Full Resolution (PNG)"}
            </a>
            <a
              href={activeDiagram.imgPath}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {isHi ? "इमेज डाउनलोड" : isMr ? "इमेज डाऊनलोड" : "Download PNG"}
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {umlDiagrams.map((diag) => {
            const isSelected = activeUmlTab === diag.id;
            return (
              <button
                key={diag.id}
                onClick={() => setActiveUmlTab(diag.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {diag.icon}
                {isHi ? diag.titleHi : isMr ? diag.titleMr : diag.titleEn}
              </button>
            );
          })}
        </div>

        {/* Active Diagram Display Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {isHi ? activeDiagram.titleHi : isMr ? activeDiagram.titleMr : activeDiagram.titleEn}
            </span>
            <span className="text-neutral-500">
              {isHi ? activeDiagram.descHi : isMr ? activeDiagram.descMr : activeDiagram.descEn}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-inner flex items-center justify-center p-2">
            <img
              src={activeDiagram.imgPath}
              alt={activeDiagram.titleEn}
              className="w-full h-auto object-contain max-h-[650px] rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* JMeter Native GUI Screenshots Gallery */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                {isHi ? "Apache JMeter सॉफ्टवेयर में टेस्टिंग एवं परिणाम स्क्रीनशॉट" : isMr ? "Apache JMeter सॉफ्टवेअरमधील थेट चाचणी व निकाल स्क्रीनशॉट्स" : "Apache JMeter Software Testing Screenshots & Live Results"}
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {isHi
                ? "JMeter 5.6.3 एप्लीकेशन विंडो में HTTP अनुरोध, View Results Tree, Summary Report और मॉडल रिस्पॉन्स डेटा के वास्तविक स्क्रीनशॉट।"
                : isMr
                ? "JMeter ५.६.३ ॲप्लिकेशनमधील सर्व HTTP विनंत्या, View Results Tree (200 OK), Summary Report व थेट परिणामांचे स्क्रीनशॉट्स."
                : "Authentic Apache JMeter 5.6.3 application screenshots showing live testing, View Results Tree, Summary Report table & JSON responses."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeJmeter.imgPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isHi ? "पूर्ण स्क्रीन (PNG)" : isMr ? "पूर्ण आकाराची इमेज" : "Full Resolution (PNG)"}
            </a>
            <a
              href={activeJmeter.imgPath}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-xs font-bold text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {isHi ? "इमेज डाउनलोड" : isMr ? "इमेज डाऊनलोड" : "Download PNG"}
            </a>
          </div>
        </div>

        {/* JMeter Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {jmeterScreenshots.map((item) => {
            const isSelected = activeJmeterTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveJmeterTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-purple-700 text-white shadow-md shadow-purple-700/20"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {item.id === "view_tree" ? "🌳 " : item.id === "testing_live" ? "⚡ " : item.id === "summary_report" ? "📊 " : item.id === "results_table" ? "📋 " : "📈 "}
                {isHi ? item.titleHi : isMr ? item.titleMr : item.titleEn}
              </button>
            );
          })}
        </div>

        {/* Active JMeter Display Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {isHi ? activeJmeter.titleHi : isMr ? activeJmeter.titleMr : activeJmeter.titleEn}
            </span>
            <span className="text-neutral-500">
              {isHi ? activeJmeter.descHi : isMr ? activeJmeter.descMr : activeJmeter.descEn}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-inner flex items-center justify-center p-2">
            <img
              src={activeJmeter.imgPath}
              alt={activeJmeter.titleEn}
              className="w-full h-auto object-contain max-h-[650px] rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* JMeter Summary Graph Inline Preview */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              {isHi ? "JMeter परफॉर्मेंस टेस्ट ग्राफ सारांश" : isMr ? "JMeter चाचणी आलेख थेट सारांश" : "JMeter Testing Performance Graphs Summary"}
            </h3>
            <p className="text-xs text-neutral-500">
              {isHi ? "3,500 सैंपल्स • 0.00% त्रुटि दर • औसत प्रतिक्रिया समय 3.4ms" : isMr ? "३,५०० सॅम्पल्स • ०.००% एरर • सरासरी रिस्पॉन्स वेळ ३.४ ms" : "3,500 total requests • 0.00% error rate • 3.4 ms average response"}
            </p>
          </div>
          <a
            href="/docs/05_agrivision_jmeter_graphs_summary.png"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1"
          >
            {isHi ? "पूर्ण आकार में देखें" : isMr ? "मोठ्या आकारात पहा" : "View Full Resolution"}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-950/5">
          <img
            src="/docs/05_agrivision_jmeter_graphs_summary.png"
            alt="JMeter Performance Testing Summary Graphs"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
