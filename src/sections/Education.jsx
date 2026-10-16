import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { Count } from "../components/Motion.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { formatMonth, formatRange } from "../lib/format.js";

export function Education() {
  return (
    <>
      <SectionBand id="education" title="Education">
        University and school, with scores.
      </SectionBand>
      <div className="edu-cols">
        {profile.education.map((e, i) => (
          <Card key={e.id} id={e.id} spotlight className="edu-col" aria-labelledby={`${e.id}-h`}>
            <span className="edu-num mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p className="row-date">
              {e.start ? formatRange(e.start, e.end) : formatMonth(e.end)}
              {e.status && ` · ${e.status}`}
            </p>
            {e.score ? (
              <p className="score">
                <Count value={parseFloat(e.score.label)} label={e.score.label} suffix="%" />
                <small>{e.score.detail}</small>
              </p>
            ) : (
              <p className="score score-text">Now</p>
            )}
            <h3 id={`${e.id}-h`} className="row-title">{e.degree}</h3>
            <p className="row-meta">
              {e.institution}
              {e.board && <> · {e.board}</>}
            </p>
            {e.subjects && (
              <Disclosure id={e.id} label="Show subject marks" openLabel="Hide subject marks">
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
