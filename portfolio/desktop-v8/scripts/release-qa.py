#!/usr/bin/env python3
"""EX-009: independent checks against actual Vercel preview (Chromium + WebKit).
Keeps actual evidence JSON and screenshots. No site mutations.
"""
from __future__ import annotations
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

URL=os.environ.get("DEONOS_PREVIEW_URL","https://deon-desktop-portfolio-kxi42448h-deonaqwx-9156s-projects.vercel.app").rstrip("/")
OUT=Path(os.environ.get("DEONOS_RELEASE_EVIDENCE","release-evidence"))
OUT.mkdir(exist_ok=True,parents=True)
assert URL.startswith("https://")
checks=[]
violations=[]
errors=[]
def check(name,valid):
    checks.append({"name":name,"pass":bool(valid)})
    if not valid:print("FAIL",name)

def check_axe(page,surface):
    page.add_script_tag(path="node_modules/axe-core/axe.min.js")
    results=page.evaluate("""async () => {
      const rules = ['wcag2a','wcag2aa','wcag21a','wcag21aa'];
      const output = await axe.run(document, {runOnly:{type:'tag',values:rules}});
      return {violations:output.violations.map(v=>({
        id:v.id,impact:v.impact,description:v.description,
        nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,15)
      })), passes:output.passes.length};
    }""")
    for v in results["violations"]:violations.append({"surface":surface,**v})
    severe=[v for v in results["violations"] if v["impact"] in ("critical","serious")]
    check(surface+" no serious WCAG problems",len(severe)==0)
    return results

with sync_playwright() as playwright:
    for engine in ("chromium","webkit"):
        browser=getattr(playwright,engine).launch()
        try:
            for mobile in (False,True):
                surface=engine+("-mobile" if mobile else "-desktop")
                context=browser.new_context(
                    viewport={"width":390 if mobile else 1440,"height":844 if mobile else 900},
                    device_scale_factor=2 if mobile else 1,
                    is_mobile=mobile,has_touch=mobile,
                    reduced_motion="reduce"
                )
                page=context.new_page()
                page.on("pageerror",lambda exc, surface=surface: errors.append({"surface":surface,"exception":str(exc)}))
                response=page.goto(URL+"/",wait_until="load",timeout=40000)
                check(surface+" homepage HTTP 200",response is not None and response.status==200)
                check(surface+" lock visible",page.locator("#lock-screen").is_visible())
                check(surface+" lock clock visible",page.locator("#lock-time").is_visible())
                page.screenshot(path=str(OUT/(surface+"-lock.png")))
                page.locator("#unlock").click()
                page.wait_for_timeout(520)
                check(surface+" unlock works",not page.locator("#lock-screen").is_visible())
                page.locator(".app-item[data-app='finder']" if mobile else ".mac-dock [data-app='finder']").click()
                if mobile:
                    check(surface+" Files visible",page.locator("#phone-app").is_visible())
                    page.locator("#phone-app .finder-list [data-project='mirai']").click()
                    check(surface+" Mirai loads",page.locator("#phone-app .case-pane h2").inner_text()=="Mirai")
                else:
                    check(surface+" Finder visible",page.locator("#mac-window").is_visible())
                    check(surface+" Mirai loads",page.locator("#mac-window .case-pane h2").inner_text()=="Mirai")
                page.screenshot(path=str(OUT/(surface+"-finder.png")))
                if engine=="chromium":
                    a11y=check_axe(page,surface)
                    (OUT/(surface+"-axe.json")).write_text(json.dumps(a11y,indent=2))
                page.reload(wait_until="domcontentloaded")
                check(surface+" reload relocks",page.locator("#lock-screen").is_visible())
                case=page.goto(URL+"/?project=amelia",wait_until="load")
                check(surface+" deep link status",case is not None and case.status==200)
                check(surface+" deep link relocks",page.locator("#lock-screen").is_visible())
                page.locator("#unlock").click()
                page.wait_for_timeout(520)
                check(surface+" Amelia deep link opens",page.locator("#phone-app .case-pane h2" if mobile else "#mac-window .case-pane h2").inner_text()=="Amelia Bot")
                check(surface+" no JS errors",not [x for x in errors if x["surface"]==surface])
                context.close()
        finally:browser.close()
    api=playwright.request.new_context()
    for route in ["/","/from/resume","/from/applications","/from/linkedin","/from/outreach","/from/github","/favicon.svg","/icons.svg","/analytics.js"]:
        r=api.get(URL+route,timeout=25000)
        check("HTTP 200 "+route,r.status==200)
    check("no JS errors all browsers",len(errors)==0)
    api.dispose()

result={"target":URL,"passed":sum(c["pass"] for c in checks),
        "failed":sum(not c["pass"] for c in checks),
        "checks":checks,"violations":violations,"page_errors":errors,
        "physical_iphone_safari":False,
        "notes":"WebKit on GitHub Ubuntu is not physical iPhone Safari. Performance Lighthouse in G1 CI separate."}
(OUT/"RELEASE_QA.json").write_text(json.dumps(result,indent=2)+"\n")
print(json.dumps({"passed":result["passed"],"failed":result["failed"],
                  "axe_violations":len(violations),"page_errors":len(errors)}))
if result["failed"]:raise SystemExit("Release QA failed, do not promote")
