#!/usr/bin/env python3
"""Recruiter-first DeonOS acceptance: no password, no backend, no fake PDF link."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE=os.getenv("BASE_URL","http://127.0.0.1:4173").rstrip("/")
OUT=Path(os.getenv("EVIDENCE_DIR","../../recruiter-evidence"))
OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def verify(name,value):
    result=bool(value);checks.append({"name":name,"pass":result})
    if not result:raise AssertionError(name)
def screenshot(page,filename):
    page.screenshot(path=str(OUT/filename),full_page=False,animations="disabled")

with sync_playwright() as playwright:
    for engine in ["chromium","webkit"]:
        browser=getattr(playwright,engine).launch()
        try:
            for mobile in (False,True):
                key=f"{engine}-{'iphone' if mobile else 'mac'}"
                ctx=browser.new_context(viewport={"width":390 if mobile else 1440,
                                                  "height":844 if mobile else 900},
                                        is_mobile=mobile,has_touch=mobile,
                                        reduced_motion="reduce",device_scale_factor=1)
                page=ctx.new_page()
                errors=[]
                page.on('pageerror',lambda err: errors.append(str(err)))
                response=page.goto(BASE+"/",wait_until="load")
                verify(key+" homepage loads",response.status==200)
                verify(key+" lock visible",page.locator("#lock-screen").is_visible())
                verify(key+" résumé link visible without unlocking",page.locator(".lock-resume-link").is_visible())
                screenshot(page,key+"-lock.png")
                page.locator(".lock-resume-link").click()
                verify(key+" single click opens résumé",page.url.endswith("/resume.html"))
                verify(key+" résumé content renders",page.get_by_role("heading",name="Professional Experience").is_visible())
                verify(key+" PDF download link exists",page.locator('a[download="Deon-Quek-Resume.pdf"]').count()==1)
                screenshot(page,key+"-resume.png")
                page.goto(BASE+"/")
                verify(key+" visiting résumé does not unlock OS",page.locator("#lock-screen").is_visible())
                page.locator("#unlock").click()
                page.wait_for_timeout(530)
                verify(key+" unlock reveals OS",not page.locator("#lock-screen").is_visible())
                if mobile:
                    verify(key+" home visible after unlock",page.locator("#phone-app").is_hidden())
                    verify(key+" mobile résumé widget present",page.locator(".recruiter-widget").is_visible())
                    page.locator(".recruiter-widget").click()
                    verify(key+" mobile home opens résumé",page.url.endswith("/resume.html"))
                    page.goto(BASE+"/")
                    page.locator(".lock-explore-link").click()
                    page.wait_for_timeout(530)
                    verify(key+" explore button opens Welcome app",page.locator("#phone-app .welcome-pane").is_visible())
                    screenshot(page,key+"-welcome.png")
                    page.locator('#phone-home').click()
                    verify(key+" Home returns to springboard",page.locator("#phone-app").is_hidden())
                else:
                    verify(key+" Welcome auto-opens",page.locator("#mac-window .welcome-pane").is_visible())
                    verify(key+" Welcome has four actions",page.locator("#mac-window .welcome-action").count()==4)
                    verify(key+" 3 featured projects",page.locator("#mac-window .welcome-feature").count()==3)
                    screenshot(page,key+"-welcome.png")
                    page.locator('#mac-window .welcome-feature[data-project="mirai"]').click()
                    verify(key+" Welcome to Mirai",page.locator("#mac-window .case-pane h2").inner_text()=="Mirai")
                    page.locator('.mac-dock [data-app="finder"]').click()
                    verify(key+" Finder still works",page.locator("#mac-window .finder-layout").is_visible())
                verify(key+" no site JavaScript errors",not errors)
                ctx.close()
        finally:browser.close()
    request=playwright.request.new_context()
    for path in ("/resume.html","/favicon.svg","/from/resume",
                 "/resume/Deon-Quek-Resume.pdf"):
        r=request.get(BASE+path)
        verify(path+" status 200",r.status==200)
        if path.endswith(".pdf"):
            verify("PDF content-type",r.headers.get("content-type","").startswith("application/pdf"))
            verify("PDF has real header",r.body().startswith(b"%PDF-"))
    request.dispose()
report={"base":BASE,"passed":sum(c["pass"] for c in checks),"failed":sum(not c["pass"] for c in checks),"checks":checks,
        "physical_iPhone_Safari":False}
(OUT/"recruiter-qa.json").write_text(json.dumps(report,indent=2)+"\n")
print(json.dumps({"passed":report["passed"],"failed":report["failed"]}))
if report["failed"]:raise SystemExit(1)
