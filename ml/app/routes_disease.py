from fastapi import APIRouter, UploadFile, File, HTTPException
from .model_registry import load_disease_model
from .disease_knowledge import get_disease_intelligence
import numpy as np
from PIL import Image
import io

router = APIRouter()

try:
    model, labels = load_disease_model()
except Exception as e:
    print(f"Failed to load disease model: {e}")
    model, labels = None, []

IMG_SIZE = (224, 224)


@router.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Disease model could not be loaded."
        )

    try:
        image_bytes = await file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img.resize(IMG_SIZE)

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    image_array = np.array(img, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)

    probabilities = model.predict(image_array, verbose=0)[0]

    if len(probabilities) != len(labels):
        raise HTTPException(
            status_code=500,
            detail="Model output does not match the class labels."
        )

    top_indices = np.argsort(probabilities)[::-1][:3]

    predictions = [
        {
            "disease": labels[int(index)],
            "confidence": round(float(probabilities[index]), 4)
        }
        for index in top_indices
    ]

    diagnosis = predictions[0]["disease"]
    confidence = predictions[0]["confidence"]
    intel = get_disease_intelligence(diagnosis, confidence=confidence, top_predictions=predictions)

    return {
        "diagnosis": diagnosis,
        "confidence": confidence,
        "top_predictions": predictions,
        "model_version": "efficientnetb0-v1",
        "causes": intel["primary_cause"],
        "environmental_triggers": intel["environmental_triggers"],
        "organic_remedies": intel["organic_remedies"],
        "chemical_remedies": intel["chemical_remedies"],
        "preventative_actions": intel["preventative_actions"],
        "differential_diagnoses": intel["differential_diagnoses"],
        "pathogen": intel["pathogen_name"],
        "pathogen_type": intel["pathogen_type"]
    }