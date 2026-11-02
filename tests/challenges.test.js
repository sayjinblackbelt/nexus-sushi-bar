import test from "node:test";
import assert from "node:assert/strict";
import { ensureChallenges, recordChallengeEvent, challengeCards } from "../js/challenges.js";

const date = value => new Date(value + "T12:00:00.000Z");
test("daily and weekly challenges are deterministic for their period", () => {
  const a = ensureChallenges({ coins: 0 }, date("2026-11-02"));
  const b = ensureChallenges({ coins: 0 }, date("2026-11-02"));
  assert.deepEqual(a.dailyChallenge, b.dailyChallenge);
  assert.deepEqual(a.weeklyChallenge, b.weeklyChallenge);
  assert.equal(a.dailyChallenge.period, "2026-11-02");
  assert.equal(a.weeklyChallenge.period, "2026-W45");
});
test("challenge progress increments only matching objective events", () => {
  let progress = ensureChallenges({ coins: 0 }, date("2026-11-02"));
  const challenge = progress.dailyChallenge.challenge;
  const result = recordChallengeEvent(progress, challenge.event, 1, date("2026-11-02"));
  assert.equal(result.progress.dailyChallenge.challenge.progress, 1);
  assert.equal(result.progress.weeklyChallenge.challenge.progress, 0);
});
test("completed challenges grant their reward once and cap progress", () => {
  let progress = ensureChallenges({ coins: 10 }, date("2026-11-02"));
  const goal = progress.dailyChallenge.challenge.goal;
  const first = recordChallengeEvent(progress, progress.dailyChallenge.challenge.event, goal + 10, date("2026-11-02"));
  assert.equal(first.progress.dailyChallenge.challenge.completed, true);
  assert.equal(first.progress.dailyChallenge.challenge.progress, goal);
  assert.equal(first.reward, 25);
  const second = recordChallengeEvent(first.progress, progress.dailyChallenge.challenge.event, goal, date("2026-11-02"));
  assert.equal(second.reward, 0);
});
test("daily and weekly objectives rotate at their period boundary", () => {
  const before = ensureChallenges({ coins: 0 }, date("2026-11-02"));
  const nextDay = ensureChallenges(before, date("2026-11-03"));
  const nextWeek = ensureChallenges(before, date("2026-11-09"));
  assert.notEqual(nextDay.dailyChallenge.period, before.dailyChallenge.period);
  assert.notEqual(nextWeek.weeklyChallenge.period, before.weeklyChallenge.period);
  assert.equal(nextDay.weeklyChallenge.period, before.weeklyChallenge.period);
});
test("challenge cards expose progress percentages", () => {
  const progress = ensureChallenges({ coins: 0 }, date("2026-11-02"));
  const cards = challengeCards(progress, date("2026-11-02"));
  assert.equal(cards.length, 2);
  assert.equal(cards[0].percent, 0);
});
