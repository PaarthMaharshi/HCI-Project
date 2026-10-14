import { useEffect, useState } from "react";
import { TASKS } from "../../data/hci.js";
import { Annotation } from "../../components/Annotation.jsx";
import { Card } from "../../components/Card.jsx";
import { formatSeconds } from "../../lib/format.js";

export function TaskRunner({ participant, onRecord, onReset, onNext }) {
  const [running, setRunning] = useState(null); // { taskId, startedAt }
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(t);
  }, [running]);

  // Switching participant abandons an unfinished timer.
  useEffect(() => setRunning(null), [participant?.id]);

  if (!participant)
    return <p className="note">Add a participant with <strong>+ New participant</strong> to start timing tasks.</p>;

  const finish = (success) => {
    onRecord(running.taskId, { ms: Date.now() - running.startedAt, success, at: new Date().toISOString() });
    setRunning(null);
  };

  const doneCount = Object.keys(participant.tasks).length;

  return (
    <div className="stack">
      <p className="note" style={{ margin: 0 }}>
        Read each task aloud, press <strong>Start</strong> when the participant begins, then <strong>Done</strong> or <strong>Gave up</strong>.
        Open the profile for the participant in a{" "}
        <a href="#overview" target="_blank" rel="noreferrer">new tab<span className="visually-hidden"> (opens in a new tab)</span></a>; the timer keeps running here.
      </p>
      {TASKS.map((task) => {
        const rec = participant.tasks[task.id];
        const isRunning = running?.taskId === task.id;
        return (
          <Card key={task.id} as="div">
            <div className="task-row">
              <span className="task-id" aria-hidden="true">{task.id}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  <span className="visually-hidden">{task.id}: </span>
                  {task.text}
                </p>
                <p className="answer-hint" style={{ margin: 0 }}>Expected: {task.answer}</p>
              </div>
              <div className="task-actions">
                {isRunning ? (
                  <>
                    <span className="timer" role="timer" aria-label="Elapsed time">{formatSeconds(now - running.startedAt)}</span>
                    <button type="button" className="btn btn-primary" onClick={() => finish(true)}>Done</button>
                    <button type="button" className="btn btn-danger" onClick={() => finish(false)}>Gave up</button>
                  </>
                ) : rec ? (
                  <>
                    <span className={`result-badge ${rec.success ? "result-ok" : "result-bad"}`}>
                      {rec.success ? "✓ Done" : "✕ Gave up"} · {formatSeconds(rec.ms)}
                    </span>
                    <button type="button" className="btn btn-sm" onClick={() => onReset(task.id)} disabled={!!running}>Redo</button>
                  </>
                ) : (
                  <button type="button" className="btn" onClick={() => { setRunning({ taskId: task.id, startedAt: Date.now() }); setNow(Date.now()); }} disabled={!!running}>
                    Start
                  </button>
                )}
              </div>
            </div>
            {isRunning && <Annotation id="timer" block />}
          </Card>
        );
      })}
      <div className="visually-hidden" aria-live="polite">{doneCount} of {TASKS.length} tasks recorded</div>
      {doneCount === TASKS.length && (
        <div className="card" style={{ borderTopColor: "var(--ok)" }}>
          <p style={{ fontWeight: 700 }}>All 5 tasks recorded for {participant.id}.</p>
          <button type="button" className="btn btn-primary" onClick={onNext}>Continue to SUS questionnaire</button>
        </div>
      )}
    </div>
  );
}
