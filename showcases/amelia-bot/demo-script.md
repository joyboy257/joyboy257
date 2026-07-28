# Amelia Bot — 110-Second Truthful Demo Script

## 0–20 seconds — What ran in production

Show the hero and production-path diagram.

> “Amelia Bot is the sanitised name for a Telegram-centred intake and document-operations workflow I built for a private professional-services client. Staff used it for real work. Telegram was the operating interface; n8n Main and several sub-workflows handled sessions, files, lifecycle commands, Drive finalisation, enrichment, tracking, and PostgreSQL KB records.”

## 20–45 seconds — The actual workflow

Follow the arrows in the production-path diagram.

> “A staff message or file enters Main, which parses and routes it. Intake workflows create or load the working session and temporary Drive folder. File workflows register and stage documents. Finalisation resolves the case, moves the intended files into the final Drive structure, records results, and triggers AI-assisted enrichment. Sheets and PostgreSQL KB records capture operational context before Telegram returns the outcome.”

## 45–65 seconds — The architecture problem

Open the current-versus-target diagram.

> “The system worked, but it had grown too much hidden application logic inside n8n. Main combined parsing and policy, the state manager combined lifecycle and dynamic SQL, and finalisation combined Drive movement, receipts, upserts, and terminal state. A green workflow execution was not enough to prove one canonical business operation had completed exactly once.”

## 65–90 seconds — What I hardened and actually proved

Open the engineering-evidence page.

> “I established deterministic source and rollback tooling for the workflow estate, then built a no-side-effect Telegram shadow. Its 69-case corpus had zero unexpected differences and zero side-effect violations, but Main stayed authoritative. I also decomposed intake into five inactive controllers. Only summary parsing and save has reached isolated transaction proof: exact replay, collision rejection, concurrency-safe versions, state guards, and no partial writes.”

## 90–105 seconds — The honesty boundary

> “The cleaner PostgreSQL-authoritative architecture is not fully cut over. The Summary Controller is inactive with zero callers and zero executions. Lifecycle, new-case, file-ingress, existing-case, and finalisation slices still require runtime parity and release evidence.”

## 105–110 seconds — Outcome

> “The business outcome I can defend is live staff adoption. I do not claim audited ROI or whole-system exactly-once behaviour. What this project demonstrates is that I can ship operational AI workflows, diagnose their real failure boundaries, and improve them without confusing a target architecture with production truth.”
