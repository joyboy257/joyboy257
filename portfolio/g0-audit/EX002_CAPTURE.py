#!/usr/bin/env python3
"""DEONOS-EXPERIENCE-001 / EX-002 browser capture, read-only.

Uses a real Playwright browser on an externally reachable website. Does not
create Vercel projects, mutate deployments, or change source. Artifacts must
be reviewed before G0 acceptance. Emulated iPhone is NOT physical Safari.

Install once: python -m pip install playwright && python -m playwright install chromium
Run: python EX002_CAPTURE.py --url https://deon-desktop-portfolio.vercel.app/ --output ./ex002-evidence
Option: --lighthouse (requires locally installed Lighthouse CLI and Chrome)
"""
from __future__ import annotations

import argparse
import json
import statistics
import subprocess
import time
import traceback
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlencode

from playwright.sync_api import sync_playwright

BRANCH_SHA = "a63e3d3273e701a323a6e8772ce754421520f17b"
PROJECT_ID = "prj_NX88JqGzfUTOzvaTAQV73pwHWo7c"
DEPLOYMENT_ID = "dpl_9t3fWimpHmJe7S4Jus9QoTDYKdiK"
PROFILES = {
    "mac": {"width": 1440, "height": 900, "device_scale_factor": 1, "is_mobile": False, "has_touch": False},
    "iphone_emulated": {"width": 390, "height": 844, "device_scale_factor": 3, "is_mobile": True, "has_touch": True},
}
JS_METRICS = """() => ({
   navigation: performance.getEntriesByType('navigation').map(n => ({
      duration_ms: n.duration, domContentLoaded_ms: n.domContentLoadedEventEnd,
      loadEvent_ms: n.loadEventEnd, responseEnd_ms: n.responseEnd,
      transferSize: n.transferSize, encodedBodySize: n.encodedBodySize
   })),
   resources: performance.getEntriesByType('resource').map(r => ({
      url: r.name, initiatorType: r.initiatorType, transferSize: r.transferSize,
      encodedBodySize: r.encodedBodySize, decodedBodySize: r.decodedBodySize,
      duration_ms: r.duration
   })),
   paints: performance.getEntriesByType('paint').map(p => ({name:p.name, startTime:p.startTime})),
   visibleSurface: matchMedia('(max-width:720px)').matches ? 'ios':'mac'
})"""


def record_check(results, name, ok, observed=None, category="e2e"):
    results["checks"].append({"name": name, "result": "PASS" if ok else "FAIL", "observed": observed, "category": category})


def screenshots(page, out: Path, name: str, results):
    file = out / f"{name}.png"
    page.screenshot(path=str(file), full_page=False, animations="disabled")
    results["screenshots"].append({"file": file.name, "viewport": page.viewport_size, "page_url": page.url})


def collect_events(page, results):
    page.on("console", lambda msg: results["console"].append({"level":msg.type,"text":msg.text[:400]}) if msg.type == "error" else None)
    page.on("pageerror", lambda err: results["page_errors"].append(str(err)[:1000]))
    page.on("requestfailed", lambda req: results["failed_requests"].append({"url":req.url,"failure":str(req.failure)}))
    page.on("response", lambda r: results["http_errors"].append({"url":r.url,"status":r.status}) if r.status>=400 else None)
    page.on("response", lambda r: results["analytics_script_http"].append({"url":r.url,"status":r.status}) if "/_vercel/insights/script.js" in r.url else None)
    page.on("request", lambda r: results["analytics_beacon_attempts"].append(r.url) if "/_vercel/insights/" in r.url and "script.js" not in r.url else None)


def new_page(context, results):
    page = context.new_page()
    page.set_default_timeout(12000)
    collect_events(page, results)
    return page


def visit(page, url, results):
    t=time.perf_counter()
    r=page.goto(url, wait_until="domcontentloaded", timeout=35000)
    results["http_navigation"].append({"url":page.url,"status":r.status if r else None,"dom_ready_wall_ms":round((time.perf_counter()-t)*1000,2)})
    page.wait_for_timeout(700)  # let clock/assets stabilize for captures; not a performance assertion
    return r


