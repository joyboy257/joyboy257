import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const read = path => readFileSync(path, 'utf8');

test('active source keeps the same 21 case studies and lock on refresh', () => {
  const src = read('src/content/projects.ts');
  const entry = read('app.js');
  const html = read('index.html');
  const ids = [...src.matchAll(/\bid:"([^"]+)",name:"/g)].map(m => m[1]);
  assert.equal(ids.length, 21);
  assert.equal(new Set(ids).size, 21);
  assert.match(entry, /setLock\(true\)/);
  assert.doesNotMatch(entry, /sessionStorage/);
  assert.match(html, /id="lock-screen"/);
  assert.match(html, /src="\.\/src\/main\.ts"/);
  assert.match(html, /data-unlock-project="mirai"/);
});

test('source attribution and Vercel headers remain intact', () => {
  const cfg = JSON.parse(read('vercel.json'));
  assert.deepEqual(
    cfg.rewrites.map(r => r.source),
    ['/from/resume','/from/applications','/from/linkedin','/from/outreach','/from/github'],
  );
  assert.equal(cfg.rewrites.every(r => r.destination === '/index.html'), true);
  const keys = cfg.headers.flatMap(h => h.headers.map(x => x.key));
  assert.ok(keys.includes('Referrer-Policy'));
  assert.ok(keys.includes('X-Content-Type-Options'));
});

test('built static output includes all dynamic public assets, without React', () => {
  assert.equal(existsSync('dist/index.html'), true, 'run npm run build first');
  for (const file of ['analytics.js','icons.svg','vercel.json']) {
    assert.equal(existsSync(join('dist',file)), true, `missing ${file}`);
  }
  const html = read('dist/index.html');
  assert.match(html, /<script\b[^>]*type="module"/);
  assert.match(html, /assets\//);
  const outputJs = readdirSync('dist/assets').filter(f => f.endsWith('.js'));
  assert.ok(outputJs.length > 0, 'must ship a compiled ESM entry');
  const files = outputJs.map(f => read(join('dist/assets', f))).join('\n');
  assert.match(files, /Mirai/);
  assert.match(files, /Amelia Bot/);
  assert.doesNotMatch(html, /react-dom|next\//i);
});

test('the modular styles produce one CSS file and no leftover Unsplash dependency', () => {
  const outputs = readdirSync('dist/assets');
  const cssFiles = outputs.filter(path => path.endsWith('.css'));
  assert.equal(cssFiles.length, 1, 'Vite must bundle styles as one stylesheet');
  const result = read(join('dist/assets', cssFiles[0]));
  assert.match(result, /lock-mobile/);
  assert.match(result, /lock-desktop/);
  assert.doesNotMatch(result, /images\.unsplash\.com/);
  assert.equal(existsSync('dist/style.css'), false, 'obsolete standalone CSS must not ship');
});

test('case images always explain their purpose and fall back safely', () => {
  const app = read('app.js');
  const manifest = read('src/content/media-manifest.ts');
  const css = read('src/styles/70-evidence-media.css');
  assert.match(app, /function engineeringSnapshot/);
  assert.match(app, /data-project-media/);
  assert.match(app, /data-gallery-media/);
  assert.match(app, /addEventListener\('error'/);
  assert.doesNotMatch(app, /onerror="/);
  for (const label of ['Operator workspace', 'Sanitized workflow diagram', 'Prototype interface', 'Browser demo scene']) {
    assert.ok(manifest.includes(label), `missing meaningful image type: ${label}`);
  }
  assert.match(css, /media-unavailable/);
});

test('menu closing uses a collection, not one button', () => {
  const app = read('app.js');
  assert.match(app, /document\.querySelectorAll\("\[data-menu\]"\)\.forEach/);
  assert.doesNotMatch(app, /\$\("\[data-menu\]"\)\.forEach/);
});
