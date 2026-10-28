"use strict";
/* Deon's Desktop — static portfolio. No analytics, backends or credentials. */
import { projects } from './src/content/projects.ts';
import { projectFromUrl, urlForProject, readPortfolioHistory } from './src/core/router.ts';
import { mediaItems } from './src/content/media-manifest.ts';
import { visualInsights } from './src/content/visual-insights.ts';


const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const byID=Object.fromEntries(projects.map(p=>[p.id,p]));
const mediaByID=Object.fromEntries(mediaItems.map(item=>[item.projectId,item]));
const sets={featured:["mirai","amelia","soleil","slate","workos","corpa"],delivery:["amelia","ami","corpa","mototiam"],ai:["mirai","amethyst","verticals","agentos","atlas","workos","heidi","rustyindex","sole","openbrain"],products:["soleil","slate","corpa","workos","dreamcraft","propframe","singnote","openbrain"],research:["heidi","rustyindex","pokerai","tradedesk"],all:projects.map(p=>p.id)};
const state={locked:true,app:"",group:"featured",project:"mirai",tab:"case",stack:[],gesture:null,phoneGesture:null,drag:null,dragged:false,preventClick:0,windowMode:"normal"};
let searchFocusReturn=null,menuFocusReturn=null;
const mobile=()=>matchMedia("(max-width:720px)").matches;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link=(url,label)=>url&&/^https:\/\/(github\.com|usemirai\.app|www\.linkedin\.com)\//.test(url)?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>':"";
function clock(){const d=new Date();const hm=new Intl.DateTimeFormat("en-SG",{hour:"2-digit",minute:"2-digit",hour12:false}).format(d);
 const lockHm=new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",hour12:true}).format(d);
 $("#lock-time").textContent=lockHm;$("#lock-status-time").textContent=hm;$("#phone-time").textContent=hm;
 $("#lock-date").textContent=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"long",day:"numeric"}).format(d);
 // The recruiter résumé widget replaces the old calendar tile; no stale DOM writes.
 $("#mac-time").textContent=new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:true}).format(d);
}
clock();setInterval(clock,30000);
const lockEl=$("#lock-screen");
function setLock(value){state.locked=value;lockEl.hidden=!value;$("#mac-shell").inert=value;$("#iphone-shell").inert=value;}
function unlock(dest){if(!state.locked)return;lockEl.classList.add("unlocking");setTimeout(()=>{lockEl.classList.remove("unlocking");lockEl.style.removeProperty("--drag-y");lockEl.style.removeProperty("--drag-opacity");setLock(false);history.replaceState(navigationSnapshot(),"",location.href);window.PortfolioAnalytics?.unlock();if(dest)open(dest.app,dest.id);else if(state.pendingProject){const id=state.pendingProject;state.pendingProject=null;open("project",id,"replace");}else if(!mobile())open("welcome");},410)}
$("#unlock").addEventListener("click",()=>unlock());
$$("[data-unlock-app],[data-unlock-project]").forEach(b=>b.addEventListener("click",()=>{if(Date.now()-state.preventClick>520)unlock({app:b.dataset.unlockProject?"project":b.dataset.unlockApp,id:b.dataset.unlockProject})}));
const start=(x,y,kind)=>{if(state.locked)state.gesture={x,y,kind,at:performance.now()}};
const move=(x,y,prevent)=>{const g=state.gesture;if(!g||!state.locked)return;const dy=y-g.y;if(dy< -10&&-dy>Math.abs(x-g.x)*.8){lockEl.style.setProperty("--drag-y",Math.max(-55,dy*.33)+"px");lockEl.style.setProperty("--drag-opacity",Math.max(.62,1+dy/380));if(prevent)prevent()}};
const finish=(x,y)=>{const g=state.gesture;state.gesture=null;if(!g||!state.locked)return;const dy=g.y-y,dx=Math.abs(x-g.x);if((dy>65||dy>40&&performance.now()-g.at<300)&&dy>dx*1.1){state.preventClick=Date.now();unlock()}else{lockEl.style.removeProperty("--drag-y");lockEl.style.removeProperty("--drag-opacity")}};
lockEl.addEventListener("pointerdown",e=>{if(e.pointerType!=="touch"&&e.button===0)start(e.clientX,e.clientY,"pointer")},true);
window.addEventListener("pointermove",e=>{if(state.gesture?.kind==="pointer")move(e.clientX,e.clientY)},true);
window.addEventListener("pointerup",e=>{if(state.gesture?.kind==="pointer")finish(e.clientX,e.clientY)},true);
lockEl.addEventListener("touchstart",e=>{const t=e.changedTouches[0];if(t)start(t.clientX,t.clientY,"touch")},{capture:true,passive:true});
lockEl.addEventListener("touchmove",e=>{const t=e.changedTouches[0];if(t&&state.gesture?.kind==="touch")move(t.clientX,t.clientY,()=>{if(e.cancelable)e.preventDefault()})},{capture:true,passive:false});
window.addEventListener("touchend",e=>{const t=e.changedTouches[0];if(t&&state.gesture?.kind==="touch")finish(t.clientX,t.clientY)},true);
window.addEventListener("touchcancel",()=>{state.gesture=null;lockEl.style.removeProperty("--drag-y")},true);
let wheel=0,wheelAt=0;lockEl.addEventListener("wheel",e=>{if(e.cancelable)e.preventDefault();if(performance.now()-wheelAt>400)wheel=0;wheelAt=performance.now();wheel=Math.max(0,wheel+e.deltaY);if(wheel>100){wheel=0;unlock()}},{passive:false});

