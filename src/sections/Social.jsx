import { profile } from "../data/profile.js";
import { Annotation } from "../components/Annotation.jsx";
import { ExternalIcon, GitHubIcon, LinkedInIcon } from "../components/Icons.jsx";
import { SectionHead } from "./SectionHead.jsx";

const ICONS = { "social-github": GitHubIcon, "social-linkedin": LinkedInIcon };

export function Social() {
  return (
    <>
      <SectionHead id="social" eyebrow="Elsewhere" title="Social">
        Find me on these sites.
      </SectionHead>
      <Annotation id="social" block />
      <ul className="grid grid-2" style={{ listStyle: "none", padding: 0 }}>
        {profile.social.map((s) => {
          const Icon = ICONS[s.id] ?? ExternalIcon;
          return (
            <li key={s.id} style={{ margin: 0 }}>
              <a className="card social-card" id={`item-${s.id}`} data-item="" href={s.url} target="_blank" rel="noreferrer">
                <Icon className="icon-big" />
                <span>
                  <strong style={{ fontSize: "1.15rem", display: "block" }}>{s.label}</strong>
                  <span className="note">{s.blurb}</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </span>
                <ExternalIcon className="icon go" />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
