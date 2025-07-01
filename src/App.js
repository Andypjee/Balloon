import React, { useState } from "react";
import "./App.css";

function Balloon() {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);

  const handleRelease = () => {
    if (text.trim() !== "") {
      setReleased(true);
      setTimeout(() => {
        setText("");
        setReleased(false);
      }, 5000); // Reset na animatie
    }
  };

  return (
    <div className="balloon-container">
      <div className={`balloon ${released ? "released" : ""}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Schrijf hier iets..."
        />
      </div>
      <button onClick={handleRelease}>Loslaten</button>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* Zon */}
      <div className="sun"></div>

      {/* Wolken */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
      <div className="cloud cloud5"></div>
      <div className="cloud cloud6"></div>
      <div className="cloud cloud7"></div>

      {/* Vliegtuig */}
      <div className="plane"></div>

      {/* Vogels */}
      <div className="bird" style={{ top: "230px", animationDelay: "0s" }}></div>
      <div className="bird" style={{ top: "250px", animationDelay: "2s" }}></div>
      <div className="bird" style={{ top: "210px", animationDelay: "4s" }}></div>

      {/* Ballon met input */}
      <Balloon />
    </div>
  );
}

export default App;
