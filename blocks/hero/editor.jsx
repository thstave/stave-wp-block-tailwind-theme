// blocks/hero/editor.jsx
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './Edit.jsx';

console.log('✅ Registering block: thstave/hero');
registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save: () => null
});

