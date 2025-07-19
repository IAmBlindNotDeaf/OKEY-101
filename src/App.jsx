import React, { useState } from "react";
import StoneRow from "./components/StoneRow";
import Holzblock from "./components/Holzblock";
import "./App.css";

const STEINE = Array.from({ length: 13 }, (_, i) => i + 1);

function berechneSumme(steine) {
  return steine.reduce((sum, s) => sum + s, 0);
}

function App() {
  // Gruppen
  const [gruppen, setGruppen1] = useState([]);
  // Serien
  const [serien, setSerien] = useState([]);
  // Seitensteine
  const [seitensteine1, setSeitensteine1] = useState([]);

  // Zusammenführen für Logik und Visualisierung
  const gruppenSteine = [gruppen];
  const serienSteine = [serien];
  const seitensteine = [seitensteine1];

  // Neue Berechnung für Gruppen, Serien, Seitensteine
  // Gruppen: Augenzahl * 3 pro Stein
  const summeGruppen = gruppen.reduce((sum, s) => sum + s * 3, 0);
  // Serien: Summe aller Werte in allen Bereichen
  const summeSerien = serien.reduce(
    (sum, bereich) => sum + bereich.reduce((bSum, v) => bSum + v, 0),
    0
  );
  // Seitensteine: Nur zählen, wenn sie an eine Gruppe angereiht werden können (pro Gruppe maximal einer)
  let verwendeteGruppen = [];
  let verwendeteYanTas = [];
  let summeSeiten = 0;
  gruppen.forEach((g) => {
    const idx = seitensteine1.findIndex(
      (s, i) => !verwendeteYanTas[i] && s === g
    );
    if (idx !== -1) {
      summeSeiten += seitensteine1[idx];
      verwendeteYanTas[idx] = true;
      verwendeteGruppen.push(g);
    }
  });
  // Gesamtsumme: (Gruppen + Serien + Seitensteine) / 3
  const gesamtRoh = summeGruppen + summeSerien + summeSeiten;
  const gesamt = Math.floor(gesamtRoh / 3);
  const rest = gesamtRoh % 3;

  return (
    <div className="container">
      <h1>101 Okey</h1>
      <div className="stone-row-columns">
        <StoneRow
          title="Matrix"
          gruppenSelected={gruppen}
          setGruppenSelected={setGruppen1}
          yanTasSelected={seitensteine1}
          setYanTasSelected={setSeitensteine1}
          serienBereiche={serien}
          setSerienBereiche={setSerien}
        />
      </div>
      <div className="ergebnis">
        <Holzblock
          gruppen={gruppen}
          serien={serien}
          seitensteine={seitensteine1}
        />
        <p>
          Puan: <b>{gesamt}</b> (Yan: {rest})
        </p>
      </div>
    </div>
  );
}
export default App;
