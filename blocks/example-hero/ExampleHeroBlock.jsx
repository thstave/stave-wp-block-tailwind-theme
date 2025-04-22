
import React from 'react';
import './ExampleHeroBlock.css'; // Reference the new CSS file

const ExampleHeroBlock = ({ title, subtitle, text, image }) => {
  return (
    <section className="hero full-hero dark-theme">
        <div className="hero-overlay"></div>
        <img src={image} alt="Coffee and Puzzle Hero" className="hero-background" />
        <div className="hero-text left-aligned">
          <div className="hero-title">Tom Stave</div>
          <div className="hero-subtitle">Senior Fullstack Developer</div>
          <p className="hero-description">Where experience, code, and calm thinking come together.</p>
        </div>
      </section>
  );
};

export default ExampleHeroBlock;
