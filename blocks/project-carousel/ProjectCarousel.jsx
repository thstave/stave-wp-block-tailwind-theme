// blocks/project-carousel/ProjectCarousel.jsx
import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { SliderPanel } from '@thstave/stave-slider-panel';
import './ProjectCarousel.css';
import ArrowLeft from '../../components/icons/ArrowLeft';
import ArrowRight from '../../components/icons/ArrowRight';

const ProjectCarousel = ({ title, subtitle, responsiveHeight, theme, selectedProjects, slideTheme, justify }) => {
  const [projects, setProjects] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/wp-json/wp/v2/project?per_page=100&_embed');
        const data = await response.json();
        setProjects(data);

        // Important: allow next frame for React to apply setState
        setTimeout(() => {
          sliderRef.current?.reload?.();
        }, 0);
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
    <section className={`projects-block ${theme} ${responsiveHeight}`}>
      <div className="container">
        {title && <h2 className="projects-title">{title}</h2>}
        {subtitle && <p className="projects-subtitle">{subtitle}</p>}

        <div className="projects-slider-wrapper">
          <div className="slider-inner-wrapper">
            <ArrowLeft
              onClick={() => sliderRef.current?.previous()}
              size="3.5em"
              color="var(--color-accent)"
              hoverColor="var(--color-accent-hover)"
              disabled={false}
            />

            <SliderPanel
              ref={sliderRef}
              dataList={projectSlides}
              justify={justify}
              minSpace={28}
              gap="24px"
              debug={false}
            />

            <ArrowRight
              onClick={() => sliderRef.current?.next()}
              size="3.5em"
              color="var(--color-accent)"
              hoverColor="var(--color-accent-hover)"
              disabled={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
