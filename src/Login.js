// src/Login.js
import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

async function ensureUserDocument(user, name) {
  const userRef = doc(db, "Users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: name || user.displayName || "",
      email: user.email,
      private: false,
      friends: [],
      friendRequests: [],
    });
  }
}

function Login({ onLogin }) {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        onLogin(); // Sluit login modal in App
        navigate("/"); // Optioneel: ga terug naar home
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, onLogin]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await ensureUserDocument(userCredential.user);
    } catch (error) {
      console.error("Google login mislukt:", error.message);
      setError("Google login mislukt.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await ensureUserDocument(userCredential.user);
      // onLogin() en navigatie gebeurt in onAuthStateChanged
    } catch (error) {
      setError(
        "Email login mislukt. Controleer je gegevens en probeer het opnieuw."
      );
      console.error("Email login mislukt:", error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await ensureUserDocument(userCredential.user, name);
      // onLogin() en navigatie gebeurt in onAuthStateChanged
    } catch (error) {
      setError("Registratie mislukt. Probeer het opnieuw.");
      console.error("Registratie mislukt:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Uitloggen mislukt:", error.message);
    }
  };

  if (user) {
    return (
      <div className="login-bg">
        <div className="login-card">
          <h2>Welkom, {user.displayName || user.email}!</h2>
          <button onClick={handleLogout}>Uitloggen</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>{register ? "Registreren" : "Inloggen"}</h2>
        <form className="name" onSubmit={register ? handleRegister : handleEmailLogin}>
          {register && (
            <input
              type="text"
              placeholder="Naam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="login-input"
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button
            type="submit"
            className="add-friend-button"
            style={{ width: "100%" }}
          >
            {register ? "Registreren" : "Inloggen"}
          </button>
        </form>

        <button
          className="close-popup-button"
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={() => setRegister(!register)}
        >
          {register
            ? "Heb je al een account? Inloggen"
            : "Nog geen account? Registreren"}
        </button>

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleLogin}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 20, marginRight: 8, verticalAlign: "middle" }}
          />
          Inloggen met Google
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
