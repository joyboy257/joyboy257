#!/usr/bin/env python3
"""Read-only EX-006 browser history regression tests for local built preview."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

root='http://127.0.0.1:4173/'
out=Path('../../g1-evidence/router')
out.mkdir(parents=True,exist_ok=True)
checks=[]
def check(name,condition):
    checks.append({'name':name,'pass':bool(condition)})
    if not condition: raise AssertionError(name)

with sync_playwright() as p:
    b=p.chromium.launch()
    try:
        pc=b.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
        page=pc.new_page();page.goto(root);page.locator('#unlock').click()
        page.wait_for_timeout(480)
        page.locator('.desktop-item[data-app="finder"]').click()
        page.locator('#mac-window [data-group="all"]').click()
        page.locator('#mac-window .finder-list [data-project="mirai"]').click()
        check('Finder Mirai URL',page.url.endswith('?project=mirai'))
        page.locator('#mac-window .finder-list [data-project="amelia"]').click()
        check('Finder Amelia URL',page.url.endswith('?project=amelia'))
        page.go_back();page.wait_for_timeout(120)
        check('Browser Back selects Mirai',page.locator('#mac-window .case-pane h2').inner_text()=='Mirai')
        page.go_forward();page.wait_for_timeout(120)
        check('Browser Forward selects Amelia',page.locator('#mac-window .case-pane h2').inner_text()=='Amelia Bot')
        page.reload();check('Reload stays locked',page.locator('#lock-screen').is_visible())
        page.locator('#unlock').click();page.wait_for_timeout(480)
        check('Reload deep link opens Amelia',page.locator('#mac-window .case-pane h2').inner_text()=='Amelia Bot')
        page.close();pc.close()
        mobile=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
        page=mobile.new_page();page.goto(root);page.locator('#unlock').click()
        page.wait_for_timeout(480)
        page.locator('.app-item[data-app="finder"]').click()
        page.locator('#phone-app .finder-list [data-project="mirai"]').click()
        check('Mobile case URL',page.url.endswith('?project=mirai'))
        page.locator('#phone-back').click()
        check('Mobile Back returns Files',page.locator('#phone-app-name').inner_text()=='Files')
        check('Mobile Back removes project URL',not page.url.endswith('?project=mirai'))
        page.close();mobile.close()
    finally: b.close()
out.joinpath('EX006_ROUTER_SMOKE.json').write_text(json.dumps({'checks':checks,'pass':sum(c['pass'] for c in checks)},indent=2))
print(json.dumps({'router_assertions_passed':sum(c['pass'] for c in checks)}))
