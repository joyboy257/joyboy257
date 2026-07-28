# Amelia Bot Product Tour

## The 90-second recruiter path

### 1. Start with the operator journey

Open [`assets/operator-workflow.svg`](assets/operator-workflow.svg).

Show how a staff member:

- submits an informal request and attachment;
- receives a structured draft rather than an unbounded chatbot answer;
- confirms the interpretation before a consequential state change;
- receives a committed result backed by operation and evidence identifiers.

**Explain:** the chat surface is an operating interface. It is not the source of truth.

### 2. Follow the authority boundary

Open [`assets/authority-model.svg`](assets/authority-model.svg).

Walk through:

- source intent from staff and providers;
- bounded LLM interpretation;
- deterministic validation and policy;
- PostgreSQL transactions, ledgers, and idempotency;
- controlled provider effects;
- human interruption whenever proof or context is insufficient.

**Explain:** the model proposes. Deterministic systems validate. PostgreSQL commits. Staff retain authority.

### 3. Show the workflow states

Return to the state diagram in the main README.

Highlight:

- new intake and existing-context resolution;
- draft summary and staff confirmation;
- file ingress and review;
- active, hold, pending, resumed, dropped, cancelled, and completed states;
- explicit escalation rather than hidden best-effort behaviour.

**Explain:** a real workflow needs recoverable states, not a single prompt-response loop.

### 4. Explain the duplicate-delivery failure

Open [`engineering-evidence.md`](engineering-evidence.md).

Show the failure-to-prevention example:

- the same operation can arrive through user retry, provider redelivery, or workflow retry;
- orchestration history alone cannot decide whether the effect is new, committed, or uncertain;
- the database reserves an idempotency key and payload fingerprint;
- exact duplicates replay the recorded result;
- conflicting payloads are rejected;
- uncertain partial success is reconciled before retry.

**Explain:** the failure became a durable contract and regression class, not a one-off patch.

### 5. Close with the production claim

The strongest defensible outcome is:

> Amelia Bot was deployed for a private client and adopted by staff for real operational work.

Do not claim an audited revenue, cost-saving, accuracy, or time-saving number unless supporting measurements are later collected.

## What this showcase proves

| Surface | What it demonstrates |
| --- | --- |
| Synthetic operator journey | Product UX, confirmation, state visibility, and evidence-backed completion |
| Authority model | Separation of probabilistic reasoning, deterministic rules, human authority, and durable state |
| Workflow state machine | Long-running operational design beyond a chatbot interaction |
| Engineering evidence | Negative cases, replay behaviour, observability, and failure conversion |
| Disclosure boundaries | Ability to communicate production engineering without exposing client material |

## Recommended interview sequence

1. Spend 20 seconds on the business problem.
2. Spend 25 seconds on the operator journey.
3. Spend 25 seconds on the authority diagram.
4. Spend 15 seconds on the idempotency failure and prevention.
5. Close with live staff adoption and the next measurement layer.
