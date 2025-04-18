import React from 'react';

const ClimatePrediction = ({ onBack }) => {
  return (
    <div className="prediction-form-container">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Climate Prediction</h2>
      <div className="placeholder-content">
        <p>Climate prediction analysis coming soon...</p>
      </div>
    </div>
  );
};

export default ClimatePrediction;