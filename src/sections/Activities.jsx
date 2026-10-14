import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { CodeIcon, TrophyIcon, UsersIcon } from "../components/Icons.jsx";
import { SectionHead } from "./SectionHead.jsx";

const ICONS = { "act-hackathons": TrophyIcon, "act-agastya": UsersIcon, "act-leetcode": CodeIcon };

export function Activities() {
  return (
    <>
      <SectionHead id="activities" eyebrow="Beyond class" title="Activities & Achievements">
        Hackathons, programs and practice.
      </SectionHead>
      <div className="grid grid-3">
        {profile.activities.map((a) => {
          const Icon = ICONS[a.id] ?? TrophyIcon;
          return (
            <Card key={a.id} id={a.id} spotlight aria-labelledby={`${a.id}-h`}>
              <Icon className="icon" style={{ width: "2rem", height: "2rem", color: "var(--accent)", marginBottom: "var(--space-2)" }} />
              <h3 id={`${a.id}-h`}>{a.title}</h3>
              <p>{a.detail}</p>
              <ul className="chips" aria-label="Tags">
                {a.tags.map((t) => (
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
