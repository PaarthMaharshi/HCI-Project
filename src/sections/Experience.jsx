import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { formatRange } from "../lib/format.js";
import { SectionHead } from "./SectionHead.jsx";

export function Experience() {
  return (
    <>
      <SectionHead id="experience" eyebrow="Work" title="Experience">
        Internships and work, with what I did.
      </SectionHead>
      <div className="stack">
        {profile.experience.map((e, i) => {
          const [first, ...rest] = e.bullets;
          return (
            <Card key={e.id} id={e.id} aria-labelledby={`${e.id}-h`}>
              <div className="card-top">
                <div>
                  <h3 id={`${e.id}-h`}>{e.role}</h3>
                  <p className="card-meta">
                    <strong>{e.org}</strong> · {e.place} ({e.mode})
                  </p>
                </div>
                <span className="date-pill">{formatRange(e.start, e.end)}</span>
              </div>
              <ul>
                <li>{first}</li>
              </ul>
              {rest.length > 0 && (
                <Disclosure id={e.id} label={`Show ${rest.length} more`} openLabel="Show less" annotate={i === 0}>
                  <ul>
                    {rest.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Disclosure>
              )}
              <ul className="chips" aria-label="Tags" style={{ marginTop: "var(--space-4)" }}>
                {e.tags.map((t) => (
                  <li key={t}><span className="chip">{t}</span></li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </>
  );
}
