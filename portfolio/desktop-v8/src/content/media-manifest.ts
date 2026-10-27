import type { MediaItem } from './project.schema.ts';
import { projects } from './projects.ts';

// A remote GitHub image is still NOT permission to republish a local copy.
// EX-008 will check rights before optimizing and localizing any artwork.
export const mediaItems: readonly MediaItem[] = projects.flatMap(project =>
  project.image ? [{
    projectId: project.id,
    url: project.image,
    alt: `${project.name} public product illustration`,
    provenance: 'public_repo_asset' as const,
    rightsVerified: false as const,
  }] : []
);
