import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load dataset
file_path = "kerala.csv"

try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    print(f"Error: File '{file_path}' not found. Ensure it exists in the correct directory.")

# Feature Engineering
df["flood"] = df["Jun-Sep"].apply(lambda x: 1 if x > 2400 else 0)
df["avgjune"] = df["JUN"] / 3
df["sub"] = abs(df["MAY"] - df["JUN"])

# Features and target
X = df.iloc[:, [16, 20, 21]].values
y = df.iloc[:, 19].values

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "flood_model.pkl")

print("Model saved as 'flood_model.pkl'")
