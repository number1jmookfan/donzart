import Image from 'next/image'
import { useState } from 'react';

const sounds: [string, string, string][] = 
[
  ["/drum_selected.png", "/drum_unselected.png", "/sounds/drum.mp3"],
  ["/piano_selected.png", "/piano_unselected.png", "/sounds/piano.mp3"],
  ["/trumpet_selected.png", "/trumpet_unselected.png", "/sounds/trumpet.mp3"],
  ["/colin_selected.png", "/colin_unselected.png", "/sounds/null.mp3"],
  ["/coming_soon.png", "/coming_soon.png", "/sounds/null.mp3"]
];

/*
this component needs to be able to be dragged and dropped onto the timeline.

*/

export default function Soundboard({ timeline }: { timeline: any[][] }) {
  const [selectedImage, setSelectedImage] = useState([false, false, false, false, false]);

  return (
    <div className="w-full grid grid-cols-5 gap-4 justify-items-between border-b">
        {sounds.map(([image, unselectedImage, sound], index) => (
          <div key={index} className="p-4 justify-items-center cursor-pointer peer border-transparent hover:[border-image-source:url('/Border.png')] peer-checked:[border-image-source:url('/Border.png')] px-3"
              style={{
                borderImageSlice: 50,
                borderWidth: "10px",
                borderStyle: "none solid none solid",
              }} onClick={() => setSelectedImage([...selectedImage.map((_, i) => i === index ? !selectedImage[i] : selectedImage[i])])}> 
            <div>
              <img src={selectedImage[index] ? image : unselectedImage} draggable="true" className="h-5" onDragStart={(e) => {
                    const payload = { image, sound };
                    e.dataTransfer.setData("text/plain", JSON.stringify(payload));
                  }}
              />
              <audio id={`${index + 1}`} src={sound} />
            </div>

          </div>
        ))}
      </div>
  );
}
