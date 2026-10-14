import { LabHeader } from "../components/Header.jsx";
import { UsabilityLab } from "../sections/lab/UsabilityLab.jsx";

// Facilitator view at #lab, kept off the profile page so participants never see it.
export function LabPage() {
  return (
    <>
      <LabHeader />
      <main id="main" className="container lab-main" data-section="lab" tabIndex={-1}>
        <UsabilityLab />
      </main>
    </>
  );
}
