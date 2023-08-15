import { useDispatch } from "react-redux";
import { playPause } from "./store";

export function PlayPauseButton() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(playPause())
      }}
      class="button"
    >
      Pause / Reprendre
    </button>
  );
}
