# Amelia Bot — Engineering Evidence and Claim Boundaries

## Public claim posture

The production outcome claim is deliberately narrow:

> **Amelia Bot ran in production for a private client and achieved live staff adoption.**

The architecture claim is equally precise:

> **The active system remains an n8n-centred workflow estate. I later established a source-controlled, PostgreSQL-centred hardening programme; only the summary parsing/save replacement slice is currently test-verified and inactive.**

No audited revenue, cost-saving, time-saving, accuracy, or whole-system exactly-once claim is made.

## Claim ladder

| Claim | Current status | Evidence posture |
| --- | --- | --- |
| Telegram-centred intake and file-finalisation workflow exists | **Production current** | Live workflow inspection and staff use |
| Staff use the workflow for real operational work | **User-confirmed production outcome** | Live staff adoption; no quantitative adoption analytics yet |
| Current Main remains authoritative | **Production current** | Live inspection of Main and callers |
| Google Drive stores actual files | **Production current** | Finalisation and KB design evidence |
| Google Sheets remains an operational tracker | **Production current** | Current intake/KB integration design |
| PostgreSQL KB stores cases, documents, extractions, and normalised events | **Implemented in the estate** | Schema/workflow design and live intake state/KB workflow inspection |
| PostgreSQL is the sole authority for every production mutation | **Not yet true** | Accepted target architecture; production authority remains distributed |
| Telegram edge replacement has behavioural parity | **Verified shadow** | 69-case corpus, zero unexpected differences, no side effects |
| Five bounded replacement controllers exist | **Verified inactive candidates** | Generated definitions validate; no production callers or provider sends |
| Summary parsing/save has database transaction proof | **TEST_VERIFIED inactive** | Isolated PostgreSQL 16 proof plus regression suite |
| Lifecycle, new-case, file-ingress, existing-case, and finalisation replacements are production-ready | **Not yet proven** | Later slices require runtime, parity, rollback, and canary evidence |
| Whole-system exact replay and partial-success reconciliation are live | **Not claimed** | Target reliability contract; only bounded pieces are verified |
| Advanced document intelligence is part of the adopted production bot | **Not claimed** | Separate read-only-first programme |
| Quantified business impact | **Not measured** | Requires instrumentation and an agreed baseline |

## Live production estate inspection

A read-only inspection of the intake-related production path found:

| Area | Observed shape | Application responsibility concentrated there |
| --- | --- | --- |
| **Main intake** | 53 enabled nodes, 86 valid connections, zero validation errors | Parsing, aliases, command identity, state-changing policy, summary interpretation, and file normalisation |
| **Process intake** | 15-node workflow | Caller checks, session reservation, temporary Drive-folder creation and persistence |
| **Intake state manager** | Small node graph with a very large workflow definition | Start, load, update, cancel, claim, stage, failure, reconciliation, status, and projection SQL |
| **Staged-file finalisation** | 28-node workflow | Case resolution, ledger loading, Drive movement, receipts, document upsert, and session finalisation |
| **File acceptance / ingress** | Dedicated production workflows | Duplicate classification, ingress receipt, file events, and processing-job registration |
| **Status / context support** | Dedicated support workflows | Session merge, State Manager delegation, and command guards |

This evidence supports two conclusions:

1. the product is real and operationally substantial;
2. the current architecture still contains hidden application services and distributed authority.

## Production capability evidence

### Intake and tracking

The production path includes:

- Telegram intake messages and file uploads;
- working-session creation and loading;
- temporary Google Drive staging;
- summary and intake-state handling;
- lifecycle and status commands;
- final Drive folder creation and file movement;
- Google Sheets operational updates;
- PostgreSQL case, document, extraction, and event records.

### Post-finalisation enrichment

The enrichment path carries structured outputs equivalent to:

- case context;
- finalisation result;
- police-report extraction;
- file checklist;
- missing-document and readiness information.

The evidence does not imply that every classification or naming capability in the later document-intelligence programme is already live.

## Deterministic source and provenance evidence

A source-control pipeline was established for the workflow estate:

```text
exact published export
→ source extraction
→ deterministic generation
→ validation and comparison
→ deployment preview
→ rollback payloads
```

The accepted baseline covered:

- **83 exact active workflows**;
- **834 nodes**;
- **1,457,590 baseline bytes**;
- **150 safe credential references**;
- **zero pinned-data exports**.

These figures demonstrate the scale of the controlled workflow estate. They do not prove that every workflow has been refactored or certified.

## Telegram edge shadow evidence

The target Telegram edge was designed as a non-authoritative, no-side-effect shadow.

### Corpus

| Category | Cases |
| --- | ---: |
| Every canonical command | 43 |
| Every registered alias | 9 |
| Supported media families | 5 |
| Group identity | 1 |
| Ordinary non-command text | 1 |
| Summary-like text | 1 |
| Unknown or typo commands | 2 |
| Callback queries | 2 |
| Reply-specific command | 1 |
| Malformed updates | 4 |
| **Total** | **69** |

### Results

- full parity pass: **31**;
- blocked by known registry gaps: **30**;
- judge-reviewable intended differences: **8**;
- unexpected failures: **0**;
- unexpected differences: **0**;
- no-side-effect violations: **0**;
- focused Telegram-edge regression tests: **30 / 30 passed**.

The verdict remained `CUTOVER_BLOCKED` because parity evidence and safe shadow execution are not production release authority.

