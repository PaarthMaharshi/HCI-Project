'use client';

import './StarBorder.css';

// react-bits StarBorder: two soft "stars" orbit the edge of a pill.
// Spans instead of divs so it can wrap a <button> or <a>.
const StarBorder = ({ as: Component = 'button', className = '', color = 'white', speed = '6s', thickness = 1, children, style, ...rest }) => {
  return (
    <Component className={`star-border-container ${className}`} {...rest} style={{ padding: `${thickness}px 0`, ...style }}>
      <span
        className="border-gradient-bottom"
        aria-hidden="true"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <span
        className="border-gradient-top"
        aria-hidden="true"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <span className="inner-content">{children}</span>
    </Component>
  );
};

export default StarBorder;
