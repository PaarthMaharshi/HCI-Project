# 2. Design rationale

This document maps each HCI principle to the feature that implements it. Press **Show HCI notes** in the footer (or in the Menu drawer on phones) to see the same labels on the live interface.

## Nielsen's 10 usability heuristics

| # | Heuristic | Where it is applied |
|---|---|---|
| N1 | Visibility of system status | Scroll-spy: the link for the section on screen is highlighted in its colour inside the floating nav, and a thin progress line under the nav fills as you read; "Showing 2 of 4 projects" updates live as filters change; "Copy email" changes to "Copied" and a toast confirms it; search results appear as you type; in the Lab the task timer counts up and SUS shows "7 of 10 answered". |
| N2 | Match between system and the real world | CV vocabulary (Experience, Education, Projects, Copy email); month–year dates ("May 2026 – Jul 2026"); marks shown as "82.50% (495 / 600)"; familiar icons for GitHub, LinkedIn and mail. |
| N3 | User control and freedom | Esc closes search, the shortcut panel and the phone menu; filters have "All" and "Clear filter"; every "Show more" can be closed again; each section link updates the URL so the browser Back button works; deleting Lab data has Cancel; the Lab has a clear "← Back to profile". |
| N4 | Consistency and standards | One card, chip and disclosure style across all sections; the nav stays in the same floating position on every screen (on phones the top bar and Menu stay put); each section keeps its own colour in its heading band; the Lab sub-tabs follow the WAI-ARIA tabs pattern. |
| N5 | Error prevention | Copy email means nobody has to retype the address; all settings are reversible toggles; "Clear all sessions" in the Lab needs a second, explicit "Delete everything" click and says how many sessions will be lost; SUS cannot be scored until all 10 items are answered; a task cannot be started while another is running. |
| N6 | Recognition rather than recall | All seven section links are always visible; filter tags are chips rather than typed; search suggests results while typing; settings (larger text, theme, HCI notes) can also be found through search; the `?` panel lists every shortcut. |
| N7 | Flexibility and efficiency of use | Keyboard accelerators (`/` search, `1`–`7` sections, `8` Lab, `?` help, arrows + Enter in search results) for experienced users; a thumb-reach dock on phones; search jumps straight to an item and highlights it. Everything also works with mouse, touch and screen readers. |
| N8 | Aesthetic and minimalist design | The key facts (name, headline, availability, contact, latest role, four quick numbers) are in the hero; details (project bullets, subject marks, extra experience bullets) are collapsed by default. The animated background is decoration only and is kept subordinate to the content (see "Visual design and motion" below). |
| N9 | Help users recognise, diagnose and recover from errors | Search with no matches says so and suggests terms ("Try 'React', 'internship' or 'Class 12'"); a filter combination with no projects shows a "Clear filter" button; if copying fails, the toast explains how to copy manually ("Select the address and press Ctrl+C"). |
| N10 | Help and documentation | Keyboard shortcut panel (`?` or footer button); "Show HCI notes" labels each part of the interface with the principle it applies; the Lab includes facilitator instructions inline. |

## Shneiderman's 8 Golden Rules

| Rule | Implementation |
|---|---|
| Strive for consistency | Shared components (`Card`, `Disclosure`, `TagFilter`, `SectionBand`) and design tokens give every section the same look and behaviour. |
| Seek universal usability | Novice path (scroll, read, click section links) and expert path (shortcuts, search); larger text; light and dark themes; reduced motion; full keyboard and screen-reader support. |
| Offer informative feedback | Toasts, live counts, the Lab timer, pressed states on toggles, a highlight ring on the item a search result opens. |
| Design dialogs to yield closure | Task runner ends with "All 6 tasks recorded → Continue to SUS questionnaire"; SUS ends with a score, grade and comparison with the average. |
| Prevent errors | See N5. |
| Permit easy reversal of actions | Toggles switch back; disclosures close; filters clear; Lab tasks can be redone. |
| Keep users in control | Nothing changes on its own: the theme is light until the visitor picks dark; motion follows the OS setting; nothing auto-plays sound or opens without a click. |
| Reduce short-term memory load | Visible section links, tags shown on every card, search highlights the matched words, the Lab shows the expected answer next to each task. |

## Gestalt principles

- **Proximity**: each skill group sits on one row with its label; the email address and its Copy button share one pill; the "now" card groups availability, latest role and focus areas together.
- **Similarity**: every section has its own colour, shown most strongly in its tilted marquee heading band (Experience rose, Projects teal, Education amber, Activities green, Writing pink, Social blue), and reused for its accents. Items that look alike behave alike.
- **Common region**: the "About" content (Skills and Timeline) sits on one dark plum band that floods in as you scroll, so it reads as one group distinct from the hero above and the sections below.
- **Figure and ground / visual hierarchy**: a large display name with a 3D extruded outline, a smaller headline, then body text; muted colour for metadata; large score numbers in Education. The decorative blobs are low-detail and sit behind the text, so the content stays the figure.

## Fitts's law and Hick's law

- **Fitts**: controls are at least 44×44px (48px on phones); the whole Social row is the link; the Copy button sits right next to the address; filter chips are pill-sized. An automated check confirms no visible target is under 24px at 360px width (WCAG 2.5.8).
- **Fitts (phones)**: a dock sits at the bottom of the screen in thumb reach with the six most-used destinations (Overview, Experience, Projects, Education, Contact, Search), each a 44px button.
- **Hick**: 7 section links in the nav; the dock offers only 6; filters appear only on Projects; facilitator tools live in a separate Lab view, split into 4 sub-tabs.

## Progressive disclosure, recognition, consistent navigation

