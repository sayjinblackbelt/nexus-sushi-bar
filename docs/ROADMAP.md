# Nexus Sushi Bar — Development Roadmap

## Product vision

A cozy pixel-art simulation built around two complementary rhythms:

- **Day:** dive, explore, catch fish and collect ingredients.
- **Night:** prepare sushi, serve customers, earn coins and improve the restaurant.

Balanced difficulty means light resource management and meaningful progression, not punishing failure. The first release target is a complete, repeatable day/night loop.

## Development principles

1. Stabilize the foundation before expanding content.
2. Keep gameplay systems modular and dependency-light.
3. Support keyboard, touch, portrait and landscape layouts.
4. Preserve player progress with versioned, resilient saves.
5. Make each milestone playable and testable before moving on.
6. Prefer original art assets and consistent visual language.
7. Do not claim a release milestone complete until acceptance criteria pass on desktop and mobile.

## Version plan

### V0.1 — Playable underwater prototype
- Canvas scene, diver, five fish species.
- Four-direction movement, proximity catch, oxygen and surface return.
- Eight-slot catch basket and local coin persistence.

### V0.2 — Technical foundation (in progress)
- Dedicated input controller for keyboard and touch.
- Multi-pointer touch movement and pointer-capture cleanup.
- Responsive portrait and landscape layouts.
- Safe persistence abstraction with memory fallback.
- Encapsulated dive reset lifecycle.
- Basic lifecycle and edge-case hardening.

### V0.3 — Game architecture
- Separate game state, world simulation, rendering and UI responsibilities.
- Centralized configuration and data definitions.
- Deterministic test hooks and lightweight automated checks.
- Consistent error handling and save schema.

### V0.4 — Performance and accessibility
- Frame timing and visibility lifecycle review.
- Canvas scaling and device pixel ratio handling.
- Reduced-motion option, readable contrast and accessible controls.
- Mobile browser QA and input edge-case coverage.

### V0.5 — Technical beta
- Save migration/versioning.
- Settings and control preferences.
- Debug overlay and structured diagnostics.
- Stable release candidate for visual production.

### V0.6–V0.9 — Visual production
- Original diver and fish sprite sheets.
- Directional movement and swim/catch animations.
- Layered ocean environments and parallax.
- Biome-specific art, particles, lighting and transitions.
- Cohesive interface, icons, typography and visual feedback.

### V1.0 — Visual and interaction baseline
- Finalized underwater presentation.
- Tutorial, feedback and accessibility pass.
- Consistent controls and mobile polish.
- Art pipeline documented and reusable.

### V1.1–V1.3 — Fishing and progression
- Fish behavior, rarity, habitat and spawn rules.
- Inventory, ingredient quality and catch records.
- Equipment upgrades, oxygen capacity and basket expansion.
- Currency economy, unlocks and exploration objectives.

### V1.4–V1.6 — Sushi restaurant
- Day-to-night transition and restaurant scene.
- Recipe catalog and ingredient requirements.
- Customer queue, preferences, patience and orders.
- Sushi preparation, serving, revenue and reputation.
- Restaurant upgrades and daily performance summary.

### V1.7–V1.9 — Content, balance and polish
- Additional ocean biomes and species.
- More recipes, customer archetypes and restaurant upgrades.
- Audio ambience, music and sound effects.
- Economy and difficulty balancing.
- Save integrity, regression testing and mobile QA.

### V2.0 — Complete core experience
A stable, integrated game loop:
1. Start a day and choose a dive.
2. Explore and catch ingredients.
3. Return to the surface and manage resources.
4. Open the restaurant and fulfill customer orders.
5. Earn revenue, improve equipment and restaurant.
6. Unlock new content and repeat with meaningful progression.

## Current acceptance criteria

### V0.2
- Keyboard controls continue to work.
- Touch controls work in portrait and landscape.
- Simultaneous directional touches move diagonally.
- Releasing, cancelling or interrupting a touch does not leave movement stuck.
- Storage failures do not crash the game.
- Restarting a dive resets transient state without erasing saved coins.
- No external framework is required.

## Release gates

A milestone is complete only after:
- Code and data paths are reviewed.
- No obvious syntax or import errors remain.
- Core acceptance criteria pass.
- GitHub Pages is checked on a real browser.
- Known limitations are documented.
