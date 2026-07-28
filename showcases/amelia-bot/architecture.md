# Amelia Bot - Architecture and Authority Model

## Design objective

Amelia Bot turns informal staff requests and incoming documents into controlled operational work while preserving a strict separation between:

- probabilistic interpretation;
- deterministic business rules;
- authoritative database state;
- human authority;
- external side effects.

## Authority hierarchy

```text
Staff intent and source messages
        |
        v
Bounded interpretation and extraction
        |
        v
Deterministic validation and policy
        |
        v
PostgreSQL transaction and operational ledger
        |
        v
Controlled external effect and outcome receipt
```

PostgreSQL is the operational source of truth. n8n coordinates calls and state transitions but is not the final authority for whether a durable mutation has committed. Messaging, email, and cloud storage remain integration surfaces rather than canonical workflow state.

## Core state groups

| Group | Example states | Authority |
| --- | --- | --- |
| Intake | new intake, context resolution, draft summary, awaiting confirmation | Deterministic controller with human confirmation |
| Matter lifecycle | active, hold, pending, resumed, dropped, cancelled, completed | PostgreSQL state machine |
| File ingress | received, registered, staged, classified, accepted, review required, failed | Ingress ledger and deterministic validation |
| External effects | queued, attempted, delivered, retryable, permanently failed | Outbox or equivalent durable effect record |
| Exception handling | ambiguous identity, invalid payload, provider failure, manual review | Explicit escalation state |

## Integration responsibilities

### Messaging interface

- Accept staff commands, free-form messages, and attachments.
- Return clear outcomes, missing-information requests, or escalation notices.
- Never serve as the authoritative store of workflow state.

### n8n orchestration

- Coordinate bounded controllers and provider calls.
- Carry correlation and idempotency identifiers.
- Expose execution history for operational debugging.
- Avoid hidden mutation authority inside large code nodes.

### PostgreSQL

- Resolve canonical sessions and matters.
- Enforce legal state transitions.
- Reserve and commit idempotency keys.
- Record file ingress and operation outcomes.
- Preserve auditable evidence for retries and reconciliation.

### LLM boundary

- Parse natural-language intent.
- Extract candidate fields.
- Classify documents or messages.
- Draft summaries and clarification questions.
- Return typed, bounded output for deterministic validation.

The LLM cannot independently confirm identity, commit state, bypass approval, or declare an external action successful.

### Gmail and Google Drive

- Perform provider-specific email and file operations.
- Return provider identifiers and results for durable recording.
- Remain behind controlled write paths and exception handling.

## Idempotency contract

Each durable operation carries:

```text
operation_key
payload_fingerprint
operation_type
canonical_scope
status
provider_reference
result_payload
created_at
completed_at
```

Expected behaviour:

1. A new key and payload may reserve the operation.
2. The same key and same payload replays the recorded result.
3. The same key with a different payload is a conflict.
4. A partial external success is reconciled before retrying.
5. Completion is acknowledged only after authoritative outcome evidence is recorded.

## Human-authority boundaries

Human review is required when:

- more than one matter or person is a plausible match;
- required fields remain missing after clarification;
- a document cannot be safely classified or routed;
- a requested action is consequential or externally visible;
- provider state and internal state disagree;
- the system cannot prove whether an earlier effect completed.

## Failure posture

The system prefers a visible, recoverable escalation over a silent best-effort outcome.

Examples:

| Failure | Behaviour |
| --- | --- |
| Malformed model output | Reject or repair within a bounded schema; do not write business state |
| Duplicate delivery | Replay committed result or reject conflicting payload |
| Provider timeout | Record uncertain state and reconcile before another effect |
| Missing matter context | Ask for clarification or route to human review |
| Invalid file | Preserve ingress evidence and return an explicit rejection or escalation |
| Database unavailable | Do not claim completion; stop before external effect where possible |

## Confidentiality boundary

This document describes reusable architecture patterns. It excludes the client's identity, customer data, private rules, production identifiers, credentials, raw workflow exports, and infrastructure topology.