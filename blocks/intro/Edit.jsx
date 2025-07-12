// blocks/hero/Edit.jsx
import React from "react";
import {
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  TextareaControl,
} from "@wordpress/components";
import Intro from './Intro';
import ThemeSelector from '../../components/ThemeSelector';
import ResponsiveHeightSelector from '../../components/ResponsiveHeightSelector';

const Edit = ({ attributes, setAttributes }) => {
  const { title, detail, responsiveHeight, theme } = attributes;

  const blockProps = useBlockProps({
    className: "",
    style: {
      minHeight: "200px",
      position: "relative",
    },
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Intro Block Settings">
          <TextControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Block Title"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />
          <TextareaControl
            __nextHasNoMarginBottom={true}
            __next40pxDefaultSize={true}
            label="Block Detail"
            value={detail}
            onChange={(val) => setAttributes({ detail: val })}
          />

          <ResponsiveHeightSelector
            value={responsiveHeight}
            onChange={(val) => setAttributes({ responsiveHeight: val })}
          />

          <ThemeSelector
            value={theme}
            onChange={(val) => setAttributes({ theme: val })}
          />
        </PanelBody>
      </InspectorControls>

      <Intro
        title={title}
        detail={detail}
        responsiveHeight={responsiveHeight}
        theme={theme}
      />

      <div></div>
    </div>
  );
};

export default Edit;
