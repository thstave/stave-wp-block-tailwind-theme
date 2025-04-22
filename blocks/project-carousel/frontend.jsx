import { createRoot } from 'react-dom/client';
import ProjectCarousel from './ProjectCarousel.jsx';

document.querySelectorAll('[data-block="project-carousel"]').forEach((el) => {
  const attrs = JSON.parse(atob(el.dataset.attributes));
  const root = createRoot(el);
  root.render(<ProjectCarousel  {...attrs}/>);
});
