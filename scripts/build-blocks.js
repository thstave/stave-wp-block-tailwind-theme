
import { build } from 'vite';
import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import cssInjected from 'vite-plugin-css-injected-by-js'; 


const blocksDir = path.resolve('blocks');
const blockFolders = fs.readdirSync(blocksDir).filter(name =>
  fs.statSync(path.join(blocksDir, name)).isDirectory()
);

const external = [
  'react',
  'react-dom',
  '@wordpress/blocks',
  '@wordpress/block-editor',
  '@wordpress/editor',
  '@wordpress/element',
  '@wordpress/i18n',
  '@wordpress/components'
];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@wordpress/blocks': 'wp.blocks',
  '@wordpress/block-editor': 'wp.blockEditor',
  '@wordpress/editor': 'wp.editor',
  '@wordpress/element': 'wp.element',
  '@wordpress/i18n': 'wp.i18n',
  '@wordpress/components': 'wp.components'
};

const buildBlock = async (name, entry, outputFile) => {
  const jsSafeName = name.replace(/[^a-zA-Z0-9_$]/g, '_');

  await build({
    configFile: false,
    css: {
      postcss: './postcss.config.js' // enables Tailwind + autoprefixer
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist',
      lib: {
        entry,
        name: jsSafeName,
        formats: ['iife'],
        fileName: () => outputFile
      },
      rollupOptions: {
        external,
        output: {
          globals
        }
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    plugins: [
      react({ jsxRuntime: 'classic' }),
      cssInjected() // Injects per-block CSS into JS bundle
    ]
  });
  
};

(async () => {
  for (const folder of blockFolders) {
    const dir = path.join(blocksDir, folder);
    const editor = path.join(dir, 'editor.jsx');
    const frontend = path.join(dir, 'frontend.jsx');

    if (fs.existsSync(editor)) {
      await buildBlock(`${folder}-editor`, editor, `${folder}-editor.bundle.js`);
    }
    if (fs.existsSync(frontend)) {
      await buildBlock(`${folder}-frontend`, frontend, `${folder}-frontend.bundle.js`);
    }
  }
})();