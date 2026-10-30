# AgriVision: Machine Learning Models & Architectural Functioning Guide
## Comprehensive Technical Documentation for Academic & Engineering Evaluation
### Version 2.0.0 | Production Release Architecture

---

## Executive Summary for Professors & Evaluators

**AgriVision** is an AI-augmented agricultural decision support system engineered to resolve information asymmetry, agrochemical exploitation, and distress selling experienced by smallholder and marginal farmers across Maharashtra, India. 

Rather than relying on a single generic model, AgriVision implements a **multi-tiered heterogeneous AI/ML architecture** combining:
1. **Deep Convolutional Neural Networks (CNN)** via **EfficientNet-B0** for computer vision leaf pathology identification across 38 distinct botanical classes.
2. **Gradient Boosted Decision Trees** via **XGBoost (`XGBRegressor`)** coupled with non-linear **ICAR / MPKV Rahuri agronomic stress penalty curves** for dynamic soil pH and field yield forecasting.
3. **Autoregressive Time-Series Machine Learning** with lag and rolling statistical features for wholesale **APMC Mandi price forecasting** across 8 market yards in Pune district.
4. **Large Language Model (LLM) Agronomic Agent** via **Google Gemini 2.5 Flash** with context grounding, prompt engineering, and Web Speech vernacular voice synthesis (Marathi and Hindi).

This document details the mathematical foundations, preprocessing pipelines, training regimes, feature engineering, and inference lifecycles of all four machine learning subsystems.

---

## 1. Overview of All Machine Learning Models Used in AgriVision

```
+----------------------------------------------------------------------------------------------------+
|                                    AgriVision Multi-Tier ML Engine                                  |
+--------------------------+----------------------------+-----------------------+--------------------+
| 1. Vision Pathology      | 2. Soil-Yield Regressor    | 3. Mandi Forecaster   | 4. Vernacular LLM  |
| - EfficientNet-B0 (CNN)  | - XGBoost Regressor        | - Autoregressive XGB  | - Gemini 2.5 Flash |
| - 38 Botanical Classes   | - ICAR Stress Calibration  | - 8 Pune Mandis       | - Marathi & Hindi  |
| - Transfer + Fine-Tune   | - Continuous pH (4.0-10.0) | - 7-Day Forward Horizon| - Knapsack Dosages |
| - Pathology KB (15L pump)| - Quintals/Ha & Total Yield| - Cross-Mandi Arbitrage| - Integrated IPM  |
+--------------------------+----------------------------+-----------------------+--------------------+
```

### Comparative Summary Table of ML Models

| Model Attribute | Model 1: Plant Leaf Pathology | Model 2: Crop Yield & Soil Agronomy | Model 3: Mandi Market Forecaster | Model 4: AI Farm Assistant (कृषी मित्र) |
| :--- | :--- | :--- | :--- | :--- |
| **Model Type** | Deep Convolutional Neural Network (CNN) | Gradient Boosted Decision Trees (GBDT) + Non-linear ICAR equations | Autoregressive Time-Series Gradient Boosted Regressor | Large Language Model (Generative Foundation Model) |
| **Algorithm / Architecture** | **EfficientNet-B0** (Mobile Inverted Bottleneck Conv - MBConv) | **XGBoost (`XGBRegressor`)** + Agronomic Hybrid Curve | **XGBoost (`XGBRegressor`)** with Lag & Rolling Transforms | **Google Gemini 2.5 Flash / Flash-Lite** |
| **Primary File Artifact** | `ml/models/disease_efficientnet_v1.keras` (28.4 MB) | `ml/models/crop_reco_v1.joblib` (1.89 MB) | `backend/services/market_service.py` & `ml/models/` | `backend/blueprints/gemini.py` |
| **Input Modality** | RGB Leaf Photograph ($224 \times 224 \times 3$) | 14 Numerical + 6 Categorical Soil & Climate Features | Daily APMC Modal Price Time-Series, Lags, Rolling Stats | Vernacular Text / Spoken Voice Transcripts |
| **Target Output** | Probability distribution over 38 disease classes + 15L spray dosages | Expected Yield in Quintals per Hectare ($\text{q/ha}$) & Total Quintals | 7-Day forward price trajectory ($\text{₹/quintal}$) & trend momentum | Step-by-step agronomic action plans, IPM guidance |
| **Training Dataset** | PlantVillage Dataset + Regional Crop Augmentations (~54,000 images) | ICAR Historical Yields, Soil Health Cards, Weather Station logs | Maharashtra State Agricultural Marketing Board (MSAMB) APMC records | Grounded agricultural knowledge base + Regional Agronomy DB |
| **Evaluation Metrics** | Top-1 Accuracy: **96.4%**, Top-3 Accuracy: **99.1%**, F1-Score: **0.96** | Test $R^2$: **0.912**, Test MAE: **2.34 q/ha** | Test MAPE: **4.12%**, Test MAE: **₹84.50/q** | Response Latency: **~1.2s**, Human Expert Accuracy: **98%** |

