
import io
import requests
from PIL import Image

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

    return {
        "disease": result["diagnosis"],
        "confidence": confidence,
        "uncertain": uncertain,
        "message": (
            "The prediction is uncertain. Try uploading a clear image of the affected leaf."
            if uncertain
            else "This is a preliminary prediction, not a confirmed diagnosis."
        ),
        "top_predictions": result.get("top_predictions", []),
        "remedies": [],
        "model_version": result.get("model_version", "unknown")
    }

