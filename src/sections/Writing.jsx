import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { PenIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { useView } from "../view.js";

const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function Writing() {
  const { goTo } = useView();
  const posts = profile.posts;
  return (
    <>
      <SectionBand id="writing" title="Writing">
        Articles and notes.
      </SectionBand>
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
        <div className="rows">
          {posts.map((p) => (
            <Card key={p.id} id={p.id} plain className="post-row" aria-labelledby={`${p.id}-h`}>
              <p className="row-date">
                <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readingMins} min read
              </p>
              <h3 id={`${p.id}-h`} className="row-title">
                <a href={p.url}>{p.title}</a>
              </h3>
              {p.excerpt && <p>{p.excerpt}</p>}
              <p className="tag-words">
                <span className="visually-hidden">Tags: </span>
                {p.tags.map((t) => (
                  <span key={t}>#{t.replace(/\s+/g, "")}</span>
                ))}
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
