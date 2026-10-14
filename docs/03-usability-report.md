# 3. Usability evaluation report

> **Template.** Fill in the bracketed parts from your real sessions (use the CSV exports from the Usability Lab). Do not leave any placeholder numbers in the submitted version.

## 1. Summary

[2–4 sentences: how many people tested the site, mean SUS and grade, overall task completion rate, the most serious problem found and what you changed.]

## 2. Method

- **Type:** moderated, in-person task-based usability test with think-aloud, followed by the System Usability Scale (SUS) and a short debrief; plus an expert heuristic evaluation.
- **Setup:** [device, browser, screen size, location], dates [dd–dd Month 2026].
- **Facilitator script:** see `facilitator-script.md`.
- **Measures:** task success (Done / Gave up), time on task, SUS score (0–100), observed issues.
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
| T5 | Make the text on the page larger. | Larger text toggle on |

## 5. Results

### Task performance

| Task | Completion | Mean time (successful) | Notes |
|---|---|---|---|
| T1 | [x/5 = %] | [s] | [route taken: tab / search / timeline] |
| T2 | | | |
| T3 | | | |
| T4 | | | |
| T5 | | | |
| **Overall** | [%] | [s] | |

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

| Heuristic | Mean severity | Main finding |
|---|---|---|
| H1 Visibility of system status | | |
| … | | |

## 6. Issues, ranked by severity

| # | Issue | Evidence (who / how often) | Heuristic | Severity (0–4) |
|---|---|---|---|---|
| 1 | [e.g. Participants didn't notice the Larger text button on mobile because it's an icon] | [3 of 5, T5] | N6 | 3 |
| 2 | | | | |
| 3 | | | | |

## 7. Design changes made in response

| Issue # | Change | Files changed | Re-test result |
|---|---|---|---|
| 1 | [e.g. Added the visible label "A+" to the text-size button on phones] | `Header.jsx`, `global.css` | [P6 completed T5 in 4s] |

## 8. Limitations

[Small sample, participants mostly students, lab setting, the facilitator knows the designer, etc.]

## 9. Conclusion

[What the evaluation shows about the design, and what you would do next.]