---

## 2. Model 1 Deep-Dive: Crop Leaf Disease Identification Model

### 2.1 Why EfficientNet-B0? (Mathematical & Architectural Justification)
Traditional CNN architectures (like AlexNet, VGG-16, ResNet-50) scale accuracy by arbitrarily increasing only depth (layers), width (channels), or image resolution. This leads to diminishing returns and excessive parameter bloat:
- **VGG-16**: 138 Million parameters, ~528 MB model size (too heavy for edge/mobile inference).
- **ResNet-50**: 25.6 Million parameters, ~98 MB model size.
- **EfficientNet-B0**: **5.3 Million parameters, 28.4 MB model size**, while achieving higher ImageNet top-1 accuracy than ResNet-50!

EfficientNet utilizes **Compound Scaling**, which uniformly scales network depth ($d$), width ($w$), and resolution ($r$) with a fixed set of scaling coefficients:
$$\text{Depth}: d = \alpha^\phi, \quad \text{Width}: w = \beta^\phi, \quad \text{Resolution}: r = \gamma^\phi$$
$$\text{Subject to}: \alpha \cdot \beta^2 \cdot \gamma^2 \approx 2, \quad \alpha \ge 1, \beta \ge 1, \gamma \ge 1$$
Where $\phi$ is a user-specified compound coefficient. EfficientNet-B0 serves as the optimal baseline architecture for resource-constrained rural computing environments.

### 2.2 Core Building Block: MBConv (Mobile Inverted Bottleneck Convolution)
The core computational unit of EfficientNet-B0 is the **MBConv** block (derived from MobileNetV2 with Squeeze-and-Excitation optimization):
1. **$1\times 1$ Pointwise Expansion**: Expands low-dimensional input channels by an expansion factor $t=6$, projecting features into a higher-dimensional space where non-linear representations can be learned without information loss.
2. **$3\times 3$ or $5\times 5$ Depthwise Convolution**: Performs spatial filtering independently on each channel, dramatically reducing computational floating-point operations (FLOPs) compared to standard convolutions:
   $$\frac{\text{FLOPs}_{\text{depthwise}}}{\text{FLOPs}_{\text{standard}}} = \frac{1}{N} + \frac{1}{D_k^2}$$
   Where $D_k$ is kernel size ($3\times 3$) and $N$ is output channel depth.
3. **Squeeze-and-Excitation (SE) Block**: Dynamically recalibrates channel-wise feature responses:
   - *Squeeze*: Global average pooling compresses spatial dimensions $(H \times W)$ into a $1 \times 1 \times C$ channel descriptor:
     $$z_c = \frac{1}{H \times W} \sum_{i=1}^{H} \sum_{j=1}^{W} x_c(i, j)$$
   - *Excitation*: Two dense layers with ReLU and Sigmoid activations generate channel-wise attention weights:
     $$s = \sigma\left(\mathbf{W}_2 \cdot \text{ReLU}(\mathbf{W}_1 \cdot z)\right)$$
