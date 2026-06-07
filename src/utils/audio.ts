/**
 * Cinematic Web Audio API Synthesizer
 * Generates custom hi-fi audio feedback on the fly without relying on external file assets.
 * Implements lazy injection to fit seamlessly with modern browser security/autoplay limits.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getSharedCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (isMuted) return null;
  
  if (!audioCtx) {
    // Lazy instance loading
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  // Resume context if suspended
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
}

export const audioEngine = {
  toggleMute: () => {
    isMuted = !isMuted;
    if (isMuted && audioCtx) {
      audioCtx.close().then(() => {
        audioCtx = null;
      });
    }
    return isMuted;
  },

  getMuteState: () => isMuted,

  /**
   * Crisp high-tech tick sound for general buttons and UI hovers.
   */
  playTick: (pitchFactor = 1.0) => {
    const ctx = getSharedCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // High frequency rapid fade
      osc.frequency.setValueAtTime(1400 * pitchFactor, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700 * pitchFactor, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Graceful catch for audio hardware limits
    }
  },

  /**
   * Distinctive metallic snap click for action clicks.
   */
  playClick: () => {
    const ctx = getSharedCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const oscAlt = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      oscAlt.type = "sine";
      oscAlt.frequency.setValueAtTime(1200, ctx.currentTime);
      oscAlt.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

      osc.connect(gain);
      oscAlt.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscAlt.start();
      osc.stop(ctx.currentTime + 0.1);
      oscAlt.stop(ctx.currentTime + 0.1);
    } catch {}
  },

  /**
   * Beautiful cinematic swell rise sound for loaded actions or preloader finishes.
   */
  playCinematicSwell: () => {
    const ctx = getSharedCtx();
    if (!ctx) return;

    try {
      const duration = 0.8;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + duration);

      filter.type = "lowpass";
      filter.Q.value = 4.0;
      filter.frequency.setValueAtTime(100, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  },

  /**
   * Floating, pitch-bending reactive synth note.
   * Leverages custom oscillators for smooth parameter sweeps during 3D mouse bends.
   */
  playPitchNode: (freq: number) => {
    const ctx = getSharedCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }
};
