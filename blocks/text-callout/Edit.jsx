// blocks/hero/Edit.jsx
import React from 'react';
import {
  useBlockProps,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl,
  SelectControl
} from '@wordpress/components';
import TextCallout from './TextCallout'; 

const Edit = ({ attributes, setAttributes }) => {
  const { title, text, height, theme } = attributes;

  const blockProps = useBlockProps({
    className: '',
    style: {
      minHeight: '200px',
      position: 'relative'
    }
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="TextCallout Block Settings" initialOpen={true}>
          <TextControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Title"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />

          <TextareaControl
            __nextHasNoMarginBottom={true}
            label="Text"
            value={text}
            onChange={(val) => setAttributes({ text: val })}
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

          <SelectControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Select Theme"
            value={theme}
            options={[
              { label: 'Default (Light)', value: '' },
              { label: 'Dark Theme', value: 'dark-theme' },
              { label: 'Dark Soft Theme', value: 'dark-soft-theme' },
              { label: 'Lighter Dark Theme', value: 'lighter-dark-theme' },
              { label: 'Mid-Dark Warm Theme', value: 'mid-dark-warm-theme' },
              { label: 'Midrange Neutral Theme', value: 'midrange-neutral-theme' },
              { label: 'Midrange Cool Gray Theme', value: 'midrange-cool-theme' },
              { label: 'Soft Light Warm Theme', value: 'soft-light-warm-theme' }
            ]}
            onChange={(val) => setAttributes({ theme: val })}
          />

        </PanelBody>
      </InspectorControls>

      {/* Pass theme into TextCallout! */}
      <TextCallout
        title={title}
        text={text}
        height={height}
        theme={theme}
      />
    </div>
  );
};

export default Edit;
