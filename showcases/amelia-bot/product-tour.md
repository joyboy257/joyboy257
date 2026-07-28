# Amelia Bot Product Tour

## The 90-second truthful recruiter path

### 1. Start with what actually ran

Open [`assets/operator-workflow.svg`](assets/operator-workflow.svg).

Explain the current production path:

- staff send Telegram commands, intake details, and files;
- Main parses and routes the update;
- intake and state workflows manage the working session and temporary Drive folder;
- file workflows register, stage, and finalise documents;
- finalisation moves files into the final Google Drive structure;
- AI-assisted enrichment extracts case context and file-checklist information;
- Google Sheets and PostgreSQL KB records are updated;
- Telegram returns the staff-facing result.

**Say:** “This was not a demo. Staff used this workflow for real operational work.”

### 2. Show the architecture honestly

Open [`assets/authority-model.svg`](assets/authority-model.svg).

The top row shows the **current production estate**:

- Main and existing n8n workflows remain authoritative;
- substantial application logic still lives in Code nodes and SQL-generating workflows;
- Drive stores the actual files;
- Sheets is an operational tracker;
- PostgreSQL KB stores durable case, document, extraction, and event records, but it is not yet the sole authority for every production operation.

The bottom row shows the **hardening target**:

- deterministic Telegram edge;
- bounded source-controlled domain controllers;
- versioned PostgreSQL transaction functions;
- existing provider workflows behind explicit receipts and rollback boundaries.

**Say:** “The clean architecture is a controlled migration target, not a retroactive description of the first production version.”

### 3. Explain why hardening was necessary

Return to the current-production section in the README.

Highlight that a few workflows had accumulated many responsibilities:

- Main mixed parsing, command policy, summary interpretation, and file normalisation;
- the state manager mixed lifecycle, failure, reconciliation, status, and dynamic SQL;
- finalisation mixed case resolution, Drive movement, receipts, upserts, and terminal state changes.

**Say:** “The product worked, but n8n execution success alone could not prove that one canonical business operation had occurred exactly once.”

### 4. Show what is actually verified

Open [`engineering-evidence.md`](engineering-evidence.md).

Show two bounded proofs:

#### Telegram edge shadow

- 69-case corpus;
- zero unexpected differences;
- zero side-effect violations;
- Main still authoritative;
- cutover blocked.

#### Summary parsing/save slice

- isolated PostgreSQL 16 transaction proof;
- exact replay and collision rejection;
- concurrency-safe versioning;
- stale and terminal-state guards;
- no partial writes;
- inactive controller with zero callers and zero executions.

**Say:** “I can defend these results precisely, but I do not generalise them into a whole-system production guarantee.”

### 5. Close with the outcome and the limitation

The strongest defensible outcome is:

> Amelia Bot was deployed for a private client and adopted by staff for real operational work.

The strongest defensible engineering claim is:

> I stabilised and source-controlled a complex live n8n estate, built no-side-effect shadow and rollback controls, and test-verified the first PostgreSQL-authoritative replacement slice without changing the production path.

Do not claim:

- audited revenue or time saving;
- whole-system exactly-once behaviour;
- full PostgreSQL authority in production;
- production cutover of the replacement controllers;
- advanced document intelligence as part of the adopted bot.

## What each surface proves

| Surface | What it proves |
| --- | --- |
| Synthetic production journey | The real high-level intake, Drive finalisation, enrichment, tracking, and staff-feedback path |
| Current-versus-target diagram | Ability to distinguish production reality from architecture direction |
| Live-estate inspection | The scale and hidden-service problem inside the active n8n system |
| Telegram shadow evidence | Behavioural parity without production side effects |
| Summary-slice evidence | Bounded PostgreSQL transaction, replay, concurrency, and state-guard proof |
| Disclosure boundaries | Ability to discuss client production work without exposing confidential material |

## Recommended interview sequence

1. Spend 20 seconds on the live staff workflow.
2. Spend 20 seconds on the current n8n architecture.
3. Spend 20 seconds on the hidden-authority problem you diagnosed.
4. Spend 20 seconds on the shadow and summary-slice evidence.
5. Close with live staff adoption and what remains unproven.
