# Manual Test Plan — V0.2

Automated syntax validation runs in GitHub Actions. The following checks require a real browser and, for touch behavior, a physical mobile device.

## Desktop
- [ ] Initial screen appears without console errors.
- [ ] Start button begins the dive.
- [ ] WASD and arrow keys move in four directions.
- [ ] Diagonal keyboard movement is normalized.
- [ ] E and Space attempt to catch a nearby fish.
- [ ] R returns to the surface.
- [ ] Oxygen depletion ends the dive.
- [ ] Coins and best catch remain after a page reload.

## Mobile portrait
- [ ] Start button is visible and usable.
- [ ] D-pad moves the diver.
- [ ] Two simultaneous directional touches move diagonally.
- [ ] Releasing a finger stops the corresponding direction.
- [ ] Switching apps and returning does not leave movement stuck.
- [ ] CATCH and SURFACE buttons work.
- [ ] HUD, scene and controls fit without horizontal scrolling.

## Mobile landscape
- [ ] Layout rearranges into the compact landscape composition.
- [ ] Canvas remains fully visible.
- [ ] D-pad and action buttons remain reachable.
- [ ] All touch actions work after rotating during a session.

## Save migration
- [ ] A browser with legacy nexus-coins values imports those values into the versioned save.
- [ ] Existing coins are not reset by the migration.
- [ ] Storage-disabled browsing remains playable for the current session.


## Restaurant phase — V0.4
- [ ] Finish a dive and open the Sushi Bar.
- [ ] Confirm caught fish appear in pantry stock.
- [ ] Confirm a customer and requested menu item appear.
- [ ] Select the wrong menu item; order and stock must remain unchanged.
- [ ] Serve the requested sushi; matching fish stock decreases by one.
- [ ] Serve the requested tea; matching tea stock decreases by one.
- [ ] Confirm coins and reputation increase after correct service.
- [ ] Buy tea restock for 30 coins; confirm 3 Matcha, 3 Hojicha and 2 Lotus are added.
- [ ] Complete five guests and start the next dive.
- [ ] Reload the page and confirm coins, inventory, tea stock and reputation persist.
- [ ] Test restaurant layout in portrait and landscape on a touch device.
