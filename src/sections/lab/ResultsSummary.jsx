import { HEURISTICS, SUS_ITEMS, TASKS } from "../../data/hci.js";
import { ConfirmInline } from "../../components/ConfirmInline.jsx";
import { downloadCSV } from "../../lib/csv.js";
import { formatSeconds } from "../../lib/format.js";
import { mean, sd, susScore } from "../../lib/sus.js";
import { SusGauge } from "./SusForm.jsx";

const pct = (x) => (x == null ? "–" : `${Math.round(x * 100)}%`);

export function ResultsSummary({ lab, onClear }) {
  const participants = lab.participants.filter((p) => Object.keys(p.tasks).length || p.susDone);
  const scores = participants.filter((p) => p.susDone).map((p) => susScore(p.sus)).filter((s) => s != null);
  const susMean = mean(scores);
  const susSd = sd(scores);

  const taskStats = TASKS.map((t) => {
    const recs = participants.map((p) => p.tasks[t.id]).filter(Boolean);
    const ok = recs.filter((r) => r.success);
    return {
      ...t,
      attempts: recs.length,
      rate: recs.length ? ok.length / recs.length : null,
      meanOk: mean(ok.map((r) => r.ms)),
      meanAll: mean(recs.map((r) => r.ms)),
      meanErrors: mean(recs.map((r) => r.errors ?? 0)),
      meanSeq: mean(recs.map((r) => r.seq).filter((x) => x != null)),
    };
  });
  const allRecs = participants.flatMap((p) => Object.values(p.tasks));
  const overall = allRecs.length ? allRecs.filter((r) => r.success).length / allRecs.length : null;

  const heuristicStats = HEURISTICS.map((h) => {
    const sev = lab.evaluators.map((e) => e.ratings[h.id]?.severity).filter((s) => s !== "" && s != null);
    return { ...h, n: sev.length, mean: mean(sev), max: sev.length ? Math.max(...sev) : null };
  });

  const exportTasks = () => {
    const header = ["participant", "task", "task_text", "success", "time_seconds", "wrong_turns", "seq_1_to_7", "recorded_at", "sus_score", ...SUS_ITEMS.map((_, i) => `sus_q${i + 1}`)];
    const rows = [header];
    for (const p of lab.participants) {
      const s = p.susDone ? susScore(p.sus) : "";
      const susCols = p.sus.map((a) => a ?? "");
      const tasks = TASKS.filter((t) => p.tasks[t.id]);
      if (!tasks.length) rows.push([p.id, "", "", "", "", "", "", "", s, ...susCols]);
      for (const t of tasks) {
        const r = p.tasks[t.id];
        rows.push([p.id, t.id, t.text, r.success ? 1 : 0, (r.ms / 1000).toFixed(2), r.errors ?? 0, r.seq ?? "", r.at ?? "", s, ...susCols]);
      }
    }
    downloadCSV(`usability-sessions-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  };

  const exportHeuristics = () => {
    const rows = [["evaluator", "heuristic", "name", "severity", "notes"]];
    for (const e of lab.evaluators)
      for (const h of HEURISTICS) {
        const r = e.ratings[h.id] ?? {};
        rows.push([e.id, h.id, h.name, r.severity ?? "", r.notes ?? ""]);
      }
    downloadCSV(`heuristic-evaluation-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  };

  const sessionCount = lab.participants.length + lab.evaluators.length;

  return (
    <div className="stack">
      <div className="stat-tiles">
        <div className="stat">
          <div className="stat-label">Participants</div>
          <div className="stat-value">{participants.length}</div>
          <div className="stat-sub">{participants.length >= 5 ? "Meets the 5-user target" : `${5 - participants.length} more for the 5-user target`}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Mean SUS</div>
          <div className="stat-value">{susMean == null ? "–" : susMean.toFixed(1)}</div>
          <div className="stat-sub">{scores.length ? `n = ${scores.length}${susSd != null ? ` · SD ${susSd.toFixed(1)}` : ""}` : "No SUS yet"}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Task completion</div>
          <div className="stat-value">{pct(overall)}</div>
          <div className="stat-sub">{allRecs.length} attempts</div>
        </div>
        <div className="stat">
          <div className="stat-label">Mean time per task</div>
          <div className="stat-value">{formatSeconds(mean(allRecs.filter((r) => r.success).map((r) => r.ms)))}</div>
          <div className="stat-sub">successful attempts</div>
        </div>
      </div>

      {susMean != null && <SusGauge score={susMean} label="mean SUS" />}

      <div className="table-wrap">
        <table className="data-table">
          <caption>Tasks</caption>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col" className="num">Attempts</th>
              <th scope="col" className="num">Completion</th>
              <th scope="col" className="num">Mean time (done)</th>
              <th scope="col" className="num">Mean time (all)</th>
              <th scope="col" className="num">Mean wrong turns</th>
              <th scope="col" className="num">Mean ease (1–7)</th>
            </tr>
          </thead>
          <tbody>
            {taskStats.map((t) => (
              <tr key={t.id}>
                <th scope="row" style={{ fontWeight: 500 }}>
                  <strong>{t.id}</strong> {t.text}
                </th>
                <td className="num">{t.attempts}</td>
                <td className="num">{pct(t.rate)}</td>
                <td className="num">{formatSeconds(t.meanOk)}</td>
                <td className="num">{formatSeconds(t.meanAll)}</td>
                <td className="num">{t.meanErrors == null ? "–" : t.meanErrors.toFixed(1)}</td>
                <td className="num">{t.meanSeq == null ? "–" : t.meanSeq.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <caption>Heuristic evaluation ({lab.evaluators.length} evaluator{lab.evaluators.length === 1 ? "" : "s"})</caption>
          <thead>
            <tr>
              <th scope="col">Heuristic</th>
              <th scope="col" className="num">Ratings</th>
              <th scope="col" className="num">Mean severity</th>
              <th scope="col" className="num">Worst</th>
            </tr>
          </thead>
          <tbody>
            {heuristicStats.map((h) => (
              <tr key={h.id}>
                <th scope="row" style={{ fontWeight: 500 }}>
                  <strong>{h.id}</strong> {h.name}
                </th>
                <td className="num">{h.n}</td>
                <td className="num">{h.mean == null ? "–" : h.mean.toFixed(1)}</td>
                <td className="num">{h.max ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lab-toolbar">
        <button type="button" className="btn btn-primary" onClick={exportTasks} disabled={!lab.participants.length}>
          Export sessions CSV
        </button>
        <button type="button" className="btn" onClick={exportHeuristics} disabled={!lab.evaluators.length}>
          Export heuristics CSV
        </button>
        <ConfirmInline
          triggerLabel="Clear all sessions…"
          message={`Delete ${lab.participants.length} participant session${lab.participants.length === 1 ? "" : "s"} and ${lab.evaluators.length} evaluator rating set${lab.evaluators.length === 1 ? "" : "s"}? This can’t be undone. Export first if you need them.`}
          confirmLabel="Delete everything"
          onConfirm={onClear}
          disabled={!sessionCount}
        />
      </div>
    </div>
  );
}
