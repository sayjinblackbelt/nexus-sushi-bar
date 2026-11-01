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

### V0.4 — First restaurant loop (implemented; device QA pending)
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

### V1.0 — Complete exploration baseline (implemented; device QA pending)
- First-dive interactive tutorial covers movement, capture, oxygen, return and expedition mission.
- Tutorial completion persists without overwriting existing progress.
- Three-fish mission and species journal connect exploration to restaurant supply.
- Save schema v6 preserves backward migration and tutorial state.

### V1.1 — Rarity-weighted marine life (implemented; device QA pending)
- Species now spawn according to rarity weights instead of cycling evenly.
- Legendary species are meaningfully rarer than common species.
- Fishing XP rewards scale with catch rarity: 10 / 15 / 22 / 32 / 45.

### V1.2 — Catch quality (implemented; device QA pending)
- Catch condition reflects remaining oxygen: Impecável, Fresco or Regular.
- Premium and fresh catches grant a coin multiplier bonus.
- Quality totals persist in the save and are independent from species discovery.
- Expedition summary reports quality bonus separately from base catch value.

### V1.3 — Equipment specializations (implemented; device QA pending)
- Balanced, Endurance, Swift and Cargo specializations.
- Endurance reduces oxygen consumption by 18%; Swift increases swim speed by 15%; Cargo adds two catch slots.
- Specialization persists and combines with equipment tier upgrades.

### V1.4 — Expanded sushi and tea menu (implemented; device QA pending)
- Four specialty dishes use rare, epic and legendary catches.
- Genmaicha and Yuzu join the tea menu.
- Four additional customer profiles introduce new favorites.
- Recipe stations and stock consumption apply consistently to the expanded menu.

### V1.5 — Restaurant mastery (implemented; device QA pending)
- Specialty sushi unlocks at fishing levels 3, 4 and 5.
- Genmaicha and Yuzu unlock as the restaurant reaches levels 2 and 3.
- Locked dishes remain visible with clear progression requirements.
- Customer order generation respects unlocked dishes and available stock.

### V1.6 — Hospitality and daily operations (implemented; device QA pending)
- Shift report calculates guests served, walkouts, gross sales and tips.
- Customer satisfaction is calculated from successful services versus walkouts.
- A five-star rating communicates service quality at a glance.
- Reputation remains the long-term hospitality progression indicator.

### V1.7 — Seasonal hospitality events (implemented; device QA pending)
- Weekly Festival of Lanterns every seventh in-game day.
- Festival guest, additional patience and a special service tip.
- Restaurant scene receives a warmer event lighting treatment.
- VIP night and festival schedules do not conflict.

### V1.8 — Accessibility and feedback (implemented; device QA pending)
- Optional synthesized sound effects with a persistent on/off setting.
- Reduced-motion preference persists and suppresses CSS animation/transition motion.
- Audio initialization is lazy and failure-safe; gameplay never depends on sound.

### V1.9 — Economy and regression polish (implemented; device QA pending)
- Save normalization is exported and tested for legacy, malformed and out-of-range values.
- Automated balance checks cover fish rarity, recipe durations, station references and catch-quality multipliers.
- CI syntax checks include the audio module and balance test suite.
- Economy values and acceptance thresholds are documented for release review.

### V2.0 — Complete core experience (implemented; real-device acceptance pending)
- Integrated day/night loop: dive, collect fish, return, transfer stock, serve guests and begin the next expedition.
- Three biomes, seven fish species, rarity-weighted spawning, quality bonuses and equipment specializations.
- Staged sushi and tea recipes, kitchen stations, expanded menu and progression-based unlocks.
- Customer queue, preferences, patience, tips, VIP nights, Lantern Festival, décor and satisfaction reporting.
- Version 9 save schema with legacy normalization, persistent settings and progression.
- Automated syntax, gameplay, economy, recipe and migration regression tests.
- README, balance reference and release checklist updated.

## V2.0 acceptance criteria\n\n- [x] The core dive-to-restaurant loop is connected end to end in code.\n- [x] Progression, inventory, upgrades and preferences persist through the versioned save.\n- [x] Automated checks cover recipes, economy, progression and save normalization.\n- [x] README, roadmap, balance reference and release notes describe the current build.\n- [ ] Verify the full loop on desktop and iPhone/iPad browsers.\n- [ ] Confirm GitHub Pages runtime behavior after deployment.\n\n## V1.9 acceptance criteria

- [x] Legacy save data normalizes to the current schema.
- [x] Invalid and negative progression values are clamped safely.
- [x] Every menu recipe duration matches its stage durations.
- [x] All recipes reference valid kitchen stations.
- [x] Rarity and catch-quality balance rules are regression-tested.

## V1.8 acceptance criteria

- [x] Sound can be enabled or disabled and the choice persists.
- [x] Reduced-motion preference persists and applies globally to UI motion.
- [x] Audio failure or browser restrictions never block gameplay.

## V1.7 acceptance criteria

- [x] Festival event occurs every seventh in-game day.
- [x] Festival guest and reward are distinct from VIP nights.
- [x] Event atmosphere is reflected in the restaurant scene.

## V1.6 acceptance criteria

- [x] Daily report includes served guests, walkouts, sales and tips.
- [x] Satisfaction percentage responds to service outcomes.
- [x] Five-star rating is derived from satisfaction thresholds.
- [x] Reputation persists as the long-term hospitality indicator.

## V1.5 acceptance criteria

- [x] Rare-fish dishes unlock at their fishing progression thresholds.
- [x] Specialty teas unlock through restaurant progression.
- [x] Locked menu items show their unlock requirements.
- [x] Customer orders are generated only from unlocked, stocked items.

## V1.4 acceptance criteria

- [x] Rare and high-tier fish have matching specialty dishes.
- [x] Two additional teas are stocked and restocked.
- [x] New customer profiles can request expanded menu items.
- [x] All new dishes use staged kitchen recipes.

## V1.3 acceptance criteria

- [x] Four equipment specializations are selectable.
- [x] Each specialization has a measurable gameplay effect.
- [x] Specialization persists across reloads and composes with equipment tiers.

## V1.2 acceptance criteria

- [x] Catch quality is determined by oxygen remaining at capture.
- [x] Premium and fresh catches grant transparent value bonuses.
- [x] Quality totals persist across sessions.
- [x] Base catch value, quality bonus and mission reward remain separate in the summary.

## V1.1 acceptance criteria

- [x] Fish spawn probabilities respect rarity weights.
- [x] Legendary fish are rarer than common species.
- [x] Fishing XP scales with rarity.

## V1.0 acceptance criteria

- [x] First-time players receive a guided first-dive tutorial.
- [x] Tutorial completion persists across reloads.
- [x] Existing coins, stock and progression remain intact when tutorial state changes.
- [x] Expedition mission and species discovery feed the restaurant loop.

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
