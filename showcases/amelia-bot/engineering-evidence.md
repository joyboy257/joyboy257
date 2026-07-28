# Amelia Bot - Engineering Evidence and Evaluation

## Evidence posture

The public claim is deliberately narrow:

> Amelia Bot ran in production for a private client and achieved live staff adoption.

No audited revenue, cost saving, or hours-saved figure is claimed. The showcase distinguishes operational evidence from estimates and future measurement plans.

## Evidence classes

### Workflow scenarios

Representative paths include:

- new intake and active-context resolution;
- structured summary drafting and correction;
- staff confirmation before authoritative state changes;
- existing-matter commands and follow-up;
- file acceptance, registration, staging, classification, and routing;
- hold, pending, resume, drop, cancel, and completion paths;
- ambiguous identity and manual-review escalation.

### Deterministic negative cases

The reliability programme treats failure inputs as expected workload:

- duplicate webhook or message delivery;
- user retries and repeated button presses;
- idempotency-key reuse with a different payload;
- stale state and invalid transition attempts;
- malformed or incomplete model output;
- invalid or unsupported files;
- provider timeouts and partial success;
- database or integration unavailability;
- uncertain external effect requiring reconciliation.

### Authority checks

Verification covers whether:

- the database, rather than a workflow node, owns the final mutation decision;
- an LLM proposal must pass schema and deterministic validation;
- a true duplicate returns the previously committed result;
- a conflicting duplicate is rejected;
- external completion is not claimed without durable evidence;
- ambiguous cases stop at a visible human-review boundary.

### Operational observability

The system uses multiple evidence surfaces:

| Surface | Purpose |
| --- | --- |
| n8n execution history | Trace orchestration, node failures, provider calls, and retries |
| PostgreSQL operational ledger | Authoritative record of reservations, mutations, outcomes, and conflicts |
| File ingress records | Prove receipt, classification state, routing state, and exceptions |
| Provider references | Correlate internal operations with email, storage, or messaging effects |
| Human-review states | Preserve unresolved ambiguity rather than hiding it as success |

## Failure-to-prevention example

### Observed risk

Repeated events could reach the same write operation through user retry, provider redelivery, or workflow retry. The orchestration layer alone could not safely determine whether the work was new, already completed, or partially completed.

### Root cause

Mutation ownership and replay behaviour were not sufficiently explicit at the authoritative database boundary.

### Permanent prevention

1. Bind every durable operation to an idempotency key and payload fingerprint.
2. Reserve the operation within the PostgreSQL authority boundary.
3. Return the recorded result for an exact replay.
4. Reject the same key when the payload differs.
5. Persist provider and outcome evidence before reporting completion.
6. Reconcile uncertain partial success before issuing another external effect.
7. Keep duplicate, retry, stale-state, and partial-success cases in regression coverage.

## Production outcome

The strongest current outcome is **live staff adoption for real operational work**.

This is meaningful because the workflow crossed the boundary from a demonstration into daily operating behaviour involving actual staff, persistent state, real provider integrations, and exception handling.

## Measurement plan

A production analytics layer should measure:

| Measure | Definition |
| --- | --- |
| Active adoption | Unique staff using the workflow over a defined period |
| Cycle time | Time from intake to confirmed operational state |
| Manual touches | Human interventions required per matter or request |
| Exception rate | Percentage of runs entering review or failure states |
| Rework rate | Requests corrected or repeated after initial completion |
| Completion rate | Eligible workflows reaching a confirmed terminal outcome |

These metrics are presented as the next measurement layer, not as already collected results.

## Evidence boundaries

Detailed workflow exports, client data, provider identifiers, production endpoints, credentials, and private incident records are not published. Sanitised diagrams and explanations preserve the engineering reasoning without exposing confidential material.