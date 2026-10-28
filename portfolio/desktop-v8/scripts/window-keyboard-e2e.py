#!/usr/bin/env python3
"""EX-006 keyboard and window lifecycle smoke checks against local preview."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT='http://127.0.0.1:4173/'
out=Path('../../g1-evidence/window-keyboard');out.mkdir(parents=True,exist_ok=True)
checks=[]
def check(name,condition):
    passed=bool(condition);checks.append({'test':name,'passed':passed})
    if not passed:raise AssertionError(name)

with sync_playwright() as p:
    browser=p.chromium.launch()
    try:
        desktop=browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
        page=desktop.new_page();page.goto(ROOT)
        page.keyboard.press('Escape')
        check('Escape on locked page stays locked',page.locator('#lock-screen').is_visible())
        page.keyboard.press('ArrowUp');page.wait_for_timeout(460)
        check('ArrowUp unlocks',not page.locator('#lock-screen').is_visible())
        page.locator('.mac-dock [data-app="finder"]').click()
        check('Finder visible',page.locator('#mac-window').is_visible())
        page.locator('#mac-min').click()
        check('Minimize hides Finder',not page.locator('#mac-window').is_visible())
        check('Minimize leaves running dock state',page.locator('.mac-dock [data-app="finder"]').get_attribute('aria-pressed')=='true')
        page.locator('.mac-dock [data-app="finder"]').click()
        check('Dock restores minimized Finder',page.locator('#mac-window').is_visible())
        page.locator('#mac-full').click()
        check('Zoom maximizes',page.locator('#mac-window').evaluate("(w)=>w.classList.contains('maximized')"))
        page.locator('#mac-full').click()
        check('Zoom reverses',not page.locator('#mac-window').evaluate("(w)=>w.classList.contains('maximized')"))
        page.locator('#mac-window [data-tab="engineering"]').click()
        check('Case tab retains focus',page.locator('#mac-window [data-tab="engineering"]').evaluate("(x)=>document.activeElement===x"))
        page.locator('[data-menu="File"]').click()
        check('Menu first item focused',page.locator('#mac-dropdown [role="menuitem"]').first.evaluate('(x)=>document.activeElement===x'))
        page.keyboard.press('Escape')
        check('Escape closes menu not Finder',page.locator('#mac-dropdown').is_hidden() and page.locator('#mac-window').is_visible())
        check('Escape restores menu trigger focus',page.locator('[data-menu="File"]').evaluate('(x)=>document.activeElement===x'))
        page.locator('#desktop-search').click()
        check('Search input focused',page.locator('#spotlight-input').evaluate('(x)=>document.activeElement===x'))
        page.keyboard.press('Escape')
        check('Escape closes search not Finder',page.locator('#spotlight').is_hidden() and page.locator('#mac-window').is_visible())
        check('Escape returns focus to search button',page.locator('#desktop-search').evaluate('(x)=>document.activeElement===x'))
        page.keyboard.press('Control+k')
        check('Ctrl+K opens project search',page.locator('#spotlight').is_visible())
        page.keyboard.press('Escape')
        page.keyboard.press('Escape')
        check('Escape closes visible Finder',not page.locator('#mac-window').is_visible())
        page.keyboard.press('Escape')
        check('Escape on desktop leaves Finder closed',not page.locator('#mac-window').is_visible())
        page.screenshot(path=str(out/'desktop-closed.png'))
        desktop.close()
        phone=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
        page=phone.new_page();page.goto(ROOT)
        page.locator('#unlock').click();page.wait_for_timeout(470)
        page.keyboard.press('Escape')
        check('Escape on mobile home leaves home',page.locator('#phone-app').is_hidden())
        page.locator('.app-item[data-app="finder"]').click()
        page.keyboard.press('Escape')
        check('Escape from mobile Files returns home',page.locator('#phone-app').is_hidden())
        page.screenshot(path=str(out/'mobile-home.png'))
        phone.close()
    finally:browser.close()
summary={'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'checks':checks}
(out/'EX006_WINDOW_KEYBOARD.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({'window_keyboard_checks_passed':summary['passed'],'failed':summary['failed']}))
if summary['failed']:raise SystemExit(1)
