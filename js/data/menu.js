export const RESTAURANT_MENU = [
  { id: "nigiri-sardine", name: "Nigiri Zen", category: "sushi", price: 18, fishId: "sardine", description: "Sardinha fresca, arroz e nori", prepSeconds: 3.2 },
  { id: "nigiri-clownfish", name: "Nigiri Aurora", category: "sushi", price: 24, fishId: "clownfish", description: "Peixe-palhaço e arroz temperado", prepSeconds: 3.8 },
  { id: "nigiri-blue-tang", name: "Nigiri Neon", category: "sushi", price: 30, fishId: "blue-tang", description: "Blue tang e toque cítrico", prepSeconds: 4.2 },
  { id: "matcha", name: "Matcha Sereno", category: "tea", price: 12, teaId: "matcha", description: "Chá verde japonês, preparado na hora", prepSeconds: 2.4 },
  { id: "hojicha", name: "Hojicha Noturno", category: "tea", price: 14, teaId: "hojicha", description: "Chá tostado, aroma acolhedor", prepSeconds: 2.8 },
  { id: "lotus-tea", name: "Chá Lótus", category: "tea", price: 18, teaId: "lotus", description: "Infusão floral da casa", prepSeconds: 3.4 }
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
