import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { trackData } from "./types";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { Id } from "../../convex/_generated/dataModel";
/* timeline requires:
-- for multiplayer access, if a value exists and you did not place it, do not add the sound
to timeline.
-- on drop, wait until play completes, then add to timeline.
-- each cell in timeline can have one sound.
-- each cell will have a color that indicates who placed the sound.
*/

type TimelineProps = {
  setTimeline: ReactMutation<
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
  >;
  timeline: trackData[];
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }>
  >;
};

export default function Timeline({
  setTimeline,
  timeline,
  setSelectedCell,
}: TimelineProps) {
  // sync external ref whenever timeline changes
  // useEffect(() => {}, [timeline]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    rowIndex: number,
    colIndex: number,
    id: Id<"instruments">,
    volume?: number
  ) => {
    e.preventDefault();

    console.log(rowIndex, colIndex, id, volume);

    const payloadJson = e.dataTransfer.getData("application/json");
    let payload: { image?: string; sound?: string; name?: string } | null =
      null;

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

    setTimeline({
      id,
      track: rowIndex,
      position: colIndex,
      volume,
      type: payload.name!,
    });
  };
  return (
    <div className="flex-1 w-full">
      {timeline !== undefined
        ? timeline.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`w-full h-[32.5vh] grid grid-cols-32 border-b-3`}
            >
              {row.positions.map((cell, colIndex) => {
                console.log("CELL: ", cell);
                return (
                  <div
                    key={colIndex}
                    className="border-r-3 last:border-r-0 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={(e) =>
                      handleDrop(
                        e,
                        rowIndex,
                        colIndex,
                        row._id,
                        //need volume from slider
                        row.positions[colIndex].volume
                      )
                    }
                    onClick={() => {
                      if (setSelectedCell) {
                        setSelectedCell({ row: rowIndex, col: colIndex });
                      }
                    }}
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      <div
                        className={`h-full w-full flex flex-col items-center justify-center gap-1 ${
                          cell.type !== undefined ? "bg-blue-600" : ""
                        }`}
                      >
                        {cell.type !== undefined ? (
                          <audio
                            id={`audio-${rowIndex}-${colIndex}`}
                            src={String(cell.type)}
                          />
                        ) : null}
                        {cell.type !== undefined ? (
                          <img
                            src={`/${cell.type}_unselected.png`}
                            alt="Sound Thumbnail"
                            className="h-8 w-8 object-cover"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        : "loading"}
    </div>
  );
}
