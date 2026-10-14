const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-05" -> "May 2026", "2022" -> "2022"
export function formatMonth(value) {
  if (!value) return "Present";
  const [y, m] = String(value).split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

export function formatRange(start, end) {
  if (!start) return formatMonth(end);
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

export function formatSeconds(ms) {
  if (ms == null || Number.isNaN(ms)) return "–";
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)}s`;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
