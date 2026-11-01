# Nexus Sushi Bar — Development Roadmap

## Product vision

A cozy pixel-art simulation with two connected loops:
- **Day:** dive, explore, catch fish and collect ingredients.
- **Night:** run a Zen cyberpunk sushi and tea bar, serve guests and improve the business.

The restaurant is a calm refuge inside a luminous coastal city. Its design combines neon cyan, magenta and violet with wood, bamboo, stone, bonsai, warm lanterns and mindful tea service.

## Development principles

1. Stabilize the foundation before expanding content.
2. Keep systems modular and dependency-light.
3. Support keyboard, touch, portrait and landscape.
4. Preserve progress through versioned saves.
5. Make each milestone playable and testable.
6. Use original pixel-art assets and a documented art pipeline.
7. Treat Buddhist-inspired themes respectfully: mindfulness, balance, compassion and hospitality, not sacred iconography used as decoration.
8. Do not claim a release milestone complete until desktop and mobile acceptance criteria pass.

## Version plan

### V0.1 — Playable underwater prototype
Canvas scene, diver, five fish, movement, catch, oxygen, surface return and coin persistence.

### V0.2 — Technical foundation
Dedicated keyboard/touch input, multi-pointer movement, responsive layouts, safe persistence, legacy migration and high-DPI Canvas.

### V0.3 — Underwater visual pass (implemented; device QA pending)
Diver sprite sheet with idle, swim and catch rows; two frames for each fish; animated rendering; lagoon lighting, coral, bubbles and catch particles.

### V0.4 — First restaurant loop (in progress)
- Dive completion opens the restaurant at night.
- Caught fish transfer into ingredient stock.
- Sushi and tea menu: Nigiri Zen, Nigiri Aurora, Nigiri Neon, Matcha Sereno, Hojicha Noturno and Chá Lótus.
- Customer orders and correct-item service.
- Coins, stock consumption, reputation and shift summary.
- Cyberpunk-zen restaurant scene and responsive interface.
- Save schema v2 with fish stock, tea stock, day and reputation.
- Automated restaurant economy tests.

### V0.5 — Character and progression foundation (implemented; device QA pending)
- Choose Kai or Yuna before the first dive.
- Fishing XP and five fishing ranks.
- Five equipment tiers improve capacity, swim speed and oxygen efficiency.
- Five restaurant tiers; higher tiers increase guests per shift.
- Coins fund bar and equipment upgrades; progression persists in save schema v3.

### V0.55 — Technical beta
Save integrity, ingredient restocking, settings, control preferences, reduced motion, diagnostics and browser QA.

### V0.6 — Exploration and fishing loop (implemented; device QA pending)
- Three selectable biomes: Lagoa Azul, Recife Neon and Abismo Lótus, unlocked at fishing levels 1, 3 and 5.
- Biome-specific species habitats and distinct ocean palettes/depth labels.
- Three-fish expedition mission with biome-scaled coin reward.
- Persistent species discovery journal and species counter.

### V0.7 — Living restaurant and service loop (implemented; device QA pending)
- Customer profiles with favorite menu items and individualized patience.
- A visible waiting queue and automatic customer arrivals.
- Timed sushi and tea preparation instead of instant serving.
- Patience meter, service tips for fast delivery and reputation loss when a customer leaves.
- Shift progression and customer service counts remain connected to restaurant level.

### V0.8 — Kitchen stations and recipes (implemented; device QA pending)
- Sushi and tea orders use multi-stage recipes.
- Dedicated rice, sushi, kettle and tea stations.
- Correct station selection is required before each timed stage.
- Ingredient stock is consumed only after the full recipe is completed.
- Wrong stations are rejected; patience continues during preparation.

### V0.9 — Restaurant operations (implemented; device QA pending)
- VIP night event every fifth in-game day, with longer patience and premium tips.
- Décor upgrades across three levels; higher décor improves guest patience and changes the scene.
- Shift analytics: guests served, walkouts, base revenue and tips.
- Save schema v5 adds persistent décor progression.

### V1.0 — Complete exploration baseline
Tutorial, underwater objectives, balanced catch economy, persistent inventory and mobile/desktop quality gates.

### V1.1–V1.3 — Fishing progression
Fish rarity and habitats, ingredient quality, recipe requirements, equipment upgrades and exploration objectives.

### V1.4–V1.6 — Full sushi and tea restaurant
Complete day/night transition, recipe preparation, customer queue, preferences, tea ritual, restaurant upgrades, décor, reputation and daily reports.

### V1.7–V1.9 — Content, balance and polish
More biomes, recipes, teas and customers; seasonal events; audio; economy balancing; accessibility; regression QA.

### V2.0 — Complete core experience
Dive, collect ingredients, return, manage stock, open the Zen cyberpunk sushi and tea bar, fulfill orders, earn revenue, improve equipment and restaurant, unlock content and repeat.

## V0.9 acceptance criteria

- [x] VIP event appears on every fifth night.
- [x] VIP customers award premium tips.
- [x] Décor upgrades enforce costs and persist across reloads.
- [x] Décor level affects customer patience and scene details.
- [x] Shift analytics distinguish revenue, tips, served guests and walkouts.

## V0.8 acceptance criteria

- [x] Sushi and tea recipes have ordered preparation stages.
- [x] Each stage requires its matching kitchen station.
- [x] Wrong stations cannot advance a recipe.
- [x] Ingredients are consumed only after the final stage.
- [x] Customer patience remains active during station work.

## V0.7 acceptance criteria

- [ ] Customer profiles influence requested items.
- [ ] Queue displays waiting guests.
- [ ] Correct menu choice starts a timed preparation.
- [ ] Patience decreases and affects tips/reputation.
- [ ] Shift ends after the target number of served guests or stock exhaustion.

## V0.5 acceptance criteria

- [ ] Character choice is available before the first dive.
- [ ] Fishing XP advances rank.
- [ ] Equipment upgrades improve measurable dive attributes.
- [ ] Bar upgrades increase guest count per shift.
- [ ] Upgrade purchases persist and enforce coin costs.

## V0.4 acceptance criteria

- [ ] Dive results transfer to restaurant fish stock once per shift.
- [ ] Customer order is clearly visible.
- [ ] Only the requested menu item completes the order.
- [ ] Sushi consumes matching fish stock.
- [ ] Tea consumes matching tea stock.
- [ ] Correct service awards coins and reputation.
- [ ] Progress survives a page reload.
- [ ] Five guests complete the shift and allow the next dive.
- [ ] Restaurant layout works in portrait and landscape.
- [ ] No blocking JavaScript errors in desktop and mobile browsers.

## Release gates

Code review, passing automated checks, gameplay acceptance tests, GitHub Pages verification on real devices and documented limitations.
