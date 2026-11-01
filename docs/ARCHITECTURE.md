# Technical Architecture

## Runtime

Static web application served by GitHub Pages using HTML, CSS and native JavaScript ES modules. No framework or bundler is required.

## Module responsibilities

- index.html: page structure, underwater screen and restaurant interface.
- css/style.css: visual system, responsive layouts and touch targets.
- js/main.js: DOM integration, HUD, scene transitions and animation scheduling.
- js/game.js: underwater simulation, movement, oxygen, catch rules and dive lifecycle.
- js/restaurant.js: customer orders, menu validation, ingredient consumption, rewards and shift lifecycle.
- js/core/renderer.js: underwater Canvas rendering and sprite animation.
- js/core/bar-renderer.js: cyberpunk-zen restaurant environment.
- js/core/input.js: keyboard and pointer input lifecycle.
- js/core/storage.js: versioned save data, migration and guarded persistence.
- js/core/canvas.js: logical dimensions and device-pixel-ratio scaling.
- js/data/fish.js: fish definitions and school generation.
- js/data/menu.js: sushi and tea catalog, prices and ingredient requirements.

## Coordinate system

Both scenes use a logical 960 × 540 world. Canvas backing resolution is scaled by device pixel ratio, capped at 2. CSS controls display size and orientation-specific layout.

## Input model

Underwater movement is represented as keys in OceanGame.keys. Keyboard and touch controls feed the same set. Touch pointers are tracked individually; pointer capture and cancellation cleanup prevent stuck movement and allow diagonal movement. Restaurant actions use large semantic HTML buttons.

## Persistence model

Save schema v2 stores coins, best catch, fish stock, tea stock, reputation and day. Legacy prototype keys and schema v1 migrate into the current structure. Reads and writes are guarded against browser storage errors; an in-memory fallback keeps the current session usable when persistent storage is unavailable.

## Game lifecycle

- OceanGame.start(): begins the underwater animation loop.
- OceanGame.resetDive(): resets transient dive state.
- OceanGame.surface(): ends the dive, awards catch value and emits the caught fish list.
- RestaurantManager.beginShift(fish): transfers dive catch into stock and generates the first guest order.
- RestaurantManager.serve(itemId): validates the order, consumes ingredients, awards coins and reputation, and advances the shift.
- Completing a shift allows the next dive to begin.

## Rendering

Underwater and restaurant scenes use separate renderers and the same logical Canvas dimensions. Sprite sheets load asynchronously; procedural fallback drawing remains available underwater.

## Validation

GitHub Actions runs npm run check and npm test on pushes and pull requests. Automated tests cover restaurant order validation and ingredient consumption. They do not replace real-browser testing on desktop and mobile devices.
