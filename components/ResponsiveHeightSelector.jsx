import { Button, Modal, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const HEIGHT_OPTIONS = [
  { label: 'Not Set', value: 'unset' },
  { label: 'Auto', value: 'auto' },
  { label: '25%', value: '25vh' },
  { label: '33%', value: '33.3vh' },
  { label: '50%', value: '50vh' },
  { label: '66%', value: '66.6vh' },
  { label: '75%', value: '75vh' },
  { label: '100%', value: '100vh' },
];

const BREAKPOINTS = [
  { key: 'lg', prefix: 'lg:', label: 'Large', query: '≥1024px' },
  { key: 'md', prefix: 'md:', label: 'Medium', query: '≥768px' },
  { key: 'sm', prefix: 'sm:', label: 'Small', query: '≥640px' },
  { key: 'xs', prefix: '', label: 'Base', query: '(default)' },
];

// Parse the saved string value into an object structure
const parseValueToObject = (str) => {
  const parsed = str
    .split(' ')
    .filter(Boolean)
    .reduce((acc, item) => {
      const [bp, size] = item.includes(':') ? item.split(':') : ['xs', item];
      acc[bp] = size.replace('h-', '').replace('pct', '%');
      return acc;
    }, {});

  return {
    xs: parsed.xs || 'auto',
    sm: parsed.sm || 'unset',
    md: parsed.md || 'unset',
    lg: parsed.lg || 'unset',
  };
};

// Create readable display text from the object
const generateReadableDisplay = (obj) => {
  return BREAKPOINTS
    .map(({ key, label }) => {
      const val = obj[key];
      if (!val || val === 'unset') return null;
      return `${label}: ${val.replace('pct', '%')}`;
    })
    .filter(Boolean)
    .join(' | ');
};

const ResponsiveHeightSelector = ({ value = '', onChange }) => {
  const initialValues = parseValueToObject(value);
  const [isOpen, setIsOpen] = useState(false);
  const [savedValues, setSavedValues] = useState(initialValues);
  const [workingValues, setWorkingValues] = useState(null);
  const [displayString, setDisplayString] = useState(generateReadableDisplay(initialValues));

  const openModal = () => {
    setWorkingValues({ ...savedValues });
    setIsOpen(true);
  };

  const handleSave = () => {
    const classNames = BREAKPOINTS
      .map(({ key, prefix }) => {
        const val = workingValues[key];
        if (!val || val === 'unset') return '';
        const formattedVal = val.replace('.', '').replace('%', 'pct');
        return prefix + 'h-' + formattedVal;
      })
      .filter(Boolean)
      .join(' ');

    onChange(classNames.trim());
    const parsed = parseValueToObject(classNames);
    setSavedValues(parsed);
    setDisplayString(generateReadableDisplay(parsed));
    setIsOpen(false);
  };

  const handleChange = (key, newValue) => {
    setWorkingValues((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleReset = () => {
    setWorkingValues({
      xs: 'auto',
      sm: 'unset',
      md: 'unset',
      lg: 'unset',
    });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Button variant="secondary" onClick={openModal}>
        Edit Heights
      </Button>

      {displayString && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.85em', wordBreak: 'break-word' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Selected Heights:</div>
          <div>{displayString || 'None selected'}</div>
        </div>
      )}

      {isOpen && (
        <Modal
          title="Edit Responsive Heights"
          onRequestClose={() => setIsOpen(false)}
        >
          {workingValues && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {BREAKPOINTS.map(({ key, label, query }) => (
                <SelectControl
                  key={key}
                  label={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{label}</span>
                      <span style={{
                        fontStyle: 'italic',
                        color: 'blue',
                        fontSize: '0.85em',
                        marginTop: '2px',
                        marginLeft: '4px'
                      }}>
                        {query}
                      </span>
                    </div>
                  }
                  value={workingValues[key] || ''}
                  options={HEIGHT_OPTIONS}
                  onChange={(val) => handleChange(key, val)}
                />
              ))}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="secondary" onClick={handleReset}>
                  Reset Heights
                </Button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ResponsiveHeightSelector;
