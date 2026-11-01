import test from "node:test";
import assert from "node:assert/strict";
import { BIOMES, getBiome, unlockedBiomes } from "../js/data/biomes.js";
import { FISH_SPECIES, createSchool } from "../js/data/fish.js";

test("three biomes unlock at fishing ranks 1, 3 and 5", () => {
  assert.deepEqual(unlockedBiomes(1).map(b => b.id), ["lagoon"]);
  assert.deepEqual(unlockedBiomes(3).map(b => b.id), ["lagoon", "reef"]);
  assert.deepEqual(unlockedBiomes(5).map(b => b.id), ["lagoon", "reef", "abyss"]);
});

test("each biome contains only fish from its habitat and rank", () => {
  for (const biome of BIOMES) {
    const level = biome.unlockLevel;
    const school = createSchool(960, 540, 70, level, biome.id);
    assert.equal(school.length, 70);
    assert.ok(school.every(f => f.biomes.includes(biome.id)));
    assert.ok(school.every(f => (f.unlockLevel || 1) <= level));
  }
});

test("all species have a habitat and a positive reward", () => {
  assert.equal(FISH_SPECIES.length, 7);
  assert.ok(FISH_SPECIES.every(f => f.biomes.length > 0 && f.value > 0));
  assert.equal(getBiome("unknown").id, "lagoon");
});

test("expedition mission rewards scale with biome depth", () => {
  assert.deepEqual(BIOMES.map(b => b.reward), [20, 35, 55]);
});
