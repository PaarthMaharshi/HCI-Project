import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { CodeIcon, TrophyIcon, UsersIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";

const ICONS = { "act-hackathons": TrophyIcon, "act-agastya": UsersIcon, "act-leetcode": CodeIcon };

export function Activities() {
  return (
    <>
      <SectionBand id="activities" title="Activities & Achievements" band="Activities">
        Hackathons, programs and practice.
      </SectionBand>
      <div className="rows act-list">
        {profile.activities.map((a, i) => {
          const Icon = ICONS[a.id] ?? TrophyIcon;
          return (
            <Card key={a.id} id={a.id} plain className="act-row" aria-labelledby={`${a.id}-h`}>
              <span className="act-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <p className="act-kicker mono">{a.tags.join(" · ")}</p>
                <h3 id={`${a.id}-h`} className="row-title">{a.title}</h3>
                <p className="act-detail">{a.detail}</p>
              </div>
              <span className="act-num mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </Card>
          );
        })}
      </div>
    </>
  );
}
