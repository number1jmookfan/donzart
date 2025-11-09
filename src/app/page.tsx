"use client";
import { useEffect, useState } from "react";
import { initializeTimelineAudioNodes } from "./audio";
import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";
import { audioInfo, trackData } from "./types";
import { useQuery, useMutation, ReactMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FunctionReference } from "convex/server";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  // const [timeline, setTimeline] = useState<audioInfo[][]>(
  //   initializeTimelineAudioNodes()
  // );
  //order by track maybe
  const instruments: trackData[] = useQuery(api.instruments.get)!;
  console.log("INSTRUMENTS:  ", instruments);
  const updateInstruments: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        id: Id<"instruments">;
        type: string;
        track: number;
        position: number;
        volume?: number;
      },
      null,
      string | undefined
    >
  > = useMutation(api.instruments.updateInstruments);

  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center font-sans">
      <h1 className="text-4xl font-bold border-b-3 w-full p-2 font-sans">
        Donzart
      </h1>
      <Soundboard />
      <Timeline
        //will be mutation hold your horses
        setTimeline={updateInstruments}
        timeline={instruments}
        setSelectedCell={setSelectedCell}
      />
      {/* <Settings timeline={instruments} selectedCell={selectedCell} /> */}
    </div>
  );
}
