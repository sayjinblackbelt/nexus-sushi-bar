import{InputController}from"./core/input.js";
import{OceanGame}from"./game.js";
import{configureCanvas}from"./core/canvas.js";
import{BarRenderer}from"./core/bar-renderer.js";
import{RestaurantManager}from"./restaurant.js";
const $=s=>document.querySelector(s),oxygenValue=$("#oxygen-value"),oxygenBar=$("#oxygen-bar"),catchCount=$("#catch-count"),coinCount=$("#coin-count"),startScreen=$("#start-screen"),gameOver=$("#game-over"),toast=$("#toast"),statusNote=$("#status-note");let toastTimer,lastDiveFish=[],restaurantFrame=0,restaurantElapsed=0;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);}
const restaurantPanel=$("#restaurant-panel"),gamePanel=document.querySelector(".game-panel"),barCanvas=$("#restaurant-scene"),barContext=configureCanvas(barCanvas,960,540),barRenderer=new BarRenderer(barContext,960,540);
function renderRestaurantUI(state){
  $("#restaurant-coins").textContent=state.coins;$("#restaurant-reputation").textContent=state.reputation;
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
onHud({oxygen,count,capacity,coins,nearby}){oxygenValue.textContent=`${oxygen}%`;oxygenBar.style.width=`${oxygen}%`;oxygenBar.style.background=oxygen<25?"linear-gradient(90deg,#e97865,#f2b17e)":"linear-gradient(90deg,#5fc9b3,#b6e6c4)";catchCount.textContent=`${count} / ${capacity}`;coinCount.textContent=coins;statusNote.textContent=nearby?`Perto: ${nearby}`:"Explore a lagoa";},
onMessage:showToast,onStatus:message=>statusNote.textContent=message,
onEnd({count,earned,forced,fish}){lastDiveFish=fish||[];$("#summary-text").textContent=forced?`O oxigênio acabou. Você trouxe ${count} peixes e ganhou ${earned} moedas.`:`Ótimo mergulho! Você trouxe ${count} peixes e ganhou ${earned} moedas.`;gameOver.hidden=false;coinCount.textContent=game.coins;}
});
$("#start-button").addEventListener("click",()=>{startScreen.hidden=true;game.start();});
$("#continue-button").addEventListener("click",()=>{gameOver.hidden=true;game.resetDive();game.start();});

const inputController=new InputController(game,document);
$("#touch-catch").addEventListener("click",()=>game.running&&game.tryCatch());
$("#touch-surface").addEventListener("click",()=>game.running&&game.surface());

$("#open-bar-button").addEventListener("click",()=>{
  gameOver.hidden=true;gamePanel.hidden=true;restaurantPanel.hidden=false;
  restaurant.beginShift(lastDiveFish);restaurantElapsed=0;
  cancelAnimationFrame(restaurantFrame);animateRestaurant();
});
$("#next-dive-button").addEventListener("click",()=>{
  const progress=restaurant.progress;progress.day+=1;restaurant.save();
  cancelAnimationFrame(restaurantFrame);restaurantPanel.hidden=true;gamePanel.hidden=false;
  game.resetDive();game.start();
});
