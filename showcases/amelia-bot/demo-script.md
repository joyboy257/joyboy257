# Amelia Bot — 100-Second Demo Script

## 0–15 seconds — The operating problem

“Staff were coordinating intake, matter state, files, email, and cloud storage across separate systems. Informal messages were easy to understand as a human, but dangerous to treat as authoritative machine instructions.”

Show the hero and the business-problem section.

## 15–40 seconds — The staff experience

Open the synthetic operator journey.

“Amelia turns a staff request into a typed draft, identifies missing context, and requires confirmation before consequential state changes. The final response includes committed state and evidence identifiers rather than an unsupported success message.”

## 40–65 seconds — Engineering authority

Open the authority-model diagram.

“The LLM interprets intent and drafts structured candidates. Deterministic rules resolve identity, validate state and permissions, and enforce file policy. PostgreSQL owns transactions, idempotency, and the final record. Ambiguity or uncertain provider state stops at a human boundary.”

## 65–85 seconds — Failure converted into prevention

Open the engineering-evidence document.

“A repeated event could arrive through user retry, provider redelivery, or workflow retry. I moved mutation authority to a database-backed idempotency contract: exact repeats replay the recorded result, changed payloads conflict, and uncertain partial success is reconciled before another external effect.”

## 85–100 seconds — Outcome and honesty boundary

“Amelia crossed the line from prototype to production and achieved live staff adoption. I do not claim an audited time or revenue saving yet. The next layer is instrumenting active usage, cycle time, manual touches, exceptions, rework, and completion.”

Close on the recruiter quick-scan table.
