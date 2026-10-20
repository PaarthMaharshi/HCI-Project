import { useEffect, useState } from "react";
import { SEQ, TASKS } from "../../data/hci.js";
import { Annotation } from "../../components/Annotation.jsx";
import { Card } from "../../components/Card.jsx";
import { formatSeconds } from "../../lib/format.js";

// 1–7 Single Ease Question for one finished task.
function SeqRating({ taskId, value, onChange }) {
  const name = `seq-${taskId}`;
  return (
    <fieldset className="seq">
      <legend>{SEQ.question}</legend>
      <div className="likert likert-7">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <label key={n}>
            <input type="radio" name={name} value={n} checked={value === n} onChange={() => onChange(n)} />
            {n}
          </label>
        ))}
      </div>
      <div className="likert-ends" aria-hidden="true"><span>1 = {SEQ.low}</span><span>7 = {SEQ.high}</span></div>
    </fieldset>
  );
}

export function TaskRunner({ participant, onRecord, onReset, onNext }) {
  const [running, setRunning] = useState(null); // { taskId, startedAt, errors }
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(t);
  }, [running?.taskId]);

  // Switching participant abandons an unfinished timer.
  useEffect(() => setRunning(null), [participant?.id]);

  if (!participant)
    return <p className="note">Add a participant with <strong>+ New participant</strong> to start timing tasks.</p>;

  const finish = (success) => {
    onRecord(running.taskId, { ms: Date.now() - running.startedAt, success, errors: running.errors, seq: null, at: new Date().toISOString() });
    setRunning(null);
  };
  const bumpErrors = (d) => setRunning((r) => ({ ...r, errors: Math.max(0, r.errors + d) }));

  const doneCount = Object.keys(participant.tasks).length;
  const seqMissing = TASKS.some((t) => participant.tasks[t.id] && participant.tasks[t.id].seq == null);

  return (
    <div className="stack">
      <p className="note" style={{ margin: 0 }}>
        Read each task aloud and press <strong>Start</strong>. Tap <strong>+1 wrong turn</strong> each time the participant goes somewhere that
        doesn’t lead to the answer. Press <strong>Done</strong> or <strong>Gave up</strong> (or Gave up after 3 minutes), then ask the
        ease question. Open the profile for the participant in a{" "}
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
                    <span className="error-count" aria-live="polite">{running.errors} wrong turn{running.errors === 1 ? "" : "s"}</span>
                    <button type="button" className="btn btn-sm" onClick={() => bumpErrors(1)}>+1 wrong turn</button>
                    <button type="button" className="btn btn-sm" onClick={() => bumpErrors(-1)} disabled={!running.errors} aria-label="Undo one wrong turn">−1</button>
                    <button type="button" className="btn btn-primary" onClick={() => finish(true)}>Done</button>
                    <button type="button" className="btn btn-danger" onClick={() => finish(false)}>Gave up</button>
                  </>
                ) : rec ? (
                  <>
                    <span className={`result-badge ${rec.success ? "result-ok" : "result-bad"}`}>
                      {rec.success ? "✓ Done" : "✕ Gave up"} · {formatSeconds(rec.ms)} · {rec.errors ?? 0} wrong turn{rec.errors === 1 ? "" : "s"}
                    </span>
                    <button type="button" className="btn btn-sm" onClick={() => onReset(task.id)} disabled={!!running}>Redo</button>
                  </>
                ) : (
                  <button type="button" className="btn" onClick={() => { setRunning({ taskId: task.id, startedAt: Date.now(), errors: 0 }); setNow(Date.now()); }} disabled={!!running}>
                    Start
                  </button>
                )}
              </div>
            </div>
            {rec && !isRunning && (
              <SeqRating taskId={task.id} value={rec.seq} onChange={(seq) => onRecord(task.id, { ...rec, seq })} />
            )}
            {isRunning && <Annotation id="timer" block />}
          </Card>
        );
      })}
      <div className="visually-hidden" aria-live="polite">{doneCount} of {TASKS.length} tasks recorded</div>
      {doneCount === TASKS.length && (
        <div className="card" style={{ borderTopColor: "var(--ok)" }}>
          <p style={{ fontWeight: 700 }}>
            All {TASKS.length} tasks recorded for {participant.id}.{seqMissing && " Some ease ratings are still empty."}
          </p>
          <button type="button" className="btn btn-primary" onClick={onNext}>Continue to SUS questionnaire</button>
        </div>
      )}
    </div>
  );
}
