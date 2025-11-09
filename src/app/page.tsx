"use client";
import { useRef, useEffect, useState } from "react";
import { initializeTimelineAudioNodes } from "./audio";
import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";

export default function Home() {
  var timelineRef = useRef<any[][]>(initializeTimelineAudioNodes());
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  useEffect(() => {
  }, [timelineRef]);

  const timeline = timelineRef.current;
  return (

    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center">
      <h1 className="text-4xl font-bold border-b w-full p-2 font-sans">Donzart</h1>
      <Soundboard timeline={timeline} />
      <Timeline timeline={timeline} setSelectedCell={setSelectedCell} />
      <Settings timeline={timeline} selectedCell={selectedCell} />
    </div>
  );
}