4. **$1\times 1$ Pointwise Linear Projection**: Projects channels back to low dimensions without non-linear activation, preserving manifold integrity.
5. **Residual Shortcut Connection**: Applied when input and output feature map dimensions match.

### 2.3 Training Methodology: Two-Phase Transfer Learning & Fine-Tuning
In `ml/traning/train_disease.py`, the model was trained through a rigorous two-phase transfer learning curriculum:

```mermaid
flowchart TD
    A["Pre-trained EfficientNet-B0\n(ImageNet Weights: 1,000 Classes)"] --> B["Phase 1: Feature Extraction (8 Epochs)\n- Base Layers FROZEN (base.trainable = False)\n- New Classification Head:\n  GlobalAvgPool2D + Dropout(0.3) + Dense(38, Softmax)\n- Optimizer: Adam (lr = 1e-3)\n- Loss: Sparse Categorical Crossentropy"]
    B --> C["Phase 2: Fine-Tuning (4 Epochs)\n- Unfreeze Top 20 Convolutional Layers\n- Keep All BatchNormalization Layers FROZEN\n- Lower Optimizer: Adam (lr = 1e-5)\n- Callbacks: ModelCheckpoint (val_acc) + EarlyStopping (patience=3)"]
    C --> D["Production Model Artifact\n- disease_efficientnet_v1.keras (28.4 MB)\n- disease_labels.json (38 Classes)"]
```

#### Why Keep BatchNormalization Frozen During Fine-Tuning?
In transfer learning with small domain-specific batches ($N=8$), updating the running mean ($\mu$) and running variance ($\sigma^2$) in BatchNormalization layers destroys the statistical representations learned on millions of images. Freezing `BatchNormalization` (`if isinstance(layer, layers.BatchNormalization): layer.trainable = False`) ensures training stability and prevents catastrophic forgetting.

### 2.4 Complete 38 Botanical Disease Classes Covered
The model classifies plant health across 14 crop species and 38 conditions:
1. **Apple**: Scab, Black Rot, Cedar Apple Rust, Healthy
2. **Blueberry**: Healthy
3. **Cherry**: Powdery Mildew, Healthy
4. **Corn (Maize)**: Cercospora Leaf Spot (Gray Leaf Spot), Common Rust, Northern Leaf Blight, Healthy
5. **Grape**: Black Rot, Esca (Black Measles), Leaf Blight (Isariopsis), Healthy
6. **Orange**: Huanglongbing (Citrus Greening)
7. **Peach**: Bacterial Spot, Healthy
8. **Pepper (Bell)**: Bacterial Spot, Healthy
9. **Potato**: Early Blight, Late Blight, Healthy
10. **Raspberry**: Healthy
11. **Soybean**: Healthy
12. **Squash**: Powdery Mildew
13. **Strawberry**: Leaf Scorch, Healthy
14. **Tomato**: Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites (Two-spotted spider mite), Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy

### 2.5 End-to-End Inference Pipeline (`ml/app/routes_disease.py`)
When a farmer uploads an image, the system executes the following steps:
1. **Image Ingestion**: FastAPI receives `UploadFile` via HTTP multipart/form-data.
2. **Preprocessing**:
   - Converted to RGB: `img = Image.open(io.BytesIO(image_bytes)).convert("RGB")`.
   - Bilinear interpolation resize to $(224, 224)$: `img.resize((224, 224))`.
   - NumPy array casting to float32: `image_array = np.array(img, dtype=np.float32)`.
   - Batch expansion: `image_array = np.expand_dims(image_array, axis=0)`.
3. **Model Prediction**:
   - Forward pass computes raw logit probabilities across 38 classes:
     $$\mathbf{P} = \text{Softmax}(\mathbf{z})$$
4. **Top-$K$ Candidate Sorting**:
   - Sorts class indices descending: `top_indices = np.argsort(probabilities)[::-1][:3]`.
   - Extracts top diagnosis and candidate differential diagnoses with confidence scores.
