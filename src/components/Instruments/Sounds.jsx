import * as Tone from "tone";

export const sounds = {
  synth: new Tone.Synth().toDestination(),
  boom: new Tone.Synth({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.4,
      sustain: 0,
      release: 0.2,
    },
  }).toDestination(),
  hiHat: new Tone.MetalSynth({
    envelope: {
      attack: 0.04,
      decay: 0.4,
      sustain: 0.1,
      release: 0.2,
    },
    pitchDecay: 0.5,
    reverse: false,
  }).toDestination(),
  kick: new Tone.MembraneSynth({ polyphony: 4 }).toDestination(),
  openHat: new Tone.Synth({
    oscillator: {
      type: "triangle",
    },
    envelope: {
      attack: 0.005,
      decay: 0.05,
      sustain: 0,
      release: 0.02,
    },
  }).toDestination(),
  snare: new Tone.Synth({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.4,
      sustain: 0,
      release: 0.2,
    },
  }).toDestination(),
};
