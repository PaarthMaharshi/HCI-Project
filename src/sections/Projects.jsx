import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { CodeIcon, ExternalIcon } from "../components/Icons.jsx";
import { TagFilter } from "../components/TagFilter.jsx";
import { formatRange } from "../lib/format.js";
import { useView } from "../view.js";
import { SectionHead } from "./SectionHead.jsx";

export const PROJECT_TAGS = [...new Set(profile.projects.flatMap((p) => p.tags))];

export const matchesTags = (project, tags) => !tags.length || tags.some((t) => project.tags.includes(t));

export function Projects() {
  const { projectTags, setProjectTags } = useView();
  const shown = profile.projects.filter((p) => matchesTags(p, projectTags));
  const total = profile.projects.length;

  return (
    <>
      <SectionHead id="projects" eyebrow="Build" title="Projects">
        Filter by tag, then open a card for details.
      </SectionHead>
      <TagFilter tags={PROJECT_TAGS} selected={projectTags} onChange={setProjectTags} label="Filter projects by tag" />
      <p className="filter-status" role="status">
        Showing {shown.length} of {total} projects
        {projectTags.length > 0 && <> tagged {projectTags.join(" or ")}</>}
      </p>

      {shown.length === 0 ? (
        <EmptyState
          icon={CodeIcon}
          title="No projects match these tags"
          action={
            <button type="button" className="btn btn-primary" onClick={() => setProjectTags([])}>
              Clear filter
            </button>
          }
        >
          Try removing a tag, or show all projects.
        </EmptyState>
      ) : (
        <div className="grid grid-2">
          {shown.map((p, i) => (
            <Card key={p.id} id={p.id} aria-labelledby={`${p.id}-h`}>
              <div className="card-top">
                <h3 id={`${p.id}-h`}>{p.title}</h3>
                <span className="date-pill">{formatRange(p.start, p.end)}</span>
              </div>
              <p>{p.summary}</p>
              <ul className="chips" aria-label="Tags">
                {p.tags.map((t) => (
                  <li key={t}><span className="chip">{t}</span></li>
                ))}
              </ul>
              <Disclosure id={p.id} label="Details, tech stack & link" openLabel="Hide details" annotate={i === 0}>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <h4 style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-2)" }}>Tech stack</h4>
                <ul className="chips" aria-label="Tech stack">
                  {p.stack.map((s) => (
                    <li key={s}><span className="chip chip-outline">{s}</span></li>
                  ))}
                </ul>
                <p style={{ marginTop: "var(--space-4)", marginBottom: 0 }}>
                  <a className="btn" href={p.link} target="_blank" rel="noreferrer">
                    <ExternalIcon /> View on GitHub<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </p>
              </Disclosure>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