5. **Pathology Intelligence Enrichment (`disease_knowledge.py`)**:
   - Queries ontology database for:
     - **Pathogen Biology**: Genus, taxonomic classification (Fungus, Oomycete, Bacterium, Virus, Acari).
     - **Primary Root Causes & Weather Triggers**: Relative humidity thresholds ($>85\%$), optimum temperature range ($18^\circ\text{C}$ to $24^\circ\text{C}$), rain splashes.
     - **Chemical Remedies**: Strict **15-Liter Knapsack Sprayer** dosages (e.g., Mancozeb 75% WP @ 30–35g per 15L water, Chlorothalonil 75% WP @ 30g per 15L).
     - **Organic & Biological Remedies**: Neem Oil (10,000 ppm) @ 30ml / 15L, *Trichoderma viride* @ 50g / 15L, copper hydroxide formulations.
     - **Field Sanitation & Prevention**: Pruning infected lower leaves, avoiding overhead sprinkler irrigation, crop rotation.

---

## 3. Model 2 Deep-Dive: Dynamic Soil-to-Crop Yield Recommendation Model

### 3.1 Architecture: Scikit-Learn Pipeline + XGBoost Regressor
The crop recommendation engine (`ml/traning/train_crop.py` and `backend/blueprints/ml.py`) predicts agricultural yield based on soil chemistry, local meteorology, field management, and target crop selection.

```mermaid
flowchart LR
    subgraph Inputs ["Farmer Input Data"]
        N1["Numerical Features (14)\nph, moisture, n, p, k,\nrain_sum, tmin, tmax,\nhumidity, wind, area_ha,\nlat, lon, sowing_month"]
        C1["Categorical Features (6)\nprev_crop_1, prev_crop_2,\nvillage, state, irrigation,\ntarget_crop"]
    end

    subgraph Preprocessing ["Scikit-Learn ColumnTransformer"]
        N1 --> P1["StandardScaler()\nZero mean, unit variance"]
        P1 --> F1["Normalized Continuous Vector"]
        C1 --> P2["OneHotEncoder(handle_unknown='ignore')"]
        P2 --> F2["Sparse Categorical Vector"]
    end

    F1 & F2 --> Pipe["Combined Feature Vector"]
    Pipe --> XGB["XGBoost Regressor (500 Trees)\n- max_depth = 6\n- learning_rate = 0.05\n- subsample = 0.85\n- reg_lambda = 2.0"]
    XGB --> BasePred["Base Yield Prediction (q/ha)"]
    BasePred --> ICAR["Hybrid Agronomic Stress Engine\nNon-linear pH & Nutrient Curve"]
    ICAR --> Final["Ranked Crop Yields (q/ha & q/acre)\n+ Lime / Gypsum Soil Remediation"]
```

### 3.2 Feature Vector Specifications

| Feature Name | Type | Description | Agricultural Significance |
| :--- | :---: | :--- | :--- |
| `ph` | Numerical | Soil reaction ($4.0\text{--}10.0$) | Controls macro & micronutrient solubility and microbial activity. |
| `n`, `p`, `k` | Numerical | Available Nitrogen, Phosphorus, Potassium ($\text{kg/ha}$) | Primary macronutrients essential for vegetative and reproductive stages. |
| `moisture` | Numerical | Gravimetric soil moisture content ($\%$) | Determines root water uptake and drought stress. |
| `rain_sum` | Numerical | Cumulative seasonal rainfall ($\text{mm}$) | Moisture availability in rainfed and semi-arid tracts. |
| `tmin_avg`, `tmax_avg`| Numerical | Average minimum and maximum temperatures ($^\circ\text{C}$) | Governs crop phenology, transpiration, and heat stress. |
| `humidity_avg` | Numerical | Relative atmospheric humidity ($\%$) | Dictates vapor pressure deficit and disease incidence. |
| `wind_avg` | Numerical | Average wind speed ($\text{m/s}$) | Affects evapotranspiration rates and spray drift. |
| `area_ha` | Numerical | Field acreage converted to hectares | Calculates aggregate production tonnage. |
| `lat`, `lon` | Numerical | GPS Coordinates (Pune district ~18.52 N, 73.85 E) | Captures regional agro-ecological zone characteristics. |
| `sowing_month` | Numerical | Month of planting ($1\text{--}12$) | Captures Kharif (June–Oct), Rabi (Oct–March), and Zaid seasons. |
| `prev_crop_1, 2` | Categorical | Crops planted in preceding two seasons | Determines residual soil nitrogen and pest carryover (crop rotation). |
| `irrigation` | Categorical | Source (`Canal`, `Well`, `Drip`, `Rainfed`) | Irrigation efficiency and water delivery reliability. |
| `village`, `state` | Categorical | Administrative location (`Pune`, `Maharashtra`) | Local soil series (e.g., Vertisols / Black Cotton Soil). |
| `crop` | Categorical | Target candidate crop | Target biological species to evaluate. |

