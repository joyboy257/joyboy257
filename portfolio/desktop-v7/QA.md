# DeonOS V7 — native responsive portfolio and gesture QA

## Intent
V7 follows the interaction idea of **frvky.online**: a personal device with a lock screen, notifications and unlock interaction. The visual assets, editorial copy and apps here were independently built for Deon Quek and his portfolio.

Unlike V6, the mobile experience is **not** a cramped desktop: mobile uses a dedicated iPhone-like springboard with widgets, app grid, status bar, Dynamic Island-inspired pill and frosted dock.

## What works in code
- A swipe up anywhere on the lock screen — including over the notification tiles — can unlock.
- Touch, pointer, trackpad-wheel, keyboard and click fallback use independent input paths.
- Pointer cancellation on Safari falls back to touchend.
- The lock screen follows the upward drag; normal scrolling is disabled only inside the lock overlay.
- Notification taps open the relevant project/brief; swipes suppress synthetic post-gesture clicks.
- Mobile projects, engineering, evidence, public links, Photos, Notes, About, Safari, Brief and Contact use one shared 21-project dataset.
- From an iOS app, the home indicator supports tap or upward touch gesture; from the left edge a rightward gesture goes back; pulling down at top right opens Control Center.
- `?project=mirai` and other valid project deep links skip lock and open the requested dossier.

## Swipe rule cases
| Input | Expected |
|---|---|
| 81px up, 7px sideways, 520ms | Unlock |
| 42px up, 10px sideways, 170ms | Unlock (flick) |
| 30px up, 0px sideways, 170ms | No unlock |
| 84px up, 95px sideways, 600ms | No unlock (horizontal) |
| 90px down | No unlock |
| 59px up, 9px sideways, 800ms | Unlock |

Static validation confirmed JavaScript parsability, unique DOM IDs, source references, all 21 dossiers, and the specific touch/pointer/wheel event paths. These are **unit-style / structural checks**, not physical iPhone acceptance.

## Physical/device checks before public GitHub Pages launch
1. Test on an iPhone Safari (home screen and lock screen, both notification and empty-surface swipe).
2. Test in-app Safari/Chrome on iPhone and Android Chrome.
3. Test a desktop trackpad wheel unlock and pointer upward drag.
4. Verify iOS app opening, back swipe, home indicator, Control Center and browser back.
5. View at 320, 375, 390, 430, 768, 1024 and 1440 CSS pixels.
6. Inspect screenshots, focus visibility, no off-screen text, contrast and voiceover semantics.
7. Inspect all external public project URLs and private project release qualifiers.

The existing V5 and V6 deployments remain separate. The live GitHub profile stays untouched.
