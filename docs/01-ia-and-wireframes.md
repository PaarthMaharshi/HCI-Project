# 1. Information architecture and low-fidelity wireframes

## Goals and users

| User | Goal | Typical question |
|---|---|---|
| Recruiter / hiring manager | Decide quickly whether to contact Paarth | "Has he done an internship? How do I reach him?" |
| Peer / mentor | See what Paarth has built | "What stack does he use? Is there a repo?" |
| Examiner / reviewer | Check the HCI principles and evaluation | "Where is each heuristic applied? What did testing show?" |

## Sitemap

Single page, eight top-level sections as ARIA tabs. Every tab has its own URL hash (`#projects`) so Back/Forward and links work.

```
Paarth Maharshi (/)
├── Header (sticky)
│   ├── PM brand → Overview
│   ├── Global search  [/]
│   ├── Larger text toggle
│   ├── Light / dark theme
│   └── HCI annotations toggle
├── Tabs (sticky)  [1–8]
│   ├── 1 Overview ......... hero (name, headline, location, availability, bio, email + Copy), Skills, Timeline
│   ├── 2 Experience ....... Bounteous x Accolite internship (first bullet visible, rest collapsed)
│   ├── 3 Education ........ VJTI · HSC 82.50% · SSC 93% (subject marks collapsed)
│   ├── 4 Projects ......... tag filter → 4 cards (details, stack, link collapsed)
│   ├── 5 Writing .......... empty state → "See my projects instead"
│   ├── 6 Social ........... GitHub, LinkedIn (whole card is the link)
│   ├── 7 Activities ....... Hackathons, Agastya, LeetCode
│   └── 8 Usability Lab .... sub-tabs: Tasks · SUS · Heuristic checklist · Results & export
└── Footer ................. last updated, Keyboard shortcuts [?]
```

Why tabs and not one long scroll: each view holds one topic (Hick's law, minimalism), the tab bar is always visible (recognition, consistent navigation), and numbered tabs give expert users a direct shortcut.

## Wireframe: desktop (≥ 1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [PM] Paarth Maharshi   ( 🔍 Search projects, skills, marks…  / )          │
│                                    [Tт Larger text] [☾ Dark] [ⓘ HCI]     │
│  ①Overview  ②Experience  ③Education  ④Projects  ⑤Writing  ⑥Social ...    │
│  ━━━━━━━━━                                                               │
├──────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ ┌────┐  Paarth Maharshi                                              │ │
│ │ │ PM │  B.Tech Computer Engineering, 3rd year · VJTI Mumbai          │ │
│ │ └────┘  ⌖ Mumbai   ● Looking for internships                         │ │
│ │         Aspiring developer with an interest in …                     │ │
│ │         [ paarthmahatree14@gmail.com  (⧉ Copy email) ]               │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────┐ ┌───────────────────────────────────┐  │
│ │ Skills                        │ │ Timeline                          │  │
│ │ LANGUAGES  (Python)(C++)(JS)… │ │ ○ Jul 2026  Finished internship…  │  │
│ │ FRAMEWORKS (React)(Expo)…     │ │ ○ Mar 2026  Shipped DiseaseDec…   │  │
│ │ …                             │ │ ○ …                               │  │
│ └───────────────────────────────┘ └───────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

Projects tab:

```
│ BUILD                                                                    │
│ Projects                          Filter by tag, then open a card…       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ (✓All) (Agentic AI) (Backend) (AI/ML) (Web) (Team) (Mobile) (UI/UX) …    │
│ Showing 4 of 4 projects                                                  │
│ ┌────────────────────────┐ ┌────────────────────────┐ ┌───────────────┐  │
│ │ Agentic Meeting …      │ │ AI Text Detector …     │ │ DiseaseDecoder│  │
│ │ [May 2026 – Jul 2026]  │ │ [Nov 2025 – Jan 2026]  │ │ …             │  │
│ │ Summary…               │ │ Summary…               │ │               │  │
│ │ (Agentic AI)(Backend)  │ │ (AI/ML)(Web)(Team)     │ │               │  │
│ │ [› Details, stack…]    │ │ [› Details, stack…]    │ │               │  │
│ └────────────────────────┘ └────────────────────────┘ └───────────────┘  │
```

Usability Lab tab:

```
│ Participant [P3 ▾]  [+ New participant]                                  │
│ 1·Tasks  2·SUS questionnaire  3·Heuristic checklist  4·Results & export  │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ [T1] Find where Paarth did his internship…     00:12.4 [Done][Gave up]│ │
│ │ [T2] Find a project built with React Native.                [Start]  │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
```

## Wireframe: phone (360px)

```
┌────────────────────────────┐
│ [PM] Paarth Maharshi [Tт][☼][ⓘ] │
│ ( 🔍 Search…             ) │
│ ①Overview ②Experience ③E… → │  ← horizontally scrollable tab bar
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │ ┌──┐                   │ │
│ │ │PM│                   │ │
│ │ └──┘                   │ │
│ │ Paarth Maharshi        │ │
│ │ B.Tech …               │ │
│ │ [email]                │ │
│ │ [⧉ Copy email]         │ │
│ └────────────────────────┘ │
│ Skills (stacked groups)    │
│ Timeline                   │
└────────────────────────────┘
```

Phone rules: one column; touch targets at least 48px; header icons keep their text names for screen readers; no horizontal page scroll (checked automatically at 360px).

## Data model

All content is in `src/data/profile.js` (see the README for the schema). Evaluation content (heuristics, SUS items, tasks, annotation labels) is in `src/data/hci.js`.
