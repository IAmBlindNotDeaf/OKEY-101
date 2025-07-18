import React from "react";
import StoneButton from "./StoneButton";

function getSteine(title) {
  if (title === "Serien") {
    return Array.from({ length: 11 }, (_, i) => i + 2); // 2 bis 12
  }
  return Array.from({ length: 13 }, (_, i) => i + 1); // 1 bis 13
}

function StoneRow({
  title,
  selected,
  setSelected,
  colorType,
  selected2,
  setSelected2,
}) {
  const STEINE = getSteine(title);
  const toggleStein = (wert, selectedArr, setSelectedArr) => {
    if (selectedArr.includes(wert)) {
      setSelectedArr(selectedArr.filter((s) => s !== wert));
    } else {
      setSelectedArr([...selectedArr, wert]);
    }
  };

  return (
    <div className="steinreihe">
      <h3>{title}</h3>
      <div className="steine">
        {STEINE.map((wert) => (
          <StoneButton
            key={wert}
            wert={wert}
            selected={selected.includes(wert)}
            onClick={() => toggleStein(wert, selected, setSelected)}
            colorType={colorType}
          />
        ))}
      </div>
      {selected2 && setSelected2 && (
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
