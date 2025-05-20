// src/custom-posts-panel/PostSelection.jsx
import React, { useState } from 'react';
import { ButtonGroup, Button, Spinner } from '@wordpress/components';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import styles from './PostSelection.module.css';
import WPCheckbox from './WPCheckbox';
import SortableItem from './SortableItem';

/**
 * PostSelection
 * Combines Selected Posts and Add Posts views for Select mode.
 *
 * @param {Object[]} posts              - Array of post objects
 * @param {number[]} selected           - Array of selected post IDs
 * @param {function(number):void} onToggleSelect - Toggle a post ID in selection
 * @param {function(number[]):void} onReorder     - Callback with reordered IDs
 */
export default function PostSelection({ posts, selected, onToggleSelect, onReorder }) {
  // Default to 'order' (Selected Posts) first
  const [viewMode, setViewMode] = useState('order');
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = selected.findIndex((id) => String(id) === active.id);
      const newIndex = selected.findIndex((id) => String(id) === over.id);
      if (oldIndex > -1 && newIndex > -1) {
        onReorder(arrayMove(selected, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <ButtonGroup className={styles.toggleGroup}>
        <Button
          isPressed={viewMode === 'order'}
          onClick={() => setViewMode('order')}
        >
          Selected Posts
        </Button>
        <Button
          isPressed={viewMode === 'add'}
          onClick={() => setViewMode('add')}
        >
          Add Posts
        </Button>
      </ButtonGroup>

      {viewMode === 'add' ? (
        <div className={styles.addList}>
          {!posts ? (
            <Spinner />
          ) : (
            posts.map((post) => (
              <WPCheckbox
                key={post.id}
                checked={selected.includes(post.id)}
                onChange={() => onToggleSelect(post.id)}
              >
                {post.title.rendered}
              </WPCheckbox>
            ))
          )}
        </div>
      ) : (
        <div className={styles.orderList}>
          {!posts ? (
            <Spinner />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selected.map((id) => String(id))}
                strategy={verticalListSortingStrategy}
              >
                {selected.map((id) => {
                  const post = posts.find((p) => p.id === id);
                  return post ? (
                    <SortableItem key={id} id={String(id)}>
                      {post.title.rendered}
                    </SortableItem>
                  ) : null;
                })}
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  );
}
