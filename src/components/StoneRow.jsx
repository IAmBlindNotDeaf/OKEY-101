import React, { useState } from "react";
import StoneButton from "./StoneButton";

function getSteine(title) {
  if (title === "Se") {
    return Array.from({ length: 11 }, (_, i) => i + 2); // 2 bis 12
  }
  return Array.from({ length: 13 }, (_, i) => i + 1); // 1 bis 13
}

function StoneRow({
  title,
  selected,
  setSelected,
  colorType,
  vertical = false,
  selected2,
  setSelected2,
  gruppenSelected,
  setGruppenSelected,
  yanTasSelected,
  setYanTasSelected,
  serienSelected,
  setSerienSelected,
  serienBereiche,
  setSerienBereiche,
}) {
  const STEINE = getSteine(title);

  // Für die Matrix-Ansicht: 1-13 Zeilen, 3 Spalten (Gruppen, Yan Tas, Serien), 4. Spalte für Serienbereiche
  if (title === "Matrix") {
    // Hilfsfunktionen für Mehrfachauswahl
    const getCount = (arr, wert) => arr.filter((s) => s === wert).length;
    const addMulti = (arr, setArr, wert, max) => {
      const count = getCount(arr, wert);
      if (count < max) setArr([...arr, wert]);
    };
    const removeMulti = (arr, setArr, wert) => {
      const idx = arr.indexOf(wert);
      if (idx !== -1) {
        const newArr = [...arr];
        newArr.splice(idx, 1);
        setArr(newArr);
      }
    };
    // Bereichsauswahl für Serien
    const [rangeStart, setRangeStart] = useState(null);
    const addSerien = (wert) => {
      if (rangeStart === null) {
        setRangeStart(wert);
      } else {
        const start = Math.min(rangeStart, wert);
        const end = Math.max(rangeStart, wert);
        if (end - start >= 2) {
          const bereich = [];
          for (let v = start; v <= end; v++) bereich.push(v);
          setSerienBereiche([...serienBereiche, bereich]);
        }
        // Bereich zu kurz: einfach ignorieren und neue Auswahl starten
        setRangeStart(null);
      }
    };
    const removeBereich = (idx) => {
      const newArr = [...serienBereiche];
      newArr.splice(idx, 1);
      setSerienBereiche(newArr);
    };
    // Hilfsfunktion: Gibt es einen Bereich, der mit wert beginnt?
    const findBereich = (wert) => {
      const idx = serienBereiche.findIndex((b) => b[0] === wert);
      return idx;
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontWeight: "bold",
            marginBottom: 4,
            color: "var(--neon-green)",
          }}
        >
          <div style={{ width: 80 }}>Gruppen</div>
          <div style={{ width: 80 }}>Yan Tas</div>
          <div style={{ width: 80 }}>Serien</div>
          <div style={{ width: 80 }}>Serien löschen</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEINE.map((wert) => {
              const gruppenCount = getCount(gruppenSelected, wert);
              return (
                <div
                  key={wert}
                  style={{
                    width: 80,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 2,
                  }}
                >
                  <StoneButton
                    wert={gruppenCount > 0 ? `${wert}×${gruppenCount}` : wert}
                    selected={gruppenCount > 0}
                    onClick={() =>
                      addMulti(gruppenSelected, setGruppenSelected, wert, 2)
                    }
                    colorType="rot"
                  />
                  {gruppenCount > 0 && (
                    <button
                      style={{
                        marginLeft: 2,
                        width: 18,
                        height: 18,
                        fontSize: 12,
                        borderRadius: "50%",
                        border: "1px solid #888",
                        background: "#fff",
                        color: "#d32f2f",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        removeMulti(gruppenSelected, setGruppenSelected, wert)
                      }
                      type="button"
                      aria-label={`Entferne Gruppe ${wert}`}
                    >
                      &minus;
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEINE.map((wert) => {
              const yanTasCount = getCount(yanTasSelected, wert);
              return (
                <div
                  key={wert}
                  style={{
                    width: 80,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 2,
                  }}
                >
                  <StoneButton
                    wert={yanTasCount > 0 ? `${wert}×${yanTasCount}` : wert}
                    selected={yanTasCount > 0}
                    onClick={() =>
                      addMulti(yanTasSelected, setYanTasSelected, wert, 4)
                    }
                    colorType="gelb"
                  />
                  {yanTasCount > 0 && (
                    <button
                      style={{
                        marginLeft: 2,
                        width: 18,
                        height: 18,
                        fontSize: 12,
                        borderRadius: "50%",
                        border: "1px solid #888",
                        background: "#fff",
                        color: "#d32f2f",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        removeMulti(yanTasSelected, setYanTasSelected, wert)
                      }
                      type="button"
                      aria-label={`Entferne Yan Tas ${wert}`}
                    >
                      &minus;
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEINE.map((wert) => (
              <div
                key={wert}
                style={{
                  width: 80,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 2,
                }}
              >
                <StoneButton
                  wert={wert}
                  selected={false}
                  onClick={() => addSerien(wert)}
                  colorType="blau"
                />
              </div>
            ))}
          </div>
          {/* Serien löschen Spalte: alle Bereiche untereinander */}
          <div
            style={{ display: "flex", flexDirection: "column", minWidth: 80 }}
          >
            {STEINE.map((_, zeilenIdx) => {
              const bereich = serienBereiche[zeilenIdx];
              return (
                <div
                  key={zeilenIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                    minHeight: 28,
                    color: "var(--neon-green)",
                  }}
                >
                  {bereich ? (
                    <>
                      <span style={{ marginRight: 4 }}>
                        {bereich.join("-")}
                      </span>
                      <button
                        style={{
                          width: 18,
                          height: 18,
                          fontSize: 12,
                          borderRadius: "50%",
                          border: "1px solid #888",
                          background: "#fff",
                          color: "#d32f2f",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => removeBereich(zeilenIdx)}
                        type="button"
                        aria-label={`Entferne Bereich ${bereich.join("-")}`}
                      >
                        &minus;
                      </button>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  // Für Mehrfachauswahl: Serien (8x), Gruppen (2x), Seitensteine/Strafpunkte (4x)
  let multiMax = 1;
  if (title === "Serien") multiMax = 8;
  else if (title === "Gr" || title === "Gruppen") multiMax = 2;
  else if (title === "Yan Tas" || title === "Sp") multiMax = 4;
  const isMulti = multiMax > 1;

  // Bereichsauswahl für Serien (jetzt: Array von Arrays)
  const [rangeStart, setRangeStart] = useState(null);

  const addStein = (wert) => {
    if (title === "Serien") {
      if (rangeStart === null) {
        setRangeStart(wert);
      } else {
        // Bereich bestimmen
        const start = Math.min(rangeStart, wert);
        const end = Math.max(rangeStart, wert);
        const bereich = [];
        for (let v = start; v <= end; v++) {
          bereich.push(v);
        }
        setSelected([...selected, bereich]);
        setRangeStart(null);
      }
    } else {
      const count = selected.filter((s) => s === wert).length;
      if (count < multiMax) setSelected([...selected, wert]);
    }
  };

  const removeBereich = (idx) => {
    if (title === "Serien") {
      const newArr = [...selected];
      newArr.splice(idx, 1);
      setSelected(newArr);
    }
  };

  // Für andere Reihen wie gehabt:
  const removeStein = (wert) => {
    if (title !== "Serien") {
      const idx = selected.indexOf(wert);
      if (idx !== -1) {
        const newArr = [...selected];
        newArr.splice(idx, 1);
        setSelected(newArr);
      }
    }
  };

  return (
    <div className="steinreihe">
      <h3>{title}</h3>
      {title === "Serien" ? (
        <div
          className="steine"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          {selected.map((bereich, idx) => (
            <div
              key={idx}
              style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <StoneButton
                wert={bereich.join("-")}
                selected={true}
                onClick={() => {}}
                colorType={colorType}
              />
              <button
                style={{
                  marginLeft: 2,
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  borderRadius: "50%",
                  border: "1px solid #888",
                  background: "#fff",
                  color: "#d32f2f",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => removeBereich(idx)}
                type="button"
                aria-label={`Entferne Bereich ${bereich.join("-")}`}
              >
                &minus;
              </button>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {STEINE.map((wert) => (
              <StoneButton
                key={wert}
                wert={wert}
                selected={false}
                onClick={() => addStein(wert)}
                colorType={colorType}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="steine"
          style={
            vertical
              ? { flexDirection: "column", alignItems: "flex-start" }
              : {}
          }
        >
          {STEINE.map((wert) => {
            const count = selected.filter((s) => s === wert).length;
            return (
              <div
                key={wert}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: vertical ? 2 : 0,
                }}
              >
                <StoneButton
                  wert={count > 0 ? `${wert}×${count}` : wert}
                  selected={count > 0}
                  onClick={() => addStein(wert)}
                  colorType={colorType}
                />
                {isMulti && count > 0 && (
                  <button
                    style={{
                      marginLeft: 2,
                      width: 18,
                      height: 18,
                      fontSize: 12,
                      borderRadius: "50%",
                      border: "1px solid #888",
                      background: "#fff",
                      color: "#d32f2f",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => removeStein(wert)}
                    type="button"
                    aria-label={`Entferne ${wert}`}
                  >
                    &minus;
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {!vertical && selected2 && setSelected2 && (
        <div className="steine" style={{ marginTop: 6 }}>
          {STEINE.map((wert) => (
            <StoneButton
              key={wert + "-2"}
              wert={wert}
              selected={selected2.includes(wert)}
              onClick={() => toggleStein(wert, selected2, setSelected2)}
              colorType={colorType}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StoneRow;
