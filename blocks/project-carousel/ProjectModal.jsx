// components/ProjectModal.jsx
import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ title, imageUrl, description, onClose }) => {
  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        {imageUrl && (
          <img src={imageUrl} alt={title} className="project-modal-image" />
        )}
        <h2 className="project-modal-title">{title}</h2>
        <p className="project-modal-description">{description}</p>
        <button className="project-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
