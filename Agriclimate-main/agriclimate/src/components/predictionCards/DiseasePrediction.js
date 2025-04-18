import React from 'react';

const DiseasePrediction = ({ onBack }) => {
  return (
    <div className="prediction-form-container">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Disease Prediction</h2>
      <div className="placeholder-content">
        <p>Disease prediction tools coming soon...</p>
        {/* You can add a form similar to CropPrediction here later */}
      </div>
    </div>
  );
};

export default DiseasePrediction;