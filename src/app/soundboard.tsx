import { useState } from "react";
import { audioInfo } from "./types";

const sounds: [string, string, string][] = [
  ["/drum_selected.png", "/drum_unselected.png", "/sounds/drum.mp3"],
  ["/piano_selected.png", "/piano_unselected.png", "/sounds/pian.mp3"],
  ["/trumpet_selected.png", "/trumpet_unselected.png", "/sounds/trump.mp3"],
  ["/colin_selected.png", "/colin_unselected.png", "/sounds/null.mp3"],
  ["/coming_soon.png", "/coming_soon.png", "/sounds/null.mp3"],
];

/*
this component needs to be able to be dragged and dropped onto the timeline.
*/

export default function Soundboard({ timeline }: { timeline: audioInfo[][] }) {
  const [selectedImage, setSelectedImage] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="w-full grid grid-cols-5 gap-4 justify-items-between border-b">
      {sounds.map(([image, unselectedImage, sound], index) => (
        <div
          key={index}
          className="p-4 justify-items-center cursor-pointer peer border-transparent hover:[border-image-source:url('/Border.png')] peer-checked:[border-image-source:url('/Border.png')] px-3"
          style={{
            borderImageSlice: 50,
            borderWidth: "10px",
            borderStyle: "none solid none solid",
          }}
          onClick={() =>
            setSelectedImage([
              ...selectedImage.map((_, i) =>
                i === index ? !selectedImage[i] : selectedImage[i]
              ),
            ])
          }
        >
          <div>
            <img
              src={selectedImage[index] ? image : unselectedImage}
              draggable="true"
              className="h-5"
              onDragStart={(e) => {
                const payload = { image, sound };
                console.log("dragstart payload:", payload);
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify(payload)
                );
              }}
            />
            <audio id={`${index + 1}`} src={sound} />
          </div>
        </div>
      ))}
    </div>
  );
}