def test_profile(browser, root: str, out: Path, name: str, profile: dict, results):
    context=browser.new_context(viewport={"width":profile["width"],"height":profile["height"]},
        device_scale_factor=profile["device_scale_factor"],is_mobile=profile["is_mobile"],has_touch=profile["has_touch"],
        reduced_motion="reduce", ignore_https_errors=False)
    try:
        page=new_page(context, results)
        visit(page,root,results)
        lock=page.locator("#lock-screen")
        record_check(results,f"{name}: fresh homepage lock",lock.is_visible())
        screenshots(page,out,f"{name}-lock",results)
        results["metrics"][name+"_cold"]=page.evaluate(JS_METRICS)
        record_check(results,f"{name}: unlock control exists",page.locator("#unlock").is_visible())
        page.locator("#unlock").click()
        page.wait_for_timeout(650)
        record_check(results,f"{name}: click unlock",not lock.is_visible())
        screenshots(page,out,f"{name}-unlocked",results)
        if name=="mac":
            page.locator(".desktop-item[data-app='finder']").click()
            record_check(results,"mac: Finder opens",page.locator("#mac-window").is_visible())
            screenshots(page,out,"mac-finder",results)
            page.locator("#mac-window [data-group='all']").click()
            page.locator("#mac-window .finder-list [data-project='mirai']").click()
            record_check(results,"mac: Finder selects Mirai",page.locator("#mac-window .case-pane h2").inner_text()=="Mirai")
            screenshots(page,out,"mac-finder-mirai",results)
            page.locator("#desktop-search").click()
            record_check(results,"mac: Spotlight opens",page.locator("#spotlight").is_visible())
            screenshots(page,out,"mac-spotlight",results)
            page.keyboard.press("Escape")
            page.locator(".mac-dock [data-app='terminal']").click()
            record_check(results,"mac: terminal view opens",page.locator("#mac-window .terminal-panel").is_visible())
            screenshots(page,out,"mac-terminal",results)
        else:
            page.locator(".app-item[data-app='finder']").click()
            record_check(results,"mobile: Files opens",page.locator("#phone-app").is_visible())
            screenshots(page,out,"iphone-files",results)
            page.locator("#phone-app .finder-list [data-project='mirai']").click()
            record_check(results,"mobile: Files opens Mirai",page.locator("#phone-app .case-pane h2").inner_text()=="Mirai")
            screenshots(page,out,"iphone-mirai",results)
            page.locator("#phone-home").click()
            record_check(results,"mobile: home button",not page.locator("#phone-app").is_visible())
        page.reload(wait_until="domcontentloaded")
        record_check(results,f"{name}: reload relocks",page.locator("#lock-screen").is_visible())
        screenshots(page,out,f"{name}-reload-lock",results)
        # Gesture test uses real browser input for desktop and CDP-emulated touch for iPhone.
        # This is NOT a physical Safari result.
        if name=="mac":
            page.mouse.move(700,720)
            page.mouse.down()
            page.mouse.move(700,470,steps=12)
            page.mouse.up()
        else:
            cdp=context.new_cdp_session(page)
            for i in range(13):
                typ="touchStart" if i==0 else "touchEnd" if i==12 else "touchMove"
                pts=[] if i==12 else [{"x":190,"y":710-i*23,"id":1,"radiusX":8,"radiusY":8,"force":0.6}]
                cdp.send("Input.dispatchTouchEvent",{"type":typ,"touchPoints":pts})
            cdp.detach()
        page.wait_for_timeout(650)
        record_check(results,f"{name}: upward swipe unlock",not page.locator("#lock-screen").is_visible(),
            "desktop mouse-pointer drag" if name=="mac" else "CDP touch emulation, NOT physical iPhone")
        screenshots(page,out,f"{name}-swipe-result",results)
        page.reload(wait_until="domcontentloaded")
        record_check(results,f"{name}: relock after gesture reload",page.locator("#lock-screen").is_visible())
        # Fresh deep link must remain locked, then open selected project.
        deeplink=root.rstrip("/")+"/?project=amelia"
        visit(page,deeplink,results)
        record_check(results,f"{name}: deep link remains locked",page.locator("#lock-screen").is_visible())
        page.locator("#unlock").click()
        page.wait_for_timeout(650)
        selector="#phone-app .case-pane h2" if profile["is_mobile"] else "#mac-window .case-pane h2"
        record_check(results,f"{name}: deep link resolves Amelia after unlock",
            page.locator(selector).count()>0 and page.locator(selector).inner_text()=="Amelia Bot")
        screenshots(page,out,f"{name}-deeplink-amelia",results)
        # Rewrites are live-deployment only; no user identity recorded.
        if name=="mac":
            for path in ("from/resume","from/applications","from/linkedin","from/outreach","from/github"):
                r=visit(page,urljoin(root,path),results)
                record_check(results,"rewrite /"+path,bool(r and r.status==200 and page.locator("#lock-screen").is_visible()),
                    {"http_status":r.status if r else None,"path":page.url})
        page.close()
    finally:
        context.close()


