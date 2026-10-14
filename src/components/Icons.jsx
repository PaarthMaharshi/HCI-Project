// Small inline icon set (stroke icons, inherit currentColor). Decorative by default.
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false };

const make = (paths) =>
  function Icon({ className = "icon", ...rest }) {
    return (
      <svg {...base} className={className} {...rest}>
        {paths}
      </svg>
    );
  };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const SunIcon = make(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>);
export const MoonIcon = make(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />);
export const TextIcon = make(<><path d="M4 7V5h10v2M9 5v14M7 19h4" /><path d="M15 13v-1h6v1M18 12v7M16.5 19h3" /></>);
export const InfoIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>);
export const CopyIcon = make(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></>);
export const CheckIcon = make(<path d="m5 12 5 5 9-10" />);
export const ChevronIcon = make(<path d="m9 6 6 6-6 6" />);
export const PinIcon = make(<><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>);
export const ExternalIcon = make(<><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>);
export const PenIcon = make(<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13 7 4 4" /></>);
export const KeyboardIcon = make(<><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>);
export const GitHubIcon = make(<path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C5.7 2 4.6 2.3 4.6 2.3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 9.5c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.4V22" />);
export const LinkedInIcon = make(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7h.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>);
export const TrophyIcon = make(<><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6" /></>);
export const UsersIcon = make(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" /></>);
export const CodeIcon = make(<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />);
export const HomeIcon = make(<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>);
export const BriefcaseIcon = make(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>);
export const CapIcon = make(<><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></>);
export const MailIcon = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
