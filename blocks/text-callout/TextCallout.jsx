// blocks/hero/TextCallout.jsx
import React from 'react';
import './TextCallout.css';

const TextCallout = ({ title, text, responsiveHeight, theme }) => {
  const sectionClass = `textcallout ${theme ? theme : ''} ${responsiveHeight}`;

  return (
    <section className={sectionClass.trim()} >
      <div className="container">
        {(title && title.length > 0) && <h2>{title}</h2>}
        {text && <p>{text}</p>}
      </div>
    </section>
  );
};

export default TextCallout;