def lighthouse(root: str, out: Path, results):
    """Require three *successful* samples per device; retry transient CI timeouts.

    A failed/expired attempt is preserved in lighthouse_errors and never counted
    as a passing run. Scores and thresholds remain unchanged.
    """
    for form in ("mobile", "desktop"):
        completed = 0
        attempt = 0
        while completed < 3 and attempt < 5:
            attempt += 1
            run_number = completed + 1
            dest = out / f"lighthouse-{form}-{run_number}.json"
            # Avoid accepting an incomplete JSON left by a killed Lighthouse.
            dest.unlink(missing_ok=True)
            cmd = ["npx", "--no-install", "lighthouse", root, "--quiet",
                   "--output=json", f"--output-path={dest}",
                   "--chrome-flags=--headless --no-sandbox",
                   "--only-categories=performance", "--throttling-method=simulate"]
            if form == "desktop":
                cmd.append("--preset=desktop")
            try:
                run = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
                if run.returncode != 0 or not dest.exists():
                    results["lighthouse_errors"].append({
                        "form": form, "attempt": attempt, "returncode": run.returncode,
                        "stderr": run.stderr[-1400:]})
                    continue
                j = json.loads(dest.read_text())
                score = j.get("categories", {}).get("performance", {}).get("score")
                if not isinstance(score, (int, float)) or not 0 <= score <= 1:
                    results["lighthouse_errors"].append({
                        "form": form, "attempt": attempt, "error": "missing performance score"})
                    continue
                audits = j.get("audits", {})
                metrics = {key: audits.get(key, {}).get("numericValue")
                           for key in ("largest-contentful-paint", "total-blocking-time",
                                       "cumulative-layout-shift", "first-contentful-paint",
                                       "speed-index")}
                completed += 1
                results["lighthouse"].append({
                    "form": form, "run": completed, "attempt": attempt,
                    "file": dest.name, "score": score, "metrics": metrics})
            except Exception as exc:
                results["lighthouse_errors"].append({
                    "form": form, "attempt": attempt, "error": str(exc)})
        if completed < 3:
            results["lighthouse_errors"].append({
                "form": form, "error": f"Only {completed}/3 completed samples after {attempt} attempts"})
        scores = [item["score"] * 100 for item in results["lighthouse"]
                  if item["form"] == form and item["score"] is not None]
        results["lighthouse_median"][form] = statistics.median(scores) if len(scores) == 3 else None


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url",default="https://deon-desktop-portfolio.vercel.app/")
    parser.add_argument("--output",type=Path,default=Path("ex002-evidence"))
    parser.add_argument("--lighthouse",action="store_true")
    parser.add_argument("--chromium-path",default=None,help="Optional path to installed Chrome/Chromium binary")
    args=parser.parse_args()
    out=args.output.expanduser().resolve();out.mkdir(parents=True,exist_ok=True)
    results={"programme":"DEONOS-EXPERIENCE-001","packet":"EX-002", "date_utc":datetime.now(timezone.utc).isoformat(),
         "target_url":args.url,"expected_branch_sha":BRANCH_SHA,"expected_vercel_project_id":PROJECT_ID,
         "expected_production_deployment_id":DEPLOYMENT_ID,
         "warning":"Browser captures verify the URL at capture time; compare deployed code to pinned SHA before claiming equivalence. iPhone is Chromium emulation, NOT physical iPhone Safari.",
         "checks":[],"screenshots":[],"metrics":{},"http_navigation":[],"console":[],"page_errors":[],
         "failed_requests":[],"http_errors":[],"analytics_script_http":[],"analytics_beacon_attempts":[],
         "lighthouse":[],"lighthouse_errors":[],"lighthouse_median":{},"fatal_errors":[],"physical_iphone_safari_verified":False}
    try:
        with sync_playwright() as playwright:
            browser=playwright.chromium.launch(headless=True,executable_path=args.chromium_path)
            try:
                for name, profile in PROFILES.items():
                    try:test_profile(browser,args.url,out,name,profile,results)
                    except Exception as e:
                        results["fatal_errors"].append({"profile":name,"error":str(e),"traceback":traceback.format_exc()[-2500:]})
            finally:browser.close()
        if args.lighthouse:lighthouse(args.url,out,results)
    except Exception as e:
        results["fatal_errors"].append({"stage":"browser_launch","error":str(e)})
    finally:
        results["summary"]={"pass":sum(c["result"]=="PASS" for c in results["checks"]),
          "fail":sum(c["result"]=="FAIL" for c in results["checks"]),
          "screenshot_count":len(results["screenshots"]),
          "lighthouse_runs":len(results["lighthouse"]),"fatal_errors":len(results["fatal_errors"]),
          "G0_EX002_accepted":False}
        (out/"EX002_RUNTIME_RESULTS.json").write_text(json.dumps(results,indent=2,ensure_ascii=False)+"\n")
        print(json.dumps(results["summary"],indent=2))
        print("Evidence: "+str(out/"EX002_RUNTIME_RESULTS.json"))

if __name__=="__main__":main()