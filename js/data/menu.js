export const RESTAURANT_MENU = [
  { id: "nigiri-sardine", name: "Nigiri Zen", category: "sushi", price: 18, fishId: "sardine", description: "Sardinha fresca, arroz e nori", prepSeconds: 3.2, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.4 }, { station: "sushi", label: "Finalizar nigiri", seconds: 1.8 }] },
  { id: "nigiri-clownfish", name: "Nigiri Aurora", category: "sushi", price: 24, fishId: "clownfish", description: "Peixe-palhaço e arroz temperado", prepSeconds: 3.8, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.5 }, { station: "sushi", label: "Finalizar nigiri", seconds: 2.3 }] },
  { id: "nigiri-blue-tang", name: "Nigiri Neon", category: "sushi", price: 30, fishId: "blue-tang", description: "Blue tang e toque cítrico", prepSeconds: 4.2, recipe: [{ station: "rice", label: "Modelar arroz", seconds: 1.6 }, { station: "sushi", label: "Cortar e finalizar", seconds: 2.6 }] },
  { id: "matcha", name: "Matcha Sereno", category: "tea", price: 12, teaId: "matcha", description: "Chá verde japonês, preparado na hora", prepSeconds: 2.4, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.1 }, { station: "tea", label: "Infusionar matcha", seconds: 1.3 }] },
  { id: "hojicha", name: "Hojicha Noturno", category: "tea", price: 14, teaId: "hojicha", description: "Chá tostado, aroma acolhedor", prepSeconds: 2.8, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.2 }, { station: "tea", label: "Preparar hojicha", seconds: 1.6 }] },
  { id: "lotus-tea", name: "Chá Lótus", category: "tea", price: 18, teaId: "lotus", description: "Infusão floral da casa", prepSeconds: 3.4, recipe: [{ station: "kettle", label: "Aquecer água", seconds: 1.4 }, { station: "tea", label: "Infusionar lótus", seconds: 2.0 }] }
];

export const TEA_STOCK_START = { matcha: 5, hojicha: 5, lotus: 3 };
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
  { name: "Daichi", favorites: ["hojicha", "nigiri-sardine"], patience: 35 }
];

export const KITCHEN_STATIONS = [
  { id: "rice", name: "Estação de arroz", icon: "🍚", category: "sushi" },
  { id: "sushi", name: "Bancada de sushi", icon: "🍣", category: "sushi" },
  { id: "kettle", name: "Chaleira", icon: "♨️", category: "tea" },
  { id: "tea", name: "Mesa de chá", icon: "🍵", category: "tea" }
];
