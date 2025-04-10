// blocks/hero/Edit.jsx
import React from 'react';
import {
  useBlockProps,
  InspectorControls,
  // MediaUpload,
  // MediaUploadCheck
} from '@wordpress/block-editor';
import {
  PanelBody,
  // TextControl,
  // TextareaControl,
  // Button
} from '@wordpress/components';


const __BLOCK_COMPONENT__ = ({ attributes, setAttributes }) => {
  const { title, subtitle, text, image } = attributes;
 
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
        <PanelBody title="__BLOCK_COMPONENT__ Block Settings">
        </PanelBody>
      </InspectorControls>

      <div></div>
    </div>
  );
};

export default __BLOCK_COMPONENT__;
