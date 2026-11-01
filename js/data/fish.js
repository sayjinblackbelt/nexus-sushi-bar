import { getBiome } from "./biomes.js";
export const FISH_SPECIES=[
{id:"sardine",name:"Sardine",value:4,rarity:"common",biomes:["lagoon"],color:"#9bc9c8",size:22,speed:34},
{id:"clownfish",name:"Clownfish",value:7,rarity:"common",biomes:["lagoon","reef"],color:"#f29a61",size:25,speed:27},
{id:"blue-tang",name:"Blue Tang",value:10,rarity:"uncommon",biomes:["lagoon","reef"],color:"#68aee0",size:27,speed:40},
{id:"pufferfish",name:"Pufferfish",value:15,rarity:"rare",biomes:["lagoon","reef"],color:"#e7cf83",size:29,speed:19},
{id:"moonfish",name:"Moonfish",value:22,rarity:"rare",biomes:["reef","abyss"],color:"#c3b4e7",size:30,speed:24,unlockLevel:3},
{id:"lanternfish",name:"Lanternfish",value:30,rarity:"epic",biomes:["reef","abyss"],color:"#70e8dc",size:25,speed:46,unlockLevel:4},
{id:"koi-ray",name:"Koi Ray",value:42,rarity:"legendary",biomes:["abyss"],color:"#ff9acb",size:34,speed:31,unlockLevel:5}
];
export function createFish(species,x,y){return {...species,x,y,direction:Math.random()>.5?1:-1,phase:Math.random()*Math.PI*2,caught:false};}
export function createSchool(width,height,count=17,level=1,biomeId="lagoon"){const unlocked=FISH_SPECIES.filter(species=>(species.unlockLevel||1)<=level&&species.biomes.includes(getBiome(biomeId).id));const pool=unlocked.length?unlocked:[FISH_SPECIES[0]];return Array.from({length:count},(_,i)=>createFish(pool[i%pool.length],100+Math.random()*(width-160),110+Math.random()*(height-190)));}