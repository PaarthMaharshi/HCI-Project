// Small decorative previews at the top of each project card (hidden from assistive tech).
// They idle quietly and come alive when the card is hovered or focused.

function Decoder() {
  return (
    <div className="pv-ui">
      <div className="pv-ui-head mono"><span>Transcript · 42 min</span><span>···</span></div>
      <p className="pv-ui-title">Action items <span className="pv-spark">✦</span></p>
      {[
        ["Draft follow-up email", "Owner: Priya"],
        ["Open ticket for API bug", "Owner: Dev team"],
        ["Risk: missed deadline last sprint", "Confidence 0.82"],
      ].map(([t, s], i) => (
        <div className="pv-ui-row" key={t} style={{ "--i": i }}>
          <span className="pv-tick">✓</span>
          <span><b>{t}</b><small>{s}</small></span>
        </div>
      ))}
    </div>
  );
}

function Detector() {
  const bars = [22, 38, 30, 54, 70, 62, 84, 76, 90, 68, 58, 80];
  return (
    <div className="pv-meter">
      <div className="pv-meter-head mono"><span>AI likelihood</span><b>87%</b></div>
      <div className="pv-bars">
        {bars.map((h, i) => (
          <span key={i} style={{ "--h": `${h}%`, "--i": i }} />
        ))}
      </div>
      <div className="pv-meter-foot mono"><span>DeBERTa</span><span>+ stylometry</span></div>
    </div>
  );
}

function Disease() {
  return (
    <div className="pv-search">
      <div className="pv-input mono">⌕ headache, fever<span className="pv-caret" /></div>
      <div className="pv-tags">
        {["Migraine", "Flu", "Dengue"].map((t, i) => (
          <span key={t} style={{ "--i": i }}>{t}</span>
        ))}
      </div>
      <div className="pv-map">
        <span className="pv-pin" style={{ "--x": "22%", "--y": "40%" }} />
        <span className="pv-pin" style={{ "--x": "58%", "--y": "62%" }} />
        <span className="pv-pin is-violet" style={{ "--x": "78%", "--y": "30%" }} />
      </div>
    </div>
  );
}

function Hearts() {
  return (
    <div className="pv-geo">
      <svg viewBox="0 0 300 150" fill="none">
        <path d="M0 110 C60 90 90 130 150 100 S250 60 300 80" className="pv-road" />
        <path d="M40 0 C70 60 110 70 120 150" className="pv-road" />
        <path d="M220 0 C210 50 240 90 260 150" className="pv-road" />
      </svg>
      <span className="pv-drop" style={{ "--x": "28%", "--y": "48%", "--i": 0 }}>♥</span>
      <span className="pv-drop is-violet" style={{ "--x": "62%", "--y": "30%", "--i": 1 }}>✉</span>
      <span className="pv-drop" style={{ "--x": "80%", "--y": "62%", "--i": 2 }}>♥</span>
      <div className="pv-bubble">“Best chai on campus is here”<small>12 likes · 3 replies</small></div>
    </div>
  );
}

const VISUALS = {
  "proj-meeting-decoder": { C: Decoder, label: "Action items", code: "Agents / RAG" },
  "proj-text-detector": { C: Detector, label: "Live analysis", code: "Transformer / NLP" },
  "proj-diseasedecoder": { C: Disease, label: "Symptom search", code: "SQL / Maps" },
  "proj-echoing-hearts": { C: Hearts, label: "Nearby messages", code: "Expo / Firebase" },
};

export function ProjectVisual({ id }) {
  const v = VISUALS[id] ?? VISUALS["proj-meeting-decoder"];
  const C = v.C;
  return (
    <div className="pv" aria-hidden="true">
      <div className="pv-stage">
        <C />
      </div>
    </div>
  );
}
