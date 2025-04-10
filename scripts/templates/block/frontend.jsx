import { createRoot } from 'react-dom/client';
import __BLOCK_COMPONENT__ from './__BLOCK_COMPONENT__.jsx';

document.querySelectorAll('[data-block="__BLOCK_NAME__"]').forEach((el) => {
  const attrs = JSON.parse(atob(el.dataset.attributes));
  const root = createRoot(el);
  root.render(<__BLOCK_COMPONENT__ {...attrs} />);
});
