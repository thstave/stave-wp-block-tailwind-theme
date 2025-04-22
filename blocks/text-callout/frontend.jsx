import { createRoot } from 'react-dom/client';
import TextCallout from './TextCallout.jsx';

document.querySelectorAll('[data-block="text-callout"]').forEach((el) => {
  const attrs = JSON.parse(atob(el.dataset.attributes));
  const root = createRoot(el);
  root.render(<TextCallout {...attrs} />);
});
