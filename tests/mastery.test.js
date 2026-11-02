import test from "node:test";
import assert from "node:assert/strict";
import { applyMasteryRewards, masterySummary, speciesMastery } from "../js/mastery.js";
import { FISH_SPECIES } from "../js/data/fish.js";

test("species mastery reports the next tier and bounded progress", () => {
  assert.equal(speciesMastery(0).next.id, "discovered");
  assert.equal(speciesMastery(3).percent, 60);
  assert.equal(speciesMastery(5).tier.id, "familiar");
  assert.equal(speciesMastery(30).tier.id, "expert");
  assert.equal(speciesMastery(30).next, null);
});

test("mastery rewards are granted once when a catch crosses a tier", () => {
  const base = { coins: 10, speciesCaught: { sardine: 5 }, masteryRewards: { "sardine:discovered": 1 } };
  const result = applyMasteryRewards(base, [{ id: "sardine" }]);
  assert.equal(result.progress.coins, 25);
  assert.deepEqual(result.rewards.map(item => item.tier), ["familiar"]);
  const repeated = applyMasteryRewards(result.progress, [{ id: "sardine" }]);
  assert.equal(repeated.progress.coins, 25);
  assert.equal(repeated.rewards.length, 0);
});

test("mastery summary covers every species and counts expert species", () => {
  const summary = masterySummary({ speciesCaught: { sardine: 30, clownfish: 5 } }, FISH_SPECIES);
  assert.equal(summary.entries.length, FISH_SPECIES.length);
  assert.equal(summary.discovered, 2);
  assert.equal(summary.mastered, 1);
  assert.equal(summary.total, 35);
});
