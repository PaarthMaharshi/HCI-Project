import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { CodeIcon, ExternalIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { TagFilter } from "../components/TagFilter.jsx";
import { formatRange } from "../lib/format.js";
import { useView } from "../view.js";

export const PROJECT_TAGS = [...new Set(profile.projects.flatMap((p) => p.tags))];

export const matchesTags = (project, tags) => !tags.length || tags.some((t) => project.tags.includes(t));

export function Projects() {
  const { projectTags, setProjectTags } = useView();
  const shown = profile.projects.filter((p) => matchesTags(p, projectTags));
  const total = profile.projects.length;

  return (
    <>
      <SectionBand id="projects" title="Projects">
        Filter by tag, then open a project for details.
      </SectionBand>
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
        <div className="rows">
          {shown.map((p, i) => (
            <Card key={p.id} id={p.id} spotlight className="proj-row" aria-labelledby={`${p.id}-h`}>
              <span className="proj-index" aria-hidden="true">
                {String(profile.projects.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <div className="proj-body">
                <div className="proj-head">
                  <h3 id={`${p.id}-h`} className="row-title">{p.title}</h3>
                  <span className="row-date">{formatRange(p.start, p.end)}</span>
                </div>
                <p className="proj-summary">{p.summary}</p>
                <p className="tag-words">
                  <span className="visually-hidden">Tags: </span>
                  {p.tags.map((t) => (
                    <span key={t}>#{t.replace(/[\s/]+/g, "")}</span>
                  ))}
                </p>
                <Disclosure id={p.id} label="Details, tech stack & link" openLabel="Hide details" annotate={i === 0}>
                  <ul className="row-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="mini-label" style={{ marginTop: "var(--space-4)" }}>Tech stack</p>
                  <ul className="slash-list" aria-label="Tech stack">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "var(--space-4)", marginBottom: 0 }}>
                    <a className="arrow-link" href={p.link} target="_blank" rel="noreferrer">
                      View on GitHub <ExternalIcon />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </p>
                </Disclosure>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
