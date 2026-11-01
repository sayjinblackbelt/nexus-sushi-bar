import{readProgress,writeProgress}from"./core/storage.js";
import{InputController}from"./core/input.js";
import{OceanGame}from"./game.js";
import{configureCanvas}from"./core/canvas.js";
import{BarRenderer}from"./core/bar-renderer.js";
import{RestaurantManager}from"./restaurant.js";
const $=s=>document.querySelector(s),oxygenValue=$("#oxygen-value"),oxygenBar=$("#oxygen-bar"),catchCount=$("#catch-count"),coinCount=$("#coin-count"),startScreen=$("#start-screen"),gameOver=$("#game-over"),toast=$("#toast"),statusNote=$("#status-note");let toastTimer,lastDiveFish=[],restaurantFrame=0,restaurantElapsed=0,selectedCharacter=readProgress().character;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);}
const restaurantPanel=$("#restaurant-panel"),gamePanel=document.querySelector(".game-panel"),barCanvas=$("#restaurant-scene"),barContext=configureCanvas(barCanvas,960,540),barRenderer=new BarRenderer(barContext,960,540);
function renderRestaurantUI(state){
  $("#restaurant-coins").textContent=state.coins;$("#bar-level-label").textContent=`NÍVEL ${state.barLevel} · ${["CASA DE CHÁ","SALÃO NEON","JARDIM ZEN","SUSHI PALACE","NEXUS IMPERIAL"][state.barLevel-1]}`;$("#upgrade-bar-button").textContent=state.barLevel>=5?"BAR NO NÍVEL MÁXIMO":`AMPLIAR O BAR · ${state.barUpgradeCost} ◉`;$("#upgrade-bar-button").disabled=!state.canUpgradeBar;$("#upgrade-gear-button").textContent=state.equipmentLevel>=5?"EQUIPAMENTO MÁXIMO":`EQUIPAMENTO NÍVEL ${state.equipmentLevel} → ${state.equipmentLevel+1} · ${state.gearUpgradeCost} ◉`;$("#upgrade-gear-button").disabled=!state.canUpgradeGear;$("#restaurant-reputation").textContent=state.reputation;$("#restaurant-night").textContent=`NOITE ${String(state.day).padStart(2,"0")} · HOSPITALIDADE ZEN`;$("#restock-tea-button").disabled=!state.canRestockTea;
  $("#customer-name").textContent=state.order?state.order.customer:"Turno encerrado";
  $("#customer-order").textContent=state.order?`Pedido: ${state.order.itemName}`:"Todos os clientes foram atendidos.";
  $("#restaurant-feedback").textContent=state.message;
  $("#shift-progress-label").textContent=`${state.served} / ${state.shiftTarget} clientes atendidos`;
  $("#shift-progress-bar").style.width=`${state.served/state.shiftTarget*100}%`;
  $("#next-dive-button").hidden=!state.closed;
  $("#restaurant-menu").innerHTML=state.menu.map(item=>{const stock=item.category==="tea"?(state.teaStock[item.teaId]||0):(state.fishStock[item.fishId]||0);return `<button class="menu-item" data-menu-id="${item.id}" ${stock<1||state.closed?"disabled":""}><span><strong>${item.name}</strong><small>${item.category==="tea"?"Chá":"Sushi"} · estoque ${stock}</small></span><b>${item.price} ◉</b></button>`;}).join("");
  $("#restaurant-menu").querySelectorAll("[data-menu-id]").forEach(button=>button.addEventListener("click",()=>restaurant.serve(button.dataset.menuId)));
  const fishNames={sardine:"Sardinha",clownfish:"Peixe-palhaço","blue-tang":"Blue tang",pufferfish:"Baiacu",moonfish:"Moonfish"};
  const rows=Object.entries(state.fishStock).filter(([,n])=>n>0).map(([id,n])=>`<div class="stock-row"><span>${fishNames[id]||id}</span><span>${n}</span></div>`);
  const teaNames={matcha:"Matcha",hojicha:"Hojicha",lotus:"Lótus"};Object.entries(state.teaStock).forEach(([id,n])=>{if(n>0)rows.push(`<div class="stock-row"><span>Chá ${teaNames[id]||id}</span><span>${n}</span></div>`);});
  $("#restaurant-stock").innerHTML=rows.length?rows.join(""):"<span>Estoque vazio</span>";
}
const restaurant=new RestaurantManager(renderRestaurantUI);
function animateRestaurant(){if(restaurantPanel.hidden)return;restaurantElapsed+=1/60;barRenderer.render(restaurant.getState(),restaurantElapsed);restaurantFrame=requestAnimationFrame(animateRestaurant);}
const game=new OceanGame($("#game"),{
onHud({oxygen,count,capacity,coins,nearby}){oxygenValue.textContent=`${oxygen}%`;oxygenBar.style.width=`${oxygen}%`;oxygenBar.style.background=oxygen<25?"linear-gradient(90deg,#e97865,#f2b17e)":"linear-gradient(90deg,#5fc9b3,#b6e6c4)";catchCount.textContent=`${count} / ${capacity}`;coinCount.textContent=coins;const xp=readProgress().fishingXP||0;const level=Math.min(5,Math.floor(xp/100)+1);$("#player-level-label").textContent=`NÍVEL ${level} · ${["PESCADOR INICIANTE","PESCADOR APRENDIZ","PESCADOR EXPERIENTE","PESCADOR ESPECIALISTA","MESTRE DAS MARÉS"][level-1]}`;statusNote.textContent=nearby?`Perto: ${nearby}`:"Explore a lagoa";},
onMessage:showToast,onStatus:message=>statusNote.textContent=message,
onEnd({count,earned,forced,fish}){lastDiveFish=fish||[];$("#summary-text").textContent=forced?`O oxigênio acabou. Você trouxe ${count} peixes e ganhou ${earned} moedas.`:`Ótimo mergulho! Você trouxe ${count} peixes e ganhou ${earned} moedas.`;gameOver.hidden=false;coinCount.textContent=game.coins;}
});
const characterNames={kai:"Kai",yuna:"Yuna"};
document.querySelectorAll("[data-character]").forEach(button=>button.addEventListener("click",()=>{selectedCharacter=button.dataset.character;document.querySelectorAll("[data-character]").forEach(option=>{const active=option===button;option.classList.toggle("selected",active);option.setAttribute("aria-pressed",String(active));});$("#character-note").textContent=`${characterNames[selectedCharacter]} está pronto para mergulhar.`;}));
document.querySelectorAll("[data-character]").forEach(button=>{const active=button.dataset.character===selectedCharacter;button.classList.toggle("selected",active);button.setAttribute("aria-pressed",String(active));});$("#character-note").textContent=`${characterNames[selectedCharacter]} está pronto para mergulhar.`;
$("#start-button").addEventListener("click",()=>{game.character=selectedCharacter;writeProgress({...readProgress(),character:selectedCharacter});startScreen.hidden=true;game.start();$("#player-heading").textContent=`Expedição de ${characterNames[selectedCharacter]}`;});
$("#continue-button").addEventListener("click",()=>{gameOver.hidden=true;game.resetDive();game.start();});

