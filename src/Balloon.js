// src/Balloon.js
import React, { useState } from "react";
import "./Balloon.css";
import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Balloon() {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);

  const handleRelease = async () => {
    if (text.trim() === "") return;

    setReleased(true);

    try {
      await addDoc(collection(db, "antwoorden"), {
        tekst: text,
        timestamp: serverTimestamp(),
        uid: auth.currentUser?.uid || null,
      });
    } catch (err) {
      console.error("Fout bij opslaan:", err);
    }

    setTimeout(() => {
      setText("");
      setReleased(false);
    }, 5000);
  };

  return (
    <div className="balloon-container">
      <div className={`balloon ${released ? "released" : ""}`}>
        <textarea
          placeholder="Schrijf je boodschap..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button onClick={handleRelease}>Loslaten</button>
    </div>
  );
}

export default Balloon;
