import { PlayPauseButton } from "./PlayPauseButton";
import { PointScoredButton } from "./PointScoredButton";
import { RestartButton } from "./RestartButton";
import { Display } from "./Display";
import { PlayerPoints } from "./PlayerPoints";
import { PlayerScore } from "./PlayerScore";

function App() {
  return (
    <>
      <PlayerPoints playerId={"player1"} playerName={"Player 1"}/>
      <PlayerPoints playerId={"player2"} playerName={"Player 2"}/>
      <Display />
      <PlayerScore playerId={"player1"} playerName={"Player 1"}/>
      <PlayerScore playerId={"player2"} playerName={"Player 2"}/>
      <div class="buttons">
       <div class="buttons-row">
          <PointScoredButton player={"player1"} />
          <PointScoredButton player={"player2"} />
        </div>
       <div class="buttons-row">
          <RestartButton />
          <PlayPauseButton />
        </div>
      </div>
    </>
  );
}

export default App;
