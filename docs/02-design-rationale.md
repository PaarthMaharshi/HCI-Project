# 2. Design rationale

This document maps each HCI principle to the feature that implements it. Turn on **HCI annotations** in the site header to see the same labels on the live interface.

## Nielsen's 10 usability heuristics

| # | Heuristic | Where it is applied |
|---|---|---|
| N1 | Visibility of system status | Scroll-spy: the header link for the section on screen is underlined in its colour and its number badge is filled; "Showing 2 of 4 projects" updates live as filters change; "Copy email" changes to "Copied" and a toast confirms it; the Lab task timer counts up; SUS shows "7 of 10 answered". |
| N2 | Match between system and the real world | CV vocabulary (Experience, Education, Projects); month–year dates ("May 2026 – Jul 2026"); marks shown as "82.50% (495 / 600)". |
| N3 | User control and freedom | Esc closes search and the help panel; filters have "All" and "Clear filter"; deleting Lab data has Cancel; each section link updates the URL so the browser Back button works; the Lab has a clear "← Back to profile"; every disclosure can be closed again. |
| N4 | Consistency and standards | One card style, one disclosure button style, one chip style across all sections; the header and section links never move; sections always appear in the same order; the Lab sub-tabs follow the WAI-ARIA tabs pattern. |
| N5 | Error prevention | "Clear all sessions" needs a second, explicit "Delete everything" click and says how many sessions will be lost; SUS cannot be scored until all 10 items are answered; a task cannot be started while another is running. |
| N6 | Recognition rather than recall | Section names and their shortcut numbers are always visible; filter tags are shown as chips rather than typed; search suggests results while typing; settings (text size, theme) can also be found through search. |
| N7 | Flexibility and efficiency of use | Keyboard accelerators: `/` search, `1`–`8` sections, `?` help, arrows + Enter in search results. Everything also works with mouse, touch and screen readers. |
| N8 | Aesthetic and minimalist design | The key facts (name, availability, contact, four quick numbers) are in the hero; details (project bullets, subject marks, extra experience bullets) are collapsed by default; colour is used to group, not to decorate. |
| N9 | Help users recognise, diagnose and recover from errors | Search with no matches says so and suggests terms ("Try 'React', 'internship' or 'Class 12'"); a filter combination with no projects shows a "Clear filter" button; if copying fails, the toast explains how to copy manually. |
| N10 | Help and documentation | Keyboard shortcut panel (`?` or footer button); HCI annotations explain each design decision; the Lab includes facilitator instructions inline. |

## Shneiderman's 8 Golden Rules

| Rule | Implementation |
|---|---|
| Strive for consistency | Shared components (`Card`, `Disclosure`, `TagFilter`) and tokens guarantee the same look and behaviour everywhere. |
| Seek universal usability | Novice path (scroll and read, click section links) and expert path (shortcuts, search); larger text; dark theme; reduced motion. |
| Offer informative feedback | Toasts, live counts, timer, pressed states, highlight ring on the item a search result opens. |
| Design dialogs to yield closure | Task runner ends with "All 5 tasks recorded → Continue to SUS"; SUS ends with a score and grade. |
| Prevent errors | See N5. |
| Permit easy reversal of actions | Toggles are toggles; disclosures close; filters clear; tasks can be redone. |
| Keep users in control | Nothing changes on its own; theme follows the OS only until the user chooses; motion respects the OS setting. |
| Reduce short-term memory load | Visible, numbered section links, tags shown on every card, search highlights the matched words. |

## Gestalt principles

- **Proximity**: each skill group sits on one row with its label; email and its Copy button share one container; date pills sit next to the titles they belong to.
- **Similarity**: every section has its own colour (Overview orange, Experience rose, Education amber, Projects teal, Writing pink, Social blue, Activities green, Lab slate), used on the nav badge, section underline, card top border and chips. Items that look alike behave alike.
- **Visual hierarchy**: large display font for names and section titles, a coloured eyebrow label above each title, muted text for metadata, large score numbers in Education.
- **Common region**: cards group related content; the hero groups identity and contact.

## Fitts's law and Hick's law

