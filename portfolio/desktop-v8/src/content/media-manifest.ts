import type { MediaItem, MediaKind, ProjectId } from './project.schema.ts';
import { projects } from './projects.ts';

// Public UI images demonstrate appearances; sanitized diagrams are not live client screenshots.
const editorial: Partial<Record<ProjectId, {kind:MediaKind;label:string;context:string;alt:string}>> = {
  mirai:{kind:'interface_capture',label:'Operator workspace',context:'A public interface view, not proof of customer adoption.',alt:'Mirai operator workspace shown in public documentation'},
  amelia:{kind:'sanitized_workflow_diagram',label:'Sanitized workflow diagram',context:'Telegram, n8n and document handoffs using non-client labels.',alt:'Amelia Bot sanitized Telegram intake and document workflow diagram'},
  amethyst:{kind:'sanitized_product_diagram',label:'Sanitized product overview',context:'Company context and review diagram, not live customer data.',alt:'Amethyst company intelligence and claim review diagram'},
  agentos:{kind:'prototype_interface',label:'Prototype interface',context:'Public agent canvas interface, not proof of production hosting.',alt:'AgentOS prototype agent canvas interface'},
  dreamcraft:{kind:'demo_scene',label:'Browser demo scene',context:'Playable world capture, not a performance benchmark.',alt:'DreamCraft browser world from the public demo'},
};
export const mediaItems: readonly MediaItem[] = projects.flatMap(project => {
  if (!project.image) return [];
  const role = editorial[project.id];
  if (!role) throw new Error(`Media needs a documented purpose: ${project.id}`);
  return [{projectId:project.id,url:project.image,...role,provenance:'public_repo_asset' as const,rightsVerified:false as const}];
});
