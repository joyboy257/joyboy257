import type { EvidenceItem, EvidenceStatus, ProjectId } from './project.schema.ts';
import { projects } from './projects.ts';

// Explicit conservative labels. A public GitHub link proves a destination
// exists; it does NOT independently validate business impact or adoption.
export const evidenceStatuses: Readonly<Record<ProjectId, EvidenceStatus>> = {
  mirai: 'internal_tested',
  amelia: 'production_client_used',
  soleil: 'blocked',
  slate: 'prototype',
  corpa: 'prototype',
  workos: 'prototype',
  amethyst: 'internal_tested',
  verticals: 'prototype',
  agentos: 'prototype',
  atlas: 'prototype',
  dreamcraft: 'prototype',
  rustyindex: 'research',
  heidi: 'research',
  propframe: 'prototype',
  ami: 'prototype',
  sole: 'prototype',
  openbrain: 'prototype',
  singnote: 'prototype',
  pokerai: 'research',
  tradedesk: 'research',
  mototiam: 'prototype',
};

export const evidenceItems: readonly EvidenceItem[] = projects.map(project => ({
  id: `case:${project.id}`,
  projectId: project.id,
  title: `${project.name} case-study evidence`,
  status: evidenceStatuses[project.id],
  verification: project.link ? 'public_repo' : 'owner_statement',
  ...(project.link ? {url: project.link} : {}),
  description: project.proof,
}));
