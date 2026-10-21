// All profile content lives here. Edit this file to change what the site shows;
// no layout code needs to change. Every item has a stable `id` used by search.
// Privacy: never add phone number, date of birth, parents' names or seat numbers.

export const profile = {
  basics: {
    name: "Paarth Maharshi",
    initials: "PM",
    headline: "B.Tech Computer Engineering, 3rd year · VJTI Mumbai",
    tagline: "Computer Engineering · VJTI Mumbai",
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

  // { id, title, date: "YYYY-MM-DD", readingMins, tags: [], url, excerpt, body? }
  // body: [{ h }, { p }, { ul: [] }] is shown in place under "Read the full post";
  // url (optional) links the title to an external copy instead.
  posts: [
    {
      id: "post-meeting-decoder",
      title: "Building a multi-agent decoder for meeting transcripts",
      date: "2026-09-14",
      readingMins: 2,
      tags: ["Agentic AI", "Project", "RAG", "Python"],
      url: "",
      excerpt: "Meetings end and action items quietly disappear. I built a multi-agent pipeline that reads a transcript of any length, pulls out the actions, tasks and risks, drafts the follow-ups, and warns you when something similar has gone wrong before.",
      body: [{"p": "Every meeting ends with some version of “okay, so who is doing what?”, and a surprising amount of that gets lost by the next day. I wanted a tool that reads the transcript for you and turns talk into follow-up. That became the Agentic Meeting Transcript Decoder, which I built between May and July 2026 with Python, the Anthropic API, FastAPI, ChromaDB and PostgreSQL."}, {"h": "Why multiple agents"}, {"p": "A single prompt that says “summarise this meeting and list the action items” gives you something that looks right but is hard to trust. Instead, the decoder is a pipeline of agents, each with one job:"}, {"ul": ["An extraction agent reads the transcript and pulls out action items, tasks and risks.", "An ownership step works out who each action item belongs to.", "A drafting agent writes a draft email or ticket for each action item, addressed to its owner.", "A risk agent checks each action against past ones and attaches a confidence score."]}, {"p": "Because the steps are separate, I can check each output on its own, and a mistake in one place does not silently corrupt everything after it."}, {"h": "Transcripts of any length"}, {"p": "Real meetings run long, and a full transcript can be too big to send in one go. The pipeline splits long transcripts into pieces, extracts from each, and then merges the results, so the same action mentioned twice does not turn into two tickets. Getting that merge step right took more iterations than any of the prompts."}, {"h": "Remembering what went wrong before"}, {"p": "The part I am proudest of is the memory. Past action items are stored in a ChromaDB vector store. When a new action comes in, the risk agent retrieves similar past actions and checks whether they ran into problems: missed deadlines, blocked work, repeated follow-ups. It then shows a confidence score that flags continuity risk. If the last three “migrate the reporting service” tasks stalled, the next one should arrive with a warning, not a cheerful draft email."}, {"h": "The backend"}, {"p": "FastAPI serves the pipeline, and PostgreSQL keeps the persistent record of meetings, action items and their outcomes, which is also what feeds the memory over time. Keeping that state outside the agents means a run can be inspected afterwards, and the system gets more useful the more meetings it sees."}, {"h": "What was hard"}, {"ul": ["Ownership is often vague in real speech (“can someone look at this?”), so the pipeline has to say when it is unsure instead of guessing.", "A confidence score is only useful if people understand what it means, so it comes with the past examples that produced it.", "Drafts must stay drafts: the tool prepares emails and tickets, but a person sends them."]}, {"h": "What is next"}, {"p": "Next I want to measure the decoder properly against a set of hand-labelled transcripts, and make the drafts easier to review and edit before they go out. The code is on my GitHub, and I am always happy to talk about multi-agent design."}],
    },
    {
      id: "post-internship",
      title: "Ten weeks of agents: what my Agentic AI internship taught me",
      date: "2026-08-10",
      readingMins: 3,
      tags: ["Internship", "Agentic AI", "RAG", "Backend"],
      url: "",
      excerpt: "From May to July 2026 I was a Software Engineering Intern on the Agentic AI team at Bounteous x Accolite in Bangalore. Here is what building multi-agent systems for real use cases taught me, beyond what any tutorial did.",
      body: [{"p": "From May to July 2026 I worked as a Software Engineering Intern on the Agentic AI side of Bounteous x Accolite, in a hybrid setup out of Bangalore. I went in knowing how to call a language model from Python. I came out understanding how much engineering sits around that call before anything is ready for real users."}, {"h": "One big prompt is not a system"}, {"p": "My first instinct on any task was to write one long prompt that asked the model to do everything at once. It works in a demo and falls apart on real input. Most of my internship went into the opposite approach: splitting a complex task across smaller, specialised agents, each with one clear job, a narrow input and an output I could check."}, {"p": "That split made three things easier. Each agent could be tested on its own. When something went wrong I could see which step failed instead of staring at one giant answer. And I could swap or improve one agent without touching the rest."}, {"h": "Evaluate before you scale"}, {"p": "A big part of the work was not just building multi-agent architectures but evaluating them for production use cases. That changed how I think about “done”. An agent that gives a great answer once is a demo; an agent that gives an acceptable answer on the hundredth messy input is a feature. I got into the habit of keeping small sets of realistic test inputs and rerunning them every time I changed a prompt or a step, so I could tell whether a change actually helped."}, {"h": "Grounding decisions with RAG"}, {"p": "Agents make better decisions when they can look things up. I worked on RAG pipelines backed by ChromaDB that gave agents historical context to ground their decisions, instead of relying only on what the model already knew. The lesson I keep coming back to: retrieval quality matters as much as the model. If the wrong documents come back, even a strong model will confidently reason from them. Time spent on how text is split, stored and queried paid off more than time spent tweaking prompts."}, {"h": "The unglamorous backend is the product"}, {"p": "Agents need somewhere to live. I built backend services with FastAPI, PostgreSQL and SQLAlchemy for agent orchestration and persistent state: keeping track of what each agent had done, what it produced and what should happen next. This was the least flashy part of the work and probably the most important. Without persistent state, a multi-step workflow forgets where it was the moment anything restarts."}, {"h": "What I would tell the next intern"}, {"ul": ["Write down what “good output” looks like before you write the prompt.", "Keep each agent small enough that you can explain its job in one sentence.", "Log every step. Debugging agents without logs is guesswork.", "Treat retrieval as a first-class component, not an add-on.", "Learn the boring parts (APIs, databases, state) properly. They decide whether the clever parts survive contact with real users."]}, {"p": "I am now back at VJTI for my third year, and these ideas have already changed how I build my own projects, starting with the meeting transcript decoder I write about in my next post."}],
    },
  ],

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

  // Quick facts counted up in the hero. `label` is the exact text shown when counting ends.
  stats: [
    { value: 1, label: "1", caption: "Internship (Agentic AI)" },
    { value: 4, label: "4", caption: "Projects built" },
    { value: 3, label: "3", caption: "Hackathon finals" },
    { value: 100, label: "100+", caption: "LeetCode problems" },
  ],

  lastUpdated: "2026-10",
};

// Sections of the one-page profile, in page order. `key` is the keyboard shortcut.
export const SECTIONS = [
  { id: "overview", label: "Overview", key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "projects", label: "Projects", key: "3" },
  { id: "education", label: "Education", key: "4" },
  { id: "activities", label: "Activities", key: "5" },
  { id: "writing", label: "Writing", key: "6" },
  { id: "social", label: "Social", key: "7" },
];

// Facilitator-only view at #lab; reached with the 8 key or the footer link, not the section nav.
export const LAB = { id: "lab", label: "Usability Lab", key: "8" };
