#!/usr/bin/env python3
"""EX-UX-001: verify actual deployed public preview, accessibility and initial transfer."""
import json
import os
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

BASE=os.environ["RECRUITER_PUBLIC_PREVIEW"].rstrip("/")
OUT=Path("../../recruiter-release-evidence");OUT.mkdir(exist_ok=True)
checks=[];issues=[]
def check(name,condition):
    x=bool(condition);checks.append({"name":name,"pass":x})
    if not x:print("FAIL",name)
def run_axe(page,name):
    page.add_script_tag(path="node_modules/axe-core/axe.min.js")
    result=page.evaluate("""async()=>{const r=await axe.run(document,{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
      return r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,
       nodes:v.nodes.slice(0,6).map(n=>({target:n.target,summary:n.failureSummary}))}));}""")
    if result:issues.append({"surface":name,"violations":result})
    check(name+" has no serious accessibility violations",
          not any(v["impact"] in ("serious","critical") for v in result))
with sync_playwright() as playwright:
    for engine in ("chromium","webkit"):
        browser=getattr(playwright,engine).launch()
        try:
            for mobile in (False,True):
                surface=engine+("-mobile" if mobile else "-desktop")
                ctx=browser.new_context(viewport={"width":390 if mobile else 1440,"height":844 if mobile else 900},
                                        reduced_motion="reduce",is_mobile=mobile,has_touch=mobile)
                page=ctx.new_page()
                errors=[]
                page.on("pageerror",lambda e:errors.append(str(e)))
                responses=[]
                page.on("response",lambda r: responses.append(r))
                home=page.goto(BASE+"/",wait_until="load",timeout=30000)
                check(surface+" homepage 200",home.status==200)
                check(surface+" résumé visible on lock",page.locator(".lock-resume-link").is_visible())
                # No eager PDF/HTML résumé fetch while showing the photographic lock.
                local=[r for r in responses if urlparse(r.url).hostname==urlparse(BASE).hostname]
                root=[r for r in local if "resume.html" not in r.url and "/resume/" not in r.url]
                sizes=[]
                for r in root:
                    try:sizes.append(len(r.body()))
                    except:pass
                total=sum(sizes)
                budget=300000 if mobile else 350000
                check(surface+" initial decoded bytes within budget",total<=budget)
                check(surface+" no eager PDF download",not any("/resume/Deon-Quek-Resume.pdf" in r.url for r in local))
                page.screenshot(path=str(OUT/(surface+"-lock.png")))
                page.locator(".lock-resume-link").click()
                check(surface+" resume navigation",page.url.endswith("/resume.html"))
                check(surface+" complete education",page.get_by_text("Republic Polytechnic").is_visible())
                run_axe(page,surface+"-resume")
                page.screenshot(path=str(OUT/(surface+"-resume.png")))
                page.goto(BASE+"/")
                page.locator("#unlock").click()
                page.wait_for_function("document.querySelector('#lock-screen').hidden",timeout=7500)
                if mobile:
                    check(surface+" original phone home visible",page.locator("#phone-app").is_hidden())
                    check(surface+" resume widget",page.locator(".recruiter-widget").is_visible())
                else:
                    check(surface+" welcome visible",page.locator("#mac-window .welcome-pane").is_visible())
                    run_axe(page,surface+"-welcome")
                    page.screenshot(path=str(OUT/(surface+"-welcome.png")))
                appErrors=[e for e in errors if ".well-known/vercel/jwe" not in e]
                if appErrors:print(json.dumps({"surface":surface,"unclassified_page_errors":appErrors}))
                check(surface+" no application errors",not appErrors)
                ctx.close()
        finally:browser.close()
    request=playwright.request.new_context()
    for path in ("/resume.html","/resume/Deon-Quek-Resume.pdf","/from/resume","/favicon.svg"):
        r=request.get(BASE+path,timeout=25000)
        check("HTTP 200 "+path,r.status==200)
        if path.endswith(".pdf"):
            check("downloadable PDF bytes",r.body().startswith(b"%PDF-"))
    request.dispose()
report={"base":BASE,"passed":sum(x["pass"] for x in checks),
        "failed":sum(not x["pass"] for x in checks),
        "checks":checks,"accessibility_violations":issues,
        "note":"WebKit is not physical iPhone Safari"}
(OUT/"preview-qa.json").write_text(json.dumps(report,indent=2)+"\n")
print(json.dumps({"passed":report["passed"],"failed":report["failed"],"issues":issues}))
if report["failed"]:raise SystemExit("Recruiter preview validation failed")
