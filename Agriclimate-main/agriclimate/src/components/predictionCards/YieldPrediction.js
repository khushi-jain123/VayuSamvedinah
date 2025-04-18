import React, { useState } from "react";

const CropPredictionForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    Annual_Rainfall: "",
    Pesticide: "",
    Crop_Arhar_Tur: "",
    Crop_Bajra: "",
    Crop_Banana: "",
    Crop_Barley: "",
    Crop_Black_pepper: "",
    Crop_Cardamom: "",
    Crop_Cashewnut: "",
    Crop_Castor_seed: "",
    Crop_Coconut: "",
    Crop_Coriander: "",
    Crop_Cotton_lint: "",
    Crop_Cowpea_Lobia: "",
    Crop_Dry_chillies: "",
    Crop_Garlic: "",
    Crop_Ginger: "",
    Crop_Gram: "",
    Crop_Groundnut: "",
    Crop_Guar_seed: "",
    Crop_Horse_gram: "",
    Crop_Jowar: "",
    Crop_Jute: "",
    Crop_Khesari: "",
    Crop_Linseed: "",
    Crop_Maize: "",
    Crop_Masoor: "",
    Crop_Mesta: "",
    Crop_Moong_Green_Gram: "",
    Crop_Moth: "",
    Crop_Niger_seed: "",
    Crop_Oilseeds_total: "",
    Crop_Onion: "",
    Crop_Other_Rabi_pulses: "",
    Crop_Other_Cereals: "",
    Crop_Other_Kharif_pulses: "",
    Crop_Other_Summer_Pulses: "",
    Crop_Peas_beans_Pulses: "",
    Crop_Potato: "",
    Crop_Ragi: "",
    Crop_Rapeseed_Mustard: "",
    Crop_Rice: "",
    Crop_Safflower: "",
    Crop_Sannhamp: "",
    Crop_Sesamum: "",
    Crop_Small_millets: "",
    Crop_Soyabean: "",
    Crop_Sugarcane: "",
    rop_Sunflower: "",
    Crop_Sweet_potato: "",
    Crop_Tapioca: "",
    Crop_Tobacco: "",
    Crop_Turmeric: "",
    Crop_Urad: "",
    Crop_Wheat: "",
    Crop_other_oilseeds: "",
    Season_Kharif: "",
    Season_Rabi: "",
    Season_Summer: "",
    Season_Whole_Year: "",
    Season_Winter: "",
    State_Arunachal_Pradesh: "",
    State_Assam: "",
    State_Bihar: "",
    State_Chhattisgarh: "",
    State_Delhi: "",
    State_Goa: "",
    State_Gujarat: "",
    State_Haryana: "",
    State_Himachal_Pradesh: "",
    State_Jammu_and_Kashmir: "",
    State_Jharkhand: "",
    State_Karnataka: "",
    State_Kerala: "",
    State_Madhya_Pradesh: "",
    State_Maharashtra: "",
    State_Manipur: "",
    State_Meghalaya: "",
    State_Mizoram: "",
    State_Nagaland: "",
    State_Odisha: "",
    State_Puducherry: "",
    State_Punjab: "",
    State_Sikkim: "",
    State_Tamil_Nadu: "",
    State_Telangana: "",
    State_Tripura: "",
    State_Uttar_Pradesh: "",
    State_Uttarakhand: "",
    State_West_Bengal: ""
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [explanation, setExplanationResult] = useState(null);
  const [error, setError] = useState(null);

  const states = Object.keys(formData).filter((key) => key.startsWith("State_"));
  const seasons = Object.keys(formData).filter((key) => key.startsWith("Season_"));

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      states.forEach((state) => (updatedData[state] = "0"));
      updatedData[selectedState] = "1";
      return updatedData;
    });
  };

  const handleSeasonChange = (e) => {
    const selectedSeason = e.target.value;
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      seasons.forEach((season) => (updatedData[season] = "0"));
      updatedData[selectedSeason] = "1";
      return updatedData;
    });
  };

  const handleCropChange = (e) => {
    const selectedCrop = e.target.value;
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      Object.keys(updatedData).forEach((key) => {
        if (key.startsWith("Crop_")) {
          updatedData[key] = "0"; // Reset all crop fields to 0
        }
      });
      updatedData[selectedCrop] = "1"; // Mark the selected crop as 1
      return updatedData;
    });
  };

  const convertToHTML = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\n\* (.*?)(?=\n|$)/g, "<ul><li>$1</li></ul>")
      .replace(/<\/ul>\n<ul>/g, "")
      .replace(/([^\n])\n([^\n])/g, "$1<br>$2");
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featureValues = Object.values(formData).map((value) =>
        value === "" ? 0 : parseFloat(value)
    );

    const requestData = {
        features: featureValues
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/predict-yield', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            setPredictionResult(result.predicted_yield);

            // Prepare input data for explanation
            const explanationData = {
                predicted_yield: result.predicted_yield,
                input_features: formData // Send raw input data for better explanation
            };

            const explanationResponse = await fetch('http://127.0.0.1:5000/predict_yield_explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(explanationData)
            });

            const explanationResult = await explanationResponse.json();

            if (explanationResponse.ok) {
                setExplanationResult(convertToHTML(explanationResult.response || "No response received"));
            } else {
                console.error("Explanation Error:", explanationResult);
                alert(explanationResult.error || "An error occurred during explanation.");
            }
        } else {
            console.error("Error Response:", result);
            alert(result.error || "An error occurred during prediction.");
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("An error occurred while communicating with the server.");
    }
};


  return (
    <div className="crop-prediction-container">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      <h2>Yield Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Annual Rainfall:</label>
          <input
            type="number"
            name="Annual_Rainfall"
            value={formData.Annual_Rainfall}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Crop:</label>
          <select name="crop" onChange={handleCropChange} required>
            <option value="">--Select a Crop--</option>
            {Object.keys(formData)
              .filter((key) => key.startsWith("Crop_"))
              .map((crop) => (
                <option key={crop} value={crop}>
                  {crop.replace("Crop_", "").replace(/_/g, " ")}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Pesticide Usage:</label>
          <input
            type="number"
            name="Pesticide"
            value={formData.Pesticide}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Select State:</label>
          <select name="state" onChange={handleStateChange} required>
            <option value="">--Select a State--</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state.replace("State_", "").replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Season:</label>
          <select name="season" onChange={handleSeasonChange} required>
            <option value="">--Select a Season--</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season.replace("Season_", "").replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="predict-button">
          Predict Yield
        </button>
      </form>

      {predictionResult && (
        <div className="result-container">
          <h3 className="result">Predicted Yield: {predictionResult}</h3>
          {explanation && (
            <div className="explanation">
              <h4>Explanation:</h4>
              <p dangerouslySetInnerHTML={{ __html: explanation }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CropPredictionForm;