const inputController=new InputController(game,document);
$("#touch-catch").addEventListener("click",()=>game.running&&game.tryCatch());
$("#touch-surface").addEventListener("click",()=>game.running&&game.surface());

$("#open-bar-button").addEventListener("click",()=>{
  gameOver.hidden=true;gamePanel.hidden=true;restaurantPanel.hidden=false;
  restaurant.beginShift(lastDiveFish);restaurantElapsed=0;
  cancelAnimationFrame(restaurantFrame);animateRestaurant();
});
$("#restock-tea-button").addEventListener("click",()=>restaurant.restockTea());
$("#upgrade-bar-button").addEventListener("click",()=>restaurant.upgradeBar());
$("#upgrade-gear-button").addEventListener("click",()=>{if(restaurant.upgradeGear()){game.equipmentLevel=restaurant.progress.equipmentLevel;game.maxCatch=8+(game.equipmentLevel-1)*2;game.speed=190+(game.equipmentLevel-1)*18;}});
$("#next-dive-button").addEventListener("click",()=>{
  const progress=restaurant.progress;progress.day+=1;restaurant.save();game.coins=progress.coins;game.updateHud();
  cancelAnimationFrame(restaurantFrame);restaurantPanel.hidden=true;gamePanel.hidden=false;
  game.resetDive();game.start();
});
