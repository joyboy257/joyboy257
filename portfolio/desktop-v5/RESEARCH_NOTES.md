# Deon's Desktop — portfolio editorial dossier
**Date:** 26 October 2026  
**Source:** Connected GitHub account `joyboy257`  
**Deployment:** An independent preview at `deon-desktop-portfolio.vercel.app`  
**Status:** REVIEW DRAFT; not promoted to GitHub profile or GitHub Pages

## Why a desktop instead of another landing page

Recruiters need a convincing answer to three questions: What has this engineer built? What did they personally own? What evidence shows the work actually runs? A Mac-inspired interface makes that research engaging through an intentional metaphor:

- **Desktop folders:** browse engineering work by problem or domain.
- **Finder list + preview:** scan project names, then immediately inspect a coherent case study.
- **Three dossier tabs:** the problem and role, real implementation choices, and proof/limitations.
- **Spotlight:** locate projects via names, languages and skills with `Cmd/Ctrl+K`.
- **Recruiter brief:** a 60-second hiring case in plain English.
- **Terminal:** a deliberately simulated, non-executing playful layer.

Everything is client-side. This is not a real operating system, and the simulated terminal is not a command shell.

## Repository research scope

The linked GitHub account returned **73 accessible repositories**. That is the *inventory*, not a claim of 73 completed code reviews. More than 20 distinct project READMEs or technical documents were inspected, plus concrete source files from the most relevant systems. The data below is the case-study editorial trace used in `app.js`. Project descriptions are deliberately bounded by implementation evidence and stated readiness.

| Priority | Project | Read code/evidence | Real differentiation | Status and qualification |
|---|---|---|---|---|
| 1 | Mirai | `apps/core-backend/src/tools/tool-invocation-guard.ts`; `packages/shared/src/outbox.ts`; idempotency spec; recent PRs | Typed authority over LLM decisions, tenancy and replay safety | Core private, current production readiness feature-dependent; July internal evaluation is not external impact |
| 2 | Amelia Bot | Public staff-safe showcase plus prior workflow-evidence handoffs | Actually used by professional-services staff; integration correctness | Live original n8n path; replacement slice shadow-proven, not cut over |
| 3 | Soleil | `LivingSunRenderer.swift`; `SoleilAIComposition.swift`; `StoreKitEntitlementService.swift` | Native Metal, 41-float shader ABI, voice composition and entitlements | Non-release-ready iOS engineering |
| 4 | Slate | `fork/slate_runs/models.py`; `fork/slate_agents/models.py`; agent-run architecture and merged PRs | Durable agent attempts, workspace connection contracts, source-controlled work graph | Plane-derived foundation; not public production |
| 5 | Corpa | `src/lib/compliance/rules.ts`; `src/lib/operator/obligations.ts` | Singapore statutory compliance encoded as deterministic rules and traceable obligations | Private; not verified regulatory or autonomous government filing |
| 6 | WorkOS | `crates/workos-core/src/memory/mod.rs`; `docs/site/architecture.md` | Tauri/Rust/SQLite local-first agent work and memory | MVP; installer and release certification needs independent checks |
| 7 | Amethyst | Backend policy search, July consolidation review, public showcase | Evidence to approved context, policy and idempotent writeback | Internal production; external pilots/live writes gated |
| 8 | Verticals | `SourceCatalogue.tsx` search, multi-tenant data access/Redis, repo README | Connected-source enterprise AI, provenance and health | Upstream Onyx Community Edition base: carefully differentiate authorship |
| 9 | AgentOS | `app/lib/approval/approval-manager.ts`; `app/lib/contracts/runtime-engine.ts` | Tool approval pause/resume, event tracing, agent canvas | Public prototype |
| 10 | Atlas | `packages/atlas/docs/QUICKSTART.md`; public repo | Safe first-agent loop, local conformance and replay | Public alpha; npm publication absent |
| 11 | DreamCraft | `src/integration/dreamRuntimeAdapter.ts`; demo/test docs | Typed manifest to playable voxel world, safe compiler boundary | Locally playable, live provider/deployment gates open |
| 12 | RustyIndex | `rustyindex-service/src/tenant_context.rs`; technical spec | Rust tenant boundaries, evidence-grounded document retrieval | Maintenance, toolchain/test environment not fully production-ready |
| 13 | Heidi | `spec/network/README.md`; `05-negotiation.md` | Formal signed offers, private owner limits, no implicit authorization | Draft spec not yet owner-confirmed; no network adoption |
| 14 | PropFrame | `app/api/clips/generate/route.ts`; `lib/db/auth.ts`; worker sources | Async GPU media workflow with ownership/credit accounting | Credit/queue atomicity gap means no production-hardened billing claim |
| 15 | AMI | `services/robots/main.py`; scoring and source pipeline | Source-linked intelligence, n8n crawl and score pipelines | Prototype; robots check currently fails open for exceptions |
| 16 | Sole | `app/core/guardrails.py`; evaluation suite | AI support that cannot bypass deterministic refund and credit constraints | Synthetic research prototype |
| 17 | OpenBrain | `RELEASE.md`; source/architecture snippets | Local-first desktop memory, provider adapters, citation-based recall | Repo-documented beta; provider list isn't verified adoption |
| 18 | SingNote | `Sources/Services/TranscriptionService.swift`; UI docs | Singapore-accent clinical capture and note product | `requiresOnDeviceRecognition=false`: never promise offline-only privacy |
| 19 | PokerAI | Public RL showcase | TensorFlow DQN against repeatable rule-based baseline | Educational research; no solved play or profit claim |
| 20 | Trading Lab | `TradeDesk/README.md` | Sealed holdout, forward-validation discipline | Research/paper only; no brokerage trading claim |
| 21 | Mototiam | Repo README and feature matrix | SG marketplace ETL, scoring, Telegram delivery | Private, not validated always-on commercial deployment |

## What to lead with

**First ten seconds:** engineer who builds complete systems that work beyond demonstration.  
**Next sixty seconds:** Mirai platform + real client delivery + native software as distinct hiring signals.  
**Deep dive:** inspect implementation (deterministic authorization, transactional outbox, native rendering, run data models, local memory).  
**Broad evidence:** show the range through folders and search rather than 21 equally prominent cards.

## Follow-up audit needed before changing claims

- Re-run actual project builds, tests and end-to-end demos for each selected flagship.
- Confirm Git attribution/upstream lineage for Plane-derived Slate and Onyx-derived Verticals.
- Gather sanitized screenshots and a one-minute Mirai user-to-authorized-action recording.
- Check external public-link behavior and responsive rendering from a logged-out browser.
- Establish customer-authorized, independently measurable volume or outcome data for client workflows.

## Safe publishing boundary

No private repository code, credentials, customer names, private internal URLs, deployment secrets or unredacted evidence are copied into this site. Private projects receive only high-level public descriptions and no broken private source links. Confirm owner approval before promoting the public site to GitHub Pages or the profile README.
