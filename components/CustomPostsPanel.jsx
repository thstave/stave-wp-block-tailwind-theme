// src/CustomPostsPanel.jsx
import React, { useState, useEffect, Fragment } from 'react';
import { useSelect } from '@wordpress/data';
import { PanelBody, Spinner } from '@wordpress/components';
import './custom-posts-panel/CustomPostsPanel.css';

import CPTSelector from './custom-posts-panel/CPTSelector';
import ReadTypeTabs from './custom-posts-panel/ReadTypeTabs';
import PostSelection from './custom-posts-panel/PostSelection';
import AutoMode from './custom-posts-panel/AutoMode';

export default function CustomPostsPanel({
  // When parent passes a fixed postType, we’ll show text instead of the dropdown
  postType,            
  label = 'Select Projects',
  value = {},          // JSON state, may include readType, selectedCPT, etc.
  onChange,
}) {
  // Default to Auto if not already defined in saved value
  const defaultState = {
    selectedCPT: postType || '',   // use passed slug if any
    selected: [],
    readType: value.readType || 'auto',
    autoOption: 'all',
    filterField: '',
    operator: '',
    filterValue: '',
    orderField: '',
    orderDirection: 'asc',
  };

  const [state, setState] = useState({ ...defaultState, ...value });
  const updateState = (updates) =>
    setState((prev) => {
      const next = { ...prev, ...updates };
      onChange(next);
      return next;
    });

  // Shared filter/order metadata
  const availableFields = [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'date',  label: 'Date',  type: 'date'   },
  ];
  const operatorOptions = {
    string: [
      { value: 'equals',   label: 'Equals'   },
      { value: 'contains', label: 'Contains' },
    ],
    date: [
      { value: 'equals',  label: 'Equals' },
      { value: 'greater', label: 'After'  },
      { value: 'less',    label: 'Before' },
    ],
  };

  // Fetch and filter CPTs if we need to show the dropdown
  const excludeSlugs = [
    'post','page','attachment','revision','nav_menu_item',
    'wp_template','wp_template_part','wp_pattern',
    'wp_global_styles','wp_navigation','wp_font_family','wp_font_face',
  ];
  const allTypes = useSelect(
    (sel) => sel('core').getPostTypes({ per_page: -1 }) || [],
    []
  );
  const customTypes = allTypes.filter((t) => !excludeSlugs.includes(t.slug));

  // Sync incoming postType → state.selectedCPT (only if it matches a real CPT)
  useEffect(() => {
    if (
      postType &&
      customTypes.some((t) => t.slug === postType) &&
      state.selectedCPT !== postType
    ) {
      updateState({ selectedCPT: postType, selected: [] });
    }
  }, [postType, customTypes]);

  // Fetch posts for the chosen CPT
  const posts = useSelect(
    (sel) =>
      state.selectedCPT
        ? sel('core').getEntityRecords('postType', state.selectedCPT, {
            per_page: -1,
            _embed: true,
          })
        : null,
    [state.selectedCPT]
  );

  // Handlers
  const handleToggleSelect = (id) => {
    const list = state.selected.includes(id)
      ? state.selected.filter((v) => v !== id)
      : [...state.selected, id];
    updateState({ selected: list });
  };
  const handleReorder    = (newList) => updateState({ selected: newList });
  const handleModeChange = (mode)     => updateState({ readType: mode });

  // Guard filterField → operator/filterValue
  useEffect(() => {
    const { filterField, operator: curOp, filterValue: curVal } = state;
    if (filterField) {
      const opts =
        operatorOptions[
          availableFields.find((f) => f.name === filterField)?.type
        ] || [];
      const newOp = opts[0]?.value || '';
      if (newOp !== curOp || curVal !== '') {
        updateState({ operator: newOp, filterValue: '' });
      }
    } else if (curOp || curVal) {
      updateState({ operator: '', filterValue: '' });
    }
  }, [state.filterField]);

  return (
    <Fragment>
      <div className="cpt-panel">
        <PanelBody title={label} initialOpen={false} className="cpt-panel__body">
          {postType ? (
            // Fixed postType: show text
            <div className="cpt-panel__field">
              <p>Post Type: {postType}</p>
            </div>
          ) : (
            // No postType passed: render dropdown
            <CPTSelector
              types={customTypes}
              selectedCPT={state.selectedCPT}
              onChange={(slug) => updateState({ selectedCPT: slug, selected: [] })}
            />
          )}

          {/* Auto / Select tabs */}
          <ReadTypeTabs readType={state.readType} onChange={handleModeChange} />

          {/* Body */}
          {state.readType === 'select' ? (
            <PostSelection
              posts={posts}
              selected={state.selected}
              onToggleSelect={handleToggleSelect}
              onReorder={handleReorder}
            />
          ) : (
            <AutoMode
              state={state}
              updateState={updateState}
              availableFields={availableFields}
              operatorOptions={operatorOptions}
            />
          )}
        </PanelBody>
      </div>
    </Fragment>
  );
}
