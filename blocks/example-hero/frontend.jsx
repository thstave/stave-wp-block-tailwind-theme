import { createRoot } from 'react-dom/client';
import ExampleHeroBlock from './ExampleHeroBlock.jsx';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('[data-block="example-hero"]').forEach((el) => {

    const attrs = JSON.parse(atob(el.dataset.attributes));
    const root = createRoot(el);
    root.render(<ExampleHeroBlock {...attrs} />);
  });
});