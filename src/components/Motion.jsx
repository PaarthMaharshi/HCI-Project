// Accessible wrappers around the react-bits animation components.
// Each one renders its plain final state when the OS asks for reduced motion,
// and exposes the real text to screen readers instead of animated fragments.
import { useState } from "react";
import { usePrefs } from "../hooks/usePrefs.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import AnimatedContent from "./reactbits/AnimatedContent/AnimatedContent.jsx";
import BlurText from "./reactbits/BlurText/BlurText.jsx";
import CountUp from "./reactbits/CountUp/CountUp.jsx";
import GradientText from "./reactbits/GradientText/GradientText.jsx";
import ShinyText from "./reactbits/ShinyText/ShinyText.jsx";

// Fades/slides content in once when it scrolls into view.
export function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <AnimatedContent distance={40} duration={0.7} delay={delay} threshold={0.12} className={className}>
      {children}
    </AnimatedContent>
  );
}

// Word-by-word blur-in heading. The h1 carries the text; the animated words are hidden from AT.
export function BlurHeading({ text, as: Tag = "h1", id, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <Tag id={id} className={className} aria-label={text}>
      {reduce ? (
        text
      ) : (
        <span aria-hidden="true">
          <BlurText text={text} delay={120} animateBy="words" direction="top" className="blur-text" />
        </span>
      )}
    </Tag>
  );
}

// Counts up to a number, then shows the exact label (e.g. "82.50%" or "100+").
export function Count({ value, label, suffix = "", className = "" }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  if (reduce || done) return <span className={className}>{label}</span>;
  return (
    <span className={className}>
      <span className="visually-hidden">{label}</span>
      <span aria-hidden="true">
        <CountUp to={value} duration={1.6} onEnd={() => setDone(true)} />
        {suffix}
      </span>
    </span>
  );
}

// ShinyText and GradientText parse colours in JS, so they get hex values per theme.
const INK = {
  light: { text: "#3b1530", shine: "#be185d", gradient: ["#be185d", "#a21caf", "#9d174d"] },
  dark: { text: "#fdf0f7", shine: "#f9a8d4", gradient: ["#f9a8d4", "#f0abfc", "#fda4af"] },
};

// Text with a slow shine sweep. Both colours pass contrast on their own, so it stays readable mid-sweep.
// `tone` forces a palette (e.g. "dark" inside the inverted ink band).
export function Shiny({ children, tone }) {
  const reduce = useReducedMotion();
  const prefs = usePrefs();
  const theme = tone ?? prefs.theme;
  if (reduce) return <span>{children}</span>;
  return (
    <ShinyText key={theme} color={INK[theme].text} shineColor={INK[theme].shine} speed={3} delay={1.5} shineWidth={30}>
      {children}
    </ShinyText>
  );
}

// Gradient-filled text using AA-safe accent colours (pauses itself under reduced motion).
export function Gradient({ children }) {
  const { theme } = usePrefs();
  return (
    <GradientText colors={INK[theme].gradient} animationSpeed={8} yoyo>
      {children}
    </GradientText>
  );
}
