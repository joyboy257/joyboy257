#!/usr/bin/env python3
"""Featured Work: 3 curated, honest project stories; accessible on Mac and iPhone."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE="http://127.0.0.1:4173/"
OUT=Path("../../featured-evidence");OUT.mkdir(parents=True,exist_ok=True)
checks=[];page_errors=[]
def check(name,ok):
    checks.append({"name":name,"pass":bool(ok)})
    if not ok:raise AssertionError(name)

with sync_playwright() as p:
    for engine in ("chromium","webkit"):
        browser=getattr(p,engine).launch()
        try:
            for is_mobile in (False,True):
                surface=engine+("-iphone" if is_mobile else "-mac")
                ctx=browser.new_context(
                    viewport={"width":390 if is_mobile else 1440,"height":844 if is_mobile else 900},
                    is_mobile=is_mobile,has_touch=is_mobile,reduced_motion="reduce")
                page=ctx.new_page()
                page.on("pageerror",lambda error:page_errors.append(str(error)))
                page.goto(BASE)
                check(surface+" locked first",page.locator("#lock-screen").is_visible())
                page.screenshot(path=str(OUT/(surface+"-locked.png")),animations="disabled")
                page.locator("#unlock").click()
                page.wait_for_function("() => document.querySelector('#lock-screen').hidden")
                if is_mobile:
                    check(surface+" keeps iPhone home",page.locator("#phone-app").is_hidden())
                    page.locator('.app-item[data-app="featured"]').click()
                    scope="#phone-app"
                else:
                    check(surface+" opens Welcome",page.locator("#mac-window .welcome-pane").is_visible())
                    check(surface+" preserves three featured teaser actions",page.locator("#mac-window .welcome-feature[data-project]").count()==3)
                    page.screenshot(path=str(OUT/(surface+"-welcome.png")),animations="disabled")
                    page.locator('#mac-window .welcome-action[data-app="featured"]').click()
                    scope="#mac-window"
                gallery=page.locator(scope+" .featured-gallery")
                check(surface+" gallery opens",gallery.is_visible())
                check(surface+" three case cards",gallery.locator(".featured-card").count()==3)
                check(surface+" five role labels and cards",gallery.locator(".featured-category").count()==3)
                first=gallery.locator('.featured-card').first
                labels=first.locator(".featured-visual-kicker")
                print(json.dumps({"debug_surface":surface,"featured_label_count":labels.count(),
                                  "featured_card_html":first.evaluate("(e)=>e.outerHTML.slice(0,1100)")}))
                check(surface+" photo has editorial label",labels.count()==1 and labels.text_content().strip()=="Operator workspace")
                check(surface+" Soleil not passed off as screenshot",gallery.locator('.featured-visual-concept').count()==1)
                check(surface+" all-projects path",gallery.locator('[data-app="finder"]').count()==1)
                check(surface+" no horizontal screen overflow",page.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth+2"))
                page.screenshot(path=str(OUT/(surface+"-featured.png")),animations="disabled")
                gallery.locator('.featured-card .featured-cta[data-project="mirai"]').click()
                case=page.locator(scope+" .case-pane")
                check(surface+" opens Mirai",case.locator("h2").first.inner_text()=="Mirai")
                check(surface+" three engineering chapters",case.locator(".mirai-chapter").count()==3)
                check(surface+" sourced four-stage architecture flow",case.locator(".mirai-flow li").count()==4)
                check(surface+" source context stated", "July 2026" in case.locator(".mirai-proof").inner_text())
                check(surface+" honest limits", "not customers" in case.locator(".mirai-proof").inner_text())
                check(surface+" original case tabs remain",case.locator("[data-tab]").count()==3)
                check(surface+" original public evidence links remain",case.locator(".case-links a").count()>=1)
                check(surface+" no horizontal case overflow",page.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth+2"))
                case.locator(".mirai-chapter").last.scroll_into_view_if_needed()
                page.screenshot(path=str(OUT/(surface+"-mirai-proof.png")),animations="disabled")
                if is_mobile:
                    page.locator("#phone-back").click()
                    check(surface+" mobile Back restores gallery",page.locator("#phone-app .featured-gallery").is_visible())
                    page.locator("#phone-home").click()
                    check(surface+" mobile Home restores springboard",page.locator("#phone-app").is_hidden())
                    check(surface+" resume widget survives",page.locator(".recruiter-widget").is_visible())
                else:
                    page.locator('.mac-dock [data-app="finder"]').click()
                    check(surface+" Finder still opens",page.locator("#mac-window .finder-layout").is_visible())
                ctx.close()
        finally:browser.close()
    browser=p.chromium.launch()
    try:
        ctx=browser.new_context(viewport={"width":1440,"height":900})
        page=ctx.new_page()
        page.route("**/raw.githubusercontent.com/**",lambda route:route.abort())
        page.goto(BASE)
        page.locator("#unlock").click()
        page.wait_for_function("() => document.querySelector('#lock-screen').hidden")
        page.locator('.welcome-action[data-app="featured"]').click()
        card=page.locator('.featured-card').first
        card.locator("img[data-feature-media]").wait_for(state="hidden",timeout=10000)
        check("GitHub media outage reveals meaningful gallery fallback",card.locator(".featured-visual.media-unavailable .featured-visual-backup").is_visible())
        page.screenshot(path=str(OUT/"mac-image-outage.png"),animations="disabled")
        card.locator('[data-project="mirai"]').click()
        case=page.locator("#mac-window .case-pane")
        case.locator("img[data-project-media]").wait_for(state="hidden",timeout=10000)
        check("Mirai image outage preserves architecture and proof",case.locator(".mirai-chapter").count()==3)
        check("Outage displays technical focus",case.locator(".case-hero.media-unavailable .case-graphic-snapshot").is_visible())
        ctx.close()
    finally:browser.close()
report={"passed":sum(x["pass"] for x in checks),
        "failed":sum(not x["pass"] for x in checks),
        "checks":checks,"page_errors":page_errors,
        "notes":"Browser iPhone is emulated; case images are public source assets, not live performance proof"}
(OUT/"FEATURED_UX_REPORT.json").write_text(json.dumps(report,indent=2))
print(json.dumps({"featured_checks_passed":report["passed"],"failed":report["failed"],"page_errors":len(page_errors)}))
if report["failed"] or page_errors:raise SystemExit("Featured Work checks failed")
