import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import { SliderPanel } from '@thstave/stave-slider-panel';
import ArrowLeft from '../../components/icons/ArrowLeft';
import ArrowRight from '../../components/icons/ArrowRight';
import { useCustomPostsRecords } from '../../components/CustomPostHooks';
import './ProjectCarousel.css';

/**
 * ProjectCarousel
 * Front-end renderer using saved customPosts config.
 */
const ProjectCarousel = ({
  title,
  subtitle,
  responsiveHeight,
  theme,
  customPosts,
  slideTheme,
  justify,
}) => {
  // Fetch posts based on customPosts config (select or auto)
  const projects = useCustomPostsRecords(customPosts);
  const sliderRef = useRef(null);

  // Reload slider when projects change
  useEffect(() => {
    setTimeout(() => {
      sliderRef.current?.reload?.();
    }, 0);
  }, [projects]);

  if (!projects || projects.length === 0) {
    return null;
  }

  const projectSlides = projects.map((project) => {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

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
              disabled={!projects.length}
            />

            <SliderPanel
              ref={sliderRef}
              dataList={projectSlides}
              justify={justify}
              minSpace={28}
              gap="24px"
              debug={false}
              settings={settings}
            />

            <ArrowRight
              onClick={() => sliderRef.current?.next()}
              size="3.5em"
              color="var(--color-accent)"
              hoverColor="var(--color-accent-hover)"
              disabled={!projects.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

ProjectCarousel.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  responsiveHeight: PropTypes.string,
  theme: PropTypes.string,
  customPosts: PropTypes.object.isRequired,
  slideTheme: PropTypes.string,
  justify: PropTypes.string,
};

export default ProjectCarousel;
