import joblib
import numpy as np
import os
from app.soil_engine import compute_soil_health

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models")

crop_model = joblib.load(os.path.join(MODEL_PATH, "crop_model.pkl"))
yield_model = joblib.load(os.path.join(MODEL_PATH, "yield_model.pkl"))


def predict_crop(data):

    features = np.array([[
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])

    probs = crop_model.predict_proba(features)[0]
    classes = crop_model.classes_

    # Sort probabilities descending
    sorted_crops = sorted(
        zip(classes, probs),
        key=lambda x: x[1],
        reverse=True
    )

    top1 = sorted_crops[0]
    top3 = sorted_crops[:3]

    return top1, top3


def predict_yield(data):

    features = np.array([[
        data.N,
        data.P,
        data.K,
        data.Zn,
        data.Fe,
        data.Mn,
        data.B,
        data.S,
        data.ph,
        data.temperature,
        data.humidity,
        data.rainfall
    ]])

    predicted = float(yield_model.predict(features)[0])
    return predicted