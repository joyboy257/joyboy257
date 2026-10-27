#!/usr/bin/env python3
"""Check truthfully labeled visuals and graceful failure with remote media blocked."""
from __future__ import annotations
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

url="http://127.0.0.1:4173/"
out=Path("../../g1-evidence/media")
out.mkdir(parents=True,exist_ok=True)
checks=[]
def require(name,value):
    passed=bool(value)
    checks.append({"test":name,"passed":passed})
    if not passed: raise AssertionError(name)

with sync_playwright() as playwright:
    browser=playwright.chromium.launch()
    try:
        for is_mobile in (False,True):
            kind="iphone_emulated" if is_mobile else "mac"
            context=browser.new_context(viewport={"width":390 if is_mobile else 1440,"height":844 if is_mobile else 900},
                                        is_mobile=is_mobile,has_touch=is_mobile,reduced_motion="reduce")
            page=context.new_page()
            page.route("**/raw.githubusercontent.com/**",lambda route:route.abort())
            page.goto(url)
            page.locator("#unlock").click()
            page.wait_for_timeout(480)
            page.locator(".app-item[data-app='finder']" if is_mobile else ".mac-dock [data-app='finder']").click()
            if is_mobile:
                page.locator("#phone-app .finder-list [data-project='mirai']").click()
                scope=page.locator("#phone-app")
            else:
                scope=page.locator("#mac-window")
            case=scope.locator(".case-pane")
            require(kind+" curated Mirai image explanation exists",case.locator("[data-media-note]").count()==1)
            image=case.locator("img[data-project-media]")
            # Aborted images can already be hidden before Playwright reaches them.
            # Never try to scroll an element that the site has correctly hidden.
            if image.is_visible():
                image.evaluate("(img)=>img.loading='eager'")
            image.wait_for(state="hidden",timeout=12000)
            require(kind+" failed image shows meaningful facts",case.locator(".case-hero.media-unavailable .snapshot-fact").count()>=1)
            require(kind+" image note admits error","could not load" in case.locator("[data-media-note]").inner_text())
            page.screenshot(path=str(out/(kind+"-image-unavailable.png")))
            if is_mobile:
                page.locator("#phone-back").click()
                page.locator("#phone-app .finder-list [data-project='soleil']").click()
                case=page.locator("#phone-app .case-pane")
            else:
                page.locator("#mac-window [data-group='all']").click()
                page.locator("#mac-window .finder-list [data-project='soleil']").click()
                case=page.locator("#mac-window .case-pane")
            require(kind+" private project shows engineering snapshot",case.locator(".case-hero-snapshot .snapshot-fact").count()>=1)
            require(kind+" private project invents no screenshot",case.locator("img[data-project-media]").count()==0)
            page.screenshot(path=str(out/(kind+"-private-case.png")))
            context.close()
    finally:browser.close()

result={"passed":sum(x["passed"] for x in checks),"failed":sum(not x["passed"] for x in checks),"checks":checks}
(out/"MEDIA_FALLBACK.json").write_text(json.dumps(result,indent=2))
print(json.dumps({"image_checks_passed":result["passed"],"image_checks_failed":result["failed"]}))
if result["failed"]:raise SystemExit(1)
