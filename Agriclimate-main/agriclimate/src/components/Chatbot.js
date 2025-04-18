import React, { useState, useEffect } from "react";
import "../chat.css";
import "../styles/chatbot.css";

const Chatbot = ({ onBack }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState("auto"); // Default: Auto-detect

  let speechInstance = null;

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        const processedResponse = data.response ? convertBoldText(data.response) : "No response received";
        setResponse(processedResponse);
        speakText(data.response);
      } else {
        setResponse(data.error || "Error processing request");
      }
    } catch (error) {
      setResponse("Error connecting to server");
    }
  };

  const convertBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text) ? "hi-IN" : "en-US";
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      stopSpeaking();

      const lang = selectedLang === "auto" ? detectLanguage(text) : selectedLang;

      speechInstance = new SpeechSynthesisUtterance(text);
      speechInstance.lang = lang;
      speechInstance.rate = 1;
      speechInstance.pitch = 1;

      // Choose the correct voice
      const voice = voices.find((v) => v.lang === lang);
      if (voice) {
        speechInstance.voice = voice;
      }

      speechInstance.onstart = () => setIsSpeaking(true);
      speechInstance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(speechInstance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Kisan Mitra</h2>
      </div>

      <div className="chat-interface">
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your agriculture-related query here..."
          />
        </div>

        <button className="generate-button" onClick={handleGenerate}>
          Generate Response
        </button>

        {/* Language Selection */}
       

        {response && (
          <div className="response-container">
            <div className="response-title">Expert Response</div>
            <div className="response-content" dangerouslySetInnerHTML={{ __html: response }} />

            {/* Speak Button */}
            <button className="speak-button" onClick={() => speakText(response)}>
              🔊 Listen
            </button>

            {/* Stop Button */}
            {isSpeaking && (
              <button className="stop-button" onClick={stopSpeaking}>
                ⏹ Stop
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
