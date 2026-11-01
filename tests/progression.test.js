import test from "node:test";
import assert from "node:assert/strict";
import { fishingLevel, fishingRank, barShiftTarget, equipmentStats, CHARACTERS } from "../js/progression.js";
import { RestaurantManager } from "../js/restaurant.js";
import { writeProgress } from "../js/core/storage.js";
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
  assert.equal(chooseFishSpecies(pool, () => .999), legendary);
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
