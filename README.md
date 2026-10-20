# Paarth Maharshi: Interactive Profile (HCI Project)

An interactive personal profile that applies established HCI principles and includes a built-in **Usability Lab** for evaluating the site with real users.

- **Stack:** React 18 + Vite 6, plain CSS (design tokens), animated pieces from [React Bits](https://github.com/DavidHDev/react-bits), no backend
- **Layout:** one scrolling page — Overview (hero, skills, timeline) · Experience · Projects · Education · Activities · Writing · Social — plus a separate **Usability Lab** view at `#lab`
- **Look:** light pink with deep plum accents; morphing ink blobs, floating shapes and mouse parallax behind the hero; an extruded display name; a plum "ink" band that floods in as you scroll. Light by default, dark theme on request
- **Highlights:** floating nav bar with scroll-spy and a reading-progress line (a top bar and Menu drawer on phones), marquee section headings, global search (`/`), number keys (`1`–`7` sections, `8` Lab), phone bottom dock, larger-text mode (A+), "HCI notes" toggle, reduced-motion support, WCAG 2.2 AA

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

Needs Node 18+ (tested on Node 20.19).

**Animations not showing?** The site follows the OS "reduce motion" setting (on Windows: Settings → Accessibility → Visual effects → Animation effects). To see the animations anyway, open the site once with `?motion=on`, e.g. `http://localhost:5173/?motion=on`; it is remembered, and `?motion=off` undoes it.

## Design versions (git)

| Ref | What it is |
|---|---|
| `pink-professional` | Current design: pink/plum, neutral floating shapes, "now" card in the hero, Usability Lab, larger text, HCI notes |
| `gligar-pokemon` | Pink Pokémon variant with a Gligar mascot (uses official artwork) |
| `robot-tech-redesign` | Tech variant with a hand-drawn robot mascot, brown/orange palette |
| `main` / tag `original-design` | The design before the blob/animation redesign |

## Edit the content

All profile content is in **`src/data/profile.js`**; you never need to touch layout code.

| Key | What it holds |
|---|---|
| `basics` | name, initials, headline, location, email, availability, bio |
| `skills[]` | `{ id, group, items[] }` |
| `experience[]` | `{ id, role, org, place, mode, start: "YYYY-MM", end, bullets[], tags[] }` |
| `education[]` | `{ id, degree, institution, board?, start?, end, status?, score?: { label, detail }, subjects?: [{ name, mark }] }` |
| `projects[]` | `{ id, title, start, end, summary, bullets[], stack[], tags[], link }` |
| `posts[]` | `{ id, title, date: "YYYY-MM-DD", readingMins, tags[], url, excerpt? }`; empty shows the empty state |
| `social[]` | `{ id, label, handle, url, blurb }` |
| `activities[]` | `{ id, title, detail, tags[] }` |
| `timeline[]` | `{ date, text, ref?: { section, id } }`; `ref` makes the entry a link to that item |

Every item needs a unique `id`; search uses it to scroll to and highlight the item. New content is searchable automatically. Project tags for the filter are collected from `projects[].tags`.

Evaluation content (heuristics, SUS items, test tasks, annotation labels) lives in `src/data/hci.js`.

**Privacy:** don't add phone number, date of birth, parents' names or exam seat numbers.

## Deploy

**Vercel:** import the repo at vercel.com → framework "Vite" is detected → Deploy (build `npm run build`, output `dist`).
**Netlify:** New site from Git → build command `npm run build`, publish directory `dist`.

No server or environment variables are needed.

## Usability Lab

Open it with the footer link, the `8` key or `/#lab`. It is kept off the profile page so test participants never see it. It lets a facilitator:

1. **Tasks**: add a participant (anonymous IDs P1, P2…), time tasks T1–T6, count wrong turns while a task runs, mark Done or Gave up, then record a 1–7 ease rating (Single Ease Question).
2. **SUS**: standard 10-item questionnaire, scored automatically (odd: score − 1, even: 5 − score, sum × 2.5), compared with the 68 average and graded A–F.
3. **Heuristic checklist**: per evaluator, severity 0–4 and notes for each of Nielsen's 10 heuristics.
4. **Results & export**: participants, mean SUS (SD), completion rate, mean time, mean wrong turns and mean ease per task; CSV export; "Clear all sessions" with inline confirmation.

Data is stored in the browser's `localStorage` (`hci-lab-v1`) and synced between tabs on the same browser. **Run all sessions on one machine and export CSV after each day.** Adding a participant resets text size and annotations so T5 starts the same way for everyone.

See `docs/facilitator-script.md` for the session script.

## Project structure

```
src/
  data/profile.js       all profile content
  data/hci.js           heuristics, SUS items, tasks, annotation labels
  styles/tokens.css     base colours (light/dark), spacing, type
  styles/global.css     layout and components
  styles/tech.css       blobs, parallax, extruded name, ink-flood band
  styles/pink.css       pink/plum palette and floating shapes (loaded after tech.css)
  styles/lab.css        Usability Lab, HCI notes, larger text
  hooks/                useLocalStorage, usePrefs, useHotkeys
  lib/                  search, SUS scoring, CSV, date formatting
  components/           SearchBox, Card, Disclosure, TagFilter, Annotation, Tabs, Motion (accessible animation wrappers), …
  components/Sidebar.jsx floating desktop nav, phone top bar and Menu drawer, A+ / theme / HCI notes buttons
  components/tech/      Blob (morphing shapes), HeroScene (parallax layers), InkFlood, Shapes
  components/SectionBand.jsx marquee section heading
  components/reactbits/ React Bits components (BlurText, ShinyText, GradientText, CountUp, SpotlightCard, AnimatedContent, ScrollVelocity, Dock, ClickSpark, Magnet, StarBorder; Aurora is kept but no longer used)
  pages/                ProfilePage (one scrolling page) and LabPage (#lab)
  sections/             one file per profile section; lab/ holds the Usability Lab
docs/
  01-ia-and-wireframes.md
  02-design-rationale.md
  03-usability-report.md   (template: fill in after testing)
  facilitator-script.md
```

## Keyboard shortcuts

| Key | Action |
|---|---|
| `/` | Focus search |
| `↑` `↓` `Enter` | Choose a search result (it opens, scrolls into view and is highlighted) |
| `Esc` | Clear / close search, close help |
| `1`–`7` | Jump to a section (Overview, Experience, Projects, Education, Activities, Writing, Social) |
| `8` | Open the Usability Lab |
| `?` | Keyboard shortcut help |

## Verification done (October 2026, current design)

- axe-core 4.10, WCAG 2.0/2.1/2.2 A and AA rules: 0 violations on the profile page (light and dark) and on all four Lab tabs.
- Contrast computed for every text colour pair in the pink palette (light, dark and the plum band): all ≥ 4.5:1.
- 360px width with normal and larger text: no horizontal scroll on the profile or any Lab tab.
- Keyboard: `/` focuses search, Enter on a result scrolls to and highlights it, number keys jump to sections, focus ring always visible.
- Lab: timer, wrong-turn counter, ease rating, results table and SUS scoring checked (a known answer set scores 75, grade B).
- Production build (`npm run build`) succeeds with no errors.

## Credits

Animated components from [React Bits](https://github.com/DavidHDev/react-bits) by David Haz (MIT + Commons Clause), copied into `src/components/reactbits/` (JS-CSS variants). Two local changes: `Dock.jsx` takes an `ariaLabel` prop, and `ScrollVelocity.jsx` defines its inner `VelocityText` at module level so the band doesn't restart when the page re-renders. They are used through `src/components/Motion.jsx`, which turns animation off under `prefers-reduced-motion` and gives screen readers the plain text.
