import test from "node:test";
import assert from "node:assert/strict";
import { RestaurantManager } from "../js/restaurant.js";
import { writeProgress } from "../js/core/storage.js";

test("restaurant serves tea and sushi while consuming the matching stock", () => {
  writeProgress({
    coins: 0,
    bestCatch: 0,
    fishStock: {},
    teaStock: { matcha: 2, hojicha: 2, lotus: 1 },
    reputation: 0,
    day: 1
  });

  const restaurant = new RestaurantManager();
  restaurant.beginShift([{ id: "sardine" }, { id: "sardine" }]);

  restaurant.order = { itemId: "matcha", customer: "Teste", itemName: "Matcha Sereno" };
  assert.equal(restaurant.serve("nigiri-sardine"), false);
  assert.equal(restaurant.progress.coins, 0);

  assert.equal(restaurant.serve("matcha"), true);
  assert.equal(restaurant.progress.teaStock.matcha, 1);
  assert.equal(restaurant.progress.coins, 12);
  assert.equal(restaurant.progress.reputation, 1);

  restaurant.order = { itemId: "nigiri-sardine", customer: "Teste", itemName: "Nigiri Zen" };
  assert.equal(restaurant.serve("nigiri-sardine"), true);
  assert.equal(restaurant.progress.fishStock.sardine, 1);
  assert.equal(restaurant.progress.coins, 30);
  assert.equal(restaurant.progress.reputation, 2);
});

test("restaurant disables service when a required ingredient is missing", () => {
  writeProgress({
    coins: 0,
    bestCatch: 0,
    fishStock: {},
    teaStock: { matcha: 0, hojicha: 0, lotus: 0 },
    reputation: 0,
    day: 1
  });

  const restaurant = new RestaurantManager();
  restaurant.beginShift([]);
  assert.equal(restaurant.closed, true);
  assert.equal(restaurant.order, null);
});
