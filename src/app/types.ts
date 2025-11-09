import { Id } from "../../convex/_generated/dataModel";

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

export type trackDatum = {
  type: string;
  volume?: number;
  color?: string;
};

export type trackData = {
  track: number;
  positions: trackDatum[];
  _id: Id<"instruments">;
  _creationTime: number;
};
