import React, { useState } from 'react';

const FloodPrediction = ({ onBack }) => {
  const [formData, setFormData] = useState({
    march_may: '',  // Rainfall between March and May
    avg_june: '',   // Average rainfall in June (calculated as June/3)
    increase_may_june: '',  // Difference in rainfall between May and June
  });

  const [floodRisk, setFloodRisk] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      march_may: formData.march_may,
      avg_june: formData.avg_june,
      increase_may_june: formData.increase_may_june,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict-flood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.flood_risk) {
        setFloodRisk(result.flood_risk);
      } else {
        setError(result.error || 'An error occurred during prediction.');
      }
    } catch (err) {
      setError('An error occurred while communicating with the server.');
    }
  };

  return (
    <div className="flood-prediction-container">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Flood Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rainfall from March to May:</label>
          <input
            type="number"
            name="march_may"
            value={formData.march_may}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Average Rainfall in June (calculated as June/3):</label>
          <input
            type="number"
            name="avg_june"
            value={formData.avg_june}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rainfall Increase from May to June:</label>
          <input
            type="number"
            name="increase_may_june"
            value={formData.increase_may_june}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="predict-button">Predict Flood Risk</button>
      </form>

      {floodRisk && <h3 className="result">Prediction: {floodRisk}</h3>}
      {error && <h3 className="error">{error}</h3>}
    </div>
  );
};

export default FloodPrediction;
