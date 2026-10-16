import { profile } from "../data/profile.js";
import { CopyButton } from "../components/CopyButton.jsx";
import { PinIcon } from "../components/Icons.jsx";
import { BlurHeading, Count, Gradient, Reveal, Shiny } from "../components/Motion.jsx";
import Aurora from "../components/reactbits/Aurora/Aurora.jsx";
import SpotlightCard from "../components/reactbits/SpotlightCard/SpotlightCard.jsx";
import { usePrefs } from "../hooks/usePrefs.js";
import { formatMonth } from "../lib/format.js";
import { useView } from "../view.js";

// Aurora parses colours in JS, so it gets hex stops per theme.
const AURORA = {
  light: ["#ffb38a", "#ff8fa3", "#7ee3c9"],
  dark: ["#9a3412", "#9f1239", "#115e59"],
};

// Side card: what Paarth is doing right now, built from the profile data.
function NowCard() {
  const { theme } = usePrefs();
  const b = profile.basics;
  const latest = profile.experience[0];
  return (
    <SpotlightCard
      theme={theme}
      spotlightColor="var(--c-overview)"
      intensity={0.5}
      borderGlow={0.8}
      className="now-card fade-up"
      style={{ "--d": "0.5s", "--spotlight-card-surface": "var(--hero-panel)", "--spotlight-card-border": "var(--border)", "--spotlight-card-shadow": "var(--shadow)" }}
    >
      <div className="now-id">
        <span className="now-avatar" aria-hidden="true">{b.initials}</span>
        <div>
          <p className="now-name">{b.name}</p>
          <p className="now-tag">{b.tagline}</p>
        </div>
      </div>
      <p className="now-status">
        <span className="status-dot" aria-hidden="true" />
        <Shiny>{b.availability}</Shiny>
      </p>
      <dl className="now-list">
        <div>
          <dt>Latest role</dt>
          <dd>{latest.role}<span>{latest.org} · {formatMonth(latest.start)}–{formatMonth(latest.end)}</span></dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>
            <ul className="chips chips-sm" aria-label="Focus areas">
              {["App development", "Agentic AI", "RAG", "UI/UX"].map((f) => <li key={f}>{f}</li>)}
            </ul>
          </dd>
        </div>
      </dl>
    </SpotlightCard>
  );
}

function Hero() {
  const b = profile.basics;
  const { theme } = usePrefs();
  const { goTo } = useView();
  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true">
        <Aurora key={theme} colorStops={AURORA[theme]} lightMode={theme === "light"} amplitude={1.1} blend={0.6} speed={0.6} />
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-hello">
            <Gradient>Hi, I’m</Gradient>
          </p>
          <BlurHeading id="hero-name" text={b.name} className="hero-name" />
          <p className="headline fade-up" style={{ "--d": "0.4s" }}>{b.headline}</p>
          <p className="hero-location fade-up" style={{ "--d": "0.5s" }}>
            <PinIcon /> {b.location}
          </p>
          <p className="bio fade-up" style={{ "--d": "0.6s" }}>{b.bio}</p>

          <div className="hero-ctas fade-up" style={{ "--d": "0.7s" }}>
            <div className="email-row" id="item-email" data-item="" tabIndex={-1}>
              <span className="visually-hidden">Email: </span>
              <a href={`mailto:${b.email}`}>{b.email}</a>
              <CopyButton id="ctl-copy-email" text={b.email} label="Copy email" doneMessage="Email copied to clipboard" className="btn btn-primary" />
            </div>
            <a className="btn btn-ghost arrow-btn" href="#projects" onClick={(e) => { e.preventDefault(); goTo("projects"); }}>
              See projects <span aria-hidden="true" className="arrow">↓</span>
            </a>
          </div>
        </div>
        <NowCard />
      </div>

      <div className="container">
        <h2 className="visually-hidden">Quick facts</h2>
        <ul className="stats">
          {profile.stats.map((s) => (
            <li key={s.caption}>
              <Count value={s.value} label={s.label} suffix={s.label.endsWith("+") ? "+" : ""} className="stat-num" />
              <span className="stat-caption">{s.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function About() {
  const { reveal } = useView();
  return (
    <div className="container about-grid">
      <Reveal>
        <section aria-labelledby="skills-h" className="about-col panel">
          <p className="mini-label">What I work with</p>
          <h2 id="skills-h" className="about-title">Skills</h2>
          <dl className="skills">
            {profile.skills.map((s) => (
              <div className="skill-row" key={s.id} id={`item-${s.id}`} data-item="" tabIndex={-1}>
                <dt>{s.group}</dt>
                <dd>
                  <ul className="chips" aria-label={s.group}>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section aria-labelledby="timeline-h" className="about-col panel">
          <p className="mini-label">Recently</p>
          <h2 id="timeline-h" className="about-title">Timeline</h2>
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
        </section>
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
