# Amelia Bot — Current Production and Hardening Architecture

<p align="center">
  <img src="assets/authority-model.svg" alt="Amelia Bot current production architecture and PostgreSQL-centred hardening target" width="100%" />
</p>

## Evidence language used in this document

| Label | Meaning |
| --- | --- |
| **Production current** | Observed in the active workflow estate and part of the staff-used operating path. |
| **Architecture direction** | Accepted target boundary for remediation, but not proof that production has been cut over. |
| **Test-verified inactive** | Proven in source-controlled tests or an isolated database and represented by an inactive n8n workflow with no production callers. |
| **Planned / unresolved** | Diagnosed requirement that still needs implementation, runtime proof, or cutover authority. |

This distinction is central to the case study. Amelia's production path and its cleaner target architecture are not the same thing yet.

## Current production objective

The active system helps staff turn Telegram intake messages and uploaded files into organised case operations:

- capture and parse intake details;
- maintain a working intake/session context;
- accept and stage files;
- support lifecycle and status commands;
- move intended files into final Google Drive folders;
- enrich finalised cases with extracted context and file-checklist information;
- append operational tracking and PostgreSQL KB records;
- return staff-facing Telegram outcomes.

The current system is a collection of cooperating n8n workflows rather than one clean service boundary.

## Current production topology

```text
Staff Telegram messages, commands and files
                    │
                    ▼
         Main Telegram Intake workflow
     parsing · aliases · routing · command policy
                    │
       ┌────────────┼──────────────┬────────────────┐
       ▼            ▼              ▼                ▼
Process Intake   State Manager   File acceptance   Status/context
session start    draft/lifecycle ingress/jobs      support
and temp Drive   state/SQL       duplicate handling
       └────────────┼──────────────┘
                    ▼
          Staged-file finalisation
 case resolution · Drive movement · receipts · upserts
                    │
                    ▼
          Post-finalisation enrichment
  AI extraction · police-report context · file checklist
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
    Google Drive  Sheets   PostgreSQL KB
    actual files  tracker  cases/documents/events
                    │
                    ▼
            Telegram outcome
```

### Current production truth

- **Main remains authoritative** for Telegram parsing and routing.
- **n8n workflows still contain substantial application logic**, including dynamic SQL and large Code-node responsibilities.
- **Google Drive stores the actual files.**
- **Google Sheets remains an operational tracker.**
- **PostgreSQL KB records link cases, documents, extracted facts, events, and review decisions**, but the complete production estate has not yet converged on PostgreSQL as its sole transaction authority.
- **n8n execution history is operational evidence, not sufficient proof of a canonical business mutation.**

## Current workflow responsibilities

| Production area | Responsibilities observed in the active estate |
| --- | --- |
| **Main intake** | Telegram update parsing, aliases, command identity, routing, state-changing policy, summary interpretation, and file normalisation. |
| **Process intake** | Caller/session handling, working-session reservation or load, temporary Drive-folder creation, and persistence. |
| **Intake state manager** | Start, load, update, cancel, claim, stage, failure, reconciliation, status, and projection SQL. |
| **File acceptance and ingress** | Delivery/file identity checks, ingress receipt, file event creation, and processing-job registration. |
| **Staged-file finalisation** | Case resolution, ledger loading, Drive movement, provider receipts, document upsert, and session finalisation. |
| **Enrichment** | AI-assisted extraction, police-report context, and file-checklist interpretation after finalisation. |
| **Tracking and KB** | Google Sheets updates plus PostgreSQL cases, documents, extractions, and event records. |

## State model: distributed, not unified

The production estate supports capabilities such as:

- new intake and current-context handling;
- draft summary updates;
- file receipt, staging, and finalisation;
- hold, pending, resume, drop, and cancel commands;
- status, failure, recovery, and reconciliation paths;
- terminal finalised, cancelled, or superseded conditions.

These behaviours are currently spread across Main, support workflows, the state manager, file workflows, and finalisation logic. This showcase does **not** claim that one canonical production state machine already governs every path.

That fragmentation is one of the central problems the refactor is addressing.

## Current AI boundary

AI is used for bounded interpretation and enrichment, including:

- extracting structured context from finalised case material;
- interpreting police-report or document content;
- producing file-checklist and missing-document context;
- candidate classification and summary assistance where appropriate.

The actual files remain in Google Drive. Staff and deterministic workflow rules retain authority over final case handling and externally visible actions.

The public showcase does not claim that every intake decision is made by an LLM or that all model output already passes through one universal typed contract.

## Accepted hardening direction

The governing target is:

```text
PostgreSQL
= durable business state, transaction authority, idempotency, evidence,
  receipts, reconciliation and recovery

n8n
= bounded orchestration, dispatch and provider adapters

Telegram / Google Drive / email / Sheets
= external interfaces and side-effect systems
```

The purpose is not merely to move large Code nodes into child workflows. Hidden application services and generated SQL must become small source-controlled modules and versioned PostgreSQL functions with explicit authority.

## Hardening topology

