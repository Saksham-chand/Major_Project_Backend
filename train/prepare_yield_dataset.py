import pandas as pd
import os
import numpy as np

BASE_PATH = "../../datasets"

yield_df = pd.read_csv(os.path.join(BASE_PATH, "ICRISAT-District Level Data.csv"))
soil_df = pd.read_csv(os.path.join(BASE_PATH, "soil.csv"))
crop_df = pd.read_csv(os.path.join(BASE_PATH, "crop_recommendation.csv"))

# Clean columns
yield_df.columns = yield_df.columns.str.strip()
soil_df.columns = soil_df.columns.str.strip()
crop_df.columns = crop_df.columns.str.strip()

yield_df["Dist Name"] = yield_df["Dist Name"].str.strip().str.upper()
soil_df["District"] = soil_df["District"].str.strip().str.upper()

# Extract yield columns
yield_columns = [col for col in yield_df.columns if "YIELD (Kg per ha)" in col]
yield_df = yield_df[["Dist Name"] + yield_columns]

# Wide → long
yield_long = yield_df.melt(
    id_vars=["Dist Name"],
    value_vars=yield_columns,
    var_name="Crop",
    value_name="Yield"
)

yield_long.rename(columns={"Dist Name": "District"}, inplace=True)
yield_long.dropna(subset=["Yield"], inplace=True)

# Merge soil
merged = yield_long.merge(soil_df, on="District", how="left")
merged.dropna(inplace=True)

# Add synthetic NPK + weather from crop dataset
crop_avg = crop_df.groupby("label").mean().reset_index()
crop_features = crop_avg.drop("label", axis=1)

random_indices = np.random.randint(0, len(crop_features), size=len(merged))
synthetic_features = crop_features.iloc[random_indices].reset_index(drop=True)

merged = pd.concat([merged.reset_index(drop=True), synthetic_features], axis=1)

# Final selection
final_df = merged[[
    "N", "P", "K",
    "Zn %", "Fe%", "Mn %", "B %", "S %",
    "ph",
    "temperature",
    "humidity",
    "rainfall",
    "Yield"
]]

final_df.rename(columns={
    "Zn %": "Zn",
    "Fe%": "Fe",
    "Mn %": "Mn",
    "B %": "B",
    "S %": "S"
}, inplace=True)

final_df.dropna(inplace=True)

final_df.to_csv(os.path.join(BASE_PATH, "final_unified_yield.csv"), index=False)

print("✅ Unified Yield Dataset Created")
print("Rows:", final_df.shape)