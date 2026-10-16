import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { formatMonth } from "../lib/format.js";

export function Experience() {
  return (
    <>
      <SectionBand id="experience" title="Experience">
        Internships and work, with what I did.
      </SectionBand>
      <div className="exp-list">
        {profile.experience.map((e, i) => {
          const [first, ...rest] = e.bullets;
          return (
            <Card key={e.id} id={e.id} spotlight className="exp-row" aria-labelledby={`${e.id}-h`}>
              <p className="exp-when">
                <span>{formatMonth(e.start)}</span>
                <span className="exp-dash" aria-hidden="true">↓</span>
                <span className="visually-hidden"> to </span>
                <span>{e.end ? formatMonth(e.end) : "Present"}</span>
              </p>
              <div>
                <h3 id={`${e.id}-h`} className="row-title">{e.role}</h3>
                <p className="row-meta">
                  <strong>{e.org}</strong> · {e.place} ({e.mode})
                </p>
                <ul className="row-bullets">
                  <li>{first}</li>
                </ul>
                {rest.length > 0 && (
                  <Disclosure id={e.id} label={`Show ${rest.length} more`} openLabel="Show less">
                    <ul className="row-bullets">
                      {rest.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </Disclosure>
                )}
                <ul className="chips chips-sm" aria-label="Tags">
                  {e.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
