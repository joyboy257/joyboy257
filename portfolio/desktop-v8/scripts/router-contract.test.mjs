import test from 'node:test';
import assert from 'node:assert/strict';
import { projectFromUrl, urlForProject, readPortfolioHistory, attributionPaths } from '../src/core/router.ts';

const known=['mirai','amelia','soleil'];

test('project deep links are strictly allowlisted and preserve attribution paths', () => {
  assert.equal(projectFromUrl('https://portfolio.test/?project=mirai',known),'mirai');
  assert.equal(projectFromUrl('https://portfolio.test/?project=unknown',known),null);
  assert.equal(projectFromUrl('https://portfolio.test/from/resume?project=amelia',known),'amelia');
  assert.equal(attributionPaths.length,5);
});

test('URL updates only touch the project query', () => {
  const start='https://portfolio.test/from/resume?ref=job123&project=mirai#portfolio';
  assert.equal(urlForProject(start,'amelia'),'/from/resume?ref=job123&project=amelia#portfolio');
  assert.equal(urlForProject(start,null),'/from/resume?ref=job123#portfolio');
});

test('invalid history cannot inject a nonexistent case or bad stack', () => {
  const good={deonos:1,app:'finder',project:'mirai',group:'all',tab:'case',stack:[['finder','mirai']]};
  assert.deepEqual(readPortfolioHistory(good,known),good);
  assert.equal(readPortfolioHistory({...good,project:'injected'},known),null);
  assert.equal(readPortfolioHistory({...good,stack:[['finder','xss']]},known),null);
  assert.equal(readPortfolioHistory(null,known),null);
});
