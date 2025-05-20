// src/custom-posts-panel/ReadTypeTabs.jsx
import React from 'react';
import styles from './ReadTypeTabs.module.css';

/**
 * ReadTypeTabs
 * Renders tabs for switching between "Select" and "Auto" modes.
 *
 * @param {string} readType                - Current mode, either 'select' or 'auto'
 * @param {function(string):void} onChange - Callback when mode changes
 */
 export default function ReadTypeTabs({ readType, onChange }) {
    const tabs = [
      { key: 'auto',   label: 'Auto'   },  // ← Auto first
      { key: 'select', label: 'Select' },  //     Select second
    ];
  
    return (
      <div className={`${styles.wrapper} cpt-panel__tabs`}>
        {tabs.map(({ key, label }) => {
          const isActive = readType === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }