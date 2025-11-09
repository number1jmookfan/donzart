"use client";
import { useEffect, useRef } from 'react'
import { clearInterval } from 'timers';
import { trackData } from "./types";

export default function AudioPlayer({convexData}: {convexData:trackData[]}) {
    const prevCol = useRef(-1);

    const soundMap: Map<string, string> = new Map();
    soundMap.set("Drum", "/sounds/drum.mp3");
    soundMap.set("Piano", "/sounds/pian.mp3");
    soundMap.set("Trumpet", "/sounds/trump.mp3");
    soundMap.set("Guitar", "/sounds/guit.wav");
    soundMap.set("Colin", "/sounds/colin.mp3");
    soundMap.set("", "/sounds/null.mp3");

    useEffect(() => {
        const player = setInterval(() => {
            const time = Date.now() % 4000
            const idx = Math.floor(time / (4000 / 32))
            if (idx !== prevCol.current) {
                prevCol.current = idx;
                if (convexData !== undefined) {
                    if (convexData[0]?.positions[idx]?.type) {
                        // const soundPath = soundMap.get(convexData[0].positions[idx].type)
                        const audio0 = new Audio("/sounds/drum.mp3");
                        audio0.play();
                    }
                    if (convexData[1]?.positions[idx]?.type) {
                        const soundPath = soundMap.get(convexData[1].positions[idx].type)
                        const audio1 = new Audio(soundPath);
                        audio1.play();
                    }
                }
            }
        }, 10);

        return () => clearInterval(player);
    }, []);
    return <div className="absolute inset-0 pointer-events-none">
    </div>
}
