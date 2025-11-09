export type audioInfo = {
  context: AudioContext;
  gain: GainNode;
  pan: PannerNode;
  delay: DelayNode;
  filter: BiquadFilterNode;
  pitch: WaveShaperNode;
  speed: AudioBufferSourceNode;
  sound: string;
  image: string;
};

export type convexData = {
  type: string;
  volume: number;
};
