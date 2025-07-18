import React, { useState } from "react";
import StoneRow from "./components/StoneRow";
import Holzblock from "./components/Holzblock";
import "./App.css";

const STEINE = Array.from({ length: 13 }, (_, i) => i + 1);

function berechneSumme(steine) {
  return steine.reduce((sum, s) => sum + s, 0);
}

function App() {
  // Gruppen: zwei Reihen
  const [gruppen1, setGruppen1] = useState([]);
  const [gruppen2, setGruppen2] = useState([]);
  // Serien: zwei Reihen
  const [serien1, setSerien1] = useState([]);
  const [serien2, setSerien2] = useState([]);
  // Seitensteine: zwei Reihen
  const [seitensteine1, setSeitensteine1] = useState([]);
  const [seitensteine2, setSeitensteine2] = useState([]);
  // Strafpunkte: zwei Reihen
  const [strafpunkte1, setStrafpunkte1] = useState([]);
  const [strafpunkte2, setStrafpunkte2] = useState([]);

  // Zusammenführen für Logik und Visualisierung
  const gruppen = [...gruppen1, ...gruppen2];
  const serien = [...serien1, ...serien2];
  const seitensteine = [...seitensteine1, ...seitensteine2];
  const strafpunkte = [...strafpunkte1, ...strafpunkte2];

  const summeGruppen = berechneSumme(gruppen);
  const summeSerien = berechneSumme(serien);
  const summeSeiten = berechneSumme(seitensteine);
  const seitenDurch3 = Math.floor(summeSeiten / 3);
  const seitenRest = summeSeiten % 3;
  const gesamt = summeGruppen + summeSerien + seitenDurch3;
  const summeStrafpunkte = berechneSumme(strafpunkte);

  return (
    <div className="container">
      <h1>101 Okey Augenzahl Rechner</h1>
      <StoneRow
        title="Gruppen"
        selected={gruppen1}
        setSelected={setGruppen1}
        selected2={gruppen2}
        setSelected2={setGruppen2}
        colorType="rot"
      />
      <StoneRow
        title="Serien"
        selected={serien1}
        setSelected={setSerien1}
        selected2={serien2}
        setSelected2={setSerien2}
        colorType="blau"
      />
      <StoneRow
        title="Seitensteine"
        selected={seitensteine1}
        setSelected={setSeitensteine1}
        selected2={seitensteine2}
        setSelected2={setSeitensteine2}
        colorType="gelb"
      />
      <StoneRow
        title="Strafpunkte"
        selected={strafpunkte1}
        setSelected={setStrafpunkte1}
        selected2={strafpunkte2}
        setSelected2={setStrafpunkte2}
        colorType="schwarz"
      />
      <div className="ergebnis">
        <h2>Ergebnis</h2>
        <Holzblock
          gruppen={gruppen}
          serien={serien}
          seitensteine={seitensteine}
          strafpunkte={strafpunkte}
        />
        <p>
          Gruppen: <b>{summeGruppen}</b>
        </p>
        <p>
          Serien: <b>{summeSerien}</b>
        </p>
        <p>
          Seitensteine: <b>{summeSeiten}</b> &rarr; {summeSeiten} / 3 ={" "}
          <b>{seitenDurch3}</b> Rest <b>{seitenRest}</b>
        </p>
        <hr />
        <p>
          Gesamtsumme: <b>{gesamt}</b> (Rest Seitensteine: {seitenRest})
        </p>
        <p>
          Strafpunkte: <b>{summeStrafpunkte}</b>
        </p>
      </div>
    </div>
  );
}

export default App;
