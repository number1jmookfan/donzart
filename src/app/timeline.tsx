import React, { useEffect } from "react";
import { audioInfo } from "./types";
/* timeline requires:
-- for multiplayer access, if a value exists and you did not place it, do not add the sound
to timeline.
-- on drop, wait until play completes, then add to timeline.
-- each cell in timeline can have one sound.
-- each cell will have a color that indicates who placed the sound.
*/

type TimelineProps = {
  setTimeline: React.Dispatch<React.SetStateAction<audioInfo[][]>>;
  timeline: audioInfo[][];
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }>
  >;
   user: {
    name: string;
    color: string;
    border: string;
}
};


export default function Timeline({ setTimeline, timeline, setSelectedCell, user }: TimelineProps)  {
  // sync external ref whenever timeline changes
  useEffect(() => {}, [timeline]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();

    let payloadJson = e.dataTransfer.getData("application/json");
    let payload: { image?: string; sound?: string } | null = null;

    if (payloadJson) {
      try {
        payload = JSON.parse(payloadJson);
      } catch (err) {
        console.warn("invalid JSON payload", err);
        payload = null;
      }
    }

    if (!payload) {
      const sound = e.dataTransfer.getData("text/plain");
      const image = e.dataTransfer.getData("text/image");
      if (!sound && !image) return;
      payload = { sound: sound || undefined, image: image || undefined };
    }


    setTimeline((prev) => {
      const next = prev.map((r) => [...r]);
      next[rowIndex][colIndex].sound = payload?.sound!;
      next[rowIndex][colIndex].image = payload?.image!
      return next;
    });
  };
  return (
    <div className="flex-1 w-full">
      {timeline.map((row, rowIndex) => (
        <div key={rowIndex} className={`w-full h-[32vh] grid grid-cols-32 border-b-3`}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="border-l-3 last:border-r-3 cursor-pointer" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, rowIndex, colIndex)} onClick={() => {
                if (setSelectedCell) {
                  setSelectedCell({ row: rowIndex, col: colIndex });
                }
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                  <div className="h-full w-full flex flex-col items-center justify-center gap-1" style={{ 
                    backgroundColor: cell.sound && cell.image && cell.sound != "/sounds/null.mp3" ?  user.color : ""}}
                  >
                    {cell.sound && cell.sound != "/sounds/null.mp3" ? <audio id={`audio-${rowIndex}-${colIndex}`} src={String(cell.sound)} /> : null}
                    {cell.image && cell.sound != "/sounds/null.mp3" ? <img src={cell.image} alt="Sound Thumbnail" className="h-8 w-8 object-cover" /> : null}
                  </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
