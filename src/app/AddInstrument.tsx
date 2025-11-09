import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function AddInstrument() {
  const addInstrument = useMutation(api.instruments.addInstrument);

  const handleSubmit = (formData: FormData) => {
    const vol = formData.get("volume");
    const pos = formData.get("position");
    addInstrument({
      volume: parseInt(vol!.toString()),
      position: parseInt(pos!.toString()),
    });
  };

  return (
    <form action={handleSubmit}>
      <label>
        volume:
        <input name="volume" />
      </label>
      <label>
        position:
        <input name="position" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
}
