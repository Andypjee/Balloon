import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

function Geschiedenis({ user }) {
  const [antwoorden, setAntwoorden] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAntwoorden = async () => {
      try {
        const q = query(
          collection(db, "antwoorden"),
          where("uid", "==", user.uid),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setAntwoorden(data);
      } catch (error) {
        console.error("Fout bij ophalen:", error);
      }
    };

    fetchAntwoorden();
  }, [user]);

  return (
    <div className="geschiedenis-container">
      <h3>Jouw vorige boodschappen:</h3>
      <ul>
        {antwoorden.map((a, i) => (
          <li key={i}>{a.tekst}</li>
        ))}
      </ul>
    </div>
  );
}

export default Geschiedenis;
