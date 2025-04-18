import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PowerTransformer
from xgboost import XGBRegressor

# Load dataset
df = pd.read_csv(r"C:\Users\Siddharth\Desktop\hacathon\agriclimate\backend\crop_yield.csv")

# Data Preprocessing
df_with_eda = df.copy()
df_with_eda = df_with_eda.drop(['Area', 'Production'], axis=1)

# Encoding categorical variables
df_with_eda_encoding = df_with_eda.drop(['Crop_Year', 'Fertilizer'], axis=1)
category_columns = df_with_eda_encoding.select_dtypes(include=['object']).columns
df_with_eda_encoding = pd.get_dummies(df_with_eda_encoding, columns=category_columns, drop_first=True)
boolean_cols_auto = df_with_eda_encoding.select_dtypes(include=['bool']).columns
df_with_eda_encoding[boolean_cols_auto] = df_with_eda_encoding[boolean_cols_auto].astype(int)

# Splitting dataset
x = df_with_eda_encoding.drop(['Yield'], axis=1)
y = df_with_eda_encoding['Yield']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Scaling
pt = PowerTransformer(method='yeo-johnson')
x_train_scaled = pt.fit_transform(x_train)
x_test_scaled = pt.transform(x_test)

# Train the model
model = XGBRegressor()
model.fit(x_train_scaled, y_train)

# Save model and transformer
with open("xgb_model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

with open("power_transformer.pkl", "wb") as transformer_file:
    pickle.dump(pt, transformer_file)

print("Model and transformer saved successfully!")
