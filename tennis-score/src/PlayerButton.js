import { useDispatch } from "react-redux";
import { pointScored } from "./store";

export function PlayerButton({player}) {
  const dispatch = useDispatch();
  const playerNumber = player === 'player1' ? '1' : '2';

  return (
    <button
      onClick={() => {
        dispatch(pointScored(player))
      }}
      class="button"
    >
      Point joueur {playerNumber}
    </button>
  );
}
