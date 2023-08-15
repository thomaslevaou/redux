// on import useSelector depuis react-redux
import { useSelector } from "react-redux";

export function Display() {
  const gameIsPlaying = useSelector((state) => state.playing);
  const player1Score = useSelector((state) => state.player1);
  const player2Score = useSelector((state) => state.player2);

  return <p class="display">{ gameIsPlaying ? "Le score est " + player1Score + " - " + player2Score : "C'est la pause"  }</p>;
}
