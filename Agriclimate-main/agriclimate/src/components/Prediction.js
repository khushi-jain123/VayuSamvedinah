import React, { useState } from 'react';
import '../styles/prediction.css';
import CropPredictionForm from './predictionCards/CropPrediction';
import YieldPrediction from './predictionCards/YieldPrediction';
import ClimatePrediction from './predictionCards/ClimatePrediction';
import DiseasePrediction from './predictionCards/DiseasePrediction';
import FloodPredictionForm from './predictionCards/FloodPrediction'; // Import Flood Prediction form
import yieldImage from './images/yeild.jpg';
import climateImage from './images/climate.jpg';
import diseaseImage from './images/disease.jpg';

const Prediction = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [cropResult, setCropResult] = useState(null);
  const [floodResult, setFloodResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const url = type === 'crop' ? 'http://127.0.0.1:5000/predict-crop' : 'http://127.0.0.1:5000/predict-flood';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (type === 'crop') {
      setCropResult(data.crop);
    } else {
      setFloodResult(data.flood);
    }
  };

  const predictionCards = [
    {
      id: 'crop',
      title: 'Crop Prediction',
      image: 'https://www.wur.nl/upload_mm/2/1/4/6fa31566-644f-402c-82c5-5a213e87a8f4_shutterstock_32185693_aardappelveld_akker_aardappelplant_akkerbouw_LR_750x400.jpg',
      component: <CropPredictionForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, 'crop')} // Passing 'crop' for crop prediction
        result={cropResult}
        onBack={() => setActiveCard(null)}
      />
    },
    {
      id: 'flood',
      title: 'Flood Prediction',
      image: 'https://media.gettyimages.com/id/1307195960/photo/a-child-standing-in-flooded-waters-on-a-soybean-field-near-a-wind-farm.jpg?s=612x612&w=0&k=20&c=sXpvy2srJWa3eVhjBjKPOzAdaraiOfoLugjY_yI7Y1c=', // Add image for flood prediction if available
      component: <FloodPredictionForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, 'flood')} // Passing 'flood' for flood prediction
        result={floodResult}
        onBack={() => setActiveCard(null)}
      />
    },
    {
      id: 'yield',
      title: 'Yield Prediction',
      image: yieldImage,

      component: <YieldPrediction onBack={() => setActiveCard(null)} />
    },
    
    
  ];

  return (
    <div className="prediction-container">
      {!activeCard ? (
        <>
          <h2>Agricultural Predictions</h2>
          <div className="cards-grid">
            {predictionCards.map((card) => (
              <div 
                key={card.id} 
                className="prediction-card"
                onClick={() => setActiveCard(card.id)}
              >
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>Click to view details</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        predictionCards.find(card => card.id === activeCard).component
      )}
    </div>
  );
};

export default Prediction;
