// All profile content lives here. Edit this file to change what the site shows;
// no layout code needs to change. Every item has a stable `id` used by search.
// Privacy: never add phone number, date of birth, parents' names or seat numbers.

export const profile = {
  basics: {
    name: "Paarth Maharshi",
    initials: "PM",
    headline: "B.Tech Computer Engineering, 3rd year · VJTI Mumbai",
    location: "Mumbai, Maharashtra",
    email: "paarthmahatree14@gmail.com",
    availability: "Looking for internships",
    bio: "Aspiring developer with an interest in app development and agentic AI. I build mobile and web apps, and multi-agent systems that turn messy input into useful action.",
  },

  skills: [
    { id: "skills-languages", group: "Languages", items: ["Python", "C++", "JavaScript", "TypeScript", "SQL/MySQL", "HTML/CSS"] },
    { id: "skills-frameworks", group: "Frameworks", items: ["React.js", "React Native (Expo)", "Next.js", "FastAPI", "Flask"] },
    { id: "skills-ai", group: "AI & data", items: ["Anthropic API", "ChromaDB (RAG)", "PyTorch", "HuggingFace", "Pandas", "NumPy", "SQLAlchemy"] },
    { id: "skills-tools", group: "Tools", items: ["Git", "VS Code", "Figma (UI/UX)", "Firebase", "PostgreSQL"] },
    { id: "skills-concepts", group: "Concepts", items: ["Data structures & algorithms", "Multi-agent orchestration"] },
  ],

  experience: [
    {
      id: "exp-bounteous",
      role: "Software Engineering Intern, Agentic AI",
      org: "Bounteous x Accolite",
      place: "Bangalore",
      mode: "Hybrid",
      start: "2026-05",
      end: "2026-07",
      bullets: [
        "Built and evaluated multi-agent architectures for production use cases.",
        "Designed multi-agent workflows that split complex tasks across specialised agents, with RAG pipelines (ChromaDB) grounding decisions in historical context.",
        "Developed backend services with FastAPI, PostgreSQL and SQLAlchemy for agent orchestration and persistent state.",
      ],
      tags: ["Agentic AI", "Backend", "RAG"],
    },
  ],

  education: [
    {
      id: "edu-vjti",
      degree: "B.Tech, Computer Engineering",
      institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
      start: "2024-08",
      end: null,
      status: "3rd year",
    },
    {
      id: "edu-hsc",
      degree: "HSC (Class 12), Science",
      institution: "Prakash College of Commerce and Science",
      board: "Maharashtra State Board",
      end: "2024-02",
      score: { label: "82.50%", detail: "495 / 600" },
      subjects: [
        { name: "Information Technology", mark: 91 },
        { name: "Psychology", mark: 88 },
        { name: "Mathematics & Statistics", mark: 86 },
        { name: "English", mark: 78 },
        { name: "Physics", mark: 76 },
        { name: "Chemistry", mark: 76 },
      ],
    },
    {
      id: "edu-ssc",
      degree: "SSC (Class 10)",
      institution: "Billabong High International School, Mumbai",
      board: "CBSE",
      end: "2022",
      score: { label: "93%", detail: "465 / 500" },
      subjects: [
        { name: "English", mark: 96 },
        { name: "Mathematics", mark: 95 },
        { name: "Science", mark: 95 },
        { name: "Social Science", mark: 90 },
        { name: "French", mark: 89 },
      ],
    },
  ],

  projects: [
    {
      id: "proj-meeting-decoder",
      title: "Agentic Meeting Transcript Decoder",
      start: "2026-05",
      end: "2026-07",
      summary: "Multi-agent pipeline that reads meeting transcripts of any length and pulls out action items, tasks and risks.",
      bullets: [
        "Auto-generates draft emails and tickets assigned to the right owner for each action item.",
        "A ChromaDB-backed RAG store checks whether similar past actions ran into problems, and shows a confidence score that flags continuity risk.",
      ],
      stack: ["Python", "Anthropic API", "FastAPI", "ChromaDB", "PostgreSQL"],
      tags: ["Agentic AI", "Backend"],
      link: "https://github.com/PaarthMaharshi",
    },
    {
      id: "proj-text-detector",
      title: "AI Text Detector & Analysis System",
      start: "2025-11",
      end: "2026-01",
      summary: "Hybrid AI-vs-human text detector combining a DeBERTa transformer classifier with stylometric analysis.",
      bullets: [
        "FastAPI/PyTorch backend serving grammar checking, plagiarism detection and text-analysis models.",
        "Next.js/React frontend plus a browser extension for real-time analysis in context. Built in a 4-person team.",
      ],
      stack: ["Python", "FastAPI", "PyTorch", "HuggingFace", "Next.js", "React"],
      tags: ["AI/ML", "Web", "Team"],
      link: "https://github.com/PaarthMaharshi",
    },
    {
      id: "proj-diseasedecoder",
      title: "DiseaseDecoder: Agastya Program",
      start: "2025-11",
      end: "2026-03",
      summary: "Health-awareness web platform built with JP Morgan mentors under the Agastya initiative.",
      bullets: [
        "Searchable SQL database of 300 diseases mapped to symptoms, with symptom-based search.",
        "Maps API integration shows nearby pharmacies; ratings and specialty filters are planned next.",
      ],
      stack: ["React.js", "TypeScript", "CSS", "SQL", "Maps API"],
      tags: ["Web", "Team"],
      link: "https://github.com/PaarthMaharshi",
    },
    {
      id: "proj-echoing-hearts",
      title: "Echoing Hearts",
      start: "2025-08",
      end: "2025-10",
      summary: "Mobile app for dropping location-based messages that nearby users can see, like, comment on and reply to privately.",
      bullets: [
        "Progressive disclosure of user details: interests are revealed gradually as a conversation develops.",
        "Designed the UI in Figma and built the frontend in React Native. Reached the final round of ThriZill Hackathon.",
      ],
      stack: ["React Native (Expo)", "Firebase (Authentication, Firestore, Storage)", "Figma"],
      tags: ["Mobile", "UI/UX", "Hackathon"],
      link: "https://github.com/PaarthMaharshi",
    },
  ],

  // { id, title, date: "2026-11-02", readingMins, tags: [], url, excerpt }
  posts: [],

  social: [
    { id: "social-github", label: "GitHub", handle: "PaarthMaharshi", url: "https://github.com/PaarthMaharshi", blurb: "Code for my projects and experiments." },
    { id: "social-linkedin", label: "LinkedIn", handle: "paarth-maharshi", url: "https://www.linkedin.com/in/paarth-maharshi-b37039378/", blurb: "Experience, education and updates." },
  ],

  activities: [
    {
      id: "act-hackathons",
      title: "Hackathon finalist",
      detail: "ThriZill Hackathon, MumbaiHacks and Smart India Hackathon (SIH); selected for the final round of all three for innovative project solutions.",
      tags: ["Hackathon"],
    },
    {
      id: "act-agastya",
      title: "Agastya Program contributor",
      detail: "Mentored by JP Morgan; built web and IoT solutions with student teams, including DiseaseDecoder.",
      tags: ["Program", "Team"],
    },
    {
      id: "act-leetcode",
      title: "LeetCode / DSA practice",
      detail: "100+ problems covering arrays, strings, stacks, queues, linked lists, trees and graphs; dynamic programming, greedy, backtracking, divide and conquer.",
      tags: ["DSA"],
    },
  ],

  timeline: [
    { date: "2026-07", text: "Finished Software Engineering internship (Agentic AI) at Bounteous x Accolite", ref: { section: "experience", id: "exp-bounteous" } },
    { date: "2026-03", text: "Shipped DiseaseDecoder with JP Morgan mentors under the Agastya Program", ref: { section: "projects", id: "proj-diseasedecoder" } },
    { date: "2026-01", text: "Completed AI Text Detector & Analysis System with a 4-person team", ref: { section: "projects", id: "proj-text-detector" } },
    { date: "2025-10", text: "Echoing Hearts reached the final round of ThriZill Hackathon", ref: { section: "projects", id: "proj-echoing-hearts" } },
    { date: "2024-08", text: "Started B.Tech at VJTI, Mumbai", ref: { section: "education", id: "edu-vjti" } },
  ],

  lastUpdated: "2026-10",
};

export const SECTIONS = [
  { id: "overview", label: "Overview", key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "education", label: "Education", key: "3" },
  { id: "projects", label: "Projects", key: "4" },
  { id: "writing", label: "Writing", key: "5" },
  { id: "social", label: "Social", key: "6" },
  { id: "activities", label: "Activities", key: "7" },
  { id: "lab", label: "Usability Lab", key: "8" },
];
