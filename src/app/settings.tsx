export default function Settings() {
  return (
    <div className="h-1/3 w-full border-t flex-col grid grid-cols-7 gap-4 justify-between text-center">
        <div className="border-r p-4">
            <label htmlFor="volume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Volume</label>
            <input id="volume" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="border-r p-4">
            <label htmlFor="reverb" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reverb</label>
            <input id="reverb" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="border-r p-4">
            <label htmlFor="delay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delay</label>
            <input id="delay" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="border-r p-4">
            <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter</label>
            <input id="filter" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="border-r p-4">
            <label htmlFor="pan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pan</label>
            <input id="pan" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="border-r p-4">
            <label htmlFor="pitch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pitch</label>
            <input id="pitch" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
        <div className="p-4">
            <label htmlFor="speed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Speed</label>
            <input id="speed" type="range" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
        </div>
    </div>
  );
}
