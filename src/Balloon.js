// src/Balloon.js
import React, { useState } from "react";
import "./Balloon.css";

function Balloon() {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);

  const handleClick = () => setReleased(true);

  return (
    <div className="balloon-container">
      <div className={`balloon ${released ? "released" : ""}`}>
        <textarea
          placeholder="Schrijf je boodschap..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>Loslaten</button>
    </div>
  );
}

export default Balloon;
