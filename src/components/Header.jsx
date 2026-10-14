import { profile } from "../data/profile.js";
import { Tools } from "./Sidebar.jsx";

// Lab header: brand, a clear way back, and the same settings as the profile sidebar.
export function LabHeader() {
  return (
    <header className="lab-header">
      <div className="container lab-header-row">
        <a className="topbar-brand" href="#overview">
          <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
          {profile.basics.name}
        </a>
        <a className="btn" href="#overview">← Back to profile</a>
        <Tools />
      </div>
    </header>
  );
}
