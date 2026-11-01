# Nexus Sushi Bar — Balance Reference

## Exploration

| Rarity | Spawn weight | Fishing XP |
|---|---:|---:|
| Common | 8.00 | 10 |
| Uncommon | 5.00 | 15 |
| Rare | 2.50 | 22 |
| Epic | 1.00 | 32 |
| Legendary | 0.35 | 45 |

Catch condition is determined by oxygen remaining when the fish is captured:

| Condition | Oxygen remaining | Value multiplier |
|---|---:|---:|
| Impecável | Above 70% | 1.25× |
| Fresco | Above 35% to 70% | 1.10× |
| Regular | 35% or less | 1.00× |

Equipment specializations:
- Balanced: no modifier.
- Endurance: 18% lower oxygen consumption.
- Swift: 15% higher swim speed.
- Cargo: two additional catch slots.

## Restaurant

- Fast service tip: +3 coins when more than 65% patience remains.
- Standard service tip: +1 coin when more than 30% patience remains.
- VIP tip: +5 additional coins.
- Festival tip: +3 additional coins.
- Successful service: +1 reputation.
- Walkout: -1 reputation.
- Tea restock: 30 coins.
- Bar upgrade: 100 × current bar level.
- Equipment upgrade: 80 × current equipment level.
- Décor upgrade: 120 × current décor level.
- Shift size: 5 + 2 guests per bar level above level 1.

## Recipe timing

Recipe preparation is divided into timed station stages. Each recipe's displayed duration must equal the sum of its stage durations; automated tests enforce this invariant. Ingredients are consumed only after the final stage.

## Tuning policy

Change one economy family at a time. Re-run npm run check and npm test after every balance adjustment. Do not tune against a single random run; compare multiple dives and shifts, including low-stock and walkout cases.
