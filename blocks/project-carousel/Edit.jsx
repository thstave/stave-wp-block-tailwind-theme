import React from 'react';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import CPTSortableSelectControl from '../../components/CPTSortableSelectControl';
import ProjectCarousel from './ProjectCarousel';
import ThemeSelector from '../../components/ThemeSelector';
import ResponsiveHeightSelector from '../../components/ResponsiveHeightSelector';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subtitle, responsiveHeight, theme, slideTheme, justify } = attributes;

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
          <SelectControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Justify Cards"
            value={justify}
            options={[
              { label: 'Space Between', value: 'space-between' },
              { label: 'Space Around', value: 'space-around' },
              { label: 'Gap', value: 'gap' },
            ]}
            onChange={(val) => setAttributes({ justify: val })}
          />
          <CPTSortableSelectControl
            postType="project"
            label="Select and Order Projects"
            value={attributes.selectedProjects}
            onChange={(val) => setAttributes({ selectedProjects: val })}
          />

          <ResponsiveHeightSelector
            value={responsiveHeight}
            onChange={(val) => setAttributes({ responsiveHeight: val })}
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
        responsiveHeight={responsiveHeight}
        theme={theme}
        slideTheme={slideTheme}
        justify={justify}
      />
    </div>
  );
};

export default Edit;
