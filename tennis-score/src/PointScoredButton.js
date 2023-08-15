import { useDispatch } from "react-redux";
import { pointScored } from "./store";

export function PointScoredButton({player}) {
  const dispatch = useDispatch();
  const playerNumber = player === 'player1' ? '1' : '2';

  return (
    <button
      onClick={() => {
        dispatch(pointScored(player))
      }}
      className="button"
    >
      Point joueur {playerNumber} {/* Je sais que je pourrais utiliser children comme dans la correction, mais je ne trouve pas ça pertinent ici */}
    </button>
  );
}
