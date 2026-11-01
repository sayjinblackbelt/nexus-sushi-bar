import{OceanRenderer}from"./core/renderer.js";
import{configureCanvas}from"./core/canvas.js";
import{createSchool}from"./data/fish.js";
import{readNumber,writeNumber}from"./core/storage.js";
const W=960,H=540,MAX_CATCH=8,SPEED=190;
export class OceanGame{
constructor(canvas,callbacks={}){this.canvas=canvas;this.ctx=configureCanvas(canvas,W,H);this.renderer=new OceanRenderer(this.ctx,W,H);this.callbacks=callbacks;this.keys=new Set();this.running=false;this.player={x:105,y:270,facing:1,bob:0};this.oxygen=100;this.coins=readNumber("nexus-coins",0);this.bestCatch=readNumber("nexus-best-catch",0);this.catch=[];this.fish=createSchool(W,H);this.lastTime=0;this.elapsed=0;this.nearbyFish=null;this.render();this.updateHud();}
resetDive(){if(this.running)return;this.oxygen=100;this.catch=[];this.fish.forEach(f=>{f.caught=false;});this.player.x=105;this.player.y=270;this.player.facing=1;this.nearbyFish=null;this.keys.clear();this.render();this.updateHud();}
start(){if(this.running)return;this.running=true;this.lastTime=performance.now();this.callbacks.onStart?.();requestAnimationFrame(t=>this.loop(t));}
loop(t){if(!this.running)return;const dt=Math.max(0,Math.min((t-this.lastTime)/1000,.04));this.lastTime=t;this.elapsed+=dt;this.update(dt);this.render();requestAnimationFrame(n=>this.loop(n));}
update(dt){const p=this.player;let dx=0,dy=0;if(this.keys.has("arrowleft")||this.keys.has("a"))dx--;if(this.keys.has("arrowright")||this.keys.has("d"))dx++;if(this.keys.has("arrowup")||this.keys.has("w"))dy--;if(this.keys.has("arrowdown")||this.keys.has("s"))dy++;if(dx&&dy){dx*=Math.SQRT1_2;dy*=Math.SQRT1_2;}p.x=Math.max(38,Math.min(W-38,p.x+dx*SPEED*dt));p.y=Math.max(78,Math.min(H-52,p.y+dy*SPEED*dt));if(dx)p.facing=Math.sign(dx);p.bob+=dt*5;this.oxygen=Math.max(0,this.oxygen-dt*2.5);if(this.oxygen<=0){this.surface(true);return;}this.fish.forEach(f=>{f.phase+=dt*2;f.x+=f.direction*f.speed*dt;f.y+=Math.sin(f.phase)*8*dt;if(f.x<45||f.x>W-45)f.direction*=-1;});this.nearbyFish=this.fish.filter(f=>!f.caught).map(f=>({fish:f,d:Math.hypot(f.x-p.x,f.y-p.y)})).filter(o=>o.d<68).sort((a,b)=>a.d-b.d)[0]?.fish??null;this.updateHud();}
tryCatch(){if(this.catch.length>=MAX_CATCH){this.callbacks.onMessage?.("Your basket is full! Return to the surface.");return;}if(!this.nearbyFish){this.callbacks.onMessage?.("Swim closer to a fish!");return;}const f=this.nearbyFish;f.caught=true;this.catch.push(f);this.callbacks.onMessage?.(`Caught a ${f.name}! +${f.value} coins`);this.updateHud();if(this.catch.length>=MAX_CATCH)this.callbacks.onStatus?.("Basket full — surface to finish");}
surface(forced=false){if(!this.running)return;this.running=false;this.keys.clear();const earned=this.catch.reduce((s,f)=>s+f.value,0);this.coins+=earned;this.bestCatch=Math.max(this.bestCatch,this.catch.length);writeNumber("nexus-coins",this.coins);writeNumber("nexus-best-catch",this.bestCatch);this.callbacks.onEnd?.({count:this.catch.length,earned,forced,fish:[...this.catch]});this.updateHud();}
updateHud(){this.callbacks.onHud?.({oxygen:Math.ceil(this.oxygen),count:this.catch.length,capacity:MAX_CATCH,coins:this.coins,nearby:this.nearbyFish?.name??null});}
render(){this.renderer.render(this);}

}