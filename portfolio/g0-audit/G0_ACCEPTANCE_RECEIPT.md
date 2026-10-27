# DEONOS-EXPERIENCE-001 — G0 audit receipt

**Audit:** 27 October 2026  
**Disposition:** G0 HOLD for residual physical Safari, analytics-collector and private-evidence signoff. Browser/source/performance baselines are now measured. No G1 implementation has started.

## Immutable baseline

- Source: `joyboy257/joyboy257@a63e3d3273e701a323a6e8772ce754421520f17b`, directory `portfolio/desktop-v8/`.
- Canonical production: Vercel project `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`; deployed ID `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK`.
- G0-only branch: `audit/deonos-g0-2026-10-27` (test code outside deployed site). No new Vercel project, no site source edits or production promotion.
- [Executed GitHub Actions run](https://github.com/joyboy257/joyboy257/actions/runs/40468067179), artifact `deonos-g0-ex002-40468067179` (30-day retention), digest `sha256:31f91d60e52fddb738df89e5b33a17c04a3d19320129393188890f5b1d2811df`.

## Executed verification

- `EX002_RUNTIME_RESULTS.json`: **28/28 assertions passed, 0 failed, 0 fatal errors**; Mac 1440×900 and **Chromium-emulated** iPhone 390×844; 16 screenshots plus four existing user-uploaded visual references; five attribution URLs HTTP 200; click/swipe/reload/lock/Finder/Spotlight/Terminal/Files/Amelia deep link tested.
- `EX001_DEPLOYMENT_IDENTITY.json`: **7/7 deployed static assets byte-identical** to pinned repository source: HTML, app JS, CSS, analytics JS, icon sprite, wallpaper SVG, favicon.
- Analytics script HTTP **200**, 4,522 bytes; **0 collector/beacon attempts observed** in this headless run. Do not claim dashboard ingestion verified.
- No browser page errors, failed requests or HTTP >=400 responses in captured journeys.

## Lighthouse lab medians (three mobile / three desktop)

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance score | 100 | 100 |
| LCP | 1,109 ms | 329 ms |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0.000046 |
| First-view transfer | **481,081 bytes** | **481,097 bytes** |

**Confirmed budget failure:** 390px mobile first-view transfer exceeds the ≤300 KB plan cap by 181,081 bytes. The remote lock photograph alone is ~438,053 bytes (≈91% of transferred bytes). Lighthouse 100 **does not** override resource-budget failure. EX-008 should optimize it while maintaining licensed source and image fidelity. LCP numbers are lab simulation, **not field p75**.

## Content/evidence and residuals

21 unique dossiers inventoried; 11 public GitHub case links verified to exist; five linked media paths exist; 10 projects lack public source links. Mirai/Amelia numbers are internal engineering/shadow metrics, not customer growth evidence. Amethyst historic test count needs a dated receipt. Private case evidence and photograph rights are not fully certified.

**Still unverified:** physical iPhone Safari with real touch and safe areas (required for release), analytics dashboard/collector receipt, private project source authorization, production field Core Web Vitals. Those stay explicit blockers; no fabricated pass.

## Next implementation packet

After G0 signoff: G1 EX-004 static Vite/TypeScript scaffold preserving current DOM and lock, then EX-005 manifests, EX-006 router/state, EX-007 CSS, EX-008 responsive media and EX-009 test gates. No React, backend, new Vercel project, or G2–G5 work.

Complete raw Lighthouse JSON, runtime receipts, and screenshots are in the linked run artifact; the owner-facing archive `DEONOS_G0_VERIFIED_AUDIT_2026-10-27.zip` preserves them beyond Action retention.
