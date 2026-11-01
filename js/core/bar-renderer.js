const W=960,H=540;
export class BarRenderer {
  constructor(context,width,height){this.ctx=context;this.width=width;this.height=height;}
  render(state,elapsed=0){
    const c=this.ctx;c.clearRect(0,0,W,H);
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,"#11152f");bg.addColorStop(.58,"#20183b");bg.addColorStop(1,"#090d22");c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Neon city windows behind the tea bar.
    for(let x=18;x<W;x+=54){c.fillStyle=x%3?"#20264a":"#2c214e";c.fillRect(x,55,34,190);for(let y=70;y<225;y+=34){c.fillStyle=(x+y)%4?"rgba(55,230,224,.22)":"rgba(255,79,163,.24)";c.fillRect(x+7,y,7,13);c.fillRect(x+21,y,7,13);}}
    c.fillStyle="#090d22";c.fillRect(0,250,W,290);
    // Bamboo and bonsai silhouettes.
    for(let x=35;x<145;x+=28){c.strokeStyle="#65c18c";c.lineWidth=5;c.beginPath();c.moveTo(x,310);c.quadraticCurveTo(x+Math.sin(elapsed+x)*7,230,x-3,155);c.stroke();for(let y=190;y<290;y+=32){c.fillStyle="#65c18c";c.fillRect(x-15,y,13,5);c.fillRect(x+2,y-10,13,5);}}
    // Counter, warm wood and illuminated edge.
    c.fillStyle="#34213d";c.fillRect(0,355,W,185);c.fillStyle="#75405a";c.fillRect(0,352,W,18);c.fillStyle="#ff4fa3";c.fillRect(0,350,W,3);c.fillStyle="#1b1734";c.fillRect(0,372,W,168);
    for(let x=25;x<W;x+=105){c.fillStyle="#4c2b4a";c.fillRect(x,390,5,150);c.fillStyle="#9b5de5";c.fillRect(x+10,400,2,130);}
    // Back counter and shelves.
    c.fillStyle="#302044";c.fillRect(180,210,600,140);c.fillStyle="#ffb86b";c.fillRect(180,210,600,5);c.fillStyle="#513051";c.fillRect(195,225,570,112);
    for(let x=215;x<755;x+=68){c.fillStyle="#37e6e0";c.fillRect(x,239,3,58);c.fillStyle="#ff4fa3";c.fillRect(x+35,248,3,46);}
    // Central neon lotus mark: botanical brand motif, not a religious icon.
    c.save();c.translate(480,132);c.shadowBlur=18;c.shadowColor="#ff4fa3";c.strokeStyle="#ff4fa3";c.lineWidth=4;
    for(let i=-2;i<=2;i++){c.beginPath();c.ellipse(i*15,-Math.abs(i)*5,11,34,i*.25,0,Math.PI*2);c.stroke();}
    c.beginPath();c.moveTo(-48,30);c.quadraticCurveTo(0,54,48,30);c.stroke();c.restore();
    // Sign.
    c.strokeStyle="#37e6e0";c.lineWidth=3;c.strokeRect(345,35,270,58);c.shadowColor="#37e6e0";c.shadowBlur=12;c.fillStyle="#eafcff";c.font="bold 27px monospace";c.textAlign="center";c.fillText("NEXUS  茶 BAR",480,73);c.shadowBlur=0;
    // Lanterns.
    for(const x of [105,270,690,855]){c.fillStyle="#ffb86b";c.fillRect(x-2,88,4,25);c.fillStyle="#a94e68";c.fillRect(x-16,112,32,55);c.fillStyle="#ffb86b";c.fillRect(x-12,118,24,43);c.fillStyle="rgba(255,184,107,.18)";c.beginPath();c.arc(x,140,42,0,Math.PI*2);c.fill();}
    // Tea cups and sushi display.
    for(let x=250;x<730;x+=95){c.fillStyle="#f4e8cc";c.fillRect(x,320,35,20);c.fillStyle="#37e6e0";c.fillRect(x+4,324,27,10);c.fillStyle="rgba(244,232,204,.6)";c.fillRect(x+13,303+Math.sin(elapsed*2+x)*2,3,13);}
    for(let x=285;x<700;x+=82){c.fillStyle="#f4e8cc";c.fillRect(x,285,38,17);c.fillStyle="#e98c65";c.fillRect(x+7,278,24,9);c.fillStyle="#1d263f";c.fillRect(x+13,279,11,7);}
    // Customer silhouettes at the counter.
    const customerColors=["#244c72","#7d3e75","#356a63","#a05d45"];
    customerColors.forEach((color,i)=>{const x=265+i*145;c.fillStyle="#11162c";c.fillRect(x-24,305,48,53);c.fillStyle=color;c.fillRect(x-20,319,40,36);c.fillStyle="#e7c7a1";c.fillRect(x-13,284,27,27);c.fillStyle="#11162c";c.fillRect(x-13,282,28,9);c.fillStyle="#37e6e0";c.fillRect(x-7,294,5,3);c.fillRect(x+5,294,5,3);});
    // Floor reflection and calm water-garden accent.
    c.fillStyle="rgba(55,230,224,.13)";c.fillRect(0,530,W,3);c.fillStyle="#65c18c";c.fillRect(28,345,5,18);c.fillRect(20,350,20,3);
  }
}
