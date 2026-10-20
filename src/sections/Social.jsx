import { profile } from "../data/profile.js";
import { GitHubIcon, LinkedInIcon, ExternalIcon, MailIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { Annotation } from "../components/Annotation.jsx";

const ICONS = { "social-github": GitHubIcon, "social-linkedin": LinkedInIcon };

export function Social() {
  const b = profile.basics;
  return (
    <>
      <SectionBand id="social" title="Social">
        Find me on these sites.
      </SectionBand>
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
        <li>
          <a className="social-row" href={`mailto:${b.email}`}>
            <MailIcon className="social-icon" />
            <span className="social-name">Email</span>
            <span className="social-blurb">{b.email}</span>
            <span className="social-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
      <Annotation id="social" block />
    </>
  );
}
