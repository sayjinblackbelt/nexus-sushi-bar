# Art Direction — Nexus Sushi Bar

## Visual identity

Cozy 16-bit pixel art with readable silhouettes, warm highlights and calm underwater colors. The world should feel inviting and handcrafted rather than realistic or high-contrast.

## Core palette

- Deep ocean: #102F46
- Ocean teal: #176B72
- Reef teal: #43A6A0
- Warm sand: #F2C078
- Cream: #F4E8CC
- Coral accent: #E98C65

## Sprite standards

- Transparent PNG assets where practical.
- Pixel-art edges; no anti-aliased vector-like outlines.
- Consistent top-left light source and restrained shadow palette.
- Strong silhouette at small display sizes.
- Avoid baked-in labels, UI, captions or backgrounds in character sprites.
- Keep sprite dimensions and frame spacing consistent within each sheet.

## Asset production sequence

1. Diver: idle, swim directions, catch action.
2. Fish: five starter species with distinct silhouettes and color patterns.
3. Underwater environment: seabed, rocks, seaweed, coral, bubbles and light shafts.
4. Restaurant: counter, sushi preparation station, tables and warm interior props.
5. Food: sushi pieces, plates and ingredients.
6. Customers: a small set of readable silhouettes and simple expressions.

## Integration rules

- Keep original source images in assets/source.
- Export runtime-ready sprites to assets/sprites.
- Use a documented frame grid and avoid manual per-frame offsets where possible.
- Keep game logic independent from asset file paths; renderers consume asset definitions.
- Provide Canvas-drawn fallbacks until each asset is integrated and verified.
