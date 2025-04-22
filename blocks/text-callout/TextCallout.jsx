// blocks/hero/TextCallout.jsx
import React from 'react';
import './TextCallout.css';

const TextCallout = ({ title, text, height, theme }) => {
  const sectionClass = `textcallout ${theme ? theme : ''}`;

  return (
    <section className={sectionClass.trim()} style={{ height }}>
      <div className="container">
        {(title && title.length > 0) && <h2>{title}</h2>}
        {text && <p>{text}</p>}
      </div>
    </section>
  );
};

export default TextCallout;
