import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { Count } from "../components/Motion.jsx";
import { formatMonth, formatRange } from "../lib/format.js";
import { SectionHead } from "./SectionHead.jsx";

export function Education() {
  return (
    <>
      <SectionHead id="education" eyebrow="Study" title="Education">
        University and school, with scores.
      </SectionHead>
      <div className="grid grid-3">
        {profile.education.map((e, i) => (
          <Card key={e.id} id={e.id} aria-labelledby={`${e.id}-h`}>
            <span className="date-pill">
              {e.start ? formatRange(e.start, e.end) : formatMonth(e.end)}
              {e.status && ` · ${e.status}`}
            </span>
            <h3 id={`${e.id}-h`} style={{ marginTop: "var(--space-3)" }}>{e.degree}</h3>
            <p className="card-meta">
              {e.institution}
              {e.board && <> · {e.board}</>}
            </p>
            {e.score && (
              <p className="score">
                <Count value={parseFloat(e.score.label)} label={e.score.label} suffix="%" /> <small>({e.score.detail})</small>
              </p>
            )}
            {e.subjects && (
              <Disclosure id={e.id} label="Show subject marks" openLabel="Hide subject marks" annotate={i === 1}>
                <table className="marks">
                  <caption className="visually-hidden">{e.degree} subject marks</caption>
                  <thead>
                    <tr>
                      <th scope="col">Subject</th>
                      <th scope="col">Marks (out of 100)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {e.subjects.map((s) => (
                      <tr key={s.name}>
                        <td>{s.name}</td>
                        <td>{s.mark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Disclosure>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
