# Role and Ownership

## My role

I acted as product architect and lead engineer for Amethyst's Company Brain program.

I owned:

- problem framing and product direction;
- domain boundaries between Company Memory and Company Brain;
- the claim, entity, metric, policy, context, approval, and learning models;
- API and transaction invariants;
- workspace-isolation and fail-closed requirements;
- test, evidence, and release acceptance criteria;
- production-readiness sequencing;
- disclosure and claim boundaries;
- final release authority.

## How AI coding agents were used

Coding agents handled bounded implementation and verification work packets. They were not delegated product or release authority.

A typical work packet contained:

- one scoped objective;
- exact allowed and prohibited paths;
- implementation requirements;
- tests and negative cases;
- evidence outputs;
- rollback or stop conditions;
- an independent review step.

Agents contributed code, tests, documentation, audits, and repeated verification. I retained responsibility for architecture, scope, contradiction resolution, acceptance, and deployment authorization.

## Why this matters

Using AI to produce code is not the distinctive claim. The engineering work is creating a system in which agent output remains reviewable, testable, evidence-bound, and unable to promote itself into production merely by declaring completion.

## Human decisions retained

- product positioning and user model;
- architecture and data-authority boundaries;
- security and privacy tradeoffs;
- whether evidence was strong enough to close a work item;
- whether a release candidate could enter protected staging;
- whether internal production could be authorized;
- whether customer pilot or live provider effects could be enabled.