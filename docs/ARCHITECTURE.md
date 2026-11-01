# Technical Architecture

## Runtime

The game is a static web application. GitHub Pages serves the HTML, CSS and native JavaScript ES modules. No framework or bundler is required.

## Module responsibilities

- `index.html`: semantic page structure and game overlays.
- `css/style.css`: visual system, responsive layout and touch target sizing.
- `js/main.js`: DOM integration, HUD updates and screen transitions.
- `js/game.js`: game loop, world simulation, rules and game lifecycle.
- `js/core/renderer.js`: Canvas rendering for the underwater world and game entities.
- `js/core/input.js`: keyboard and pointer input lifecycle.
- `js/core/storage.js`: guarded persistence access and session fallback.
- `js/core/canvas.js`: logical canvas dimensions, device-pixel-ratio scaling and pixel-art smoothing.
- `js/data/fish.js`: fish species definitions and school creation.

## Coordinate system

Gameplay uses a fixed logical world of 960 × 540 units. The canvas backing resolution is scaled by device pixel ratio (capped at 2), while gameplay coordinates remain unchanged. CSS controls the displayed size and orientation-specific layout.

## Input model

All movement is represented as keys in `OceanGame.keys`. Keyboard and touch controls feed the same set, so gameplay movement rules remain device-independent. Touch pointers are tracked individually; pointer capture and cancellation cleanup prevent stuck movement and allow diagonal movement.

## Persistence model

Coins and best catch are stored in a versioned save object. The first version migrates the prototype's legacy numeric keys without discarding existing progress. Reads and writes are guarded against browser storage errors. When persistent storage is unavailable, an in-memory fallback keeps the current session usable; it does not promise persistence after closing the tab.

## Game lifecycle

- `start()`: begins the animation loop.
- `resetDive()`: resets transient dive state without erasing long-term progress.
- `surface()`: ends the dive, awards coins and persists progress.
- The animation delta is capped to avoid large simulation jumps after delayed frames.

## Validation

GitHub Actions runs `npm run check` on pushes and pull requests. This currently validates JavaScript syntax and module parseability. It is not a substitute for browser gameplay tests on real devices.
