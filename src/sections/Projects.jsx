import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { CodeIcon, ExternalIcon } from "../components/Icons.jsx";
import { ProjectVisual } from "../components/ProjectVisual.jsx";
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
      <div className="filter-row">
        <p className="filter-status mono" role="status">
          <span className="status-dot" aria-hidden="true" />
          Showing {shown.length} of {total} projects
          {projectTags.length > 0 && <> tagged {projectTags.join(" or ")}</>}
        </p>
        <TagFilter tags={PROJECT_TAGS} selected={projectTags} onChange={setProjectTags} label="Filter projects by tag" />
      </div>

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
        <div className="proj-grid">
          {shown.map((p, i) => (
            <Card key={p.id} id={p.id} spotlight className="proj-card" aria-labelledby={`${p.id}-h`}>
              <ProjectVisual id={p.id} />
              <div className="proj-body">
                <div className="proj-meta mono">
                  <span className="proj-kind">{p.tags[0]}</span>
                  <span>{formatRange(p.start, p.end)}</span>
                </div>
                <div className="proj-head">
                  <h3 id={`${p.id}-h`} className="row-title">{p.title}</h3>
                  <span className="proj-index mono" aria-hidden="true">
                    {String(profile.projects.indexOf(p) + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="proj-summary">{p.summary}</p>
                <p className="proj-stack mono">
                  <span className="visually-hidden">Built with: </span>
                  {p.stack.slice(0, 3).join(" · ")}
                  {p.stack.length > 3 && ` · +${p.stack.length - 3} more`}
                </p>
                <ul className="chips chips-sm" aria-label="Tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="proj-foot">
                  <Disclosure id={p.id} label="Details, tech stack & link" openLabel="Hide details" annotate={i === 0}>
                    <ul className="row-bullets">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <p className="mini-label" style={{ marginTop: "var(--space-4)" }}>Tech stack</p>
                    <ul className="chips chips-sm" aria-label="Tech stack">
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
