import { createRoot } from 'react-dom/client';
import HeroBlock from './HeroBlock.jsx';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-block="hero"]').forEach((el) => {
    console.log(el);
    const attrs = JSON.parse(atob(el.dataset.attributes));
    const root = createRoot(el);
    root.render(<HeroBlock {...attrs} />);
  });
});