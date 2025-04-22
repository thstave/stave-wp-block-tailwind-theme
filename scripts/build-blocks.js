// scripts/build-blocks.js
import { build } from 'vite';
import path from 'path';
import fs from 'fs';

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
  '@wordpress/components',
  '@wordpress/data' 
];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@wordpress/blocks': 'wp.blocks',
  '@wordpress/block-editor': 'wp.blockEditor',
  '@wordpress/editor': 'wp.editor',
  '@wordpress/element': 'wp.element',
  '@wordpress/i18n': 'wp.i18n',
  '@wordpress/components': 'wp.components',
  '@wordpress/data': 'wp.data' 
};


const buildBlock = async (name, entry, outputFile, isEditor = false) => {
  const jsSafeName = name.replace(/[^a-zA-Z0-9_$]/g, '_');

  console.log(`📦 Building ${outputFile}...`);

  await build({
    configFile: 'vite.config.js', // Tell Vite to load plugins from here
    mode: 'production',
    define: {
      'process.env.BLOCK_BUILD_TARGET': JSON.stringify(isEditor ? 'editor' : 'frontend'),
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
    }
  });
};

(async () => {
  for (const folder of blockFolders) {
    const dir = path.join(blocksDir, folder);
    const editor = path.join(dir, 'editor.jsx');
    const frontend = path.join(dir, 'frontend.jsx');

    if (fs.existsSync(editor)) {
      await buildBlock(`${folder}-editor`, editor, `${folder}-editor.bundle.js`, true);
    }
    if (fs.existsSync(frontend)) {
      await buildBlock(`${folder}-frontend`, frontend, `${folder}-frontend.bundle.js`, false);
    }
  }
})();
