// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appName: "AgriVision",
      tagline: "Simple AI plant disease detection and advisory for every farmer",
      nav: {
        home: "Home",
        dashboard: "Dashboard",
        fields: "Fields",
        prices: "Prices",
        diseaseDetect: "Check Plant",
        assistant: "Assistant",
        settings: "Settings",
        login: "Login",
        register: "Register",
        help: "Help",
        tutorial: "How to Use",
        myProfile: "My Profile",
        logout: "Logout"
      },
      home: {
        greeting: "Welcome, Farmer Friend!",
        subtitle: "Check your crop leaf for diseases in seconds using your phone camera.",
        checkPlantBtn: "Check My Plant",
        howToPhotoBtn: "How to Take a Photo",
        tutorialBtn: "Quick Tutorial",
        helpBtn: "Need Help?",
        welcomeAudio: "Welcome to AgriVision. Tap Check My Plant to take a photo of your crop leaf and get instant disease guidance.",
        recentFeatures: "More Farming Tools",
        mandiFeature: "Live Mandi Prices",
        cropPlanFeature: "Crop Planning",
        weatherFeature: "Local Weather",
        openDashboard: "Go to Farmer Dashboard",
        accountPrompt: "Have an account? Log in to save your fields and history."
      },
      disease: {
        title: "Plant Disease Detection",
        step1Title: "1. Take or Choose Leaf Photo",
        step1Desc: "Take a clear, close-up photo of the unhealthy leaf under natural sunlight.",
        takePhotoBtn: "Take a Photo",
        choosePhotoBtn: "Choose from Gallery",
        photoTipsBtn: "Photography Tips",
        step2Title: "2. Confirm Your Photo",
        step2Desc: "Check that the diseased part of the leaf is sharp and clear.",
        retakeBtn: "Take Another Photo",
        confirmBtn: "Check This Leaf Now",
        step3Title: "3. Checking Your Plant...",
        step3Desc: "Our AI is analyzing the leaf patterns. Please wait a moment...",
        step4Title: "4. Diagnosis Result",
        detectedHeading: "Detected Condition",
        confidenceLabel: "Confidence Level",
        confidenceHigh: "High confidence estimate",
        confidenceMedium: "Moderate confidence estimate",
        confidenceLow: "Low confidence / Uncertain",
        uncertainNotice: "The system is uncertain about this leaf. We strongly recommend taking another clear photo in brighter light.",
        advisoryHeading: "What Should You Do Next?",
        consultExpert: "Always consult your local Krishi Vigyan Kendra (KVK) or agricultural extension officer before applying chemical treatments.",
        generalCare: "Remove and safely destroy severely infected leaves to prevent the disease from spreading to healthy plants.",
        disclaimerNotice: "Note: AI diagnosis is an automated estimate to guide you, not a guaranteed laboratory certificate.",
        listenResultBtn: "Listen to Result",
        stopAudioBtn: "Stop Speaking",
        checkAnotherBtn: "Check Another Plant",
        backHomeBtn: "Back to Home",
        technicalDetails: "Technical Model Details",
        modelDiagnosis: "Raw Model Label",
        modelVersion: "Model Version",
        errorTitle: "Check Could Not Be Completed",
        fileTooLarge: "Image file is too large (maximum 15MB). Please choose a smaller photo.",
        invalidFileType: "Please select a valid image file (JPEG, PNG, or WebP).",
        noFileSelected: "Please take or choose a leaf photograph first."
      },
      tutorial: {
        title: "How to Use AgriVision",
        stepIndicator: "Step {{current}} of {{total}}",
        skip: "Skip Tutorial",
        next: "Next",
        back: "Back",
        finish: "Get Started",
        step1Title: "Welcome to AgriVision",
        step1Text: "AgriVision helps you detect crop diseases quickly from your mobile phone. You do not need technical knowledge to use it.",
        step1Audio: "Welcome to AgriVision. This application helps you detect crop diseases quickly from your mobile phone.",
        step2Title: "Take a Clear Photograph",
        step2Text: "Hold your phone steady. Focus on the infected spot or leaf in bright daylight. Avoid blurry or dark photos.",
        step2Audio: "Hold your phone steady. Focus closely on the infected leaf under good sunlight. Avoid dark or blurry photos.",
        step3Title: "Start the Plant Check",
        step3Text: "Tap 'Check My Plant' and confirm your photo. The application will inspect the leaf for signs of infection.",
        step3Audio: "Tap Check My Plant and confirm your photo. The system will inspect your leaf in a few seconds.",
        step4Title: "Understand the Advice",
        step4Text: "See the disease name, listen to spoken advice, and learn the practical steps you should take to protect your crop.",
        step4Audio: "View the disease name, listen to spoken instructions, and see what steps to take next."
      },
      help: {
        title: "Farmer Help & Guidance",
        close: "Close Help",
        audioListen: "Listen to this help topic",
        topics: [
          {
            q: "How do I check a plant for disease?",
            a: "Open the app, tap the big green button 'Check My Plant', take a clear photo of the infected leaf, and tap 'Check This Leaf Now'."
          },
          {
            q: "How to take a good plant photo?",
            a: "Make sure you have good daylight. Hold your phone about 10 to 15 centimeters from the leaf. Keep the camera steady so the photo is sharp, not blurry."
          },
          {
            q: "What if the photo fails to upload?",
            a: "Check if your mobile internet or Wi-Fi is turned on. If the signal is weak, move to an area with better network and try tapping 'Try Again'."
          },
          {
            q: "What if my internet connection is lost?",
            a: "AgriVision will keep your selected photo safe on your phone screen. Once your internet reconnects, simply tap 'Check This Leaf Now' without having to re-take the photo."
          },
          {
            q: "Can I listen to instructions aloud?",
            a: "Yes! Look for the speaker icon (🔊) anywhere on the screen. Tap it once to listen to the explanation in your language. Tap 'Stop' to silence it."
          },
          {
            q: "How do I switch to Marathi or English?",
            a: "At the top of the screen, tap the Language option and select 'मराठी' or 'English'. You can switch anytime without losing your work."
          },
          {
            q: "What should I do after receiving a diagnosis?",
            a: "Read or listen to the next steps. Do not buy expensive chemicals immediately. Consult your local Krishi Vigyan Kendra (KVK) or agriculture assistant."
          },
          {
            q: "Is the AI diagnosis always 100% guaranteed?",
            a: "No. The AI provides an automated visual estimate. Dust, shadows, or multiple pests can affect accuracy. Always verify with local agricultural experts."
          },
          {
            q: "Can I inspect multiple plants one after another?",
            a: "Yes. After viewing a result, tap 'Check Another Plant' to inspect another leaf immediately."
          },
          {
            q: "How do I go back to the home screen?",
            a: "Tap the 'Home' button at the bottom of the screen or tap the AgriVision logo at the top left corner."
          }
        ]
      },
      photoTips: {
        title: "How to Take a Clear Leaf Photo",
        goodPhotoTitle: "Good Leaf Photo",
        goodPhoto1: "Leaf fills most of the frame",
        goodPhoto2: "Good natural sunlight",
        goodPhoto3: "Sharp focus on disease spots",
        badPhotoTitle: "Avoid These Mistakes",
        badPhoto1: "Blurry or out-of-focus camera",
        badPhoto2: "Dark shadows or too dim",
        badPhoto3: "Too far away from the plant",
        closeBtn: "Got It, Continue"
      },
      auth: {
        loginTitle: "Welcome Back",
        loginSubtitle: "Sign in with your mobile number or email and password",
        loginSpeakPrompt: "Welcome back. Enter your mobile number and password to sign in.",
        registerTitle: "Create Your Farmer Account",
        registerSubtitle: "Join AgriVision to save your field records and crop plans",
        registerSpeakPrompt: "Create your free farmer account. Enter your name, mobile number, village, and password.",
        nameLabel: "Your Full Name",
        namePlaceholder: "e.g. Ramesh Patil",
        emailLabel: "Email Address",
        emailPlaceholder: "e.g. farmer@example.com",
        phoneLabel: "10-Digit Mobile Number",
        phonePlaceholder: "e.g. 9876543210",
        villageLabel: "Village / Town Name",
        villagePlaceholder: "e.g. Baramati",
        pincodeLabel: "PIN Code (Optional)",
        pincodePlaceholder: "e.g. 413102",
        passwordLabel: "Password",
        passwordPlaceholder: "Minimum 6 characters",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Type your password again",
        showPassword: "Show",
        hidePassword: "Hide",
        loginBtn: "Login",
        loggingInBtn: "Logging In...",
        registerBtn: "Create Account",
        registeringBtn: "Creating Account...",
        noAccountPrompt: "New to AgriVision?",
        createAccountLink: "Create an account",
        haveAccountPrompt: "Already have an account?",
        loginLink: "Login here",
        otpTab: "Login with OTP",
        passwordTab: "Login with Password",
        requestOtpBtn: "Send OTP to Phone",
        sendingOtpBtn: "Sending OTP...",
        verifyOtpBtn: "Verify & Login",
        verifyingOtpBtn: "Verifying...",
        enterOtpLabel: "Enter 6-digit OTP",
        networkError: "Unable to connect. Check your internet connection and try again.",
        invalidCredentials: "Wrong mobile number or password. Please check your details and try again.",
        missingFields: "Please fill in all required fields.",
        passwordTooShort: "Password must be at least 6 characters.",
        passwordMismatch: "Both passwords must match exactly.",
        invalidPhone: "Please enter a valid 10-digit mobile number.",
        invalidEmail: "Please enter a valid email address.",
        loginSuccess: "Logged in successfully!",
        registerSuccess: "Account created successfully! Redirecting to login..."
      },
      actions: {
        upload: "Upload",
        detect: "Detect",
        speak: "Listen",
        stop: "Stop",
        tryAgain: "Try Again",
        back: "Back",
        home: "Home"
      },
      labels: {
        cropRecommendations: "Crop Recommendations",
        marketPrices: "Market Prices",
        yieldScore: "Yield & Sustainability",
        language: "Language",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        system: "System",
        askAnything: "Ask in your language…"
      }
    }
  },
  mr: {
    translation: {
      appName: "AgriVision (ॲग्रीव्हिजन)",
      tagline: "प्रत्येक शेतकऱ्यासाठी सोपी पीक रोग तपासणी आणि कृषी सल्ला",
      nav: {
        home: "मुख्य पान",
        dashboard: "डॅशबोर्ड",
        fields: "माझे शेत",
        prices: "बाजारभाव",
        diseaseDetect: "पीक रोग तपासणी",
        assistant: "कृषी मित्र",
        settings: "सेटिंग्ज",
        login: "लॉगिन",
        register: "नोंदणी करा",
        help: "मदत",
        tutorial: "कसे वापरावे",
        myProfile: "माझे प्रोफाईल",
        logout: "बाहेर पडा"
      },
      home: {
        greeting: "नमस्कार, शेतकरी बांधवांनो!",
        subtitle: "आपल्या मोबाईल कॅमेऱ्याने पिकाच्या पानाचा फोटो काढून रोग ओळखा आणि उपाय जाणून घ्या.",
        checkPlantBtn: "माझ्या पिकाची तपासणी करा",
        howToPhotoBtn: "फोटो कसा काढायचा ते शिका",
        tutorialBtn: "सोपे मार्गदर्शन (ट्यूटोरियल)",
        helpBtn: "मदत हवी आहे का?",
        welcomeAudio: "AgriVision मध्ये आपले स्वागत आहे. पिकाच्या रोगाची तपासणी करण्यासाठी 'माझ्या पिकाची तपासणी करा' बटण दाबा.",
        recentFeatures: "इतर उपयुक्त साधने",
        mandiFeature: "थेट बाजारभाव",
        cropPlanFeature: "पीक नियोजन",
        weatherFeature: "स्थानिक हवामान",
        openDashboard: "शेतकरी डॅशबोर्ड उघडा",
        accountPrompt: "खाते आहे का? आपले शेत व नोंदी सुरक्षित ठेवण्यासाठी लॉगिन करा."
      },
      disease: {
        title: "पिकावरील रोग तपासणी",
        step1Title: "१. पिकाच्या पानाचा फोटो काढा किंवा निवडा",
        step1Desc: "नैसर्गिक सूर्यप्रकाशात रोगट पानाच्या जवळून स्पष्ट फोटो काढा.",
        takePhotoBtn: "फोटो काढा",
        choosePhotoBtn: "गॅलरीमधून फोटो निवडा",
        photoTipsBtn: "फोटो कसा काढावा?",
        step2Title: "२. फोटो तपासा आणि खात्री करा",
        step2Desc: "पानावरील रोगाचा भाग स्पष्ट दिसत आहे ना याची खात्री करा.",
        retakeBtn: "पुन्हा फोटो काढा",
        confirmBtn: "या पानाची तपासणी करा",
        step3Title: "३. तुमच्या पिकाची तपासणी सुरू आहे...",
        step3Desc: "आमची संगणक प्रणाली पानावरील रोगाची तपासणी करत आहे. कृपया थोडा वेळ थांबा...",
        step4Title: "४. तपासणीचा निकाल",
        detectedHeading: "आढळलेला संभाव्य रोग",
        confidenceLabel: "अंदाजाची खात्री",
        confidenceHigh: "उच्च खात्रीचा अंदाज",
        confidenceMedium: "मध्यम खात्रीचा अंदाज",
        confidenceLow: "कमी खात्री / अनिश्चित",
        uncertainNotice: "या पानाबद्दल प्रणाली पूर्णपणे खात्री देऊ शकत नाही. चांगल्या उजेडात अधिक स्पष्ट फोटो काढून पुन्हा तपासणी करण्याचा सल्ला दिला जातो.",
        advisoryHeading: "आता पुढे काय करावे?",
        consultExpert: "कोणतेही रासायनिक औषध फवारण्यापूर्वी कृपया आपल्या स्थानिक कृषी सहाय्यक किंवा कृषी विज्ञान केंद्राचा (KVK) सल्ला नक्की घ्या.",
        generalCare: "रोगट पाने तोडून शेताबाहेर नष्ट करा, जेणेकरून निरोगी पिकांना बाधा होणार नाही.",
        disclaimerNotice: "सूचना: ही AI तपासणी शेतकऱ्यांच्या मार्गदर्शनासाठी एक स्वयंचलित अंदाज आहे, ही कोणतीही अधिकृत लॅब चाचणी नाही.",
        listenResultBtn: "निकाल ऐका",
        stopAudioBtn: "आवाज बंद करा",
        checkAnotherBtn: "दुसऱ्या पिकाची तपासणी करा",
        backHomeBtn: "मुख्य पानावर जा",
        technicalDetails: "तांत्रिक माहिती (Model Details)",
        modelDiagnosis: "मूळ मॉडेल निदान",
        modelVersion: "मॉडेल व्हर्जन",
        errorTitle: "पिकाची तपासणी होऊ शकली नाही",
        fileTooLarge: "फोटो खूप मोठा आहे (कमाल मर्यादा १५ MB). कृपया लहान आकाराचा फोटो निवडा.",
        invalidFileType: "कृपया योग्य फोटो निवडा (JPEG, PNG किंवा WebP).",
        noFileSelected: "कृपया प्रथम पिकाच्या पानाचा फोटो काढा किंवा निवडा."
      },
      tutorial: {
        title: "AgriVision कसे वापरावे?",
        stepIndicator: "पायरी {{current}} पैकी {{total}}",
        skip: "पुढे जा (Skip)",
        next: "पुढील",
        back: "मागे",
        finish: "सुरू करा",
        step1Title: "AgriVision मध्ये आपले स्वागत आहे",
        step1Text: "AgriVision आपल्या मोबाईलवरून पिकांचे रोग ओळखण्यास मदत करते. हे वापरण्यासाठी तांत्रिक ज्ञानाची गरज नाही.",
        step1Audio: "AgriVision मध्ये आपले स्वागत आहे. हे ॲप आपल्या मोबाईलवरून पिकांवरील रोग ओळखण्यास मदत करते.",
        step2Title: "पानाचा स्पष्ट फोटो काढा",
        step2Text: "मोबाईल व्यवस्थित धरा. दिवसाच्या चांगल्या उजेडात रोगट पानावर कॅमेरा केंद्रित करा. अंधुक किंवा हललेला फोटो टाळा.",
        step2Audio: "मोबाईल स्थिर धरून चांगल्या उजेडात रोगट पानाचा स्पष्ट फोटो काढा. अंधुक फोटो टाळा.",
        step3Title: "पिकाची तपासणी सुरू करा",
        step3Text: "'माझ्या पिकाची तपासणी करा' दाबा आणि फोटोची खात्री करा. काही सेकंदात प्रणाली तपासणी पूर्ण करेल.",
        step3Audio: "माझ्या पिकाची तपासणी करा दाबा. काही सेकंदात प्रणाली तपासणी पूर्ण करेल.",
        step4Title: "सल्ला समजून घ्या व उपाय करा",
        step4Text: "रोगाचे नाव पहा, आवाजात सल्ला ऐका आणि पिकाचे संरक्षण करण्यासाठी काय करावे ते समजून घ्या.",
        step4Audio: "रोगाचे नाव पहा, बोलून दिलेला सल्ला ऐका आणि पुढील उपाय करा."
      },
      help: {
        title: "शेतकरी मदत व मार्गदर्शन",
        close: "मदत खिडकी बंद करा",
        audioListen: "ही मदत ऐका",
        topics: [
          {
            q: "पिकाच्या रोगाची तपासणी कशी करावी?",
            a: "ॲप उघडा, मोठे हिरवे बटण 'माझ्या पिकाची तपासणी करा' दाबा, रोगट पानाचा स्पष्ट फोटो काढा आणि 'या पानाची तपासणी करा' दाबा."
          },
          {
            q: "चांगला आणि स्पष्ट फोटो कसा काढावा?",
            a: "सूर्यप्रकाशात फोटो काढा. मोबाईल पानापासून १० ते १५ सेंटीमीटर अंतरावर स्थिर धरा, जेणेकरून फोटो हलणार नाही."
          },
          {
            q: "फोटो अपलोड झाला नाही तर काय करावे?",
            a: "आपल्या मोबाईलचे इंटरनेट सुरू आहे का ते तपासा. नेटवर्क कमी असल्यास थोड्या चांगल्या नेटवर्कच्या ठिकाणी जाऊन 'पुन्हा प्रयत्न करा' दाबा."
          },
          {
            q: "इंटरनेट बंद पडले तर काय होईल?",
            a: "AgriVision तुमचा निवडलेला फोटो जपून ठेवेल. इंटरनेट परत आल्यावर तोच फोटो पुन्हा न काढता थेट तपासणी करता येईल."
          },
          {
            q: "मी सूचना आवाजात ऐकू शकतो का?",
            a: "होय! स्क्रीनवरील स्पीकर आयकॉनवर (🔊) दाबा. सर्व सूचना व निकाल तुम्हाला मराठीत ऐकू येतील. आवाज थांबवण्यासाठी 'आवाज बंद करा' दाबा."
          },
          {
            q: "भाषा कशी बदलावी?",
            a: "स्क्रीनच्या वरच्या बाजूला 'भाषा' पर्यायावर दाबा आणि 'मराठी' किंवा 'English' निवडा. चालू असलेली माहिती न गमावता भाषा बदलता येते."
          },
          {
            q: "तपासणीचा निकाल आल्यावर काय करावे?",
            a: "निकाल व उपाय काळजीपूर्वक वाचा किंवा ऐका. लगेच महागडी रसायने न फवारता स्थानिक कृषी सहाय्यक किंवा कृषी विज्ञान केंद्राचा सल्ला घ्या."
          },
          {
            q: "ही तपासणी १००% अचूक असते का?",
            a: "नाही. हा संगणकाने दिलेला प्राथमिक अंदाज आहे. सावली किंवा धुळीमुळे फरकाची शक्यता असते. नेहमी कृषी तज्ज्ञांकडून खात्री करून घ्या."
          },
          {
            q: "एकापाठोपाठ अनेक पिकांचे फोटो तपासू शकतो का?",
            a: "होय. एक तपासणी पूर्ण झाल्यावर 'दुसऱ्या पिकाची तपासणी करा' बटण दाबा."
          },
          {
            q: "मुख्य पानावर कसे परत जावे?",
            a: "स्क्रीनच्या खाली असलेल्या 'मुख्य पान' बटणावर दाबा किंवा डाव्या कोपऱ्यातील AgriVision नावावर दाबा."
          }
        ]
      },
      photoTips: {
        title: "पानाचा योग्य फोटो कसा काढावा?",
        goodPhotoTitle: "असा फोटो काढा (बरोबर)",
        goodPhoto1: "पानाचा मोठा भाग फोटोत दिसावा",
        goodPhoto2: "चांगला नैसर्गिक सूर्यप्रकाश असावा",
        goodPhoto3: "पानावरील डागांवर स्पष्ट फोकस असावा",
        badPhotoTitle: "अशा चुका टाळा (चूक)",
        badPhoto1: "हललेला किंवा अस्पष्ट फोटो",
        badPhoto2: "गडद सावली किंवा अंधार",
        badPhoto3: "झाडापासून खूप लांबून काढलेला फोटो",
        closeBtn: "समजले, पुढे चला"
      },
      auth: {
        loginTitle: "पुन्हा स्वागत आहे",
        loginSubtitle: "आपला मोबाईल नंबर किंवा ईमेल आणि पासवर्ड टाकून लॉगिन करा",
        loginSpeakPrompt: "पुन्हा स्वागत आहे. लॉगिन करण्यासाठी आपला मोबाईल नंबर आणि पासवर्ड टाका.",
        registerTitle: "तुमचे शेतकरी खाते तयार करा",
        registerSubtitle: "शेताची नोंद व पीक नियोजन सुरक्षित ठेवण्यासाठी AgriVision शी जोडा",
        registerSpeakPrompt: "नवीन शेतकरी खाते तयार करण्यासाठी आपले नाव, मोबाईल नंबर, गाव आणि पासवर्ड टाका.",
        nameLabel: "तुमचे पूर्ण नाव",
        namePlaceholder: "उदा. रमेश पाटील",
        emailLabel: "ईमेल पत्ता",
        emailPlaceholder: "उदा. farmer@example.com",
        phoneLabel: "१० अंकी मोबाईल नंबर",
        phonePlaceholder: "उदा. ९८७६५४३२१०",
        villageLabel: "गावाचे नाव",
        villagePlaceholder: "उदा. बारामती",
        pincodeLabel: "पिन कोड (ऐच्छिक)",
        pincodePlaceholder: "उदा. ४१३१०२",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "किमान ६ अक्षरे/अंक",
        confirmPasswordLabel: "पासवर्ड पुन्हा टाका",
        confirmPasswordPlaceholder: "पासवर्ड पुन्हा टाईप करा",
        showPassword: "दाखवा",
        hidePassword: "लपवा",
        loginBtn: "लॉग इन करा",
        loggingInBtn: "लॉग इन होत आहे...",
        registerBtn: "खाते तयार करा",
        registeringBtn: "खाते तयार होत आहे...",
        noAccountPrompt: "AgriVision वर नवीन आहात?",
        createAccountLink: "नवीन खाते तयार करा",
        haveAccountPrompt: "आधीच खाते आहे का?",
        loginLink: "येथे लॉग इन करा",
        otpTab: "OTP ने लॉगिन करा",
        passwordTab: "पासवर्डने लॉगिन करा",
        requestOtpBtn: "मोबाईलवर OTP पाठवा",
        sendingOtpBtn: "OTP पाठवत आहे...",
        verifyOtpBtn: "तपासा आणि लॉगिन करा",
        verifyingOtpBtn: "तपासणी सुरू आहे...",
        enterOtpLabel: "६ अंकी OTP टाका",
        networkError: "जोडणी होत नाही. इंटरनेट तपासा आणि पुन्हा प्रयत्न करा.",
        invalidCredentials: "मोबाईल नंबर किंवा पासवर्ड चुकीचा आहे. तपासा आणि पुन्हा प्रयत्न करा.",
        missingFields: "कृपया सर्व आवश्यक माहिती भरा.",
        passwordTooShort: "पासवर्ड किमान ६ अक्षरांचा असावा.",
        passwordMismatch: "दोन्ही पासवर्ड एकसारखे असायला हवेत.",
        invalidPhone: "कृपया योग्य १० अंकी मोबाईल नंबर टाका.",
        invalidEmail: "कृपया योग्य ईमेल पत्ता टाका.",
        loginSuccess: "यशस्वीरित्या लॉगिन झाले!",
        registerSuccess: "खाते यशस्वीरित्या तयार झाले! लॉगिन पृष्ठावर नेत आहे..."
      },
      actions: {
        upload: "अपलोड करा",
        detect: "तपासा",
        speak: "ऐका",
        stop: "आवाज बंद करा",
        tryAgain: "पुन्हा प्रयत्न करा",
        back: "मागे जा",
        home: "मुख्य पान"
      },
      labels: {
        cropRecommendations: "पीक शिफारसी",
        marketPrices: "बाजारभाव",
        yieldScore: "उत्पादन आणि टिकाऊपणा",
        language: "भाषा",
        theme: "रंगसंगती (Theme)",
        light: "फिकट",
        dark: "गडद",
        system: "सिस्टम",
        askAnything: "आपल्या भाषेत विचारा…"
      }
    }
  },
  hi: {
    translation: {
      appName: "AgriVision (एग्रीविज़न)",
      tagline: "हर किसान के लिए आसान फसल रोग पहचान और कृषि सलाह",
      nav: {
        home: "होम",
        dashboard: "डैशबोर्ड",
        fields: "मेरे खेत",
        prices: "मंडी भाव",
        diseaseDetect: "फसल रोग जांच",
        assistant: "कृषि मित्र",
        settings: "सेटिंग्स",
        login: "लॉगिन",
        register: "रजिस्टर",
        help: "मदद",
        tutorial: "कैसे उपयोग करें",
        myProfile: "मेरी प्रोफाइल",
        logout: "लॉगआउट"
      },
      home: {
        greeting: "नमस्ते, किसान भाइयों!",
        subtitle: "अपने मोबाइल से फसल की पत्ती की फोटो खींचें और तुरंत रोग व उपाय जानें।",
        checkPlantBtn: "मेरी फसल की जांच करें",
        howToPhotoBtn: "फोटो खींचना सीखें",
        tutorialBtn: "सरल मार्गदर्शिका",
        helpBtn: "मदद चाहिए?",
        welcomeAudio: "AgriVision में आपका स्वागत है। फसल जांचने के लिए 'मेरी फसल की जांच करें' बटन दबाएं।",
        recentFeatures: "अन्य उपयोगी सुविधाएं",
        mandiFeature: "लाइव मंडी भाव",
        cropPlanFeature: "फसल योजना",
        weatherFeature: "स्थानीय मौसम",
        openDashboard: "किसान डैशबोर्ड खोलें",
        accountPrompt: "खाता है? अपने खेत और रिकॉर्ड सुरक्षित रखने के लिए लॉगिन करें।"
      },
      disease: {
        title: "फसल रोग पहचान",
        step1Title: "१. पत्ती की फोटो लें या चुनें",
        step1Desc: "प्राकृतिक धूप में रोगग्रस्त पत्ती की साफ और नज़दीकी फोटो लें।",
        takePhotoBtn: "फोटो खींचें",
        choosePhotoBtn: "गैलरी से फोटो चुनें",
        photoTipsBtn: "फोटो कैसे खींचें?",
        step2Title: "२. फोटो की पुष्टि करें",
        step2Desc: "पत्ती पर रोग का भाग साफ दिख रहा है या नहीं, यह जांचें।",
        retakeBtn: "दूसरी फोटो लें",
        confirmBtn: "इस पत्ती की जांच करें",
        step3Title: "३. आपकी फसल की जांच जारी है...",
        step3Desc: "हमारा सिस्टम पत्ती के लक्षणों का विश्लेषण कर रहा है। कृपया प्रतीक्षा करें...",
        step4Title: "४. जांच का परिणाम",
        detectedHeading: "पहचाना गया संभावित रोग",
        confidenceLabel: "अनुमान का स्तर",
        confidenceHigh: "उच्च विश्वास अनुमान",
        confidenceMedium: "मध्यम विश्वास अनुमान",
        confidenceLow: "कम विश्वास / अनिश्चित",
        uncertainNotice: "सिस्टम इस पत्ती को लेकर पूरी तरह निश्चित नहीं है। कृपया रोशनी में अधिक साफ फोटो खींचकर दोबारा प्रयास करें।",
        advisoryHeading: "आगे क्या कदम उठाएं?",
        consultExpert: "कोई भी रासायनिक दवा छिड़कने से पहले अपने नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि विशेषज्ञ से सलाह अवश्य लें।",
        generalCare: "संक्रमित पत्तियों को तोड़कर खेत से दूर नष्ट करें ताकि स्वस्थ पौधों में रोग न फैले।",
        disclaimerNotice: "सूचना: यह परिणाम मार्गदर्शन हेतु एक स्वचालित अनुमान है, यह आधिकारिक प्रयोगशाला परीक्षण नहीं है।",
        listenResultBtn: "परिणाम सुनें",
        stopAudioBtn: "आवाज बंद करें",
        checkAnotherBtn: "दूसरी फसल की जांच करें",
        backHomeBtn: "होम पेज पर जाएं",
        technicalDetails: "तकनीकी विवरण (Model Details)",
        modelDiagnosis: "मॉडल निदान",
        modelVersion: "मॉडल संस्करण",
        errorTitle: "फसल की जांच नहीं हो सकी",
        fileTooLarge: "फोटो बहुत बड़ी है (अधिकतम 15MB)। कृपया छोटी फोटो चुनें।",
        invalidFileType: "कृपया मान्य फोटो चुनें (JPEG, PNG या WebP)।",
        noFileSelected: "कृपया पहले पत्ती की फोटो लें या चुनें।"
      },
      tutorial: {
        title: "AgriVision का उपयोग कैसे करें?",
        stepIndicator: "चरण {{current}} / {{total}}",
        skip: "छोड़ें (Skip)",
        next: "आगे",
        back: "पीछे",
        finish: "शुरू करें",
        step1Title: "AgriVision में स्वागत है",
        step1Text: "AgriVision आपको मोबाइल से फसल के रोग पहचानने में मदद करता है। इसके लिए तकनीकी जानकारी की जरूरत नहीं है।",
        step1Audio: "AgriVision में आपका स्वागत है। यह ऐप मोबाइल से फसल रोग पहचानने में मदद करता है।",
        step2Title: "पत्ती की साफ फोटो लें",
        step2Text: "मोबाइल को स्थिर रखें। अच्छी रोशनी में रोगग्रस्त पत्ती पर फोकस करें। धुंधली फोटो न लें।",
        step2Audio: "मोबाइल स्थिर रखें और अच्छी रोशनी में पत्ती की साफ फोटो लें। धुंधली फोटो से बचें।",
        step3Title: "जांच शुरू करें",
        step3Text: "'मेरी फसल की जांच करें' दबाएं और फोटो की पुष्टि करें। कुछ ही सेकंड में जांच पूरी हो जाएगी।",
        step3Audio: "मेरी फसल की जांच करें दबाएं और फोटो की पुष्टि करें।",
        step4Title: "सलाह समझें और उपचार करें",
        step4Text: "रोग का नाम देखें, आवाज में सलाह सुनें और फसल की सुरक्षा के लिए उचित उपाय अपनाएं।",
        step4Audio: "रोग का नाम देखें, बोलकर दी गई सलाह सुनें और उपाय करें।"
      },
      help: {
        title: "किसान सहायता और मार्गदर्शन",
        close: "बंद करें",
        audioListen: "यह जानकारी सुनें",
        topics: [
          {
            q: "फसल के रोग की जांच कैसे करें?",
            a: "ऐप खोलें, बड़ा हरा बटन 'मेरी फसल की जांच करें' दबाएं, पत्ती की साफ फोटो लें और जांचें।"
          },
          {
            q: "साफ फोटो कैसे खींचें?",
            a: "अच्छी धूप में फोटो लें। मोबाइल को पत्ती से 10 से 15 सेंटीमीटर की दूरी पर स्थिर रखें।"
          },
          {
            q: "फोटो अपलोड न हो तो क्या करें?",
            a: "इंटरनेट कनेक्शन जांचें और बेहतर नेटवर्क में जाकर 'पुन्हा प्रयत्न करा' दबाएं।"
          },
          {
            q: "इंटरनेट कट जाए तो क्या होगा?",
            a: "आपकी फोटो सुरक्षित रहेगी। इंटरनेट आते ही आप बिना दोबारा फोटो खींचे सीधे जांच कर सकते हैं।"
          },
          {
            q: "क्या मैं आवाज में सलाह सुन सकता हूँ?",
            a: "हाँ! स्पीकर आइकन (🔊) दबाकर आप अपनी भाषा में निर्देश और परिणाम सुन सकते हैं।"
          },
          {
            q: "भाषा कैसे बदलें?",
            a: "स्क्रीन पर सबसे ऊपर भाषा विकल्प पर जाकर 'मराठी' या 'English' चुनें।"
          },
          {
            q: "परिणाम आने के बाद क्या करें?",
            a: "सलाह को ध्यान से पढ़ें या सुनें और स्थानीय कृषि अधिकारी की सलाह लें।"
          },
          {
            q: "क्या यह जांच 100% सटीक है?",
            a: "नहीं, यह एक स्वचालित अनुमान है। अंतिम निर्णय से पहले कृषि विशेषज्ञ की सलाह लें।"
          },
          {
            q: "क्या एक के बाद एक कई पौधे जांच सकते हैं?",
            a: "हाँ, परिणाम देखने के बाद 'दूसरी फसल की जांच करें' दबाएं।"
          },
          {
            q: "होम पेज पर कैसे जाएं?",
            a: "नीचे दिए गए 'होम' बटन पर टैप करें।"
          }
        ]
      },
      photoTips: {
        title: "पत्ती की सही फोटो कैसे लें?",
        goodPhotoTitle: "ऐसी फोटो लें (सही)",
        goodPhoto1: "पत्ती का बड़ा हिस्सा फोटो में दिखे",
        goodPhoto2: "प्राकृतिक सूर्य का प्रकाश हो",
        goodPhoto3: "रोग के धब्बों पर साफ फोकस हो",
        badPhotoTitle: "ये गलतियां न करें (गलत)",
        badPhoto1: "हिला हुआ या धुंधला फोटो",
        badPhoto2: "अंधेरा या भारी छाया",
        badPhoto3: "पौधे से बहुत दूर से खींचा गया फोटो",
        closeBtn: "समझ गया, आगे बढ़ें"
      },
      auth: {
        loginTitle: "पुनः स्वागत है",
        loginSubtitle: "अपने मोबाइल नंबर और पासवर्ड से लॉगिन करें",
        loginSpeakPrompt: "लॉगिन करने के लिए अपना मोबाइल नंबर और पासवर्ड दर्ज करें।",
        registerTitle: "किसान खाता बनाएं",
        registerSubtitle: "खेत और फसल रिकॉर्ड सुरक्षित रखने के लिए जुड़ें",
        registerSpeakPrompt: "नया खाता बनाने के लिए अपना नाम, मोबाइल नंबर, गाँव और पासवर्ड दर्ज करें।",
        nameLabel: "आपका पूरा नाम",
        namePlaceholder: "उदा. रमेश पाटिल",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "उदा. farmer@example.com",
        phoneLabel: "10 अंकों का मोबाइल नंबर",
        phonePlaceholder: "उदा. 9876543210",
        villageLabel: "गाँव का नाम",
        villagePlaceholder: "उदा. बारामती",
        pincodeLabel: "पिन कोड (वैकल्पिक)",
        pincodePlaceholder: "उदा. 413102",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "कम से कम 6 अक्षर",
        confirmPasswordLabel: "पासवर्ड दोबारा दर्ज करें",
        confirmPasswordPlaceholder: "पासवर्ड फिर से लिखें",
        showPassword: "दिखाएं",
        hidePassword: "छिपाएं",
        loginBtn: "लॉग इन करें",
        loggingInBtn: "लॉग इन हो रहा है...",
        registerBtn: "खाता बनाएं",
        registeringBtn: "खाता बन रहा है...",
        noAccountPrompt: "AgriVision पर नए हैं?",
        createAccountLink: "नया खाता बनाएं",
        haveAccountPrompt: "पहले से खाता है?",
        loginLink: "यहाँ लॉगिन करें",
        otpTab: "OTP से लॉगिन करें",
        passwordTab: "पासवर्ड से लॉगिन करें",
        requestOtpBtn: "OTP भेजें",
        sendingOtpBtn: "OTP भेजा जा रहा है...",
        verifyOtpBtn: "सत्यापित कर लॉगिन करें",
        verifyingOtpBtn: "सत्यापन जारी है...",
        enterOtpLabel: "6 अंकों का OTP दर्ज करें",
        networkError: "कनेक्शन समस्या। इंटरनेट जांचें और पुनः प्रयास करें।",
        invalidCredentials: "मोबाइल नंबर या पासवर्ड गलत है। जांचें और पुनः प्रयास करें।",
        missingFields: "कृपया सभी आवश्यक जानकारी भरें।",
        passwordTooShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
        passwordMismatch: "दोनों पासवर्ड समान होने चाहिए।",
        invalidPhone: "कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।",
        invalidEmail: "कृपया मान्य ईमेल दर्ज करें।",
        loginSuccess: "सफलतापूर्वक लॉगिन हो गया!",
        registerSuccess: "खाता सफलतापूर्वक बन गया! लॉगिन पेज पर जा रहे हैं..."
      },
      actions: {
        upload: "अपलोड",
        detect: "जांचें",
        speak: "सुनें",
        stop: "रोकें",
        tryAgain: "पुनः प्रयास करें",
        back: "पीछे जाएं",
        home: "होम"
      },
      labels: {
        cropRecommendations: "फसल सिफारिशें",
        marketPrices: "मंडी भाव",
        yieldScore: "उपज व स्थिरता",
        language: "भाषा",
        theme: "थीम",
        light: "हल्का",
        dark: "गहरा",
        system: "सिस्टम",
        askAnything: "अपनी भाषा में पूछें…"
      }
    }
  }
};

const savedLang = (() => {
  try {
    return localStorage.getItem("agrivision.lang") || localStorage.getItem("i18nextLng") || "mr";
  } catch {
    return "mr";
  }
})();

// Default to Marathi ('mr') as per requirement for farmer-centric Indian context, with English and Hindi available
const initialLng = ["mr", "en", "hi"].includes(savedLang) ? savedLang : "mr";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false
});

export default i18n;
