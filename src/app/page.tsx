"use client";
import Image from 'next/image'
import { useRef, useEffect, useState } from "react";
import { initializeTimelineAudioNodes } from "./audio";
import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";
import { audioInfo } from "./types";
import { generateUsername } from "unique-username-generator";

export default function Home() {
  const [timeline, setTimeline] = useState<audioInfo[][]>(initializeTimelineAudioNodes());
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [user, setUser] = useState({name: "", color: "", border: ""});
  const hasUser = useRef(false);

  function getRandomUser() {
    const bgColor = Math.floor(Math.random() * 16777215).toString(16);
    const paddedBg = '#' + bgColor.padStart(6, '0');

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
    const paddedBorder =  `#${toHex(r)}${toHex(g)}${toHex(b)}`;

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
  }, [timeline]);

  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center font-sans">
      <div className="w-full h-full border-b-2 px-4 py-2 flex flex-row justify-between">
        <div className='flex'>
          <h1 className="text-5xl font-bold font-sans">Donzart</h1>
          <Image src={"/mascot.png"}  width={40}  height={40} alt='' className=' mx-5'></Image>
        </div>
        <div className="flex items-center justify-center h-full gap-2">
          <p className="text-center">{user.name}</p>
          <div style={{backgroundColor: user.color,  border: `3px solid ${user.border}`}}className="rounded-full h-12 w-12"></div>
        </div>
      </div>
      <Soundboard />
      <Timeline setTimeline={setTimeline} timeline={timeline} setSelectedCell={setSelectedCell} user={user} />
      <Settings timeline={timeline} selectedCell={selectedCell} />
    </div>
  );
}
