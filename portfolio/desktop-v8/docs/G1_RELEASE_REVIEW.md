# DeonOS G1 — preview release review checklist

Review date: 2026-10-28, Singapore. This page covers the G1 **preview deployment**, not a production replacement.

## Open the current G1 preview

- **Preview:** https://deon-desktop-portfolio-owsfgs9ow-deonaqwx-9156s-projects.vercel.app/
- **Deep link:** https://deon-desktop-portfolio-owsfgs9ow-deonaqwx-9156s-projects.vercel.app/?project=amelia
- **Résumé-source link:** https://deon-desktop-portfolio-owsfgs9ow-deonaqwx-9156s-projects.vercel.app/from/resume
- **Production (unchanged):** https://deon-desktop-portfolio.vercel.app/
- **Build source SHA:** `89f135183174a11ada7fb397352e911ed50d1eb3`
- **Preview deployment ID:** `dpl_CANth7FGcLpCrPAsiG3oiKkiv8tU`. Same canonical Vercel project `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`.
- **Rollback target:** original production deployment `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK`.

## What changed, in ordinary English

1. **Faster first screen:** The same lock-screen photo is now optimized and served by this site, rather than fetched as an oversized remote JPG. Mobile first-view roughly 243 KB in previous G1 lab runs, under the 300 KB cap; desktop roughly 302 KB.
2. **Mac controls work properly:** Finder minimizes and returns using the Dock, maximize reverses, and closing a window clears stale position.
3. **Navigation:** Browser Back/Forward between case studies works; iPhone Files back/Home works; opening a shared project link still shows the lock screen first.
4. **Keyboard:** Spotlight opens with Command-K / Ctrl-K; Escape exits search before closing Finder. Menu Escape and tabs restore focus appropriately.
5. **Project evidence:** All 21 projects have source-grounded descriptions. Five public project images now explain what they show; missing/blocked images become meaningful engineering summaries, not blank placeholders. No fabricated screenshots or customer metrics.
6. **Code/performance:** The site remains static (TypeScript/Vite, no React/backend), seven obsolete source files retired, styles grouped and sent as one CSS file. No new Vercel project.
7. **Small fixes from release QA:** favicon included; two decorative status labels use valid markup; darker text improves readability while preserving appearance.

## What to test on your actual iPhone (Safari)

1. Open the preview above in **Safari** and take a quick look at the lock screen.
2. Swipe up, open **Files**, select **Mirai**, return to Files, then go Home.
3. Refresh: the lock screen should appear again. Open the Amelia deep link: unlock should land on Amelia.
4. If something is broken, note the screen, action and what happened. Only physical Safari evidence can close this device check.

## What must still be true before promoting to production

- The release QA suite against the **deployed preview** must pass: Chromium + WebKit, WCAG accessibility, correct paths/assets, lock/deep links, zero page errors, saved screenshots.
- G1 cold-load and existing behavior checks must pass without worse performance.
- **Vercel Web Analytics remains disabled/unavailable:** API returns 404 `Web Analytics not found`. The source script does not magically activate the Vercel dashboard. Enable Web Analytics in the existing Vercel project's dashboard, then redeploy and verify real pageviews. Hobby plan allows aggregate pageviews, not custom interaction events.
- The public case images are external GitHub images with rights/source records pending; never claim they prove live production. Exact photograph attribution should be verified before final release.
- Keep production intact until applicable gates are met. Do not claim a physical device has been tested by emulation.

## Links to evidence

- [G1 CI (pre-EX-009)](https://github.com/joyboy257/joyboy257/actions/runs/40623793995)
- [First deployed-preview audit: failed on contrast/ARIA/favicon](https://github.com/joyboy257/joyboy257/actions/runs/40627193229)
- [Corrected deployed-preview audit](https://github.com/joyboy257/joyboy257/actions/runs/40627643415)
- [G1 development PR](https://github.com/joyboy257/joyboy257/pull/2)

**Preview release != production promotion.** Production remains at the original deployment until its release gates are satisfied.
