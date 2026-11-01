# Nexus Sushi Bar 🍣

A cozy pixel-art fishing and sushi restaurant simulation game.

Explore the ocean, catch fish and collect ingredients during the day. Return to the surface, prepare sushi and manage a small restaurant at night.

## Current milestone — V0.2 Technical Foundation

The playable prototype is being hardened before the visual and gameplay expansions.

- HTML5 Canvas rendering with native JavaScript ES modules.
- Keyboard and touch input handled by a dedicated controller.
- Responsive mobile layouts in portrait and landscape.
- Pointer capture and multi-direction touch movement.
- Versioned save data with legacy progress migration and an in-memory fallback.
- Centralized dive reset lifecycle.
- No build step or mandatory external dependencies.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / Arrow keys | Direction pad |
| Catch fish | E / Space | CATCH button |
| Return to surface | R | SURFACE button |

## Run locally

Serve the project through a local static web server, then open index.html. Native JavaScript ES modules work best over HTTP rather than opening the file directly.

## Project structure

    nexus-sushi-bar/
    ├── index.html
    ├── README.md
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   ├── game.js
    │   ├── core/
    │   │   ├── canvas.js
    │   │   ├── input.js
    │   │   ├── renderer.js
    │   │   └── storage.js
    │   └── data/
    │       └── fish.js
    └── docs/
        ├── ARCHITECTURE.md
        ├── ROADMAP.md
        └── TEST_PLAN.md

## Roadmap

- **V0.2–V0.5:** Technical foundation, input, persistence, performance and responsive behavior.
- **V0.6–V0.9:** Original art direction, sprites, animation, interface and effects.
- **V1.0–V1.3:** Fishing loop, inventory, economy, exploration and progression.
- **V1.4–V1.6:** Sushi recipes, customers, orders and restaurant management.
- **V1.7–V1.9:** Additional biomes, upgrades, audio, balancing and quality assurance.
- **V2.0:** Integrated and polished day/night gameplay loop.

## License

MIT — see [LICENSE](LICENSE).
