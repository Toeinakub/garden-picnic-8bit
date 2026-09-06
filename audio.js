// 8-bit Web Audio Synthesizer (No external sound files required)
class RetroAudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // เสียงเก็บผลไม้ (Harvest Pluck)
  playHarvest() {
    if (this.isMuted) return;
    this.initContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.1);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // เสียงผลไม้ลอยลงตะกร้า (Basket Drop)
  playDrop() {
    if (this.isMuted) return;
    this.initContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // เสียงแปลงร่างเป็นของที่ระลึก (Magic Sparkle / Transformation)
  playTransform() {
    if (this.isMuted) return;
    this.initContext();

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const t = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + (index * 0.05);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  }

  // เสียงคลิกเลือกตัวเลือก (Click / Blip)
  playClick() {
    if (this.isMuted) return;
    this.initContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // เสียงชำระเงินสำเร็จ (RPG Victory Fanfare)
  playFanfare() {
    if (this.isMuted) return;
    this.initContext();

    // Melody: C, E, G, High C hold
    const notes = [
      { f: 523.25, d: 0.1 },
      { f: 523.25, d: 0.1 },
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.25 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.5 }
    ];

    let curTime = this.ctx.currentTime;

    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, curTime);

      gain.gain.setValueAtTime(0.25, curTime);
      gain.gain.exponentialRampToValueAtTime(0.01, curTime + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(curTime);
      osc.stop(curTime + note.d);

      curTime += (note.d * 0.85);
    });
  }
}

export const retroAudio = new RetroAudioManager();
