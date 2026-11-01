import test from "node:test";
import assert from "node:assert/strict";
import { RestaurantManager } from "../js/restaurant.js";
import { readProgress, writeProgress } from "../js/core/storage.js";

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
  assert.equal(manager.preparation.awaitingStation, true);
  assert.ok(manager.preparation.steps[manager.preparation.stepIndex].seconds > 0);
});

test("timed preparation completes service, consumes stock and awards a fast tip", () => {
  const manager = setup();
  manager.order = { itemId: "matcha", customer: "Mei", itemName: "Matcha Sereno", favorites: ["matcha"] };
  manager.patienceMax = 40;
  manager.patience = 40;
  const coinsBefore = manager.progress.coins;
  const stockBefore = manager.progress.teaStock.matcha;
  assert.equal(manager.prepare("matcha"), true);
  assert.equal(manager.chooseStation("kettle"), true);
  manager.tick(1.1);
  assert.equal(manager.chooseStation("tea"), true);
  manager.tick(1.3);
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


test("recipe workflow requires the correct station at every step", () => {
  const manager = setup();
  manager.order = { itemId: "matcha", customer: "Mei", itemName: "Matcha Sereno", favorites: ["matcha"] };
  assert.equal(manager.prepare("matcha"), true);
  assert.equal(manager.chooseStation("tea"), false);
  assert.equal(manager.chooseStation("kettle"), true);
  manager.tick(1.1);
  assert.equal(manager.preparation.awaitingStation, true);
  assert.equal(manager.preparation.stepIndex, 1);
  assert.equal(manager.chooseStation("tea"), true);
  const stockBefore = manager.progress.teaStock.matcha;
  manager.tick(1.3);
  assert.equal(manager.served, 1);
  assert.equal(manager.progress.teaStock.matcha, stockBefore - 1);
});

test("recipe ingredients are not consumed before all stations finish", () => {
  const manager = setup();
  manager.order = { itemId: "nigiri-sardine", customer: "Akira", itemName: "Nigiri Zen", favorites: ["nigiri-sardine"] };
  const stockBefore = manager.progress.fishStock.sardine;
  manager.prepare("nigiri-sardine");
  manager.chooseStation("rice");
  manager.tick(1.4);
  assert.equal(manager.progress.fishStock.sardine, stockBefore);
  assert.equal(manager.chooseStation("sushi"), true);
  manager.tick(1.8);
  assert.equal(manager.progress.fishStock.sardine, stockBefore - 1);
});


test("every fifth night opens a VIP event with a premium tip", () => {
  const manager = setup();
  manager.progress.day = 5;
  writeProgress(manager.progress);
  manager.beginShift([]);
  assert.equal(manager.order.vip, true);
  manager.order = { itemId: "matcha", customer: "Visitante VIP", itemName: "Matcha Sereno", favorites: ["matcha"], vip: true };
  manager.patienceMax = 40; manager.patience = 40;
  manager.serve("matcha");
  assert.equal(manager.progress.coins, 20);
  assert.equal(manager.shiftStats.served, 1);
  assert.equal(manager.shiftStats.tips, 8);
});

test("décor upgrade costs coins and persists its level", () => {
  const manager = setup();
  manager.progress.coins = 120;
  assert.equal(manager.upgradeDecor(), true);
  assert.equal(manager.progress.decorLevel, 2);
  assert.equal(manager.progress.coins, 0);
  assert.equal(readProgress().decorLevel, 2);
});


test("expanded menu includes rare-fish dishes and additional teas", () => {
  const manager = setup();
  const ids = manager.getState().menu.map(item => item.id);
  for (const id of ["puffer-tempura", "moonfish-sashimi", "lantern-nigiri", "koi-signature", "genmaicha", "yuzu-tea"]) assert.ok(ids.includes(id));
  assert.ok((manager.progress.teaStock.genmaicha || 0) >= 0);
});


test("specialty menu unlocks follow fishing and bar progression", () => {
  const manager = setup();
  manager.progress.fishStock.moonfish = 1; manager.progress.fishStock["koi-ray"] = 1;
  manager.progress.teaStock.genmaicha = 1; manager.progress.teaStock.yuzu = 1;
  let ids = manager.availableItems().map(item => item.id);
  assert.ok(!ids.includes("moonfish-sashimi"));
  assert.ok(!ids.includes("genmaicha"));
  manager.progress.fishingXP = 200;
  manager.progress.barLevel = 2;
  ids = manager.availableItems().map(item => item.id);
  assert.ok(ids.includes("moonfish-sashimi"));
  assert.ok(ids.includes("genmaicha"));
  assert.ok(!ids.includes("koi-signature"));
  manager.progress.fishingXP = 400;
  manager.progress.barLevel = 3;
  ids = manager.availableItems().map(item => item.id);
  assert.ok(ids.includes("koi-signature"));
  assert.ok(ids.includes("yuzu-tea"));
});


test("customer satisfaction rating reflects successful service and walkouts", () => {
  const manager = setup();
  let state = manager.getState();
  assert.equal(state.satisfaction, 100);
  assert.equal(state.rating, 5);
  manager.shiftStats.served = 3;
  manager.shiftStats.lost = 1;
  state = manager.getState();
  assert.equal(state.satisfaction, 75);
  assert.equal(state.rating, 4);
});


test("festival night introduces a guest and grants a special tip", () => {
  const manager = setup();
  manager.progress.day = 7;
  writeProgress(manager.progress);
  manager.beginShift([]);
  assert.equal(manager.order.festival, true);
  assert.equal(manager.order.customer, "Convidado do Festival");
  manager.order = { itemId: "matcha", customer: "Convidado do Festival", itemName: "Matcha Sereno", favorites: ["matcha"], festival: true };
  manager.patienceMax = 40; manager.patience = 40;
  const before = manager.progress.coins;
  manager.serve("matcha");
  assert.equal(manager.progress.coins, before + 18);
  assert.equal(manager.getState().eventType, "FESTIVAL DAS LANTERNAS");
});
