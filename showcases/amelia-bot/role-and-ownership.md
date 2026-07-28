# Amelia Bot — Role and Ownership

## My role

I acted as the product and systems owner for Amelia Bot, from workflow discovery through production remediation and release decisions.

I owned:

- discovery of the real staff workflow, operating constraints, and failure modes;
- decomposition into intake, matter-state, file-ingress, external-effect, and exception domains;
- the state-machine and controller boundaries;
- n8n orchestration and provider-integration design;
- PostgreSQL source-of-truth, transaction, ledger, and idempotency decisions;
- the boundary between LLM interpretation and deterministic authority;
- human confirmation, escalation, and exception paths;
- scenario tests, negative cases, production debugging, and remediation;
- evidence review, disclosure boundaries, and release decisions.

## What personally built or directed means here

I did not treat generated code or a successful n8n execution as proof of a completed system.

My engineering responsibility included:

1. deciding the architecture and the final authority for every mutation;
2. turning ambiguous business behaviour into explicit contracts and states;
3. defining what AI could propose and what it could never decide;
4. reviewing implementation and workflow changes against those contracts;
5. tracing production failures across orchestration, database, and provider boundaries;
6. converting failures into tests, ledgers, constraints, and recovery paths;
7. deciding whether evidence was sufficient for production use.

## How AI coding agents were used

AI coding agents accelerated bounded implementation, review, investigation, and documentation tasks.

A bounded task could include:

- tracing one workflow path or failure class;
- implementing a controller or deterministic validation rule;
- reviewing SQL transaction or idempotency behaviour;
- generating tests and negative cases;
- comparing generated workflow source with deployed workflow behaviour;
- preparing a sanitised evidence summary.

Agents did not hold product, client, architecture, or release authority. I retained responsibility for task scope, contradiction resolution, acceptance, production safety, and disclosure.

## Decisions retained by humans

### Product and operating decisions

- which staff problem was worth automating;
- which workflow states and commands were canonical;
- which exceptions required explicit human involvement;
- whether automation should stop, retry, reconcile, or escalate.

### Engineering decisions

- PostgreSQL as the operational source of truth;
- n8n as orchestration rather than hidden application authority;
- exact replay versus conflicting idempotency-key behaviour;
- provider-effect and partial-success reconciliation;
- test, evidence, and release requirements.

### Client and release decisions

- which details could be published;
- whether a production issue was sufficiently contained;
- whether a workflow version could remain active;
- whether a capability required further proof before expansion.

## Why this matters

The distinctive work was not merely connecting an LLM to n8n.

It was building and operating a system where probabilistic interpretation could help staff without becoming the source of truth, where repeated or partial events could not silently duplicate work, and where failures remained inspectable and recoverable.
