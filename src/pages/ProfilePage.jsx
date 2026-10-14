import { Annotation } from "../components/Annotation.jsx";
import { BriefcaseIcon, CapIcon, CodeIcon, HomeIcon, MailIcon, SearchIcon } from "../components/Icons.jsx";
import { Reveal } from "../components/Motion.jsx";
import Dock from "../components/reactbits/Dock/Dock.jsx";
import { PHONE, useMediaQuery } from "../hooks/useMediaQuery.js";
import { usePrefs } from "../hooks/usePrefs.js";
import { Activities } from "../sections/Activities.jsx";
import { Education } from "../sections/Education.jsx";
import { Experience } from "../sections/Experience.jsx";
import { Overview } from "../sections/Overview.jsx";
import { Projects } from "../sections/Projects.jsx";
import { Social } from "../sections/Social.jsx";
import { Writing } from "../sections/Writing.jsx";

function Section({ id, children, labelledBy = `${id}-h` }) {
  return (
    <section id={id} data-section={id} aria-labelledby={labelledBy} className="page-section" tabIndex={-1}>
      <div className="container">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

// Thumb-reach bottom bar on phones (react-bits Dock). The six most-used
// destinations only; the full list stays in the header nav.
function PhoneDock({ active, onNav, onSearch }) {
  const { theme } = usePrefs();
  const items = [
    { icon: <HomeIcon />, label: "Overview", onClick: () => onNav("overview"), active: active === "overview" },
    { icon: <BriefcaseIcon />, label: "Experience", onClick: () => onNav("experience"), active: active === "experience" },
    { icon: <CodeIcon />, label: "Projects", onClick: () => onNav("projects"), active: active === "projects" },
    { icon: <CapIcon />, label: "Education", onClick: () => onNav("education"), active: active === "education" },
    { icon: <MailIcon />, label: "Contact (email)", onClick: () => onNav("overview", { target: "ctl-copy-email" }) },
    { icon: <SearchIcon />, label: "Search", onClick: onSearch },
  ];
  return (
    <nav className="dock-host" aria-label="Quick navigation">
      <Dock
        items={items}
        theme={theme}
        ariaLabel="Jump to"
        baseItemSize={44}
        magnification={44}
        panelHeight={56}
        gap={6}
        accentColor="#c2410c"
        showBadges={false}
      />
      <Annotation id="dock" />
    </nav>
  );
}

export function ProfilePage({ active, onNav, onSearch }) {
  const phone = useMediaQuery(PHONE);
  return (
    <>
      <main id="main" tabIndex={-1}>
        <section id="overview" data-section="overview" aria-labelledby="hero-name" className="page-section hero-section" tabIndex={-1}>
          <Overview />
        </section>
        <Section id="experience"><Experience /></Section>
        <Section id="projects"><Projects /></Section>
        <Section id="education"><Education /></Section>
        <Section id="activities"><Activities /></Section>
        <Section id="writing"><Writing /></Section>
        <Section id="social"><Social /></Section>
      </main>
      {phone && <PhoneDock active={active} onNav={onNav} onSearch={onSearch} />}
    </>
  );
}
