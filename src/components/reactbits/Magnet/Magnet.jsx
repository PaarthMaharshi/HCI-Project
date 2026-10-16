'use client';

import { useEffect, useRef } from 'react';

// react-bits Magnet: the child drifts toward the pointer while it is within
// `padding` px. Writes the transform directly so mouse moves don't re-render.
const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (disabled || !inner) return undefined;
    let active = false;

    const onMove = e => {
      const { left, top, width, height } = wrapRef.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const near = Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding;
      if (near) {
        active = true;
        inner.style.transition = activeTransition;
        inner.style.transform = `translate3d(${(e.clientX - cx) / magnetStrength}px, ${(e.clientY - cy) / magnetStrength}px, 0)`;
      } else if (active) {
        active = false;
        inner.style.transition = inactiveTransition;
        inner.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      inner.style.transform = 'translate3d(0, 0, 0)';
    };
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <span ref={wrapRef} className={wrapperClassName} style={{ position: 'relative', display: 'inline-block' }} {...props}>
      <span ref={innerRef} className={innerClassName} style={{ display: 'inline-block', willChange: 'transform' }}>
        {children}
      </span>
    </span>
  );
};

export default Magnet;