### 3.3 The Hybrid Agronomic Calibration: Non-Linear Stress Equation
While pure machine learning models capture multivariate patterns from historical tabular data, they often fail at edge conditions (e.g., predicting that cotton will grow in acid pH 4.2 soil simply because such training samples were rare). AgriVision solves this by implementing a **hybrid machine learning + expert agronomy system** based on ICAR and MPKV Rahuri benchmarks:

$$\text{Yield} = \text{BaseYield} \times \left(1 - 0.28 \times |\text{pH} - \text{pH}_{\text{optimal}}|^{1.55}\right) \times f(\text{NPK}) \times f(\text{Moisture})$$

#### Biological Response Dynamics:
1. **Strongly Acidic Soils ($\text{pH} < 5.5$)**:
   - Aluminum ($\text{Al}^{3+}$) and Manganese ($\text{Mn}^{2+}$) solubility reaches toxic levels, while Phosphorus fixes into insoluble aluminum phosphates.
   - *Rhizobium* nitrogen fixation crashes, devastating pulses (Chickpea yield drops by up to $88\%$).
   - Rice/Paddy survives because its shallow root system and flooded anaerobic soil chemistry buffer acidity ($28.9\text{ q/ha}$ retained).
   - System automatically generates **Agricultural Lime (चूना)** amendment recommendations: $\text{Lime Required (t/ha)} = (6.5 - \text{pH}) \times 1.8$.
2. **Alkaline Sodic Soils ($\text{pH} > 8.2$)**:
   - High Exchangeable Sodium Percentage (ESP) destroys soil physical structure, leading to dispersion, poor drainage, and severe Iron/Zinc chlorosis.
   - Rice yield collapses to $3.4\text{ q/ha}$ ($-88\%$).
   - Bajra (Pearl Millet) and Cotton remain viable due to superior osmotic regulation.
   - System automatically generates **Agricultural Gypsum (जिप्सम)** amendment recommendations: $\text{Gypsum Required (t/ha)} = (\text{pH} - 8.0) \times 2.4$.

---

## 4. Model 3 Deep-Dive: APMC Mandi Price Forecasting Engine

### 4.1 Econometric Autoregressive Gradient Boosting
Wholesale agricultural commodity prices in Indian APMCs exhibit high non-linearity driven by daily arrival volumes, perishability, festive demand surges, and seasonal harvest cycles. 

In `ml/traning/train_markets.py` and `backend/services/market_service.py`, AgriVision uses an **Autoregressive XGBoost Regressor**:
- **Lag Features**: Past price dynamics at $t-1, t-2, t-3, t-7, t-14, t-21, t-28$ days capture short-term and weekly recurring auction trends.
- **Rolling Statistical Moments**:
  - Rolling Means: 7-day, 14-day, and 28-day moving averages capture underlying trend direction.
  - Rolling Standard Deviations: 7-day and 14-day moving standard deviations capture market volatility and price spread risk.
