import React from 'react';
import './Intro.css';

const companies = [
  { name: 'Stockpile', logo: '/logos/stockpile.svg' },
  { name: 'Quotes', logo: '/logos/quotes.svg' },
  { name: 'Alpine', logo: '/logos/alpine.svg' },
  { name: 'Child Mind Institute', logo: '/logos/child-mind.svg' },
  { name: 'Invélo', logo: '/logos/invelo.svg' },
  { name: 'TotalE', logo: '/logos/totale.svg' },
  { name: 'Ethode', logo: '/logos/ethode.svg' },
];

const Intro = ({
  title,
  detail,
  responsiveHeight,
  theme
}) => {
  const backgroundImage = false;
  return (
     <section className={`intro-block ${theme} ${responsiveHeight}`}>

     {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="wave background"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container">
        <div className="heading-xxl extra-bold intro-title">{title}</div>
        <p className="body-l semibold intro-detail" intro-detail>{detail}</p>

      
      </div>
    </section>
  );
};

export default Intro;
