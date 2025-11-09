"use client";
import { useEffect, useState } from "react";
import { initializeTimelineAudioNodes } from "./audio";
import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";
import { audioInfo } from "./types";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const [timeline, setTimeline] = useState<audioInfo[][]>(
    initializeTimelineAudioNodes()
  );
  const instruments = useQuery(api.instruments.get);

  console.log("INSTRUMENTS:  ", instruments);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  useEffect(() => {}, [timeline]);

  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center font-sans">
      <h1 className="text-4xl font-bold border-b-3 w-full p-2 font-sans">
        Donzart
      </h1>
      <Soundboard />
      <Timeline
        setTimeline={setTimeline}
        timeline={timeline}
        setSelectedCell={setSelectedCell}
      />
      <Settings timeline={timeline} selectedCell={selectedCell} />
    </div>
  );
}
