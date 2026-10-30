"""
AgriVision Professional UML Diagram Generator
Generates publication-quality, 300-DPI software engineering diagram images:
1. Use Case Diagram
2. Detailed Class Diagram
3. Sequence Diagram (Plant Disease Diagnosis & Treatment Flow)
4. Activity Diagram (Dynamic Soil pH & Crop Yield Recommendation Workflow)
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from pathlib import Path
import shutil

matplotlib.rcParams['font.family'] = 'sans-serif'
matplotlib.rcParams['font.sans-serif'] = ['Segoe UI', 'DejaVu Sans', 'Arial', 'Helvetica']

OUTPUT_DIR = Path("docs/uml")
PUBLIC_DIR = Path("frontend/public/docs/uml")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)


# ==============================================================================
# 1. USE CASE DIAGRAM
# ==============================================================================
def draw_use_case_diagram():
    fig, ax = plt.subplots(figsize=(18, 12), dpi=300)
    ax.set_xlim(0, 18)
    ax.set_ylim(0, 12)
    ax.axis('off')

    # Background
    fig.patch.set_facecolor('#F8FAF9')
    ax.set_facecolor('#F8FAF9')

    # Title & Header
    ax.text(9, 11.5, "AgriVision: Use Case Diagram", fontsize=20, fontweight='bold',
            ha='center', color='#064E3B')
    ax.text(9, 11.15, "IEEE 830 Standard Software Engineering Architecture | Smallholder Farmer Platform",
            fontsize=11, ha='center', color='#047857', fontstyle='italic')

    # System Boundary Box
    sys_box = patches.FancyBboxPatch((3.8, 0.6), 10.4, 10.2, boxstyle="round,pad=0.3",
                                    ec='#059669', fc='#FFFFFF', lw=2.5, zorder=1)
    ax.add_patch(sys_box)
    ax.text(4.2, 10.5, "System Boundary: AgriVision Core Platform", fontsize=12,
            fontweight='bold', color='#065F46', bbox=dict(boxstyle="round,pad=0.2", fc='#D1FAE5', ec='#059669', lw=1))

    # Helper: Draw Actor
    def draw_actor(x, y, label, role):
        # Head
        head = patches.Circle((x, y + 0.5), 0.22, ec='#1F2937', fc='#F3F4F6', lw=2, zorder=4)
        ax.add_patch(head)
        # Body
        ax.plot([x, x], [y + 0.28, y - 0.25], color='#1F2937', lw=2.2, zorder=4)
        # Arms
        ax.plot([x - 0.35, x + 0.35], [y + 0.1, y + 0.1], color='#1F2937', lw=2.2, zorder=4)
        # Legs
        ax.plot([x, x - 0.25], [y - 0.25, y - 0.65], color='#1F2937', lw=2.2, zorder=4)
        ax.plot([x, x + 0.25], [y - 0.25, y - 0.65], color='#1F2937', lw=2.2, zorder=4)
        # Label
        ax.text(x, y - 0.95, label, fontsize=11, fontweight='bold', ha='center', color='#111827', zorder=4)
        ax.text(x, y - 1.2, f"<<{role}>>", fontsize=8.5, ha='center', color='#4B5563', zorder=4)

    # Helper: Draw Use Case Ellipse
    def draw_use_case(cx, cy, w, h, title, code, fc='#ECFDF5', ec='#059669'):
        el = patches.Ellipse((cx, cy), w, h, fc=fc, ec=ec, lw=1.8, zorder=3)
        ax.add_patch(el)
        ax.text(cx, cy + 0.12, code, fontsize=8.5, fontweight='bold', ha='center', color='#047857', zorder=4)
        ax.text(cx, cy - 0.12, title, fontsize=9.5, fontweight='bold', ha='center', color='#1F2937', zorder=4,
                multialignment='center')

    # Draw Primary Actor (Left)
    draw_actor(1.8, 6.2, "Farmer / User\n(Shetkari / Kisan)", "Primary Actor")
    draw_actor(1.8, 2.2, "Agricultural Officer\n(Krishi Vistarak)", "Secondary Actor")

    # Draw External Secondary Actors / Services (Right)
    draw_actor(16.2, 8.5, "Keras EfficientNet\n& Agronomy Models", "Inference Service")
    draw_actor(16.2, 5.2, "Pune APMC Mandi\n& Open-Meteo APIs", "External Data Source")
    draw_actor(16.2, 2.0, "Gemini Generative AI\n& Voice Assistant", "Intelligence Engine")

    # Use Cases within boundary
    cases = [
        # (cx, cy, w, h, title, code, fc, ec)
        (6.0, 9.4, 3.6, 1.1, "Authenticate & Select Language\n(Hindi / Marathi / English)", "UC-01", '#F0FDF4', '#10B981'),
        (6.0, 7.6, 3.6, 1.2, "Scan Crop Leaf & Detect Disease\n(Photo Capture / Upload)", "UC-02", '#ECFDF5', '#059669'),
        (10.8, 8.5, 3.4, 1.05, "Retrieve Pathogen Causes &\nWeather Outbreak Triggers", "UC-02a", '#FEF2F2', '#EF4444'),
        (10.8, 7.0, 3.4, 1.05, "Get 15L Knapsack Chemical\n& Organic Bio-Remedies", "UC-02b", '#EFF6FF', '#3B82F6'),
        (6.0, 5.4, 3.6, 1.2, "Obtain Soil-Based Crop Yield\nAdvisory (Quintals/Ha & Total)", "UC-03", '#ECFDF5', '#059669'),
        (10.8, 5.4, 3.4, 1.05, "Adjust Live Soil pH (4.0-10.0)\n& Check Lime/Gypsum Alerts", "UC-03a", '#FFFBEB', '#F59E0B'),
        (6.0, 3.5, 3.6, 1.1, "Track Pune APMC Mandi Rates\n& 7-Day Forecast Momentum", "UC-04", '#F0FDF4', '#10B981'),
        (10.8, 3.6, 3.4, 1.0, "Configure Harvest Mandi\nPrice Volatility Alert", "UC-04a", '#FEF3C7', '#D97706'),
        (6.0, 1.8, 3.6, 1.1, "24/7 AI Farm Advisor Chat\n(Krishi Mitra Marathi/Hindi)", "UC-05", '#F5F3FF', '#8B5CF6'),
        (10.8, 1.9, 3.4, 1.0, "Listen to Spoken Advice\n(Text-to-Speech Engine)", "UC-05a", '#EDE9FE', '#7C3AED'),
    ]

    for cx, cy, w, h, title, code, fc, ec in cases:
        draw_use_case(cx, cy, w, h, title, code, fc, ec)

    # Actor Association Lines (Farmer to Primary Use Cases)
    farmer_pos = (1.8, 6.2)
    ax.annotate("", xy=(4.2, 9.4), xytext=farmer_pos, arrowprops=dict(arrowstyle="-", color='#374151', lw=1.5))
    ax.annotate("", xy=(4.2, 7.6), xytext=farmer_pos, arrowprops=dict(arrowstyle="-", color='#374151', lw=1.5))
    ax.annotate("", xy=(4.2, 5.4), xytext=farmer_pos, arrowprops=dict(arrowstyle="-", color='#374151', lw=1.5))
    ax.annotate("", xy=(4.2, 3.5), xytext=farmer_pos, arrowprops=dict(arrowstyle="-", color='#374151', lw=1.5))
    ax.annotate("", xy=(4.2, 1.8), xytext=farmer_pos, arrowprops=dict(arrowstyle="-", color='#374151', lw=1.5))

    # Extension Officer connections
    officer_pos = (1.8, 2.2)
    ax.annotate("", xy=(4.2, 5.4), xytext=officer_pos, arrowprops=dict(arrowstyle="-", color='#6B7280', lw=1.2, ls='--'))
    ax.annotate("", xy=(4.2, 3.5), xytext=officer_pos, arrowprops=dict(arrowstyle="-", color='#6B7280', lw=1.2, ls='--'))

    # <<include>> and <<extend>> Relationships
    # UC-02 -> UC-02a (include)
    ax.annotate("", xy=(9.1, 8.3), xytext=(7.8, 7.9),
                arrowprops=dict(arrowstyle="->", color='#DC2626', lw=1.4, ls='--'))
    ax.text(8.4, 8.35, "<<include>>", fontsize=8, color='#DC2626', fontweight='bold', rotation=18)

    # UC-02 -> UC-02b (include)
    ax.annotate("", xy=(9.1, 7.1), xytext=(7.8, 7.4),
                arrowprops=dict(arrowstyle="->", color='#2563EB', lw=1.4, ls='--'))
    ax.text(8.4, 7.05, "<<include>>", fontsize=8, color='#2563EB', fontweight='bold', rotation=-14)

    # UC-03 -> UC-03a (extend)
    ax.annotate("", xy=(7.8, 5.4), xytext=(9.1, 5.4),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.4, ls='--'))
    ax.text(8.45, 5.55, "<<extend>>", fontsize=8, color='#D97706', fontweight='bold')

    # UC-04 -> UC-04a (extend)
    ax.annotate("", xy=(7.8, 3.55), xytext=(9.1, 3.58),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.4, ls='--'))
    ax.text(8.45, 3.75, "<<extend>>", fontsize=8, color='#D97706', fontweight='bold')

    # UC-05 -> UC-05a (include)
    ax.annotate("", xy=(9.1, 1.88), xytext=(7.8, 1.83),
                arrowprops=dict(arrowstyle="->", color='#7C3AED', lw=1.4, ls='--'))
    ax.text(8.45, 2.05, "<<include>>", fontsize=8, color='#7C3AED', fontweight='bold')

    # External Service connections
    ml_pos = (16.2, 8.5)
    ax.annotate("", xy=(12.5, 8.5), xytext=ml_pos, arrowprops=dict(arrowstyle="-", color='#059669', lw=1.5))
    ax.annotate("", xy=(12.5, 5.4), xytext=ml_pos, arrowprops=dict(arrowstyle="-", color='#059669', lw=1.5))

    ext_api_pos = (16.2, 5.2)
    ax.annotate("", xy=(12.5, 3.6), xytext=ext_api_pos, arrowprops=dict(arrowstyle="-", color='#2563EB', lw=1.5))

    gemini_pos = (16.2, 2.0)
    ax.annotate("", xy=(12.5, 1.9), xytext=gemini_pos, arrowprops=dict(arrowstyle="-", color='#7C3AED', lw=1.5))

    # Legend at bottom
    leg_box = patches.FancyBboxPatch((4.0, 0.1), 10.0, 0.45, boxstyle="round,pad=0.1",
                                    fc='#F3F4F6', ec='#D1D5DB', lw=1)
    ax.add_patch(leg_box)
    ax.text(4.2, 0.25, "Legend:", fontsize=8.5, fontweight='bold', color='#374151')
    ax.plot([5.0, 5.6], [0.25, 0.25], color='#374151', lw=1.5)
    ax.text(5.7, 0.22, "Association", fontsize=8, color='#4B5563')
    ax.plot([7.2, 7.8], [0.25, 0.25], color='#2563EB', lw=1.4, ls='--')
    ax.text(7.9, 0.22, "<<include>> Relationship", fontsize=8, color='#2563EB')
    ax.plot([9.8, 10.4], [0.25, 0.25], color='#D97706', lw=1.4, ls='--')
    ax.text(10.5, 0.22, "<<extend>> Optional Flow", fontsize=8, color='#D97706')

    plt.tight_layout()
    out_path = OUTPUT_DIR / "1_use_case_diagram.png"
    plt.savefig(out_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    shutil.copy(out_path, PUBLIC_DIR / "1_use_case_diagram.png")
    print(f" [OK] Use Case Diagram saved to: {out_path}")


# ==============================================================================
# 2. CLASS DIAGRAM
# ==============================================================================
def draw_class_diagram():
    fig, ax = plt.subplots(figsize=(20, 14), dpi=300)
    ax.set_xlim(0, 20)
    ax.set_ylim(0, 14)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAF9')
    ax.set_facecolor('#F8FAF9')

    # Title
    ax.text(10, 13.6, "AgriVision: System Class Diagram", fontsize=20, fontweight='bold',
            ha='center', color='#064E3B')
    ax.text(10, 13.25, "Object-Oriented Architecture | Model-Service-Controller Design | Multilingual Domain Models",
            fontsize=11, ha='center', color='#047857', fontstyle='italic')

    # Helper: Draw Class Box
    def draw_class(x, y, w, h, name, stereotype, attributes, methods, header_bg='#059669'):
        # Outer Card
        card = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.1",
                                     ec='#D1D5DB', fc='#FFFFFF', lw=1.5, zorder=2)
        ax.add_patch(card)
        # Header Box
        header_h = 0.8
        header = patches.Rectangle((x, y + h - header_h), w, header_h, fc=header_bg, ec='none', zorder=3)
        ax.add_patch(header)
        ax.text(x + w/2, y + h - 0.28, f"<<{stereotype}>>", fontsize=8, ha='center', color='#D1FAE5', zorder=4)
        ax.text(x + w/2, y + h - 0.62, name, fontsize=10.5, fontweight='bold', ha='center', color='#FFFFFF', zorder=4)

        # Content split line
        curr_y = y + h - header_h - 0.2
        # Attributes
        for attr in attributes:
            ax.text(x + 0.15, curr_y, attr, fontsize=7.5, color='#1F2937', fontfamily='monospace', zorder=4)
            curr_y -= 0.28

        # Divider
        ax.plot([x, x + w], [curr_y + 0.1, curr_y + 0.1], color='#E5E7EB', lw=1, zorder=3)
        curr_y -= 0.15

        # Methods
        for m in methods:
            ax.text(x + 0.15, curr_y, m, fontsize=7.5, color='#047857', fontfamily='monospace', zorder=4)
            curr_y -= 0.28

    # 1. User Entity
    draw_class(0.8, 9.2, 4.0, 3.4, "User", "Entity / Model",
               ["- id: int (PK)", "- name: str", "- phone: str (UK)", "- email: str", "- village: str", "- language: str = 'mr'"],
               ["+ register(): bool", "+ login(pwd): Token", "+ update_profile(): void", "+ get_fields(): List[Field]"],
               '#047857')

    # 2. Field Entity
    draw_class(5.5, 9.2, 4.2, 3.4, "Field", "Entity / Model",
               ["- id: int (PK)", "- user_id: int (FK)", "- field_name: str", "- area_acres: float", "- soil_preset: str", "- irrigation: str"],
               ["+ get_soil_profile(): Soil", "+ calculate_hectares(): float", "+ get_yield_history(): List", "+ to_dict(): dict"],
               '#047857')

    # 3. SoilProfile Entity
    draw_class(10.4, 9.2, 4.2, 3.4, "SoilProfile", "Value Object",
               ["+ ph: float (4.0 - 10.0)", "+ nitrogen_kg_ha: float", "+ phosphorus_kg_ha: float", "+ potassium_kg_ha: float", "+ moisture_pct: float", "+ rain_annual_mm: float"],
               ["+ is_acidic(): bool (<5.5)", "+ is_alkaline(): bool (>8.2)", "+ get_lime_requirement(): float", "+ get_gypsum_requirement(): float"],
               '#0D9488')

    # 4. CropRecommendationEngine
    draw_class(15.2, 8.8, 4.3, 4.0, "CropRecommendationEngine", "Machine Learning Service",
               ["- model_pipeline: XGBRegressor", "- icar_specs: Dict[str, CropSpec]", "- crop_classes: List[str]"],
               ["+ predict_yield(soil, acres): Result", "+ calculate_agronomic_yield(): float", "+ apply_ph_stress_curve(ph): float", "+ calculate_npk_factor(): float", "+ rank_crops(): List[CropRow]"],
               '#0F766E')

    # 5. PlantDiseaseClassifier
    draw_class(0.8, 4.6, 4.4, 3.9, "PlantDiseaseClassifier", "Deep Learning Inference",
               ["- model: EfficientNetB0 (Keras)", "- labels: List[str] (38 classes)", "- confidence_threshold: float = 0.40"],
               ["+ preprocess_image(bytes): Tensor", "+ predict(image_bytes): RawPred", "+ extract_top_k(k=3): List", "+ is_uncertain(): bool"],
               '#1E3A8A')

    # 6. DiseaseKnowledgeEngine
    draw_class(5.8, 4.4, 4.5, 4.2, "DiseaseKnowledgeEngine", "Domain Intelligence",
               ["- knowledge_db: Dict[str, Dict]", "- languages: ['en', 'mr', 'hi']"],
               ["+ get_intelligence(diagnosis): Dict", "+ get_pathogen_details(): Pathogen", "+ get_causes_and_triggers(): Dict", "+ get_15l_chemical_sprays(): List", "+ get_organic_remedies(): List", "+ get_field_sanitation(): List"],
               '#1D4ED8')

    # 7. DiseaseDiagnosis Result
    draw_class(11.0, 4.6, 4.0, 3.9, "DiseaseDiagnosis", "Data Transfer Object",
               ["+ diagnosis_name: str", "+ confidence_pct: float", "+ pathogen_type: str", "+ primary_cause: str", "+ chemical_sprays: List[str]", "+ organic_remedies: List[str]"],
               ["+ to_json(): dict", "+ format_spoken_script(): str", "+ is_curable_chemically(): bool"],
               '#2563EB')

    # 8. MandiMarketService
    draw_class(15.5, 4.6, 4.0, 3.8, "MandiMarketService", "External APMC Service",
               ["- base_url: str", "- active_mandis: 8 Pune Mandis", "- commodities: List[str]"],
               ["+ fetch_live_rates(mandi, crop)", "+ calculate_7day_forecast()", "+ evaluate_momentum_trend()", "+ check_price_alerts(): Alert"],
               '#D97706')

    # 9. VoiceAssistantService
    draw_class(0.8, 0.6, 4.4, 3.3, "VoiceAssistantService", "Speech & Translation Engine",
               ["- active_language: str", "- synth: SpeechSynthesis", "- speech_recognition: WebKitSpeech"],
               ["+ speak(text, lang): void", "+ stop_speech(): void", "+ listen(): str", "+ get_marathi_voice(): Voice"],
               '#6D28D9')

    # 10. GeminiFarmAdvisor
    draw_class(5.8, 0.6, 4.5, 3.4, "GeminiFarmAdvisor", "LLM Advisory Controller",
               ["- api_key: str", "- model: gemini-2.5-flash", "- system_prompt: FarmerPrompt"],
               ["+ generate_advice(prompt, lang)", "+ stream_response(): Generator", "+ ground_with_mandi_rates()", "+ format_markdown_response()"],
               '#7C3AED')

    # 11. WeatherSprayAdvisory
    draw_class(11.0, 0.6, 4.0, 3.3, "WeatherSprayAdvisory", "Meteorology Service",
               ["- lat: float = 18.5204 (Pune)", "- lon: float = 73.8567", "- open_meteo_client: Client"],
               ["+ get_hourly_forecast(): Weather", "+ evaluate_spray_suitability()", "+ get_relative_humidity(): float", "+ get_wind_speed_kmh(): float"],
               '#059669')

    # 12. SyncOfflineManager
    draw_class(15.5, 0.6, 4.0, 3.3, "SyncOfflineManager", "PWA Cache & Offline Engine",
               ["- local_storage: Storage", "- index_db: IndexedDB", "- sync_queue: List[Request]"],
               ["+ queue_offline_action(): void", "+ sync_when_online(): void", "+ cache_mandi_prices(): void", "+ is_network_active(): bool"],
               '#4B5563')

    # Connectors (Relationships)
    # User 1 -- * Field
    ax.plot([4.8, 5.5], [10.8, 10.8], color='#374151', lw=1.8)
    ax.text(4.9, 11.0, "1", fontsize=9, fontweight='bold', color='#111827')
    ax.text(5.3, 11.0, "0..*", fontsize=9, fontweight='bold', color='#111827')

    # Field 1 -- 1 SoilProfile
    ax.plot([9.7, 10.4], [10.8, 10.8], color='#374151', lw=1.8)
    ax.text(9.8, 11.0, "1", fontsize=9, fontweight='bold', color='#111827')
    ax.text(10.2, 11.0, "1", fontsize=9, fontweight='bold', color='#111827')

    # SoilProfile -- Dependency --> CropRecommendationEngine
    ax.annotate("", xy=(15.2, 10.8), xytext=(14.6, 10.8),
                arrowprops=dict(arrowstyle="->", color='#0D9488', lw=1.6, ls='--'))
    ax.text(14.7, 11.05, "<<evaluates>>", fontsize=7.5, color='#0D9488')

    # PlantDiseaseClassifier --> DiseaseKnowledgeEngine
    ax.annotate("", xy=(5.8, 6.5), xytext=(5.2, 6.5),
                arrowprops=dict(arrowstyle="->", color='#1D4ED8', lw=1.6))
    ax.text(5.3, 6.7, "<<enriches>>", fontsize=7.5, color='#1D4ED8')

    # DiseaseKnowledgeEngine --> DiseaseDiagnosis
    ax.annotate("", xy=(11.0, 6.5), xytext=(10.3, 6.5),
                arrowprops=dict(arrowstyle="->", color='#2563EB', lw=1.6))
    ax.text(10.4, 6.7, "<<builds>>", fontsize=7.5, color='#2563EB')

    # GeminiFarmAdvisor --> VoiceAssistantService
    ax.annotate("", xy=(5.2, 2.2), xytext=(5.8, 2.2),
                arrowprops=dict(arrowstyle="->", color='#7C3AED', lw=1.6))
    ax.text(5.3, 2.4, "<<speaks>>", fontsize=7.5, color='#7C3AED')

    # MandiMarketService --> GeminiFarmAdvisor
    ax.annotate("", xy=(10.3, 2.2), xytext=(15.5, 5.0),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.4, ls=':'))
    ax.text(12.5, 3.4, "<<grounds prices>>", fontsize=7.5, color='#D97706')

    plt.tight_layout()
    out_path = OUTPUT_DIR / "2_class_diagram.png"
    plt.savefig(out_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    shutil.copy(out_path, PUBLIC_DIR / "2_class_diagram.png")
    print(f" [OK] Class Diagram saved to: {out_path}")


# ==============================================================================
# 3. SEQUENCE DIAGRAM
# ==============================================================================
def draw_sequence_diagram():
    fig, ax = plt.subplots(figsize=(19, 13), dpi=300)
    ax.set_xlim(0, 19)
    ax.set_ylim(0, 13)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAF9')
    ax.set_facecolor('#F8FAF9')

    # Title
    ax.text(9.5, 12.5, "AgriVision: Sequence Diagram (Leaf Disease Detection & Treatment)",
            fontsize=18, fontweight='bold', ha='center', color='#064E3B')
    ax.text(9.5, 12.15, "Asynchronous Execution Flow | Multi-Tier Inference | Pathology Intelligence Enrichment",
            fontsize=11, ha='center', color='#047857', fontstyle='italic')

    # Lifelines definition (x, name, role)
    lifelines = [
        (1.5, "Farmer\n(Actor)", '#111827', '#F3F4F6'),
        (4.2, "DiseaseDetect.jsx\n(React UI)", '#047857', '#ECFDF5'),
        (7.2, "Flask API Gateway\n(:5000 /api/detect)", '#0F766E', '#F0FDFA'),
        (10.5, "FastAPI Service\n(:8000 /predict)", '#1E40AF', '#EFF6FF'),
        (13.6, "EfficientNet-B0\n(CNN Keras Model)", '#1E3A8A', '#EEF2FF'),
        (16.8, "DiseaseKnowledge\n(Pathology KB)", '#6D28D9', '#F5F3FF')
    ]

    # Draw Lifeline Headers & Vertical Dashed Lines
    top_y = 11.4
    bot_y = 1.0

    for lx, name, text_c, bg_c in lifelines:
        # Header box
        box = patches.FancyBboxPatch((lx - 1.1, top_y - 0.5), 2.2, 0.8, boxstyle="round,pad=0.1",
                                     ec=text_c, fc=bg_c, lw=1.8, zorder=3)
        ax.add_patch(box)
        ax.text(lx, top_y - 0.1, name, fontsize=9.5, fontweight='bold', ha='center', color=text_c, zorder=4)
        # Vertical Dashed Lifeline
        ax.plot([lx, lx], [top_y - 0.5, bot_y], color='#9CA3AF', lw=1.5, ls='--', zorder=1)

    # Helper: Draw Activation Bar
    def draw_activation(lx, y_start, y_end, color='#10B981'):
        act = patches.Rectangle((lx - 0.12, y_end), 0.24, y_start - y_end,
                                fc=color, ec='#1F2937', lw=1, zorder=2)
        ax.add_patch(act)

    # Activations
    draw_activation(1.5, 10.4, 1.8, '#D1D5DB')
    draw_activation(4.2, 10.3, 2.0, '#A7F3D0')
    draw_activation(7.2, 9.8, 3.2, '#99F6E4')
    draw_activation(10.5, 9.3, 4.4, '#BFDBFE')
    draw_activation(13.6, 8.8, 6.8, '#C7D2FE')
    draw_activation(16.8, 6.0, 3.8, '#DDD6FE')

    # Sequence Messages
    messages = [
        # (y, x_from, x_to, msg_num, text, is_async, is_return)
        (10.2, 1.5, 4.2, "1", "Captures leaf photo with mobile camera", False, False),
        (9.8, 4.2, 7.2, "2", "POST /api/detect (multipart/form-data: leaf.jpg)", False, False),
        (9.3, 7.2, 10.5, "3", "Forward image_bytes to FastAPI ML (:8000)", False, False),
        (8.8, 10.5, 13.6, "4", "Preprocess (resize 224x224, float32) & predict()", False, False),
        (7.4, 13.6, 10.5, "5", "Probabilities tensor over 38 disease classes", False, True),
        (6.8, 10.5, 10.5, "6", "Sort top-3 predictions (Late Blight 69%, Septoria 8.5%)", False, False),
        (6.0, 10.5, 16.8, "7", "Query get_disease_intelligence(diagnosis='Tomato___Late_blight')", False, False),
        (4.8, 16.8, 10.5, "8", "Returns Pathogen, Causes, 15L Chemical/Bio Remedies", False, True),
        (4.2, 10.5, 7.2, "9", "JSON Response: {diagnosis, confidence, causes, remedies}", False, True),
        (3.4, 7.2, 4.2, "10", "HTTP 200 OK: Full diagnostic payload delivered", False, True),
        (2.6, 4.2, 1.5, "11", "Renders Result: Pathogen Badge, 15L Spray Dosages & Causes", False, True),
        (1.8, 4.2, 1.5, "12", "Synthesizes Marathi/Hindi Audio Readout via Speaker button", True, False)
    ]

    for y, xf, xt, num, label, is_async, is_return in messages:
        color = '#2563EB' if not is_return else '#059669'
        ls = '--' if is_return else '-'
        # Arrow line
        ax.annotate("", xy=(xt, y), xytext=(xf, y),
                    arrowprops=dict(arrowstyle="->", color=color, lw=1.8, ls=ls))
        # Message Label
        mid_x = (xf + xt) / 2
        align = 'center'
        ax.text(mid_x, y + 0.12, f"{num}. {label}", fontsize=8.5, fontweight='bold',
                ha=align, color='#1F2937', bbox=dict(boxstyle="round,pad=0.15", fc='#FFFFFF', ec='#E5E7EB', lw=0.8))

    # Notes at bottom
    note_box = patches.FancyBboxPatch((2.0, 0.2), 15.0, 0.6, boxstyle="round,pad=0.1",
                                     fc='#FEF3C7', ec='#F59E0B', lw=1.2)
    ax.add_patch(note_box)
    ax.text(9.5, 0.5, "Fault-Tolerance Design: If ML service (:8000) is unreachable, API Gateway gracefully falls back to local cached pathology rules.",
            fontsize=8.5, ha='center', color='#92400E', fontweight='bold')

    plt.tight_layout()
    out_path = OUTPUT_DIR / "3_sequence_diagram.png"
    plt.savefig(out_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    shutil.copy(out_path, PUBLIC_DIR / "3_sequence_diagram.png")
    print(f" [OK] Sequence Diagram saved to: {out_path}")


# ==============================================================================
# 4. ACTIVITY DIAGRAM
# ==============================================================================
def draw_activity_diagram():
    fig, ax = plt.subplots(figsize=(18, 14), dpi=300)
    ax.set_xlim(0, 18)
    ax.set_ylim(0, 14)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAF9')
    ax.set_facecolor('#F8FAF9')

    # Title
    ax.text(9, 13.5, "AgriVision: Activity Diagram (Soil pH & Crop Recommendation Workflow)",
            fontsize=18, fontweight='bold', ha='center', color='#064E3B')
    ax.text(9, 13.15, "Dynamic Agronomic Penalty Engine | Live Debounced Inference | Remediation Advisory",
            fontsize=11, ha='center', color='#047857', fontstyle='italic')

    # Helper: Draw Start Node (Filled Circle)
    start_c = patches.Circle((9, 12.4), 0.25, fc='#065F46', ec='#047857', lw=2)
    ax.add_patch(start_c)
    ax.text(9, 12.8, "Start", fontsize=9, fontweight='bold', ha='center', color='#065F46')

    # Helper: Draw Action Box
    def draw_action(cx, cy, w, h, text, fc='#FFFFFF', ec='#059669', tc='#1F2937'):
        box = patches.FancyBboxPatch((cx - w/2, cy - h/2), w, h, boxstyle="round,pad=0.2",
                                     fc=fc, ec=ec, lw=1.8, zorder=3)
        ax.add_patch(box)
        ax.text(cx, cy, text, fontsize=9, fontweight='bold', ha='center', va='center',
                color=tc, multialignment='center', zorder=4)

    # Helper: Draw Decision Diamond
    def draw_diamond(cx, cy, size, text, fc='#FFFBEB', ec='#F59E0B'):
        pts = [(cx, cy + size), (cx + size*1.3, cy), (cx, cy - size), (cx - size*1.3, cy)]
        diamond = patches.Polygon(pts, closed=True, fc=fc, ec=ec, lw=1.8, zorder=3)
        ax.add_patch(diamond)
        ax.text(cx, cy, text, fontsize=8, fontweight='bold', ha='center', va='center',
                color='#92400E', multialignment='center', zorder=4)

    # Node 1: Select Soil Preset
    draw_action(9, 11.3, 5.0, 0.8, "Farmer Selects Soil & Irrigation Preset\n(e.g., Medium Black Canal / Deep Black Well)")
    ax.annotate("", xy=(9, 11.7), xytext=(9, 12.15), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))

    # Node 2: Enter Acreage
    draw_action(9, 10.0, 4.4, 0.7, "Enter Farm Acreage (e.g., 2.5 Acres)")
    ax.annotate("", xy=(9, 10.35), xytext=(9, 10.9), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))

    # Decision 1: Custom Soil Test Values?
    draw_diamond(9, 8.8, 0.6, "Customize\nSoil Test Lab\nValues?")
    ax.annotate("", xy=(9, 9.4), xytext=(9, 9.65), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))

    # Branch A: Advanced Lab Slider
    draw_action(14.2, 8.8, 4.2, 0.85, "Slide pH (4.0 - 10.0) &\nAdjust N, P, K, Moisture, Rain",
                fc='#FEF3C7', ec='#F59E0B')
    ax.annotate("", xy=(12.1, 8.8), xytext=(9.8, 8.8), arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.8))
    ax.text(10.6, 9.0, "[Yes: Custom Lab]", fontsize=8, color='#D97706', fontweight='bold')

    # Debounce Timer Node
    draw_action(9, 7.2, 4.6, 0.7, "Debounced Event Trigger (250 ms)\n(Dispatches API request to /api/ml/predict)")
    # From Diamond [No]
    ax.annotate("", xy=(9, 7.55), xytext=(9, 8.2), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))
    ax.text(9.1, 7.9, "[No: Keep Presets]", fontsize=8, color='#059669', fontweight='bold')
    # From Custom Lab
    ax.annotate("", xy=(11.3, 7.2), xytext=(14.2, 8.35),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.6, connectionstyle="angle,angleA=0,angleB=90"))

    # Decision 2: pH Agronomic Range Check
    draw_diamond(9, 5.7, 0.65, "Evaluate Soil pH\nCondition")
    ax.annotate("", xy=(9, 6.35), xytext=(9, 6.85), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))

    # Branch: Acidic (pH < 5.5)
    draw_action(3.5, 4.3, 4.4, 1.0, "Acidic Stress: (diff)^1.55\nCrash Cotton/Chickpea (-88%)\nKeep Rice Viable (28.9 q/ha)\nDisplay Lime (Chuna) Advice",
                fc='#FEF2F2', ec='#EF4444', tc='#991B1B')
    ax.annotate("", xy=(3.5, 4.8), xytext=(8.2, 5.7),
                arrowprops=dict(arrowstyle="->", color='#DC2626', lw=1.6, connectionstyle="angle,angleA=0,angleB=90"))
    ax.text(5.2, 5.9, "[pH < 5.5: Strongly Acidic]", fontsize=8, color='#DC2626', fontweight='bold')

    # Branch: Optimal (6.0 - 8.0)
    draw_action(9, 4.3, 4.4, 1.0, "Optimal Balanced Soil\nPeak Yields across All Crops\nMaize #1 (43.3 q/ha), Wheat #2\nBalanced Nutrient Status",
                fc='#ECFDF5', ec='#10B981', tc='#065F46')
    ax.annotate("", xy=(9, 4.8), xytext=(9, 5.05), arrowprops=dict(arrowstyle="->", color='#10B981', lw=1.8))
    ax.text(9.1, 4.95, "[6.0 <= pH <= 8.0: Ideal]", fontsize=8, color='#10B981', fontweight='bold')

    # Branch: Alkaline (pH > 8.2)
    draw_action(14.5, 4.3, 4.4, 1.0, "Alkaline Sodic Stress\nCrash Rice (-88% to 3.4 q/ha)\nBajra #1 (26.7 q/ha) & Cotton Top\nDisplay Gypsum (Gypsum) Advice",
                fc='#FFFBEB', ec='#F59E0B', tc='#92400E')
    ax.annotate("", xy=(14.5, 4.8), xytext=(9.8, 5.7),
                arrowprops=dict(arrowstyle="->", color='#D97706', lw=1.6, connectionstyle="angle,angleA=0,angleB=90"))
    ax.text(11.2, 5.9, "[pH > 8.2: Strongly Alkaline]", fontsize=8, color='#D97706', fontweight='bold')

    # Synchronization Join Bar
    join_bar = patches.Rectangle((2.0, 2.9), 14.0, 0.14, fc='#1F2937', ec='#1F2937', zorder=3)
    ax.add_patch(join_bar)
    ax.annotate("", xy=(3.5, 3.04), xytext=(3.5, 3.8), arrowprops=dict(arrowstyle="->", color='#374151', lw=1.6))
    ax.annotate("", xy=(9.0, 3.04), xytext=(9.0, 3.8), arrowprops=dict(arrowstyle="->", color='#374151', lw=1.6))
    ax.annotate("", xy=(14.5, 3.04), xytext=(14.5, 3.8), arrowprops=dict(arrowstyle="->", color='#374151', lw=1.6))

    # Node: Render Ranked Crop Cards
    draw_action(9, 2.0, 7.0, 0.8, "Render Ranked Crop Cards with Dynamic pH Badges\nCalculate Total Harvest: (Yield q/Acre * Acres) -> e.g. 43.8 q total")
    ax.annotate("", xy=(9, 2.4), xytext=(9, 2.9), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))

    # End Node (Bullseye)
    end_outer = patches.Circle((9, 0.8), 0.28, fc='#FFFFFF', ec='#065F46', lw=2)
    end_inner = patches.Circle((9, 0.8), 0.18, fc='#065F46', ec='#065F46')
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    ax.annotate("", xy=(9, 1.08), xytext=(9, 1.6), arrowprops=dict(arrowstyle="->", color='#059669', lw=1.8))
    ax.text(9, 0.35, "Recommendations Live & Interactive", fontsize=8.5, fontweight='bold', ha='center', color='#065F46')

    plt.tight_layout()
    out_path = OUTPUT_DIR / "4_activity_diagram.png"
    plt.savefig(out_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    shutil.copy(out_path, PUBLIC_DIR / "4_activity_diagram.png")
    print(f" [OK] Activity Diagram saved to: {out_path}")


if __name__ == '__main__':
    print("Generating AgriVision Professional UML Diagram Suite...")
    draw_use_case_diagram()
    draw_class_diagram()
    draw_sequence_diagram()
    draw_activity_diagram()
    print("All 4 UML Diagrams successfully generated at 300 DPI!")
