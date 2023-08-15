import { PlayPauseButton } from "./PlayPauseButton";
import { PointScoredButton } from "./PointScoredButton";
import { RestartButton } from "./RestartButton";
import { Display } from "./Display";

function App() {
  return (
    <>
      <Display />
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
