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

export default function Timeline({timeline: initialTimeline, timelineRef, onChange, rows = 2, cols = 32, setSelectedCell}: TimelineProps) {
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

    const sound = e.dataTransfer.getData("text/plain");

    setTimelineState((prev) => {
      const next = prev.map((r) => [...r]);
      next[rowIndex][colIndex] = sound;
      timelineState[rowIndex][colIndex].audioContext.createMediaElementSource(new Audio(String(sound)))
      console.log(timelineState[rowIndex][colIndex] )
      if (timelineRef) timelineRef.current = next;
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex-1 w-full">
      {/* i broke something, fix later lol
      {timelineState.map((row, rowIndex) => (
        <div key={rowIndex} className={`w-full grid grid-cols-[repeat(${cols},minmax(0,1fr))] border-b`}>
          {row.map((cell, colIndex) => (
            <div key={colIndex}
              className={`w-full h-68.5 ${colIndex === timelineState[0].length - 1 ? "" : "border-r"} relative`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
            >
            <div className="h-full w-full flex items-center justify-center">
              {cell ? (
                typeof cell !== "object" && cell !== null ? (
                  <div className="h-full w-full flex flex-col items-center justify-center gap-1 bg-blue-600">
                    {cell.sound ? <audio id={`audio-${rowIndex}-${colIndex}`} src={String(cell.sound)} /> : null}
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center"></div>
                )
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            </div>
          ))}
        </div>
      ))}
            */}
    </div>

  );
}
