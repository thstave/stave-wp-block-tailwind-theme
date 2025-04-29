import { createRoot } from 'react-dom/client';
import TechIcons from './TechIcons.jsx';

document.querySelectorAll('[data-block="tech-icons"]').forEach((el) => {
  const attrs = JSON.parse(atob(el.dataset.attributes));
  const root = createRoot(el);
  root.render(<TechIcons {...attrs} />);
});
