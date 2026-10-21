import { profile } from "../data/profile.js";
import { Card } from "../components/Card.jsx";
import { Disclosure } from "../components/Disclosure.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { PenIcon } from "../components/Icons.jsx";
import { SectionBand } from "../components/SectionBand.jsx";
import { useView } from "../view.js";

// Full post text: headings, paragraphs and bullet lists from profile.posts[].body.
function PostBody({ body }) {
  return (
    <div className="post-body">
      {body.map((b, i) =>
        b.h ? <h4 key={i}>{b.h}</h4> : b.ul ? <ul key={i}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={i}>{b.p}</p>
      )}
    </div>
  );
}

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
                {p.url ? <a href={p.url}>{p.title}</a> : p.title}
              </h3>
              {p.excerpt && <p className="post-excerpt">{p.excerpt}</p>}
              <p className="tag-words">
                <span className="visually-hidden">Tags: </span>
                {p.tags.map((t) => (
                  <span key={t}>#{t.replace(/\s+/g, "")}</span>
                ))}
              </p>
              {p.body && (
                <Disclosure id={p.id} label="Read the full post" openLabel="Close post">
                  <PostBody body={p.body} />
                </Disclosure>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
