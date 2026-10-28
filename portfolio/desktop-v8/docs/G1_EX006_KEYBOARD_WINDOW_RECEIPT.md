# G1 checkpoint — keyboard, window controls and dead-file cleanup

Date: 2026-10-28 (Singapore). Source branch: `programme/deonos-g1-foundation-2026-10-27`.

## What is now implemented
- Mac window minimize and restore via its Dock icon, maximize and restore, close without leaving stale window position or state.
- Spotlight search shortcuts (Command-K / Control-K); Escape closes search first, then the window on a later press. Focus returns to the prior control.
- Menubar Escape returns focus to the menu trigger. The earlier bug in the menu-closing selector was caught by the new browser tests and corrected.
- Finder case tabs and categories return keyboard focus to the selected element after DOM rerender.
- Mobile Escape on Home does not open or close an unintended app. Closing mobile Files returns Home.
- Removed seven unused G0-era root files: `apple-hig.css`, `experience.css`, `experience.js`, `icons.js`, `ios.css`, `ios.js`, `polish.css`. The live TypeScript entry loads only the current bundled CSS and active app. Their original content remains in git history.

## Verified, not inferred
[Full passing GitHub Actions run 40623793995](https://github.com/joyboy257/joyboy257/actions/runs/40623793995). Artifact: `deonos-g1-ex004-40623793995` (includes screenshots and Lighthouse JSON).
- **21/21 keyboard and window checks**, including menu and search focus restoration, dock restore, zoom, Escape hierarchy and mobile home.
- **28/28 existing browser journeys**, **9/9 history/deep-link checks**, **10/10 image failure/private-media checks**.
- **Lighthouse median 99/100 mobile and 100/100 desktop**, three completed runs per viewport. 
- **242,622 decoded first-view bytes on emulated iPhone** (300,000 max) and **301,802 bytes on desktop** (350,000 max).
- **35,168 bytes gzip HTML/JS/CSS** (<100,000 budget).
- No failed browser assertions or captured page exceptions.
- Twenty-plus automated image captures in the artifact. Chromium/mobile viewport emulation is not physical iPhone Safari certification.

## Status and follow-up
EX-006 keyboard/window slice: **PASS**; EX-007 unused legacy file cleanup: **PASS**. G1 overall remains **NOT RELEASE READY**. EX-009 release review, keyboard accessibility beyond the covered flows, a physical iPhone Safari smoke, analytics collector receipt and case-media rights checks remain.

Existing Vercel project `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`, READY deployment `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK` unchanged. Draft PR only. Do not merge or promote until applicable release gates pass.
