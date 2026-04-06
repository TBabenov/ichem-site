import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, '.htaccess');
const dest = resolve(root, 'dist', '.htaccess');

if (!existsSync(src)) {
  console.error('copy-htaccess: .htaccess not found at repo root');
  process.exit(1);
}

copyFileSync(src, dest);
console.log('copy-htaccess: copied .htaccess -> dist/.htaccess');
