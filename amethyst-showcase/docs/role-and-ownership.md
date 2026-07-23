# Role and Ownership

## My role

I owned the product and engineering direction for Amethyst Company Brain, including:

- defining the distinction between evidence, candidate knowledge, approved knowledge, and reusable context;
- designing the approval, policy, learning, and writeback lifecycles;
- specifying transaction and idempotency invariants;
- defining workspace isolation, observability, deletion, backup, restore, and release boundaries;
- decomposing work into bounded implementation and verification tasks;
- reviewing evidence and deciding whether a capability was implemented, tested, deployable, or authorized for use;
- retaining release authority for deployment and external access.

## Use of coding agents

Coding agents were used as implementation and verification workers. They produced code, tests, documentation, and bounded reviews against explicit contracts.

Agents did not independently decide:

- product scope;
- architectural authority;
- claim truthfulness;
- customer-data access;
- production rollout;
- external pilot authorization.

## Why this matters

The project demonstrates agentic engineering without treating generated output as self-validating. Completion required executable evidence, independent review, explicit boundaries, and a human release decision.
