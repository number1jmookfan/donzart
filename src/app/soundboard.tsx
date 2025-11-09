var sounds = [
    ['file.svg', 'drum1_sound.mp3'],
    ['drum2_image', 'drum2_sound.mp3'],
    ['drum3_image', 'drum3_sound.mp3'],
    ['drum4_image', 'drum4_sound.mp3'],
    ['drum5_image', 'drum5_sound.mp3'],
    ['drum6_image', 'drum6_sound.mp3'],
    ['drum7_image', 'drum7_sound.mp3'],
    ['drum8_image', 'drum8_sound.mp3'],
    ['drum9_image', 'drum9_sound.mp3'],
    ['drum10_image', 'drum10_sound.mp3'],
    ['drum11_image', 'drum11_sound.mp3'],
];

/*
this component needs to be able to be dragged and dropped onto the timeline.

*/

export default function Soundboard({ timeline }: { timeline: any[][] }) {
  return (
    <div className="w-full grid grid-cols-11 gap-4 justify-items-between border-b">
        {sounds.map(([image, sound], index) => (
          <div key={index} className="border-r p-4 justify-items-center" >
            <div>
              <img src={image} alt={`Drum ${index + 1}`} draggable="true" className="h-5" onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", sound);
                  }}
              />
              <audio id={`drum${index + 1}`} src={sound} />
            </div>

          </div>
        ))}
      </div>
  );
}
