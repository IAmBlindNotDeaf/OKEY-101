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
  // Serien: vier Reihen
  const [serienRot, setSerienRot] = useState([]);
  const [serienBlau, setSerienBlau] = useState([]);
  const [serienGelb, setSerienGelb] = useState([]);
  const [serienSchwarz, setSerienSchwarz] = useState([]);
  // Seitensteine: zwei Reihen
  const [seitensteine1, setSeitensteine1] = useState([]);
  const [seitensteine2, setSeitensteine2] = useState([]);
  // Strafpunkte: zwei Reihen
  const [strafpunkte1, setStrafpunkte1] = useState([]);
  const [strafpunkte2, setStrafpunkte2] = useState([]);

  // Zusammenführen für Logik und Visualisierung
  const gruppen = [...gruppen1, ...gruppen2];
  const serien = [...serienRot, ...serienBlau, ...serienGelb, ...serienSchwarz];
  const seitensteine = [...seitensteine1, ...seitensteine2];
  const strafpunkte = [...strafpunkte1, ...strafpunkte2];

  const summeGruppen = berechneSumme(gruppen);
  const summeSerien = berechneSumme(serien);
  const summeSeiten = berechneSumme(seitensteine);
  const seitenDurch3 = Math.floor(summeSeiten / 3);
  const seitenRest = summeSeiten % 3;
  const gesamt = summeGruppen + summeSerien + seitenDurch3;
  const summeStrafpunkte = berechneSumme(strafpunkte);

  // Für Holzblock: Array von Arrays für Serien, damit die Farben eindeutig zugeordnet werden können
  const serienFarbig = [serienRot, serienBlau, serienGelb, serienSchwarz];

  return (
    <div className="container">
      <h1>101 Okey</h1>
      <div className="stone-row-columns">
        {[
          { selected: gruppen1, setSelected: setGruppen1, colorType: "rot" },
          { selected: gruppen2, setSelected: setGruppen2, colorType: "blau" },
        ].map((props) => (
          <StoneRow
            key={props.colorType}
            title="Gr"
            selected={props.selected}
            setSelected={props.setSelected}
            colorType={props.colorType}
            vertical
          />
        ))}
        {[
          { selected: serienRot, setSelected: setSerienRot, colorType: "rot" },
          {
            selected: serienBlau,
            setSelected: setSerienBlau,
            colorType: "blau",
          },
          {
            selected: serienGelb,
            setSelected: setSerienGelb,
            colorType: "gelb",
          },
          {
            selected: serienSchwarz,
            setSelected: setSerienSchwarz,
            colorType: "schwarz",
          },
        ].map((props) => (
          <StoneRow
            key={props.colorType}
            title="Se"
            selected={props.selected}
            setSelected={props.setSelected}
            colorType={props.colorType}
            vertical
          />
        ))}
        <StoneRow
          title="Ss"
          selected={seitensteine1}
          setSelected={setSeitensteine1}
          colorType="gelb"
          vertical
        />
        <StoneRow
          title="Sp"
          selected={strafpunkte1}
          setSelected={setStrafpunkte1}
          colorType="schwarz"
          vertical
        />
      </div>
      <div className="ergebnis">
        <Holzblock
          gruppen={gruppen}
          serien={serienFarbig}
          seitensteine={seitensteine}
          strafpunkte={strafpunkte}
        />

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
