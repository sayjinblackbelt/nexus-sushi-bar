const W=960,H=540;
export class OceanRenderer {
  constructor(context, width, height) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.assets = { diver: new Image(), fish: new Image() };
    this.assets.diver.src = "./assets/sprites/diver.svg";
    this.assets.fish.src = "./assets/sprites/fish.svg";
  }

  render(game) {
    const c = this.ctx;
    c.clearRect(0, 0, this.width, this.height);
    this.drawOcean(c);
    this.drawDecor(c, game.elapsed);
    game.fish.forEach(f => { if (!f.caught) this.drawFish(c, f, game.elapsed); });
    this.drawParticles(c, game.particles);
    this.drawPlayer(c, game.player, game.elapsed);
    if (game.nearbyFish && game.running) this.drawPrompt(c, game.player);
    this.drawSurfaceHint(c);
  }

  drawOcean(c){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,"#3197a0");g.addColorStop(.38,"#176b83");g.addColorStop(1,"#102f54");c.fillStyle=g;c.fillRect(0,0,W,H);for(let i=0;i<9;i++){const x=(i*137+40)%W;c.fillStyle="rgba(190,245,226,.07)";c.beginPath();c.moveTo(x,0);c.lineTo(x+35,0);c.lineTo(x+180,H);c.lineTo(x+125,H);c.fill();}c.fillStyle="#d6c58e";c.fillRect(0,H-28,W,28);c.fillStyle="#b4a875";for(let x=0;x<W;x+=24)c.fillRect(x,H-28+(x%3)*3,12,3);}
  drawDecor(c,elapsed){for(let i=0;i<12;i++){const x=(i*89+30)%W,y=90+(i*67)%340;c.fillStyle="rgba(214,250,235,.28)";c.fillRect(x,y+Math.sin(elapsed+i)*10,5,5);}for(let x=35;x<W;x+=170){c.fillStyle="#347e69";c.fillRect(x,H-68,8,40);c.fillRect(x+9,H-78,7,50);c.fillRect(x-7,H-58,7,30);c.fillStyle="#57a77d";c.fillRect(x-4,H-65,7,8);c.fillRect(x+12,H-84,7,8);}for(let x=120;x<W;x+=310){c.fillStyle="#e98c65";c.fillRect(x,H-53,8,25);c.fillRect(x-9,H-65,8,15);c.fillRect(x+8,H-72,8,22);c.fillStyle="#f2b17e";c.fillRect(x-10,H-69,9,5);c.fillRect(x+7,H-76,9,5);}for(let i=0;i<18;i++){const x=(i*59+20)%W,y=H-((elapsed*28+i*37)%H);c.strokeStyle="rgba(190,244,235,.35)";c.strokeRect(x,y,5,5);}}
  drawFish(c,f,elapsed){const index=["sardine","clownfish","blue-tang","pufferfish","moonfish"].indexOf(f.id);if(this.assets.fish.complete&&this.assets.fish.naturalWidth&&index>=0){const frame=Math.floor(elapsed*5+f.phase)%2;c.save();c.translate(Math.round(f.x),Math.round(f.y));c.scale(f.direction,1);const scale=f.size/24;c.drawImage(this.assets.fish,index*32,frame*32,32,32,-16*scale,-16*scale,32*scale,32*scale);c.restore();return;}c.save();c.translate(Math.round(f.x),Math.round(f.y));c.scale(f.direction,1);c.scale(f.size/24,f.size/24);c.fillStyle=f.color;c.fillRect(-11,-6,19,13);c.fillRect(-7,-9,11,3);c.fillRect(-7,7,11,3);c.fillRect(8,-3,8,7);c.fillStyle="#f4e8cc";c.fillRect(-3,-3,4,4);c.fillStyle="#17364a";c.fillRect(-2,-2,2,2);if(f.id==="clownfish"){c.fillStyle="#fff0d4";c.fillRect(1,-6,3,13);}if(f.id==="pufferfish"){c.fillRect(-13,-9,3,3);c.fillRect(8,-9,3,3);}c.restore();}
  drawPlayer(c,player,elapsed=0){const p=player;if(this.assets.diver.complete&&this.assets.diver.naturalWidth){const row=p.catchTimer>0?2:(p.moving?1:0);const frame=p.catchTimer>0?Math.min(3,Math.floor((.48-p.catchTimer)/.12)):Math.floor(elapsed*(p.moving?10:3))%4;c.save();c.translate(Math.round(p.x),Math.round(p.y+Math.sin(p.bob)*2));c.scale(p.facing,1);c.drawImage(this.assets.diver,frame*48,row*48,48,48,-24,-24,48,48);c.restore();return;}c.save();c.translate(Math.round(p.x),Math.round(p.y+Math.sin(p.bob)*2));c.scale(p.facing,1);c.fillStyle="#e98c65";c.fillRect(-18,4,10,7);c.fillStyle="#e8c78f";c.fillRect(-8,-9,17,19);c.fillStyle="#f4e8cc";c.fillRect(0,-14,13,13);c.fillStyle="#74c6c4";c.fillRect(5,-11,8,7);c.fillStyle="#24485b";c.fillRect(9,-9,2,2);c.fillStyle="#e98c65";c.fillRect(-5,9,7,9);c.fillRect(7,9,7,9);c.fillStyle="#f4e8cc";c.fillRect(-7,17,10,4);c.fillRect(6,17,10,4);c.fillStyle="#5b9d9a";c.fillRect(-12,-5,5,12);c.restore();}
  drawPrompt(c,player){c.fillStyle="#102f46";c.fillRect(player.x-58,player.y-49,116,22);c.fillStyle="#f4e8cc";c.font="bold 12px monospace";c.textAlign="center";c.fillText("E  CATCH FISH",player.x,player.y-34);}
  drawParticles(c,particles=[]){for(const p of particles){const alpha=Math.max(0,p.life/(p.maxLife||.7));c.globalAlpha=alpha;c.fillStyle="#b9f5ed";c.fillRect(Math.round(p.x),Math.round(p.y),4,4);}c.globalAlpha=1;}
  drawSurfaceHint(c){c.fillStyle="rgba(8,35,51,.35)";c.fillRect(0,0,W,38);c.fillStyle="#d3eee0";c.font="11px monospace";c.textAlign="left";c.fillText("↓ BLUE LAGOON",18,24);c.textAlign="right";c.fillText("DEPTH  ·  12 M",W-18,24);}
}
