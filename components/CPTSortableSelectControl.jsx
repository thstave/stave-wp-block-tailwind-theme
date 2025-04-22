import React, { useState, useEffect } from 'react';
import { useSelect } from '@wordpress/data';
import { PanelBody, CheckboxControl, Spinner } from '@wordpress/components';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const CPTSortableSelectControl = ({ postType = 'project', label = 'Select Projects', value = [], onChange }) => {
    const posts = useSelect((select) =>
    select('core').getEntityRecords('postType', postType, { per_page: -1, _embed: true })
  , [postType]); 

  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggleSelect = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = selected.indexOf(active.id);
      const newIndex = selected.indexOf(over.id);
      const reordered = arrayMove(selected, oldIndex, newIndex);
      setSelected(reordered);
      onChange(reordered);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  if (!posts) {
    return <Spinner />;
  }

  return (
    <PanelBody title={label} initialOpen={true}>
      {posts.map((post) => (
        <CheckboxControl
          key={post.id}
          label={post.title.rendered}
          checked={selected.includes(post.id)}
          onChange={() => toggleSelect(post.id)}
        />
      ))}
      <div style={{ marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
        <strong>Order Selected:</strong>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={selected} strategy={verticalListSortingStrategy}>
            {selected.map((id) => {
              const post = posts.find((p) => p.id === id);
              if (!post) return null;
              return (
                <div
                  key={id}
                  id={id}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    marginBottom: '0.5rem',
                    background: '#fff',
                    cursor: 'grab'
                  }}
                >
                  {post.title.rendered}
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </PanelBody>
  );
};

export default CPTSortableSelectControl;
