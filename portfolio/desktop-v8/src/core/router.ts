/** G1 EX-006: pure, typed portfolio URL and History API boundaries. */
export const attributionPaths = [
  '/from/resume','/from/applications','/from/linkedin',
  '/from/outreach','/from/github',
] as const;

export type PortfolioHistory = {
  deonos: 1;
  app: string;
  project: string;
  group: string;
  tab: string;
  stack: [string, string][];
};

export function projectFromUrl(href: string, knownIds: readonly string[]): string | null {
  const candidate = new URL(href).searchParams.get('project');
  return candidate && knownIds.includes(candidate) ? candidate : null;
}

export function urlForProject(href: string, projectId: string | null): string {
  const url = new URL(href);
  if (projectId) url.searchParams.set('project', projectId);
  else url.searchParams.delete('project');
  return url.pathname + url.search + url.hash;
}

export function readPortfolioHistory(raw: unknown, knownIds: readonly string[]): PortfolioHistory | null {
  if (!raw || typeof raw !== 'object') return null;
  const value = raw as Partial<PortfolioHistory>;
  if (value.deonos !== 1 || typeof value.app !== 'string' ||
      typeof value.group !== 'string' || typeof value.tab !== 'string' ||
      typeof value.project !== 'string' || !knownIds.includes(value.project) ||
      !Array.isArray(value.stack)) return null;
  const stack: [string,string][] = [];
  for (const pair of value.stack) {
    if (!Array.isArray(pair) || pair.length !== 2 ||
        typeof pair[0] !== 'string' || typeof pair[1] !== 'string' ||
        !knownIds.includes(pair[1])) return null;
    stack.push([pair[0], pair[1]]);
  }
  return {deonos:1,app:value.app,project:value.project,group:value.group,tab:value.tab,stack};
}
