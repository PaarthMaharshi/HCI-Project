# Facilitator script

**Length:** 15–20 minutes per participant · **Participants:** at least 5 (Nielsen & Landauer), aim for 6–8 · **Setup:** same laptop, same browser, Chrome or Edge, window at normal size.

## Before each session (2 min)

1. Open the site and go to the **Usability Lab** (press `8`, use the footer link, or open `/#lab`).
2. Click **+ New participant**. This gives the next ID (P1, P2…) and resets text size and annotations, so T5 starts fresh.
3. Open the profile for the participant with the **new tab** link in the Tasks panel (or the plain site URL). Make sure it is scrolled to the top and HCI notes are off. The Lab is a separate view, so the participant never sees it.
4. Keep the Lab tab for yourself (second screen, or switch with Ctrl+Tab while the participant isn't looking).

## Introduction (read aloud, 1 min)

> "Thanks for helping. I'm testing this website, not you. There are no wrong answers, and if something is hard to find, that's exactly what I need to know.
> I'll give you five short tasks. Please think aloud: say what you're looking for and what you expect to happen.
> I can't give hints during the tasks. If you want to stop a task, just say 'I give up'. That's useful data too.
> Your name won't be recorded; you'll just be 'Participant 3'. Is that OK?"

Get verbal consent before continuing.

## Tasks (8–10 min)

For each task: read it aloud exactly as written, press **Start** when you finish reading, press **Done** when they say or show the answer, or **Gave up** if they give up or 3 minutes pass.

| Task | Read aloud | Counts as Done when… |
|---|---|---|
| T1 | "Find where Paarth did his internship and in which months." | They say Bounteous x Accolite and May–July 2026. |
| T2 | "Find a project built with React Native." | They name Echoing Hearts. |
| T3 | "Find Paarth's Class 12 percentage." | They say 82.50%. |
| T4 | "Copy the email address." | The "Email copied" toast appears (or they copy it manually and can paste it). |
| T5 | "Make the text on the page larger." | They use the Larger text button (browser zoom counts, but note it). |

While they work, write down on paper: hesitations, wrong clicks, things they say ("I expected…"), and whether they used search, the section links, scrolling, the phone dock or shortcuts.

Do not help. If asked, say "What would you try?"

## SUS questionnaire (3 min)

Switch the Lab to **2 · SUS questionnaire**, hand over the laptop (or read items aloud), and ask them to answer quickly with their first impression. Every item must be answered; the button stays disabled until all 10 are done.

## Debrief (2 min)

1. "What was the hardest part?"
2. "If you could change one thing, what would it be?"

Thank them. Then go to **4 · Results & export** and press **Export sessions CSV** at the end of each testing day.

## Heuristic evaluation (separate, 20–30 min per evaluator)

2–3 evaluators (classmates who know Nielsen's heuristics) work alone. Each one clicks **+ New evaluator** in **3 · Heuristic checklist**, explores the whole site, and rates every heuristic 0–4 with notes. Merge their ratings afterwards in the Results tab.

## Analysis

- **Effectiveness**: completion rate per task and overall.
- **Efficiency**: mean (and median from the CSV) time per task, successful attempts only.
- **Satisfaction**: mean SUS with SD, compared with 68 (average), letter grade on the Sauro–Lewis curve.
- **Issues**: list every problem seen, count how many participants hit it, rate severity 0–4, sort by severity then frequency. Fix the top issues and re-test if time allows.
