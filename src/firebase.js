// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4pavOY899IRbHNsDrOkv2IIM0BvlNIN8",
  authDomain: "ballon-9b766.firebaseapp.com",
  projectId: "ballon-9b766",
  storageBucket: "ballon-9b766.appspot.com", // let op, correct storage bucket url
  messagingSenderId: "347691276789",
  appId: "1:347691276789:web:47c5cab3dd526f7b4628bc",
  measurementId: "G-59BWT69R81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth en db zodat je ze kan gebruiken in andere bestanden
export { auth, db };
