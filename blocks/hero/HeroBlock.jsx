
import React from 'react';
import './HeroBlock.css';

const HeroBlock = ({ title, subtitle, text, image }) => {
  return (
    <div>
      <div className="relative h-[75vh] bg-[#1B1B1D] text-white flex flex-col justify-center items-center text-center px-6 overflow-hidden dark">
        {image && (
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${image})` }}></div>
        )}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 slide-in-right">{title}</h1>
          <h2 className="text-xl italic mb-4 slide-in-right">{subtitle}</h2>
          <button
            className="mb-6 px-4 py-2 bg-[#3CA4DF] hover:bg-[#36C1B2] text-white font-bold rounded"
            onClick={() => document.body.classList.toggle('dark')}
          >
            Toggle Theme
          </button>
        </div>
      </div>
      <div className="h-[25vh] bg-[#F4F0ED] text-[#5C3C2E] flex items-center justify-center px-6">
        <p className="text-center slide-in-left">{text}</p>
      </div>
    </div>
  );
};

export default HeroBlock;
