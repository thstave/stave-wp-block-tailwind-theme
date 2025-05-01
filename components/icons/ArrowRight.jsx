import React, { useState, useEffect } from 'react';
import {useThrottleEvent} from '@thstave/stave-react-utils'; 

const ArrowRight = ({
  size = '2em',
  color = '#b78d4d',
  hoverColor = '#d0a94d',
  disabledColor = '#999',
  disabled = false,
  rightPos, // optional override
  onClick
}) => {
  const [computedRight, setComputedRight] = useState(() => {
    // initial guess (on SSR)
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 824) return '-2.4em';
      if (width <= 1025) return '-2.4em';
    }
    return '-4.5em';
  });

  // Responsive handler for screen width
  const updateRight = () => {
    if (rightPos !== undefined) return;
    const width = window.innerWidth;
    if (width <= 824) {
      setComputedRight('-2.4em');
    } else if (width <= 1025) {
      setComputedRight('-2.4em');
    } else {
      setComputedRight('-4.5em');
    }
  };

  useEffect(() => {
    updateRight(); 
  }, [rightPos]);

  useThrottleEvent(window, "resize", 150, updateRight);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Next Slide"
      style={{
        background: 'none',
        border: 'none',
        padding: '0.5em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: 'translateY(-50%)',
        position: 'absolute',
        right: rightPos ?? computedRight,
        top: '50%',
        zIndex: 10,
        transition: 'color 0.3s ease, transform 0.3s ease',
        color: disabled ? disabledColor : color
      }}
      onMouseOver={(e) => {
        if (!disabled) e.currentTarget.style.color = hoverColor;
      }}
      onMouseOut={(e) => {
        if (!disabled) e.currentTarget.style.color = color;
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
};

export default ArrowRight;
