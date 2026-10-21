# 1. Information architecture and low-fidelity wireframes

## Goals and users

| User | Goal | Typical question |
|---|---|---|
| Recruiter / hiring manager | Decide quickly whether to contact Paarth | "Has he done an internship? How do I reach him?" |
| Peer / mentor | See what Paarth has built | "What stack does he use? Is there a repo?" |
| Examiner / reviewer | Check the HCI principles and evaluation | "Where is each heuristic applied? What did testing show?" |

## Sitemap

The profile is **one scrolling page** with a **floating navigation bar** that lists every section. The link for the section on screen is highlighted as you scroll (scroll-spy) and a thin progress line under the bar fills as you read. Each section has its own URL hash (`#projects`) so links and the Back button work. The **Usability Lab** is a separate view at `#lab`, so visitors and test participants never see facilitator tools.

```
Paarth Maharshi (/)
├── Floating nav bar (desktop, centred at the top)
│   ├── PM initials → top
│   ├── Section links Overview … Social with scroll-spy and progress line [1–7]
│   ├── Search [/]
│   └── A+ Larger text · Theme · "Say hi" (jumps to Copy email)
├── Phones/tablets instead: top bar (Menu · PM · Search · A+ · Theme)
│   └── Menu opens a drawer: section list · availability · Say hi · Theme · Shortcuts · HCI notes
├── 1 Overview (#overview)
│   ├── Hero: "Hi, I'm" · extruded name · headline · location · bio · email + Copy · See projects
│   │   └── right column: "now" card (availability · latest role · focus areas)
│   ├── Quick facts: 1 internship · 4 projects · 3 hackathon finals · 100+ LeetCode
│   └── Plum "ink" band floods in: Skills (grouped chips) | Timeline (entries link to items)
├── 2 Experience (#experience) ... internship card (first bullet visible, rest collapsed)
├── 3 Projects (#projects) ....... tag filter → project cards (details, stack, link collapsed)
├── 4 Education (#education) ..... VJTI · HSC 82.50% · SSC 93% side by side (marks collapsed)
├── 5 Activities (#activities) ... Hackathons · Agastya · LeetCode
├── 6 Writing (#writing) .......... empty state → link to Projects
├── 7 Social (#social) ............ GitHub / LinkedIn / Email link rows
├── Every section after Overview opens with a tilted marquee band in its colour, then "0N —" and the h2
├── Footer ....................... last updated · Show HCI notes · Keyboard shortcuts [?] · Usability Lab [8]
└── Phone only: bottom dock ...... Overview · Experience · Projects · Education · Contact · Search

Decorative layer (aria-hidden, stops under reduced motion)
└── Hero: morphing plum blobs · floating orbs, rings and sparkles · mouse parallax

Usability Lab (/#lab)
├── Header: brand · ← Back to profile · A+ · Theme
└── Sub-tabs (ARIA tabs): Tasks · SUS questionnaire · Heuristic checklist · Results & export
```

**Why one page:** a CV is read top to bottom, and a single page lets a recruiter skim everything in one scroll. Orientation comes from the always-visible section links and the scroll-spy highlight, and the most important facts sit in the hero so nobody has to scroll for them. The section order follows what recruiters ask first: who, what job, what built, what studied.

## Wireframe: desktop (≥ 1200px)

```
            ╭──────────────────────────────────────────────────────────────╮
            │ (PM) Overview Experience Projects … Social │ 🔍 / │ A+ ☾ [Say hi] │
            ╰──────────────────────────────────────────────────────────────╯
 ◖blob                                                           ╭───────blob──╮
            Hi, I'm                                  ○ ring      │ ✦   ◯    ✦  │
            ██████ PAARTH       (extruded display name)          ╰─────────────╯
            ██████ MAHARSHI                         ┌──────────────────────────┐
            B.Tech Computer Engineering, 3rd year   │ (PM) Paarth Maharshi     │
            ⌖ Mumbai, Maharashtra                   │ ● Looking for internships│
            Aspiring developer …                    │ LATEST ROLE  SWE Intern …│
            ( paarthmahatree14@gmail.com [⧉ Copy] ) │ FOCUS  (App dev)(AI)(RAG)│
            See projects ↓                          └──────────────────────────┘
            1          │ 4        │ 3          │ 100+
            Internship │ Projects │ Hackathons │ LeetCode
 ◖blob                                                                 blob◗
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ plum ink band floods up as you scroll ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓   ┌ What I work with ─────────────┐   ┌ Recently ──────────────────┐       ▓
▓   │ Skills  LANGUAGES Python C++ …│   │ Timeline ○ Jul 2026 …      │       ▓
▓   └───────────────────────────────┘   └────────────────────────────┘       ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            ▓▓ EXPERIENCE ✦ EXPERIENCE ✦ … ▓▓ (tilted band)
            02 — Experience
            May 2026 ↓ Jul 2026 │ Software Engineering Intern … › Show 2 more
            … Projects (filter chips) · Education · Activities · Writing · Social
            Footer: © · HCI notes · Shortcuts ? · Usability Lab 8
```

## Wireframe: phone (360px)

```
┌────────────────────────────┐
│ [☰] (PM) (🔍 Search…) A+ ☾ │  ← Menu opens the drawer
├────────────────────────────┤
│              ╭──blob──╮    │
│ Hi, I'm      ╰────────╯    │
│ PAARTH                     │
│ MAHARSHI                   │
│ B.Tech …                   │
│ [email]  [⧉ Copy email]    │
│ ┌────────────────────────┐ │
│ │ now card               │ │
│ └────────────────────────┘ │
│ 1         │ 4              │
│ Internship│ Projects       │
│ ▓▓▓ plum band: Skills ▓▓▓▓ │
│ ▓▓▓ then Timeline ▓▓▓▓▓▓▓▓ │
│ ╭────────────────────────╮ │
│ │ ⌂  💼  </>  🎓  ✉  🔍  │ │  ← dock, thumb reach
│ ╰────────────────────────╯ │
└────────────────────────────┘
```

Phone rules: one column; touch targets at least 44–48px; the bottom dock holds the six most-used destinations (the full list is in the Menu drawer); the blobs that would sit under the stats are hidden; no horizontal page scroll (checked automatically at 360px, with normal and larger text).

## Data model

All content is in `src/data/profile.js` (see the README for the schema), including the section order (`SECTIONS`) and the hero facts (`stats`). Evaluation content (heuristics, SUS items, tasks, annotation labels) is in `src/data/hci.js`.
