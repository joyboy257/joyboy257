# Amelia Bot - Public Disclosure Boundaries

## Purpose

Amelia Bot is a sanitised recruiter-facing case study for a production workflow built for a private client. The name is an alias and is not the client's brand or product name.

## Safe to disclose

- the general professional-services operations problem;
- the high-level workflow states and integration pattern;
- the separation between LLM interpretation and deterministic authority;
- the use of n8n, PostgreSQL, Telegram, Gmail, and Google Drive;
- idempotency, transaction, escalation, and evaluation principles;
- Deon Quek's role and engineering ownership;
- the narrow outcome claim of live staff adoption;
- synthetic diagrams and generic examples.

## Do not disclose

- the client's name, brand, staff names, or customer names;
- case, matter, claim, or reference identifiers;
- source messages, documents, email content, or file names;
- Google Drive folder IDs, Telegram chat IDs, email addresses, or account identifiers;
- credentials, tokens, secrets, webhooks, callback URLs, or production endpoints;
- raw n8n workflow exports or proprietary code nodes;
- private business rules, naming conventions, templates, or operational playbooks;
- infrastructure topology, host identifiers, database connection details, or incident records;
- unsupported revenue, time-saving, accuracy, or productivity estimates.

## Sanitisation rules

1. Replace the client and original bot names with **Amelia Bot**.
2. Replace people, customers, matters, folders, and files with synthetic labels.
3. Use generic state and field names where the original term reveals the client.
4. Recreate diagrams from architectural concepts rather than exporting production screens.
5. Crop or redraw any evidence that contains identifiers, timestamps tied to private events, or provider metadata.
6. Describe failures by class and prevention, not by exposing private incident payloads.
7. Keep every performance or outcome statement within the evidence actually held.

## Interview handling

More implementation detail can be discussed verbally at an interview while preserving these boundaries. Confidential source code, client data, credentials, and raw production artefacts should not be transmitted unless the client provides explicit authorization.