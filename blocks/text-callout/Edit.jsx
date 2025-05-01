// blocks/hero/Edit.jsx
import React from 'react';
import {
  useBlockProps,
  InspectorControls
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl
} from '@wordpress/components';
import TextCallout from './TextCallout';
import ResponsiveHeightSelector from '../../components/ResponsiveHeightSelector';

const Edit = ({ attributes, setAttributes }) => {
  const { title, text, responsiveHeight, theme } = attributes;

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


          <ResponsiveHeightSelector
            value={responsiveHeight}
            onChange={(val) => setAttributes({ responsiveHeight: val })}
          />

        </PanelBody>
      </InspectorControls>

      {/* Pass theme into TextCallout! */}
      <TextCallout
        title={title}
        text={text}
        responsiveHeight={responsiveHeight}
        theme={theme}
      />
    </div>
  );
};

export default Edit;
