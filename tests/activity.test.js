import test from "node:test";
import assert from "node:assert/strict";
import { recordActiveDay, activitySummary } from "../js/activity.js";
const date = value => new Date(value + "T12:00:00.000Z");
test("activity days accumulate without resetting after a pause", () => {
  let p = { coins: 0 };
  p = recordActiveDay(p, date("2026-11-01"));
  p = recordActiveDay(p, date("2026-11-04"));
  assert.equal(activitySummary(p).days, 2);
});
test("same calendar day is recorded only once", () => {
  const p = recordActiveDay(recordActiveDay({ coins: 0 }, date("2026-11-01")), date("2026-11-01T18:00:00"));
  assert.equal(p.activityDays.length, 1);
});
test("milestone rewards are credited once", () => {
  let p = { coins: 0 };
  for (let i = 1; i <= 7; i++) p = recordActiveDay(p, date("2026-11-" + String(i).padStart(2,"0")));
  assert.equal(p.coins, 190);
  assert.equal(activitySummary(p).completed, 3);
});
