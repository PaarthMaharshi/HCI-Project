# 1. Information architecture and low-fidelity wireframes

## Goals and users

| User | Goal | Typical question |
|---|---|---|
| Recruiter / hiring manager | Decide quickly whether to contact Paarth | "Has he done an internship? How do I reach him?" |
| Peer / mentor | See what Paarth has built | "What stack does he use? Is there a repo?" |
| Examiner / reviewer | Check the HCI principles and evaluation | "Where is each heuristic applied? What did testing show?" |

## Sitemap

The profile is **one scrolling page** with a **fixed left sidebar** that lists every section. The link for the section on screen is highlighted as you scroll (scroll-spy) and a progress rail beside the list fills as you read. Each section has its own URL hash (`#projects`) so links and the Back button work. The **Usability Lab** is a separate view at `#lab`, so visitors and test participants never see facilitator tools.

```
Paarth Maharshi (/)
├── Left sidebar (fixed, desktop)
│   ├── Identity: PM avatar → top · name · tagline · availability
│   ├── Global search [/]
│   ├── Section links 01–07 with scroll-spy and progress rail [1–7]
│   └── Settings (Larger text · Dark theme · HCI notes) · Shortcuts [?] · Usability Lab [8]
├── Phones/tablets instead: top bar (Menu · PM name · A+) + search; Menu opens the sidebar as a drawer
├── 1 Overview (#overview)
│   ├── Hero: "Hi, I'm" · name · headline · location · availability · bio · email + Copy
│   ├── Quick facts: 1 internship · 4 projects · 3 hackathon finals · 100+ LeetCode
│   └── Skills (grouped chips) | Timeline (entries link to the related item)
├── 2 Experience (#experience) ... internship card (first bullet visible, rest collapsed)
├── 3 Projects (#projects) ....... tag filter → numbered rows 01–04 (details, stack, link collapsed)
├── 4 Education (#education) ..... VJTI · HSC 82.50% · SSC 93% side by side (marks collapsed)
├── 5 Activities (#activities) ... Hackathons · Agastya · LeetCode
├── 6 Writing (#writing) .......... empty state → link to Projects
├── 7 Social (#social) ............ big GitHub / LinkedIn link rows
├── Every section after Overview opens with a tilted marquee band in its colour, then "0N —" and the h2
├── Footer ....................... last updated · Keyboard shortcuts [?] · Usability Lab [8]
└── Phone only: bottom dock ...... Overview · Experience · Projects · Education · Contact · Search

Usability Lab (/#lab)
├── Header: brand · ← Back to profile · settings
└── Sub-tabs: Tasks · SUS questionnaire · Heuristic checklist · Results & export
```

**Why one page:** a CV is read top to bottom, and a single page lets a recruiter skim everything in one scroll (Paarth's design feedback after the first version). Recognition and orientation come from the sticky, numbered section links and the scroll-spy highlight, and the most important facts sit in the hero so nobody has to scroll for them. The section order follows what recruiters ask first: who, what job, what built, what studied.

## Wireframe: desktop (≥ 1024px)

No boxes around content: structure comes from type size, whitespace, hairlines and colour.

```
┌──────────────┬───────────────────────────────────────────────────────────┐
│ (PM) Paarth  │ ░░░░░░░░░ pastel aurora (peach / coral / mint) ░░░░░░░░░░ │
│ Maharshi     │ Hi, I'm                                                   │
│ Comp Eng·VJTI│ Paarth Maharshi                                           │
│ ● Looking for│ B.Tech Computer Engineering, 3rd year · VJTI Mumbai       │
│  internships │ Aspiring developer …                                      │
│              │ ( paarthmahatree14@gmail.com  [⧉ Copy email] )            │
│ (🔍 Search  /)│                                                           │
│              │ 1          │ 4          │ 3            │ 100+              │
│ ┃ 01 Overview│ Internship │ Projects   │ Hackathon    │ LeetCode          │
│ ┃ 02 Experien│                                                           │
│ ┃ 03 Projects│ WHAT I WORK WITH            RECENTLY                      │
│ │ 04 Educat. │ Skills                      Timeline                      │
│ │ 05 Activit.│ LANGUAGES Python / C++ / …  ○ Jul 2026 Finished intern…   │
│ │ 06 Writing │                                                           │
│ │ 07 Social  │ ▓▓ EXPERIENCE ✦ EXPERIENCE ✦ EXPERIENCE ✦ ▓▓ (tilted band)│
│ (rail fills  │ 02 —                                                      │
│  as you read)│ Experience                                                │
│              │ May 2026   Software Engineering Intern, Agentic AI        │
│              │ ↓          Bounteous x Accolite · Bangalore (Hybrid)      │
│ [Tт][☾][ⓘ]   │ Jul 2026   • Built and evaluated …  › Show 2 more         │
│ Shortcuts  ? │ ─────────────────────────────────────────────────────────  │
│ Usability  8 │ ▓▓ PROJECTS ✦ PROJECTS ✦ … ▓▓                             │
│ Lab          │ 03 — Projects   (✓All)(Agentic AI)(Backend)…              │
│              │ ╔═╗  Agentic Meeting Transcript Decoder   May–Jul 2026    │
│              │ ║01  Multi-agent pipeline that …  #AgenticAI #Backend     │
│              │ ─────────────────────────────────────────────────────────  │
│              │ ║02  AI Text Detector …                                   │
│              │ EDUCATION band · 3 columns with vertical rules            │
│              │ ACTIVITIES band · icon rows  · WRITING · SOCIAL link rows │
└──────────────┴───────────────────────────────────────────────────────────┘
```

## Wireframe: phone (360px)

```
┌────────────────────────────┐
│ [☰] (PM) Paarth Maharshi [Tт]│  ← Menu opens the sidebar as a left drawer
│ ( 🔍 Search…             ) │
├────────────────────────────┤
│ Hi, I'm                    │
│ Paarth Maharshi            │
│ B.Tech …                   │
│ [email]                    │
│ [⧉ Copy email]             │
│ 1         │ 4              │
│ Internship│ Projects       │
│ ▓ EXPERIENCE ✦ EXPERIE… ▓  │
│ 02 — Experience            │
│ …                          │
│ ╭────────────────────────╮ │
│ │ ⌂  💼  </>  🎓  ✉  🔍  │ │  ← react-bits Dock, thumb reach
│ ╰────────────────────────╯ │
└────────────────────────────┘
```

Phone rules: one column; touch targets at least 44–48px; the bottom dock holds the six most-used destinations (the full list is in the Menu drawer); no horizontal page scroll (checked automatically at 360px).

## Data model

All content is in `src/data/profile.js` (see the README for the schema), including the section order (`SECTIONS`) and the hero facts (`stats`). Evaluation content (heuristics, SUS items, tasks, annotation labels) is in `src/data/hci.js`.
