def score_range(value, min_val, max_val):
    """
    Returns score between 0 and 100
    """
    if value < min_val:
        return max(0, 100 - ((min_val - value) * 2))
    elif value > max_val:
        return max(0, 100 - ((value - max_val) * 2))
    else:
        return 100


def compute_soil_health(data):

    # Macronutrients
    n_score = score_range(data.N, 50, 100)
    p_score = score_range(data.P, 30, 60)
    k_score = score_range(data.K, 30, 80)

    macro_avg = (n_score + p_score + k_score) / 3

    # Micronutrients
    zn_score = score_range(data.Zn, 5, 15)
    fe_score = score_range(data.Fe, 20, 50)
    mn_score = score_range(data.Mn, 10, 40)
    b_score = score_range(data.B, 0.5, 5)
    s_score = score_range(data.S, 10, 40)

    micro_avg = (zn_score + fe_score + mn_score + b_score + s_score) / 5

    # pH
    ph_score = score_range(data.ph, 6.0, 7.5)

    # Weighted score
    final_score = (
        (macro_avg * 0.4) +
        (micro_avg * 0.3) +
        (ph_score * 0.3)
    )

    final_score = round(final_score, 2)

    # Category
    if final_score >= 85:
        status = "Excellent"
    elif final_score >= 70:
        status = "Good"
    elif final_score >= 50:
        status = "Moderate"
    else:
        status = "Poor"

    return final_score, status