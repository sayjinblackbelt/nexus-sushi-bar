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

### V0.6–V0.9 — Exploration and content
Additional ocean biomes, fish, landmarks, equipment upgrades, missions, collection records, restaurant decorations and expanded tea menu.

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
