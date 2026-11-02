import{readProgress,writeProgress}from"./core/storage.js";
import{InputController}from"./core/input.js";
import{OceanGame}from"./game.js";
import{configureCanvas}from"./core/canvas.js";
import{BarRenderer}from"./core/bar-renderer.js";
import{RestaurantManager}from"./restaurant.js";
import{BIOMES,unlockedBiomes}from"./data/biomes.js";
import{AudioManager}from"./core/audio.js";
import{applyLanguage,setLanguage,observeTranslations}from"./i18n.js";
import{achievementProgress}from"./progression.js";
import{challengeCards,ensureChallenges}from"./challenges.js";
import{activitySummary}from"./activity.js";
import{FISH_SPECIES}from"./data/fish.js";
const audio=new AudioManager(readProgress().soundEnabled),$=s=>document.querySelector(s),oxygenValue=$("#oxygen-value"),oxygenBar=$("#oxygen-bar"),catchCount=$("#catch-count"),coinCount=$("#coin-count"),startScreen=$("#start-screen"),gameOver=$("#game-over"),toast=$("#toast"),statusNote=$("#status-note");let toastTimer,lastDiveFish=[],restaurantFrame=0,restaurantElapsed=0,selectedCharacter=readProgress().character;
function showToast(message){audio.play("click");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);}
const restaurantPanel=$("#restaurant-panel"),gamePanel=document.querySelector(".game-panel"),barCanvas=$("#restaurant-scene"),barContext=configureCanvas(barCanvas,960,540),barRenderer=new BarRenderer(barContext,960,540);
function renderRestaurantUI(state){renderChallenges();
  $("#restaurant-coins").textContent=state.coins;$("#decor-theme-select").value=state.decorTheme||"neon";$("#bar-level-label").textContent=`NÍVEL ${state.barLevel} · ${["CASA DE CHÁ","SALÃO NEON","JARDIM ZEN","SUSHI PALACE","NEXUS IMPERIAL"][state.barLevel-1]}`;$("#upgrade-bar-button").textContent=state.barLevel>=5?"BAR NO NÍVEL MÁXIMO":`AMPLIAR O BAR · ${state.barUpgradeCost} ◉`;$("#upgrade-bar-button").disabled=!state.canUpgradeBar;$("#upgrade-gear-button").textContent=state.equipmentLevel>=5?"EQUIPAMENTO MÁXIMO":`EQUIPAMENTO NÍVEL ${state.equipmentLevel} → ${state.equipmentLevel+1} · ${state.gearUpgradeCost} ◉`;$("#upgrade-gear-button").disabled=!state.canUpgradeGear;$("#equipment-specialization").value=readProgress().equipmentSpecialization;$("#upgrade-decor-button").textContent=state.decorLevel>=3?"DECORAÇÃO NO MÁXIMO":`DECORAÇÃO NÍVEL ${state.decorLevel+1} · ${state.decorUpgradeCost} ◉`;$("#upgrade-decor-button").disabled=!state.canUpgradeDecor;$("#shift-analytics").textContent=`Turno: ${state.shiftStats.served} atendidos · ${state.shiftStats.lost} saídas · ${state.shiftStats.revenue} moedas + ${state.shiftStats.tips} gorjetas${state.eventType?` · ${state.eventType}`:""}`;$("#shift-rating").textContent=`Satisfação ${state.satisfaction}% · ${"★".repeat(state.rating)}${"☆".repeat(5-state.rating)}`;$("#restaurant-reputation").textContent=state.reputation;$("#restaurant-night").textContent=`NOITE ${String(state.day).padStart(2,"0")} · HOSPITALIDADE ZEN`;$("#restock-tea-button").disabled=!state.canRestockTea;
  $("#customer-name").textContent=state.order?state.order.customer:"Turno encerrado";
  $("#customer-order").textContent=state.order?`Pedido: ${state.order.itemName} · Preferências: ${state.order.favorites.map(id=>state.menu.find(item=>item.id===id)?.name).filter(Boolean).join(" ou ")}`:"Todos os clientes foram atendidos.";
  $("#restaurant-feedback").textContent=state.message;$("#customer-queue").textContent=state.queue.length?state.queue.join(" · "):"Sem fila";const patiencePercent=Math.max(0,state.patience/state.patienceMax*100);$("#customer-patience-bar").style.width=`${patiencePercent}%`;$("#customer-patience-bar").style.background=patiencePercent<30?"#ff4f83":"#37e6e0";$("#customer-patience-value").textContent=`${Math.ceil(state.patience)}s`;$("#preparation-status").hidden=!state.preparation;if(state.preparation){$("#preparation-name").textContent=state.preparation.itemName;$("#preparation-bar").style.width=state.preparation.awaitingStation?"0%":`${(1-state.preparation.remaining/state.preparation.duration)*100}%`;$("#preparation-step").textContent=state.preparation.currentStep?.label||"Receita concluída";$("#kitchen-stations").innerHTML=state.preparation.awaitingStation?state.stations.map(station=>{const active=station.id===state.preparation.currentStep?.station;return `<button class="station-button ${active?"station-required":""}" data-station="${station.id}" ${station.category!==(state.menu.find(item=>item.id===state.preparation.itemId)?.category)?"disabled":""}>${station.icon} ${station.name}</button>`;}).join(""):"";$("#kitchen-stations").querySelectorAll("[data-station]").forEach(button=>button.addEventListener("click",()=>restaurant.chooseStation(button.dataset.station)));}
  $("#shift-progress-label").textContent=`${state.served} / ${state.shiftTarget} clientes atendidos`;
  $("#shift-progress-bar").style.width=`${state.served/state.shiftTarget*100}%`;
  $("#next-dive-button").hidden=!state.closed;
  $("#restaurant-menu").innerHTML=state.menu.map(item=>{const stock=item.category==="tea"?(state.teaStock[item.teaId]||0):(state.fishStock[item.fishId]||0);const favorite=state.order?.favorites?.includes(item.id);const active=state.preparation?.itemId===item.id;const locked=(item.unlockLevel&&state.fishingLevel<item.unlockLevel)||(item.barUnlockLevel&&state.barLevel<item.barUnlockLevel);const lockLabel=item.unlockLevel?`Nível de pesca ${item.unlockLevel}`:`Nível do bar ${item.barUnlockLevel}`;return `<button class="menu-item ${favorite?"customer-favorite":""} ${active?"preparing":""}" data-menu-id="${item.id}" ${stock<1||state.closed||!!state.preparation||locked?"disabled":""}><span><strong>${item.name}</strong><small>${locked?`🔒 ${lockLabel}`:`${item.category==="tea"?"Chá":"Sushi"} · estoque ${stock}${favorite?" · preferência":""}`}</small></span><b>${item.prepSeconds.toFixed(1)}s</b></button>`;}).join("");
  $("#restaurant-menu").querySelectorAll("[data-menu-id]").forEach(button=>button.addEventListener("click",()=>restaurant.prepare(button.dataset.menuId)));
  const fishNames={sardine:"Sardinha",clownfish:"Peixe-palhaço","blue-tang":"Blue tang",pufferfish:"Baiacu",moonfish:"Moonfish",lanternfish:"Peixe-lanterna","koi-ray":"Raia Koi"};
  const rows=Object.entries(state.fishStock).filter(([,n])=>n>0).map(([id,n])=>`<div class="stock-row"><span>${fishNames[id]||id}</span><span>${n}</span></div>`);
  const teaNames={matcha:"Matcha",hojicha:"Hojicha",lotus:"Lótus",genmaicha:"Genmaicha",yuzu:"Yuzu"};Object.entries(state.teaStock).forEach(([id,n])=>{if(n>0)rows.push(`<div class="stock-row"><span>Chá ${teaNames[id]||id}</span><span>${n}</span></div>`);});
  $("#restaurant-stock").innerHTML=rows.length?rows.join(""):"<span>Estoque vazio</span>";
}
const restaurant=new RestaurantManager(renderRestaurantUI);
function renderChallenges(){const saved=readProgress();const activity=activitySummary(saved);$("#activity-streak").textContent=`${activity.days} dias ativos · próximo marco: ${activity.nextMilestone?`${activity.nextMilestone} dias (+${activity.nextReward} moedas)`:"todos os marcos concluídos"}`;const active=ensureChallenges(saved);if(active.dailyChallenge?.period!==saved.dailyChallenge?.period||active.weeklyChallenge?.period!==saved.weeklyChallenge?.period)writeProgress(active);const cards=challengeCards(active);$("#challenge-grid").innerHTML=cards.map(item=>`<article class="challenge-card ${item.completed?"completed":""}"><div class="challenge-meta"><span>${item.type}</span><strong>${item.completed?"✓ CONCLUÍDO":`+ ${item.reward} ◉`}</strong></div><h3>${item.title}</h3><p>${item.description}</p><div class="achievement-meter"><span style="width:${item.percent}%"></span></div><small>${item.progress} / ${item.goal} · ${item.percent}%</small></article>`).join("");}
function renderCollection(){const p=readProgress();const achievements=achievementProgress(p);$("#achievement-count").textContent=`${achievements.filter(a=>a.unlocked).length} / ${achievements.length}`;$("#collection-stats").innerHTML=`<span>${p.totalDives} mergulhos</span><span>${p.totalFishCaught} peixes capturados</span><span>${p.customersServed} clientes atendidos</span><span>${p.coins} moedas</span>`;$("#achievement-grid").innerHTML=achievements.map(a=>`<article class="achievement ${a.unlocked?"unlocked":""}"><strong>${a.unlocked?"🏆":"🔒"} ${a.title}</strong><small>${a.description}</small><div class="achievement-meter"><span style="width:${a.percent}%"></span></div><small>${a.current} / ${a.goal}</small></article>`).join("");$("#species-grid").innerHTML=FISH_SPECIES.map(f=>{const count=p.speciesCaught[f.id]||0;return `<article class="species-entry ${count?"discovered":""}"><strong>${count?f.name:"Espécie não descoberta"}</strong><small>${count?`${count} capturas · ${f.rarity}`:"Explore os biomas para encontrar"}</small></article>`;}).join("");}
renderCollection();
renderChallenges();
const preferences=readProgress();
let currentLanguage=applyLanguage(preferences.language);
const languageSelector=$("#language-select");
if(languageSelector){languageSelector.value=currentLanguage;languageSelector.addEventListener("change",()=>{currentLanguage=setLanguage(languageSelector.value);});}
observeTranslations(()=>currentLanguage);
function applyPreferences(){document.body.classList.toggle("reduce-motion",preferences.reducedMotion);$("#sound-toggle").setAttribute("aria-pressed",String(preferences.soundEnabled));$("#motion-toggle").setAttribute("aria-pressed",String(preferences.reducedMotion));$("#sound-toggle").textContent=preferences.soundEnabled?"SOM: LIGADO":"SOM: DESLIGADO";$("#motion-toggle").textContent=preferences.reducedMotion?"MOVIMENTO: REDUZIDO":"MOVIMENTO: NORMAL";}
$("#sound-toggle").addEventListener("click",()=>{preferences.soundEnabled=!preferences.soundEnabled;writeProgress({...readProgress(),soundEnabled:preferences.soundEnabled});audio.setEnabled(preferences.soundEnabled);applyPreferences();if(preferences.soundEnabled)audio.play("success");});
$("#motion-toggle").addEventListener("click",()=>{preferences.reducedMotion=!preferences.reducedMotion;writeProgress({...readProgress(),reducedMotion:preferences.reducedMotion});applyPreferences();});
applyPreferences();
function animateRestaurant(){if(restaurantPanel.hidden)return;restaurantElapsed+=1/60;restaurant.tick(1/60);barRenderer.render(restaurant.getState(),restaurantElapsed);restaurantFrame=requestAnimationFrame(animateRestaurant);}
const game=new OceanGame($("#game"),{
onHud({oxygen,count,capacity,coins,nearby,missionCount}){oxygenValue.textContent=`${oxygen}%`;oxygenBar.style.width=`${oxygen}%`;oxygenBar.style.background=oxygen<25?"linear-gradient(90deg,#e97865,#f2b17e)":"linear-gradient(90deg,#5fc9b3,#b6e6c4)";catchCount.textContent=`${count} / ${capacity}`;coinCount.textContent=coins;$("#species-count").textContent=`${Object.keys(readProgress().speciesCaught||{}).length} / 7`;$("#mission-progress").textContent=`${missionCount} / 3 peixes`;const xp=readProgress().fishingXP||0;const level=Math.min(5,Math.floor(xp/100)+1);$("#player-level-label").textContent=`NÍVEL ${level} · ${["PESCADOR INICIANTE","PESCADOR APRENDIZ","PESCADOR EXPERIENTE","PESCADOR ESPECIALISTA","MESTRE DAS MARÉS"][level-1]}`;statusNote.textContent=nearby?`Perto: ${nearby}`:"Explore a lagoa";},
onMessage:showToast,onStatus:message=>statusNote.textContent=message,
onEnd({count,earned,forced,fish,missionComplete,missionReward,baseEarned,qualityBonus,biome}){lastDiveFish=fish||[];renderChallenges();$("#summary-text").textContent=`${forced?"O oxigênio acabou.":"Ótimo mergulho!"} ${count} peixes em ${biome.name}. ${baseEarned} moedas${qualityBonus?` + ${qualityBonus} qualidade`:""}${missionComplete?` + ${missionReward} de missão`:""}.`;renderBiomePicker();renderCollection();gameOver.hidden=false;coinCount.textContent=game.coins;}
});
const characterNames={kai:"Kai",yuna:"Yuna"};
let selectedBiome=readProgress().biome||"lagoon";
function renderBiomePicker(){const level=Math.min(7,Math.floor(readProgress().fishingXP/100)+1);const picker=$("#biome-picker");picker.innerHTML=BIOMES.map(biome=>{const unlocked=biome.unlockLevel<=level;return `<button class="biome-option ${biome.id===selectedBiome?"selected":""}" data-biome="${biome.id}" aria-pressed="${biome.id===selectedBiome}" ${unlocked?"":"disabled"}><strong>${biome.name}</strong><small>${biome.depth} · ${unlocked?"Disponível":`Nível ${biome.unlockLevel}`}</small></button>`;}).join("");picker.querySelectorAll("[data-biome]").forEach(button=>button.addEventListener("click",()=>{if(button.disabled)return;selectedBiome=button.dataset.biome;game.setBiome(selectedBiome);renderBiomePicker();}));const biome=BIOMES.find(item=>item.id===selectedBiome)||BIOMES[0];$("#biome-note").textContent=`Missão: ${biome.mission.toLowerCase()} e ganhe ${biome.reward} moedas.`;}renderBiomePicker();
document.querySelectorAll("[data-character]").forEach(button=>button.addEventListener("click",()=>{selectedCharacter=button.dataset.character;document.querySelectorAll("[data-character]").forEach(option=>{const active=option===button;option.classList.toggle("selected",active);option.setAttribute("aria-pressed",String(active));});$("#character-note").textContent=`${characterNames[selectedCharacter]} está pronto para mergulhar.`;}));
document.querySelectorAll("[data-character]").forEach(button=>{const active=button.dataset.character===selectedCharacter;button.classList.toggle("selected",active);button.setAttribute("aria-pressed",String(active));});$("#character-note").textContent=`${characterNames[selectedCharacter]} está pronto para mergulhar.`;
function launchDive(){game.start();$("#player-heading").textContent=`Expedição de ${characterNames[selectedCharacter]}`;}
$("#start-button").addEventListener("click",()=>{game.character=selectedCharacter;game.setBiome(selectedBiome);writeProgress({...readProgress(),character:selectedCharacter,biome:selectedBiome});startScreen.hidden=true;if(!readProgress().tutorialComplete){$("#tutorial-screen").hidden=false;return;}launchDive();});
$("#tutorial-begin").addEventListener("click",()=>{writeProgress({...readProgress(),tutorialComplete:true});$("#tutorial-screen").hidden=true;launchDive();});
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
$("#upgrade-decor-button").addEventListener("click",()=>restaurant.upgradeDecor());
$("#decor-theme-select").addEventListener("change",event=>{const progress=writeProgress({...readProgress(),decorTheme:event.target.value});restaurant.progress=progress;restaurant.emit();});
$("#upgrade-gear-button").addEventListener("click",()=>{if(restaurant.upgradeGear()){game.equipmentLevel=restaurant.progress.equipmentLevel;game.refreshEquipment();}});
$("#equipment-specialization").addEventListener("change",event=>{writeProgress({...readProgress(),equipmentSpecialization:event.target.value});game.refreshEquipment();showToast(`Especialização aplicada: ${event.target.selectedOptions[0].textContent}`);});
$("#next-dive-button").addEventListener("click",()=>{
  const progress=restaurant.progress;progress.day+=1;restaurant.save();game.coins=progress.coins;game.updateHud();
  cancelAnimationFrame(restaurantFrame);restaurantPanel.hidden=true;gamePanel.hidden=false;
  game.resetDive();game.start();
});
