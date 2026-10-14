import { profile } from "../data/profile.js";
import { Annotation } from "../components/Annotation.jsx";
import { GitHubIcon, LinkedInIcon, ExternalIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";

const ICONS = { "social-github": GitHubIcon, "social-linkedin": LinkedInIcon };

export function Social() {
  return (
    <>
      <SectionBand id="social" title="Social">
        Find me on these sites.
      </SectionBand>
      <Annotation id="social" block />
      <ul className="social-list">
        {profile.social.map((s) => {
          const Icon = ICONS[s.id] ?? ExternalIcon;
          return (
            <li key={s.id}>
              <a className="social-row" id={`item-${s.id}`} data-item="" href={s.url} target="_blank" rel="noreferrer">
                <Icon className="social-icon" />
                <span className="social-name">{s.label}</span>
                <span className="social-blurb">{s.blurb}</span>
                <span className="social-arrow" aria-hidden="true">↗</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
