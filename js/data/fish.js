export const FISH_SPECIES=[
{id:"sardine",name:"Sardine",value:4,rarity:"common",color:"#9bc9c8",size:22,speed:34},
{id:"clownfish",name:"Clownfish",value:7,rarity:"common",color:"#f29a61",size:25,speed:27},
{id:"blue-tang",name:"Blue Tang",value:10,rarity:"uncommon",color:"#68aee0",size:27,speed:40},
{id:"pufferfish",name:"Pufferfish",value:15,rarity:"rare",color:"#e7cf83",size:29,speed:19},
{id:"moonfish",name:"Moonfish",value:22,rarity:"rare",color:"#c3b4e7",size:30,speed:24}
];
export function createFish(species,x,y){return {...species,x,y,direction:Math.random()>.5?1:-1,phase:Math.random()*Math.PI*2,caught:false};}
export function createSchool(width,height,count=17){return Array.from({length:count},(_,i)=>createFish(FISH_SPECIES[i%FISH_SPECIES.length],100+Math.random()*(width-160),110+Math.random()*(height-190)));}