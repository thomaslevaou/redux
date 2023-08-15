import { useStore } from "react-redux";
import { autoplay } from "./store";

export function PlayPauseButton() {
  const store = useStore();

  return (
    <button
      onClick={() => { autoplay(store) }}
      class="button"
    >
      Pause / Reprendre
    </button>
  );
}
