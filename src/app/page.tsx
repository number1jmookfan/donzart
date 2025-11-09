"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { initializeTimelineAudioNodes } from "./audio";
import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";
import { audioInfo, trackData } from "./types";
import { useQuery, useMutation, ReactMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FunctionReference } from "convex/server";
import { Id } from "../../convex/_generated/dataModel";

import { generateUsername } from "unique-username-generator";
import LoopingCursor from "./cursor";
import AudioPlayer from "./player";

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
  const [user, setUser] = useState({ name: "", color: "", border: "" });
  const hasUser = useRef(false);

  function getRandomUser() {
    const bgColor = Math.floor(Math.random() * 16777215).toString(16);
    const paddedBg = "#" + bgColor.padStart(6, "0");

    let r = parseInt(paddedBg.substring(1, 3), 16);
    let g = parseInt(paddedBg.substring(3, 5), 16);
    let b = parseInt(paddedBg.substring(5, 7), 16);

    r = Math.floor(r * (1 - 40 / 100));
    g = Math.floor(g * (1 - 40 / 100));
    b = Math.floor(b * (1 - 40 / 100));

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    const toHex = (c: any) => `0${c.toString(16)}`.slice(-2);
    const paddedBorder = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setUser((prev) => ({
      ...prev,
      name: generateUsername(),
      color: paddedBg,
      border: paddedBorder,
    }));
  }

  useEffect(() => {
    if (!hasUser.current) {
      getRandomUser();
      hasUser.current = true;
    }
  }, [instruments]);

  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center font-sans">
      <div className="w-full h-full border-b-2 px-4 py-2 flex flex-row justify-between">
        <div className="flex">
          <h1 className="text-5xl font-bold font-sans">Donzart</h1>
          <Image
            src={"/mascot.png"}
            width={40}
            height={40}
            alt=""
            className=" mx-5"
          ></Image>
        </div>
        <div className="flex items-center justify-center h-full gap-2">
          <p className="text-center">{user.name}</p>
          <div
            style={{
              backgroundColor: user.color,
              border: `3px solid ${user.border}`,
            }}
            className="rounded-full h-12 w-12"
          ></div>
        </div>
      </div>
      <Soundboard />
      <Timeline
        //will be mutation hold your horses
        setTimeline={updateInstruments}
        timeline={instruments}
        setSelectedCell={setSelectedCell}
        user={user}
      />
      {/* <Settings timeline={instruments} selectedCell={selectedCell} /> */}
      <AudioPlayer convexData={instruments} />
    </div>
  );
}
