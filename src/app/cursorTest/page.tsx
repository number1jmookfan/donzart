"use client";
import { useEffect, useState } from "react";

export default function LoopingCursor() {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const loopDuration = 4000; // 4 seconds in milliseconds

    const updateCursor = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % loopDuration) / loopDuration;
      const position = progress * window.innerWidth;
      setCursorPosition(position);

      requestAnimationFrame(updateCursor);
    };

    const animationId = requestAnimationFrame(updateCursor);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: `${cursorPosition}px`,
        top: 0,
        height: "h-[32.5vh]",
        width: "2px",
        backgroundColor: "#ff0000",
        pointerEvents: "none",
      }}
    />
  );
}
