import React, { useState, useEffect } from "react";
import "./App.css";
import Balloon from "./Balloon";
import Login from "./Login";
import Geschiedenis from "./Geschiedenis";
import Background from "./Background";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [toonGeschiedenis, setToonGeschiedenis] = useState(false);
  const [toonLogin, setToonLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setToonLogin(false); // Sluit login scherm als ingelogd
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setToonGeschiedenis(false);
    } catch (error) {
      console.error("Uitloggen mislukt:", error.message);
    }
  };

  return (
    <div>
      <Background />

      <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 1000 }}>
        {!user ? (
          <button onClick={() => setToonLogin(true)}>Inloggen</button>
        ) : (
          <>
            <button onClick={() => setToonGeschiedenis(!toonGeschiedenis)}>
              Geschiedenis
            </button>
            {/* Hier wil je de uitlogknop */}
            <button onClick={handleLogout}>Uitloggen</button>
          </>
        )}
      </div>

      {/* Dit is het stukje dat je moet aanpassen: */}
      {toonLogin ? (
        <Login onLogin={() => setToonLogin(false)} />
      ) : toonGeschiedenis ? (
        <Geschiedenis user={user} />
      ) : (
        <Balloon user={user} />
      )}
    </div>
  );
}

export default App;
