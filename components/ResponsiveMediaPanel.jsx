import React, { useState, useEffect, Fragment } from 'react';
import {
  MediaUpload,
  MediaUploadCheck,
  URLInputButton,
  FocalPointPicker,
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  RangeControl,
  ColorPalette,
  Button,
} from '@wordpress/components';
import './responsive-media-panel.css';

export default function ResponsiveMediaPanel({
  label = 'Media Settings',
  value = {},
  onChange,
}) {
  const defaultState = {
    mediaUrl: '',
    mediaId: null,
    mediaType: 'image',
    variant: 'full',
    lazyLoad: false,
    quality: 80,
    placeholder: 'none',
    linkUrl: '',
    linkTarget: '',
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    alt: '',
    caption: '',
    alignment: 'none',
    focalPoint: { x: 0.5, y: 0.5 },
    cropGravity: 'center center',
  };

  const [state, setState] = useState({ ...defaultState, ...value });

  const updateState = (updates) => {
    const next = { ...state, ...updates };
    setState(next);
    onChange(next);
  };

  useEffect(() => {
    setState({ ...defaultState, ...value });
  }, [value]);

  const blockProps = useBlockProps({ className: 'responsive-media-panel' });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={label} initialOpen>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                updateState({
                  mediaUrl: media.url,
                  mediaId: media.id,
                  mediaType: media.type,
                  alt: media.alt || '',
                  caption: media.caption || '',
                })
              }
              allowedTypes={['image', 'video']}
              value={state.mediaId}
              render={({ open }) => (
                <Button onClick={open} variant="primary">
                  {state.mediaUrl ? 'Replace Media' : 'Select Media'}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {state.mediaUrl && (
            <Fragment>
              {/* Responsive & Variant Settings */}
              <SelectControl
                label="Image/Video Variant"
                value={state.variant}
                options={[
                  { label: 'Full', value: 'full' },
                  { label: 'Large', value: 'large' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Thumbnail', value: 'thumbnail' },
                ]}
                onChange={(v) => updateState({ variant: v })}
              />
              <ToggleControl
                label="Lazy-load"
                checked={state.lazyLoad}
                onChange={(v) => updateState({ lazyLoad: v })}
              />

              {/* Performance & Loading Settings */}
              <RangeControl
                label="Quality (%)"
                value={state.quality}
                onChange={(v) => updateState({ quality: v })}
                min={10}
                max={100}
              />
              <SelectControl
                label="Placeholder Type"
                value={state.placeholder}
                options={[
                  { label: 'None', value: 'none' },
                  { label: 'Blur', value: 'blur' },
                  { label: 'Color', value: 'color' },
                ]}
                onChange={(v) => updateState({ placeholder: v })}
              />

              {/* Link Settings */}
              <URLInputButton
                url={state.linkUrl}
                onChange={(url, post) =>
                  updateState({ linkUrl: url, linkTarget: post?.target || '' })
                }
              />

              {/* Crop & Focal Point Settings */}
              <PanelBody title="Crop & Focal Point" initialOpen={false}>
                <FocalPointPicker
                  label="Focal point"
                  url={state.mediaUrl}
                  value={state.focalPoint}
                  onChange={(fp) => updateState({ focalPoint: fp })}
                />
                <SelectControl
                  label="Crop Gravity"
                  value={state.cropGravity}
                  options=[
                    { label: 'Center', value: 'center center' },
                    { label: 'Top left', value: '0% 0%' },
                    { label: 'Top center', value: '50% 0%' },
                    { label: 'Top right', value: '100% 0%' },
                    { label: 'Bottom left', value: '0% 100%' },
                    { label: 'Bottom center', value: '50% 100%' },
                    { label: 'Bottom right', value: '100% 100%' },
                  ]
                  onChange={(v) => updateState({ cropGravity: v })}
                />
              </PanelBody>

              {/* Overlay Settings */}
              <p style={{ marginTop: '1em' }}>Overlay Color</p>
              <ColorPalette
                value={state.overlayColor}
                onChange={(c) => updateState({ overlayColor: c })}
              />
              <RangeControl
                label="Overlay Opacity"
                value={state.overlayOpacity}
                onChange={(v) => updateState({ overlayOpacity: v })}
                min={0}
                max={1}
                step={0.05}
              />
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        {/* Front-end preview: apply CSS object-position using focalPoint or cropGravity */}
        {state.mediaUrl && (
          state.mediaType === 'video' ? (
            <video
              src={state.mediaUrl}
              controls
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: state.cropGravity,
              }}
            />
          ) : (
            <img
              src={state.mediaUrl}
              alt={state.alt}
              loading={state.lazyLoad ? 'lazy' : 'eager'}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: state.cropGravity,
                filter: state.placeholder === 'blur' ? 'blur(10px)' : 'none',
              }}
            />
          )
        )}
        {state.mediaUrl && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: state.overlayColor,
              opacity: state.overlayOpacity,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </Fragment>
  );
}
