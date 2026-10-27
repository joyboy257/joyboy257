import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const read = path => readFileSync(path, 'utf8');

test('active source keeps the same 21 case studies and lock on refresh', () => {
  const src = read('app.js');
  const html = read('index.html');
  const ids = [...src.matchAll(/\bid:"([^"]+)",name:"/g)].map(m => m[1]);
  assert.equal(ids.length, 21);
  assert.equal(new Set(ids).size, 21);
  assert.match(src, /setLock\(true\)/);
  assert.doesNotMatch(src, /sessionStorage/);
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
