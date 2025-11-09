import Image from 'next/image'
import { useState } from 'react';

const sounds: [string, string, string, string][] = [
  ["/drum_selected.png", "/drum_unselected.png", "/sounds/drum.mp3", "Drums"],
  ["/piano_selected.png", "/piano_unselected.png", "/sounds/pian.mp3", "Piano"],
  ["/trumpet_selected.png", "/trumpet_unselected.png", "/sounds/trump.mp3", "Trumpet"],
  ["/guitar_selected.png", "/guitar_unselected.png", "/sounds/guitar.mp3", "Guitar"],
  ["/colin_selected.png", "/colin_unselected.png", "/sounds/colin.mp3", "Colin"],
  ["/coming_soon.png", "/coming_soon2.png", "/sounds/null.mp3", "Coming Soon..."],
  ["/eraser_unselected.png", "/eraser_selected.png", "/sounds/null.mp3", "Erase"],
];

/*
this component needs to be able to be dragged and dropped onto the timeline.
*/

export default function Soundboard({ timeline }: { timeline: any[][] }) {
  const [selectedImage, setSelectedImage] = useState([false, false, false, false, false, false]);

  return (
    <div className="w-full grid grid-cols-7 gap-4 justify-items-between border-b-3 font-sans">
      {sounds.map(([image, unselectedImage, sound, name], index) => (
        <div
          key={index}
          className="text-center text-xl p-4 justify-items-center cursor-pointer peer border-transparent hover:[border-image-source:url('/Border.png')] peer-checked:[border-image-source:url('/Border.png')]"
          style={{
            borderImageSlice: 50,
            borderWidth: "10px",
            borderStyle: "none solid none solid",
          }}
          onClick={() => setSelectedImage([...selectedImage.map((_, i) => (i === index ? !selectedImage[i] : selectedImage[i]))])}
        >
          <div
           className= "inline-flex">
            <Image
              src={selectedImage[index] ? image : unselectedImage}
              width={70}
              height={70}
              draggable={(index == sounds.length-1) ? "false" :  "true"}
              className=""
              alt=""
              onDragStart={(e) => {
                const payload = { image, sound, name };
                e.dataTransfer.setData("application/json", JSON.stringify(payload));
              }}
            />
            <audio id={`${index + 1}`} src={sound} />
            <p>
              {name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
