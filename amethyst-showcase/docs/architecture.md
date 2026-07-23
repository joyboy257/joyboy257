# Amethyst Architecture Case Study

## System objective

Amethyst allows AI-assisted work to use company knowledge without treating raw documents, generated summaries, or model confidence as organizational truth.

The Company Brain architecture separates six concerns:

1. **Evidence** — connected sources, documents, chunks, provenance, and freshness.
2. **Interpretation** — candidate claims, entities, metrics, policies, and relationships.
3. **Authority** — workspace membership, roles, policy effects, approval, and operator controls.
4. **Context** — persisted point-in-time packets compiled for a specific mission or surface.
5. **Work and learning** — AI-assisted outputs, proof, learning candidates, and explicit writeback.
6. **Operations** — observability, reconciliation, lifecycle controls, backup, restore, and rollback.

## High-level topology

```text
Connected sources and uploaded documents
                  │
                  ▼
          Company Memory evidence
 documents · chunks · provenance · freshness
                  │
                  ▼
       Candidate interpretation layer
 claims · entities · metrics · policies · links
                  │
                  ▼
          Policy and human review
 allow · deny · require review · require approval
                  │
                  ▼
        Approved Company Brain state
                  │
                  ▼
     Point-in-time context compilation
 approved facts · policies · gaps · stale · conflicts
                  │
                  ▼
      AI-assisted mission or preflight
                  │
                  ▼
          Result, proof, and evidence
                  │
                  ▼
     Learning candidate → approval → writeback
```

## Company Memory versus Company Brain

**Company Memory** stores source evidence. It answers questions such as:

- Which source produced this information?
- When was it synchronized?
- Which document and chunk support it?
- Is the source stale, failed, or incomplete?

**Company Brain** stores governed interpretation. It answers questions such as:

- Which claims are approved for operational use?
- Which policy applies to this mission?
- Which metric definition is authoritative?
- Which claim superseded an older claim?
- What is missing, stale, or contradictory?

The two systems coexist. Raw source nodes are never silently promoted into approved Brain claims.

## Context packets

Context compilation persists a point-in-time packet containing:

- approved claims and their evidence references;
- entities and relationships;
- approved metric definitions;
- policies and reusable policy decisions;
- missing context;
- stale context;
- contradictions;
- mission, goal, surface, purpose, and channel scope;
- compiler version and packet identity.

Persistence matters because mutable source data should not retroactively change the context used for an earlier decision.

## Policy and approval model

Policy effects use stable outcomes:

```text
allow
deny
require_review
require_approval
```

A direct API request cannot bypass a deny or review requirement. Approval decisions emit immutable audit-backed receipts containing actor, note, policy snapshots, authorization state, and writeback outcome.

## Two-phase learning writeback

A completed mission cannot directly update Company Brain.

```text
mission result
→ evidence and proof
→ learning candidate
→ approval packet
→ human or policy decision
→ separate explicit writeback
→ approved claim
```

Approval freezes the proposed claim. Writeback persists that frozen approved snapshot instead of recomputing from mutable mission or result rows.

The separation makes retry behavior, audit, and partial-failure recovery explicit.

## Transaction and idempotency boundaries

The system defines atomic boundaries for:

- approval state + generic audit + immutable Brain receipt;
- approved learning claim + candidate lifecycle + writeback audit;
- superseded claim + replacement candidate + bidirectional lineage + audit.

Server-owned identities make exact retries idempotent. Unique partial indexes prevent multiple root claims for one learning candidate and multiple replacements for one original claim.

## Operational controls

Three independent process-level capability gates control:

- new Company Brain mutations;
- learning writeback;
- source synchronization.

Production defaults remain fail-closed. Contradictory configuration rejects startup, and blocked operations return safe remediation without logging prompts, evidence, source text, credentials, or approval comments.

## Observability

The observability surface combines bounded process telemetry with live workspace and database state. It covers:

- context compilation count, latency, errors, and packet size;
- agent-context latency, token estimates, and draft-only rate;
- writeback success, failure, blocks, and replay;
- policy effects and operational block codes;
- audit projection latency;
- request latency and server errors;
- database lock errors;
- pending approval age;
- stale, failed, and pending source health;
- attention depth;
- database file size.

Logs use server-generated request IDs and safe route templates. Secrets and customer content are excluded from labels and logs.

## Data lifecycle and recovery

Lifecycle operations include:

- redacted provenance export;
- source and document deletion planning;
- manifest-bound destructive confirmation;
- transactionally propagated deletion cascades;
- content-free append-only deletion receipts;
- SQLite online backup;
- isolated restore rehearsal;
- deletion-tombstone replay;
- integrity, readiness, context compilation, and reconciliation checks.

The operating targets are an RPO of 24 hours and an RTO of 60 minutes.

## Release authority

Local tests, CI, protected staging, internal production, and external customer pilot are separate authority states.

The completed internal-production gate required:

- exact release identity;
- protected staging preflight;
- durable storage checks;
- backup and restore evidence;
- health and readiness;
- browser and Company Brain smoke tests;
- measured rollback;
- a full first-hour observation window;
- required CI checks;
- explicit operator acceptance.

External customer pilot and live provider writes remain separately unauthorized.

## Failure modes designed for

- stale, failed, or contradictory sources;
- direct policy bypass attempts;
- duplicate approvals and writeback retries;
- partial approval/receipt history;
- supersession conflicts;
- cross-workspace record probing;
- mutation attempts while capabilities are disabled;
- deleted evidence remaining in compiled snapshots;
- restore from a backup older than a deletion event;
- logs or metrics leaking customer content;
- release claims outrunning deployment evidence.

## Why this architecture matters

The difficult part of enterprise AI is not generating a plausible summary. It is deciding which information is sufficiently sourced, current, approved, scoped, and policy-compatible to influence work—and preserving evidence of that decision.