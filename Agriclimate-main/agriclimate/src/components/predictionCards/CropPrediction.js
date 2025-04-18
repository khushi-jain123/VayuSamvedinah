import React from 'react';

const CropPredictionForm = ({ formData, handleChange, handleSubmit, result, onBack }) => {
  return (
    <div className="prediction-form-container">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Crop Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="predict-button">Predict Crop</button>
      </form>
      {result && <h3 className="result">Recommended Crop: {result}</h3>}
    </div>
  );
};

export default CropPredictionForm;