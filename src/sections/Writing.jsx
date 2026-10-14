import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { PenIcon } from "../components/Icons.jsx";
import { useView } from "../view.js";
import { SectionHead } from "./SectionHead.jsx";

const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function Writing() {
  const { goTo } = useView();
  const posts = profile.posts;
  return (
    <>
      <SectionHead id="writing" eyebrow="Blog" title="Writing">
        Articles and notes.
      </SectionHead>
      {posts.length === 0 ? (
        <EmptyState
          icon={PenIcon}
          title="No posts yet"
          action={
            <button type="button" className="btn btn-primary" onClick={() => goTo("projects")}>
              See my projects instead
            </button>
          }
        >
          Articles on app development and agentic AI will appear here.
        </EmptyState>
      ) : (
        <div className="grid grid-2">
          {posts.map((p) => (
            <Card key={p.id} id={p.id} aria-labelledby={`${p.id}-h`}>
              <p className="card-meta" style={{ marginBottom: "var(--space-2)" }}>
                <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readingMins} min read
              </p>
              <h3 id={`${p.id}-h`}>
                <a href={p.url}>{p.title}</a>
              </h3>
              {p.excerpt && <p>{p.excerpt}</p>}
              <ul className="chips" aria-label="Tags">
                {p.tags.map((t) => (
                  <li key={t}><span className="chip">{t}</span></li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