```text
Telegram update
      │
      ▼
Deterministic edge normalisation and command routing
      │
      ▼
Bounded domain controller
      │
      ├── deterministic parser / validation
      ├── PostgreSQL function for durable transition
      └── provider-send-disabled result contract
      │
      ▼
Existing provider workflow performs the approved side effect
      │
      ▼
Provider receipt and durable reconciliation evidence
```

## Actual hardening status

| Component | Status | What is true |
| --- | --- | --- |
| **Deterministic source toolchain** | Implemented | Exact workflow export, source extraction, deterministic generation, validation/comparison, deployment preview, and rollback payloads exist. |
| **Telegram edge shadow** | Verified, non-authoritative | A normaliser, registry router, and shadow orchestrator passed a 69-case parity corpus with zero unexpected differences and zero side-effect violations. Main remains authoritative. |
| **New Case Controller** | Inactive candidate | Generated and validated; no production callers; not cut over. |
| **Summary Controller** | Test-verified inactive | PostgreSQL summary functions passed isolated transaction tests; live workflow is inactive with zero callers and zero executions. |
| **File Intake Controller** | Inactive candidate | Generated and validated; duplicate and provider-receipt runtime proof remains a later slice. |
| **Existing Case File Controller** | Inactive candidate | Generated and validated; current `/sendfile` movement remains in the existing staged-file workflow. |
| **Lifecycle Controller** | Inactive candidate | Generated and validated; concurrent lifecycle transition proof and production cutover remain outstanding. |
| **Finalisation decomposition** | Unresolved later work | Existing staged-file movement and finalisation remain heavy application services. |

## Verified summary-slice authority

Only the replacement summary parsing/save slice currently has isolated PostgreSQL runtime proof.

The verified contract includes:

- a first save creates version 1;
- a legitimate edit creates the next version;
- exact replay returns the original version without another mutation;
- key, transport, command, operation, and bound-session collisions are blocked;
- stale state, wrong scope, wrong target, and malformed parsed summaries are blocked;
- concurrent edits receive distinct versions;
- writes are allowed only in permitted intake states;
- terminal, cancelled, or superseded states reject edits;
- failures leave no partial summary version, binding, or session mutation.

The generated controller is deliberately provider-send-disabled. It contains no Telegram sender or Google Drive node.

### What this does not prove

It does not prove that:

- production Main uses the replacement controller;
- every production operation has the same exact-replay contract;
- file ingress and finalisation are already protected by content-hash deduplication and high-water marks;
- all provider partial-success paths are reconciled safely;
- the complete estate has one canonical PostgreSQL ledger;
- production cutover is authorised.

## Idempotency: current truth versus target

### Current production

The live workflow estate contains deduplication, ledgers, status, and reconciliation logic across multiple workflows and data surfaces. Live inspection found that command identity, file identity, state, provider effects, and finalisation ownership are not yet represented by one universal operation contract.

### Target contract

The stabilisation programme aims for:

```text
one business operation
→ one canonical PostgreSQL identity
→ one consistent state result
→ at most one external side effect
→ durable provider receipt
→ deterministic replay result
→ bounded recovery
→ auditable terminal state
```

For file intake, later work must distinguish:

- raw Telegram-delivery identity;
- Telegram-file identity;
- canonical evidence identity;
- file-content identity;
- revised or intentionally repeated evidence.

For finalisation, a high-water mark must define which files belong to one send/finalise request under concurrent arrival.

These are accepted reliability requirements, not completed production claims.

## Provider partial success

The target behaviour is:

```text
known provider success  → record receipt and complete
known provider failure  → retry under policy
uncertain provider state → reconcile before another effect
missing durable intent   → stop before effect where possible
```

The stabilisation programme explicitly forbids blind resends when provider outcome is unknown. Full provider-interruption certification remains outstanding for later slices.

## Observability and evidence

| Surface | Current use | Limitation |
| --- | --- | --- |
| **n8n execution history** | Trace node paths, provider calls, errors, retries, and duration. | Does not independently prove durable business completion. |
| **State/ledger tables** | Track intake, file, job, notification, or KB state depending on the workflow. | Authority is still distributed and needs convergence. |
| **Google Drive metadata** | Proves file and folder provider results. | Must be reconciled with internal state after uncertain effects. |
| **Google Sheets** | Operational tracking used by the team. | Is not the intended long-term canonical database. |
| **PostgreSQL KB** | Links cases, documents, extractions, and normalised events. | Full estate convergence and cutover remain incomplete. |
| **Source-control evidence** | Exact generated workflows, tests, comparisons, manifests, and rollback artefacts. | Proves the candidate and its provenance, not production adoption by itself. |

## Safe cutover rule

No replacement slice should enter the production path merely because:

- the workflow validates;
- a local test passes;
- an inactive n8n execution succeeds;
- generated and live definitions look similar;
- no immediate error appears.

A slice requires bounded runtime proof, current-versus-candidate parity, zero unintended provider effects, an exact rollback version, and explicit release authority.

## Confidentiality boundary

This document describes the verified system shape and programme status. It excludes the client's identity, customer data, private terminology, production identifiers, credentials, raw workflow exports, proprietary Code nodes, and infrastructure topology.
