import React from 'react';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import CPTSortableSelectControl from '../../components/CPTSortableSelectControl';
import ProjectCarousel from './ProjectCarousel';
import ThemeSelector from '../../components/ThemeSelector';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subtitle, height, theme, slideTheme } = attributes;

  const blockProps = useBlockProps({
    className: 'projects-block-edit'
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Projects Carousel Settings">
          <TextControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Block Title"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />
          <TextControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Block Subtitle"
            value={subtitle}
            onChange={(val) => setAttributes({ subtitle: val })}
          />
          <CPTSortableSelectControl
            postType="project"
            label="Select and Order Projects"
            value={attributes.selectedProjects}
            onChange={(val) => setAttributes({ selectedProjects: val })}
          />
          <SelectControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Select Height"
            value={height}
            options={[
              { label: 'Select a height', value: '' },
              { label: '25%', value: '25vh' },
              { label: '33%', value: '33.3vh' },
              { label: '50%', value: '50vh' },
              { label: '66%', value: '66.6vh' },
              { label: '75%', value: '75vh' },
              { label: '100%', value: '100vh' },
              { label: 'Auto', value: 'auto' }
            ]}
            onChange={(val) => setAttributes({ height: val })}
          />

<ThemeSelector
            value={theme}
            onChange={(val) => setAttributes({ theme: val })}
          />
          <ThemeSelector
            label="Choose Slide Color Palette"
            value={slideTheme}
            onChange={(val) => setAttributes({ slideTheme: val })}
          />

        </PanelBody>
      </InspectorControls>

      <ProjectCarousel
        title={title}
        subtitle={subtitle}
        height={height}
        theme={theme}
        slideTheme = {slideTheme}
      />
    </div>
  );
};

export default Edit;
