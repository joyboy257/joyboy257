# Amelia Bot — Engineering Evidence

## Evidence posture

The public production claim is deliberately narrow:

> **Amelia Bot ran in production for a private client and achieved live staff adoption.**

No audited revenue, cost-saving, time-saving, or accuracy figure is claimed. The showcase distinguishes implementation, testing, production use, adoption, and measured business impact as separate evidence states.

## Claim ladder

| Claim | Current status | Evidence posture |
| --- | --- | --- |
| Workflow architecture exists | **Supported** | Explicit states, controllers, integrations, authority boundaries, and failure rules |
| Reliability controls exist | **Supported** | Idempotency, ledgers, validation, review, retry, and reconciliation design |
| Workflow ran with real providers | **Supported** | Production use across messaging, email, storage, n8n, and PostgreSQL |
| Staff used it for real work | **Supported** | Live staff adoption |
| Quantified hours or cost saved | **Not yet measured** | Requires instrumentation and an agreed baseline |
| Independently verified ROI | **Not claimed** | No external audit or controlled outcome study |

This distinction prevents a deployed system from being presented as a measured commercial result without evidence.

## Scenario coverage

Representative workflow paths include:

### Intake and context

- new-intake creation;
- current-context and canonical-record resolution;
- missing-information clarification;
- structured summary drafting;
- correction and staff confirmation.

### Matter-state operations

- active-state updates;
- hold and pending;
- resume;
- drop and cancel;
- completion;
- invalid or stale transition attempts.

### File operations

- attachment acceptance;
- ingress registration;
- temporary staging;
- classification and routing;
- existing-record file operations;
- invalid, unsupported, or ambiguous files;
- manual-review escalation.

### External effects

- email and storage operations;
- provider acknowledgement;
- timeout and retry;
- partial provider success;
- uncertain effect and reconciliation;
- durable outcome recording.

## Negative cases are expected workload

The reliability programme treats failure inputs as ordinary production conditions:

| Failure class | Expected proof |
| --- | --- |
| Duplicate message or webhook | Exact replay does not create another effect |
| Repeated button press or staff retry | The same operation key returns the committed result |
| Key reused with changed payload | The operation is rejected as a conflict |
| Stale state | The transition is rejected against canonical current state |
| Malformed model output | No authoritative mutation occurs |
| Missing required context | Clarification or human review is requested |
| Invalid file | Ingress evidence is retained and the file is rejected or escalated |
| Provider timeout | The effect becomes uncertain rather than silently successful |
| Partial external success | Reconciliation occurs before another provider write |
| Database unavailable | Completion is not reported |

## Authority checks

Verification asks whether:

- PostgreSQL, rather than an n8n code node, owns the final mutation decision;
- LLM output must satisfy a typed contract and deterministic validation;
- the model cannot authorize identity, state, or completion;
- a true duplicate returns the previously committed result;
- a conflicting duplicate is rejected;
- an external action is not reported as complete without durable evidence;
- ambiguous cases stop at a visible human-review boundary;
- internal and provider disagreement remains a reconciliation state rather than hidden success.

## Operational evidence surfaces

| Surface | Evidence provided | Limitation |
| --- | --- | --- |
| **n8n execution history** | Node path, provider calls, errors, retries, and orchestration timing | Does not independently prove a canonical mutation committed |
| **PostgreSQL operation ledger** | Reservation, fingerprint, state transition, result, replay, conflict, and reconciliation status | Does not replace provider-specific evidence for an external effect |
| **File-ingress records** | Receipt, classification, routing, rejection, and review state | Does not reveal confidential document content publicly |
| **Provider references** | Correlation between the internal operation and email, storage, or messaging effect | Can remain uncertain after timeout and require reconciliation |
| **Human-review state** | Preserves unresolved ambiguity and decision ownership | Demonstrates a safe stop, not automatic completion |

Evidence is strongest when these surfaces agree. Disagreement becomes a visible operational state.

## Failure converted into permanent prevention

### Observed risk

The same requested write could reach the workflow through a staff retry, provider redelivery, or n8n retry. A provider could also accept an effect while the workflow timed out before persisting the acknowledgement.

Without an explicit authority contract, the system could not safely distinguish:

- a new operation;
- an exact replay;
- a changed request reusing the same key;
- a completed provider effect with missing local acknowledgement;
- a genuinely failed effect that was safe to retry.

### Root cause

Mutation ownership, payload identity, replay behaviour, and partial-success reconciliation were not sufficiently explicit at the authoritative database boundary.

### Permanent prevention

1. Bind every durable operation to an idempotency key and payload fingerprint.
2. Reserve the operation inside the PostgreSQL transaction boundary.
3. Return the recorded result for an exact committed replay.
4. Reject the same key when its payload differs.
5. Persist provider reference and outcome evidence before reporting completion.
6. Mark uncertain partial effects for reconciliation rather than blind retry.
7. Keep duplicate, retry, stale-state, malformed-output, and partial-success cases in regression coverage.

### Why the prevention is durable

The fix is not dependent on one n8n execution path or one provider. It defines behaviour at the authoritative operation boundary, so every caller receives the same replay, conflict, and reconciliation semantics.

## Production outcome

The strongest current outcome is **live staff adoption for real operational work**.

This matters because the workflow crossed the boundary from a demonstration into an operating system involving:

- real staff behaviour and corrections;
- persistent state across interactions;
- real messaging, email, and storage integrations;
- duplicate, retry, and exception paths;
- production debugging and remediation;
- human authority over ambiguous or consequential cases.

The claim remains narrower than “fully autonomous” or “proven ROI.”

## Next measurement layer

A production analytics layer should define and record:

| Measure | Definition |
| --- | --- |
| **Active adoption** | Unique staff using the workflow over a defined period |
| **Eligible workflow volume** | Requests that could reasonably be completed through Amelia |
| **Cycle time** | Time from intake to confirmed operational state |
| **Manual touches** | Human interventions required per request or matter |
| **Exception rate** | Percentage of runs entering review, uncertain, or failed states |
| **Rework rate** | Requests corrected or repeated after initial completion |
| **Completion rate** | Eligible workflows reaching a confirmed terminal outcome |
| **Provider-reconciliation rate** | External effects requiring uncertainty resolution |

These metrics are a measurement plan, not retrospective claims.

## Interview-safe evidence

The following can be shown or discussed without exposing client material:

- synthetic state and architecture diagrams;
- generic controller and idempotency contracts;
- failure classes and permanent-prevention reasoning;
- sanitised test categories and acceptance criteria;
- the distinction between orchestration history and database authority;
- the production adoption claim and its measurement limitations.

Raw workflows, private messages, client files, identifiers, provider metadata, credentials, production endpoints, and confidential incident payloads remain excluded.
