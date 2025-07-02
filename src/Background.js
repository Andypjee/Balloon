// src/Background.js
import React from "react";

function Background() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none", 
        }}
      >
        <div className="sun"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>
        <div className="cloud cloud5"></div>
        <div className="cloud cloud6"></div>
        <div className="cloud cloud7"></div>
        <div className="plane"></div>
        <div
          className="bird"
          style={{ top: "230px", animationDelay: "0s" }}
        ></div>
        <div
          className="bird"
          style={{ top: "250px", animationDelay: "2s" }}
        ></div>
        <div
          className="bird"
          style={{ top: "210px", animationDelay: "4s" }}
        ></div>
      </div>
    </>
  );
}

export default Background;
