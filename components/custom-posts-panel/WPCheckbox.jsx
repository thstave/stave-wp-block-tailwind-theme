// src/custom-posts-panel/WPCheckbox.jsx
import React from 'react';
import styles from './WPCheckbox.module.css';

/**
 * WPCheckbox
 * A styled checkbox using WordPress component classes.
 *
 * @param {boolean} checked            - Whether the checkbox is checked
 * @param {() => void} onChange        - Change handler
 * @param {React.ReactNode} children   - Label content
 */
export default function WPCheckbox({ checked, onChange, children }) {
  return (
    <div className={`${styles.wrapper} cpt-panel__field`}>
      <label className="components-checkbox__label">
        <input
          type="checkbox"
          className="components-checkbox__input"
          checked={checked}
          onChange={onChange}
        />
        <span className={`${styles.labelText} components-checkbox__label-text`}>
          {children}
        </span>
      </label>
    </div>
  );
}
