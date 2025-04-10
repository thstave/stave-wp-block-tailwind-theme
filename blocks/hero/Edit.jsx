// blocks/hero/Edit.jsx
import React from 'react';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl,
  Button
} from '@wordpress/components';

console.log('✅ Hero Block Edit.jsx loaded');

const Edit = ({ attributes, setAttributes }) => {
  const { title, subtitle, text, image } = attributes;
  console.log('✅ Hero Block Edit.jsx called');
  // ✅ Gives WP editor the ability to detect/select the block
  const blockProps = useBlockProps({
    className: 'thstave-hero-block bg-gray-800 text-white p-4',
    style: {
      minHeight: '200px',
      position: 'relative'
    }
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Hero Block Settings">
          <TextControl
            label="Title"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />
          <TextControl
            label="Subtitle"
            value={subtitle}
            onChange={(val) => setAttributes({ subtitle: val })}
          />
          <TextareaControl
            label="Text"
            value={text}
            onChange={(val) => setAttributes({ text: val })}
          />
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ image: media.url })}
              allowedTypes={['image']}
              render={({ open }) => (
                <Button onClick={open} isSecondary>
                  {image ? 'Change Image' : 'Select Image'}
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>

      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-md italic">{subtitle}</h3>
        <p>{text}</p>
        {image && <img src={image} alt="Preview" className="mt-4 rounded" />}
      </div>
    </div>
  );
};

export default Edit;
