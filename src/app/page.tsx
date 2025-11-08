import Settings from "./settings";
import Soundboard from "./soundboard";
import Timeline from "./timeline";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen items-center justify-center">
      <h1 className="text-4xl font-bold border-b w-full p-2">Donzart</h1>
      <Soundboard />
      <Timeline />
      <Settings />
    </div>
  );
}
