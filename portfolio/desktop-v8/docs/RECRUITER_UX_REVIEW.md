# DeonOS — Recruiter-first UX Review

**Programme:** DEONOS-RECRUITER-ENTRY-001  
**Status:** Draft for recruiter verification (not production)

## What changed

1. **Résumé in one click:** View Résumé is now visible on the locked Mac and iPhone screens, and reachable again from the desktop icon, Dock, iPhone widget and app grid. It is a normal static link; it does not require unlocking.
2. **Welcome to DeonOS:** Unlocking a Mac without a deep link now opens an introduction with four obvious actions: Résumé, Projects, About Me, Contact. Mirai, Amelia and Soleil are featured with supported technical descriptions.
3. **Mobile home preserved:** A dedicated Résumé widget replaces the decorative date widget on iPhone, without blocking the existing springboard. On the lock screen, “Explore my work” opens Welcome intentionally.
4. **Readable résumé page:** A fast standalone Preview-style HTML page presents the **v6 Applied AI** résumé and has Download PDF, Open PDF and Back to DeonOS actions. It works independently of the simulated OS. The PDF is a single-page, selectable-text print of the same content.
5. **No extra first-load media:** Résumé HTML/CSS/PDF is loaded only when requested. The existing Big Sur photograph, Finder, Spotlight, deep links, CSS architecture and static Vite site stay in place.

## Source note (important)
The text comes from the user's complete **Deon Quek Resume v6 — Applied AI.pdf** (23 October 2026), rather than an older v4.1 PDF which clipped content below Vertical's first bullet. The website's downloadable PDF is newly printed from the accessible web page; its typography is not a byte-identical copy of the original v6 PDF. No additional jobs, achievements or numbers were invented.

## Recruiter acceptance checks
- [ ] At lock screen, select **View Résumé**: opens without unlock.
- [ ] Check the PDF download and page sections: Profile, Skills, Experience, Projects, Education.
- [ ] On Mac, click/swipe to unlock: Welcome appears with four actions.
- [ ] Tap **Explore Projects**: Finder still works, all 21 cases remain.
- [ ] Open Mirai from Welcome, then return using Dock.
- [ ] On iPhone, unlock to original Home: résumé widget works without opening Files.
- [ ] Direct `?project=amelia` still relocks, then opens Amelia after unlock.
- [ ] Reload always relocks; use keyboard navigation and verify focus labels.

## Engineering constraints
- Existing Vercel project only. Do not change production before preview passes relevant checks.
- No React, backend, huge eager files or analytics workarounds.
- Do not treat generated/illustrative imagery as engineering evidence.
- Vercel visitor tracking remains a separate G1 issue and is not represented as active here.

## Branches
- Base: `programme/deonos-g1-foundation-2026-10-27`
- Candidate: `feature/deonos-recruiter-entry-001`
- Review PR: https://github.com/joyboy257/joyboy257/pull/3
