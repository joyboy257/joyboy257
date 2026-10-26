# DeonOS V8 — Apple HIG-based refinement

## Why the visual revision was necessary

V7 successfully separated macOS and iOS experiences, but its enlarged brand header, aggressively colored cards, broad teal gradients, mixed icon geometry and dashboard-style nested boxes made it look like a generic mobile launcher rather than an iPhone.

This revision follows Apple's [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) as a design reference without using Apple's proprietary icon, font or wallpaper files.

## Platform choices

**iPhone**
- Treat the Home Screen like a springboard, not a landing page: no huge marketing headline; native-feeling top status region, breathing room, two modest widgets, 4-column icon grid, floating search capsule and a single frosted dock.
- Consistent icon scale, corner geometry, original layered vector artwork for Files, Mirai, Read Me, About, Mail and Code; native-looking Photos, Safari and Notes inspired originals.
- Use the host Apple system font via `-apple-system` where available. No bundled Apple font files.
- Content is regular, neutral iOS surface; glass and blur belong on the status/navigation/controls layer, following HIG Materials. Grouped list rows and large titles prioritize useful work.
- Respect safe areas with `viewport-fit=cover` and `env(safe-area-inset-*)`, 44pt active controls, high-contrast content, focus visibility, and reduced motion.
- Existing state machine keeps full-screen apps, edge-back gesture, swipe-home gesture, Control Center, URL deep links and a searchable portfolio of 21 cases.

**Mac**
- Use a quieter blue/neutral wallpaper, native menu/titlebar proportions, translucent Finder sidebar, consistent selection states and layered dock material.
- Retain the draggable/resizable window system, dock, Spotlight, keyboard shortcuts and 21 case files.

**Both**
- Retain the launch lock screen, motion feedback and touch/pointer/trackpad unlock paths.
- Preserve production-vs-test-vs-concept qualifications and public evidence links.
- Do not publish private repositories, customer data, or nonpublic credentials.

## Apple source references
- iOS foundations: https://developer.apple.com/design/human-interface-guidelines/designing-for-ios/
- macOS foundations: https://developer.apple.com/design/human-interface-guidelines/designing-for-macos/
- Materials and Liquid Glass: https://developer.apple.com/design/human-interface-guidelines/materials
- Layout and safe areas: https://developer.apple.com/design/human-interface-guidelines/layout
- Layered app icons: https://developer.apple.com/design/human-interface-guidelines/app-icons
- Buttons / hit targets: https://developer.apple.com/design/human-interface-guidelines/buttons
- Toolbars and navigation: https://developer.apple.com/design/human-interface-guidelines/toolbars

## Acceptance checklist

- [x] iPhone uses its own home/apps, not a reduced Mac window
- [x] Unique SVG IDs and no bundled SF font files
- [x] 21 project dossiers and Mirai live links preserved
- [x] Shared lock screen and swipe-unlock listeners preserved
- [x] Native-like icon proportions, content/control separation and safe-area CSS authored
- [ ] Device-level screenshot comparison at 320 / 375 / 390 / 430 px, iPhone Safari and Android Chrome
- [ ] Desktop screenshot review at 1024 / 1440 / 1920 px and window drag/resizing
- [ ] Touch, keyboard and screen-reader acceptance testing
- [ ] Check real asset loads, broken public links, contrasts and physical interaction timing

The preview is still a web simulation inspired by Apple’s design patterns, not an Apple-made interface or a certified iOS app.
