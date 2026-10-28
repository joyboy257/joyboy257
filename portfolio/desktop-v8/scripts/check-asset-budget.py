#!/usr/bin/env python3
"""EX-008: cold first-screen byte and wallpaper regression on Vite preview.

A conservative byte count: response.body() is decoded bytes (>= compressed
wire bytes for text), so passing its limit is stronger than a gzip-only estimate.
The physical iPhone Safari and production CDN are separate release checks.
"""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ORIGIN = "http://127.0.0.1:4173/"
OUT = Path("../../g1-evidence/asset-budget")
OUT.mkdir(parents=True, exist_ok=True)
LIMITS = {
    "iphone_emulated": {"width": 390, "height": 844, "limit": 300000, "wallpaper": "lock-mobile"},
    "mac": {"width": 1440, "height": 900, "limit": 350000, "wallpaper": "lock-desktop"},
}

report = {"cold_page_checks": [], "method": "decoded response bytes; conservative vs compressed transfer"}
with sync_playwright() as p:
    browser = p.chromium.launch()
    try:
        for name, profile in LIMITS.items():
            ctx = browser.new_context(
                viewport={"width": profile["width"], "height": profile["height"]},
                is_mobile=(name == "iphone_emulated"),
                has_touch=(name == "iphone_emulated"),
                device_scale_factor=2 if name == "iphone_emulated" else 1,
                reduced_motion="reduce",
            )
            page = ctx.new_page()
            responses = []
            exceptions = []
            page.on("response", lambda r: responses.append(r))
            page.on("pageerror", lambda error: exceptions.append(str(error)))
            page.goto(ORIGIN, wait_until="load", timeout=30000)
            page.wait_for_timeout(550)
            page.screenshot(path=str(OUT / f"{name}-optimized-lock.png"), full_page=False)

            first_view = []
            for response in responses:
                url = response.url
                parsed = urlparse(url)
                if parsed.hostname != "127.0.0.1" or parsed.path.startswith("/_vercel/"):
                    continue
                size = len(response.body())
                first_view.append({
                    "path": parsed.path,
                    "http": response.status,
                    "bytes": size,
                    "content_type": response.headers.get("content-type", ""),
                })
            first_view.sort(key=lambda r: r["bytes"], reverse=True)
            total = sum(asset["bytes"] for asset in first_view)
            wallpapers = [x for x in first_view if "lock-mobile" in x["path"] or "lock-desktop" in x["path"]]
            photo_ok = (len(wallpapers) == 1 and profile["wallpaper"] in wallpapers[0]["path"]
                        and wallpapers[0]["http"] == 200 and "image/webp" in wallpapers[0]["content_type"])
            entry = {
                "surface": name,
                "viewport": [profile["width"], profile["height"]],
                "first_view_bytes_uncompressed": total,
                "limit_bytes": profile["limit"],
                "assets": first_view,
                "wallpaper_variant_ok": photo_ok,
                "no_remote_unsplash": not any("images.unsplash.com" in r.url for r in responses),
                "lock_visible": page.locator("#lock-screen").is_visible(),
                "page_errors": exceptions,
                "pass": total <= profile["limit"] and photo_ok and not exceptions
                        and page.locator("#lock-screen").is_visible()
                        and not any("images.unsplash.com" in r.url for r in responses),
            }
            report["cold_page_checks"].append(entry)
            print(json.dumps({k: v for k, v in entry.items() if k != "assets"}))
            ctx.close()
    finally:
        browser.close()

(OUT / "EX008_COLD_LOAD.json").write_text(json.dumps(report, indent=2) + "\n")
if not all(entry["pass"] for entry in report["cold_page_checks"]):
    raise SystemExit("EX-008 first-view regression or wallpaper budget failed")
