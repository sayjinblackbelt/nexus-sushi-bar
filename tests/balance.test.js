import test from "node:test";
import assert from "node:assert/strict";
import { FISH_SPECIES, catchQuality } from "../js/data/fish.js";
import { RESTAURANT_MENU, KITCHEN_STATIONS } from "../js/data/menu.js";

test("all fish species have valid rarity, positive value and spawn weight", () => {
  for (const fish of FISH_SPECIES) {
    assert.ok(["common", "uncommon", "rare", "epic", "legendary"].includes(fish.rarity));
    assert.ok(fish.value > 0);
    assert.ok(fish.spawnWeight > 0);
  }
});

test("every menu recipe duration matches its displayed preparation time", () => {
  const stationIds = new Set(KITCHEN_STATIONS.map(station => station.id));
  for (const item of RESTAURANT_MENU) {
    assert.ok(item.price > 0);
    assert.ok(item.recipe.length >= 2);
    const duration = item.recipe.reduce((total, step) => total + step.seconds, 0);
    assert.ok(Math.abs(duration - item.prepSeconds) < 0.001, item.id);
    for (const step of item.recipe) assert.ok(stationIds.has(step.station), item.id);
  }
});

test("catch quality multipliers remain ordered and bounded", () => {
  assert.ok(catchQuality(95).multiplier > catchQuality(55).multiplier);
  assert.equal(catchQuality(10).multiplier, 1);
  assert.ok(catchQuality(95).multiplier <= 1.25);
});