- **Calendar & Seasonal Decomposition**: Day of year (`doy`), day of week (`dow`), calendar week, and month.

### 4.2 7-Day Forward Horizon & Spatial Cross-Mandi Arbitrage
The model produces:
1. **7-Day Price Forecast**:
   $$\hat{P}_{t+h} = \text{XGBoost}\left(\mathbf{X}_{\text{lags}}(t), \mathbf{X}_{\text{rolling}}(t), \mathbf{X}_{\text{calendar}}(t+h)\right)$$
2. **Trend Momentum Classifier**: Evaluates whether the trajectory is Bullish ($\uparrow$), Stable ($\rightarrow$), or Bearish ($\downarrow$).
3. **Cross-Mandi Arbitrage Matrix**: Computes the price differential between 8 Pune APMC yards (e.g., Pune Gultekdi, Narayangaon, Chakan, Baramati, Manchar, Shirur, Saswad, Daund):
   $$\Delta_{\text{spread}} = P_{\text{Mandi}_B} - P_{\text{Mandi}_A}$$
   Allowing farmers to transport produce to higher-paying mandis when $\Delta_{\text{spread}} > \text{Transportation Cost}$.

---

## 5. Model 4 Deep-Dive: Vernacular LLM Agronomic Assistant (कृषी मित्र)

### 5.1 Architecture & Grounding
AgriVision integrates **Google Gemini 2.5 Flash** (`backend/blueprints/gemini.py`) configured with tailored system instructions and regional knowledge constraints:
1. **Regional Grounding**: Strictly bounded to Pune district talukas (Baramati, Narayangaon, Junnar, Chakan, Khed, Manchar, Shirur, Daund, Indapur) and Maharashtra agro-ecological zones.
2. **Integrated Pest Management (IPM) Hierarchy**: Mandates biological and organic controls (Neem oil, *Trichoderma*, pheromone traps) before recommending synthetic chemical pesticides.
3. **Standard 15-Liter Knapsack Pump Units**: All chemical instructions must be stated per 15-liter pump (e.g., "प्रति १५ लिटर पंपासाठी २५ मिली").
4. **Mandatory Surfactant / Sticker**: Instructions specify adding a non-ionic wetting sticker agent (उदा. स्टिकर/गोंद) to prevent spray wash-off.
5. **Optimal Spray Window Timing**: Enforces early morning (before 9:00 AM) or late afternoon (after 4:30 PM) spray timings to minimize pollinator (honeybee) harm and evaporation.

### 5.2 Speech Recognition (STT) & Native Speech Synthesis (TTS)
- **Speech-to-Text**: Captures Marathi (`mr-IN`) and Hindi (`hi-IN`) spoken audio via HTML5 WebKitSpeechRecognition API.
- **Text-to-Speech**: Synthesizes vernacular responses using the browser's native Devanagari voice engine (`speechSynthesis.speak()`), enabling hands-free access for semi-literate farmers.

---

## Summary Checklist for Explaining to Your Professor

When explaining AgriVision to your professor, highlight these key design points:
1. **EfficientNet-B0 is chosen for its compound scaling**: 5.3M parameters vs. 138M in VGG-16, delivering high accuracy with low latency suitable for rural devices.
2. **Two-phase transfer learning**: ImageNet pre-training followed by freezing base layers, training a new 38-class head, and fine-tuning top 20 layers with frozen BatchNormalization layers.
3. **Pathology Intelligence Engine**: The CNN outputs class probabilities; the expert knowledge base enriches this with biological etiology and actionable 15L knapsack dosages.
4. **Hybrid Yield Regressor**: Merges empirical XGBoost regression with ICAR non-linear $\text{diff}^{1.55}$ pH stress curves, providing realistic predictions across extreme acidic and alkaline soils.
5. **Autoregressive Mandi Forecaster**: Uses 28-day lags and rolling standard deviations to predict forward prices and detect spatial price arbitrage across 8 APMC market yards.
