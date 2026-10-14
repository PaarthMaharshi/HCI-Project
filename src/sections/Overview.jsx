import { profile } from "../data/profile.js";
import { Annotation } from "../components/Annotation.jsx";
import { Card } from "../components/Card.jsx";
import { CopyButton } from "../components/CopyButton.jsx";
import { PinIcon } from "../components/Icons.jsx";
import { BlurHeading, Count, Gradient, Reveal, Shiny } from "../components/Motion.jsx";
import Aurora from "../components/reactbits/Aurora/Aurora.jsx";
import { usePrefs } from "../hooks/usePrefs.js";
import { formatMonth } from "../lib/format.js";
import { useView } from "../view.js";

// Aurora parses colours in JS, so it gets hex stops per theme.
const AURORA = {
  light: ["#ffb38a", "#ff8fa3", "#7ee3c9"],
  dark: ["#9a3412", "#9f1239", "#115e59"],
};

function Hero() {
  const b = profile.basics;
  const { theme } = usePrefs();
  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true">
        <Aurora key={theme} colorStops={AURORA[theme]} lightMode={theme === "light"} amplitude={1.1} blend={0.6} speed={0.6} />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-main">
          <div className="hero-top">
            <div className="avatar" aria-hidden="true">{b.initials}</div>
            <p className="pill">
              <span className="status-dot" aria-hidden="true" />
              <Shiny>{b.availability}</Shiny>
            </p>
          </div>
          <p className="hero-hello">
            <Gradient>Hi, I’m</Gradient>
          </p>
          <BlurHeading id="hero-name" text={b.name} className="hero-name" />
          <p className="headline">{b.headline}</p>
          <p className="hero-location">
            <PinIcon /> {b.location}
          </p>
          <p className="bio">{b.bio}</p>
          <div className="email-row" id="item-email" data-item="" tabIndex={-1}>
            <span className="visually-hidden">Email: </span>
            <a href={`mailto:${b.email}`}>{b.email}</a>
            <CopyButton id="ctl-copy-email" text={b.email} label="Copy email" doneMessage="Email copied to clipboard" className="btn btn-primary" />
          </div>
          <Annotation id="copy" block />
        </div>

        <div className="hero-side">
          <h2 className="visually-hidden">Quick facts</h2>
          <ul className="stats">
            {profile.stats.map((s) => (
              <li key={s.caption} className="stat-card">
                <Count value={s.value} label={s.label} suffix={s.label.endsWith("+") ? "+" : ""} className="stat-num" />
                <span className="stat-caption">{s.caption}</span>
              </li>
            ))}
          </ul>
          <Annotation id="hero" block />
        </div>
      </div>
    </div>
  );
}

function About() {
  const { reveal } = useView();
  return (
    <div className="container about-grid">
      <Reveal>
        <Card as="section" aria-labelledby="skills-h">
          <span className="eyebrow">What I work with</span>
          <h2 id="skills-h">Skills</h2>
          <Annotation id="skills" block />
          {profile.skills.map((s) => (
            <div className="skill-group" key={s.id} id={`item-${s.id}`} data-item="" tabIndex={-1}>
              <h3>
                <span className="visually-hidden">Skills: </span>
                {s.group}
              </h3>
              <ul className="chips" aria-label={s.group}>
                {s.items.map((i) => (
                  <li key={i}><span className="chip">{i}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
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
      </Reveal>
    </div>
  );
}

export function Overview() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
