"use strict";
/* macOS-inspired original icons backed by an SVG sprite; no proprietary font assets. */
(function(){
 const icon=(name,extra)=>'<svg class="vector-icon '+(extra||'')+'" aria-hidden="true" focusable="false"><use href="./icons.svg#'+name+'"></use></svg>';
 const set=(selector,mark)=>document.querySelectorAll(selector).forEach(el=>{el.innerHTML=mark;el.classList.add("has-vector-icon");});
 function mount(){
  const dock={".dock-finder":"finder",".dock-brief":"notes",".dock-about":"about",".dock-terminal":"terminal",".dock-github":"github",".dock-linkedin":"linkedin"};
  Object.entries(dock).forEach(([selector,name])=>set(selector,icon(name,"dock-vector")));
  set(".menu-logo",icon("command","menubar-vector"));
  set("#finder-search",icon("search","toolbar-vector"));
  set("#spotlight-toggle",icon("search","toolbar-vector")+'<span>Search</span><kbd>⌘ K</kbd>');
  document.querySelectorAll(".desktop-icon .folder-art").forEach(el=>{
   el.innerHTML=icon("folder","folder-vector");el.classList.add("vector-folder");
  });
  document.querySelectorAll(".finder-sidebar .side-folder").forEach(el=>{
   el.innerHTML=icon("folder","sidebar-folder-vector");el.classList.add("vector-folder");
  });
  set(".file-art",icon("notes","file-vector"));
  const shortcuts={about:["person","About me"],brief:["document","Recruiter brief"],terminal:["code","Terminal"]};
  document.querySelectorAll(".finder-sidebar .side-item[data-app]").forEach(el=>{
   const pair=shortcuts[el.dataset.app];if(pair)el.innerHTML=icon(pair[0],"sidebar-action-vector")+'<span>'+pair[1]+'</span>';
  });
 }
 function file(letters,tone){
  const code=String(letters||"").replace(/[^A-Za-z]/g,"").slice(0,2).toUpperCase();
  return icon("document","document-vector")+'<span class="document-monogram">'+code+'</span>';
 }
 window.PortfolioIcons={mount,file,icon};
 mount();
})();