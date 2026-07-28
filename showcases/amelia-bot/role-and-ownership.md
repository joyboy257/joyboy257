# Amelia Bot — Role and Ownership

## My role

I acted as product and systems owner across three distinct phases:

1. **workflow discovery and production build**;
2. **operation, debugging, and incremental integration**;
3. **architecture audit and controlled hardening**.

Keeping those phases separate is important. I did not design the final PostgreSQL-centred target first and then deploy it unchanged. The production system evolved, exposed real reliability constraints, and was later decomposed through a guarded refactor programme.

## Phase 1 — Discover and build the staff workflow

I owned:

- observing and documenting how staff actually received and processed new work;
- identifying Telegram as the primary intake interface;
- mapping intake details, temporary file handling, final Drive organisation, status commands, tracking, and exception paths;
- designing the n8n workflow architecture and provider integrations;
- implementing and coordinating the intake, file, finalisation, enrichment, and staff-response paths;
- deciding where AI extraction was useful and where deterministic or human handling was required;
- protecting credentials, client data, and provider boundaries.

## Phase 2 — Operate and debug the production system

I remained responsible for:

- tracing failures across Main, child workflows, database state, Google Drive, Sheets, Telegram, and email providers;
- inspecting n8n execution history without treating a green execution as complete business proof;
- diagnosing duplicate, retry, stale-state, notification, worker, and finalisation risks;
- preserving active workflows and staff behaviour while applying bounded remediation;
- deciding whether a workflow change was safe to retain, roll back, or block;
- maintaining the distinction between a live fix, component-level proof, and full production certification.

## Phase 3 — Audit and harden the architecture

The production audit found that application-service responsibilities had accumulated inside large n8n Code nodes and dynamic SQL paths.

I owned the hardening direction:

```text
PostgreSQL = durable business state, transactions, idempotency and evidence
n8n       = bounded orchestration and provider adapters
providers = external interfaces and side-effect systems
```

My responsibilities included:

- establishing an exact source-control baseline for the active workflow estate;
- designing deterministic workflow extraction, regeneration, comparison, preview, and rollback tooling;
- defining a no-side-effect Telegram shadow boundary;
- separating intake into New Case, Summary, File Intake, Existing Case File, and Lifecycle controller domains;
- defining source-controlled contracts and provider-send-disabled candidate results;
- reviewing PostgreSQL functions, transaction boundaries, replay behaviour, state guards, and rollback evidence;
- deciding which claims were static-verified, test-verified, runtime-verified, blocked, or not yet attempted;
- preventing inactive candidate work from being described as a production cutover.

## What I can truthfully claim I owned

| Area | Ownership |
| --- | --- |
| Business and workflow discovery | Primary owner |
| Product scope and staff operating model | Primary owner |
| n8n architecture and provider integration | Primary owner and implementer |
| PostgreSQL KB direction and workflow integration | Architecture and implementation owner |
| Production debugging and remediation | Primary owner |
| Refactor architecture and controller boundaries | Primary decision-maker |
| Test, evidence, rollback, and certification criteria | Primary owner |
| AI-agent task design and acceptance | Primary owner |
| Production release and no-go decisions | Primary owner |

## What I do not claim

I do not claim that:

- every line of implementation was handwritten without AI coding tools;
- the final target architecture is already live across the complete system;
- all active n8n application logic has been decomposed;
- the inactive controllers have replaced Main;
- the entire production estate has exactly-once or fully reconciled provider semantics;
- the later document-intelligence programme is part of the already-adopted production workflow;
- quantified business ROI has been measured.

## How AI coding agents were used

AI coding agents accelerated bounded implementation, review, testing, and evidence work.

A typical agent work packet included:

- one exact workflow or failure class;
- allowed and prohibited files or n8n workflows;
- expected source and generated artefacts;
- tests and negative cases;
- no-provider-send and no-production-mutation rules;
- evidence outputs and rollback requirements;
- a stop condition when provenance or authority was unclear.

Agents contributed code, tests, SQL, workflow definitions, comparisons, and documentation. They did not hold product, client, architecture, or release authority.

I retained responsibility for:

- task framing and scope;
- inspecting the actual repository and live workflow state;
- resolving contradictions between plans, generated source, and production definitions;
- judging whether tests proved the claimed boundary;
- deciding whether a candidate could remain inactive, enter shadow, or approach cutover;
- protecting confidential client material.

## A concrete ownership example

For the summary parsing/save replacement slice, my role was not simply “generate a child workflow.”

I required the work to prove:

- exact source and generated identities;
- isolated PostgreSQL transaction semantics;
- replay, collision, stale-state, concurrency, and no-partial-write behaviour;
- an inactive live definition with zero callers and zero executions;
- a captured pre-change workflow version and exact rollback package;
- no Telegram, Drive, Sheets, email, or production-row effects;
- explicit acknowledgement that production Main remained unchanged.

This is the level at which I define personal engineering ownership: architecture, constraints, evidence, and the release verdict—not merely who typed each line.

## Decisions retained by humans

### Product decisions

- which staff problem was worth automating;
- which existing behaviour could change safely;
- which exceptions required manual authority;
- whether the system should stop, retry, reconcile, or escalate.

### Engineering decisions

- when n8n was sufficient and when application logic needed decomposition;
- the target PostgreSQL authority boundary;
- the distinction between workflow execution and business completion;
- source-control, rollback, parity, and test requirements;
- which slice could proceed and which remained blocked.

### Client and release decisions

- what could be disclosed publicly;
- whether a production issue was contained;
- whether an active workflow should remain unchanged;
- whether evidence justified shadowing, canary work, or no-go;
- whether future functionality should be separated from the production claim.

## Interview answer: “What did you personally build?”

> I discovered the staff workflow, designed and implemented the Telegram-centred n8n intake and file-finalisation system, integrated Drive, tracking, PostgreSQL KB records, and AI enrichment, and supported it in production. When the workflow estate grew too much hidden application logic, I led the source-control and PostgreSQL-centred hardening programme. I built the evidence and rollback boundaries, directed the decomposition into controllers, and test-verified the first summary slice. I would not claim that the replacement architecture is fully cut over—the existing Main workflow still runs production.
