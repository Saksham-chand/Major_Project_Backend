import pandas as pd
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

BASE_PATH = "../../datasets"

df = pd.read_csv(os.path.join(BASE_PATH, "crop_recommendation.csv"))

# -----------------------------
# BALANCE DATASET SAFELY
# -----------------------------

print("Original class distribution:")
print(df['label'].value_counts())

min_samples = df['label'].value_counts().min()

# Safe balancing method (no index corruption)
balanced_list = []

for crop in df['label'].unique():
    crop_df = df[df['label'] == crop]
    balanced_crop_df = crop_df.sample(min_samples, random_state=42)
    balanced_list.append(balanced_crop_df)

df_balanced = pd.concat(balanced_list, ignore_index=True)

print("\nBalanced class distribution:")
print(df_balanced['label'].value_counts())

# -----------------------------
# FEATURES
# -----------------------------

X = df_balanced[['N','P','K','temperature','humidity','ph','rainfall']]
y = df_balanced['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------
# MODEL
# -----------------------------

model = RandomForestClassifier(
    n_estimators=500,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

preds = model.predict(X_test)
print("\nCrop Model Accuracy:", accuracy_score(y_test, preds))

os.makedirs("../app/models", exist_ok=True)
joblib.dump(model, "../app/models/crop_model.pkl")

print("✅ Crop model retrained successfully (balanced)")