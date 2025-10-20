import { correctSound, incorrectSound, gameOverSound } from '../assets/sounds';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    // Cast to any to support webkitAudioContext for older Safari versions
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playSound(base64Data: string) {
  try {
    const audioCtx = getAudioContext();
    // User interaction is required to start audio context in some browsers.
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    // The base64 data might include a data URL prefix, remove it.
    const soundData = base64Data.split(',')[1] || base64Data;
    const binaryString = window.atob(soundData);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    audioCtx.decodeAudioData(
      bytes.buffer,
      (buffer) => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
      },
      (error) => console.error('Error with decoding audio data', error)
    );
  } catch (e) {
    console.error('Error playing sound', e);
  }
}

export const playCorrectSound = () => {
  playSound(correctSound);
};

export const playIncorrectSound = () => {
  playSound(incorrectSound);
};

export const playGameOverSound = () => {
  playSound(gameOverSound);
};
