# DeonOS G1 — EX-009 deployment review receipt

Recorded: **28 October 2026, Singapore**.

## Live review deployment
- **Public preview:** https://deon-desktop-portfolio-owsfgs9ow-deonaqwx-9156s-projects.vercel.app/
- **Preview deployment:** `dpl_CANth7FGcLpCrPAsiG3oiKkiv8tU`
- **Pinned website source SHA:** `89f135183174a11ada7fb397352e911ed50d1eb3`.
- **Project:** existing Vercel project `prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`, *not a newly created project*.
- **Production:** https://deon-desktop-portfolio.vercel.app/ remains on deployment `dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK`.

## Real deployed preview gate results
[EX-009 run 40628059551](https://github.com/joyboy257/joyboy257/actions/runs/40628059551):
- **56/56 assertions PASS**, testing desktop and mobile viewports in Chromium and WebKit on the **actual deployed preview**, including lock, click-unlock, Finder, Mirai, Amelia deep link, refresh/relock, routes and assets.
- **0 WCAG 2.x A/AA violations** in automated axe-core scans on the Chromium desktop and mobile pages under test.
- **0 application JavaScript exceptions**. A separate external Vercel preview-toolbar JWE access-control warning was captured and classified, rather than silently discarded or misattributed to site code.
- Saved **8 browser screenshots** and test JSON in GitHub Actions artifact `deonos-g1-ex009-40628059551`.
- Deployed `/favicon.svg` and `/from/resume` returned HTTP 200.

[Source and local build run 40627643450](https://github.com/joyboy257/joyboy257/actions/runs/40627643450):
- 28/28 original site journeys; 9/9 route/history tests; 21/21 window/keyboard checks; 10/10 image-fallback tests.
- Lighthouse median 99 mobile / 100 desktop, with three valid runs each.
- 243,257 decoded cold first-view bytes on emulated iPhone vs <=300,000 limit.
- 302,437 decoded cold first-view bytes desktop vs <=350,000 limit.
- 35,282 bytes gzip for compiled HTML+CSS+JS vs <=100,000 limit.

## Changes a recruiter should notice
1. Lock screen has the same art, with far smaller, locally served responsive images.
2. Finder and Files navigation restore correct case studies when going Back/Forward; refresh relocks.
3. Mac Dock minimizes/restores correctly; window zoom toggles; menu/Spotlight keyboard focus works.
4. Five public project images have meaningful captions; the 16 image-less cases and failures show genuine engineering summaries instead of fake screenshots or blanks.
5. All 21 project case records now use validated content and evidence manifests. No claims were inflated.
6. Code stays static, TypeScript/Vite build, one CSS download, obsolete scripts retired.
7. Release audit fixed an omitted favicon, decorative status ARIA, and low-contrast small text.

## Still outstanding — production gate remains open
- **Physical iPhone Safari** smoke on the public preview is not yet verified. Linux WebKit simulation is not a real phone.
- **Vercel Web Analytics activation** remains pending. Vercel's API returned **404 Web Analytics not found** for this project. Existing tracking code cannot collect pageviews until analytics is enabled in the dashboard and a production deployment is made. The account is on Hobby; event/pageview feature coverage differs by plan, and custom click events aren't supported on Hobby.
- Public project media should retain safe source/provenance and be rights-checked before localizing or republishing it.
- Site production remains unchanged per preservation rule. **This is a public preview release, not a production rollout.**

For verification, follow [G1_RELEASE_REVIEW.md](./G1_RELEASE_REVIEW.md).
