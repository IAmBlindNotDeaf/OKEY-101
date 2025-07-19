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
  // gruppen bleibt wie gehabt
  const gruppenBlocks = gruppen.map((wert) => [wert]);

  // Serien ist jetzt ein Array von Bereichen (Arrays)
  const serienBlocks = Array.isArray(serien)
    ? serien.map((bereich, idx) => ({
        werte: bereich,
        farbeIdx: idx % 4, // 0=rot, 1=blau, 2=gelb, 3=schwarz
      }))
    : [];

  // Entferne die Logik, die Seitensteine an Serien anreiht
  // Seitensteine nur noch an Gruppen anlegen (blockweise, pro Block maximal 1 Seitenstein)
  let verwendeteSeitensteine = new Set();
  let seitenZuGruppen = [];

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
      block: block.werte,
      seiten: [], // keine Seitensteine mehr an Serien
      key: `sblock-${idx}`,
      farbeIdx: block.farbeIdx, // 0=rot, 1=blau, 2=gelb, 3=schwarz
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
      // Bereich als Block, ggf. mit Seitensteinen, alles sortiert
      let steineArr = [...b.block, ...b.seiten];
      steineArr = steineArr.map((v) => {
        let anzeige = v;
        if (anzeige < 2) anzeige = 1;
        if (anzeige > 12) anzeige = 13;
        return anzeige;
      });
      steineArr = Array.from(new Set(steineArr)).sort((a, b) => a - b);
      const color = farben[b.farbeIdx];
      return [
        ...steineArr.map((anzeige, i) => (
          <Stein
            wert={anzeige}
            color={color}
            keyId={`s-${anzeige}-${b.key}-${i}`}
          />
        )),
      ];
    }
  });

  // Blöcke mit Platzhaltern verbinden
  const alleSteineMitPlatzhaltern = mitPlatzhaltern(visualBlocks);
  // In Zeilen zu je 2 Blöcken aufteilen (statt 14 Felder)
  const blockZeilen = chunkArray(visualBlocks, 2);

  return (
    <div className="holzblock">
      {blockZeilen.map((blockPaar, i) => (
        <div className="holz-reihe" key={`holzreihe-${i}`}>
          {blockPaar.flat()}
        </div>
      ))}
    </div>
  );
}

export default Holzblock;
