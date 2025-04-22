import React, { useState } from 'react';
import './ProjectCard.css';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ title, imageUrl, description, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`project-card ${theme}`} onClick={() => setIsOpen(true)}>
        <div className="project-card-image-wrapper">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="project-card-image" />
          ) : (
            <div className="project-card-placeholder">No Image</div>
          )}
        </div>

        {/* ✨ Title always displayed at the bottom */}
        <div className="project-card-title-wrapper">
          <h3 className="project-card-title">{title}</h3>
        </div>
      </div>

      {isOpen && (
        <ProjectModal
          title={title}
          imageUrl={imageUrl}
          description={description}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
