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

## First integrated asset pack (V0.3)

- `assets/sprites/diver.svg`: initial diver sprite, with a transparent background and crisp pixel edges.
- `assets/sprites/fish.svg`: five species arranged in a horizontal 32 × 32 frame grid, matching the species order in `js/data/fish.js`.
- The Canvas renderer loads these assets asynchronously and retains its procedural drawing as a fallback while assets load or if loading fails.

This is a foundational placeholder pack, not the final animation set. Distinct swim, catch and directional frames remain scheduled for the next visual pass.

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
