// on import useSelector depuis react-redux
import { useSelector } from "react-redux";

export function Display() {
  const gameIsPlaying = useSelector((state) => state.playing);

  return <p>{ gameIsPlaying ? "Jeu en cours": "C'est la pause"}</p>;
}
