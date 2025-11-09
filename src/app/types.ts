export type audioInfo = {
  context: AudioContext;
  gain: GainNode;
  pan: PannerNode;
  delay: DelayNode;
  filter: BiquadFilterNode;
  pitch: WaveShaperNode;
  speed: AudioBufferSourceNode;
};
