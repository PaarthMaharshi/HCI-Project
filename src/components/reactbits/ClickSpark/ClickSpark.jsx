'use client';

import { useEffect, useRef } from 'react';

import './ClickSpark.css';

const EASINGS = {
  linear: t => t,
  'ease-in': t => t * t,
  'ease-in-out': t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  'ease-out': t => t * (2 - t)
};

// Adapted from react-bits ClickSpark: one viewport-sized fixed canvas listens to
// clicks on the document, instead of a canvas stretched over the whole page.
const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  disabled = false,
  children
}) => {
  const canvasRef = useRef(null);
  const settingsRef = useRef(null);
  settingsRef.current = { sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale };

  useEffect(() => {
    if (disabled) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = now => {
      const s = settingsRef.current;
      const ease = EASINGS[s.easing] ?? EASINGS['ease-out'];
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter(spark => {
        const elapsed = now - spark.startTime;
        if (elapsed >= s.duration) return false;
        const eased = ease(elapsed / s.duration);
        const distance = eased * s.sparkRadius * s.extraScale;
        const lineLength = s.sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
        ctx.strokeStyle = s.sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = e => {
      if (e.detail === 0) return; // keyboard "click": no pointer position to spark from
      const s = settingsRef.current;
      const now = performance.now();
      for (let i = 0; i < s.sparkCount; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, angle: (2 * Math.PI * i) / s.sparkCount, startTime: now });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
    };
  }, [disabled]);

  return (
    <>
      {children}
      {!disabled && <canvas ref={canvasRef} className="click-spark" aria-hidden="true" />}
    </>
  );
};

export default ClickSpark;
