import { profile } from "../data/profile.js";
import { Annotation } from "../components/Annotation.jsx";
import { Card } from "../components/Card.jsx";
import { CopyButton } from "../components/CopyButton.jsx";
import { PinIcon } from "../components/Icons.jsx";
import { formatMonth } from "../lib/format.js";
import { useView } from "../view.js";

export function Overview() {
  const b = profile.basics;
  const { reveal } = useView();
  return (
    <>
      <section className="hero" id="item-about" data-item="" tabIndex={-1} aria-labelledby="hero-name">
        <div className="avatar" aria-hidden="true">{b.initials}</div>
        <div>
          <h1 id="hero-name">{b.name}</h1>
          <p className="headline">{b.headline}</p>
          <ul className="hero-meta">
            <li><PinIcon /> {b.location}</li>
            <li><span className="status-dot" aria-hidden="true" /> {b.availability}</li>
          </ul>
          <p className="bio">{b.bio}</p>
          <div className="email-row" id="item-email" data-item="" tabIndex={-1}>
            <span className="visually-hidden">Email: </span>
            <a href={`mailto:${b.email}`}>{b.email}</a>
            <CopyButton id="ctl-copy-email" text={b.email} label="Copy email" doneMessage="Email copied to clipboard" className="btn btn-on-hero" />
          </div>
          <Annotation id="copy" block />
        </div>
      </section>

      <div className="grid grid-2">
        <Card as="section" aria-labelledby="skills-h">
          <span className="eyebrow">What I work with</span>
          <h2 id="skills-h">Skills</h2>
          <Annotation id="skills" block />
          {profile.skills.map((s) => (
            <div className="skill-group" key={s.id} id={`item-${s.id}`} data-item="" tabIndex={-1}>
              <h3 className="h4-like" style={{ margin: 0 }}>
                <span className="visually-hidden">Skills: </span>
                <span className="skill-group-name">{s.group}</span>
              </h3>
              <ul className="chips" aria-label={s.group}>
                {s.items.map((i) => (
                  <li key={i}><span className="chip">{i}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </Card>

        <Card as="section" aria-labelledby="timeline-h">
          <span className="eyebrow">Recently</span>
          <h2 id="timeline-h">Timeline</h2>
          <Annotation id="timeline" block />
          <ol className="timeline">
            {profile.timeline.map((t) => (
              <li key={t.date + t.text}>
                <time dateTime={t.date}>{formatMonth(t.date)}</time>
                {t.ref ? (
                  <button type="button" className="link-btn" onClick={() => reveal(t.ref.section, t.ref.id)}>
                    {t.text}
                  </button>
                ) : (
                  t.text
                )}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
