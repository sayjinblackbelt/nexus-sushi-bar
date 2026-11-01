# Art Direction — Nexus Sushi Bar

## Overall visual identity

Pixel art with readable silhouettes and expressive environments. The game moves between a luminous, tranquil underwater world by day and a cozy Zen refuge in a cyberpunk city by night.

## Underwater palette

- Deep ocean: #102F46
- Ocean teal: #176B72
- Reef teal: #43A6A0
- Warm sand: #F2C078
- Cream: #F4E8CC
- Coral accent: #E98C65

## Restaurant palette — Zen Cyberpunk

- Midnight ink: #090D22
- Deep indigo: #171B3D
- Neon cyan: #37E6E0
- Neon magenta: #FF4FA3
- Violet: #9B5DE5
- Lantern amber: #FFB86B
- Bamboo jade: #65C18C
- Warm rice: #F4E8CC

## Restaurant visual language

Cyberpunk uses restrained neon signs, holographic menu panels, luminous reflections and a night skyline. Zen uses wood, bamboo, stone, bonsai, water, warm lanterns, tea ceremony and calm geometry. Food presentation is precise, with ceramic cups, steam and preparation feedback.

The Buddhist-inspired theme communicates mindfulness, balance, compassion and intentional hospitality. Sacred figures, mantras and religious symbols are not used as generic decoration.

## Sprite standards

Transparent backgrounds where practical, crisp pixel edges, consistent light direction, strong silhouettes at small sizes, no baked-in labels or UI, and consistent frame spacing.

## Integrated underwater sprite pack

- assets/sprites/diver.svg: 192 × 144 sheet; 48 × 48 frames, four columns and three rows (idle, swim, catch).
- assets/sprites/fish.svg: 160 × 64 sheet; 32 × 32 frames, five species columns and two animation rows.
- Renderer animates frames based on elapsed time and player state.
- Procedural fallback remains available while assets load or if loading fails.

## Restaurant scene

The first Canvas scene uses a neon city backdrop, botanical lotus motif, warm counter, bamboo, lanterns, sushi display and guest silhouettes. This is a procedural visual foundation; dedicated sprites and layered background art remain planned.
