# DeonOS G1 — Purposeful image and fallback checkpoint

**Date:** 27 October 2026  
**Verified source commit:** `3d33e1a8f29b8694f7d6808892cbc5d67ff0fd3e`  
**Status:** media semantics and failure-handling PASS; **overall G1 remains open**. No production change.

## What changed
- The five existing public Github media references have explicit types, descriptive alt text, and captions explaining what they demonstrate **and what they do not demonstrate**.
- The remaining 16 cases display a readable, source-grounded technical focus rather than invented product screenshots or empty gradients.
- If GitHub-hosted images fail, the case study keeps the readable technical focus and explains that the picture was unavailable. The Photos app also retains a meaningful fallback rather than silently hiding the failed image.
- Content validation now requires concise technical focus for all **21 unique projects**. Public media permissions remain **unverified**; no project screenshots were copied, newly generated or misrepresented as live systems.
- Creative next steps and case-by-case media requirements are documented in `docs/IMAGE_STORYBOARD.md`. Those are future assets, **not G1 shipped features**.

## Actual tests, not inferred completion
**[GitHub Actions run 40486135968](https://github.com/joyboy257/joyboy257/actions/runs/40486135968)** passed:
- 28/28 original user journeys; 9/9 routing checks; **10/10 deliberately blocked-image / private-case fallback checks**; no page exceptions.
- Three valid Lighthouse samples for each viewport: **99/100 mobile, 100/100 desktop** median.
- Browser-observed cold first screen, decoded bytes: **241,165 B mobile** (<=300,000 B) and **300,345 B desktop** (<=350,000 B).
- Built HTML/CSS/JS compressed budget: **34,794 B** (<100,000 B).
- Four new screenshots: `media/iphone_emulated-private-case.png`, `media/iphone_emulated-image-unavailable.png`, `media/mac-private-case.png`, `media/mac-image-unavailable.png`.
- Screenshots visually inspected: mobile private case readable within Finder-like layout without truncated sentences; Mac failure card retains purposeful, readable copy instead of a missing hero. These are **emulated** Chromium viewports, not physical Safari evidence.

## Limits
The five public project screenshots are still loaded from GitHub after unlock, so their long-term rights, exact content and availability remain to be verified and localized only when authorized. No claim that every image is owned by the portfolio author. G1 EX-006 keyboard/focus/window behavior and G1 EX-009 final accessibility and release checks remain incomplete. No G2–G5 work started.

**Production preservation:** Vercel project `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`, deployment `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK` untouched.
