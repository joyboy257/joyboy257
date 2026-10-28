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
  for (const file of ['analytics.js','icons.svg','vercel.json','favicon.svg']) {
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

test('desktop styles remain one bundle; resume styles are loaded only on the resume page', () => {
  const outputs = readdirSync('dist/assets');
  const cssFiles = outputs.filter(path => path.endsWith('.css'));
  const desktop = cssFiles.filter(file => read(join('dist/assets',file)).includes('lock-mobile'));
  const resume = cssFiles.filter(file => !read(join('dist/assets',file)).includes('lock-mobile'));
  assert.equal(desktop.length, 1, 'desktop must have one stylesheet');
  assert.equal(resume.length, 1, 'resume must have one separate stylesheet');
  const desktopCss = read(join('dist/assets',desktop[0]));
  assert.match(desktopCss,/lock-desktop/);
  assert.doesNotMatch(desktopCss,/images\.unsplash\.com/);
  const home = read('dist/index.html');
  assert.ok(!home.includes(resume[0]), 'resume CSS must not slow first lock screen');
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
  const dismiss = app.slice(app.indexOf('function dismissMenu('), app.indexOf('function showMenu('));
  assert.match(dismiss, /document\.querySelectorAll\("\[data-menu\]"\)\.forEach/);
  assert.doesNotMatch(dismiss, /\$\("\[data-menu\]"\)\.forEach/);
});

test('retired G0-era scripts and styles never enter the build', () => {
  const obsolete = ["apple-hig.css","experience.css","experience.js","icons.js","ios.css","ios.js","polish.css"];
  const entry = read('index.html');
  for (const file of obsolete) {
    assert.equal(existsSync(file), false, `obsolete source still exists: ${file}`);
    assert.equal(existsSync(join('dist', file)), false, `obsolete asset unexpectedly shipped: ${file}`);
    assert.ok(!entry.includes('src="./'+file+'"'), `HTML references obsolete JS: ${file}`);
    assert.ok(!entry.includes('href="./'+file+'"'), `HTML references obsolete CSS: ${file}`);
  }
});

test('decorative status icons have no broken ARIA labels', () => {
  const html = read('index.html');
  assert.match(html, /class="mac-system-icons" aria-hidden="true"/);
  assert.match(html, /class="phone-signal" aria-hidden="true"/);
});

test('recruiter actions exist before unlock and resume is separate from desktop JS', () => {
  const html = read('index.html');
  const resume = read('resume.html');
  const app = read('app.js');
  assert.match(html, /class="lock-resume-link" href="\/resume\.html"/);
  assert.match(html, /data-unlock-app="welcome"/);
  assert.match(html, /recruiter-widget/);
  assert.match(app, /function welcome\(\)/);
  assert.match(resume, /Deon Quek/);
  assert.match(resume, /name="viewport"/);
  assert.equal(existsSync('dist/resume.html'), true);
});
