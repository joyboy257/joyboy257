"use strict";
/* A dedicated mobile springboard. Shared project data is declared in app.js. */
(function(){
 const shell=document.getElementById("ios-shell");
 if(!shell)return;
 const $=s=>document.querySelector(s);
 const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const portfolio=Array.isArray(projects)?projects:[];
 const byKey=Object.fromEntries(portfolio.map(p=>[p.id,p]));
 const state={view:"home",id:null,tab:"case",stack:[],filter:"all",query:"",returnFocus:null};
 const viewNames={projects:"Projects",project:"Case Study",photos:"Photos",about:"About",notes:"Notes",links:"Safari",brief:"Recruiter Brief",contact:"Contact"};
 const root=$("#ios-app-content");
 const appScreen=$("#ios-app-screen");
 const control=$("#ios-control-sheet");
 let gesture=null;
 function mobile(){return window.matchMedia("(max-width:720px)").matches;}
 function updateClock(){
  const now=new Date();
  $("#ios-clock").textContent=new Intl.DateTimeFormat("en-SG",{hour:"2-digit",minute:"2-digit",hour12:false}).format(now);
  $("#ios-weekday").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"short"}).format(now).toUpperCase();
  $("#ios-day").textContent=String(now.getDate());
 }
 updateClock();setInterval(updateClock,20000);
 function asLink(url,label,primary){
  if(!url || !/^https:\/\/(github\.com|usemirai\.app|www\.linkedin\.com)\//.test(url))return "";
  return '<a class="ios-action-link'+(primary?' primary':'')+'" href="'+safe(url)+'" target="_blank" rel="noopener noreferrer"><span>'+safe(label)+'</span><span aria-hidden="true">↗</span></a>';
 }
 function groupRow(title,detail,action,icon){
  return '<button type="button" class="ios-list-row" '+action+'><span class="ios-row-icon">'+safe(icon||title.slice(0,2))+'</span><span><strong>'+safe(title)+'</strong><small>'+safe(detail)+'</small></span><span class="ios-row-chevron">›</span></button>';
 }
 function projectRow(p){
  return groupRow(p.name,p.scope+' · '+p.stage, 'data-ios-app="project" data-project="'+safe(p.id)+'"',p.glyph);
 }
 function projectsScreen(){
  return '<div class="ios-screen-overline">FILES / ENGINEERING DOSSIERS</div><h2 class="ios-screen-title">Projects</h2><p class="ios-screen-lede">Code, design decisions, engineering evidence and what remains unfinished. 21 case files, not 21 marketing claims.</p><input id="ios-project-query" class="ios-search-input" type="search" placeholder="Search projects, languages, systems…" aria-label="Search projects" value="'+safe(state.query)+'"><div class="ios-filter-strip">'+["all","ai","fde","swe"].map(v=>'<button type="button" data-ios-filter="'+v+'" class="'+(state.filter===v?'active':'')+'">'+({all:"All projects",ai:"Applied AI",fde:"FDE",swe:"Software"}[v])+'</button>').join("")+'</div><div class="ios-group" id="ios-project-rows"></div>';
 }
 function updateProjectRows(){
  const q=state.query.toLowerCase().trim();
  const entries=portfolio.filter(p=>(state.filter==="all"||p.flags.includes(state.filter))&&(!q||[p.name,p.scope,p.summary,p.tags.join(" "),p.challenge].join(" ").toLowerCase().includes(q)));
  const node=$("#ios-project-rows");if(!node)return;
  node.innerHTML=entries.length?entries.map(projectRow).join(""):'<div class="ios-note-card">No matching projects. Try a different term or category.</div>';
 }
 function projectScreen(id){
  const p=byKey[id];if(!p)return '<p>Project not found.</p>';
  let panel='';
  if(state.tab==="case"){
    panel='<h3>THE PROBLEM</h3><p>'+safe(p.challenge)+'</p><h3>MY CONTRIBUTION</h3><p>'+safe(p.contribution)+'</p>';
  }else if(state.tab==="engineering"){
    panel='<h3>IMPLEMENTATION</h3><ul>'+p.engineering.map(s=>'<li>'+safe(s)+'</li>').join("")+'</ul>';
  }else{
    panel='<h3>VERIFIABLE EVIDENCE</h3><p>'+safe(p.proof)+'</p><h3>READINESS AND LIMITS</h3><p>'+safe(p.limits)+'</p>';
  }
  let image='';
  if(p.image&&/^https:\/\/raw\.githubusercontent\.com\//.test(p.image)){
    image='<img src="'+safe(p.image)+'" alt="'+safe(p.name)+' public product illustration" loading="lazy" onerror="this.style.display=\'none\'">';
  }
  const sources=asLink(p.website,"Product website",true)+asLink(p.demo,"Interactive demo",false)+asLink(p.link,p.linkLabel||"Engineering case study",false);
  const tags=p.facts.map(t=>'<span>'+safe(t)+'</span>').join("");
  return '<div class="ios-screen-overline">'+safe(p.scope)+' · '+safe(p.stage)+'</div><h2 class="ios-screen-title">'+safe(p.name)+'</h2><p class="ios-screen-lede">'+safe(p.summary)+'</p><div class="ios-project-hero">'+image+'<span>'+safe(p.name)+'</span></div><div class="ios-facts">'+tags+'</div><div class="ios-tabs" role="tablist" aria-label="Case study sections">'+[['case','The Case'],['engineering','Engineering'],['proof','Proof + Limits']].map(([key,label])=>'<button type="button" role="tab" aria-selected="'+(state.tab===key)+'" class="'+(state.tab===key?'active':'')+'" data-ios-tab="'+key+'">'+label+'</button>').join("")+'</div><div class="ios-case-copy">'+panel+'</div>'+(sources?'<div class="ios-links">'+sources+'</div>':'<p class="ios-section-heading">Private source · No public link available</p>');
 }
 function photoScreen(){
  const entries=portfolio.filter(p=>p.image).slice(0,11);
  return '<div class="ios-screen-overline">ALBUM / SELECTED WORK</div><h2 class="ios-screen-title">Photos</h2><p class="ios-screen-lede">Actual public screenshots, product frames, and safe architecture diagrams. Tap a project to inspect its implementation.</p><div class="ios-gallery">'+entries.map(p=>'<button type="button" data-ios-app="project" data-project="'+safe(p.id)+'"><img src="'+safe(p.image)+'" alt="'+safe(p.name)+' image" loading="lazy" onerror="this.style.display=\'none\'"><span>'+safe(p.name)+'<small>'+safe(p.scope)+'</small></span></button>').join("")+'</div><p class="ios-section-heading">PRIVATE SYSTEMS USE SANITIZED OR RECONSTRUCTED IMAGERY</p>';
 }
 function aboutScreen(){
  return '<div class="ios-screen-overline">ABOUT THIS ENGINEER</div><div class="ios-profile-card"><div class="ios-profile-avatar">DQ</div><h2>Deon Quek.</h2><p>Applied AI & Software Engineer · Singapore</p></div><h3 class="ios-section-heading">WHO I AM</h3><div class="ios-note-card"><p>I build ambitious AI systems from the runtime to the product. I founded and lead Mirai’s engineering and delivered automation used by staff at a real client.</p><p>My work spans Python, TypeScript, PostgreSQL, React, Rust, Swift and Metal. I care about reliability, authorization, real integrations, and the engineering evidence behind a release.</p></div><div class="ios-links">'+asLink("https://github.com/joyboy257","Open GitHub",true)+asLink("https://www.linkedin.com/in/deonquek","Connect on LinkedIn",false)+'</div>';
 }
 function briefScreen(){
  return '<div class="ios-screen-overline">HIRING NOTES / 60-SECOND READ</div><h2 class="ios-screen-title">Why interview Deon?</h2><div class="ios-group">'+groupRow("Mirai","Founder & lead engineer · multi-tenant AI platform",'data-ios-app="project" data-project="mirai"',"MI")+groupRow("Amelia Bot","Real client staff used the automation",'data-ios-app="project" data-project="amelia"',"AM")+groupRow("Soleil","Custom Swift/Metal render engine",'data-ios-app="project" data-project="soleil"',"SO")+groupRow("WorkOS","Rust local-first memory and AI desktop",'data-ios-app="project" data-project="workos"',"WO")+'</div><h3 class="ios-section-heading">WHAT YOU GET</h3><div class="ios-note-card"><p>End-to-end ownership: architecture, APIs, databases, interfaces, integrations, AI runtimes, evaluation and release engineering.</p><p>I use AI coding tools, but hold the implementation to tests, evidence and operational boundaries—not screenshots or vibes.</p></div><div class="ios-links">'+asLink("https://www.linkedin.com/in/deonquek","Start a conversation",true)+asLink("https://github.com/joyboy257/mirai-showcase","View Mirai engineering",false)+'</div>';
 }
 function notesScreen(){
  return '<div class="ios-screen-overline">PERSONAL NOTES / ENGINEERING PRINCIPLES</div><h2 class="ios-screen-title">Notes</h2><div class="ios-note-card"><p><strong>AI is not the system of record.</strong><br>Models propose. Services authorize. The database commits.</p><p><strong>Production starts where demos stop.</strong><br>Real integration boundaries, retries and failure states are part of the product.</p><p><strong>Failures need receipts.</strong><br>Make idempotency, provenance, approvals and rollback traceable.</p><p><strong>Build for humans.</strong><br>The code is a means to help somebody accomplish something.</p><p>— Deon</p></div>';
 }
 function linksScreen(){
  return '<div class="ios-screen-overline">SAFARI / FAVORITES</div><h2 class="ios-screen-title">Bookmarks</h2><p class="ios-screen-lede">Go beyond this portfolio. Open the actual product, demonstration and engineering proof.</p><div class="ios-group">'+groupRow("Mirai","usemirai.app · Product",'data-ios-external="https://usemirai.app/"',"MI")+groupRow("Mirai demo","Product walkthrough",'data-ios-external="https://usemirai.app/demo"',"▶")+groupRow("Engineering","Public code and case studies",'data-ios-external="https://github.com/joyboy257"',"GH")+groupRow("LinkedIn","Contact and career",'data-ios-external="https://www.linkedin.com/in/deonquek"',"in")+'</div>';
 }
 function contactScreen(){
  return '<div class="ios-screen-overline">CONTACT / SINGAPORE</div><h2 class="ios-screen-title">Let’s talk.</h2><p class="ios-screen-lede">Interested in Applied AI, Forward-Deployed Engineering and Software Engineering opportunities. I’d love to discuss the difficult problems your team is solving.</p><div class="ios-links">'+asLink("https://www.linkedin.com/in/deonquek","Connect on LinkedIn",true)+asLink("https://github.com/joyboy257","View GitHub",false)+asLink("https://usemirai.app/","View Mirai",false)+'</div>';
 }
 function render(){
  if(state.view==="home"){home();return;}
  appScreen.hidden=false;shell.classList.add("ios-app-open");
  $("#ios-app-nav-title").textContent=state.view==="project"?(byKey[state.id]?.name||"Case Study"):(viewNames[state.view]||"Portfolio");
  $("#ios-app-back").textContent=state.stack.length?"‹ Back":"‹ Home";
  let page="";
  switch(state.view){
   case "projects":page=projectsScreen();break;
   case "project":page=projectScreen(state.id);break;
   case "photos":page=photoScreen();break;
   case "about":page=aboutScreen();break;
   case "notes":page=notesScreen();break;
   case "links":page=linksScreen();break;
   case "brief":page=briefScreen();break;
   case "contact":page=contactScreen();break;
   default:page=projectsScreen();
  }
  root.innerHTML=page;root.scrollTop=0;
  if(state.view==="projects")updateProjectRows();
 }
 function open(view,id){
  if(!mobile())return;
  if(view==="home"){home();return;}
  if(state.view!=="home")state.stack.push({view:state.view,id:state.id,tab:state.tab});
  else state.stack=[];
  state.view=view;state.id=id||null;state.tab="case";
  closeControls();render();
  if(view==="project"&&byKey[id]){
   const url=new URL(location.href);url.searchParams.set("project",id);history.replaceState(null,"",url.pathname+url.search+url.hash);
  }
 }
 function goBack(){
  if(!state.stack.length){home();return;}
  const prev=state.stack.pop();state.view=prev.view;state.id=prev.id;state.tab=prev.tab||"case";render();
 }
 function home(){
  state.view="home";state.id=null;state.stack=[];state.tab="case";
  appScreen.hidden=true; shell.classList.remove("ios-app-open");
  const url=new URL(location.href);url.searchParams.delete("project");history.replaceState(null,"",url.pathname+url.search+url.hash);
  closeControls();
 }
 function controls(){control.hidden=false;shell.classList.add("ios-control-open");}
 function closeControls(){control.hidden=true;shell.classList.remove("ios-control-open");}
 $("#ios-app-back").addEventListener("click",goBack);
 $("#ios-app-close").addEventListener("click",home);
 $("#ios-home-indicator").addEventListener("click",home);
 $("#ios-control-trigger").addEventListener("click",()=>control.hidden?controls():closeControls());
 $("#ios-control-close").addEventListener("click",closeControls);
 shell.addEventListener("click",e=>{
  const external=e.target.closest("[data-ios-external]");
  if(external){const u=external.dataset.iosExternal;if(/^https:\/\/(github\.com|usemirai\.app|www\.linkedin\.com)\//.test(u))window.open(u,"_blank","noopener,noreferrer");return;}
  const filter=e.target.closest("[data-ios-filter]");if(filter){state.filter=filter.dataset.iosFilter;$(".ios-filter-strip").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.iosFilter===state.filter));updateProjectRows();return;}
  const tab=e.target.closest("[data-ios-tab]");if(tab){state.tab=tab.dataset.iosTab;const scroll=root.scrollTop;render();root.scrollTop=scroll;return;}
  const lock=e.target.closest("[data-ios-action='lock']");if(lock){closeControls();home();window.DeonOS?.lock();return;}
  const app=e.target.closest("[data-ios-app]");if(app){
    if(app.dataset.role){state.filter=app.dataset.role;}
    open(app.dataset.iosApp,app.dataset.project);return;
  }
 });
 shell.addEventListener("input",e=>{if(e.target.id==="ios-project-query"){state.query=e.target.value;updateProjectRows();}});
 /* iPhone gestures: swipe up from the home-indicator region to go home.
    Edge-swipe right goes back; top-right pull-down opens Control Center.
    We do not block scrolling elsewhere. */
 shell.addEventListener("touchstart",e=>{
  if(!mobile()||!control.hidden)return;
  const t=e.changedTouches[0];
  gesture={startX:t.clientX,startY:t.clientY,time:Date.now(),kind:t.clientY>innerHeight-65?"home":t.clientY<95&&t.clientX>innerWidth*.62?"control":t.clientX<22&&state.view!=="home"?"back":null};
 },{passive:true});
 shell.addEventListener("touchend",e=>{
  if(!gesture)return;
  const t=e.changedTouches[0],dx=t.clientX-gesture.startX,dy=t.clientY-gesture.startY;
  if(gesture.kind==="home"&&dy< -48&&Math.abs(dx)<140)home();
  else if(gesture.kind==="back"&&dx>70&&Math.abs(dy)<70)goBack();
  else if(gesture.kind==="control"&&dy>65&&Math.abs(dx)<95)controls();
  gesture=null;
 },{passive:true});
 document.addEventListener("keydown",e=>{
  if(!mobile())return;
  if(e.key==="Escape"&&!control.hidden){closeControls();return;}
  if(e.key==="Escape"&&state.view!=="home")goBack();
 });
 const requested=new URLSearchParams(location.search).get("project");
 if(mobile()&&requested&&byKey[requested]){state.view="project";state.id=requested;render();}
 window.DeonIOS={open,home,goBack,closeControls};
})();