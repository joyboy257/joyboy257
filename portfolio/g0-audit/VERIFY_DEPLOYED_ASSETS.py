#!/usr/bin/env python3
"""G0 / EX-001: verify byte identity of seven public static deployment assets."""
from __future__ import annotations
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ORIGIN = "https://deon-desktop-portfolio.vercel.app"
FILES = ("index.html", "app.js", "style.css", "analytics.js",
         "icons.svg", "bigsur-wallpaper.svg", "favicon.svg")
SOURCE = Path("portfolio/desktop-v8")
OUT = Path("ex002-evidence")
OUT.mkdir(exist_ok=True)
data = {"checked_utc":datetime.now(timezone.utc).isoformat(),
        "origin":ORIGIN,"files":[], "analytics_script":{},
        "summary":{}, "verdict":"UNVERIFIED"}
sha = lambda content: hashlib.sha256(content).hexdigest()
for filename in FILES:
    local = (SOURCE / filename).read_bytes()
    item = {"name":filename,"local_bytes":len(local),"local_sha256":sha(local)}
    try:
        with urlopen(Request(ORIGIN + "/" + filename,
                            headers={"User-Agent":"DeonOS-G0-ReadOnly-Audit"}),timeout=30) as r:
            body = r.read()
            item.update(status=r.status, remote_bytes=len(body),
                        remote_sha256=sha(body),
                        result="MATCH" if body == local and r.status == 200 else "MISMATCH")
    except (HTTPError, URLError, TimeoutError) as error:
        item.update(result="UNVERIFIED",error=str(error))
    data["files"].append(item)
try:
    with urlopen(ORIGIN+"/_vercel/insights/script.js",timeout=20) as r:
        data["analytics_script"]={"status":r.status,"bytes":len(r.read()),
                                  "note":"HTTP availability only; does not prove beacon ingestion"}
except (HTTPError, URLError, TimeoutError) as error:
    data["analytics_script"]={"status":getattr(error,"code",None),"error":str(error)}
counts={key:sum(x["result"]==key for x in data["files"])
        for key in ("MATCH","MISMATCH","UNVERIFIED")}
data["summary"]=counts
data["verdict"]="PASS" if counts["MATCH"]==len(FILES) else "HOLD"
(OUT/"EX001_DEPLOYMENT_IDENTITY.json").write_text(json.dumps(data,indent=2)+"\n")
print(json.dumps({"verdict":data["verdict"],"source_identity":counts,
                  "analytics_script":data["analytics_script"]}))
