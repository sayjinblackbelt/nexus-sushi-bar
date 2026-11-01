import test from "node:test";
import assert from "node:assert/strict";
import { RestaurantManager } from "../js/restaurant.js";
import { writeProgress } from "../js/core/storage.js";

function setup() {
  writeProgress({ coins: 0, bestCatch: 0, fishStock: { sardine: 4, clownfish: 2, "blue-tang": 2 }, teaStock: { matcha: 4, hojicha: 4, lotus: 4 }, reputation: 5, day: 1, barLevel: 1, customersServed: 0 });
  const manager = new RestaurantManager();
  manager.beginShift([{ id: "sardine" }, { id: "sardine" }]);
  return manager;
}

test("customer queue contains waiting guests and profiles define preferences", () => {
  const manager = setup();
  const state = manager.getState();
  assert.ok(state.order);
  assert.equal(state.queue.length, 3);
  assert.ok(state.order.favorites.length > 0);
});

test("only the requested item can start preparation", () => {
  const manager = setup();
  const requested = manager.order.itemId;
  const other = requested === "matcha" ? "hojicha" : "matcha";
  assert.equal(manager.prepare(other), false);
  assert.equal(manager.preparation, null);
  assert.equal(manager.prepare(requested), true);
  assert.ok(manager.preparation.remaining > 0);
});

test("timed preparation completes service, consumes stock and awards a fast tip", () => {
  const manager = setup();
  manager.order = { itemId: "matcha", customer: "Mei", itemName: "Matcha Sereno", favorites: ["matcha"] };
  manager.patienceMax = 40;
  manager.patience = 40;
  const coinsBefore = manager.progress.coins;
  const stockBefore = manager.progress.teaStock.matcha;
  assert.equal(manager.prepare("matcha"), true);
  manager.tick(2.4);
  assert.equal(manager.served, 1);
  assert.equal(manager.progress.teaStock.matcha, stockBefore - 1);
  assert.equal(manager.progress.coins, coinsBefore + 15);
  assert.equal(manager.progress.reputation, 6);
});

test("customer patience expiry cancels preparation and reduces reputation", () => {
  const manager = setup();
  manager.order = { itemId: "matcha", customer: "Mei", itemName: "Matcha Sereno", favorites: ["matcha"] };
  manager.patienceMax = 1;
  manager.patience = 1;
  manager.prepare("matcha");
  manager.tick(1.1);
  assert.equal(manager.preparation, null);
  assert.equal(manager.served, 0);
  assert.equal(manager.progress.reputation, 4);
  assert.equal(manager.progress.reputation, 4);
});

test("restaurant level continues to scale shift capacity", () => {
  const manager = setup();
  manager.progress.barLevel = 3;
  writeProgress({ ...manager.progress, barLevel: 3 });
  manager.beginShift([]);
  assert.equal(manager.shiftTarget, 9);
});
