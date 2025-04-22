import React from 'react';

const ArrowLeft = ({
  size = '2em',
  color = '#b78d4d',
  hoverColor = '#d0a94d',
  disabledColor = '#999',
  disabled = false,
  leftPos= "-1.5em",
  onClick
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label="Previous Slide"
    style={{
      background: 'none',
      border: 'none',
      padding: '0.5em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: 'translateY(-50%)',
      position: 'absolute',
      left: leftPos,
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
);

export default ArrowLeft;
