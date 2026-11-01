export const RESTAURANT_MENU = [
  { id: "nigiri-sardine", name: "Nigiri Zen", category: "sushi", price: 18, fishId: "sardine", description: "Sardinha fresca, arroz e nori", prepSeconds: 3.2, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.4 }, { station: "sushi", label: "Finalizar nigiri", seconds: 1.8 }] },
  { id: "nigiri-clownfish", name: "Nigiri Aurora", category: "sushi", price: 24, fishId: "clownfish", description: "Peixe-palhaço e arroz temperado", prepSeconds: 3.8, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.5 }, { station: "sushi", label: "Finalizar nigiri", seconds: 2.3 }] },
  { id: "nigiri-blue-tang", name: "Nigiri Neon", category: "sushi", price: 30, fishId: "blue-tang", description: "Blue tang e toque cítrico", prepSeconds: 4.2, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.6 }, { station: "sushi", label: "Cortar e finalizar", seconds: 2.6 }] },
  { id: "matcha", name: "Matcha Sereno", category: "tea", price: 12, teaId: "matcha", description: "Chá verde japonês, preparado na hora", prepSeconds: 2.4, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.1 }, { station: "tea", label: "Infusionar matcha", seconds: 1.3 }] },
  { id: "hojicha", name: "Hojicha Noturno", category: "tea", price: 14, teaId: "hojicha", description: "Chá tostado, aroma acolhedor", prepSeconds: 2.8, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.2 }, { station: "tea", label: "Preparar hojicha", seconds: 1.6 }] },
  { id: "lotus-tea", name: "Chá Lótus", category: "tea", price: 18, teaId: "lotus", description: "Infusão floral da casa", prepSeconds: 3.4, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.4 }, { station: "tea", label: "Infusionar lótus", seconds: 2.0 }] },
  { id: "puffer-tempura", name: "Tempurá Neon", category: "sushi", price: 32, fishId: "pufferfish", description: "Baiacu crocante e toque cítrico", prepSeconds: 4.8, recipe: [{ station: "rice", label: "Preparar base de arroz", seconds: 1.5 }, { station: "sushi", label: "Fritar e montar tempurá", seconds: 3.3 }] },
  { id: "moonfish-sashimi", name: "Sashimi Lunar", category: "sushi", price: 36, fishId: "moonfish", description: "Lâminas delicadas de moonfish", prepSeconds: 4.2, recipe: [{ station: "sushi", label: "Cortar sashimi", seconds: 2.6 }, { station: "sushi", label: "Finalizar apresentação", seconds: 1.6 }] },
  { id: "lantern-nigiri", name: "Nigiri Farol", category: "sushi", price: 42, fishId: "lanternfish", description: "Nigiri de peixe-lanterna", prepSeconds: 4.8, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.7 }, { station: "sushi", label: "Finalizar nigiri especial", seconds: 3.1 }] },
  { id: "koi-signature", name: "Koi Imperial", category: "sushi", price: 52, fishId: "koi-ray", description: "Criação lendária da casa", prepSeconds: 5.4, recipe: [{ station: "rice", label: "Modelar arroz premium", seconds: 1.8 }, { station: "sushi", label: "Montagem imperial", seconds: 3.6 }] },
  { id: "genmaicha", name: "Genmaicha Dourado", category: "tea", price: 16, teaId: "genmaicha", description: "Chá verde com arroz tostado", prepSeconds: 3.1, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.3 }, { station: "tea", label: "Infusionar genmaicha", seconds: 1.8 }] },
  { id: "yuzu-tea", name: "Yuzu Cítrico", category: "tea", price: 20, teaId: "yuzu", description: "Infusão cítrica e aromática", prepSeconds: 3.5, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.4 }, { station: "tea", label: "Preparar yuzu", seconds: 2.1 }] }
];

export const TEA_STOCK_START = { matcha: 5, hojicha: 5, lotus: 3, genmaicha: 2, yuzu: 2 };
export const CUSTOMER_NAMES = ["Akira", "Mei", "Ren", "Yuna", "Haru", "Sora", "Aiko", "Takeshi", "Mika", "Daichi", "Emi", "Riku", "Hana", "Kento", "Noa", "Renji", "Akari"];

export const CUSTOMER_PROFILES = [
  { name: "Akira", favorites: ["nigiri-sardine", "hojicha"], patience: 38 },
  { name: "Mei", favorites: ["matcha", "lotus-tea"], patience: 42 },
  { name: "Ren", favorites: ["nigiri-blue-tang", "matcha"], patience: 34 },
  { name: "Yuna", favorites: ["nigiri-clownfish", "lotus-tea"], patience: 40 },
  { name: "Haru", favorites: ["hojicha", "nigiri-sardine"], patience: 36 },
  { name: "Sora", favorites: ["matcha", "nigiri-blue-tang"], patience: 44 },
  { name: "Aiko", favorites: ["lotus-tea", "nigiri-clownfish"], patience: 39 },
  { name: "Takeshi", favorites: ["nigiri-sardine", "nigiri-blue-tang"], patience: 32 },
  { name: "Mika", favorites: ["matcha", "nigiri-clownfish"], patience: 43 },
  { name: "Daichi", favorites: ["hojicha", "nigiri-sardine"], patience: 35 },
  { name: "Kaori", favorites: ["genmaicha", "moonfish-sashimi"], patience: 42 },
  { name: "Ryo", favorites: ["puffer-tempura", "yuzu-tea"], patience: 37 },
  { name: "Hikari", favorites: ["lantern-nigiri", "lotus-tea"], patience: 40 },
  { name: "Masato", favorites: ["koi-signature", "genmaicha"], patience: 46 }
];

export const KITCHEN_STATIONS = [
  { id: "rice", name: "Estação de arroz", icon: "🍚", category: "sushi" },
  { id: "sushi", name: "Bancada de sushi", icon: "🍣", category: "sushi" },
  { id: "kettle", name: "Chaleira", icon: "♨️", category: "tea" },
  { id: "tea", name: "Mesa de chá", icon: "🍵", category: "tea" }
];
