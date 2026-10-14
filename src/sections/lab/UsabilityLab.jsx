import { useState } from "react";
import { Annotation } from "../../components/Annotation.jsx";
import { Tabs } from "../../components/Tabs.jsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { usePrefs } from "../../hooks/usePrefs.js";
import { SectionHead } from "../SectionHead.jsx";
import { HeuristicChecklist } from "./HeuristicChecklist.jsx";
import { ResultsSummary } from "./ResultsSummary.jsx";
import { SusForm } from "./SusForm.jsx";
import { TaskRunner } from "./TaskRunner.jsx";

const SUBTABS = [
  { id: "tasks", label: "1 · Tasks" },
  { id: "sus", label: "2 · SUS questionnaire" },
  { id: "heuristics", label: "3 · Heuristic checklist" },
  { id: "results", label: "4 · Results & export" },
];

const EMPTY = { participants: [], currentId: null, evaluators: [], currentEvaluator: null };

const nextId = (list, prefix) => `${prefix}${list.reduce((m, x) => Math.max(m, Number(x.id.slice(prefix.length)) || 0), 0) + 1}`;

export function UsabilityLab() {
  const [lab, setLab] = useLocalStorage("hci-lab-v1", EMPTY);
  const [sub, setSub] = useState("tasks");
  const current = lab.participants.find((p) => p.id === lab.currentId) ?? null;

  const { resetForParticipant } = usePrefs();

  const newParticipant = () => {
    resetForParticipant();
    setLab((l) => {
      const id = nextId(l.participants, "P");
      return { ...l, participants: [...l.participants, { id, createdAt: new Date().toISOString(), tasks: {}, sus: Array(10).fill(null), susDone: false }], currentId: id };
    });
  };

  const updateParticipant = (id, fn) =>
    setLab((l) => ({ ...l, participants: l.participants.map((p) => (p.id === id ? fn(p) : p)) }));

  const needsParticipant = sub === "tasks" || sub === "sus";

  return (
    <>
      <SectionHead id="lab" eyebrow="Evaluation" title="Usability Lab">
        For the facilitator: run tasks, collect SUS, rate heuristics, export results.
      </SectionHead>

      {needsParticipant && (
        <div className="lab-toolbar">
          <div className="field">
            <label htmlFor="participant">Participant</label>
            <select
              id="participant"
              className="select"
              value={lab.currentId ?? ""}
              onChange={(e) => setLab((l) => ({ ...l, currentId: e.target.value || null }))}
            >
              {lab.participants.length === 0 && <option value="">None yet</option>}
              {lab.participants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} · {Object.keys(p.tasks).length}/5 tasks{p.susDone ? " · SUS done" : ""}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" style={{ alignSelf: "end" }} onClick={newParticipant}>
            + New participant
          </button>
          <p className="note" style={{ margin: 0, alignSelf: "end" }}>
            IDs only, no names are stored. Adding a participant resets text size and annotations. Data stays in this browser until exported.
          </p>
        </div>
      )}

      <Tabs items={SUBTABS} active={sub} onChange={setSub} idPrefix="lab-" label="Usability Lab tools" className="tabs lab-tabs" />

      <div role="tabpanel" id={`lab-panel-${sub}`} aria-labelledby={`lab-tab-${sub}`} tabIndex={0}>
        {sub === "tasks" && <TaskRunner participant={current} onRecord={(taskId, rec) => updateParticipant(current.id, (p) => ({ ...p, tasks: { ...p.tasks, [taskId]: rec } }))} onReset={(taskId) => updateParticipant(current.id, (p) => { const t = { ...p.tasks }; delete t[taskId]; return { ...p, tasks: t }; })} onNext={() => setSub("sus")} />}
        {sub === "sus" && <SusForm participant={current} onChange={(fn) => updateParticipant(current.id, fn)} />}
        {sub === "heuristics" && <HeuristicChecklist lab={lab} setLab={setLab} nextId={nextId} />}
        {sub === "results" && <ResultsSummary lab={lab} onClear={() => setLab(EMPTY)} />}
      </div>
      <Annotation id="tabs" block />
    </>
  );
}
