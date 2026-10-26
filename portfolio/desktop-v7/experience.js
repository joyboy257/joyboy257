"use strict";
/* DeonOS V7 — genuine swipe-to-unlock interaction, shared across Mac and iPhone. */
(function(){
 const lock=document.getElementById("lockscreen");
 const desktop=document.getElementById("desktop");
 const finder=document.getElementById("finder-window");
 if(!lock||!desktop)return;
 const $=s=>document.querySelector(s);
 const params=new URLSearchParams(location.search);
 const deepLinked=params.has("project")||params.has("role");
 const readSession=()=>{try{return sessionStorage.getItem("deonos-unlocked")==="yes";}catch{return false;}};
 const state={locked:!deepLinked&&!readSession(),transitioning:false,gesture:null,touchGesture:null,lastSwipe:0,wheelAccum:0,wheelTime:0};
 const mobile=()=>matchMedia("(max-width:720px)").matches;
 function clock(){
   const now=new Date();
   $("#lock-clock").textContent=new Intl.DateTimeFormat("en-SG",{hour:"2-digit",minute:"2-digit",hour12:false}).format(now);
   $("#lock-date").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"long",day:"numeric",month:"long"}).format(now);
 }
 clock();setInterval(clock,25000);
 function setBackgroundInert(locked){
   for(const child of Array.from(desktop.children)){
      if(child!==lock)child.inert=locked;
   }
 }
 function setProgress(delta){
    const distance=Math.max(0,Math.min(120,-delta));
    lock.style.setProperty("--swipe-offset",(-Math.min(34,distance*.27))+"px");
    lock.style.setProperty("--swipe-opacity",String(Math.max(.65,1-distance/360)));
    lock.classList.toggle("is-dragging",distance>5);
 }
 function clearProgress(){
   lock.classList.remove("is-dragging");
   lock.style.removeProperty("--swipe-offset");
   lock.style.removeProperty("--swipe-opacity");
 }
 function afterUnlock(destination){
   if(mobile()){
     const ios=window.DeonIOS;
     if(destination.project&&ios)ios.open("project",destination.project);
     else if(destination.app&&ios){const map={finder:"projects",safari:"links",photos:"photos",notes:"notes",brief:"brief",about:"about",terminal:"projects"};ios.open(map[destination.app]||"projects");}
   }else{
     if(destination.project){openProject(destination.project);}
     else if(destination.app){openApp(destination.app);}
   }
 }
 function unlock(destination={}){
   if(!state.locked||state.transitioning)return;
   state.transitioning=true;state.locked=false;
   clearProgress();
   setBackgroundInert(false);
   lock.classList.add("is-unlocking");
   desktop.classList.add("is-unlocked");
   try{sessionStorage.setItem("deonos-unlocked","yes");}catch{}
   window.setTimeout(()=>{
     lock.hidden=true;
     lock.classList.remove("is-unlocking");
     state.transitioning=false;
     afterUnlock(destination);
   },500);
 }
 function lockAgain(){
   if(state.locked)return;
   state.locked=true;state.transitioning=false;
   lock.hidden=false;lock.classList.remove("is-unlocking");
   clearProgress();
   desktop.classList.remove("is-unlocked");
   setBackgroundInert(true);
   try{sessionStorage.removeItem("deonos-unlocked");}catch{}
   clock();
   if(mobile())window.scrollTo({top:0,behavior:"instant"});
   $("#unlock-button").focus({preventScroll:true});
 }
 function registerGesture(kind,x,y){
   if(!state.locked)return null;
   return {kind,startX:x,startY:y,lastY:y,startTime:performance.now(),moved:false};
 }
 function handleMove(g,x,y,prevent){
   if(!g||!state.locked)return;
   const delta=y-g.startY,dx=x-g.startX;
   g.lastY=y;
   if(delta< -10&&Math.abs(delta)>Math.abs(dx)*.7){
      g.moved=true;
      setProgress(delta);
      if(prevent)prevent();
   }
 }
 function finishGesture(g,x,y){
   if(!g||!state.locked)return;
   const dy=g.startY-y,dx=Math.abs(g.startX-x),elapsed=Math.max(1,performance.now()-g.startTime);
   const valid=dy>=58&&dy>dx*1.15 || dy>=38&&dy>dx*1.2&&elapsed<290;
   if(valid){
     state.lastSwipe=Date.now();
     unlock();
   }else clearProgress();
 }
 // Listen in capture phase: swiping a notification should unlock too.
 lock.addEventListener("pointerdown",e=>{
   if(!state.locked||e.button!==0)return;
   state.gesture=registerGesture("pointer",e.clientX,e.clientY);
 },true);
 window.addEventListener("pointermove",e=>{
   if(state.gesture&&state.gesture.kind==="pointer")handleMove(state.gesture,e.clientX,e.clientY);
 },{passive:true,capture:true});
 window.addEventListener("pointerup",e=>{
   if(!state.gesture)return;
   const g=state.gesture;state.gesture=null;
   finishGesture(g,e.clientX,e.clientY);
 },{passive:true,capture:true});
 window.addEventListener("pointercancel",()=>{
   state.gesture=null;
   // Safari can cancel pointer streams during gestures; touchend handles it.
 },{passive:true});
 // Touch fallback for Mobile Safari and in-app browsers.
 lock.addEventListener("touchstart",e=>{
   if(!state.locked||!e.changedTouches.length)return;
   const t=e.changedTouches[0];state.touchGesture=registerGesture("touch",t.clientX,t.clientY);
 },{passive:true,capture:true});
 lock.addEventListener("touchmove",e=>{
   if(!state.touchGesture||!e.changedTouches.length)return;
   const t=e.changedTouches[0];
   handleMove(state.touchGesture,t.clientX,t.clientY,()=>{if(e.cancelable)e.preventDefault();});
 },{passive:false,capture:true});
 window.addEventListener("touchend",e=>{
   if(!state.touchGesture||!e.changedTouches.length)return;
   const t=e.changedTouches[0],g=state.touchGesture;state.touchGesture=null;
   finishGesture(g,t.clientX,t.clientY);
 },{passive:true,capture:true});
 window.addEventListener("touchcancel",()=>{state.touchGesture=null;clearProgress();},{passive:true});
 // A Mac trackpad's upward swipe is scrolling down (positive wheel delta).
 lock.addEventListener("wheel",e=>{
   if(!state.locked)return;
   if(e.cancelable)e.preventDefault();
   const now=performance.now();
   if(now-state.wheelTime>500)state.wheelAccum=0;
   state.wheelTime=now;
   if(e.deltaY>0)state.wheelAccum+=e.deltaY;
   else state.wheelAccum=Math.max(0,state.wheelAccum+e.deltaY);
   setProgress(-state.wheelAccum);
   if(state.wheelAccum>90){state.lastSwipe=Date.now();unlock();}
 },{passive:false});
 // Prevent synthetic post-swipe clicks from accidentally opening a notification.
 lock.addEventListener("click",e=>{
    if(Date.now()-state.lastSwipe<550){e.preventDefault();e.stopImmediatePropagation();}
 },true);
 $("#unlock-button").addEventListener("click",()=>unlock());
 $("#lock-again")?.addEventListener("click",lockAgain);
 document.querySelectorAll("[data-unlock-project]").forEach(el=>
   el.addEventListener("click",()=>unlock({project:el.dataset.unlockProject})));
 document.querySelectorAll("[data-unlock-app]").forEach(el=>
   el.addEventListener("click",()=>unlock({app:el.dataset.unlockApp})));
 document.addEventListener("keydown",e=>{
   if(!state.locked)return;
   if(["ArrowUp","PageUp"].includes(e.key)){
     e.preventDefault();unlock();return;
   }
   if(["Enter"," "].includes(e.key)&&!e.target.closest("button")){
     e.preventDefault();unlock();
   }
 });
 document.querySelectorAll("[data-gallery-project]").forEach(btn=>{
   btn.addEventListener("click",()=>openProject(btn.dataset.galleryProject));
 });
 document.querySelectorAll(".photo-tile img").forEach(img=>img.addEventListener("error",()=>{
   img.style.display="none";img.parentElement?.classList.add("photo-image-unavailable");
 }));
 // Open into a clear desktop, not an obstructing Finder window.
 if(!deepLinked&&finder)finder.hidden=true;
 if(state.locked){setBackgroundInert(true);}
 else{
   lock.hidden=true;desktop.classList.add("is-unlocked");
   setBackgroundInert(false);
 }
 window.DeonOS={unlock,lock:lockAgain,get locked(){return state.locked;}};
})();