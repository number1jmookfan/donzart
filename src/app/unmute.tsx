"use client";

import { useState } from "react";

export default function Unmute() {
  const [muted, setMuted] = useState(true);

  return (
    <button
      onClick={() => setMuted(false)}
      className={muted ? "text-red-500" : "text-green-500"}
    >
      {muted ? "muted" : "unmuted"}
    </button>
  );
}
