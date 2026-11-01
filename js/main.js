import{OceanGame}from"./game.js";
const $=s=>document.querySelector(s),oxygenValue=$("#oxygen-value"),oxygenBar=$("#oxygen-bar"),catchCount=$("#catch-count"),coinCount=$("#coin-count"),startScreen=$("#start-screen"),gameOver=$("#game-over"),toast=$("#toast"),statusNote=$("#status-note");let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);}
const game=new OceanGame($("#game"),{
onHud({oxygen,count,capacity,coins,nearby}){oxygenValue.textContent=`${oxygen}%`;oxygenBar.style.width=`${oxygen}%`;oxygenBar.style.background=oxygen<25?"linear-gradient(90deg,#e97865,#f2b17e)":"linear-gradient(90deg,#5fc9b3,#b6e6c4)";catchCount.textContent=`${count} / ${capacity}`;coinCount.textContent=coins;statusNote.textContent=nearby?`Nearby: ${nearby}`:"Explore the lagoon";},
onMessage:showToast,onStatus:message=>statusNote.textContent=message,
onEnd({count,earned,forced}){$("#summary-text").textContent=forced?`Oxygen ran out. You brought back ${count} fish and earned ${earned} coins.`:`Lovely dive! You brought back ${count} fish and earned ${earned} coins.`;gameOver.hidden=false;coinCount.textContent=game.coins;}
});
$("#start-button").addEventListener("click",()=>{startScreen.hidden=true;game.start();});
$("#continue-button").addEventListener("click",()=>{gameOver.hidden=true;game.oxygen=100;game.catch=[];game.fish.forEach(f=>f.caught=false);game.player.x=105;game.player.y=270;game.start();});

// Touch D-pad: pointer capture + per-pointer tracking avoids stuck directions
// and supports holding two directions simultaneously.
const activePointers=new Map(),keyCounts=new Map();
function pressDirection(event,key){
  event.preventDefault();
  if(activePointers.has(event.pointerId))return;
  activePointers.set(event.pointerId,key);
  keyCounts.set(key,(keyCounts.get(key)||0)+1);
  game.keys.add(key);
  try{event.currentTarget.setPointerCapture(event.pointerId);}catch{}
}
function releaseDirection(event){
  const key=activePointers.get(event.pointerId);
  if(!key)return;
  activePointers.delete(event.pointerId);
  const remaining=(keyCounts.get(key)||1)-1;
  if(remaining<=0){keyCounts.delete(key);game.keys.delete(key);}
  else keyCounts.set(key,remaining);
}
document.querySelectorAll("[data-move]").forEach(button=>{
  const map={up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright"};
  const key=map[button.dataset.move];
  button.addEventListener("pointerdown",event=>pressDirection(event,key));
  button.addEventListener("pointerup",releaseDirection);
  button.addEventListener("pointercancel",releaseDirection);
  button.addEventListener("lostpointercapture",releaseDirection);
});
function releaseAllTouch(){
  activePointers.clear();keyCounts.clear();
  ["arrowup","arrowdown","arrowleft","arrowright"].forEach(key=>game.keys.delete(key));
}
window.addEventListener("blur",releaseAllTouch);
document.addEventListener("visibilitychange",()=>{if(document.hidden)releaseAllTouch();});
$("#touch-catch").addEventListener("click",()=>game.running&&game.tryCatch());
$("#touch-surface").addEventListener("click",()=>game.running&&game.surface());
