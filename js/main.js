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
document.querySelectorAll("[data-move]").forEach(button=>{const map={up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright"},key=map[button.dataset.move];const press=e=>{e.preventDefault();game.keys.add(key);},release=e=>{e.preventDefault();game.keys.delete(key);};button.addEventListener("pointerdown",press);button.addEventListener("pointerup",release);button.addEventListener("pointerleave",release);button.addEventListener("pointercancel",release);});
$("#touch-catch").addEventListener("click",()=>game.running&&game.tryCatch());$("#touch-surface").addEventListener("click",()=>game.running&&game.surface());