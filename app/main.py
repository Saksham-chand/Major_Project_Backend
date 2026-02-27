from fastapi import FastAPI
from app.schemas import AnalyzeRequest
from app.services import predict_crop, predict_yield
from app.soil_engine import compute_soil_health
from app.fertilizer_engine import recommend_fertilizer

app = FastAPI(
    title="AgriSmart ML API",
    version="2.0"
)

@app.post("/analyze")
def analyze(data: AnalyzeRequest):

    # Crop prediction
    top1, top3 = predict_crop(data)

    best_crop = top1[0]
    best_confidence = top1[1]

    # Yield prediction
    predicted_yield = predict_yield(data)

    # Soil health
    soil_score, soil_status = compute_soil_health(data)

    # fertilizer recommendation
    fertilizer_recommendations = recommend_fertilizer(data)
    
    return {
    "cropRecommendation": {
        "bestCrop": best_crop,
        "confidence": round(best_confidence * 100, 2),
        "top3Crops": [
            {
                "crop": crop,
                "confidence": round(prob * 100, 2)
            }
            for crop, prob in top3
        ]
    },
    "yieldPrediction": {
        "estimatedYield": round(predicted_yield / 1000, 2)
    },
    "soilHealth": {
        "score": soil_score,
        "status": soil_status
    },
    "fertilizerRecommendation": fertilizer_recommendations
}