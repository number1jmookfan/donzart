"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AddInstrument } from "./AddInstrument";

export default function Home() {
  const instruments = useQuery(api.instruments.get);
  return (
    <div className="flex min-h-screen items-center justify-center flex-col bg-zinc-50 font-sans dark:bg-black">
      {instruments?.map(({ _id, volume, position }) => (
        <div key={_id}>{"volume: " + volume + ", position: " + position}</div>
      ))}
      <br></br>
      <br></br>
      <br></br>
      <AddInstrument></AddInstrument>
    </div>
  );
}
