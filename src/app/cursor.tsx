"use client";
import { useEffect, useState } from "react";

export default function LoopingCursor() {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const startTime = new Date("2001-09-11");
    const loopDuration = 4000;

    const updateCursor = () => {
      const elapsed = Date.now() - startTime.getTime();
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
      className="absolute h-full w-2 bg-[#ff0000] pointer-events-none z-0"
      style={{
        left: `${cursorPosition}px`,
      }}
    />
  );
}