## Inactive controller evidence

Five bounded replacement workflows were created:

- New Case Controller;
- Summary Controller;
- File Intake Controller;
- Existing Case File Controller;
- Intake Lifecycle Controller.

Shared safety posture:

- all are inactive;
- no production workflow calls them;
- provider sends are disabled in their result contracts;
- none contains a Telegram sender or Google Drive node;
- current production workflows remain unchanged.

The base controller package had **13 passing tests, zero failures, and one deliberately skipped disposable-database test** before the summary slice was separately runtime-tested.

## Summary parsing/save: exact verified slice

The summary replacement slice was tested in an isolated disposable PostgreSQL 16 environment with:

- no network;
- no published ports;
- TCP disabled;
- temporary in-memory storage;
- no persistent volume;
- exact down migration;
- zero object or container residue after proof.

### Verified semantics

- eight active organisation/law-firm registry entries;
- first save creates version 1;
- a legitimate edit creates version 2;
- exact replay returns the original version without another mutation;
- key, transport, command, operation, and bound-session collisions are blocked;
- stale state, wrong scope, wrong target, and malformed summaries are blocked;
- concurrent edits receive distinct versions;
- writes are limited to permitted working states;
- terminal, cancelled, finalised, or superseded sessions reject edits;
- failures leave no partial summary version, binding, or session mutation.

### Verification results

| Gate | Result |
| --- | ---: |
| Summary static and policy tests | **21 passed** |
| Disposable PostgreSQL transaction proof | **1 passed** |
| Telegram edge tests | **30 / 30 passed** |
| Repository test suite | **326 / 326 passed** |
| Lint | **PASS** |
| Typecheck | **PASS** |
| Production build | **PASS** |
| Secret scan | **0 worktree findings; 0 Git-history findings** |

### Runtime status

The live Summary Controller is:

- inactive;
- unarchived;
- valid with zero workflow errors;
- represented by a nine-node source-controlled workflow;
- observed with zero execution records;
- proven to have zero callers;
- paired with a captured pre-change history version and rollback package.

It has not been connected to Main, the state manager, Telegram, Drive, Sheets, email, or production database rows.

## Failure converted into an evidence-led remediation programme

### Observed problem

The same logical work could be represented differently across:

- Telegram delivery identity;
- command identity;
- workflow-local retries;
- file identity;
- session state;
- provider results;
- Google Drive metadata;
- Sheets rows;
- PostgreSQL KB rows and events.

Large n8n Code nodes and SQL-generating workflows made it difficult to prove which component owned the final mutation or whether a retry was safe.

### Containment implemented

- froze and exported the exact workflow estate;
- built deterministic source generation and comparison;
- created rollback artefacts before candidate changes;
- used shadow-only Telegram paths with mutation and provider sends disabled;
- created inactive, zero-caller domain controllers;
- required exact claim states such as static-verified, test-verified, runtime-verified, or blocked.

### Prevention proven so far

For the summary slice only, PostgreSQL now proves exact replay, collision rejection, concurrency-safe versioning, state guards, and no partial writes.

### Prevention still outstanding

Later slices still need to prove:

- concurrent lifecycle commands and pointer invariants;
- new-case reservation and deterministic supersession;
- separate transport, Telegram-file, content, and business identities;
- real duplicate suppression rather than duplicate recording only;
- finalisation high-water marks under concurrent file arrival;
- uncertain provider-effect reconciliation;
- production-path shadow parity and controlled canaries;
- convergence on one durable ledger across the full estate.

## Production outcome

The strongest current business outcome is **live staff adoption for real operational work**.

This proves that the workflow crossed from demonstration into actual operation involving staff behaviour, provider integrations, persistent records, errors, and remediation.

It does not prove:

- fully autonomous operation;
- whole-system production certification;
- exactly-once behaviour across every workflow;
- audited financial impact;
- external validation of productivity or accuracy.

## Next measurement layer

A production analytics layer should define and record:

| Measure | Definition |
| --- | --- |
| **Active adoption** | Unique staff using the workflow over a defined period |
| **Eligible workflow volume** | Requests that could reasonably be completed through Amelia |
| **Intake-to-finalisation cycle time** | Time from first intake to confirmed finalisation |
| **Manual touches** | Human interventions required per request or case |
| **Exception rate** | Percentage entering review, reconciliation, or failure states |
| **Rework rate** | Requests corrected or repeated after an earlier outcome |
| **Completion rate** | Eligible workflows reaching a confirmed terminal outcome |
| **Duplicate-suppression rate** | Repeated deliveries safely prevented from producing another effect |
| **Provider-reconciliation rate** | Effects requiring uncertainty resolution |

These metrics are a measurement plan, not retrospective claims.

## Interview-safe explanation

A precise answer to “What actually ran in production?” is:

> The live system used Telegram as the staff interface and n8n Main plus several sub-workflows for intake, session state, file staging, Drive finalisation, enrichment, tracking, and PostgreSQL KB records. Staff used that system for real work. The later PostgreSQL-authoritative controller architecture is a hardening programme; its Telegram edge is shadow-verified and its summary slice is transaction-tested, but neither has replaced Main in production.

## Confidentiality boundary

The public evidence excludes raw workflow definitions, client data, source messages, files, private terminology, credentials, workflow IDs, production endpoints, database rows, and incident payloads. Counts and contracts are published only where they communicate engineering scale and evidence state without exposing client material.
