import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton } from '@wordpress/components';
import { dragHandle } from '@wordpress/icons';
import styles from './SortableItem.module.css';

/**
 * SortableItem
 * A draggable item wrapper using @dnd-kit/sortable.
 *
 * @param {string} id - Unique identifier for sorting
 * @param {React.ReactNode} children - Item content
 */
export default function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const inlineStyle = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={inlineStyle}
      className={styles.wrapper}
      {...attributes}
      {...listeners}
    >
      <IconButton
        icon={dragHandle}
        label="Drag to reorder"
        className={styles.handle}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}