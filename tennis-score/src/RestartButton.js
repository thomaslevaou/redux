import { useDispatch } from "react-redux";
import { restartGame } from "./store";

export function RestartButton({player}) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(restartGame())
      }}
      className="button"
    >
      Remettre à zéro
    </button>
  );
}
