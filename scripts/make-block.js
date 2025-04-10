import fs from 'fs';
import path from 'path';

const [, , rawName] = process.argv;

if (!rawName) {
  console.error('❌ Usage: npm run make:block <block-name>');
  process.exit(1);
}

const blockName = rawName.toLowerCase();
const blockComponent = blockName.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());

const srcDir = path.resolve('scripts/templates/block');
const destDir = path.resolve(`blocks/${blockName}`);

if (fs.existsSync(destDir)) {
  console.error(`❌ Block "${blockName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  const template = fs.readFileSync(path.join(srcDir, file), 'utf8')
    .replace(/__BLOCK_NAME__/g, blockName)
    .replace(/__BLOCK_COMPONENT__/g, blockComponent);

  const destFile = path.join(destDir, file.replace('__BLOCK_COMPONENT__', blockComponent));
  fs.writeFileSync(destFile, template, 'utf8');
}

console.log(`✅ Block "${blockName}" created in blocks/${blockName}`);

import { exec } from 'child_process';

exec('npm run buildblocks', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Build error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ ${stderr}`);
  }
  console.log('🚀 Block built successfully.');
});

