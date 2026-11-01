export class InputController {
  constructor(game, root = document) {
    this.game = game;
    this.root = root;
    this.activePointers = new Map();
    this.keyCounts = new Map();
    this.onKeyDown = event => this.handleKeyDown(event);
    this.onKeyUp = event => this.game.keys.delete(event.key.toLowerCase());
    this.onBlur = () => this.releaseAll();
    this.onVisibility = () => {
      if (document.hidden) this.releaseAll();
    };

    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("visibilitychange", this.onVisibility);

    const directions = { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" };
    root.querySelectorAll("[data-move]").forEach(button => {
      const key = directions[button.dataset.move];
      if (!key) return;
      button.addEventListener("pointerdown", event => this.press(event, key));
      button.addEventListener("pointerup", event => this.release(event));
      button.addEventListener("pointercancel", event => this.release(event));
      button.addEventListener("lostpointercapture", event => this.release(event));
      button.addEventListener("contextmenu", event => event.preventDefault());
    });
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
    this.game.keys.add(key);
    if (event.repeat || !this.game.running) return;
    if (key === "e" || key === " ") this.game.tryCatch();
    if (key === "r") this.game.surface();
  }

  press(event, key) {
    event.preventDefault();
    if (this.activePointers.has(event.pointerId)) return;
    this.activePointers.set(event.pointerId, key);
    this.keyCounts.set(key, (this.keyCounts.get(key) || 0) + 1);
    this.game.keys.add(key);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is optional; cancel/blur cleanup remains available.
    }
  }

  release(event) {
    const key = this.activePointers.get(event.pointerId);
    if (!key) return;
    this.activePointers.delete(event.pointerId);
    const remaining = (this.keyCounts.get(key) || 1) - 1;
    if (remaining <= 0) {
      this.keyCounts.delete(key);
      this.game.keys.delete(key);
    } else {
      this.keyCounts.set(key, remaining);
    }
  }

  releaseAll() {
    this.activePointers.clear();
    this.keyCounts.clear();
    ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].forEach(key => {
      this.game.keys.delete(key);
    });
  }

  destroy() {
    this.releaseAll();
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("visibilitychange", this.onVisibility);
  }
}
