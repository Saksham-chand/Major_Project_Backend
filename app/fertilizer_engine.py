def recommend_fertilizer(data):

    recommendations = []

    # -----------------------------
    # Macronutrients
    # -----------------------------

    if data.N < 50:
        recommendations.append({
            "nutrient": "Nitrogen",
            "deficiency": round(50 - data.N, 2),
            "fertilizer": "Urea",
            "suggested_dose": "40-60 kg per hectare"
        })

    if data.P < 30:
        recommendations.append({
            "nutrient": "Phosphorus",
            "deficiency": round(30 - data.P, 2),
            "fertilizer": "DAP or SSP",
            "suggested_dose": "30-50 kg per hectare"
        })

    if data.K < 30:
        recommendations.append({
            "nutrient": "Potassium",
            "deficiency": round(30 - data.K, 2),
            "fertilizer": "MOP (Muriate of Potash)",
            "suggested_dose": "20-40 kg per hectare"
        })

    # -----------------------------
    # Micronutrients
    # -----------------------------

    if data.Zn < 5:
        recommendations.append({
            "nutrient": "Zinc",
            "deficiency": round(5 - data.Zn, 2),
            "fertilizer": "Zinc Sulphate",
            "suggested_dose": "10-15 kg per hectare"
        })

    if data.Fe < 20:
        recommendations.append({
            "nutrient": "Iron",
            "deficiency": round(20 - data.Fe, 2),
            "fertilizer": "Ferrous Sulphate",
            "suggested_dose": "15-25 kg per hectare"
        })

    if data.Mn < 10:
        recommendations.append({
            "nutrient": "Manganese",
            "deficiency": round(10 - data.Mn, 2),
            "fertilizer": "Manganese Sulphate",
            "suggested_dose": "10-20 kg per hectare"
        })

    if data.B < 0.5:
        recommendations.append({
            "nutrient": "Boron",
            "deficiency": round(0.5 - data.B, 2),
            "fertilizer": "Borax",
            "suggested_dose": "5-10 kg per hectare"
        })

    if data.S < 10:
        recommendations.append({
            "nutrient": "Sulphur",
            "deficiency": round(10 - data.S, 2),
            "fertilizer": "Gypsum",
            "suggested_dose": "20-40 kg per hectare"
        })

    # -----------------------------
    # pH correction
    # -----------------------------

    if data.ph < 6.0:
        recommendations.append({
            "nutrient": "Low Soil pH",
            "fertilizer": "Agricultural Lime",
            "suggested_dose": "200-400 kg per hectare"
        })

    if data.ph > 7.5:
        recommendations.append({
            "nutrient": "High Soil pH",
            "fertilizer": "Organic Compost or Elemental Sulfur",
            "suggested_dose": "150-300 kg per hectare"
        })

    # If no deficiencies
    if not recommendations:
        recommendations.append({
            "message": "Soil nutrient levels are optimal. Maintain balanced fertilization."
        })

    return recommendations