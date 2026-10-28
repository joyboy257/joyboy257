# DeonOS — meaningful project imagery (editorial plan, not shipped artwork)

**Status:** G1 editorial policy drafted on 27 October 2026. No new screenshots are asserted, generated visuals are not evidence, and no new media is shipped by this document. Preserve the live site until release checks pass.

## Core decision

A project image must answer a useful recruiter question: **What was built? How does it work? What was actually verified?** Keep the iOS/macOS shell and lock wallpaper atmospheric, but treat the case-study images as **evidence**, not decoration.

- **Visual 1 — Product or interface:** real screen/capture of an implemented feature, with sensitive details replaced by explicit synthetic fixtures.
- **Visual 2 — Engineering mechanism:** code-derived flow or architecture (who authorizes writes, where retries go, how state persists), with a caption and whether it is a diagram or capture.
- **Visual 3 — Proof and boundaries:** a genuine test receipt, deterministic fixture, documented release result, or honest open gate. Do not imply commercial adoption, production delivery or independent benchmarking from screenshots.
- **No source image?** Use the case-file engineering summary. Do not invent attractive fake UIs and describe them as screenshots.
- **Media discipline:** specify the question answered, provenance, permission/rights and intended crop. Use responsive assets and lazy loading so unlocked case images never slow the lock screen.

## First five visual storyboards (highest recruiter value)

| Case | First image | Second image | Proof frame / caveat |
|---|---|---|---|
| **Mirai** | Real public operator workspace, not decorative app mockup | Tool action path: organization scope → authorization → approval → idempotent worker | Internal 49-tool / 201-case / 500-iteration evaluation receipt; explicitly *not* customer adoption |
| **Amelia Bot** | Sanitized Telegram–n8n–Drive workflow diagram (already public) | Before/after of the verified shadow controller, using fake client and case IDs | 69 shadow cases; original Main remains live; do not present uncut-over replacement as shipped |
| **Soleil** | Real SwiftUI/Metal living-sun frame captured on device | Voice engine/on-device flow showing privacy boundary | “Not release ready” until actual device, model and app release evidence exists |
| **Slate** | Implemented agent-run or review screen with fictional projects | Agent run lifecycle (attempt → input request → review → completion) | Clearly attribute Plane upstream foundation and don't present a hosted service |
| **Amethyst** | Public sanitized Company Brain overview (already available) | Candidate → approved claim → permissioned context → writeback diagram | Internal production only; no claim of live external customer pilot |

## Next-tier image candidates (only when real source and permissions exist)

| Case | The image should show | Explicit boundary |
|---|---|---|
| Corpa | A fictional Singapore company obligations timeline with rule source and verified-at date | Illustrative dates aren't regulatory certification |
| WorkOS | Actual Tauri app + local memory retrieval path using synthetic file names | Desktop MVP, not packaging certification |
| Verticals | Source catalogue and citation trail with fake tenant data | Name Onyx CE as upstream |
| AgentOS | Current public canvas plus the human tool-approval step | Product prototype, not live hosted production |
| Atlas | Local conformance output and the bounded first-agent loop | Simulator proof is not live WhatsApp/provider certification |
| DreamCraft | Actual browser world and a prompt-to-world safe compiler overview | Screenshot not a benchmark |
| RustyIndex | Tenant-scoped evidence graph / allowed document path | Maintenance prototype; security cleanup remains |
| Heidi Network | Clearly labeled conceptual merchant-agent protocol | Founder/spec stage, not shipping product |
| PropFrame | Real upload → queued render → download journey with synthetic property | Prototype; payments/reconciliation not certified |
| AMI | Synthetic competitor dashboard showing a source-backed signal | Not confirmed hosted production |
| Sole | Guardrail decision trace and deterministic outcome, synthetic customer | Educational prototype |
| OpenBrain | Verified local-first memory/source provenance surface, if available | No invented product UI while private beta evidence is absent |
| SingNote | Fake patient visit from speech capture → reviewed note, with privacy controls | No actual patient data or clinical validation claim |
| PokerAI | Research pipeline or real evaluation logs | Illustrative demo curves are **not** results |
| Trading Lab | Paper research ledger, rejection criteria and false-positive case | No live P&L/profitability implication |
| Mototiam | Verified price data lineage or real prototype listing screen | No invented marketplace usage |

## Acceptance rules for adding any new asset

1. Is the image **real capture**, **sanitized reconstruction**, **diagram** or **illustration**? Label it accurately.
2. Can the source be shown publicly? Record its file/commit or approval and redact private identifiers.
3. What *single technical claim* does the image help a recruiter understand? Put that in the caption.
4. Does it remain useful at laptop Finder size and phone width? Prefer readable focal crops and a full-size view later.
5. Is it below its media budget and lazy-loaded after unlock? Check real browser transfer and error fallback.

## G1 changes already made

`src/content/media-manifest.ts` now gives each of the 5 public images a role, alt text and a truthful supporting caption. `caseMedia()` uses project facts rather than a made-up screenshot for the other 16 cases. A broken GitHub media request degrades to readable evidence instead of a blank rectangle. The Photos view is labeled as engineering context rather than a generic wallpaper gallery.

**G2 is deliberately not implemented here.** Later, a recruiter-friendly Quick Look panel can show the three visual layers without loading high-resolution images into the initial lock screen.
