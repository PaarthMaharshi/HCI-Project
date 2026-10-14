import { SUS_ITEMS } from "../../data/hci.js";
import { Annotation } from "../../components/Annotation.jsx";
import { SUS_BENCHMARK, susGrade, susScore } from "../../lib/sus.js";

export function SusGauge({ score, label }) {
  const g = susGrade(score);
  return (
    <div className="gauge">
      <p style={{ marginBottom: "var(--space-2)" }}>
        <strong style={{ fontFamily: "var(--font-head)", fontSize: "2rem" }}>{score.toFixed(1)}</strong>{" "}
        {label} · grade <strong>{g.grade}</strong> ({g.label}) · {score >= SUS_BENCHMARK ? "above" : "below"} the average of {SUS_BENCHMARK}
      </p>
      <div className="gauge-track" aria-hidden="true">
        <div className="gauge-fill" style={{ width: `${score}%` }} />
        <div className="gauge-bench" style={{ left: `${SUS_BENCHMARK}%` }} />
      </div>
      <div className="gauge-scale" aria-hidden="true">
        <span>0</span>
        <span className="gauge-bench-label" style={{ left: `${SUS_BENCHMARK}%` }}>avg {SUS_BENCHMARK}</span>
        <span>100</span>
      </div>
    </div>
  );
}

export function SusForm({ participant, onChange }) {
  if (!participant)
    return <p className="note">Add or choose a participant first.</p>;

  const answers = participant.sus;
  const answered = answers.filter(Boolean).length;
  const score = susScore(answers);

  const set = (i, v) => onChange((p) => ({ ...p, sus: p.sus.map((a, j) => (j === i ? v : a)), susDone: false }));

  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (score != null) onChange((p) => ({ ...p, susDone: true }));
      }}
    >
      <p className="note" style={{ margin: 0 }}>
        {participant.id}: for each statement, choose 1 (strongly disagree) to 5 (strongly agree).
      </p>
      {SUS_ITEMS.map((text, i) => (
        <fieldset key={i} className="sus-item">
          <legend>
            {i + 1}. {text}
          </legend>
          <div className="likert">
            {[1, 2, 3, 4, 5].map((v) => (
              <label key={v}>
                <input type="radio" name={`sus-${participant.id}-${i}`} value={v} checked={answers[i] === v} onChange={() => set(i, v)} />
                {v}
                <span className="visually-hidden">{v === 1 ? " strongly disagree" : v === 5 ? " strongly agree" : ""}</span>
              </label>
            ))}
          </div>
          <div className="likert-ends" aria-hidden="true">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
        </fieldset>
      ))}

      <div className="lab-toolbar" style={{ marginBottom: 0 }}>
        <button type="submit" className="btn btn-primary" disabled={score == null} aria-describedby="sus-progress">
          Calculate SUS score
        </button>
        <span id="sus-progress" className="note" aria-live="polite">
          {answered} of 10 answered{score == null ? " (all 10 are needed)" : ""}
        </span>
        <Annotation id="sus" />
      </div>

      {participant.susDone && score != null && (
        <div className="card" role="status">
          <h3>SUS result for {participant.id}</h3>
          <SusGauge score={score} label="SUS score" />
        </div>
      )}
    </form>
  );
}
