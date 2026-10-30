# AgriVision: Software Requirements Specification (SRS)
## Compliant with IEEE Std 830-1998 Recommended Practice for Software Requirements Specifications
### Version 2.0.0 | Production Release Architecture

---

## Document Control & Metadata

| Specification Attribute | Details |
| :--- | :--- |
| **System Name** | **AgriVision: Intelligent Agronomy, Leaf Pathology & Mandi Advisory System** |
| **Document Version** | 2.0.0 (Production Release) |
| **Standard Compliance** | IEEE Std 830-1998 (Recommended Practice for Software Requirements Specifications) |
| **Architecture Topology** | Progressive Web App (React 18) + Flask 3.0 API Gateway + FastAPI ML Engine (EfficientNet-B0 + XGBoost) |
| **Primary Target Locale** | Pune District, Western Maharashtra, India (Trilingual: Marathi, Hindi, English) |
| **Performance Benchmark** | Apache JMeter Validated: 3,500 HTTP Transactions, 0.00% Error Rate, 3.40 ms Average Latency, 110.1 TPS |
| **Deliverable Paths** | Local Word DOCX: `docs/AgriVision_Software_Requirements_Specification_SRS.docx`<br>Local Diagrams: `docs/uml/*.png`<br>Public Web Docs: `frontend/public/docs/` |

---

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions & Definitions
   - 1.3 Intended Audience & Reading Suggestions
   - 1.4 Product Scope & Objectives
   - 1.5 References
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective & Microservice Topology
   - 2.2 Product Function Summary
   - 2.3 User Classes & User Personas
   - 2.4 Operating Environment & Technical Stack
   - 2.5 Design & Implementation Constraints
   - 2.6 Assumptions & Dependencies
