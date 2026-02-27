import pandas as pd
import xgboost as xgb
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

BASE_PATH = "../../datasets"

df = pd.read_csv(os.path.join(BASE_PATH, "final_unified_yield.csv"))

X = df.drop("Yield", axis=1)
y = df["Yield"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = xgb.XGBRegressor(
    n_estimators=800,
    max_depth=8,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train)

preds = model.predict(X_test)
print("Unified Yield Model R2:", r2_score(y_test, preds))

os.makedirs("../app/models", exist_ok=True)
joblib.dump(model, "../app/models/yield_model.pkl")

print("✅ Unified Yield Model trained & saved")