# DeonOS G1 — checkpoints A and B verified

**Programme:** DEONOS-EXPERIENCE-001  
**Date:** 27 October 2026  
**Status:** EX-004 PASS; EX-005 PASS; **G1 overall NOT accepted**. No production deploy.

## Isolation
- Branch: `programme/deonos-g1-foundation-2026-10-27`; base `portfolio/site-preview-2026-10-26` at `a63e3d3273e701a323a6e8772ce754421520f17b`.
- Existing production Vercel project: `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`, deployment `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK` unchanged.
- [Draft PR #2](https://github.com/joyboy257/joyboy257/pull/2). Do not merge or deploy before the remaining gates.

## EX-004 — minimal TypeScript/Vite
- Added reproducible pinned dependencies (`package-lock.json` committed), Vite static output, tsconfig and minimal `src/main.ts` + legacy adapter.
- Existing lock/Mac/iPhone HTML, CSS, analytics, five /from/* routes, sprite and wallpaper semantics retained.
- No React, backend, always-on dynamic features, new Vercel project or parallel lock controller.
- Original `app.js` kept as active compatibility code pending later G1 migrations.

## EX-005 — canonical case data
- Moved all 21 original cases **verbatim** from `app.js` into `src/content/projects.ts`. Stable IDs, ranks, stages, facts, limitations, imagery and links retained.
- Added typed schema, conservative evidence labels, media provenance register and validation script.
- Verified 21 unique IDs, 11 public case destinations and 5 remote media assets; `rightsVerified=false` for all five. No unsupported production assertions created.

## Executed evidence
- [Latest successful EX-004/EX-005 CI and screenshot/Lighthouse artifact](https://github.com/joyboy257/joyboy257/actions/runs/40472366940).
- `npm run typecheck`, `npm run build`, `npm test` and content checks: pass.
- Emulated Mac 1440×900/iPhone 390×844: 28/28 interaction checks PASS, zero page-JS exceptions, 16 captured images.
- Lighthouse median three runs: 100 mobile, 100 desktop in the latest successful CI.
- Built entry HTML/CSS/JS gzip total: **32,105 bytes** (target <=100,000); compiled data extraction did not change this total.
- Screenshots aligned with G0 reference: unlocked Mac/iPhone screens typically <0.1% pixels differing by >20 RGB units; selected Mirai project screenshot differs (~4%) chiefly because the previously absent external hero image loaded in the new run.
- CI runs exposed **measurement variation**: an otherwise unchanged run returned mobile Lighthouse median 87 and rightfully failed the >=90 performance gate. Do not treat any single 100 score as permanent certification.
- Vite local preview reports 404 at `/_vercel/insights/script.js` (expected outside Vercel), and one external image request was aborted by navigation. Live analytics beacon collection remains unverified.

## Open work
- EX-006 central store/router/keyboard/window, EX-007 CSS consolidation, EX-008 responsive/rights-verified media, EX-009 final CI gates.
- Existing remote lock photo is ~438 KB and drives first-view transfer above <=300 KB mobile cap.
- Physical iPhone Safari, aggregate analytics collection and 10 private case sources remain owner/device verification items for release.
- No G2–G5 features started.