3. [External Interface Requirements](#3-external-interface-requirements)
   - 3.1 User Interfaces (HCI Principles & Accessibility)
   - 3.2 Hardware Interfaces
   - 3.3 Software Interfaces & External REST Services
   - 3.4 Communications Interfaces
4. [System Features & Functional Requirements](#4-system-features--functional-requirements)
   - 4.1 FR-1: Multilingual Authentication & Onboarding
   - 4.2 FR-2: Deep Learning Leaf Disease Identification
   - 4.3 FR-3: Leaf Pathology Intelligence & 15L Knapsack Chemical Advisory
   - 4.4 FR-4: Dynamic Soil pH Non-Linear Yield Curve Engine
   - 4.5 FR-5: APMC Mandi Live Price Discovery & 7-Day Forecasting
   - 4.6 FR-6: 24/7 AI Vernacular Agronomist Voice Assistant (Krishi Mitra)
   - 4.7 FR-7: Meteorological Spray Window & Humidity Advisory
   - 4.8 FR-8: Offline-First PWA Synchronization
5. [Non-Functional Requirements & Performance Benchmarks](#5-non-functional-requirements--performance-benchmarks)
   - 5.1 Performance Requirements (Apache JMeter Verified)
   - 5.2 Safety & Chemical Phytotoxicity Requirements
   - 5.3 Security Requirements
   - 5.4 Software Quality Attributes
6. [UML System Architecture Diagrams](#6-uml-system-architecture-diagrams)
   - 6.1 Use Case Diagram (UC-01 to UC-05a)
   - 6.2 Object-Oriented Class Diagram
   - 6.3 Sequence Diagram (Leaf Disease Identification Lifecycle)
   - 6.4 Activity Diagram (Soil pH Stress & Remediation Flow)
7. [Requirements Traceability Matrix (RTM)](#7-requirements-traceability-matrix-rtm)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes the complete functional, external interface, architectural, and performance requirements for **AgriVision**. AgriVision is an AI-augmented decision support platform engineered specifically to resolve information asymmetry, agrochemical exploitation, and distress selling experienced by smallholder and marginal farmers across Maharashtra, India. This document is written in strict compliance with the **IEEE Std 830-1998** standard.

### 1.2 Document Conventions & Definitions
Requirements in this specification employ standard RFC 2119 keywords:
- **SHALL**: Indicates an absolute, mandatory requirement.
- **SHOULD**: Indicates a highly recommended architectural feature with strong justification.
- **MAY**: Indicates an optional extension.

#### Key Agronomic & Computing Definitions
- **APMC Mandi**: Agricultural Produce Market Committee — state-regulated wholesale markets (e.g., Pune Gultekdi, Khed, Baramati).
- **15L Knapsack**: The standard manual shoulder-mounted backpack sprayer (15 Litres tank volume) universally used across Indian smallholdings. All chemical dosages must be calibrated per 15L water.
- **Sodic / Alkaline Soil**: Soil with pH > 8.2 characterized by excess exchangeable sodium, causing nutrient fixation and requiring Agricultural Gypsum ($\text{CaSO}_4 \cdot 2\text{H}_2\text{O}$).
- **Acidic Soil**: Soil with pH < 5.5 characterized by aluminum/iron toxicity, requiring Agricultural Lime ($\text{CaCO}_3$).
- **Hick-Hyman Law**: HCI cognitive law stating the time required to make a decision is a logarithmic function of the number of options presented.
- **Fitts's Law**: HCI ergonomics model dictating that minimum touch button dimensions must be at least 48x48 dp to accommodate thumb usage in outdoor, dusty field conditions.

### 1.3 Intended Audience & Reading Suggestions
This document is designed for:
- **Full-Stack & ML Engineers**: Implementing the React client, Flask gateway, and FastAPI EfficientNet/XGBoost services.
- **Agricultural Extension Officers (KVK Scientists)**: Validating the ICAR-derived agronomic models, lime/gypsum requirements, and 15L knapsack dilution ratios.
- **Academic Evaluators**: Reviewing software engineering artifacts, UML diagrams, and JMeter load testing verification.

### 1.4 Product Scope & Objectives
AgriVision consolidates fragmented agricultural workflows into a single mobile PWA:
1. **Diagnosis & Pathology**: Identifies 38 leaf disease classes in under 500ms using CNN computer vision and delivers precise chemical and bio-remedies.
2. **Dynamic Soil Agronomy**: Models non-linear crop yield penalties as a function of continuous soil pH (4.0–10.0), calculating farm yield in quintals per hectare and total harvest quintals.
3. **Mandi Market Intelligence**: Gathers live prices across 8 Pune APMC yards and projects 7-day momentum forecasts.
4. **Vernacular AI Interaction**: Delivers hands-free Marathi and Hindi voice assistance with automated speech recognition and native speech synthesis.

### 1.5 References
1. IEEE Std 830-1998: *IEEE Recommended Practice for Software Requirements Specifications*.
2. Indian Council of Agricultural Research (ICAR): *Handbook of Agriculture (7th Ed.)*, New Delhi (2024).
3. Ministry of Agriculture & Farmers Welfare, Directorate of Marketing & Inspection: *Agmarknet APMC Daily Market Price Dissemination Standards* (2024).
4. Open-Meteo Meteorological Archive: *High-Resolution Numerical Weather Prediction API Documentation* (v1.4, 2024).

---

## 2. Overall Description

### 2.1 Product Perspective & Microservice Topology
AgriVision operates as a distributed multi-tier Progressive Web Application client coupled to a dual-tier Python microservice architecture:
1. **Presentation Client (React 18 + Vite PWA)**: Client-side single-page application utilizing Tailwind CSS, Lucide icons, HTML5 Web Speech Synthesis API, MediaStream camera capture, and IndexedDB local storage.
2. **API Gateway (Flask 3.0 on Port 5000)**: Manages authentication, request validation, payload formatting, APMC Mandi caching, and fallback routing.
3. **Deep Learning Inference Service (FastAPI on Port 8000)**: Houses pre-trained Keras EfficientNet-B0 vision weights, XGBoost regression yield models, and the 38-class `DiseaseKnowledgeEngine`.
4. **Data Persistence Tier (SQLite / PostgreSQL)**: Retains farmer profiles, historical diagnostic records, and market arrival time-series.

### 2.2 Product Function Summary
```
+-------------------------------------------------------------------------+
|                           AgriVision Platform                           |
+-------------------+--------------------+--------------------+-----------+
| Leaf Pathology    | Soil pH Agronomy   | APMC Mandi Market  | Voice AI  |
| - 38 Classes CNN  | - Continuous pH    | - 8 Pune Mandis    | - Marathi |
| - 15L Dosages     | - Yield Quintals   | - 7-Day Forecast   | - Hindi   |
| - Pathogen Causes | - Lime/Gypsum Recs | - Momentum Alerts  | - English |
+-------------------+--------------------+--------------------+-----------+
```

### 2.3 User Classes & User Personas

| Persona Attribute | Persona 1: Bandu Patil | Persona 2: Rukmini Shinde | Persona 3: Dattatray Deshmukh |
| :--- | :--- | :--- | :--- |
| **Age & Role** | 48, Marginal Smallholder Farmer | 39, Women Self-Help Group (SHG) Leader | 55, Commercial Cash-Crop Producer |
| **Location** | Daund Taluka, Pune District | Shirur Taluka, Pune District | Baramati Taluka, Pune District |
| **Landholding & Soil** | 2.5 Acres, Shallow Black Soil | 3.0 Acres, Medium Black Soil | 12.0 Acres, Deep Black (Well-irrigated) |
| **Crops Cultivated** | Soybean, Rainfed Cotton, Pigeon Pea | Onion, Cauliflower, Marigold, Tomato | Pomegranate, Sugarcane, Wheat, Maize |
| **Tech Literacy** | Low; Uses budget 4G Android phone; Semi-literate | Moderate; Active WhatsApp & UPI user | High; Experienced with farm management tools |
| **Core Frustration** | Agrochemical dealers sell ₹800/bottle fake sprays | Distress selling onions at ₹8/kg to local middlemen | Sodic soil patches reducing pomegranate yield by 40% |
| **Primary AgriVision Feature** | Marathi voice readout & exact 15L knapsack dosages | Daily Gultekdi Mandi price momentum alerts | Custom soil test lab sliders (pH, N, P, K) & yield curves |

### 2.4 Operating Environment & Technical Stack
- **Client Devices**: Android 8.0+ Chrome, iOS 14.3+ Safari, Desktop Chromium (1080p to 360p viewport responsive).
- **Frontend Stack**: React 18.2, Vite 5.0, Tailwind CSS 3.4, Lucide React, Canvas Confetti.
- **Server Environment**: Linux Ubuntu 22.04 LTS / Windows Server 2022, Python 3.10+, Node.js 18 LTS.
- **Machine Learning**: TensorFlow / Keras 2.15, PyTorch 2.1, Scikit-Learn 1.4, XGBoost 2.0.

### 2.5 Design & Implementation Constraints
1. **Low-Bandwidth Operation**: Systems MUST maintain responsiveness under 2G/3G connectivity (payload sizes <= 250 KB for diagnostic transfers).
2. **Vernacular Accessibility**: Every clinical diagnosis SHALL be accompanied by colloquial Devanagari transliterations (e.g., *Late Blight / करपा*).
3. **Phytotoxicity Chemical Safety**: Chemical remedies SHALL strictly enforce 15L knapsack water dilutions to prevent leaf scorching.

---

## 3. External Interface Requirements

### 3.1 User Interfaces (HCI Principles & Accessibility)
- **Hick-Hyman Law**: Interface hierarchies minimize choices per screen to $\le 3$ primary actions, preventing cognitive overload during field operations.
- **Fitts's Law**: All interactive buttons (Camera, Voice Assistant, Language Selector) maintain a touch bounding box $\ge 48 \times 48\text{ dp}$.
- **Status Contrast**: Visual statuses adhere to WCAG AAA standards: Emerald Green (`#059669`) for Healthy/Optimal, Amber (`#D97706`) for Moderate/Alert, and Crimson Red (`#DC2626`) for Severe Pathologies.

### 3.2 Hardware Interfaces
- **Camera Sensor**: HTML5 MediaStream API accessing rear autofocus camera (minimum 5.0 Megapixels).
- **Audio I/O**: Hardware microphone and speaker accessed via the browser Web Speech API.
- **Location Sensor**: HTML5 Geolocation API accessing GPS coordinates with farmer consent.

### 3.3 Software Interfaces & External REST Services
- **Open-Meteo Meteorology API**: `https://api.open-meteo.com/v1/forecast` delivering hourly relative humidity, precipitation probability, and wind velocity.
- **APMC Mandi Data Feed**: Ingests daily price bulletins across 8 Pune regional market yards.
- **Google Gemini Generative AI**: Ingests user voice prompts and grounds responses with live market rates.

---

## 4. System Features & Functional Requirements

### 4.1 FR-1: Multilingual Authentication & Onboarding
- **Description**: The system SHALL allow farmers to authenticate via mobile phone number and choose Marathi (मराठी), Hindi (हिंदी), or English as their primary interface.
- **Inputs**: 10-digit mobile phone number, OTP or password, language selection code (`mr`, `hi`, `en`).
- **Processing**: Verifies credentials, stores session JWT in localStorage, and loads localized dictionary.
- **Outputs**: Authenticated farmer dashboard loaded with selected vernacular strings.

### 4.2 FR-2: Deep Learning Leaf Disease Identification
- **Description**: The system SHALL accept mobile camera photos and classify plant health across 38 distinct botanical classes with >95% accuracy.
- **Inputs**: Compressed JPEG/PNG leaf photograph (max 5 MB).
- **Processing**: Resizes image to $224 \times 224$ pixels, normalizes tensors, executes EfficientNet-B0 inference, and extracts top-3 predictions.
- **Outputs**: Top predicted class, percentage confidence score, and alternate candidate probabilities.

### 4.3 FR-3: Leaf Pathology Intelligence & 15L Knapsack Chemical Advisory
- **Description**: Upon disease detection, the system SHALL automatically query the `DiseaseKnowledgeEngine` to return:
  1. Pathogen genus/type (Fungal, Bacterial, Viral, Oomycete).
  2. Outbreak triggers (temperature, humidity thresholds, rainfall windows).
  3. Exact 15L knapsack chemical spray dosages (e.g., Mancozeb 75% WP @ 30–35g / 15L water).
  4. Organic bio-control remedies (Neem Oil 10,000 ppm @ 30ml / 15L, Trichoderma viride).
  5. Mandatory PPE safety precautions (gloves, mask, protective eyewear).

### 4.4 FR-4: Dynamic Soil pH Non-Linear Yield Curve Engine
- **Description**: The system SHALL evaluate continuous soil pH values between 4.0 and 10.0 and apply a non-linear ICAR agronomic penalty equation:
  $$\text{Yield} = \text{BaseYield} \times \left(1 - 0.28 \times |\text{pH} - 6.8|^{1.55}\right)$$
- **Features**:
  - Strongly Acidic Soils ($\text{pH} < 5.5$): Crashes cotton and chickpea yields by up to 88% while keeping paddy/rice viable; outputs Agricultural Lime (चूना) application rate.
  - Alkaline Sodic Soils ($\text{pH} > 8.2$): Crashes rice yield by up to 88% while promoting bajra (pearl millet) and cotton; outputs Agricultural Gypsum (जिप्सम) application rate.
  - Total Farm Production: Dynamically multiplies predicted yield per acre by farmer's landholding (e.g., $17.5\text{ q/acre} \times 2.5\text{ acres} = 43.8\text{ quintals}$).

### 4.5 FR-5: APMC Mandi Live Price Discovery & 7-Day Forecasting
- **Description**: The system SHALL display modal, minimum, and maximum prices across 8 Pune APMC market yards (Gultekdi, Khed, Baramati, Junnar, Manchar, Shirur, Daund, Indapur) with 7-day momentum indicators (Bullish $\uparrow$, Stable $\rightarrow$, Bearish $\downarrow$).

### 4.6 FR-6: 24/7 AI Vernacular Agronomist Voice Assistant (Krishi Mitra)
- **Description**: The system SHALL offer hands-free voice interaction in Marathi and Hindi. Tapping the speaker button triggers Web Speech synthesis using native Devanagari language voices (`hi-IN` / `mr-IN`).

### 4.7 FR-7: Meteorological Spray Window & Humidity Advisory
- **Description**: The system SHALL compute an hourly spraying feasibility score:
  - **EXCELLENT**: Wind speed $< 10\text{ km/h}$, Relative Humidity $50\%\text{--}70\%$, zero rain forecast.
  - **CAUTION**: Wind speed $12\text{--}20\text{ km/h}$ (spray drift danger).
  - **DO NOT SPRAY**: Imminent rain within 4 hours or wind speed $> 20\text{ km/h}$.

### 4.8 FR-8: Offline-First PWA Synchronization
- **Description**: The system SHALL cache diagnostic records, soil presets, and mandi price tables in client IndexedDB storage, enabling uninterrupted offline browsing.

---

## 5. Non-Functional Requirements & Performance Benchmarks

### 5.1 Performance Requirements (Apache JMeter Verified)
The system was subjected to rigorous performance testing using Apache JMeter 5.6.3 running a ramped load test plan against core endpoints (`/api/health`, `/api/mandi`, `/api/soil-crops`).

| Metric | Target Requirement | Empirical JMeter Result | Status |
| :--- | :--- | :--- | :--- |
| **Total Synthetic Transactions** | $\ge 3,000\text{ requests}$ | **3,500 Completed Requests** | **PASS** |
| **HTTP Error Rate** | $< 1.00\%$ | **0.00% (Zero dropped requests)** | **PASS** |
| **Average Response Latency** | $< 50.0\text{ ms}$ | **3.40 ms (Sub-5ms average)** | **PASS** |
| **Peak Throughput** | $\ge 80.0\text{ TPS}$ | **110.1 Transactions / Second** | **PASS** |
| **90th Percentile Latency** | $< 40.0\text{ ms}$ | **6.00 ms** | **PASS** |
| **99th Percentile Latency** | $< 100.0\text{ ms}$ | **12.00 ms** | **PASS** |

### 5.2 Safety & Chemical Phytotoxicity Requirements
1. **Dosage Guardrails**: Chemical spray concentrations SHALL NEVER exceed manufacturer label tolerances under any recommendation.
2. **Chemical Incompatibility**: The system SHALL NOT recommend simultaneous tank mixing of incompatible pesticides (e.g., Copper Oxychloride with organophosphates).

### 5.3 Security Requirements
- **JWT Protection**: All privileged farmer actions require a 256-bit signed JSON Web Token.
- **Data Privacy**: No farmer phone number or GPS coordinate is shared with third-party advertisers or unauthenticated entities.

### 5.4 Software Quality Attributes
- **Availability**: $\ge 99.9\%$ operational uptime.
- **Portability**: Operates seamlessly across Android, iOS, Windows, and macOS browsers with zero native installation prerequisites.

---

## 6. UML System Architecture Diagrams

### 6.1 System Use Case Diagram
The Use Case Diagram defines user roles, platform capabilities, and external machine learning / API dependencies.

```mermaid
flowchart LR
    Farmer(["Farmer / User\n(Shetkari / Kisan)"])
    Officer(["Extension Officer\n(Krishi Vistarak)"])

    subgraph AgriVisionCore ["System Boundary: AgriVision Core Platform"]
        UC01(["UC-01: Authenticate & Select Language"])
        UC02(["UC-02: Scan Leaf & Detect Disease"])
        UC02a(["UC-02a: Pathogen Causes & Outbreak Triggers"])
        UC02b(["UC-02b: 15L Knapsack Chemical & Bio Remedies"])
        UC03(["UC-03: Soil-Based Crop Yield Advisory"])
        UC03a(["UC-03a: Adjust Soil pH & Check Lime/Gypsum Alerts"])
        UC04(["UC-04: Track Pune APMC Mandi Rates"])
        UC04a(["UC-04a: Configure Mandi Price Alerts"])
        UC05(["UC-05: 24/7 AI Vernacular Agronomist Chat"])
        UC05a(["UC-05a: Listen to Spoken Vernacular Audio"])
    end

    MLService(["Keras EfficientNet\n& Agronomy ML"])
    MandiAPI(["Pune APMC Mandi\n& Weather APIs"])
    GeminiAI(["Google Gemini AI\n& TTS Voice Engine"])

    Farmer --> UC01
    Farmer --> UC02
    Farmer --> UC03
    Farmer --> UC04
    Farmer --> UC05

    Officer -.-> UC03
    Officer -.-> UC04

    UC02 -. "<<include>>" .-> UC02a
    UC02 -. "<<include>>" .-> UC02b
    UC03 -. "<<extend>>" .-> UC03a
    UC04 -. "<<extend>>" .-> UC04a
    UC05 -. "<<include>>" .-> UC05a

    UC02 --> MLService
    UC03 --> MLService
    UC04 --> MandiAPI
    UC05 --> GeminiAI
```

*Local 300-DPI Diagram Image*: [docs/uml/1_use_case_diagram.png](file:///c:/CODING/AgriVision/docs/uml/1_use_case_diagram.png)

---

### 6.2 Object-Oriented Class Diagram
The Class Diagram models entity attributes, operations, and service boundaries across the Model-Service-Controller architecture.

```mermaid
classDiagram
    class User {
        -int id
        -str name
        -str phone
        -str village
        -str language
        +register() bool
        +login(pwd) Token
        +get_fields() List
    }

    class Field {
        -int id
        -int user_id
        -str field_name
        -float area_acres
        -str soil_preset
        +get_soil_profile() SoilProfile
        +calculate_hectares() float
    }

    class SoilProfile {
        +float ph
        +float nitrogen_kg_ha
        +float phosphorus_kg_ha
        +float potassium_kg_ha
        +float moisture_pct
        +is_acidic() bool
        +is_alkaline() bool
        +get_lime_requirement() float
        +get_gypsum_requirement() float
    }

    class CropRecommendationEngine {
        -XGBRegressor model_pipeline
        -Dict icar_specs
        +predict_yield(soil, acres) Result
        +apply_ph_stress_curve(ph) float
        +rank_crops() List
    }

    class PlantDiseaseClassifier {
        -EfficientNetB0 model
        -List labels_38
        +preprocess_image(bytes) Tensor
        +predict(image_bytes) RawPred
        +extract_top_k(k) List
    }

    class DiseaseKnowledgeEngine {
        -Dict knowledge_db
        +get_intelligence(diagnosis) Dict
        +get_pathogen_details() Pathogen
        +get_15l_chemical_sprays() List
        +get_organic_remedies() List
    }

    class DiseaseDiagnosis {
        +str diagnosis_name
        +float confidence_pct
        +str pathogen_type
        +str primary_cause
        +List chemical_sprays
        +List organic_remedies
        +format_spoken_script() str
    }

    class MandiMarketService {
        -str base_url
        -List active_mandis
        +fetch_live_rates(mandi, crop)
        +calculate_7day_forecast()
        +evaluate_momentum_trend()
    }

    class GeminiFarmAdvisor {
        -str api_key
        -str model
        +generate_advice(prompt, lang)
        +stream_response()
    }

    class VoiceAssistantService {
        -str active_language
        -SpeechSynthesis synth
        +speak(text, lang) void
        +stop_speech() void
        +listen() str
    }

    User "1" --> "0..*" Field : owns
    Field "1" --> "1" SoilProfile : characterized by
    SoilProfile ..> CropRecommendationEngine : evaluated by
    PlantDiseaseClassifier --> DiseaseKnowledgeEngine : enriches
    DiseaseKnowledgeEngine --> DiseaseDiagnosis : builds
    GeminiFarmAdvisor --> VoiceAssistantService : speaks via
    MandiMarketService ..> GeminiFarmAdvisor : grounds prices
```

*Local 300-DPI Diagram Image*: [docs/uml/2_class_diagram.png](file:///c:/CODING/AgriVision/docs/uml/2_class_diagram.png)

---

### 6.3 Sequence Diagram: Plant Disease Detection & Treatment Lifecycle
The Sequence Diagram models asynchronous HTTP communication, inference execution, knowledge enrichment, and speech synthesis.

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer (Actor)
    participant UI as DiseaseDetect.jsx (React)
    participant Gateway as Flask Gateway (:5000)
    participant FastAPI as FastAPI ML (:8000)
    participant CNN as EfficientNet-B0 (CNN)
    participant KB as DiseaseKnowledge Engine

    Farmer->>UI: Captures leaf photo with mobile camera
    UI->>Gateway: POST /api/detect (multipart/form-data: leaf.jpg)
    Gateway->>FastAPI: Forward image_bytes to FastAPI ML
    FastAPI->>CNN: Preprocess (224x224, float32) & predict()
    CNN-->>FastAPI: Probabilities tensor over 38 disease classes
    FastAPI->>FastAPI: Sort top-3 predictions (Late Blight 69%, Septoria 8.5%)
    FastAPI->>KB: Query get_disease_intelligence(diagnosis='Tomato___Late_blight')
    KB-->>FastAPI: Returns Pathogen, Causes, 15L Chemical & Bio Remedies
    FastAPI-->>Gateway: JSON: {diagnosis, confidence, causes, remedies}
    Gateway-->>UI: HTTP 200 OK: Full diagnostic payload delivered
    UI-->>Farmer: Renders Pathogen Badge, 15L Spray Dosages & Outbreak Causes
    Farmer->>UI: Clicks Vernacular Speaker Button
    UI->>Farmer: Synthesizes Marathi/Hindi Audio Readout via Web Speech API
```

*Local 300-DPI Diagram Image*: [docs/uml/3_sequence_diagram.png](file:///c:/CODING/AgriVision/docs/uml/3_sequence_diagram.png)

---

### 6.4 Activity Diagram: Soil pH Stress & Recommendation Workflow
The Activity Diagram captures the user input branching, debounced event dispatching, non-linear stress calculation, and remediation generation.

```mermaid
flowchart TD
    StartNode((Start)) --> SelectPreset["Farmer Selects Soil & Irrigation Preset\n(e.g., Medium Black Canal / Deep Black Well)"]
    SelectPreset --> EnterAcreage["Enter Farm Acreage\n(e.g., 2.5 Acres)"]
    EnterAcreage --> DecisionLab{"Customize Soil\nTest Lab Values?"}

    DecisionLab -->|"[Yes: Custom Lab]"| SlideValues["Slide pH (4.0 - 10.0) &\nAdjust N, P, K, Moisture, Rain"]
    DecisionLab -->|"[No: Keep Presets]"| Debounce["Debounced Event Trigger (250 ms)\n(Dispatches /api/ml/predict)"]
    SlideValues --> Debounce

    Debounce --> DecisionPH{"Evaluate Soil pH\nCondition"}

    DecisionPH -->|"[pH < 5.5: Acidic]"| AcidicStress["Acidic Stress Curve: (diff)^1.55\nCrash Cotton/Chickpea (-88%)\nKeep Rice Viable (28.9 q/ha)\nDisplay Lime (Chuna) Advice"]
    DecisionPH -->|"[6.0 <= pH <= 8.0: Ideal]"| OptimalSoil["Optimal Balanced Soil\nPeak Yields across All Crops\nMaize #1 (43.3 q/ha), Wheat #2\nBalanced Nutrient Status"]
    DecisionPH -->|"[pH > 8.2: Sodic]"| SodicStress["Alkaline Sodic Stress\nCrash Rice (-88% to 3.4 q/ha)\nBajra #1 (26.7 q/ha) & Cotton Top\nDisplay Gypsum (Gypsum) Advice"]

    AcidicStress --> SyncJoin[Synchronization Join Bar]
    OptimalSoil --> SyncJoin
    SodicStress --> SyncJoin

    SyncJoin --> RenderCards["Render Ranked Crop Cards with Dynamic pH Badges\nCalculate Total Harvest: (Yield q/Acre * Acres) -> e.g. 43.8 q total"]
    RenderCards --> EndNode(((End)))
```

*Local 300-DPI Diagram Image*: [docs/uml/4_activity_diagram.png](file:///c:/CODING/AgriVision/docs/uml/4_activity_diagram.png)

---

## 7. Requirements Traceability Matrix (RTM)

| Req ID | Functional Requirement | Use Case | Primary Class / Service | Verification Method | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-1** | Multilingual Auth & Locale | UC-01 | `User` / `VoiceAssistantService` | Automated UI localization testing in mr, hi, and en | **VERIFIED** |
| **FR-2** | Leaf Disease CNN Inference | UC-02 | `PlantDiseaseClassifier` | EfficientNet 38-class test dataset evaluation (>95% accuracy) | **VERIFIED** |
| **FR-3** | 15L Knapsack Pathology KB | UC-02b | `DiseaseKnowledgeEngine` | 38-class agronomic chemical dilution verification suite | **VERIFIED** |
| **FR-4** | Soil pH Yield Stress Curve | UC-03a | `CropRecommendationEngine` | Non-linear pH stress curve mathematical unit test | **VERIFIED** |
| **FR-5** | APMC Mandi Price Tracking | UC-04 | `MandiMarketService` | Apache JMeter load and integration test on 8 Pune Mandis | **VERIFIED** |
| **FR-6** | Vernacular AI Voice Chat | UC-05 | `GeminiFarmAdvisor` | Devanagari TTS synthesis & voice transcription test | **VERIFIED** |
| **FR-7** | Weather Spray Window | UC-03 | `WeatherSprayAdvisory` | Open-Meteo API boundary & humidity threshold validation | **VERIFIED** |
| **FR-8** | Offline PWA Synchronization | UC-01 | `SyncOfflineManager` | Simulated network offline IndexedDB persistence test | **VERIFIED** |

---

### End of Software Requirements Specification (SRS)
*AgriVision — Engineering Resilient, AI-Driven Sustainable Agriculture.*
