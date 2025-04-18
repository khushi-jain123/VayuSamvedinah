import joblib
import numpy as np
import pandas as pd
import requests
import pickle
import traceback
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from flask_cors import CORS
from xgboost import XGBRegressor
import requests
import json

app = Flask(__name__)
CORS(app)

feature_columns = [
    "Annual_Rainfall", "Pesticide",
    "Crop_Arhar_Tur", "Crop_Bajra", "Crop_Banana", "Crop_Barley", "Crop_Black pepper", 
    "Crop_Cardamom", "Crop_Cashewnut", "Crop_Castor seed", "Crop_Coconut", "Crop_Coriander", 
    "Crop_Cotton(lint)", "Crop_Cowpea(Lobia)", "Crop_Dry chillies", "Crop_Garlic", "Crop_Ginger",
    "Crop_Gram", "Crop_Groundnut", "Crop_Guar seed", "Crop_Horse-gram", "Crop_Jowar", "Crop_Jute",
    "Crop_Khesari", "Crop_Linseed", "Crop_Maize", "Crop_Masoor", "Crop_Mesta", "Crop_Moong(Green Gram)",
    "Crop_Moth", "Crop_Niger seed", "Crop_Oilseeds total", "Crop_Onion", "Crop_Other Rabi pulses",
    "Crop_Other Cereals", "Crop_Other Kharif pulses", "Crop_Other Summer Pulses", "Crop_Peas & beans (Pulses)",
    "Crop_Potato", "Crop_Ragi", "Crop_Rapeseed &Mustard", "Crop_Rice", "Crop_Safflower", "Crop_Sannhamp",
    "Crop_Sesamum", "Crop_Small millets", "Crop_Soyabean", "Crop_Sugarcane", "Crop_Sunflower", "Crop_Sweet potato",
    "Crop_Tapioca", "Crop_Tobacco", "Crop_Turmeric", "Crop_Urad", "Crop_Wheat", "Crop_other oilseeds",
    "Season_Kharif", "Season_Rabi", "Season_Summer", "Season_Whole Year", "Season_Winter",
    "State_Arunachal Pradesh", "State_Assam", "State_Bihar", "State_Chhattisgarh", "State_Delhi", "State_Goa",
    "State_Gujarat", "State_Haryana", "State_Himachal Pradesh", "State_Jammu and Kashmir", "State_Jharkhand",
    "State_Karnataka", "State_Kerala", "State_Madhya Pradesh", "State_Maharashtra", "State_Manipur",
    "State_Meghalaya", "State_Mizoram", "State_Nagaland", "State_Odisha", "State_Puducherry", "State_Punjab",
    "State_Sikkim", "State_Tamil Nadu", "State_Telangana", "State_Tripura", "State_Uttar Pradesh",
    "State_Uttarakhand", "State_West Bengal"
]

