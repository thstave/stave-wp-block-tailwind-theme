import React from 'react';
import './TechnologyCard.css';

const TechnologyCard = ({ name, iconUrl, hoverEffect = true, shadow = true, backgroundColor = '#1e1e1e' }) => {
  const cardClass = `technology-card ${hoverEffect ? 'hover-effect' : ''} ${shadow ? 'with-shadow' : ''}`;

  return (
    <div className={cardClass} style={{ backgroundColor }}>
      <img src={iconUrl} alt={name} className="technology-icon" />
      <span className="technology-label">{name}</span>
    </div>
  );
};

export default TechnologyCard;
