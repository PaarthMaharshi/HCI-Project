import { formatRange } from "./format.js";

// Flattens the profile into searchable entries: { key, section, id, title, meta, text, action? }.
export function buildIndex(profile) {
  const out = [];
  const add = (e) => out.push({ ...e, key: `${e.section}:${e.id}`, hay: `${e.title} ${e.meta ?? ""} ${e.text}`.toLowerCase() });
  const b = profile.basics;

  add({ section: "overview", id: "about", title: b.name, meta: b.headline, text: `${b.bio} ${b.location} ${b.availability}` });
  add({ section: "overview", id: "email", title: "Email address", meta: b.email, text: "contact email mail copy reach", action: "email" });
  for (const s of profile.skills)
    add({ section: "overview", id: s.id, title: `Skills: ${s.group}`, meta: s.items.join(", "), text: "skills", weight: -1 });

  for (const e of profile.experience)
    add({ section: "experience", id: e.id, title: `${e.role}`, meta: `${e.org} · ${formatRange(e.start, e.end)}`, text: `${e.place} ${e.mode} internship work job ${e.bullets.join(" ")} ${e.tags.join(" ")}` });

  for (const e of profile.education)
    add({
      section: "education",
      id: e.id,
      title: e.degree,
      meta: `${e.institution}${e.score ? ` · ${e.score.label}` : ""}`,
      text: `${e.board ?? ""} ${e.status ?? ""} school college university percentage marks score ${e.score?.detail ?? ""} ${(e.subjects ?? []).map((s) => `${s.name} ${s.mark}`).join(" ")} ${e.id === "edu-hsc" ? "class 12 twelfth" : ""} ${e.id === "edu-ssc" ? "class 10 tenth" : ""}`,
      disclose: !!e.subjects,
    });

  for (const p of profile.projects)
    add({ section: "projects", id: p.id, title: p.title, meta: p.stack.join(", "), text: `project ${p.summary} ${p.bullets.join(" ")} ${p.tags.join(" ")}`, disclose: true });

  for (const p of profile.posts)
    add({ section: "writing", id: p.id, title: p.title, meta: p.tags.join(", "), text: `blog post article ${p.excerpt ?? ""}` });

  for (const s of profile.social)
    add({ section: "social", id: s.id, title: s.label, meta: s.url, text: `social profile link ${s.handle}` });

  for (const a of profile.activities)
    add({ section: "activities", id: a.id, title: a.title, meta: a.tags.join(", "), text: `activity achievement ${a.detail}` });

  // Settings are searchable too, so "bigger text" or "dark" finds the control.
  add({ section: "settings", id: "text-size", title: "Larger text", meta: "Setting in the header", text: "text size font bigger larger zoom increase readability", action: "textSize" });
  add({ section: "settings", id: "theme", title: "Dark / light theme", meta: "Setting in the header", text: "theme dark light mode colour color night", action: "theme" });
  add({ section: "settings", id: "annotations", title: "Show HCI annotations", meta: "Setting in the footer", text: "hci annotations principles heuristics labels notes", action: "annotations" });
  add({ section: "settings", id: "shortcuts", title: "Keyboard shortcuts", meta: "Press ?", text: "keyboard shortcuts keys help", action: "help" });

  return out;
}

// Every query word must appear; title hits rank higher.
export function search(index, query, limit = 8) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .filter((e) => words.every((w) => e.hay.includes(w)))
    .map((e) => {
      const t = e.title.toLowerCase();
      const m = (e.meta ?? "").toLowerCase();
      // Skill lists mention every technology, so concrete items (projects, jobs) rank above them.
      const score = words.reduce((s, w) => s + (t.startsWith(w) ? 4 : t.includes(w) ? 3 : m.includes(w) ? 2 : 1), 0) + (e.weight ?? 0);
      return { e, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}

// Splits text into [{ text, hit }] parts for <mark> highlighting.
export function highlightParts(text, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length || !text) return [{ text, hit: false }];
  const esc = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "gi");
  return text.split(re).filter(Boolean).map((part) => ({ text: part, hit: words.includes(part.toLowerCase()) }));
}
