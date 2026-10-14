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
      <div className="rows">
        {profile.activities.map((a) => {
          const Icon = ICONS[a.id] ?? TrophyIcon;
          return (
            <Card key={a.id} id={a.id} plain className="act-row" aria-labelledby={`${a.id}-h`}>
              <span className="act-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <h3 id={`${a.id}-h`} className="row-title">{a.title}</h3>
                <p className="act-detail">{a.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
