import { Annotation } from "../components/Annotation.jsx";

export function SectionHead({ id, eyebrow, title, children }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={`${id}-h`}>{title}</h2>
      </div>
      {children && <p>{children}</p>}
      <Annotation id="sectionColour" />
    </div>
  );
}
