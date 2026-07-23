# Architecture

Amethyst Company Brain separates raw evidence from governed organizational knowledge.

## System boundary

```text
Connected sources
      ↓
Company Memory evidence
      ↓
Candidate claims · entities · metrics · policies
      ↓
Policy evaluation + human approval
      ↓
Approved governed knowledge
      ↓
Point-in-time context packets
      ↓
AI missions, creative preflight, and operator workflows
      ↓
Results, proof, learning candidates, explicit writeback
```

The AI layer can interpret evidence, draft proposals, and assemble context. It does not directly promote conclusions into reusable company truth.

## Core components

- **Web application:** operator workflows for sources, documents, claims, policies, context packets, approvals, proof, and learning.
- **API service:** authenticated, workspace-scoped routes for governed knowledge and operational controls.
- **Repository layer:** transactional SQLite-backed domain repositories and immutable audit history.
- **Context compiler:** persists point-in-time packets containing approved claims, metrics, policies, policy decisions, missing context, stale context, and contradictions.
- **Learning pipeline:** creates a candidate, obtains approval, freezes the accepted proposal, and performs a separate idempotent writeback.
- **Operations layer:** kill switches, safe telemetry, backup/restore, lifecycle controls, staged deployment, smoke checks, and rollback.

## Transaction model

Three important invariants are committed atomically:

1. Approval state, decision audit, and immutable decision receipt.
2. Approved learning claim, candidate lifecycle, and writeback audit.
3. Superseded claim, replacement candidate, bidirectional lineage, and audit.

Retry identity is owned by the server. Repeating the same accepted mutation returns the committed result; attempting to reuse an identity for a different mutation fails rather than silently changing history.

## Context lifecycle

A compiled context packet is a historical artifact, not a live query alias. It records what approved information and policy applied to a task at that time. This prevents later source edits from rewriting the basis of an earlier decision.

## Safety posture

- Workspace identity is checked before by-ID reads or writes.
- Cross-workspace existence fails as not found.
- Policy effects are enforced server-side.
- Production mutation capabilities default to disabled.
- Unsafe or contradictory configuration fails startup.
- Logs and metrics exclude source text, evidence, prompts, credentials, and approval comments.
- External customer access and live provider writes remain separate authorization gates.