- Collapsed by default: project details/stack/link, HSC and SSC subject marks, experience bullets after the first.
- Desktop: a floating glass nav bar stays centred at the top on every screen. Phones and tablets: a slim top bar (Menu, initials, search, A+, theme) stays put, and Menu opens a drawer (native `<dialog>`: focus is trapped, Esc closes it, focus returns to Menu).
- Search opens collapsed content automatically and scrolls the item into view, so users never need to remember where something was.

## Visual design and motion

The page takes its visual idea from a well-known "Explore the Space" landing-page concept: organic ink blobs that keep changing shape, floating objects, mouse parallax, a chunky extruded headline, and a liquid blob that floods the screen to reveal a second panel. It is rendered here in the profile's own pink and plum palette with neutral shapes (glowing orbs, orbiting rings, sparkles).

| Effect | How it works | Why it does not hurt usability |
|---|---|---|
| Morphing blobs | SVG paths whose radius wobbles with layered sine waves, joined by a smooth curve; one shared animation clock | Placed at the edges, behind the content; pause when off screen |
| Floating shapes and mouse parallax | Each layer drifts by a different amount as the pointer moves (`--px`/`--py`) | Off on touch screens; small movements; decorative only |
| Extruded name | Display font (Bungee) with a stroke and stacked text shadows | The real `<h1>` text is unchanged for screen readers |
| Ink flood | A blob rises from the bottom of the screen and swells until it covers the About band; the palette inverts inside | Text fades in only once the ink is behind it, so it is never shown on the wrong background |

**Defending N8 (minimalist design).** Decoration is the main risk for this heuristic, so it is constrained:

1. **Content first.** The hero's right-hand column holds real content (the "now" card), not an illustration, so the first screen answers a recruiter's questions.
2. **Behind, not on top.** Every decorative layer sits under the text and never covers it; on narrow screens the blobs that would sit under the stats are removed.
3. **Invisible to assistive tech.** The whole scene is `aria-hidden`, so screen-reader users get only content.
4. **Stops on request.** Under `prefers-reduced-motion` the blobs freeze, the parallax and floating stop, and the ink band is shown fully flooded with no animation.
5. **Not used for information.** Nothing is communicated only through motion.

Visitors whose OS turns animations off globally but who still want to see them can opt in with `?motion=on` (remembered; `?motion=off` undoes it).

## Accessibility (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| 1.4.3 / 1.4.11 Contrast | Computed for the pink palette. Light: body text 14.3:1, muted text ≥ 5.8:1, section accents 4.55–6.1:1 as text, white on the pink button 6.0:1, divider lines ≥ 3.1:1. Dark: body text 16.8:1, muted ≥ 9.9:1, accent 10.2:1. Plum band: text 12.6:1, muted ≥ 6.8:1. Shine and gradient text only move between colours that each pass on their own. |
| 1.4.4 Resize text | "A+ Larger text" sets the root size to 125%; all sizes are in rem so the whole layout scales. With larger text on, the compact top bar is used up to a wider screen so the nav still fits. Browser zoom to 200% also works. |
| 1.4.10 Reflow | Single column at 360px with no horizontal page scroll, with normal and larger text, on the profile and every Lab tab (checked automatically). |
| 2.1.1 Keyboard | Everything reachable by keyboard; number keys jump to sections; Lab sub-tabs use roving tabindex with arrow keys; search is an ARIA combobox. |
| 2.3.3 Animation from interactions | Parallax and floating stop under `prefers-reduced-motion`. |
| 2.4.1 Bypass blocks | "Skip to content" link. |
| 2.4.7 / 2.4.11 Focus visible, not obscured | Solid focus ring in a high-contrast colour; `scroll-margin-top` keeps focused items below the sticky bar. |
| 2.5.8 Target size | ≥ 44px controls (see Fitts); the smallest Lab rating buttons stay above 24px at 360px. |
| 4.1.2 Name, role, value | `aria-current` on the section link in view, `role="tablist/tab/tabpanel"` in the Lab, `aria-pressed` on the Larger text and HCI notes toggles, `aria-expanded` on disclosures and the menu, `aria-activedescendant` in search, labelled fields, fieldset/legend for SUS and ease questions. |
| 4.1.3 Status messages | Toasts, result counts, the Lab error counter and SUS progress are announced through `aria-live` regions. |
| Themes | Light pink by default; dark plum one click away; the choice is remembered. |
| Motion | `prefers-reduced-motion` turns off smooth scrolling, transitions, the blob morphing, parallax, floating shapes, the ink-flood animation and every React Bits animation; counters show their final values; animated text is hidden from screen readers and replaced by the plain text. |
| Forced colours | In Windows High Contrast the decorative scene is hidden, the extruded name becomes plain text, and the current section link and pressed chips keep a visible outline. |

**Automated check (October 2026):** axe-core 4.10 with the WCAG 2.0/2.1/2.2 A and AA rules reports **0 violations** on the profile page in light and dark themes, and on all four Lab tabs.

## Animation library

Motion components come from React Bits (BlurText, ShinyText, GradientText, CountUp, SpotlightCard, AnimatedContent, ScrollVelocity, Dock, ClickSpark, Magnet, StarBorder), plus the custom blob, parallax and ink-flood code in `src/components/tech/`. All of it goes through the reduced-motion checks above, and none of it delays interaction.

## Single data source

All profile content is in `src/data/profile.js`; layout components only read from it. Search is built from the same object, so new content is searchable without extra work. Evaluation content (heuristics, SUS items, tasks, annotation labels) is in `src/data/hci.js`. Private details (phone, date of birth, parents' names, seat numbers) are deliberately not in either file.
