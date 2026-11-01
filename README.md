# Nexus Sushi Bar 🍣

A cozy pixel-art fishing and sushi restaurant simulation game.

Explore the ocean, catch fish and collect ingredients during the day. The restaurant management loop is planned for a later milestone.

## Current milestone — V0.1

The first playable prototype focuses on the underwater loop:

- Pixel-art inspired underwater scene rendered with HTML5 Canvas.
- Keyboard and touch movement.
- Fish swimming with simple autonomous movement.
- Proximity-based fishing.
- Oxygen and inventory capacity.
- Return-to-surface mechanic.
- Best catch and coins saved locally.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / Arrow keys | Direction pad |
| Catch fish | E / Space | CATCH button |
| Return to surface | R | SURFACE button |

## Run locally

Open `index.html` in a modern browser. The game uses native JavaScript ES modules and does not require a build step or external dependencies.

## Project structure

```text
nexus-sushi-bar/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── game.js
│   └── data/
│       └── fish.js
└── docs/
    └── ROADMAP.md
```

## Roadmap

- **V0.1:** Underwater exploration and fishing prototype.
- **V0.2:** Day/night transition, sushi preparation and restaurant service.
- **V0.3:** Upgrades, recipes, new fish and additional ocean zones.
- **V1.0:** Content polish, audio, balancing and expanded progression.

## License

MIT — see [LICENSE](LICENSE).
