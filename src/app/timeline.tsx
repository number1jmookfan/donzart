import React, { useState, useEffect } from "react";

/* timeline requires:
-- for multiplayer access, if a value exists and you did not place it, do not add the sound
to timeline.
-- on drop, wait until play completes, then add to timeline.
-- each cell in timeline can have one sound.
-- each cell will have a color that indicates who placed the sound.
*/

type TimelineProps = {
  timeline?: any[][];
  timelineRef?: React.RefObject<any[][]>;
  onChange?: (t: any[][]) => void;
  rows?: number;
  cols?: number;
  setSelectedCell ?: (cell: { row: number; col: number }) => void;
};

export default function Timeline({timeline: initialTimeline, timelineRef, onChange, rows = 32, cols = 2, setSelectedCell}: TimelineProps) {
  const [timelineState, setTimelineState] = useState<any[][]>(
    initialTimeline || Array.from({ length: rows }, () => new Array(cols).fill(0))
  );

  // sync external ref whenever timelineState changes
  useEffect(() => {
    if (timelineRef) timelineRef.current = timelineState;
  }, [timelineRef, timelineState]);

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

    setTimelineState((prev) => {
      const next = prev.map((r) => [...r]);
      next[rowIndex][colIndex] = payload;
      if (timelineRef) timelineRef.current = next;
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex-1 w-full">
      {timelineState.map((row, rowIndex) => (
        <div key={rowIndex} className={`w-full h-68.5 grid grid-cols-32 border-b`}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="border-r last:border-r-0 cursor-pointer" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, rowIndex, colIndex)} onClick={() => {
                if (setSelectedCell) {
                  setSelectedCell({ row: rowIndex, col: colIndex });
                }
              }}
            >
            <div className="h-full w-full flex items-center justify-center">
              {cell.sound && cell.image ? (
                <div className="h-full w-full flex flex-col items-center justify-center gap-1 bg-blue-600">
                  {cell.sound ? <audio id={`audio-${rowIndex}-${colIndex}`} src={String(cell.sound)} /> : null}
                  <img src={cell.image} alt="Sound Thumbnail" className="h-8 w-8 object-cover" />
                </div>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center gap-1">
                    {cell.sound ? <audio id={`audio-${rowIndex}-${colIndex}`} src={String(cell.sound)} /> : null}
                  </div>
                )
              }
            </div>
            </div>
          ))}
        </div>
      ))}
       
            
    </div>

  );
}
