export class AudioManager {
  constructor(enabled = true) {
    this.enabled = enabled;
    this.context = null;
  }

  setEnabled(enabled) {
    this.enabled = !!enabled;
  }

  play(type = "click") {
    if (!this.enabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.context) this.context = new AudioContextClass();
      if (this.context.state === "suspended") this.context.resume();
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      const frequencies = { click: 520, catch: 760, success: 880, warning: 260 };
      oscillator.type = "sine";
      oscillator.frequency.value = frequencies[type] || frequencies.click;
      gain.gain.setValueAtTime(0.0001, this.context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, this.context.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.11);
      oscillator.connect(gain);
      gain.connect(this.context.destination);
      oscillator.start();
      oscillator.stop(this.context.currentTime + 0.12);
    } catch {
      // Audio is optional; blocked or unavailable audio must never interrupt gameplay.
    }
  }
}
