"use client";
import { useEffect } from "react";
import { setVolume } from "./audio";
import { audioInfo } from "./types";

/*
Settings component to adjust audio parameters for timeline cells.
-- each cell in the timeline will send its context to settings for adjustment.

*/

export default function Settings({
  timeline,
  selectedCell,
}: {
  timeline: audioInfo[][];
  selectedCell: { row: number; col: number };
}) {
  const cellContext = timeline[selectedCell.row][selectedCell.col];
  console.log("Selected Cell Context:", cellContext);

  useEffect(() => {
    if (!cellContext) return;
  }, [cellContext]);
  return (
    <div className="h-1/3 w-full  flex-col grid grid-cols-6 gap-4 justify-between text-center">
      <div className="border-r p-4">
        <label
          htmlFor="volume"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Volume
        </label>
        <input
          id="volume"
          type="range"
          defaultValue={cellContext.gain?.gain.defaultValue}
          min={cellContext.gain?.gain.minValue}
          max={cellContext.gain?.gain.maxValue}
          onChange={(e) => {
            setVolume(
              Number((e.target as HTMLInputElement).value),
              cellContext.gain
            );
            console.log("Volume changed:", cellContext.gain);
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      {/*<div className="border-r p-4">
                <label htmlFor="reverb" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reverb</label>
                <input id="reverb" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
            </div>*/}
      <div className="border-r p-4">
        <label
          htmlFor="delay"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Delay
        </label>
        <input
          id="delay"
          type="range"
          defaultValue="50"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="border-r p-4">
        <label
          htmlFor="filter"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Filter
        </label>
        <input
          id="filter"
          type="range"
          defaultValue="50"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="border-r p-4">
        <label
          htmlFor="pan"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pan
        </label>
        <input
          id="pan"
          type="range"
          defaultValue="50"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="border-r p-4">
        <label
          htmlFor="pitch"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pitch
        </label>
        <input
          id="pitch"
          type="range"
          defaultValue="50"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="p-4">
        <label
          htmlFor="speed"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Speed
        </label>
        <input
          id="speed"
          type="range"
          defaultValue="50"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  );
}
