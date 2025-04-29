// blocks/hero/Edit.jsx
import React from 'react';
import {
  useBlockProps,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  SelectControl
} from '@wordpress/components';
import TechIcons from './TechIcons';
import ThemeSelector from '../../components/ThemeSelector';
import ResponsiveHeightSelector from '../../components/ResponsiveHeightSelector';


const Edit = ({ attributes, setAttributes }) => {
  const { title, theme, responsiveHeight } = attributes;

  const blockProps = useBlockProps({
    className: '',
    style: {
      minHeight: '200px',
      position: 'relative'
    }
  });

  return (
    <div>
      <InspectorControls>
        <PanelBody title="Technology Icon Splatter" initialOpen={true}>
          <TextControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Title"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />

          <ThemeSelector
            value={theme}
            onChange={(val) => setAttributes({ theme: val })}
          />

          <ResponsiveHeightSelector
            value={responsiveHeight}
            onChange={(val) => setAttributes({ responsiveHeight: val })}
          />

        </PanelBody>
      </InspectorControls>

      <div>{responsiveHeight}</div>
      <TechIcons
        title={title}
        theme={theme}
        responsiveHeight={responsiveHeight}
      />
    </div>
  );
};

export default Edit;
