import { projects } from '../src/content/projects.ts';
import { evidenceItems, evidenceStatuses } from '../src/content/evidence-manifest.ts';
import { mediaItems } from '../src/content/media-manifest.ts';
import { visualInsights } from '../src/content/visual-insights.ts';
import type { ProjectId } from '../src/content/project.schema.ts';

const fail = (detail: string): never => { throw new Error(`Content validation: ${detail}`); };
const ids = new Set<ProjectId>();
const allowed = new Set(['github.com', 'usemirai.app', 'www.usemirai.app']);

if (projects.length !== 21) fail(`expected 21 cases, found ${projects.length}`);
if (Object.keys(visualInsights).length !== 21) fail('every case needs a media-free engineering focus');
for (const project of projects) {
  const summary = visualInsights[project.id];
  if (!summary || summary.trim().length < 24 || summary.length > 82) fail(`bad technical focus for ${project.id}`);
}

for (const [index, project] of projects.entries()) {
  if (!project.id || !project.name || !project.summary ||
      !project.challenge || !project.contribution || !project.proof || !project.limits) {
    fail(`missing required copy: ${project.id || index}`);
  }
  if (ids.has(project.id)) fail(`duplicate project id: ${project.id}`);
  ids.add(project.id);
  if (project.rank !== index + 1) fail(`rank/order mismatch for ${project.id}`);
  if (!project.flags.length || !project.flags.every(role => ['ai', 'fde', 'swe'].includes(role))) {
    fail(`unsupported role tag for ${project.id}`);
  }
  for (const candidate of [project.link, project.website, project.demo]) {
    if (!candidate) continue;
    let url: URL;
    try { url = new URL(candidate); } catch { fail(`bad URL: ${project.id}`); }
    if (url!.protocol !== 'https:' || !allowed.has(url!.hostname) ||
        url!.username || url!.password) fail(`unapproved destination: ${project.id}`);
  }
  if (!(project.id in evidenceStatuses)) fail(`missing evidence classification: ${project.id}`);
}

if (evidenceItems.length !== 21) fail('incomplete evidence manifest');
if (new Set(evidenceItems.map(item => item.id)).size !== 21) fail('duplicate evidence ids');
if (evidenceItems.filter(item => item.url).length !== 11) fail('expected 11 public case destinations');
for (const item of evidenceItems) {
  if (!ids.has(item.projectId)) fail(`orphan evidence ${item.id}`);
  if (!item.description) fail(`missing evidence description: ${item.id}`);
  if (item.verification === 'public_repo' && !item.url) fail(`public label lacks link: ${item.id}`);
}
if (mediaItems.length !== 5) fail('expected 5 public media references');
for (const item of mediaItems) {
  if (!ids.has(item.projectId) || !item.alt.trim() || !item.label.trim() || !item.context.trim()) fail(`invalid media ${item.projectId}`);
  const image = new URL(item.url);
  if (image.protocol !== 'https:' || image.hostname !== 'raw.githubusercontent.com') {
    fail(`unapproved media origin: ${item.projectId}`);
  }
  if (item.rightsVerified) fail(`image rights unsupported: ${item.projectId}`);
  if (!['interface_capture','sanitized_workflow_diagram','sanitized_product_diagram','prototype_interface','demo_scene'].includes(item.kind)) fail(`missing media purpose: ${item.projectId}`);
}
console.log('Verified 21 unique case records, 11 public links and 5 rights-pending images.');
