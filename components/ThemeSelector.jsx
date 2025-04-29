import { SelectControl } from '@wordpress/components';

const ThemeSelector = ({ value, onChange, label = 'Choose Color Palette' }) => {
  return (
    <SelectControl
      __nextHasNoMarginBottom={true}
      __next40pxDefaultSize={true}
      label={label}
      value={value}
      options={[
        { label: 'Default (Light)', value: '' },
        { label: 'Dark Theme', value: 'dark-theme' },
        { label: 'Dark Soft Theme', value: 'dark-soft-theme' },
        { label: 'Lighter Dark Theme', value: 'lighter-dark-theme' },
        { label: 'Mid-Dark Warm Theme', value: 'mid-dark-warm-theme' },
        { label: 'Midrange Neutral Theme', value: 'midrange-neutral-theme' },
        { label: 'Midrange Cool Gray Theme', value: 'midrange-cool-theme' },
        { label: 'Soft Light Warm Theme', value: 'soft-light-warm-theme' },
      ]}
      onChange={onChange}
    />
  );
};

export default ThemeSelector;
