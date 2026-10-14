// Evaluation content for the Usability Lab and the HCI annotation labels.

export const HEURISTICS = [
  { id: "H1", name: "Visibility of system status", applied: "The nav link for the section on screen is highlighted as you scroll (scroll-spy); project filter shows a live “2 of 4 projects” count; copying the email shows a toast; the task timer counts up." },
  { id: "H2", name: "Match between system and the real world", applied: "Plain labels (Experience, Education, Copy email), month–year dates and familiar CV section order." },
  { id: "H3", name: "User control and freedom", applied: "Esc closes search and help; filters have a Clear button; deleting sessions has Cancel; nav links update the URL so Back works." },
  { id: "H4", name: "Consistency and standards", applied: "One card style and one expand/collapse control everywhere; the navigation stays fixed at the top; sections always appear in the same order." },
  { id: "H5", name: "Error prevention", applied: "Clearing sessions needs an inline confirmation; the SUS form can only be submitted once all 10 items are answered." },
  { id: "H6", name: "Recognition rather than recall", applied: "Section links are always visible and numbered; filter tags are shown as chips; search suggests results as you type; shortcut sheet on ?." },
  { id: "H7", name: "Flexibility and efficiency of use", applied: "Keyboard shortcuts (/ to search, 1–7 for sections, 8 for the Lab) for experienced users; everything also works with mouse and touch." },
  { id: "H8", name: "Aesthetic and minimalist design", applied: "Key facts first in the hero; details collapsed by default; colour used to group, not to decorate." },
  { id: "H9", name: "Help users recognise, diagnose and recover from errors", applied: "Search with no matches suggests other terms; an empty project filter offers a Clear filter button; copy failure explains what to do." },
  { id: "H10", name: "Help and documentation", applied: "Keyboard shortcut sheet (? key or footer button); “Show HCI annotations” labels each design decision." },
];

export const SEVERITY = [
  { value: 0, label: "0 – Not a problem" },
  { value: 1, label: "1 – Cosmetic" },
  { value: 2, label: "2 – Minor" },
  { value: 3, label: "3 – Major" },
  { value: 4, label: "4 – Catastrophe" },
];

// Standard SUS wording (Brooke, 1996), with "system" read as "website".
export const SUS_ITEMS = [
  "I think that I would like to use this website frequently.",
  "I found the website unnecessarily complex.",
  "I thought the website was easy to use.",
  "I think that I would need the support of a technical person to be able to use this website.",
  "I found the various functions in this website were well integrated.",
  "I thought there was too much inconsistency in this website.",
  "I would imagine that most people would learn to use this website very quickly.",
  "I found the website very cumbersome to use.",
  "I felt very confident using the website.",
  "I needed to learn a lot of things before I could get going with this website.",
];

export const TASKS = [
  { id: "T1", text: "Find where Paarth did his internship and in which months.", answer: "Bounteous x Accolite, May 2026 – Jul 2026 (Experience)" },
  { id: "T2", text: "Find a project built with React Native.", answer: "Echoing Hearts (Projects → Mobile)" },
  { id: "T3", text: "Find Paarth’s Class 12 percentage.", answer: "82.50% (Education → HSC)" },
  { id: "T4", text: "Copy the email address.", answer: "“Copy email” button on Overview; toast confirms" },
  { id: "T5", text: "Make the text on the page larger.", answer: "“A+ Larger text” button in the header" },
];

// Short labels shown when "Show HCI annotations" is on.
export const NOTES = {
  search: "N6 Recognition · N7 Shortcuts (/)",
  tabs: "N1 Scroll-spy + progress rail show where you are · Hick’s law (7 links)",
  sidebar: "Consistent navigation · recognition over recall",
  band: "Gestalt similarity: section colour band · static with reduced motion",
  dock: "Fitts’s law: thumb-reach bottom bar",
  hero: "Visual hierarchy · recognition (key facts first)",
  textSize: "WCAG 1.4.4 Resize text",
  theme: "WCAG contrast · user control",
  annotations: "N10 Help & documentation",
  copy: "Fitts’s law · N1 Feedback (toast)",
  timeline: "Gestalt proximity · visual hierarchy",
  skills: "Gestalt similarity (chips) · proximity",
  disclosure: "Progressive disclosure · N8 Minimalism",
  filter: "N1 Status (count) · N6 Recognition",
  emptyState: "N9 Recovery · empty state guidance",
  social: "Fitts’s law (whole card is the target)",
  sectionColour: "Gestalt similarity (section colour)",
  confirm: "N5 Error prevention · N3 Cancel",
  sus: "N5 Prevent incomplete submit",
  timer: "N1 Visibility of status",
  help: "N10 Help · Shneiderman: shortcuts",
};
