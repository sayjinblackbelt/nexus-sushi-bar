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
    this.elapsed = game.elapsed;
    const c = this.ctx;
    c.clearRect(0, 0, this.width, this.height);
    this.drawOcean(c);
    this.drawDecor(c, game.elapsed);
    game.fish.forEach(f => { if (!f.caught) this.drawFish(c, f, game.elapsed); });
    this.drawParticles(c, game.particles);
    this.drawPlayer(c, game.player, game.elapsed, game.character);
    if (game.nearbyFish && game.running) this.drawPrompt(c, game.player);
    this.drawSurfaceHint(c);
  }

  drawOcean(c){
    const g=c.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#55b7b5");g.addColorStop(.2,"#217f91");g.addColorStop(.58,"#14536f");g.addColorStop(1,"#0b2947");
    c.fillStyle=g;c.fillRect(0,0,W,H);
    const glow=c.createRadialGradient(W*.52,0,5,W*.52,0,430);
    glow.addColorStop(0,"rgba(190,255,225,.25)");glow.addColorStop(1,"rgba(30,130,160,0)");
    c.fillStyle=glow;c.fillRect(0,0,W,H);
    c.fillStyle="rgba(193,246,220,.075)";
    for(let i=0;i<11;i++){const x=(i*113+((this.elapsed||0)*5)%160)%W;c.beginPath();c.moveTo(x,0);c.lineTo(x+22,0);c.lineTo(x+210,H);c.lineTo(x+158,H);c.fill();}
    c.fillStyle="#174d60";c.fillRect(0,H-38,W,38);
    c.fillStyle="#d6c58e";c.fillRect(0,H-25,W,25);
    c.fillStyle="#b4a875";for(let x=0;x<W;x+=24)c.fillRect(x,H-25+(x%3)*3,12,3);
  }
  drawDecor(c,elapsed){
    // Distant rock shelves establish depth without obscuring the playfield.
    for(let i=0;i<5;i++){const x=i*220-30;c.fillStyle="#174e65";c.fillRect(x,190+(i%2)*34,125,15);c.fillStyle="#27768a";c.fillRect(x+8,184+(i%2)*34,104,8);}
    // Seaweed and coral silhouettes, with a slow current animation.
    for(let x=25;x<W;x+=150){
      const sway=Math.sin(elapsed*1.3+x)*5;
      c.fillStyle="#267d75";c.fillRect(x+sway,H-83,7,55);c.fillRect(x+10-sway,H-72,6,44);c.fillRect(x-8+sway,H-62,6,34);
      c.fillStyle="#54b18a";c.fillRect(x+sway-3,H-87,9,7);c.fillRect(x+10-sway,H-78,8,7);
    }
    for(let x=105;x<W;x+=280){
      const sway=Math.sin(elapsed+x)*3;
      c.fillStyle="#d65f83";c.fillRect(x+sway,H-56,8,31);c.fillRect(x-9+sway,H-69,8,15);c.fillRect(x+8+sway,H-77,8,21);
      c.fillStyle="#f19b9b";c.fillRect(x-10+sway,H-72,9,5);c.fillRect(x+7+sway,H-80,9,5);
    }
    // Ambient bubbles at varied depths.
    for(let i=0;i<22;i++){
      const x=(i*59+20+Math.sin(elapsed*.4+i)*8)%W;
      const y=H-((elapsed*23+i*37)%(H+20));
      const size=2+(i%3);
      c.strokeStyle="rgba(190,244,235,.42)";c.strokeRect(Math.round(x),Math.round(y),size,size);
    }
    // Subtle caustic glints near the surface.
    c.fillStyle="rgba(210,255,231,.16)";
    for(let i=0;i<12;i++){const x=(i*91+elapsed*12)%W;c.fillRect(x,42+Math.sin(elapsed+i)*5,18,2);}
  }
  drawFish(c,f,elapsed){const index=["sardine","clownfish","blue-tang","pufferfish","moonfish"].indexOf(f.id);if(this.assets.fish.complete&&this.assets.fish.naturalWidth&&index>=0){const frame=Math.floor(elapsed*5+f.phase)%2;c.save();c.translate(Math.round(f.x),Math.round(f.y));c.scale(f.direction,1);const scale=f.size/24;c.drawImage(this.assets.fish,index*32,frame*32,32,32,-16*scale,-16*scale,32*scale,32*scale);c.restore();return;}c.save();c.translate(Math.round(f.x),Math.round(f.y));c.scale(f.direction,1);c.scale(f.size/24,f.size/24);c.fillStyle=f.color;c.fillRect(-11,-6,19,13);c.fillRect(-7,-9,11,3);c.fillRect(-7,7,11,3);c.fillRect(8,-3,8,7);c.fillStyle="#f4e8cc";c.fillRect(-3,-3,4,4);c.fillStyle="#17364a";c.fillRect(-2,-2,2,2);if(f.id==="clownfish"){c.fillStyle="#fff0d4";c.fillRect(1,-6,3,13);}if(f.id==="pufferfish"){c.fillRect(-13,-9,3,3);c.fillRect(8,-9,3,3);}c.restore();}
  drawPlayer(c,player,elapsed=0,character="kai"){const p=player;if(this.assets.diver.complete&&this.assets.diver.naturalWidth){const row=p.catchTimer>0?2:(p.moving?1:0);const frame=p.catchTimer>0?Math.min(3,Math.floor((.48-p.catchTimer)/.12)):Math.floor(elapsed*(p.moving?10:3))%4;c.save();c.translate(Math.round(p.x),Math.round(p.y+Math.sin(p.bob)*2));c.scale(p.facing,1);c.drawImage(this.assets.diver,frame*48,row*48,48,48,-24,-24,48,48);if(character==="yuna"){c.fillStyle="#ff4fa3";c.fillRect(-9,-22,13,4);c.fillRect(9,-17,4,8);c.fillStyle="#ffb86b";c.fillRect(-5,-21,4,2);}else{c.fillStyle="#37e6e0";c.fillRect(-8,-22,14,3);c.fillStyle="#f4e8cc";c.fillRect(5,-21,3,2);}c.restore();return;}c.save();c.translate(Math.round(p.x),Math.round(p.y+Math.sin(p.bob)*2));c.scale(p.facing,1);c.fillStyle="#e98c65";c.fillRect(-18,4,10,7);c.fillStyle="#e8c78f";c.fillRect(-8,-9,17,19);c.fillStyle="#f4e8cc";c.fillRect(0,-14,13,13);c.fillStyle="#74c6c4";c.fillRect(5,-11,8,7);c.fillStyle="#24485b";c.fillRect(9,-9,2,2);c.fillStyle="#e98c65";c.fillRect(-5,9,7,9);c.fillRect(7,9,7,9);c.fillStyle="#f4e8cc";c.fillRect(-7,17,10,4);c.fillRect(6,17,10,4);c.fillStyle="#5b9d9a";c.fillRect(-12,-5,5,12);c.restore();}
  drawPrompt(c,player){c.fillStyle="#102f46";c.fillRect(player.x-76,player.y-49,152,22);c.fillStyle="#f4e8cc";c.font="bold 12px monospace";c.textAlign="center";c.fillText("E  CAPTURAR PEIXE",player.x,player.y-34);}
  drawParticles(c,particles=[]){for(const p of particles){const alpha=Math.max(0,p.life/(p.maxLife||.7));c.globalAlpha=alpha;c.fillStyle="#b9f5ed";c.fillRect(Math.round(p.x),Math.round(p.y),4,4);}c.globalAlpha=1;}
  drawSurfaceHint(c){c.fillStyle="rgba(8,35,51,.35)";c.fillRect(0,0,W,38);c.fillStyle="#d3eee0";c.font="11px monospace";c.textAlign="left";c.fillText("↓ LAGOA AZUL",18,24);c.textAlign="right";c.fillText("PROFUNDIDADE  ·  12 M",W-18,24);}
}
