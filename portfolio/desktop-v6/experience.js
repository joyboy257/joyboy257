"use strict";
/* DeonOS welcome and native-feeling app experiences; portfolio-only, no backend. */
(()=>{
  const lock=document.getElementById("lockscreen");
  const desktop=document.getElementById("desktop");
  const finder=document.getElementById("finder-window");
  const currentUrl=new URLSearchParams(location.search);
  const deepLinked=currentUrl.has("project")||currentUrl.has("role");
  const sessionOpen=(()=>{try{return sessionStorage.getItem("deonos-unlocked")==="yes";}catch{return false;}})();
  const state={locked:!deepLinked&&!sessionOpen,unlockedOnce:false,gestureY:null,gestureTime:0,transitioning:false};
  const $=(sel)=>document.querySelector(sel);
  const clock=$("#lock-clock"),date=$("#lock-date");
  function updateClock(){
    const now=new Date();
    clock.textContent=new Intl.DateTimeFormat("en-SG",{hour:"2-digit",minute:"2-digit",hour12:false}).format(now);
    date.textContent=new Intl.DateTimeFormat("en-SG",{weekday:"long",day:"numeric",month:"long"}).format(now);
  }
  updateClock();setInterval(updateClock,20000);
  function setHiddenForDesktop(hidden){
    // Keep the lock-screen buttons keyboard-reachable; prevent navigation through
    // the rest of the OS before unlocking.
    for(const child of Array.from(desktop.children)){
      if(child===lock)continue;
      child.inert=hidden;
    }
  }
  function afterUnlock({project,app}={}){
    if(project){openProject(project);if(matchMedia("(max-width:720px)").matches)finder.scrollIntoView({behavior:"smooth",block:"start"});}
    else if(app){openApp(app);}
    else if(!state.unlockedOnce){appToast("Welcome to DeonOS. Open an app or browse the folders.");}
    state.unlockedOnce=true;
  }
  function unlock(destination={}){
    if(!state.locked||state.transitioning){
      if(!state.locked&&(destination.project||destination.app))afterUnlock(destination);
      return;
    }
    state.transitioning=true;
    state.locked=false;
    setHiddenForDesktop(false);
    lock.classList.add("is-unlocking");
    desktop.classList.add("is-unlocked");
    try{sessionStorage.setItem("deonos-unlocked","yes");}catch{}
    setTimeout(()=>{
      lock.hidden=true;
      lock.classList.remove("is-unlocking");
      state.transitioning=false;
      afterUnlock(destination);
    },540);
  }
  function lockAgain(){
    if(state.locked)return;
    state.locked=true;
    state.transitioning=false;
    lock.hidden=false;
    desktop.classList.remove("is-unlocked");
    setHiddenForDesktop(true);
    try{sessionStorage.removeItem("deonos-unlocked");}catch{}
    updateClock();
    if(matchMedia("(max-width:720px)").matches)window.scrollTo({top:0,behavior:"instant"});
    $("#unlock-button").focus({preventScroll:true});
  }
  // The Frvky reference uses a gesture. Support swipe on touch, wheel,
  // keyboard and a plain button so the interaction is never a barrier.
  $("#unlock-button").addEventListener("click",()=>unlock());
  $("#lock-again")?.addEventListener("click",lockAgain);
  document.querySelectorAll("[data-unlock-project]").forEach(el=>el.addEventListener("click",()=>unlock({project:el.dataset.unlockProject})));
  document.querySelectorAll("[data-unlock-app]").forEach(el=>el.addEventListener("click",()=>unlock({app:el.dataset.unlockApp})));
  lock.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;state.gestureY=e.clientY;state.gestureTime=Date.now()},{passive:true});
  lock.addEventListener("pointerup",e=>{if(state.gestureY===null)return;if(state.gestureY-e.clientY>45)unlock();state.gestureY=null;},{passive:true});
  lock.addEventListener("wheel",e=>{if(state.locked&&e.deltaY>42)unlock();},{passive:true});
  document.addEventListener("keydown",e=>{
    if(!state.locked)return;
    if((e.key==="Enter"||e.key===" ")&&!(e.target instanceof HTMLButtonElement)){
      e.preventDefault();unlock();
    }
  });
  // Actual product screenshots and case files remain independent of the decorative shell.
  document.querySelectorAll("[data-gallery-project]").forEach(b=>b.addEventListener("click",()=>openProject(b.dataset.galleryProject)));
  for(const img of document.querySelectorAll(".photo-tile img")){
    img.addEventListener("error",()=>{img.style.display="none";img.parentElement?.classList.add("photo-image-unavailable");});
  }
  // First-time desktop should be discovered rather than arriving with a full Finder
  // window obscuring it. Explicit project deep links open the relevant file directly.
  if(!deepLinked&&finder)finder.hidden=true;
  if(state.locked){setHiddenForDesktop(true);}
  else{lock.hidden=true;desktop.classList.add("is-unlocked");setHiddenForDesktop(false);}
  window.DeonOS={unlock,lock:lockAgain};
})();