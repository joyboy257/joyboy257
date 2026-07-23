# Amethyst Engineering Evidence

## Why verification is part of the product

A governed knowledge system can fail while every page renders and every model response looks plausible. Verification must cover state, policy, approval, provenance, workspace isolation, retry behavior, lifecycle operations, deployment, recovery, and claim truthfulness.

Amethyst uses several evidence classes:

- deterministic unit and repository tests;
- API and transaction tests;
- workspace-isolation and authorization tests;
- Playwright browser journeys across desktop and mobile;
- fault-injection and partial-history reconciliation tests;
- observability and redaction tests;
- backup, restore, deletion, and tombstone-replay checks;
- protected staging, canary, rollback, and observation gates.

## Implemented production program

The Company Brain production-readiness program completed CBR-PROD-00 through CBR-PROD-07.

| Evidence item | Recorded result |
| --- | ---: |
| Production-readiness program | **CBR-PROD-00 through CBR-PROD-07 complete** |
| Health and readiness | **200 / 200** during release verification |
| Measured rollback | **40 seconds** |
| Rollback objective | **60 minutes** |
| Observation checkpoints | **0 / 5 / 15 / 30 / 60 minutes** |
| Internal production deployment | **Completed** |
| External customer pilot | **Not authorized** |
| Live provider/channel writes | **Disabled** |

The distinction between internal deployment and external pilot is deliberate. Passing repository and infrastructure gates does not authorize customer-data use or live provider effects.

## Evidence categories

### Governance and policy

- candidate claims do not enter compiled context before approval;
- policy effects are enforced server-side;
- direct API calls cannot bypass deny or review requirements;
- approval authorizes but does not execute learning writeback;
- immutable decision receipts preserve actor and policy snapshots;
- supersession retains bidirectional lineage.

### Transaction and idempotency

- approval state, audit, and receipt commit atomically;
- learning claim, candidate lifecycle, and writeback audit commit atomically;
- exact retries return prior outcomes rather than duplicate state;
- conflicting retry payloads fail rather than silently replay;
- unique indexes protect one root claim and one replacement invariant;
- nested transaction failure makes the outer transaction rollback-only.

### Workspace isolation

- every route requires an authenticated workspace context;
- by-ID access returns not-found rather than leaking cross-workspace existence;
- repository queries are workspace-scoped;
- lifecycle operations leave other workspaces intact;
- observability is workspace-scoped and content-minimized.

### Context and learning

- context packets persist approved claims, policies, gaps, stale context, and contradictions;
- packets retain compiler version, scope, and point-in-time identity;
- learning packets include mission, result, proof, evidence, proposed claim, conflicts, and policy decision;
- approved writeback uses the frozen proposal rather than mutable source rows;
- reopened context and artifacts retain packet lineage.

### Browser and product proof

Playwright journeys exercise:

- sources and document inspection;
- chunks and evidence panels;
- context packet inspection;
- mission result and proof lineage;
- creative preflight compilation;
- persisted Agent Context snapshots;
- approval packets and learning flows;
- mobile sheets and desktop context panels;
- console and page-error collection.

### Operational controls

- invalid capability combinations fail startup;
- mutation, writeback, and source synchronization can be independently disabled;
- blocked operations emit safe codes and remediation;
- committed exact retries remain readable after writes are disabled;
- logs redact authorization and credential headers;
- metrics avoid claim text, evidence, prompts, and customer content.

### Lifecycle and recovery

- exports contain classifications, sizes, and digests rather than raw content;
- deletion requires a manifest-bound confirmation phrase;
- append-only receipts contain only hashed identities and row counts;
- ledger failure rolls back deletion;
- deletion cascades remove derived content and compiled snapshots;
- backup and restore rehearsal include integrity, readiness, context, export, and reconciliation checks;
- restored backups replay deletion tombstones.

### Release evidence

The protected release gate combined:

- preflight and configuration validation;
- backup and isolated restore rehearsal;
- production-topology deployment;
- health and readiness checks;
- Company Brain and browser smoke tests;
- measured rollback;
- synthetic canary observation;
- required CI checks;
- named operator acceptance.

## Truthfulness model

Amethyst keeps these states separate:

```text
planned
→ implemented
→ test-covered
→ integrated
→ protected staging
→ internal production
→ external pilot authorized
→ externally verified
```

No lower state implies a higher one.

## What this demonstrates

- production-grade human-in-the-loop AI governance;
- policy and approval enforcement beyond prompt instructions;
- transaction and idempotency design;
- workspace-scoped product and API architecture;
- evidence-bound context engineering;
- browser-level verification of complex operational flows;
- deletion, backup, restore, and rollback engineering;
- disciplined separation of technical evidence and customer claims.