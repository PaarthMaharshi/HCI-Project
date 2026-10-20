import { HEURISTICS, SEVERITY } from "../../data/hci.js";
import { Card } from "../../components/Card.jsx";

export function HeuristicChecklist({ lab, setLab, nextId }) {
  const current = lab.evaluators.find((e) => e.id === lab.currentEvaluator) ?? null;

  const newEvaluator = () =>
    setLab((l) => {
      const id = nextId(l.evaluators, "E");
      return { ...l, evaluators: [...l.evaluators, { id, ratings: {} }], currentEvaluator: id };
    });

  const rate = (hid, field, value) =>
    setLab((l) => ({
      ...l,
      evaluators: l.evaluators.map((e) =>
        e.id === current.id ? { ...e, ratings: { ...e.ratings, [hid]: { severity: "", notes: "", ...e.ratings[hid], [field]: value } } } : e
      ),
    }));

  return (
    <div className="stack">
      <div className="lab-toolbar" style={{ marginBottom: 0 }}>
        <div className="field">
          <label htmlFor="evaluator">Evaluator</label>
          <select id="evaluator" className="select" value={lab.currentEvaluator ?? ""} onChange={(e) => setLab((l) => ({ ...l, currentEvaluator: e.target.value || null }))}>
            {lab.evaluators.length === 0 && <option value="">None yet</option>}
            {lab.evaluators.map((e) => (
              <option key={e.id} value={e.id}>
                {e.id} · {Object.values(e.ratings).filter((r) => r.severity !== "").length}/10 rated
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" style={{ alignSelf: "end" }} onClick={newEvaluator}>
          + New evaluator
        </button>
      </div>
      <p className="note" style={{ margin: 0 }}>
        Each evaluator rates separately. Severity: 0 not a problem · 1 cosmetic · 2 minor · 3 major · 4 catastrophe (Nielsen).
      </p>

      {!current ? (
        <p className="note">Add an evaluator to start rating.</p>
      ) : (
        HEURISTICS.map((h) => {
          const r = current.ratings[h.id] ?? { severity: "", notes: "" };
          return (
            <Card key={h.id} as="fieldset" style={{ margin: 0 }}>
              <legend className="visually-hidden">{h.id} {h.name}</legend>
              <div className="heuristic">
                <div>
                  <h3>
                    {h.id}. {h.name}
                  </h3>
                  <p className="note" style={{ margin: 0 }}>
                    <strong>How it’s applied:</strong> {h.applied}
                  </p>
                </div>
                <div className="stack" style={{ gap: "var(--space-3)" }}>
                  <div className="field">
                    <label htmlFor={`sev-${h.id}`}>Severity</label>
                    <select id={`sev-${h.id}`} className="select" value={r.severity} onChange={(e) => rate(h.id, "severity", e.target.value === "" ? "" : Number(e.target.value))}>
                      <option value="">Not rated</option>
                      {SEVERITY.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor={`notes-${h.id}`}>Notes</label>
                    <textarea id={`notes-${h.id}`} className="textarea" value={r.notes} onChange={(e) => rate(h.id, "notes", e.target.value)} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}
