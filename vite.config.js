// vite.config.js
import react from '@vitejs/plugin-react';
import cssInjected from 'vite-plugin-css-injected-by-js';

export default ({ mode }) => {
  const isEditor = process.env.BLOCK_BUILD_TARGET === 'editor';

  return {
    plugins: [
      react({ jsxRuntime: 'classic' }),
      cssInjected()
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode || 'production')
    },
    build: {
      sourcemap: isEditor, // Only generate sourcemaps for editor if you want
      minify: !isEditor    // Skip minify for editor (faster rebuild)
    }
  };
};