# Load models with error handling
try:
    model_crop = joblib.load("crop_model.pkl")
    model_flood = joblib.load("flood_model.pkl")
    with open("xgb_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
    with open("power_transformer.pkl", "rb") as scaler_file:
        pt = pickle.load(scaler_file)
    with open("feature_columns.pkl", "rb") as feature_file:
        feature_columns = pickle.load(feature_file)
except Exception as e:
    print("Error loading models or files:", e)

@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    try:
        data = request.get_json()
        features = [
            float(data['N']), float(data['P']), float(data['K']), 
            float(data['temperature']), float(data['humidity']), 
            float(data['ph']), float(data['rainfall'])
        ]
        prediction = model_crop.predict([features])[0]
        return jsonify({'crop': prediction})
    except Exception as e:
        print("Error in predict_crop:", traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/predict-flood', methods=['POST'])
def predict_flood():
    try:
        data = request.get_json()
        features = [
            float(data['march_may']),
            float(data['avg_june']),
            float(data['increase_may_june'])
        ]
        prediction = model_flood.predict([features])[0]
        result = "Severe flood possible" if prediction == 1 else "No severe flood risk"
        return jsonify({'flood_risk': result})
    except Exception as e:
        print("Error in predict_flood:", traceback.format_exc())
        return jsonify({'error': str(e)}), 500

model = joblib.load("xgb_model.pkl")
power_transformer = joblib.load("power_transformer.pkl")
feature_columns = joblib.load("feature_columns.pkl")


last_prediction = None  

@app.route("/predict-yield", methods=["POST"])
def predict_yield():
    global last_prediction  # Declare global to modify it inside function

    try:
        data = request.get_json(silent=True)
        if not data or "features" not in data:
            return jsonify({"error": "Invalid input data, missing 'features' key"}), 400

        features = np.array(data["features"]).reshape(1, -1)
        received_features_count = features.shape[1]
        print(f"Number of features received: {received_features_count}")  

        # Check feature length consistency
        expected_features_count = len(feature_columns)
        print(f"Expected number of features: {expected_features_count}")

        if received_features_count != expected_features_count:
            return jsonify({
                "error": f"Feature shape mismatch, expected: {expected_features_count}, got: {received_features_count}"
            }), 400

        # Convert features to DataFrame
        features_df = pd.DataFrame(features, columns=feature_columns)
        print("Feature DataFrame before transformation:", features_df)

        # Apply transformation
        try:
            features_scaled = power_transformer.transform(features_df)
        except Exception as e:
            print("Error during transformation:", str(e))
            return jsonify({"error": "PowerTransformer transformation failed: " + str(e)}), 500

        # Make prediction
        prediction = model.predict(features_scaled)[0]
        prediction = round(float(prediction), 2)  # Convert to float and round

        # Store prediction in global variable
        last_prediction = prediction

        return jsonify({"predicted_yield": prediction})

    except Exception as e:
        print("Unexpected error:", str(e))  
        return jsonify({"error": str(e)}), 500

API_KEY = "AIzaSyAg-lHInahmhaketm-uTe8RWZSo_2VTh6k"

@app.route("/predict_yield_explain", methods=["POST"])
def predict_yield_explain():
    try:
        data = request.json
        predicted_yield = data.get("predicted_yield")
        input_features = data.get("input_features")  # Get the input data used for prediction

        if predicted_yield is None or input_features is None:
            return jsonify({"error": "Missing prediction value or input features."}), 400

        # Extract relevant features from input
        rainfall = input_features.get("Annual_Rainfall", "unknown")
        pesticide = input_features.get("Pesticide", "unknown")
        state = [k.replace("State_", "").replace("", " ") for k, v in input_features.items() if k.startswith("State") and v == 1]
        season = [k.replace("Season_", "").replace("", " ") for k, v in input_features.items() if k.startswith("Season") and v == 1]
        crop = [k.replace("Crop_", "").replace("", " ") for k, v in input_features.items() if k.startswith("Crop") and v == 1]

        state = state[0] if state else "unknown"
        season = season[0] if season else "unknown"
        crop = crop[0] if crop else "unknown"

        # Construct a simple explanation based on available inputs
        prompt = f"""
        The predicted crop yield is {predicted_yield} tons per hectare. The following conditions influenced this prediction:
        - Crop: {crop}
        - State: {state}
        - Season: {season}
        - Annual Rainfall: {rainfall} mm
        - Pesticide Usage: {pesticide} units
        Provide an explanation considering these factors.
        """

        # Call Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
        headers = {'Content-Type': 'application/json'}
        payload = {"contents": [{"parts": [{"text": prompt}]}]}

        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            try:
                explanation = result["candidates"][0]["content"]["parts"][0]["text"]
                print(explanation)
                return jsonify({"response": explanation})
            except (KeyError, IndexError):
                return jsonify({"error": "Unexpected response format"}), 500
        else:
            return jsonify({"error": f"API Error {response.status_code}", "details": response.text}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
@app.route("/generate", methods=["POST"])  # ✅ Fixed route
def generate_content():
    try:
        global API_KEY
        # Extract JSON input from the React request
        data = request.json
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400  # Bad Request

        # Gemini API Endpoint
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
        headers = {'Content-Type': 'application/json'}
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        # Send request to Gemini API
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            result = response.json()

            # Extract AI response safely
            try:
                if "candidates" in result and result["candidates"]:
                    ai_response = result["candidates"][0]["content"]["parts"][0]["text"]
                    return jsonify({"response": ai_response})
                else:
                    return jsonify({"error": "No valid response from AI"}), 500  # Internal Server Error
            except (KeyError, IndexError):
                return jsonify({"error": "Unexpected response format"}), 500
        else:
            return jsonify({"error": f"API Error {response.status_code}", "details": response.text}), response.status_code

    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500  # General server error

if __name__ == '__main__':
    app.run(debug=True)
