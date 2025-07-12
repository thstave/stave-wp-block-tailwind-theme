import { createRoot } from 'react-dom/client';
import Intro from './Intro.jsx';

document.querySelectorAll('[data-block="intro"]').forEach((el) => {
  const attrs = JSON.parse(atob(el.dataset.attributes));
  const root = createRoot(el);
  root.render(<Intro {...attrs} />);
});
