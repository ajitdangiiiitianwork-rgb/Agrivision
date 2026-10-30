import io
import requests
from PIL import Image
try:
    from services.disease_knowledge import get_disease_intelligence
except ImportError:
    from backend.services.disease_knowledge import get_disease_intelligence

ML_DISEASE_URL = "http://127.0.0.1:8000/api/predict/disease"
CONFIDENCE_THRESHOLD = 0.40


def predict(image_bytes: bytes) -> dict:
    try:
        with Image.open(io.BytesIO(image_bytes)) as image:
            image.verify()
    except Exception:
        raise ValueError("Invalid image file.")

    try:
        response = requests.post(
            ML_DISEASE_URL,
            files={"file": ("leaf.jpg", image_bytes, "image/jpeg")},
            timeout=60
        )
        response.raise_for_status()
        result = response.json()

    except requests.RequestException as exc:
        raise RuntimeError("Disease detection service is unavailable.") from exc

    confidence = float(result["confidence"])
    uncertain = confidence < CONFIDENCE_THRESHOLD
    diagnosis = result["diagnosis"]
    top_preds = result.get("top_predictions", [])

    # Enrich prediction with deep agronomic & pathological intelligence
    intel = get_disease_intelligence(
        raw_disease=diagnosis,
        confidence=confidence,
        top_predictions=top_preds
    )

    return {
        "disease": diagnosis,
        "confidence": confidence,
        "uncertain": uncertain,
        "message": (
            "The prediction is uncertain. Try uploading a clear image of the affected leaf."
            if uncertain
            else "This is an AI-assisted diagnostic prediction with actionable field remedies."
        ),
        "top_predictions": top_preds,
        "model_version": result.get("model_version", "efficientnetb0-v1"),
        "remedies": intel["chemical_remedies"]["en"] + intel["organic_remedies"]["en"],
        "intelligence": intel,
        "causes": intel["primary_cause"],
        "environmental_triggers": intel["environmental_triggers"],
        "organic_remedies": intel["organic_remedies"],
        "chemical_remedies": intel["chemical_remedies"],
        "preventative_actions": intel["preventative_actions"],
        "differential_diagnoses": intel["differential_diagnoses"],
        "pathogen": intel["pathogen_name"],
        "pathogen_type": intel["pathogen_type"]
    }
