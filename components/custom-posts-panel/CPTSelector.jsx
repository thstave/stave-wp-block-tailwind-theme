// src/custom-posts-panel/CPTSelector.jsx
import React from 'react';
import styles from './CPTSelector.module.css';

/**
 * CPTSelector
 * Renders a dropdown of custom post types.
 *
 * @param {Object[]} types        - Array of post type objects with { slug, labels }
 * @param {string}   selectedCPT  - The currently selected post type slug
 * @param {function(string):void} onChange - Callback when selection changes
 */
export default function CPTSelector({ types, selectedCPT, onChange }) {
  return (
    <div className={`${styles.wrapper} cpt-panel__field`}>
      <label
        htmlFor="cpt-selector"
        className="cpt-panel__label"
      >
        Content Type
      </label>
      <select
        id="cpt-selector"
        className={styles.dropdown}
        value={selectedCPT}
        onChange={(e) => onChange(e.target.value)}
      >
        {types.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.labels?.singular_name || t.slug}
          </option>
        ))}
      </select>
    </div>
  );
}
