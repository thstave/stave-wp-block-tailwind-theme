import React from 'react';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import CustomPostsPanel from '../../components/CustomPostsPanel';
import ProjectCarousel from './ProjectCarousel';
import ThemeSelector from '../../components/ThemeSelector';
import ResponsiveHeightSelector from '../../components/ResponsiveHeightSelector';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subtitle, responsiveHeight, theme, slideTheme, justify, customPosts } = attributes;

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

          <CustomPostsPanel
            postType="project"
            label="Featured Projects"
            value={attributes.customPosts}
            onChange={(newList) =>
              setAttributes({ customPosts: newList })
            }
          />

        </PanelBody>
      </InspectorControls>

      <ProjectCarousel
        title={title}
        subtitle={subtitle}
        responsiveHeight={responsiveHeight}
        theme={theme}
        customPosts={customPosts}
        slideTheme={slideTheme}
        justify={justify}
      />
    </div>
  );
};

export default Edit;
