import { profile } from "../data/profile.js";
import { MotionButton, TextSizeButton, ThemeButton } from "../components/Sidebar.jsx";
import { UsabilityLab } from "../sections/lab/UsabilityLab.jsx";

// Facilitator view at #lab, kept off the profile page so participants never see it.
export function LabPage() {
  const b = profile.basics;
  return (
    <>
      <header className="lab-header">
        <div className="container lab-header-row">
          <a className="nav-brand" href="#overview">
            <span className="brand-mark" aria-hidden="true">{b.initials}</span>
            <span className="brand-name">{b.name}</span>
          </a>
          <a className="btn btn-sm" href="#overview">← Back to profile</a>
          <div className="lab-tools">
            <TextSizeButton />
            <ThemeButton />
            <MotionButton />
          </div>
        </div>
      </header>
      <main id="main" className="container lab-main" data-section="lab" tabIndex={-1}>
        <UsabilityLab />
      </main>
    </>
  );
}
