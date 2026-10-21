# 3. Usability evaluation report

> **Template.** Fill in the bracketed parts from your real sessions (use the CSV exports from the Usability Lab). Do not leave any placeholder numbers in the submitted version.

## 1. Summary

[2–4 sentences: how many people tested the site, mean SUS and grade, overall task completion rate, the most serious problem found and what you changed.]

## 2. Method

- **Type:** moderated, in-person task-based usability test with think-aloud, followed by the System Usability Scale (SUS) and a short debrief; plus an expert heuristic evaluation.
- **Setup:** [device, browser, screen size, location], dates [dd–dd Month 2026]. Design tested: [branch / version]. Animation: [on with `?motion=on` / off because the OS reduces motion].
- **Facilitator script:** see `facilitator-script.md`.
- **Measures:** task success (Done / Gave up), time on task, wrong turns per task, ease rating per task (Single Ease Question, 1–7), SUS score (0–100), observed issues. All recorded in the site's Usability Lab (`#lab`) and exported as CSV.
- **Why 5+ participants:** Nielsen & Landauer (1993) show about 5 users find roughly 85% of usability problems in a small test.

## 3. Participants

| ID | Background | Device familiarity | Visited the site before? |
|---|---|---|---|
| P1 | [e.g. 3rd-year CS student] | [high/medium/low] | No |
| P2 | | | |
| P3 | | | |
| P4 | | | |
| P5 | | | |

## 4. Tasks

| Task | Description | Success criterion |
|---|---|---|
| T1 | Find where Paarth did his internship and in which months. | Bounteous x Accolite, May–Jul 2026 |
| T2 | Find a project built with React Native. | Echoing Hearts |
| T3 | Find Paarth's Class 12 percentage. | 82.50% |
| T4 | Copy the email address. | Address in clipboard |
| T5 | Make the text on the page larger. | A+ Larger text toggle on |
| T6 | Open Paarth's LinkedIn profile. | LinkedIn opens in a new tab |

## 5. Results

### Task performance

| Task | Completion | Mean time (successful) | Mean wrong turns | Mean ease (1–7) | Notes |
|---|---|---|---|---|---|
| T1 | [x/5 = %] | [s] | | | [route taken: nav / search / timeline / dock] |
| T2 | | | | | |
| T3 | | | | | |
| T4 | | | | | |
| T5 | | | | | |
| T6 | | | | | |
| **Overall** | [%] | [s] | | | |

### SUS

| Participant | SUS score |
|---|---|
| P1 | |
| P2 | |
| P3 | |
| P4 | |
| P5 | |
| **Mean (SD)** | [mean (SD)], grade [A–F], [above/below] the 68 average |

### Heuristic evaluation

Evaluators: [n classmates who know Nielsen's heuristics], working alone, using the Lab's Heuristic checklist.

| Heuristic | Mean severity (0–4) | Worst | Main finding |
|---|---|---|---|
| H1 Visibility of system status | | | |
| H2 Match between system and the real world | | | |
| H3 User control and freedom | | | |
| H4 Consistency and standards | | | |
| H5 Error prevention | | | |
| H6 Recognition rather than recall | | | |
| H7 Flexibility and efficiency of use | | | |
| H8 Aesthetic and minimalist design | | | [Did the animated background distract anyone?] |
| H9 Recognise, diagnose and recover from errors | | | |
| H10 Help and documentation | | | |

### Accessibility checks

| Check | Result |
|---|---|
| axe-core, WCAG 2.2 AA rules, profile (light + dark) and all Lab tabs | 0 violations (Oct 2026) |
| Keyboard-only walkthrough of T1–T6 | [pass / issues] |
| 360px phone width, normal and larger text | No horizontal scroll (Oct 2026) |
| Reduced motion | [all content visible, animation stopped] |

## 6. Issues, ranked by severity

| # | Issue | Evidence (who / how often) | Heuristic | Severity (0–4) |
|---|---|---|---|---|
| 1 | [e.g. Participants didn't notice the A+ button on phones because it has no text label] | [3 of 5, T5] | N6 | 3 |
| 2 | | | | |
| 3 | | | | |

## 7. Design changes made in response

| Issue # | Change | Files changed | Re-test result |
|---|---|---|---|
| 1 | [e.g. Added a "Text size" label next to A+ on phones] | `Sidebar.jsx`, `lab.css` | [P6 completed T5 in 4s] |

## 8. Limitations

[Small sample, participants mostly students, lab setting, the facilitator knows the designer, etc.]

## 9. Conclusion

[What the evaluation shows about the design, and what you would do next.]
