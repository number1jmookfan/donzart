"use client";
import { useEffect, useRef } from 'react'
import { trackData } from "./types";

export default function AudioPlayer({convexData}: {convexData:trackData[]}) {
    const prevCol = useRef(-1);

    const soundMap = new Map<string, string>([
        ["Drum", "/sounds/drum.mp3"],
        ["Piano", "/sounds/pian.mp3"],
        ["Trumpet", "/sounds/trump.mp3"],
        ["Guitar", "/sounds/guit.wav"],
        ["Colin", "/sounds/colin.mp3"],
        ["", "/sounds/null.mp3"]
    ]);

    useEffect(() => {
        const player = setInterval(() => {
            const startTime = new Date("2001-09-11");
            const loopDuration = 4000;
            const elapsed = Date.now() - startTime.getTime();
            const time = elapsed % loopDuration
            const idx = Math.floor(time / (4000 / 32))
            if (idx !== prevCol.current) {
                prevCol.current = idx;
                if (convexData !== undefined) {
                    console.log("Not undefined lmfao");
                    if (convexData[0]?.positions[idx]?.type) {
                        const soundPath = soundMap.get(convexData[0].positions[idx].type)
                        const audio0 = new Audio(soundPath);
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
    }, [convexData, soundMap]);
    return <div className="absolute inset-0 pointer-events-none">
    </div>
}
