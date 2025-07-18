import React from "react";
import "./Holzblock.css";

const farben = ["#d32f2f", "#1976d2", "#fbc02d", "#222"]; // rot, blau, gelb, schwarz

function Stein({ wert, color, keyId }) {
  return (
    <div
      className="holz-stein"
      style={{ borderColor: color, color }}
      key={keyId}
    >
      {wert}
    </div>
  );
}

function Platzhalter({ keyId }) {
  return <div className="holz-stein platzhalter" key={keyId}></div>;
}

function istLueckenlos(arr) {
  if (arr.length < 2) return true;
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) return false;
  }
  return true;
}

function gruppiere(arr) {
  const map = {};
  arr.forEach((v) => {
    if (!map[v]) map[v] = [];
    map[v].push(v);
  });
  return Object.values(map);
}

function mitPlatzhaltern(blocks) {
  // Fügt zwischen Blöcken einen Platzhalter ein
  const result = [];
  blocks.forEach((block, idx) => {
    if (idx > 0) result.push(<Platzhalter keyId={`ph-${idx}`} />);
    result.push(...block);
  });
  return result;
}

function auf14Felder(arr) {
  // Füllt das Array auf 14 Felder mit Platzhaltern auf
  const res = [...arr];
  while (res.length < 14) {
    res.push(<Platzhalter keyId={`fill-${res.length}`} />);
  }
  return res.slice(0, 14);
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function Holzblock({ gruppen, serien, seitensteine }) {
  // Jede Gruppe und Serie als eigener Block
  const gruppenBlocks = gruppen.map((wert) => [wert]);
  const serienBlocks = serien.map((wert) => [wert]);

  // Seitensteine-Zuordnung: bevorzugt an Serien
  let verwendeteSeitensteine = new Set();
  let seitenZuSerien = [];
  let seitenZuGruppen = [];

  // 1. Versuche, Seitensteine an Serien anzulegen
  serienBlocks.forEach((block, sidx) => {
    const steine = block.flatMap((wert) => {
      return [wert - 1, wert, wert + 1].map((v) => {
        let anzeige = v;
        if (v < 2) anzeige = 1;
        if (v > 12) anzeige = 13;
        return anzeige;
      });
    });
    let serienSteine = [...steine];
    let zuSerien = [];
    seitensteine.forEach((s, idx) => {
      if (verwendeteSeitensteine.has(idx)) return;
      const min = Math.min(...serienSteine);
      const max = Math.max(...serienSteine);
      if ((s === min - 1 && min > 1) || (s === max + 1 && max < 13)) {
        const testArr = [...serienSteine, s];
        if (istLueckenlos(testArr)) {
          serienSteine.push(s);
          verwendeteSeitensteine.add(idx);
          zuSerien.push(s);
        }
      }
    });
    seitenZuSerien.push(zuSerien);
  });

  // 2. Übrige Seitensteine an Gruppen anlegen (blockweise, pro Block maximal 1 Seitenstein)
  gruppenBlocks.forEach((block, gidx) => {
    const wert = block[0];
    let zuGruppe = [];
    // Finde den ersten passenden, noch nicht verwendeten Seitenstein
    for (let sidx = 0; sidx < seitensteine.length; sidx++) {
      if (verwendeteSeitensteine.has(sidx)) continue;
      if (seitensteine[sidx] === wert) {
        zuGruppe.push(seitensteine[sidx]);
        verwendeteSeitensteine.add(sidx);
        break; // Nur einen pro Block
      }
    }
    seitenZuGruppen.push(zuGruppe);
  });

  // Blöcke mit Typ-Info
  const allBlocks = [
    ...gruppenBlocks.map((block, idx) => ({
      type: "gruppe",
      block,
      seiten: seitenZuGruppen[idx] || [],
      key: `gblock-${idx}`,
    })),
    ...serienBlocks.map((block, idx) => ({
      type: "serie",
      block,
      seiten: seitenZuSerien[idx] || [],
      key: `sblock-${idx}`,
    })),
  ];

  // Visualisierung der Blöcke
  const visualBlocks = allBlocks.map((b, blockIdx) => {
    if (b.type === "gruppe") {
      const wert = b.block[0];
      return [
        ...farben
          .slice(0, 3)
          .map((color, i) => (
            <Stein
              wert={wert}
              color={color}
              keyId={`g-${wert}-${blockIdx}-${i}`}
            />
          )),
        ...b.seiten.map((s, i) => (
          <Stein
            wert={s}
            color={farben[3]}
            keyId={`ss-gruppe-${s}-${blockIdx}-${i}`}
          />
        )),
      ];
    } else {
      // Serie
      const steine = b.block.flatMap((wert) => {
        return [wert - 1, wert, wert + 1].map((v, i) => {
          let anzeige = v;
          if (v < 2) anzeige = 1;
          if (v > 12) anzeige = 13;
          return { anzeige, i };
        });
      });
      return [
        ...steine.map((obj, i) => (
          <Stein
            wert={obj.anzeige}
            color={farben[1]}
            keyId={`s-${obj.anzeige}-${blockIdx}-${i}`}
          />
        )),
        ...b.seiten.map((s, i) => (
          <Stein
            wert={s}
            color={farben[1]}
            keyId={`ss-serie-${s}-${blockIdx}-${i}`}
          />
        )),
      ];
    }
  });

  // Blöcke mit Platzhaltern verbinden
  const alleSteineMitPlatzhaltern = mitPlatzhaltern(visualBlocks);
  // In Zeilen zu je 14 Feldern aufteilen
  const zeilen = chunkArray(alleSteineMitPlatzhaltern, 14).map((zeile, i) =>
    auf14Felder(zeile)
  );

  return (
    <div className="holzblock">
      {zeilen.map((zeile, i) => (
        <div className="holz-reihe" key={`holzreihe-${i}`}>
          {zeile}
        </div>
      ))}
    </div>
  );
}

export default Holzblock;
