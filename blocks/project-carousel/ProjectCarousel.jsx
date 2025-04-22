// blocks/project-carousel/ProjectCarousel.jsx
import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import Slider from '../../components/slider/Slider';
import './ProjectCarousel.css';
import ArrowLeft from '../../components/icons/ArrowLeft';
import ArrowRight from '../../components/icons/ArrowRight';

const ProjectCarousel = ({ title, subtitle, height, theme, selectedProjects, slideTheme }) => {
  const [projects, setProjects] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/wp-json/wp/v2/project?per_page=100&_embed');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = selectedProjects && selectedProjects.length > 0
    ? selectedProjects
      .map((id) => projects.find((project) => project.id === id))
      .filter(Boolean)
    : projects;

  // Build array of ProjectCard components
  const projectSlides = displayedProjects.map((project) => {
    const imageUrl = project?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const projectTitle = project?.meta?._project_name || project?.title?.rendered || 'Untitled';
    const projectDescription = project?.meta?._project_description || '';

    return (
      <ProjectCard
        key={project.id}
        title={projectTitle}
        imageUrl={imageUrl}
        description={projectDescription}
        theme={slideTheme}
      />
    );
  });

  return (
    <section className={`projects-block ${theme}`} style={{ height }}>
      <div className="container">
        {title && <h2 className="projects-title">{title}</h2>}
        {subtitle && <p className="projects-subtitle">{subtitle}</p>}

        <div className="projects-slider-wrapper">

          <ArrowLeft
            onClick={() => sliderRef.current.previous()}
            size="3.5em"
            leftPos="-4.5em"
            color="var(--color-accent)"
            hoverColor="var(--color-accent-hover)"
            disabled={false}
          />

          <Slider
            ref={sliderRef}
            dataList={projectSlides}
            type="in-between"
            gap="24px"
            minSpace={24}
            debug={true}
          />

          <ArrowRight
            onClick={() => sliderRef.current.next()}
            size="3.5em"
            rightPos="-4.5em"
            color="var(--color-accent)"
            hoverColor="var(--color-accent-hover)"
            disabled={false}
          />
        </div>
      </div>
    </section >

  );
};

export default ProjectCarousel;
