# G1 measured checkpoint: responsive lock wallpaper + CSS consolidation

Date: 27 October 2026. Branch: `programme/deonos-g1-foundation-2026-10-27`.

**No production deployment.** Existing production ID `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK` preserved.

## Changes
- EX-008: kept original black-and-white lock photo, replaced remotely served 2200px file with **local 1700px/105,018-byte mobile WebP** and **1900px/164,198-byte desktop WebP**. Vite fingerprints built URLs. Inactive old scenic URL rules now use locally authored Big Sur wallpaper.
- EX-007: removed giant source `style.css`; mechanically split effective declarations, preserving cascade order, into 7 sections under `src/styles/` (foundation, desktop, lock, iOS, polish, Big Sur, iOS refinements). Bundler emits **one** CSS asset; asset-relative URLs updated.

## Proof from GitHub Actions
- [Full latest successful run](https://github.com/joyboy257/joyboy257/actions/runs/40481750791): build, TypeScript, content checks, 28/28 browser assertions, 9/9 history/route assertions, 2/2 first-view resource checks.
- First view conservatively measured as **decoded** HTTP body bytes (not just gzip): **234,593 B on 390×844 emulated phone**, **293,773 B on 1440×900 Mac**, below 300 KB mobile / 350 KB desktop budgets.
- Six valid Lighthouse samples: median **99 mobile**, **100 desktop**. No errors. Previous job at `40480819980` failed because a third Lighthouse process timed out; browser/byte/image tests passed and two mobile results both scored 99. The test runner was updated to retry timeouts, preserving three successful samples and original thresholds.
- Combined compiled HTML/CSS/JS: **32,890 B gzip**; only one CSS bundle.
- The optimized photo images were decoded and compared to the same JPEG source: **37.26 dB PSNR mobile**, **37.53 dB PSNR desktop**, indicating low compression error.

## Visual verification vs prior *optimized* G1 screenshot
The following numbers are percent of pixels with >30/255 per-channel difference between equal-size automated screenshots:
- Mac lock **0.183%**; Mac Finder **0.005%**; Mac Finder + Mirai **2.21%** (remote case-study hero loading differs).
- Emulated iPhone lock **0.671%**; iPhone unlocked **0.028%**; iPhone Mirai **0.028%**.
- Automated differences are a **regression alarm, not a certification of Apple UI fidelity**. Four owner-provided baseline screenshots are preserved in prior G0 audit.

## Rights and release limits
- Original photo source and SHA are pinned in `assets/wallpapers/SOURCE_AND_SIZE.json`; [Unsplash License](https://unsplash.com/license) permits website use and modification. Existing site credit to Jackie Alexander was preserved, but exact original photographer-page matching remains to verify before release.
- No new personal information, credentials or private screenshots were added.
- **G1 not yet accepted:** EX-006 keyboard/window semantics, EX-007 remaining orphan/dead CSS and EX-008 project-image fallbacks, EX-009 final CI/a11y/Safari and launch signoffs remain open. G2-G5 untouched.
