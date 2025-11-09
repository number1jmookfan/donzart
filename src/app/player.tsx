"use client";
import { useEffect, useRef } from 'react'
import { clearInterval } from 'timers';
// import timeline from "./timeline"

const sounds: string[] = [
  "/sounds/drum.mp3",
  "/sounds/pian.mp3",
  "/sounds/trump.mp3",
  "/sounds/guit.wav",
  "/sounds/colin.mp3"
];

export default function AudioPlayer() {
    const prevCol = useRef(-1);

    useEffect(() => {
        const player = setInterval(() => {
            const time = Date.now() % 4000
            const idx = Math.floor(time / (4000 / 32))
            if (idx !== prevCol.current) {
                prevCol.current = idx;
                const audio = new Audio(sounds[3]);
                audio.play();
            }
        }, 10);

        return () => clearInterval(player);
    }, []);
    return <div className="absolute inset-0 pointer-events-none">
    </div>
}
