// System Usability Scale scoring (Brooke, 1996).
// answers: array of 10 values 1–5. Odd items (1,3,5…) score − 1; even items 5 − score.
export function susScore(answers) {
  if (!answers || answers.length !== 10 || answers.some((a) => !a)) return null;
  const sum = answers.reduce((acc, a, i) => acc + (i % 2 === 0 ? a - 1 : 5 - a), 0);
  return sum * 2.5;
}

// Letter grade on the Sauro–Lewis curved scale (68 = average, C).
export function susGrade(score) {
  if (score == null) return null;
  if (score >= 80.3) return { grade: "A", label: "Excellent" };
  if (score >= 74) return { grade: "B", label: "Good" };
  if (score >= 68) return { grade: "C", label: "Average" };
  if (score >= 51) return { grade: "D", label: "Below average" };
  return { grade: "F", label: "Poor" };
}

export const SUS_BENCHMARK = 68;

export function mean(xs) {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

export function sd(xs) {
  if (xs.length < 2) return null;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
}
