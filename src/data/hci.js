// Evaluation content for the Usability Lab and the HCI annotation labels.

export const HEURISTICS = [
  { id: "H1", name: "Visibility of system status", applied: "The section on screen is highlighted in the floating nav (scroll-spy) and a progress line fills as you read; the project filter shows a live “2 of 4 projects” count; Copy email changes to “Copied” and a toast confirms it; search results appear as you type." },
  { id: "H2", name: "Match between system and the real world", applied: "Plain CV vocabulary (Experience, Education, Projects, Copy email), month–year dates, familiar section order and recognisable icons (GitHub, LinkedIn, mail)." },
  { id: "H3", name: "User control and freedom", applied: "Esc closes search, the shortcut panel and the phone menu; filters have All and Clear; every “Show more” can be closed again; nav links update the URL so Back works; Copy email still leaves the address selectable." },
  { id: "H4", name: "Consistency and standards", applied: "One card, chip and disclosure style everywhere; the nav stays in the same floating position on every screen; each section keeps its own colour in its heading band; standard link and button behaviour." },
  { id: "H5", name: "Error prevention", applied: "Copy email avoids retyping the address; settings are reversible toggles; in the Lab, clearing data needs an on-page confirmation and SUS can only be submitted with all 10 answers." },
  { id: "H6", name: "Recognition rather than recall", applied: "All section links are always visible; filter tags are shown as chips; search suggests matches as you type; the shortcut panel (?) lists every key." },
  { id: "H7", name: "Flexibility and efficiency of use", applied: "Shortcuts for experienced users (/ search, 1–7 sections, ? help) alongside mouse and touch; a thumb-reach dock on phones; search jumps straight to an item and highlights it." },
  { id: "H8", name: "Aesthetic and minimalist design", applied: "Key facts first: name, headline and a “now” card in the hero; details collapsed by default. The animated background is decorative only: it sits behind the content, is hidden from screen readers and stops when the OS asks for reduced motion." },
  { id: "H9", name: "Help users recognise, diagnose and recover from errors", applied: "Search with no matches says so and suggests other terms; an empty project filter offers Clear filter; if copying fails the address stays visible to copy by hand." },
  { id: "H10", name: "Help and documentation", applied: "Keyboard shortcut panel (? or footer button); “Show HCI notes” labels each part of the interface with the principle it applies." },
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
  { id: "T2", text: "Find a project built with React Native.", answer: "Echoing Hearts (Projects, Mobile tag)" },
  { id: "T3", text: "Find Paarth’s Class 12 percentage.", answer: "82.50% (Education, HSC)" },
  { id: "T4", text: "Copy the email address.", answer: "“Copy email” button in the hero; a toast confirms" },
  { id: "T5", text: "Make the text on the page larger.", answer: "“A+” button in the top bar" },
  { id: "T6", text: "Open Paarth’s LinkedIn profile.", answer: "Social section → LinkedIn (opens in a new tab)" },
];

// Single Ease Question, asked straight after each task (Sauro & Dumas, 2009).
export const SEQ = { question: "Overall, how difficult or easy was the task to complete?", low: "Very difficult", high: "Very easy" };

// Short labels shown when "Show HCI annotations" is on.
export const NOTES = {
  nav: "N1 Scroll-spy + progress line · consistent fixed position · Hick’s law (7 links)",
  search: "N6 Recognition · N7 Shortcut (/)",
  textSize: "WCAG 1.4.4 Resize text",
  theme: "WCAG contrast · user control",
  annotations: "N10 Help & documentation",
  dock: "Fitts’s law: thumb-reach bottom bar",
  hero: "Visual hierarchy · recognition (key facts first)",
  heroScene: "N8 Decoration stays behind content · hidden from screen readers · stops under reduced motion",
  now: "Gestalt proximity: status, role and focus grouped in one card",
  copy: "Fitts’s law · N1 Feedback (toast) · N5 no retyping",
  inkBand: "Gestalt common region: About content grouped on one inverted band",
  timeline: "Gestalt proximity · visual hierarchy",
  skills: "Gestalt similarity (chips) · proximity",
  band: "Gestalt similarity: section colour band · static with reduced motion",
  disclosure: "Progressive disclosure · N8 Minimalism",
  filter: "N1 Status (count) · N6 Recognition",
  emptyState: "N9 Recovery · empty state guidance",
  social: "Fitts’s law (whole row is the target)",
  sectionColour: "Gestalt similarity (section colour)",
  confirm: "N5 Error prevention · N3 Cancel",
  sus: "N5 Prevent incomplete submit",
  timer: "N1 Visibility of status",
  help: "N10 Help · Shneiderman: shortcuts for experts",
};
