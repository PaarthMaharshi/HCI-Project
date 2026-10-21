import { Annotation } from "../components/Annotation.jsx";

export function SectionHead({ id, eyebrow, title, children, level = "h2" }) {
  const Heading = level;
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <Heading id={`${id}-h`}>{title}</Heading>
      </div>
      {children && <p>{children}</p>}
      <Annotation id="sectionColour" />
    </div>
  );
}
