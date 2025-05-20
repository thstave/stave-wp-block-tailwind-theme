import React from 'react';
import styles from './AutoMode.module.css';

/**
 * AutoMode
 * Renders auto-selection options: "All" vs "Filtered", plus filter and ordering controls.
 *
 * @param {object} state
 * @param {string} state.autoOption - "all" or "filtered"
 * @param {string} state.filterField
 * @param {string} state.operator
 * @param {string} state.filterValue
 * @param {string} state.orderField
 * @param {string} state.orderDirection
 * @param {function(object):void} updateState - Callback to update part of the state
 * @param {Array<{name:string,label:string,type:string}>} availableFields
 * @param {{string:Array<{value:string,label:string}>}} operatorOptions
 */
export default function AutoMode({
  state,
  updateState,
  availableFields,
  operatorOptions,
}) {
  const {
    autoOption,
    filterField,
    operator,
    filterValue,
    orderField,
    orderDirection,
  } = state;

  return (
    <div className={styles.wrapper}>
      {/* Mode selector */}
      <div className={styles.modeSelector}>
        <label htmlFor="auto-mode" className={styles.label}>
          Mode
        </label>
        <select
          id="auto-mode"
          className={styles.select}
          value={autoOption}
          onChange={(e) => updateState({ autoOption: e.target.value })}
        >
          <option value="all">All</option>
          <option value="filtered">Filtered</option>
        </select>
      </div>

      {/* Filter controls */}
      {autoOption === 'filtered' && (
        <div className={styles.filterControls}>
          <select
            className={styles.select}
            value={filterField}
            onChange={(e) => updateState({ filterField: e.target.value })}
          >
            <option value="">Field…</option>
            {availableFields.map((f) => (
              <option key={f.name} value={f.name}>
                {f.label}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={operator}
            onChange={(e) => updateState({ operator: e.target.value })}
            disabled={!filterField}
          >
            <option value="">Op…</option>
            {operatorOptions[
              availableFields.find((f) => f.name === filterField)?.type
            ]?.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className={styles.input}
            value={filterValue}
            onChange={(e) => updateState({ filterValue: e.target.value })}
            placeholder="Value"
            disabled={!filterField}
          />
        </div>
      )}

      {/* Order controls */}
      <div className={styles.orderControls}>
        <select
          className={styles.select}
          value={orderField}
          onChange={(e) => updateState({ orderField: e.target.value })}
          disabled={!availableFields.length}
        >
          <option value="">Order By…</option>
          {availableFields.map((f) => (
            <option key={f.name} value={f.name}>
              {f.label}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={orderDirection}
          onChange={(e) => updateState({ orderDirection: e.target.value })}
          disabled={!orderField}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
