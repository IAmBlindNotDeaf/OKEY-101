import React from "react";
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
}) {
  const STEINE = getSteine(title);
  // Für Seitensteine und Strafpunkte: Mehrfachauswahl bis 4x
  const isMulti = title === "Ss" || title === "Sp";

  const addStein = (wert) => {
    if (isMulti) {
      const count = selected.filter((s) => s === wert).length;
      if (count < 4) setSelected([...selected, wert]);
    } else {
      if (!selected.includes(wert)) setSelected([...selected, wert]);
      else setSelected(selected.filter((s) => s !== wert));
    }
  };

  const removeStein = (wert) => {
    if (isMulti) {
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
      <div
        className="steine"
        style={vertical ? { flexDirection: "column", alignItems: "flex-start" } : {}}
      >
        {STEINE.map((wert) => {
          const count = selected.filter((s) => s === wert).length;
          return (
            <div key={wert} style={{ display: 'flex', alignItems: 'center', marginBottom: vertical ? 2 : 0 }}>
              <StoneButton
                wert={count > 0 ? `${wert}×${count}` : wert}
                selected={count > 0}
                onClick={() => addStein(wert)}
                colorType={colorType}
              />
              {isMulti && count > 0 && (
                <button
                  style={{ marginLeft: 2, width: 18, height: 18, fontSize: 12, borderRadius: '50%', border: '1px solid #888', background: '#fff', color: '#d32f2f', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
