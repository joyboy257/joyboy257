/** G1 EX-005: current public case-file model; keep editorial claims unchanged. */
export type ProjectId =
  | 'mirai'
  | 'amelia'
  | 'soleil'
  | 'slate'
  | 'corpa'
  | 'workos'
  | 'amethyst'
  | 'verticals'
  | 'agentos'
  | 'atlas'
  | 'dreamcraft'
  | 'rustyindex'
  | 'heidi'
  | 'propframe'
  | 'ami'
  | 'sole'
  | 'openbrain'
  | 'singnote'
  | 'pokerai'
  | 'tradedesk'
  | 'mototiam';

export type Role = 'ai' | 'fde' | 'swe';
export type ProjectGroup = 'ai' | 'delivery' | 'products' | 'research';
export type EvidenceStatus = 'production_client_used' | 'released' |
  'internal_tested' | 'prototype' | 'research' | 'blocked';
export type EvidenceVerification = 'public_repo' | 'public_demo' |
  'internal_receipt' | 'owner_statement';

export type EvidenceItem = {
  id: string;
  projectId: ProjectId;
  title: string;
  status: EvidenceStatus;
  description: string;
  verification: EvidenceVerification;
  url?: string;
};

export type PortfolioProject = {
  id: ProjectId;
  name: string;
  group: ProjectGroup;
  glyph: string;
  tone: string;
  rank: number;
  flags: Role[];
  stage: string;
  scope: string;
  tags: string[];
  facts: string[];
  summary: string;
  challenge: string;
  contribution: string;
  engineering: string[];
  proof: string;
  limits: string;
  link?: string | null;
  linkLabel?: string;
  website?: string;
  demo?: string;
  image: string | null;
  mood: string;
};

export type MediaKind = 'interface_capture' | 'sanitized_workflow_diagram' |
  'sanitized_product_diagram' | 'prototype_interface' | 'demo_scene';
export type MediaItem = {
  projectId: ProjectId;
  url: string;
  alt: string;
  kind: MediaKind;
  label: string;
  context: string;
  provenance: 'public_repo_asset';
  rightsVerified: false;
};
