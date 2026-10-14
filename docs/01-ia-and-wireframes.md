# 1. Information architecture and low-fidelity wireframes

## Goals and users

| User | Goal | Typical question |
|---|---|---|
| Recruiter / hiring manager | Decide quickly whether to contact Paarth | "Has he done an internship? How do I reach him?" |
| Peer / mentor | See what Paarth has built | "What stack does he use? Is there a repo?" |
| Examiner / reviewer | Check the HCI principles and evaluation | "Where is each heuristic applied? What did testing show?" |

## Sitemap

The profile is **one scrolling page**. The sticky header lists every section; the link for the section on screen is highlighted as you scroll (scroll-spy). Each section has its own URL hash (`#projects`) so links and the Back button work. The **Usability Lab** is a separate view at `#lab`, so visitors and test participants never see facilitator tools.

```
Paarth Maharshi (/)
├── Header (sticky)
│   ├── Row 1: PM brand → top · Global search [/] · Larger text · Light/Dark · HCI notes
│   └── Row 2: section links with scroll-spy [1–7]
├── 1 Overview (#overview)
│   ├── Hero: "Hi, I'm" · name · headline · location · availability · bio · email + Copy
│   ├── Quick facts: 1 internship · 4 projects · 3 hackathon finals · 100+ LeetCode
│   └── Skills (grouped chips) | Timeline (entries link to the related item)
├── 2 Experience (#experience) ... internship card (first bullet visible, rest collapsed)
├── 3 Projects (#projects) ....... tag filter → 2×2 cards (details, stack, link collapsed)
├── 4 Education (#education) ..... VJTI · HSC 82.50% · SSC 93% side by side (marks collapsed)
├── 5 Activities (#activities) ... Hackathons · Agastya · LeetCode
├── 6 Writing (#writing) | 7 Social (#social)   ← side by side
├── Footer ....................... last updated · Keyboard shortcuts [?] · Usability Lab [8]
└── Phone only: bottom dock ...... Overview · Experience · Projects · Education · Contact · Search

Usability Lab (/#lab)
├── Header: brand · ← Back to profile · settings
└── Sub-tabs: Tasks · SUS questionnaire · Heuristic checklist · Results & export
```

**Why one page:** a CV is read top to bottom, and a single page lets a recruiter skim everything in one scroll (Paarth's design feedback after the first version). Recognition and orientation come from the sticky, numbered section links and the scroll-spy highlight, and the most important facts sit in the hero so nobody has to scroll for them. The section order follows what recruiters ask first: who, what job, what built, what studied.

## Wireframe: desktop (≥ 1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [PM] Paarth Maharshi   ( 🔍 Search projects, skills, marks…  / )          │
│                              [Tт Larger text] [☾ Dark] [ⓘ HCI notes]     │
│  ①Overview ②Experience ③Projects ④Education ⑤Activities ⑥Writing ⑦Social │
│  ━━━━━━━━━  ← highlighted for the section on screen                      │
├──────────────────────────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░ pastel aurora background (peach / coral / mint) ░░░░░░░░░ │
│ [PM] (● Looking for internships)                ┌────────┐ ┌────────┐    │
│ Hi, I'm                                          │ 1      │ │ 4      │    │
│ Paarth Maharshi                                  │Internsh│ │Projects│    │
│ B.Tech Computer Engineering, 3rd year · VJTI     └────────┘ └────────┘    │
│ ⌖ Mumbai, Maharashtra                            ┌────────┐ ┌────────┐    │
│ Aspiring developer with an interest in …         │ 3      │ │ 100+   │    │
│ ( paarthmahatree14@gmail.com  [⧉ Copy email] )   │Hackath.│ │LeetCode│    │
│                                                  └────────┘ └────────┘    │
│ ┌───────────────────────────────┐ ┌───────────────────────────────────┐  │
│ │ Skills                        │ │ Timeline                          │  │
│ └───────────────────────────────┘ └───────────────────────────────────┘  │
│ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ Software Engineering Intern, Agentic AI          [May 2026 – Jul 2026]│ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ (✓All) (Agentic AI) (Backend) (AI/ML) (Web) (Team) (Mobile) (UI/UX) …    │
│ Showing 4 of 4 projects                                                  │
│ ┌─────────────────────────────────┐ ┌─────────────────────────────────┐  │
│ │ Agentic Meeting Transcript …    │ │ AI Text Detector …              │  │
│ │ [› Details, tech stack & link]  │ │ [› Details, tech stack & link]  │  │
│ └─────────────────────────────────┘ └─────────────────────────────────┘  │
│ ┌─────────────────────────────────┐ ┌─────────────────────────────────┐  │
│ │ DiseaseDecoder …                │ │ Echoing Hearts …                │  │
│ └─────────────────────────────────┘ └─────────────────────────────────┘  │
│ EDUCATION ━━━━  [ VJTI ]  [ HSC 82.50% ]  [ SSC 93% ]                    │
│ ACTIVITIES ━━━  [ Hackathons ]  [ Agastya ]  [ LeetCode ]                │
│ WRITING (empty state)          │ SOCIAL [GitHub] [LinkedIn]              │
│ footer: © · Keyboard shortcuts ? · Usability Lab 8                       │
└──────────────────────────────────────────────────────────────────────────┘
```

## Wireframe: phone (360px)

```
┌────────────────────────────┐
│ [PM] Paarth Maharshi [Tт][☾][ⓘ]│
│ ( 🔍 Search…             ) │
│ ①Overview ②Experience ③P… →│  ← scrollable section links
├────────────────────────────┤
│ [PM] (● Looking for intern)│
│ Hi, I'm                    │
│ Paarth Maharshi            │
│ B.Tech …                   │
│ [email]                    │
│ [⧉ Copy email]             │
│ [1 Internship][4 Projects] │
│ [3 Hackathon][100+ LeetC.] │
│ Skills · Timeline · …      │
│                            │
│ ╭────────────────────────╮ │
│ │ ⌂  💼  </>  🎓  ✉  🔍  │ │  ← react-bits Dock, thumb reach
│ ╰────────────────────────╯ │
└────────────────────────────┘
```

Phone rules: one column; touch targets at least 44–48px; the bottom dock holds the six most-used destinations (the full list stays in the header); no horizontal page scroll (checked automatically at 360px).

## Data model

All content is in `src/data/profile.js` (see the README for the schema), including the section order (`SECTIONS`) and the hero facts (`stats`). Evaluation content (heuristics, SUS items, tasks, annotation labels) is in `src/data/hci.js`.
