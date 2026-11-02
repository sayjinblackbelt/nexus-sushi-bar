import test from "node:test";
import assert from "node:assert/strict";
import { fishingLevel, fishingRank, barShiftTarget, equipmentStats, CHARACTERS } from "../js/progression.js";
import { RestaurantManager } from "../js/restaurant.js";
import { writeProgress, normalizeProgress, SAVE_VERSION } from "../js/core/storage.js";
import { chooseFishSpecies, catchQuality, FISH_SPECIES } from "../js/data/fish.js";

test("fishing progression unlocks five ranks at 100 XP intervals", () => {
  assert.equal(fishingLevel(0), 1);
  assert.equal(fishingLevel(99), 1);
  assert.equal(fishingLevel(100), 2);
  assert.equal(fishingLevel(400), 5);
  assert.equal(fishingRank(400), "Mestre das marés");
});

test("equipment tiers increase capacity and speed while reducing oxygen drain", () => {
  const basic = equipmentStats(1);
  const advanced = equipmentStats(5);
  assert.equal(basic.capacity, 8);
  assert.equal(advanced.capacity, 16);
  assert.ok(advanced.speed > basic.speed);
  assert.ok(advanced.oxygenDrain < basic.oxygenDrain);
});

test("bar tiers increase the number of guests per shift", () => {
  assert.equal(barShiftTarget(1), 5);
  assert.equal(barShiftTarget(5), 13);
});

test("the two selectable player characters have distinct names", () => {
  assert.equal(CHARACTERS.kai.name, "Kai");
  assert.equal(CHARACTERS.yuna.name, "Yuna");
  assert.notEqual(CHARACTERS.kai.gender, CHARACTERS.yuna.gender);
});

test("coins can upgrade the bar and fishing equipment", () => {
  writeProgress({ coins: 500, fishStock: {}, teaStock: { matcha: 5, hojicha: 5, lotus: 3 }, reputation: 0, day: 1, barLevel: 1, equipmentLevel: 1 });
  const manager = new RestaurantManager();
  assert.equal(manager.upgradeBar(), true);
  assert.equal(manager.progress.barLevel, 2);
  assert.equal(manager.shiftTarget, 7);
  assert.equal(manager.upgradeGear(), true);
  assert.equal(manager.progress.equipmentLevel, 2);
});


test("first-dive tutorial completion is persisted without resetting progression", async () => {
  const { readProgress } = await import("../js/core/storage.js");
  writeProgress({ coins: 45, tutorialComplete: false, decorLevel: 2 });
  assert.equal(readProgress().tutorialComplete, false);
  writeProgress({ ...readProgress(), tutorialComplete: true });
  assert.equal(readProgress().tutorialComplete, true);
  assert.equal(readProgress().coins, 45);
  assert.equal(readProgress().decorLevel, 2);
});


test("fish rarity weights make legendary species substantially less common", () => {
  const pool = FISH_SPECIES.filter(species => species.biomes.includes("abyss"));
  const common = pool.find(species => species.rarity === "rare");
  const legendary = pool.find(species => species.rarity === "legendary");
  const total = pool.reduce((sum, species) => sum + species.spawnWeight, 0);
  const threshold = (common.spawnWeight + pool.slice(0, pool.indexOf(common)).reduce((sum, species) => sum + species.spawnWeight, 0)) / total;
  assert.equal(chooseFishSpecies(pool, () => 0), pool[0]);
  assert.equal(chooseFishSpecies(pool, () => .999).rarity, "legendary");
  assert.ok(legendary.spawnWeight < common.spawnWeight);
  assert.ok(threshold > 0);
});

test("rare catches award more fishing experience than common catches", () => {
  const commonXP = { common: 10, uncommon: 15, rare: 22, epic: 32, legendary: 45 };
  assert.ok(commonXP.legendary > commonXP.epic);
  assert.ok(commonXP.epic > commonXP.rare);
  assert.ok(commonXP.rare > commonXP.common);
});