- **Fitts**: all controls are at least 44×44px (48px on phones); the whole Social card is the link; the Copy button sits right next to the address; filter chips are pill-sized. An automated check confirms no visible target is under 24px at 360px width (WCAG 2.5.8).
- **Fitts (phones)**: a react-bits Dock sits at the bottom of the screen in thumb reach with the six most-used destinations (Overview, Experience, Projects, Education, Contact, Search), each a 44px button.
- **Hick**: 7 section links; the dock offers only 6; filters appear only on Projects; facilitator tools are moved off the page into the separate Lab view, which is split into 4 sub-tabs.

## Progressive disclosure, recognition, consistent navigation

- Collapsed by default: project details/stack/link, HSC and SSC subject marks, experience bullets after the first.
- The header and section links are sticky (fixed position) while scrolling.
- Search opens collapsed content automatically and scrolls the item into view, so users never need to remember where something was.

## Accessibility (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| 1.4.3 / 1.4.11 Contrast | Every text and UI colour pair was computed for the warm cream theme: body text 15.5:1, muted text ≥ 6.1:1, section accents ≥ 4.76:1 as text on cream and ≥ 9:1 in dark mode, borders ≥ 3.4:1. Hero text sits on a cream veil over the pastel aurora and always uses the full text colour (≥ 9.7:1); muted text would drop to 4.2:1 over the pink, so it is not used there. Animated shine/gradient text only moves between colours that each pass on their own. Accent text is never placed on tinted chips (where it would fall to 4.1:1); chips use body text. |
| 1.4.4 Resize text | "Larger text" sets the root size to 125%; all sizes are in rem so the whole layout scales. Browser zoom to 200% also works. |
| 1.4.10 Reflow | Single column at 360px with no horizontal page scroll (checked automatically). |
| 2.1.1 Keyboard | Everything reachable by keyboard; number keys jump to sections; Lab sub-tabs use roving tabindex; search is an ARIA combobox. |
| 2.4.1 Bypass blocks | "Skip to content" link. |
| 2.4.7 / 2.4.11 Focus visible, not obscured | 3px focus ring in a colour with ≥ 6:1 contrast; `scroll-margin-top` keeps focused items below the sticky header. |
| 2.5.8 Target size | ≥ 44px controls (see Fitts). |
| 4.1.2 Name, role, value | `aria-current` on the section link in view, `role="tablist/tab/tabpanel"` in the Lab, `aria-selected`, `aria-controls`, `aria-expanded`, `aria-pressed`, `aria-activedescendant`, labelled form fields, fieldset/legend for SUS items. |
| 4.1.3 Status messages | Toasts, result counts and SUS progress are announced through `aria-live` regions. |
| Themes | Warm light theme by default (the first version followed the OS setting and opened dark on dark-mode devices, which was judged too dark in design review); a separate dark colour set is one click away. |
| Motion | `prefers-reduced-motion` turns off smooth scrolling, the highlight pulse, transitions and every react-bits animation: section fade-ins and the blurred name show immediately, counters show their final value, the aurora and shine stop. Animated text is hidden from screen readers and replaced by the plain text. |
| Forced colours | Current section link and pressed chips keep a visible border, and gradient/shiny text falls back to normal text, in Windows High Contrast. |

Automated check: axe-core reports **0 violations** (WCAG 2.0/2.1/2.2 A and AA rules plus best practices) on the whole profile page in light and dark themes, on a 360px phone, and on the populated Lab results view.

## Animation (react-bits)

Motion is used to guide attention, never to carry information: the name blurs in once, the four hero numbers count up once, sections fade up as they arrive, project and activity cards glow where the pointer or keyboard focus is (SpotlightCard), and a soft aurora moves behind the hero. All of it respects `prefers-reduced-motion` and none of it delays interaction. Components: Aurora, BlurText, ShinyText, GradientText, CountUp, SpotlightCard, AnimatedContent, Dock.

## Single data source

All profile content is in `src/data/profile.js`; layout components only read from it. Search is built from the same object, so new content is searchable without extra work. Private details (phone, date of birth, parents' names, seat numbers) are deliberately not in the file.
