# Amethyst Product Tour

## The 90-second recruiter path

### 1. Start at Company Brain

Show the operator overview:

- connected sources and sync health;
- governed claims and their statuses;
- stale or conflicting knowledge;
- attention items requiring review;
- compiled context packets.

**Explain:** source evidence and approved organizational truth are different product objects.

### 2. Inspect a source document

Open a document and its right context panel:

- provenance and source identity;
- freshness and synchronization state;
- chunks and token estimates;
- claim links and evidence excerpts;
- derived relationships.

**Explain:** the system keeps the evidence inspectable rather than replacing it with a model summary.

### 3. Open a context packet

Show a persisted packet containing:

- approved claims;
- policies and policy decisions;
- missing context;
- stale context;
- contradictions;
- mission or surface scope;
- compiler version and packet identity.

**Explain:** the AI receives a point-in-time snapshot, so later source changes do not rewrite the context behind an earlier decision.

### 4. Review a learning approval packet

Show:

- the mission and result;
- proof and evidence;
- the proposed claim;
- conflicts and policy decision;
- approval, denial, and explicit writeback effects.

**Explain:** approval does not silently update Company Brain. Writeback is a separate idempotent action.

### 5. Show operational readiness

Open the capabilities or observability surface:

- mutation, learning-writeback, and source-sync gates;
- context compilation telemetry;
- pending approval age;
- source health and attention depth;
- backup, restore, canary, and rollback status.

**Explain:** the system can fail closed and remain inspectable before broader use is authorized.

## Product surfaces represented in this showcase

| Surface | What it proves |
| --- | --- |
| Company Brain overview | Product coherence across evidence, governed truth, and attention |
| Source/document panel | Provenance, freshness, chunks, and inspectable evidence |
| Context packet panel | Point-in-time, mission-scoped AI context |
| Approval packet | Human authority, policy, proof, and two-phase learning |
| Creative preflight | Governed context reaching an AI-assisted workflow |
| Observability | Operational health without content leakage |
| Lifecycle controls | Deletion, export, backup, restore, and recovery |
| Release gates | Deployment and rollback are separate authority states |

## Recommended screenshots

Use synthetic demo data only. Capture at 1440×900 unless otherwise noted:

1. `company-brain-overview.png`
2. `document-evidence-panel.png`
3. `context-packet-lineage.png`
4. `learning-approval-packet.png`
5. `creative-preflight.png`
6. `observability-and-capabilities.png`
7. `mobile-source-sheet.png` at 390×844

Before publishing, inspect every image for names, document text, credentials, host details, and internal identifiers.