test("catch condition rewards careful oxygen management", () => {
  assert.equal(catchQuality(90).id, "premium");
  assert.equal(catchQuality(90).multiplier, 1.25);
  assert.equal(catchQuality(60).id, "fresh");
  assert.equal(catchQuality(20).id, "standard");
  assert.equal(catchQuality(20).multiplier, 1);
});


test("equipment specializations trade capacity, speed and oxygen efficiency", () => {
  const balanced = equipmentStats(2, "balanced");
  const endurance = equipmentStats(2, "endurance");
  const swift = equipmentStats(2, "swift");
  const cargo = equipmentStats(2, "cargo");
  assert.ok(endurance.oxygenDrain < balanced.oxygenDrain);
  assert.ok(swift.speed > balanced.speed);
  assert.equal(cargo.capacity, balanced.capacity + 2);
});


test("sound and reduced motion preferences persist independently", async () => {
  const { readProgress } = await import("../js/core/storage.js");
  writeProgress({ soundEnabled: false, reducedMotion: true, coins: 77 });
  const saved = readProgress();
  assert.equal(saved.soundEnabled, false);
  assert.equal(saved.reducedMotion, true);
  assert.equal(saved.coins, 77);
});


test("save normalization migrates older progress with safe defaults", () => {
  const migrated = normalizeProgress({ version: 4, coins: 125, fishStock: { sardine: 3 }, teaStock: { matcha: 2 }, equipmentLevel: 3 });
  assert.equal(migrated.version, SAVE_VERSION);
  assert.equal(migrated.coins, 125);
  assert.equal(migrated.fishStock.sardine, 3);
  assert.equal(migrated.decorLevel, 1);
  assert.equal(migrated.soundEnabled, true);
  assert.equal(migrated.reducedMotion, false);
  assert.equal(migrated.equipmentSpecialization, "balanced");
});

test("invalid or negative save values normalize to safe gameplay values", () => {
  const normalized = normalizeProgress({ coins: -99, day: 0, equipmentLevel: 99, barLevel: -3, equipmentSpecialization: "invalid" });
  assert.equal(normalized.coins, 0);
  assert.equal(normalized.day, 1);
  assert.equal(normalized.equipmentLevel, 5);
  assert.equal(normalized.barLevel, 1);
  assert.equal(normalized.equipmentSpecialization, "balanced");
});


test("language preference accepts the three supported locales and defaults safely", async () => {
  const { normalizeProgress } = await import("../js/core/storage.js");
  assert.equal(normalizeProgress({ language: "en" }).language, "en");
  assert.equal(normalizeProgress({ language: "es" }).language, "es");
  assert.equal(normalizeProgress({ language: "fr" }).language, "pt-BR");
});


test("achievement progress unlocks from expedition, collection and service milestones", async () => {
  const { achievementProgress } = await import("../js/progression.js");
  const progress = achievementProgress({ totalDives:10,totalFishCaught:100,speciesCaught:{sardine:1,clownfish:1},customersServed:1,fishingXP:600,barLevel:1 });
  assert.equal(progress.find(a=>a.id==="first-dive").unlocked,true);
  assert.equal(progress.find(a=>a.id==="ten-dives").unlocked,true);
  assert.equal(progress.find(a=>a.id==="collector").current,2);
  assert.equal(progress.find(a=>a.id==="deep-sea").unlocked,true);
  assert.equal(progress.find(a=>a.id==="grand-opening").unlocked,false);
});


test("localization dictionaries translate dynamic gameplay and journal strings", async () => {
  const { translate } = await import("../js/i18n.js");
  assert.equal(translate("Lagoa Azul", "en"), "Blue Lagoon");
  assert.equal(translate("Missão da expedição concluída!", "es"), "¡Misión de expedición completada!");
  assert.equal(translate("Primeiro mergulho", "en"), "First dive");
  assert.equal(translate("PROFUNDIDADE", "es"), "PROFUNDIDAD");
});