/* Public images illustrate interfaces and workflows, not shipping readiness. */
function engineeringSnapshot(p){
 const insight=visualInsights[p.id]||p.challenge;
 return '<div class="case-graphic-snapshot" aria-hidden="true"><small class="snapshot-kicker">TECHNICAL FOCUS</small><strong>'+esc(p.name)+'</strong><p class="snapshot-insight">'+esc(insight)+'</p></div>';
}
function caseMedia(p){
 const media=mediaByID[p.id],snapshot=engineeringSnapshot(p);
 if(!media)return '<div class="case-hero case-hero-snapshot">'+snapshot+'</div><p class="case-asset-note">Engineering summary from the case study. No public screenshot is claimed.</p>';
 return '<div class="case-hero case-hero-curated" data-media-project="'+esc(p.id)+'">'+snapshot+'<img data-project-media src="'+esc(media.url)+'" alt="'+esc(media.alt)+'" loading="lazy" decoding="async"><span class="case-hero-title" aria-hidden="true">'+esc(p.name)+'</span></div><p class="case-asset-note" data-media-note><strong>'+esc(media.label)+'.</strong> '+esc(media.context)+'</p>';
}
function galleryTile(item){
 const p=byID[item.projectId];
 if(!p)return '';
 return '<button data-project="'+esc(p.id)+'" class="photo-tile"><div class="photo-tile-visual"><div class="photo-evidence-backup" aria-hidden="true"><span>'+esc(p.glyph)+'</span><small>PROJECT EVIDENCE</small></div><img data-gallery-media src="'+esc(item.url)+'" alt="'+esc(item.alt)+'" loading="lazy" decoding="async"></div><span class="photo-tile-title">'+esc(p.name)+'</span><small class="photo-tile-type">'+esc(item.label)+'</small></button>';
}
document.addEventListener('error',event=>{
 const img=event.target;
 if(!(img instanceof HTMLImageElement)||!img.matches('img[data-project-media],img[data-gallery-media]'))return;
 img.hidden=true;
 const hero=img.closest('.case-hero');
 if(hero){hero.classList.add('media-unavailable');const note=hero.nextElementSibling;
  if(note?.matches('[data-media-note]'))note.textContent='Public image could not load. Engineering summary above and case details below remain available.';}
 const tile=img.closest('.photo-tile');
 if(tile)tile.classList.add('media-unavailable');
},true);
const tabs=()=>[["case","The Case"],["engineering","Engineering"],["proof","Proof + Limits"]].map(([k,v])=>'<button data-tab="'+k+'" class="'+(state.tab===k?'selected':'')+'">'+v+'</button>').join("");
function caseView(p){if(!p)return "<p>Not found.</p>";
 const body=state.tab==="case"?'<h3>THE PROBLEM</h3><p>'+esc(p.challenge)+'</p><h3>MY CONTRIBUTION</h3><p>'+esc(p.contribution)+'</p>':state.tab==="engineering"?'<h3>IMPLEMENTATION</h3><ul>'+p.engineering.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':'<h3>VERIFIED EVIDENCE</h3><p>'+esc(p.proof)+'</p><h3>LIMITS AND READINESS</h3><p>'+esc(p.limits)+'</p>';
 const urls=link(p.website,"Product website")+link(p.demo,"Interactive demo")+link(p.link,p.linkLabel||"Engineering case");
 return '<article class="case-pane"><span class="case-overline">'+esc(p.scope)+' / '+esc(p.stage)+'</span><h2>'+esc(p.name)+'</h2><p class="case-lede">'+esc(p.summary)+'</p>'+caseMedia(p)+'<div class="case-facts">'+p.facts.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div><nav class="case-tabs">'+tabs()+'</nav><div class="case-text">'+body+'</div>'+(urls?'<div class="case-links">'+urls+'</div>':'<p class="private-note">Private source · No public code link available</p>')+'</article>';
}
function fileRows(ids){return ids.map(id=>byID[id]).filter(Boolean).map(p=>'<button data-project="'+p.id+'" class="file-row '+(state.project===p.id?'selected':'')+'"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="./icons.svg#document"></use></svg><span><strong>'+esc(p.name)+'</strong><small>'+esc(p.scope)+' · '+esc(p.stage.split(" / ")[0])+'</small></span></button>').join("")}
function finder(){
 if(mobile())return '<div class="app-doc"><span class="overline">FILES / ENGINEERING WORK</span><h2>Projects</h2><p>Explore 21 engineering case files, from real client delivery to local agent runtimes.</p><div class="finder-list">'+fileRows(sets.all)+'</div></div>';
 const cats=[["featured","Favorites"],["delivery","Client delivery"],["ai","AI systems"],["products","Products"],["research","Research"],["all","All projects"]];
 return '<div class="finder-layout"><aside class="finder-sidebar"><p class="finder-group">Favorites</p>'+cats.map(([k,v])=>'<button data-group="'+k+'" class="finder-side-button '+(state.group===k?'selected':'')+'"><svg viewBox="0 0 64 64"><use href="./icons.svg#folder"></use></svg>'+v+'</button>').join("")+'</aside><div class="finder-main"><header class="finder-top"><h2>'+esc(cats.find(x=>x[0]===state.group)[1])+'</h2><span>'+sets[state.group].length+' files</span></header><div class="finder-split"><div class="finder-list">'+fileRows(sets[state.group])+'</div>'+caseView(byID[state.project])+'</div></div></div>';
}
function welcome(){
 return '<section class="welcome-pane"><p class="welcome-kicker">WELCOME TO DEONOS</p><h1>Hi, I’m Deon.</h1><p class="welcome-intro">I build AI products, reliable backend systems and software people can use. Start with my résumé or explore the engineering behind my work.</p><div class="welcome-actions"><a class="welcome-action welcome-primary" href="/resume.html"><span class="welcome-action-icon">▤</span><span><strong>View Résumé</strong><small>Experience, skills &amp; education</small></span><span aria-hidden="true">↗</span></a><button class="welcome-action" data-app="finder"><span class="welcome-action-icon">▣</span><span><strong>Explore Projects</strong><small>All 21 engineering case studies</small></span><span aria-hidden="true">›</span></button><button class="welcome-action" data-app="about"><span class="welcome-action-icon">◉</span><span><strong>About Me</strong><small>What I build and how I work</small></span><span aria-hidden="true">›</span></button><button class="welcome-action" data-app="contact"><span class="welcome-action-icon">✉</span><span><strong>Contact</strong><small>LinkedIn and ways to connect</small></span><span aria-hidden="true">›</span></button></div><h2>Featured work</h2><div class="welcome-featured">'+["mirai","amelia","soleil"].map(id=>{const p=byID[id];return '<button class="welcome-feature" data-project="'+esc(id)+'"><strong>'+esc(p.name)+'</strong><span>'+esc(visualInsights[id])+'</span><small>View case study →</small></button>'}).join("")+'</div><p class="welcome-footnote">Prefer to explore? Close this window to use the desktop.</p></section>';
}
function documentView(name,heading,content){return '<div class="app-doc"><span class="overline">'+name+'</span><h2>'+heading+'</h2><div class="app-paper">'+content+'</div></div>'}
function notes(){return documentView("NOTES / MY APPROACH","Notes to self.",'<p><strong>Models propose. Systems authorize.</strong> Business state needs deterministic boundaries.</p><p><strong>The difficult part begins beyond the demo.</strong> Error handling, permissions, retries, and integrations are product features.</p><p><strong>Keep the receipts.</strong> Idempotency, provenance, evaluation, and rollback should be inspectable.</p><p><strong>Make it useful.</strong> Software matters when people can actually use it.</p><p>— Deon</p>')}
function readme(){return documentView("READ ME FIRST / RECRUITERS","Hey, I am Deon.",'<p><strong>Applied AI and Software Engineer in Singapore.</strong> I build systems beyond model prompts.</p><p><strong>Mirai:</strong> Founder and lead engineer of a multi-tenant AI operating platform, with governed tools, services and evaluations.</p><p><strong>Amelia Bot:</strong> Real client staff use the Telegram/document workflow. The new version is staged behind 69 shadow tests, not falsely claimed deployed.</p><p><strong>Engineering range:</strong> Swift and Metal, Rust local-first memory, Python, TypeScript, PostgreSQL, Redis, React, and developer tooling.</p><p>My case studies distinguish what is shipped, internally evaluated, and experimental.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","Get in touch")+link("https://github.com/joyboy257","View code")+'</div>'}
function photos(){return '<div class="app-doc"><span class="overline">PHOTOS / ENGINEERING EVIDENCE</span><h2>Work, in context.</h2><p>Public product screens and safe diagrams, labeled by what each image shows. Pictures do not establish deployment or performance.</p><div class="photo-grid">'+mediaItems.map(galleryTile).join('')+'</div></div>'}
function browser(){const destinations=[["https://usemirai.app/","Mirai","Product website"],["https://usemirai.app/demo","Mirai demo","Product demo"],["https://github.com/joyboy257/mirai-showcase","Architecture","Engineering case"],["https://github.com/joyboy257","GitHub","Public code"],["https://www.linkedin.com/in/deonquek","LinkedIn","Get in touch"]];return '<div class="app-doc"><span class="overline">SAFARI / FAVORITES</span><h2>Favorites</h2><p>Explore the products and engineering evidence.</p><div class="app-links">'+destinations.map(([u,n,d])=>'<a target="_blank" rel="noopener noreferrer" href="'+u+'">'+n+' ↗<span>'+d+'</span></a>').join("")+'</div></div>'}
function about(){return documentView("ABOUT THIS MAC / OWNER","Deon Quek",'<p>AI and software engineer based in Singapore. I work across systems design, product engineering, agents, native apps, and real integrations.</p><p>Founder and lead engineer of Mirai, plus production client automation, research software, and developer tools.</p><p>Python · TypeScript · PostgreSQL · React · Rust · Swift · Metal · Redis · Docker · MCP.</p><p>Privacy: this portfolio uses anonymous, cookie-free Vercel Web Analytics to count visits and aggregate engagement. It does not identify individual recruiters or record search text.</p><p class="private-note">Lock-screen photograph: Jackie Alexander / Unsplash. Desktop photograph: Luca Bravo / Unsplash.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","LinkedIn")+link("https://github.com/joyboy257","GitHub")+'</div>'}
function content(){if(state.app==="welcome")return welcome();if(state.app==="finder")return finder();if(state.app==="project")return caseView(byID[state.project]);if(state.app==="notes")return notes();if(state.app==="photos")return photos();if(state.app==="browser")return browser();if(state.app==="calendar")return readme();if(state.app==="about")return about();if(state.app==="contact")return documentView("CONTACT / SINGAPORE","Let us talk.",'<p>Interested in Applied AI, Forward-Deployed Engineering, and Software Engineering.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","Connect")+'</div>';if(state.app==="terminal")return '<div class="terminal-panel"><p>deon@macbook ~ % whoami</p><p class="term-green">Deon Quek · Applied AI & Software Engineer</p><p>Try opening a project through Finder or Spotlight (⌘K).</p></div>';return finder()}
const title=()=>({welcome:"Welcome",finder:"Finder",project:byID[state.project]?.name,notes:"Notes",photos:"Photos",browser:"Safari",calendar:"Read Me",about:"About",contact:"Contact",terminal:"Terminal"})[state.app]||"Finder";
function updateDockState(){
 $$(".mac-dock [data-app]").forEach(b=>{const active=b.dataset.app===state.app||(state.app==="project"&&b.dataset.app==="finder");b.classList.toggle("running",active);b.setAttribute("aria-pressed",String(active));});
}
function render(){updateDockState();if(mobile()){const pane=$("#phone-app");pane.hidden=false;$("#iphone-shell").classList.add("app-open");$("#phone-app-name").textContent=state.app==="finder"?"Files":title();$("#phone-back").textContent=state.stack.length?"‹ Back":"‹ Home";$("#phone-app-body").innerHTML=content();$("#phone-app-body").scrollTop=0;}else{const w=$("#mac-window");w.hidden=false;w.classList.remove("minimized");if(state.windowMode==="minimized")state.windowMode="normal";$("#mac-window-name").textContent=title();$("#active-app-name").textContent=title();$("#mac-window-content").innerHTML=content();}}
function navigationSnapshot(){return {deonos:1,app:state.app,project:state.project,group:state.group,tab:state.tab,stack:state.stack.map(pair=>pair.slice())}}
function writeNavigation(mode,projectId){const url=urlForProject(location.href,projectId);if(mode==="replace")history.replaceState(navigationSnapshot(),"",url);else if(mode!=="none")history.pushState(navigationSnapshot(),"",url)}
function renderClosed(){$("#active-app-name").textContent="Finder";updateDockState();$("#iphone-shell").classList.remove("app-open");$("#phone-app").hidden=true;const w=$("#mac-window");w.hidden=true;w.classList.remove("minimized","maximized");state.windowMode="normal";w.style.removeProperty("left");w.style.removeProperty("top");w.style.removeProperty("transform");state.drag=null;}
function open(app,id,routeMode="push"){if(state.locked){unlock({app,id});return;}if(app==="project"&&(!id||!byID[id]))return;if(mobile()&&!$("#phone-app").hidden)state.stack.push([state.app,state.project]);state.app=app;state.project=id||state.project;state.tab="case";render();if(app==="project"&&id&&byID[id])window.PortfolioAnalytics?.project(id);else window.PortfolioAnalytics?.app(app);writeNavigation(routeMode,id&&byID[id]?id:null);}
function close(routeMode="push"){if(!state.app&&routeMode==="push")return;const previous=state.app;state.app="";state.stack=[];renderClosed();writeNavigation(routeMode,null);if(routeMode!=="none"&&!mobile()){const dockApp=previous==="project"?"finder":previous;document.querySelector('.mac-dock [data-app="'+dockApp+'"]')?.focus({preventScroll:true});}}
function back(){if(state.stack.length){const [app,id]=state.stack.pop();state.app=app;state.project=id;state.tab="case";render();writeNavigation("push",app==="project"?id:null)}else close()}
const matches=q=>projects.filter(p=>[p.name,p.summary,p.scope,p.tags.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase())).slice(0,12);
function searching(q){$("#search-results").innerHTML=matches(q).map(p=>'<button class="search-result" data-project="'+p.id+'"><svg viewBox="0 0 64 64"><use href="./icons.svg#document"></use></svg><span><strong>'+esc(p.name)+'</strong><small>'+esc(p.summary.slice(0,90))+'</small></span></button>').join("")||'<p>No results.</p>'}
function search(){if(state.locked)return;const spot=$("#spotlight");if(spot.hidden)searchFocusReturn=document.activeElement instanceof HTMLElement?document.activeElement:null;spot.hidden=false;window.PortfolioAnalytics?.search();$("#spotlight-input").value="";searching("");$("#spotlight-input").focus();}
function endSearch(restoreFocus=true){if($("#spotlight").hidden)return;$("#spotlight").hidden=true;if(restoreFocus&&searchFocusReturn?.isConnected&&!searchFocusReturn.closest("[hidden]"))searchFocusReturn.focus({preventScroll:true});searchFocusReturn=null;}
$("#desktop-search").addEventListener("click",search);
$("#phone-search").addEventListener("click",search);
$("#spotlight-input").addEventListener("input",e=>searching(e.target.value));
$("#spotlight-close").addEventListener("click",endSearch);
$("#spotlight").addEventListener("click",e=>{if(e.target===$("#spotlight"))endSearch()});

/* Native-looking menu commands, rather than decorative links that open Finder. */
const menuEl=$("#mac-dropdown");
const menuItems={
 File:[["New Finder Window","finder"],["View Résumé","resume"],["Open Read Me First","calendar"],["Open Safari","browser"],["Close Window","close"]],
 Edit:[["Search Projects…","search"],["Copy Portfolio Link","copy"],["Read Me First","calendar"]],
 View:[["Favorites","favorites"],["All Projects","all"],["Client Delivery","delivery"],["AI Systems","ai"]],
 Go:[["Projects","finder"],["About Me","about"],["Photos","photos"]],
 Window:[["Minimize","minimize"],["Zoom","maximize"],["Bring Finder Forward","finder"]],
 Help:[["About Deon","about"],["Recruiter Brief","calendar"],["View GitHub","github"]]
};
function dismissMenu(restoreFocus=false){
 menuEl.hidden=true;
 document.querySelectorAll("[data-menu]").forEach(b=>{b.setAttribute("aria-expanded","false");b.classList.remove("active-menu")});
 if(restoreFocus&&menuFocusReturn?.isConnected)menuFocusReturn.focus({preventScroll:true});
 menuFocusReturn=null;
}
function showMenu(trigger){
 if(!menuEl.hidden&&trigger.getAttribute("aria-expanded")==="true"){dismissMenu(true);return;}
 menuFocusReturn=trigger;
 const label=trigger.dataset.menu,actions=menuItems[label]||[];
 $$("[data-menu]").forEach(b=>{b.setAttribute("aria-expanded",String(b===trigger));b.classList.toggle("active-menu",b===trigger)});
 const rect=trigger.getBoundingClientRect();
 menuEl.style.left=Math.max(8,Math.min(innerWidth-250,rect.left-10))+"px";
 menuEl.innerHTML=actions.map(([name,action],i)=>'<button type="button" role="menuitem" data-command="'+esc(action)+'" tabindex="'+(i===0?0:-1)+'"><span>'+esc(name)+'</span>'+(action==="search"?'<kbd>⌘K</kbd>':'')+'</button>').join("");
 menuEl.hidden=false;menuEl.querySelector("button")?.focus({preventScroll:true});
}
function setWindowMode(action){
 const w=$("#mac-window");if(mobile()||w.hidden)return;
 if(action==="minimize"){state.windowMode="minimized";w.classList.remove("maximized");w.classList.add("minimized");const active=state.app==="project"?"finder":state.app;document.querySelector('.mac-dock [data-app="'+active+'"]')?.focus({preventScroll:true});return;}
 if(action==="maximize"){const enlarged=w.classList.toggle("maximized");state.windowMode=enlarged?"maximized":"normal";w.classList.remove("minimized");$("#mac-full").focus({preventScroll:true});}
}
function performCommand(c){
 dismissMenu();
 if(c==="resume"){window.location.assign("/resume.html");return}
 if(c==="close"){close();return}
 if(c==="search"){search();return}
 if(c==="copy"){navigator.clipboard?.writeText(location.origin+location.pathname).catch(()=>{});return}
 if(c==="github"){window.open("https://github.com/joyboy257","_blank","noopener");return}
 if(c==="minimize"||c==="maximize"){setWindowMode(c);return}
 if(["favorites","all","delivery","ai"].includes(c)){state.group=c==="favorites"?"featured":c;state.project=sets[state.group][0];open("finder");return}
 open(c);
}
document.addEventListener("click",e=>{
 const trigger=e.target.closest("[data-menu]");
 if(trigger){showMenu(trigger);return}
 const cmd=e.target.closest("[data-command]");
 if(cmd){performCommand(cmd.dataset.command);return}
 if(!e.target.closest("#mac-dropdown"))dismissMenu();
});
menuEl.addEventListener("keydown",e=>{
 const buttons=$$("#mac-dropdown button");const n=buttons.indexOf(document.activeElement);
 if(e.key==="Escape"){e.preventDefault();e.stopPropagation();dismissMenu(true);return}
 if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();buttons[(n+(e.key==="ArrowDown"?1:-1)+buttons.length)%buttons.length]?.focus()}
});

$("#mac-close").addEventListener("click",close);
$("#mac-min").addEventListener("click",()=>setWindowMode("minimize"));
$("#mac-full").addEventListener("click",()=>setWindowMode("maximize"));
$("#phone-back").addEventListener("click",back);
$("#phone-home").addEventListener("click",close);
$("#home-indicator").addEventListener("click",close);
document.addEventListener("click",e=>{
 const t=e.target.closest("[data-tab]");if(t){state.tab=t.dataset.tab;render();const target=mobile()?"#phone-app":"#mac-window";document.querySelector(target+' [data-tab="'+state.tab+'"]')?.focus({preventScroll:true});return}
 const g=e.target.closest("[data-group]");if(g){state.group=g.dataset.group;state.project=sets[state.group][0];render();document.querySelector('#mac-window [data-group="'+state.group+'"]')?.focus({preventScroll:true});return}
 const p=e.target.closest("[data-project]");if(p){endSearch(false);if(!mobile()&&state.app==="finder"&&p.closest(".finder-list")){state.project=p.dataset.project;state.tab="case";render();window.PortfolioAnalytics?.project(state.project);writeNavigation("push",state.project)}else open("project",p.dataset.project);return}
 const a=e.target.closest("[data-app]");if(a){open(a.dataset.app,a.dataset.project);return}
});
document.addEventListener("keydown",e=>{
 if(e.defaultPrevented)return;
 if(state.locked){if(["ArrowUp","PageUp"].includes(e.key)){e.preventDefault();unlock();}return;}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search();return;}
 if(e.key!=="Escape")return;
 if(!menuEl.hidden){e.preventDefault();dismissMenu(true);return;}
 if(!$("#spotlight").hidden){e.preventDefault();endSearch();return;}
 if(mobile()){if(!$("#phone-app").hidden){e.preventDefault();back();}return;}
 if(!$("#mac-window").hidden&&!$("#mac-window").classList.contains("minimized")){e.preventDefault();close();}
});
/* Desktop draggable title bar */
$("#mac-window-drag").addEventListener("pointerdown",e=>{
 if(mobile()||e.target.closest("button")||$("#mac-window").classList.contains("maximized"))return;
 const rect=$("#mac-window").getBoundingClientRect();state.drag={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top};e.currentTarget.setPointerCapture(e.pointerId);
});
$("#mac-window-drag").addEventListener("pointermove",e=>{if(!state.drag)return;const w=$("#mac-window");w.style.transform="none";w.style.left=Math.max(0,Math.min(innerWidth-130,state.drag.left+e.clientX-state.drag.x))+"px";w.style.top=Math.max(31,Math.min(innerHeight-100,state.drag.top+e.clientY-state.drag.y))+"px"});
$("#mac-window-drag").addEventListener("pointerup",()=>state.drag=null);
$("#mac-window-drag").addEventListener("pointercancel",()=>state.drag=null);
/* Mobile home swipe and edge-back */
$("#iphone-shell").addEventListener("touchstart",e=>{if(state.locked)return;const t=e.changedTouches[0];state.phoneGesture=t?{x:t.clientX,y:t.clientY,mode:t.clientX<22?"back":t.clientY>innerHeight-58?"home":""}:null},{passive:true});
$("#iphone-shell").addEventListener("touchend",e=>{const g=state.phoneGesture,t=e.changedTouches[0];state.phoneGesture=null;if(!g||!t)return;if(g.mode==="back"&&t.clientX-g.x>70&&Math.abs(t.clientY-g.y)<75)back();if(g.mode==="home"&&g.y-t.clientY>55)close()},{passive:true});
updateDockState();
window.addEventListener("popstate",event=>{
 if(state.locked){state.pendingProject=projectFromUrl(location.href,Object.keys(byID));return;}
 const saved=readPortfolioHistory(event.state,Object.keys(byID));
 if(saved){
   state.app=saved.app;state.project=saved.project||state.project;
   state.group=saved.group;state.tab=saved.tab;
   state.stack=saved.stack;
 }else{
   const project=projectFromUrl(location.href,Object.keys(byID));
   state.app=project?"project":"";state.project=project||state.project;state.stack=[];state.tab="case";
 }
 if(state.app)render();else renderClosed();
});
const request=projectFromUrl(location.href,Object.keys(byID));
// Deliberately do not persist an unlocked state. Reloading the homepage must lock.
// Every page load shows the lock; open a shared case only after unlock.
state.pendingProject=request&&byID[request]?request:null;
setLock(true);
