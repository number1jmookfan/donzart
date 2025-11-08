var sounds = [
    ['drum1_image', 'drum1_sound'],
    ['drum2_image', 'drum2_sound'],
    ['drum3_image', 'drum3_sound'],
    ['drum4_image', 'drum4_sound'],
    ['drum5_image', 'drum5_sound'],
    ['drum6_image', 'drum6_sound'],
    ['drum7_image', 'drum7_sound'],
    ['drum8_image', 'drum8_sound'],
    ['drum9_image', 'drum9_sound'],
    ['drum10_image', 'drum10_sound'],
    ['drum11_image', 'drum11_sound'],
]

export default function Soundboard() {
  return (
    <div className="w-full grid grid-cols-11 gap-4 justify-items-between border-b">
        {sounds.map(([image, sound], index) => (
          <div key={index} className="border-r p-4">
            <img src={image} alt={`Drum ${index + 1}`} />
            <audio id={`drum${index + 1}`} src={sound} />
          </div>
        ))}
      </div>
  );
}
