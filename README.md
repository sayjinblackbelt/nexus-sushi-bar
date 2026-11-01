# Nexus Sushi Bar 🍣

A pixel-art simulation combining underwater exploration with a Zen sushi and tea bar in a neon cyberpunk city.

Dive by day, catch ingredients, return to the surface and serve sushi and Japanese tea at night.

## Current milestone — V0.4 Restaurant prototype

- HTML5 Canvas and native JavaScript ES modules.
- Keyboard and multi-touch controls, portrait and landscape.
- Animated diver and five fish species.
- Underwater ambient lighting, coral and catch particles.
- Versioned saves with fish stock, tea stock, coins and reputation.
- First playable restaurant shift with customer orders, sushi, matcha, hojicha and lotus tea.
- Cyberpunk-zen restaurant scene and responsive service interface.
- Automated syntax checks and restaurant economy tests.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / Arrow keys | Direction pad |
| Catch fish | E / Space | Capturar |
| Return to surface | R | Superfície |
| Serve an order | — | Select the requested menu item |

## Run locally

Serve the project through a local static web server, then open index.html. Native JavaScript ES modules work best over HTTP.

## Project structure

    nexus-sushi-bar/
    ├── index.html
    ├── README.md
    ├── package.json
    ├── assets/sprites/
    │   ├── diver.svg
    │   └── fish.svg
    ├── css/style.css
    ├── js/
    │   ├── main.js
    │   ├── game.js
    │   ├── restaurant.js
    │   ├── core/
    │   │   ├── bar-renderer.js
    │   │   ├── canvas.js
    │   │   ├── input.js
    │   │   ├── renderer.js
    │   │   └── storage.js
    │   └── data/
    │       ├── fish.js
    │       └── menu.js
    ├── tests/restaurant.test.js
    └── docs/
        ├── ARCHITECTURE.md
        ├── ART_GUIDE.md
        ├── RESTAURANT_DESIGN.md
        ├── ROADMAP.md
        └── TEST_PLAN.md

## Roadmap

- **V0.3:** Diver and fish animations, underwater lighting and visual feedback.
- **V0.4:** First playable dive-to-restaurant loop.
- **V0.5:** Inventory, save integrity, settings and technical beta.
- **V0.6–V0.9:** Additional biomes, assets, progression and missions.
- **V1.0–V1.3:** Fishing economy and exploration progression.
- **V1.4–V1.6:** Full restaurant management, recipes, customers and upgrades.
- **V1.7–V1.9:** Content, events, reputation, balancing and QA.
- **V2.0:** Integrated and polished day/night gameplay loop.

## Quality checks

- npm run check — JavaScript syntax and module checks.
- npm test — restaurant inventory and service tests.

## License

MIT — see LICENSE.
