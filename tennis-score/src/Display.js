// on import useSelector depuis react-redux
import { useSelector } from "react-redux";

export function Display() {
  const gameIsPlaying = useSelector((state) => state.playing);
  const player1Score = useSelector((state) => state.player1);
  const player2Score = useSelector((state) => state.player2);
  const gameWinner = useSelector((state) => state.winner);
  const advantage = useSelector((state) => state.advantage);

  const updateScoreText = () => {
    if (gameWinner) {
      let gameWinnerLabel = gameWinner === "player1" ? '1': '2';
      return "Joueur " + gameWinnerLabel + " gagne";
    } else if (gameIsPlaying) {
      let scoreLabel = "Le score est " + player1Score + " - " + player2Score;
      if (advantage) {
        if (advantage === "player1") {
          scoreLabel += " avantage joueur 1";
        } else {
          scoreLabel += " avantage joueur 2";
        }
      }
      return scoreLabel;
    } else {
      return "C'est la pause";
    }
  };

  return <p class="display">{ updateScoreText() }</p>;
}
